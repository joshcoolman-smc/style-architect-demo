
import { ColorCategory } from '../types/color.types';

export interface IColorRepository {
  getColorCategories(): ColorCategory[];
}

export class ColorRepository implements IColorRepository {
  getColorCategories(): ColorCategory[] {
    return [
      {
        name: 'Brand Colors',
        description: 'Primary brand colors for sophisticated, modern interfaces.',
        colors: [
          { name: 'Brand 300', value: '#8b7355', description: 'Light brand accent' },
          { name: 'Brand 600', value: '#5d4e37', description: 'Primary interactive elements' },
          { name: 'Brand 900', value: '#2d251c', description: 'Darkest brand shade' },
        ],
      },
      {
        name: 'Accent Colors',
        description: 'Sophisticated accent colors inspired by luxury automotive design.',
        colors: [
          { name: 'Accent 300', value: '#d4af37', description: 'Light accent' },
          { name: 'Accent 600', value: '#b8860b', description: 'Success states' },
          { name: 'Accent 900', value: '#6b5b0f', description: 'Darkest accent' },
        ],
      },
      {
        name: 'Metallic Accents',
        description: 'Metallic tones for premium design elements and highlights.',
        colors: [
          { name: 'Gold Light', value: '#fbbf24', description: 'Light gold for highlights' },
          { name: 'Gold', value: '#f59e0b', description: 'Primary gold accent' },
          { name: 'Gold Dark', value: '#d97706', description: 'Dark gold for depth' },
          { name: 'Bronze Light', value: '#dc2626', description: 'Light bronze accent' },
          { name: 'Bronze', value: '#b91c1c', description: 'Primary bronze tone' },
          { name: 'Bronze Dark', value: '#991b1b', description: 'Dark bronze for contrast' },
          { name: 'Steel Light', value: '#6b7280', description: 'Light steel gray' },
          { name: 'Steel', value: '#4b5563', description: 'Primary steel tone' },
          { name: 'Steel Dark', value: '#374151', description: 'Dark steel for depth' },
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
}
