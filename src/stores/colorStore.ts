
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ColorPaletteData, ColorCategory } from '../features/colors/types/color.types';
import { fileToBase64 } from '../utils/fileUtils';

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
      updatePalette: (newPalette) => set({ palette: newPalette }),
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

