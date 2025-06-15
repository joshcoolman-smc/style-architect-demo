
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ColorPaletteData, ColorCategory } from '../features/colors/types/color.types';

interface ColorStore {
  palette: ColorPaletteData;
  categories: ColorCategory[];
  uploadedImage: string | null;
  originalImageFile: string | null; // base64 encoded file data
  originalImageFileName: string | null;
  originalImageFileType: string | null;
  isSampleImage: boolean;
  currentSampleIndex: number;
  isAnalyzing: boolean;
  updatePalette: (newPalette: ColorPaletteData) => void;
  updateCategories: (newCategories: ColorCategory[]) => void;
  setUploadedImage: (imageUrl: string | null) => void;
  setOriginalImageFile: (file: File | null) => void;
  setSampleImageState: (imageUrl: string, index: number) => void;
  setIsAnalyzing: (analyzing: boolean) => void;
  clearImageState: () => void;
}

// Helper function to convert File to base64
const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
  });
};

// Helper function to convert base64 to File
const base64ToFile = (base64: string, fileName: string, fileType: string): File => {
  const byteCharacters = atob(base64.split(',')[1]);
  const byteNumbers = new Array(byteCharacters.length);
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }
  const byteArray = new Uint8Array(byteNumbers);
  return new File([byteArray], fileName, { type: fileType });
};

export const useColorStore = create<ColorStore>()(
  persist(
    (set, get) => ({
      palette: {
        "light-1": "#9DACA7",
        "light-2": "#BABAAC", 
        "light-3": "#E0C9A0",
        "mid-1": "#3F8DA4",
        "mid-2": "#6D7673",
        "mid-3": "#BDA06E",
        "dark-1": "#005A78",
        "dark-2": "#335763",
        "dark-3": "#233E49"
      },
      categories: [],
      uploadedImage: null,
      originalImageFile: null,
      originalImageFileName: null,
      originalImageFileType: null,
      isSampleImage: false,
      currentSampleIndex: 0,
      isAnalyzing: false,
      updatePalette: (newPalette) => set((state) => ({ 
        palette: newPalette,
        categories: state.categories.map(category => {
          if (category.name === 'Light Tones') {
            return {
              ...category,
              colors: [
                { ...category.colors[0], value: newPalette["light-1"] },
                { ...category.colors[1], value: newPalette["light-2"] },
                { ...category.colors[2], value: newPalette["light-3"] }
              ]
            };
          }
          if (category.name === 'Mid Tones') {
            return {
              ...category,
              colors: [
                { ...category.colors[0], value: newPalette["mid-1"] },
                { ...category.colors[1], value: newPalette["mid-2"] },
                { ...category.colors[2], value: newPalette["mid-3"] }
              ]
            };
          }
          if (category.name === 'Dark Tones') {
            return {
              ...category,
              colors: [
                { ...category.colors[0], value: newPalette["dark-1"] },
                { ...category.colors[1], value: newPalette["dark-2"] },
                { ...category.colors[2], value: newPalette["dark-3"] }
              ]
            };
          }
          return category;
        })
      })),
      updateCategories: (newCategories) => set({ categories: newCategories }),
      setUploadedImage: (imageUrl) => set({ uploadedImage: imageUrl }),
      setOriginalImageFile: async (file) => {
        if (file) {
          try {
            const base64 = await fileToBase64(file);
            set({
              originalImageFile: base64,
              originalImageFileName: file.name,
              originalImageFileType: file.type
            });
          } catch (error) {
            console.error('Failed to convert file to base64:', error);
            set({
              originalImageFile: null,
              originalImageFileName: null,
              originalImageFileType: null
            });
          }
        } else {
          set({
            originalImageFile: null,
            originalImageFileName: null,
            originalImageFileType: null
          });
        }
      },
      setSampleImageState: (imageUrl, index) => set({
        uploadedImage: imageUrl,
        isSampleImage: true,
        currentSampleIndex: index,
        originalImageFile: null,
        originalImageFileName: null,
        originalImageFileType: null
      }),
      setIsAnalyzing: (analyzing) => set({ isAnalyzing: analyzing }),
      clearImageState: () => set({
        uploadedImage: null,
        originalImageFile: null,
        originalImageFileName: null,
        originalImageFileType: null,
        isSampleImage: false,
        currentSampleIndex: 0
      }),
    }),
    {
      name: 'color-palette-storage',
    }
  )
);

// Export helper functions for use in hooks
export { base64ToFile };
