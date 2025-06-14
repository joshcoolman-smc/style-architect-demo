import { ColorCategory, ColorPaletteData } from '../types/color.types';
import { useColorStore } from '../../../stores/colorStore';

export interface IColorRepository {
  getColorCategories(): ColorCategory[];
  updateColorPalette(palette: ColorPaletteData): void;
}

export class ColorRepository implements IColorRepository {
  getColorCategories(): ColorCategory[] {
    const { palette } = useColorStore.getState();
    
    return [
      {
        name: 'Light Tones',
        description: 'Soft, light colors for backgrounds and subtle accents.',
        colors: [
          { name: 'Light 1', value: palette["light-1"], description: 'Soft sage green for subtle backgrounds' },
          { name: 'Light 2', value: palette["light-2"], description: 'Warm neutral for card backgrounds' },
          { name: 'Light 3', value: palette["light-3"], description: 'Warm cream for highlight areas' },
        ],
      },
      {
        name: 'Mid Tones',
        description: 'Balanced colors for primary interface elements and interactions.',
        colors: [
          { name: 'Mid 1', value: palette["mid-1"], description: 'Ocean blue for primary actions' },
          { name: 'Mid 2', value: palette["mid-2"], description: 'Neutral gray for secondary elements' },
          { name: 'Mid 3', value: palette["mid-3"], description: 'Warm gold for accent elements' },
        ],
      },
      {
        name: 'Dark Tones',
        description: 'Deep, rich colors for text, borders, and contrast elements.',
        colors: [
          { name: 'Dark 1', value: palette["dark-1"], description: 'Deep teal for primary text and emphasis' },
          { name: 'Dark 2', value: palette["dark-2"], description: 'Slate blue for secondary text' },
          { name: 'Dark 3', value: palette["dark-3"], description: 'Navy for high contrast elements' },
        ],
      },
      {
        name: 'Neutral Colors',
        description: 'Sophisticated grayscale palette for modern interfaces.',
        colors: [
          { name: 'Neutral 50', value: '#fafafa', description: 'Page backgrounds' },
          { name: 'Neutral 100', value: '#f5f5f5', description: 'Card backgrounds' },
          { name: 'Neutral 200', value: '#e5e5e5', description: 'Subtle borders' },
          { name: 'Neutral 300', value: '#d4d4d4', description: 'UI borders' },
          { name: 'Neutral 400', value: '#a3a3a3', description: 'Placeholder text' },
          { name: 'Neutral 500', value: '#737373', description: 'Secondary text' },
          { name: 'Neutral 600', value: '#525252', description: 'Body text' },
          { name: 'Neutral 700', value: '#404040', description: 'Headings' },
          { name: 'Neutral 800', value: '#262626', description: 'High contrast text' },
          { name: 'Neutral 900', value: '#171717', description: 'Darkest text' },
        ],
      },
      {
        name: 'Semantic Colors',
        description: 'Colors that convey meaning and status in the interface.',
        colors: [
          { name: 'Success', value: '#10b981', description: 'Success states and positive actions' },
          { name: 'Warning', value: '#f59e0b', description: 'Warning states and caution' },
          { name: 'Error', value: '#ef4444', description: 'Error states and destructive actions' },
          { name: 'Info', value: '#3b82f6', description: 'Informational states' },
        ],
      },
    ];
  }

  updateColorPalette(palette: ColorPaletteData): void {
    useColorStore.getState().updatePalette(palette);
  }
}
