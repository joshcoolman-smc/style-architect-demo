
import { FontFamily } from '../types/typography.types';

export interface ITypographyRepository {
  getFontFamilies(): FontFamily[];
}

export class TypographyRepository implements ITypographyRepository {
  getFontFamilies(): FontFamily[] {
    return [
      {
        name: 'Heading',
        family: 'Montserrat',
        class: 'font-structural',
        description: 'STRUCTURAL / MONTSERRAT'
      },
      {
        name: 'Subheading',
        family: 'Lora',
        class: 'font-subheader',
        description: 'SUBHEADER / LORA'
      },
      {
        name: 'Body',
        family: 'Hind Madurai',
        class: 'font-content',
        description: 'CONTENT / HIND MADURAI'
      }
    ];
  }
}
