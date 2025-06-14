
import React from 'react';
import { ColorService } from '../service/colorService';
import { ColorPaletteState } from '../types/color.types';

export const useColorPalette = () => {
  const [state, setState] = React.useState<ColorPaletteState>({
    categories: [],
    copiedColor: null,
  });

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

  return {
    categories: state.categories,
    copiedColor: state.copiedColor,
    copyToClipboard,
  };
};
