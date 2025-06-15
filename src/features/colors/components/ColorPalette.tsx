
import React, { useRef } from 'react';
import { RefreshCcw, ImagePlus, X } from 'lucide-react';
import ColorSwatch from './ColorSwatch';
import ImagePaletteComparison from './ImagePaletteComparison';
import ImageUploadDialog from './ImageUploadDialog';
import GradientContainer from '../../shared/components/GradientContainer';
import { ColorApplicationShowcase } from './ColorApplicationShowcase';
import { useColorPalette } from '../hooks/useColorPalette';

const ColorPalette = () => {
  const { 
    categories, 
    copiedColor, 
    isAnalyzing, 
    uploadedImage,
    copyToClipboard, 
    generateNewPalette, 
    generatePaletteFromImage,
    clearUploadedImage
  } = useColorPalette();
  
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  // Get all colors from all categories
  const allColors = categories.flatMap(category => category.colors);
  
  // Group colors by tone (using the actual category names)
  const lightColors = categories.find(cat => cat.name === 'Light Tones')?.colors || [];
  const midColors = categories.find(cat => cat.name === 'Mid Tones')?.colors || [];
  const darkColors = categories.find(cat => cat.name === 'Dark Tones')?.colors || [];

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }

    try {
      await generatePaletteFromImage(file);
    } catch (error) {
      console.error('Error generating palette from image:', error);
      alert('Failed to analyze image. Please try another image.');
    }

    // Reset the file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSampleImageSelect = async () => {
    try {
      // Pick a random sample image
      const randomImage = sampleImages[Math.floor(Math.random() * sampleImages.length)];
      
      // Fetch the image and convert to File object
      const response = await fetch(randomImage);
      const blob = await response.blob();
      const filename = randomImage.split('/').pop() || 'sample-image.png';
      const file = new File([blob], filename, { type: blob.type });
      
      await generatePaletteFromImage(file);
    } catch (error) {
      console.error('Error loading sample image:', error);
      alert('Failed to load sample image. Please try another one.');
    }
  };

  const handleUploadClick = () => {
    setDialogOpen(true);
  };

  const handleClearImage = () => {
    clearUploadedImage();
  };

  return (
    <div className="space-y-12">
      {/* Colors Section */}
      <GradientContainer className="p-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-card-foreground">Colors</h2>
            <p className="text-sm text-muted-foreground mt-1">
              {uploadedImage 
                ? "Image-based color palette comparison"
                : "Upload an image to generate a palette or click refresh to generate a random palette"
              }
            </p>
          </div>
          <div className="flex items-center gap-2">
            {uploadedImage ? (
              <button
                onClick={handleClearImage}
                className="flex items-center justify-center w-10 h-10 rounded-lg bg-card-foreground/10 hover:bg-card-foreground/20 transition-colors"
                title="Clear uploaded image"
              >
                <X className="w-5 h-5 text-card-foreground" />
              </button>
            ) : (
              <button
                onClick={handleUploadClick}
                disabled={isAnalyzing}
                className="flex items-center justify-center w-10 h-10 rounded-lg bg-card-foreground/10 hover:bg-card-foreground/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                title="Upload image to generate palette"
              >
                {isAnalyzing ? (
                  <div className="w-5 h-5 border-2 border-card-foreground/20 border-t-card-foreground rounded-full animate-spin" />
                ) : (
                  <ImagePlus className="w-5 h-5 text-card-foreground" />
                )}
              </button>
            )}
            
            <button
              onClick={generateNewPalette}
              disabled={isAnalyzing}
              className="flex items-center justify-center w-10 h-10 rounded-lg bg-card-foreground/10 hover:bg-card-foreground/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              title="Generate new color palette"
            >
              <RefreshCcw className="w-5 h-5 text-card-foreground" />
            </button>
          </div>
        </div>

        {uploadedImage ? (
          <ImagePaletteComparison
            imageUrl={uploadedImage}
            onCopyColor={copyToClipboard}
            copiedColor={copiedColor}
          />
        ) : (
          <div className="space-y-6">
            {/* Light Colors Row */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {lightColors.map((color) => (
                <ColorSwatch
                  key={color.name}
                  name={color.name}
                  value={color.value}
                  description={color.description}
                  onCopy={copyToClipboard}
                  isCopied={copiedColor === color.value}
                />
              ))}
            </div>

            {/* Mid Colors Row */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {midColors.map((color) => (
                <ColorSwatch
                  key={color.name}
                  name={color.name}
                  value={color.value}
                  description={color.description}
                  onCopy={copyToClipboard}
                  isCopied={copiedColor === color.value}
                />
              ))}
            </div>

            {/* Dark Colors Row */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {darkColors.map((color) => (
                <ColorSwatch
                  key={color.name}
                  name={color.name}
                  value={color.value}
                  description={color.description}
                  onCopy={copyToClipboard}
                  isCopied={copiedColor === color.value}
                />
              ))}
            </div>
          </div>
        )}
      </GradientContainer>

      {/* Usage Examples */}
      <GradientContainer className="p-8">
        <h2 className="text-2xl font-bold text-card-foreground mb-6">Usage Examples</h2>
        
        <ColorApplicationShowcase 
          categories={categories}
          isLoading={isAnalyzing}
          isTransitioning={false}
        />
      </GradientContainer>

      {/* Image Upload Dialog */}
      <ImageUploadDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onFileUpload={handleImageUpload}
        onSampleImageSelect={handleSampleImageSelect}
        isAnalyzing={isAnalyzing}
      />
    </div>
  );
};

export default ColorPalette;
