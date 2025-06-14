
import React from 'react';
import { ColorService } from '../service/colorService';
import { ColorPaletteState, ColorPaletteData } from '../types/color.types';

export const useColorPalette = () => {
  const [state, setState] = React.useState<ColorPaletteState>({
    categories: [],
    copiedColor: null,
  });

  const [isAnalyzing, setIsAnalyzing] = React.useState(false);

  const colorService = React.useMemo(() => new ColorService(), []);

  React.useEffect(() => {
    const categories = colorService.getColorCategories();
    setState(prev => ({ ...prev, categories }));
  }, [colorService]);

  const copyToClipboard = async (value: string) => {
    try {
      await colorService.copyColorToClipboard(value);
      setState(prev => ({ ...prev, copiedColor: value }));
      setTimeout(() => {
        setState(prev => ({ ...prev, copiedColor: null }));
      }, 2000);
    } catch (err) {
      console.error('Failed to copy color:', err);
    }
  };

  const updateColorPalette = (palette: ColorPaletteData) => {
    colorService.updateColorPalette(palette);
    const categories = colorService.getColorCategories();
    setState(prev => ({ ...prev, categories }));
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
    categories: state.categories,
    copiedColor: state.copiedColor,
    isAnalyzing,
    copyToClipboard,
    updateColorPalette,
    generateNewPalette,
    generatePaletteFromImage,
  };
};
