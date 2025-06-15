
import { ColorRepository, IColorRepository } from '../repository/colorRepository';
import { ColorCategory, ColorPaletteData, ColorCategoryName } from '../types/color.types';
import { generateAlgorithmicPalette } from '../utils/paletteGenerator';
import { extractPaletteFromImageLazy } from '../utils/lazyImageAnalysis';
import { fileToBase64 } from '../../../utils/fileUtils';

export interface IColorService {
  getColorCategories(): ColorCategory[];
  copyColorToClipboard(value: string): Promise<void>;
  updateColorPalette(palette: ColorPaletteData): void;
  updateCategoriesFromPalette(categories: ColorCategory[], palette: ColorPaletteData): ColorCategory[];
  generateNewPalette(): ColorPaletteData;
  generatePaletteFromImage(imageFile: File): Promise<ColorPaletteData>;
}

export class ColorService implements IColorService {
  private repository: IColorRepository;

  constructor(repository: IColorRepository = new ColorRepository()) {
    this.repository = repository;
  }

  getColorCategories(): ColorCategory[] {
    return this.repository.getColorCategories();
  }

  updateColorPalette(palette: ColorPaletteData): void {
    this.repository.updateColorPalette(palette);
  }

  updateCategoriesFromPalette(categories: ColorCategory[], palette: ColorPaletteData): ColorCategory[] {
    return categories.map(category => {
      switch (category.name as ColorCategoryName) {
        case ColorCategoryName.LIGHT_TONES:
          return {
            ...category,
            colors: [
              { ...category.colors[0], value: palette["light-1"] },
              { ...category.colors[1], value: palette["light-2"] },
              { ...category.colors[2], value: palette["light-3"] }
            ]
          };
        case ColorCategoryName.MID_TONES:
          return {
            ...category,
            colors: [
              { ...category.colors[0], value: palette["mid-1"] },
              { ...category.colors[1], value: palette["mid-2"] },
              { ...category.colors[2], value: palette["mid-3"] }
            ]
          };
        case ColorCategoryName.DARK_TONES:
          return {
            ...category,
            colors: [
              { ...category.colors[0], value: palette["dark-1"] },
              { ...category.colors[1], value: palette["dark-2"] },
              { ...category.colors[2], value: palette["dark-3"] }
            ]
          };
        default:
          return category;
      }
    });
  }

  generateNewPalette(): ColorPaletteData {
    return generateAlgorithmicPalette();
  }

  async generatePaletteFromImage(imageFile: File): Promise<ColorPaletteData> {
    try {
      const imageSrc = await fileToBase64(imageFile);
      const palette = await extractPaletteFromImageLazy(imageSrc);
      return palette;
    } catch (error) {
      throw new Error('Failed to generate palette from image');
    }
  }

  async copyColorToClipboard(value: string): Promise<void> {
    try {
      await navigator.clipboard.writeText(value);
    } catch (err) {
      console.error('Failed to copy color:', err);
      throw new Error('Failed to copy color to clipboard');
    }
  }
}
