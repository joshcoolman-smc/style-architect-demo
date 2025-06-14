
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

  // Generate sophisticated base hues - prefer earth tones and muted colors
  function generateBaseHues() {
    // Choose from sophisticated color ranges that work well together
    const sophisticatedRanges = [
      { min: 15, max: 45 },   // Warm browns/oranges
      { min: 180, max: 220 }, // Cool blues/teals
      { min: 75, max: 110 },  // Muted greens
      { min: 240, max: 280 }, // Purples/violets
      { min: 300, max: 340 }, // Magentas/roses
    ];
    
    // Pick a random sophisticated range
    const range = sophisticatedRanges[Math.floor(Math.random() * sophisticatedRanges.length)];
    const baseHue = range.min + Math.random() * (range.max - range.min);
    
    // Create analogous colors (closer together, more harmonious)
    return [
      baseHue,
      (baseHue + 25 + Math.random() * 15) % 360, // 25-40° apart
      (baseHue + 50 + Math.random() * 15) % 360  // 50-65° apart
    ];
  }

  // Create sophisticated color variations with lower saturation
  function createColorVariations(hue: number) {
    // Much lower saturation for sophisticated look
    const baseSaturation = 0.25 + Math.random() * 0.15; // 25-40% saturation (was 55-75%)
    
    const light = hslToRgb(
      hue + (Math.random() - 0.5) * 8, // Less hue variation for subtlety
      baseSaturation * 0.6, // Even lower saturation for light colors
      0.75 + Math.random() * 0.1 // 75-85% lightness (less variation)
    );
    
    const mid = hslToRgb(
      hue + (Math.random() - 0.5) * 6, // Minimal hue variation
      baseSaturation * 0.9, // Slightly reduced saturation
      0.45 + Math.random() * 0.1 // 45-55% lightness (tighter range)
    );
    
    const dark = hslToRgb(
      hue + (Math.random() - 0.5) * 6, // Minimal hue variation
      baseSaturation * 0.7, // Lower saturation for dark colors
      0.25 + Math.random() * 0.1 // 25-35% lightness (tighter range)
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
