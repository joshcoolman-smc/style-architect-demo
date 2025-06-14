
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ColorPaletteData, ColorCategory } from '../features/colors/types/color.types';

interface ColorStore {
  palette: ColorPaletteData;
  categories: ColorCategory[];
  updatePalette: (newPalette: ColorPaletteData) => void;
  updateCategories: (newCategories: ColorCategory[]) => void;
}

export const useColorStore = create<ColorStore>()(
  persist(
    (set) => ({
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
    }),
    {
      name: 'color-palette-storage',
    }
  )
);
