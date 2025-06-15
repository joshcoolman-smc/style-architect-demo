/**
 * Lazy-loaded image analysis utility
 * This module provides dynamic import for the heavy image processing logic
 */
import { ColorPaletteData } from '../types/color.types';

let imageAnalysisModule: typeof import('./imageAnalysis') | null = null;

/**
 * Lazy-load the image analysis module and extract palette from image
 * @param imageSrc Base64 image source
 * @param numColorsToExtract Number of colors to extract (default: 9)
 * @returns Promise resolving to color palette data
 */
export async function extractPaletteFromImageLazy(
  imageSrc: string, 
  numColorsToExtract = 9
): Promise<ColorPaletteData> {
  // Load the module only when needed
  if (!imageAnalysisModule) {
    imageAnalysisModule = await import('./imageAnalysis');
  }
  
  return imageAnalysisModule.extractPaletteFromImage(imageSrc, numColorsToExtract);
}

/**
 * Preload the image analysis module for better performance
 * Call this when the user is likely to use image analysis soon
 */
export function preloadImageAnalysis(): Promise<typeof import('./imageAnalysis')> {
  if (imageAnalysisModule) {
    return Promise.resolve(imageAnalysisModule);
  }
  
  return import('./imageAnalysis').then(module => {
    imageAnalysisModule = module;
    return module;
  });
}