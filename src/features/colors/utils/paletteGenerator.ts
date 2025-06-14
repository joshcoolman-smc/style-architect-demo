
import { ColorPaletteData } from '../types/color.types';

export function generateAlgorithmicPalette(): ColorPaletteData {
  // Helper function to convert RGB to hex
  function rgbToHex({ r, g, b }: { r: number; g: number; b: number }) {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase();
  }

  // Helper function to convert HSL to RGB
  function hslToRgb(h: number, s: number, l: number) {
    const c = (1 - Math.abs(2 * l - 1)) * s;
    const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
    const m = l - c / 2;

    let r = 0, g = 0, b = 0;

    if (0 <= h && h < 60) {
      r = c; g = x; b = 0;
    } else if (60 <= h && h < 120) {
      r = x; g = c; b = 0;
    } else if (120 <= h && h < 180) {
      r = 0; g = c; b = x;
    } else if (180 <= h && h < 240) {
      r = 0; g = x; b = c;
    } else if (240 <= h && h < 300) {
      r = x; g = 0; b = c;
    } else if (300 <= h && h < 360) {
      r = c; g = 0; b = x;
    }

    return {
      r: Math.round((r + m) * 255),
      g: Math.round((g + m) * 255),
      b: Math.round((b + m) * 255)
    };
  }

  // Generate harmonious base hues using color theory
  function generateBaseHues() {
    const baseHue = Math.random() * 360;
    
    // Create a triadic color scheme (120° apart) for maximum harmony
    return [
      baseHue,
      (baseHue + 120) % 360,
      (baseHue + 240) % 360
    ];
  }

  // Create light, mid, and dark variations of a hue
  function createColorVariations(hue: number) {
    // Vary saturation slightly for each hue to add interest
    const baseSaturation = 0.65 + (Math.random() - 0.5) * 0.2; // 55-75% saturation
    
    const light = hslToRgb(
      hue + (Math.random() - 0.5) * 15, // Slight hue variation
      baseSaturation * 0.5, // Lower saturation for light colors
      0.80 + Math.random() * 0.15 // 80-95% lightness
    );
    
    const mid = hslToRgb(
      hue + (Math.random() - 0.5) * 10, // Slight hue variation
      baseSaturation, // Full saturation for mid tones
      0.50 + Math.random() * 0.15 // 50-65% lightness
    );
    
    const dark = hslToRgb(
      hue + (Math.random() - 0.5) * 10, // Slight hue variation
      baseSaturation * 0.8, // Slightly reduced saturation for dark colors
      0.20 + Math.random() * 0.15 // 20-35% lightness
    );
    
    return { light, mid, dark };
  }

  // Generate the complete palette
  const baseHues = generateBaseHues();
  const lightColors: string[] = [];
  const midColors: string[] = [];
  const darkColors: string[] = [];
  
  baseHues.forEach(hue => {
    const variations = createColorVariations(hue);
    
    lightColors.push(rgbToHex(variations.light));
    midColors.push(rgbToHex(variations.mid));
    darkColors.push(rgbToHex(variations.dark));
  });

  // Return the palette in the expected JSON structure
  return {
    "light-1": lightColors[0],
    "light-2": lightColors[1], 
    "light-3": lightColors[2],
    "mid-1": midColors[0],
    "mid-2": midColors[1],
    "mid-3": midColors[2],
    "dark-1": darkColors[0],
    "dark-2": darkColors[1],
    "dark-3": darkColors[2]
  };
}
