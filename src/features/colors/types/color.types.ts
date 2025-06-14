
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
