
import React from 'react';
import { ColorService } from '../service/colorService';
import { ColorPaletteData } from '../types/color.types';
import { useColorStore, base64ToFile } from '../../../stores/colorStore';

export const useColorPalette = () => {
  const { 
    categories, 
    palette,
    uploadedImage,
    originalImageFile,
    originalImageFileName,
    originalImageFileType,
    isSampleImage,
    currentSampleIndex,
    isAnalyzing,
    updateCategories, 
    updatePalette,
    setUploadedImage,
    setOriginalImageFile,
    setSampleImageState,
    setIsAnalyzing,
    clearImageState
  } = useColorStore();
  
  const [copiedColor, setCopiedColor] = React.useState<string | null>(null);

  const colorService = React.useMemo(() => new ColorService(), []);

  // Sample images array
  const sampleImages = [
    '/lovable-uploads/7b22b782-4c1f-4ee7-ba00-ada76ecd8f87.png',
    '/lovable-uploads/e49ac76e-0b00-474b-aed2-48b1d6495f9f.png',
    '/lovable-uploads/ded06afa-e63e-4ae5-ae9c-ea01f1b7e609.png',
    '/lovable-uploads/45e8e9c6-3afc-4d99-a225-3cc766d0b947.png',
    '/lovable-uploads/e7f46332-598d-4741-9cdf-676a492444ee.png',
    '/lovable-uploads/ebf33618-35ec-494a-b9a5-718e7db97000.png',
    '/lovable-uploads/f1a2fb77-285c-4ed3-89f0-3e1f408db11e.png',
    '/lovable-uploads/ca87949a-4b19-4eaa-9aed-9cf381550219.png',
    '/lovable-uploads/5122156b-c4e4-416a-a133-85e7ca00bfb3.png'
  ];

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
    if (originalImageFile && originalImageFileName && originalImageFileType) {
      setIsAnalyzing(true);
      try {
        const file = base64ToFile(originalImageFile, originalImageFileName, originalImageFileType);
        const newPalette = await colorService.generatePaletteFromImage(file);
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
      await setOriginalImageFile(imageFile);
      setSampleImageState(imageDataUrl, 0); // Reset sample image state
      
      const newPalette = await colorService.generatePaletteFromImage(imageFile);
      updateColorPalette(newPalette);
    } catch (error) {
      console.error('Failed to generate palette from image:', error);
      clearImageState();
      throw error;
    } finally {
      setIsAnalyzing(false);
    }
  };

  const generatePaletteFromSampleImage = async (imageIndex?: number) => {
    setIsAnalyzing(true);
    try {
      // Use provided index or pick a random one
      const selectedIndex = imageIndex ?? Math.floor(Math.random() * sampleImages.length);
      const selectedImage = sampleImages[selectedIndex];
      
      // Fetch the image and convert to File object
      const response = await fetch(selectedImage);
      const blob = await response.blob();
      const filename = selectedImage.split('/').pop() || 'sample-image.png';
      const file = new File([blob], filename, { type: blob.type });
      
      // Set the sample image state
      setSampleImageState(selectedImage, selectedIndex);
      await setOriginalImageFile(file);
      
      const newPalette = await colorService.generatePaletteFromImage(file);
      updateColorPalette(newPalette);
    } catch (error) {
      console.error('Failed to load sample image:', error);
      throw error;
    } finally {
      setIsAnalyzing(false);
    }
  };

  const cycleToNextSampleImage = async () => {
    if (!isSampleImage) return;
    
    const nextIndex = (currentSampleIndex + 1) % sampleImages.length;
    await generatePaletteFromSampleImage(nextIndex);
  };

  const clearUploadedImage = () => {
    if (uploadedImage && !isSampleImage) {
      URL.revokeObjectURL(uploadedImage);
    }
    clearImageState();
    
    // Generate a new random palette when clearing the image
    const newPalette = colorService.generateNewPalette();
    updateColorPalette(newPalette);
  };

  return {
    categories,
    copiedColor,
    isAnalyzing,
    uploadedImage,
    isSampleImage,
    copyToClipboard,
    updateColorPalette,
    generateNewPalette,
    generatePaletteFromImage,
    generatePaletteFromSampleImage,
    cycleToNextSampleImage,
    clearUploadedImage,
  };
};
