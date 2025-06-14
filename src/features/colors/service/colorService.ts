
import { ColorRepository, IColorRepository } from '../repository/colorRepository';
import { ColorCategory } from '../types/color.types';

export interface IColorService {
  getColorCategories(): ColorCategory[];
  copyColorToClipboard(value: string): Promise<void>;
}

export class ColorService implements IColorService {
  private repository: IColorRepository;

  constructor(repository: IColorRepository = new ColorRepository()) {
    this.repository = repository;
  }

  getColorCategories(): ColorCategory[] {
    return this.repository.getColorCategories();
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
