
import { z } from 'zod';

export const FontFamilySchema = z.object({
  name: z.string(),
  family: z.string(),
  class: z.string(),
  description: z.string(),
});

export type FontFamily = z.infer<typeof FontFamilySchema>;

export interface TypographyState {
  fontFamilies: FontFamily[];
}
