
import { ColorRepository, IColorRepository } from '../repository/colorRepository';
import { ColorCategory, ColorPaletteData } from '../types/color.types';
import { generateAlgorithmicPalette } from '../utils/paletteGenerator';

export interface IColorService {
  getColorCategories(): ColorCategory[];
  copyColorToClipboard(value: string): Promise<void>;
  updateColorPalette(palette: ColorPaletteData): void;
  generateNewPalette(): ColorPaletteData;
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

  async copyColorToClipboard(value: string): Promise<void> {
    try {
      await navigator.clipboard.writeText(value);
    } catch (err) {
      console.error('Failed to copy color:', err);
      throw new Error('Failed to copy color to clipboard');
    }
  }
}
