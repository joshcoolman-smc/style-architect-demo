
import { z } from 'zod';

export const ColorSwatchSchema = z.object({
  name: z.string(),
  value: z.string().regex(/^#[0-9A-Fa-f]{6}$/),
  description: z.string(),
});

export const ColorCategorySchema = z.object({
  name: z.string(),
  description: z.string(),
  colors: z.array(ColorSwatchSchema),
});

export type ColorSwatch = z.infer<typeof ColorSwatchSchema>;
export type ColorCategory = z.infer<typeof ColorCategorySchema>;

export interface ColorPaletteState {
  categories: ColorCategory[];
  copiedColor: string | null;
}

// New color palette structure
export interface ColorPaletteData {
  "light-1": string;
  "light-2": string;
  "light-3": string;
  "mid-1": string;
  "mid-2": string;
  "mid-3": string;
  "dark-1": string;
  "dark-2": string;
  "dark-3": string;
}
