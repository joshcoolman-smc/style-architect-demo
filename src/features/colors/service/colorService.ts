
import { ColorRepository, IColorRepository } from '../repository/colorRepository';
import { ColorCategory, ColorPaletteData } from '../types/color.types';
import { generateAlgorithmicPalette } from '../utils/paletteGenerator';
import { extractPaletteFromImage } from '../utils/imageAnalysis';

export interface IColorService {
  getColorCategories(): ColorCategory[];
  copyColorToClipboard(value: string): Promise<void>;
  updateColorPalette(palette: ColorPaletteData): void;
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

  generateNewPalette(): ColorPaletteData {
    return generateAlgorithmicPalette();
  }

  async generatePaletteFromImage(imageFile: File): Promise<ColorPaletteData> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = async (e) => {
        try {
          const imageSrc = e.target?.result as string;
          const palette = await extractPaletteFromImage(imageSrc);
          resolve(palette);
        } catch (error) {
          reject(error);
        }
      };
      reader.onerror = () => reject(new Error('Failed to read file'));
      reader.readAsDataURL(imageFile);
    });
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
