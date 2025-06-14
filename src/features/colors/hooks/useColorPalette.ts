
import React from 'react';
import { ColorService } from '../service/colorService';
import { ColorPaletteData } from '../types/color.types';
import { useColorStore } from '../../../stores/colorStore';

export const useColorPalette = () => {
  const { categories, updateCategories, updatePalette } = useColorStore();
  const [copiedColor, setCopiedColor] = React.useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = React.useState(false);

  const colorService = React.useMemo(() => new ColorService(), []);

  React.useEffect(() => {
    const categories = colorService.getColorCategories();
    updateCategories(categories);
  }, [colorService, updateCategories]);

  const copyToClipboard = async (value: string) => {
    try {
      await colorService.copyColorToClipboard(value);
      setCopiedColor(value);
      setTimeout(() => {
        setCopiedColor(null);
      }, 2000);
    } catch (err) {
      console.error('Failed to copy color:', err);
    }
  };

  const updateColorPalette = (palette: ColorPaletteData) => {
    colorService.updateColorPalette(palette);
    updatePalette(palette);
    const categories = colorService.getColorCategories();
    updateCategories(categories);
  };

  const generateNewPalette = () => {
    const newPalette = colorService.generateNewPalette();
    updateColorPalette(newPalette);
  };

  const generatePaletteFromImage = async (imageFile: File) => {
    setIsAnalyzing(true);
    try {
      const newPalette = await colorService.generatePaletteFromImage(imageFile);
      updateColorPalette(newPalette);
    } catch (error) {
      console.error('Failed to generate palette from image:', error);
      throw error;
    } finally {
      setIsAnalyzing(false);
    }
  };

  return {
    categories,
    copiedColor,
    isAnalyzing,
    copyToClipboard,
    updateColorPalette,
    generateNewPalette,
    generatePaletteFromImage,
  };
};
