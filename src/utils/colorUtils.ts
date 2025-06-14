
/**
 * Calculate the relative luminance of a color
 * Based on WCAG 2.1 guidelines
 */
export const calculateLuminance = (hex: string): number => {
  const rgb = hexToRgb(hex);
  if (!rgb) return 0;
  
  const { r, g, b } = rgb;
  
  // Convert RGB to relative luminance
  const rsRGB = r / 255;
  const gsRGB = g / 255;
  const bsRGB = b / 255;
  
  const rLinear = rsRGB <= 0.03928 ? rsRGB / 12.92 : Math.pow((rsRGB + 0.055) / 1.055, 2.4);
  const gLinear = gsRGB <= 0.03928 ? gsRGB / 12.92 : Math.pow((gsRGB + 0.055) / 1.055, 2.4);
  const bLinear = bsRGB <= 0.03928 ? bsRGB / 12.92 : Math.pow((bsRGB + 0.055) / 1.055, 2.4);
  
  return 0.2126 * rLinear + 0.7152 * gLinear + 0.0722 * bLinear;
};

/**
 * Convert hex color to RGB
 */
export const hexToRgb = (hex: string) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
};

/**
 * Lighten or darken a hex color by a percentage
 */
export const adjustColorLightness = (hex: string, percent: number): string => {
  const rgb = hexToRgb(hex);
  if (!rgb) return hex;
  
  const { r, g, b } = rgb;
  
  const adjustedR = Math.max(0, Math.min(255, r + (255 - r) * percent));
  const adjustedG = Math.max(0, Math.min(255, g + (255 - g) * percent));
  const adjustedB = Math.max(0, Math.min(255, b + (255 - b) * percent));
  
  return `#${Math.round(adjustedR).toString(16).padStart(2, '0')}${Math.round(adjustedG).toString(16).padStart(2, '0')}${Math.round(adjustedB).toString(16).padStart(2, '0')}`;
};

/**
 * Get the appropriate text color for a given background color
 * Returns a tinted version of the background color for better readability
 */
export const getReadableTextColor = (backgroundColor: string): string => {
  const luminance = calculateLuminance(backgroundColor);
  
  // If the background is dark, return a much lighter version
  if (luminance < 0.5) {
    return adjustColorLightness(backgroundColor, 0.7);
  }
  
  // If the background is light, return a much darker version
  return adjustColorLightness(backgroundColor, -0.7);
};
