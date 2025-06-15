import React from 'react';
import { ColorService } from '../service/colorService';
import { ColorPaletteData } from '../types/color.types';
import { useColorStore } from '../../../stores/colorStore';

export const useColorPalette = () => {
  const { categories, updateCategories, updatePalette } = useColorStore();
  const [copiedColor, setCopiedColor] = React.useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = React.useState(false);
  const [uploadedImage, setUploadedImage] = React.useState<string | null>(null);
  const [originalImageFile, setOriginalImageFile] = React.useState<File | null>(null);

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

  const generateNewPalette = async () => {
    // If we have an uploaded image, regenerate from that image
    if (originalImageFile) {
      setIsAnalyzing(true);
      try {
        const newPalette = await colorService.generatePaletteFromImage(originalImageFile);
        updateColorPalette(newPalette);
      } catch (error) {
        console.error('Failed to regenerate palette from image:', error);
      } finally {
        setIsAnalyzing(false);
      }
    } else {
      // Otherwise generate a random palette
      const newPalette = colorService.generateNewPalette();
      updateColorPalette(newPalette);
    }
  };

  const generatePaletteFromImage = async (imageFile: File) => {
    setIsAnalyzing(true);
    try {
      // Store both the image data URL and the original file
      const imageDataUrl = URL.createObjectURL(imageFile);
      setUploadedImage(imageDataUrl);
      setOriginalImageFile(imageFile);
      
      const newPalette = await colorService.generatePaletteFromImage(imageFile);
      updateColorPalette(newPalette);
    } catch (error) {
      console.error('Failed to generate palette from image:', error);
      setUploadedImage(null);
      setOriginalImageFile(null);
      throw error;
    } finally {
      setIsAnalyzing(false);
    }
  };

  const clearUploadedImage = () => {
    if (uploadedImage) {
      URL.revokeObjectURL(uploadedImage);
    }
    setUploadedImage(null);
    setOriginalImageFile(null);
    
    // Generate a new random palette when clearing the image
    const newPalette = colorService.generateNewPalette();
    updateColorPalette(newPalette);
  };

  return {
    categories,
    copiedColor,
    isAnalyzing,
    uploadedImage,
    copyToClipboard,
    updateColorPalette,
    generateNewPalette,
    generatePaletteFromImage,
    clearUploadedImage,
  };
};
