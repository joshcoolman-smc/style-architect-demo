/**
 * Utility functions for ensuring proper color contrast and readability
 * while preserving color variety through luminance adjustments
 */

// Convert hex to RGB
export const hexToRgb = (hex: string): { r: number; g: number; b: number } | null => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
};

// Convert RGB to hex
export const rgbToHex = (r: number, g: number, b: number): string => {
  return "#" + ((1 << 24) + (Math.round(r) << 16) + (Math.round(g) << 8) + Math.round(b)).toString(16).slice(1).toUpperCase();
};

// Convert hex to HSL
export const hexToHsl = (hex: string): { h: number; s: number; l: number } | null => {
  const rgb = hexToRgb(hex);
  if (!rgb) return null;

  const r = rgb.r / 255;
  const g = rgb.g / 255;
  const b = rgb.b / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }

  return { h: h * 360, s: s * 100, l: l * 100 };
};

// Convert HSL to hex
export const hslToHex = (h: number, s: number, l: number): string => {
  h = ((h % 360) + 360) % 360; // Normalize hue
  s = Math.max(0, Math.min(100, s)) / 100;
  l = Math.max(0, Math.min(100, l)) / 100;

  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs((h / 60) % 2 - 1));
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

  return rgbToHex((r + m) * 255, (g + m) * 255, (b + m) * 255);
};

// Calculate relative luminance according to WCAG
export const getLuminance = (hex: string): number => {
  const rgb = hexToRgb(hex);
  if (!rgb) return 0;

  // Convert to sRGB
  const rsRGB = rgb.r / 255;
  const gsRGB = rgb.g / 255;
  const bsRGB = rgb.b / 255;

  // Apply gamma correction
  const rLinear = rsRGB <= 0.03928 ? rsRGB / 12.92 : Math.pow((rsRGB + 0.055) / 1.055, 2.4);
  const gLinear = gsRGB <= 0.03928 ? gsRGB / 12.92 : Math.pow((gsRGB + 0.055) / 1.055, 2.4);
  const bLinear = bsRGB <= 0.03928 ? bsRGB / 12.92 : Math.pow((bsRGB + 0.055) / 1.055, 2.4);

  // Calculate luminance
  return 0.2126 * rLinear + 0.7152 * gLinear + 0.0722 * bLinear;
};

// Calculate contrast ratio between two colors
export const getContrastRatio = (color1: string, color2: string): number => {
  const lum1 = getLuminance(color1);
  const lum2 = getLuminance(color2);
  const brightest = Math.max(lum1, lum2);
  const darkest = Math.min(lum1, lum2);
  return (brightest + 0.05) / (darkest + 0.05);
};

// Check if a color is considered "dark" (luminance < 0.5)
export const isDark = (hex: string): boolean => {
  return getLuminance(hex) < 0.5;
};

/**
 * Adjust a color's luminance while preserving hue and saturation
 * to ensure minimum readability against a background
 */
export const adjustColorForContrast = (
  textColor: string,
  backgroundColor: string,
  minContrastRatio = 3.0, // Lower than WCAG for visual variety while maintaining readability
  textType: 'primary' | 'secondary' | 'tertiary' = 'primary'
): string => {
  // Adjust minimum contrast based on text importance
  const contrastTargets = {
    primary: minContrastRatio,
    secondary: Math.max(2.5, minContrastRatio * 0.8),
    tertiary: Math.max(2.0, minContrastRatio * 0.7)
  };
  
  const targetRatio = contrastTargets[textType];
  const currentRatio = getContrastRatio(textColor, backgroundColor);
  
  // If contrast is already sufficient, return original color
  if (currentRatio >= targetRatio) {
    return textColor;
  }

  const hsl = hexToHsl(textColor);
  if (!hsl) return textColor;

  const backgroundLuminance = getLuminance(backgroundColor);
  const textLuminance = getLuminance(textColor);
  
  // Determine if we need to make the text lighter or darker
  const needsLighter = backgroundLuminance > textLuminance;
  
  // Preserve hue and saturation, adjust lightness
  let { h, s, l } = hsl;
  
  // Binary search for the right lightness value
  let minL = needsLighter ? l : 0;
  let maxL = needsLighter ? 100 : l;
  let attempts = 0;
  const maxAttempts = 20;
  
  while (attempts < maxAttempts && Math.abs(maxL - minL) > 1) {
    const testL = (minL + maxL) / 2;
    const testColor = hslToHex(h, s, testL);
    const testRatio = getContrastRatio(testColor, backgroundColor);
    
    if (testRatio >= targetRatio) {
      if (needsLighter) {
        minL = testL;
      } else {
        maxL = testL;
      }
    } else {
      if (needsLighter) {
        maxL = testL;
      } else {
        minL = testL;
      }
    }
    attempts++;
  }
  
  const finalL = needsLighter ? maxL : minL;
  return hslToHex(h, s, finalL);
};

/**
 * Get contrasting colors that preserve variety while ensuring readability
 */
export const getVariedContrastColors = (
  backgroundColor: string,
  primaryColor: string,
  secondaryColor: string,
  tertiaryColor: string,
  minContrastRatio = 3.0
) => {
  return {
    primary: adjustColorForContrast(primaryColor, backgroundColor, minContrastRatio, 'primary'),
    secondary: adjustColorForContrast(secondaryColor, backgroundColor, minContrastRatio, 'secondary'),
    tertiary: adjustColorForContrast(tertiaryColor, backgroundColor, minContrastRatio, 'tertiary')
  };
};

// Legacy functions for backward compatibility
export const getContrastingTextColor = (backgroundColor: string, lightColor = '#FFFFFF', darkColor = '#000000'): string => {
  const backgroundLuminance = getLuminance(backgroundColor);
  return backgroundLuminance < 0.5 ? lightColor : darkColor;
};

export const ensureContrast = (
  textColor: string, 
  backgroundColor: string, 
  minRatio = 4.5,
  fallbackLight = '#FFFFFF',
  fallbackDark = '#000000'
): string => {
  return adjustColorForContrast(textColor, backgroundColor, minRatio, 'primary');
};

export const ensureContrastForSecondaryText = (
  textColor: string,
  backgroundColor: string,
  fallbackLight = '#E5E5E5',
  fallbackDark = '#666666'
): string => {
  return adjustColorForContrast(textColor, backgroundColor, 2.5, 'secondary');
};

export const getHighContrastColors = (backgroundColor: string) => {
  const isBackgroundDark = isDark(backgroundColor);
  
  return {
    primary: isBackgroundDark ? '#FFFFFF' : '#000000',
    secondary: isBackgroundDark ? '#E5E5E5' : '#4A4A4A',
    muted: isBackgroundDark ? '#B0B0B0' : '#737373',
    accent: isBackgroundDark ? '#60A5FA' : '#2563EB',
  };
};

/**
 * Invert color relationships by swapping light and dark tones
 */
export const invertColorScheme = (
  lightColors: Array<{ value: string }>,
  midColors: Array<{ value: string }>,
  darkColors: Array<{ value: string }>,
  palette: Record<string, string>
) => {
  return {
    lightColors: darkColors, // Dark becomes light
    midColors: midColors,    // Mid stays mid
    darkColors: lightColors, // Light becomes dark
    palette: {
      ...palette,
      // Swap the palette mappings too
      "light-1": palette["dark-1"],
      "light-2": palette["dark-2"], 
      "light-3": palette["dark-3"],
      "dark-1": palette["light-1"],
      "dark-2": palette["light-2"],
      "dark-3": palette["light-3"],
      // Keep mid-tones the same
      "mid-1": palette["mid-1"],
      "mid-2": palette["mid-2"],
      "mid-3": palette["mid-3"]
    }
  };
};