
import React, { useRef } from 'react';
import { RefreshCcw, Upload } from 'lucide-react';
import ColorSwatch from './ColorSwatch';
import GradientContainer from '../../shared/components/GradientContainer';
import { useColorPalette } from '../hooks/useColorPalette';

const ColorPalette = () => {
  const { categories, copiedColor, isAnalyzing, copyToClipboard, generateNewPalette, generatePaletteFromImage } = useColorPalette();
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-12">
      {/* Single Color Card with Three Rows */}
      <GradientContainer className="p-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-card-foreground">Colors</h2>
            <p className="text-sm text-muted-foreground mt-1">
              Upload an image to generate a palette or click refresh to generate a random palette
            </p>
          </div>
          <div className="flex items-center gap-2">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
            <button
              onClick={handleUploadClick}
              disabled={isAnalyzing}
              className="flex items-center justify-center w-10 h-10 rounded-lg bg-card-foreground/10 hover:bg-card-foreground/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              title="Upload image to generate palette"
            >
              {isAnalyzing ? (
                <div className="w-5 h-5 border-2 border-card-foreground/20 border-t-card-foreground rounded-full animate-spin" />
              ) : (
                <Upload className="w-5 h-5 text-card-foreground" />
              )}
            </button>
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
      </GradientContainer>

      {/* Usage Examples */}
      <GradientContainer className="p-8">
        <h2 className="text-2xl font-bold text-card-foreground mb-6">Usage Examples</h2>
        
        <div className="grid lg:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-card-foreground mb-4">Button Variations</h3>
            <div className="space-y-3">
              <button className="ds-button-primary">
                Primary Button
              </button>
              <button className="ds-button-secondary">
                Secondary Button
              </button>
              <button 
                className="px-4 py-2 rounded-lg font-medium transition-colors text-white"
                style={{ backgroundColor: '#3F8DA4' }}
              >
                Mid Tone Button
              </button>
              <button 
                className="px-4 py-2 rounded-lg font-medium transition-colors text-white"
                style={{ backgroundColor: '#005A78' }}
              >
                Dark Tone Button
              </button>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-card-foreground mb-4">Color Combinations</h3>
            <div className="space-y-3">
              <div className="p-4 rounded-lg" style={{ backgroundColor: '#E0C9A0', color: '#005A78' }}>
                <span className="text-sm font-medium">Light background with dark text</span>
              </div>
              <div className="p-4 rounded-lg" style={{ backgroundColor: '#3F8DA4', color: '#E0C9A0' }}>
                <span className="text-sm font-medium">Mid tone with light accent</span>
              </div>
              <div className="p-4 rounded-lg" style={{ backgroundColor: '#233E49', color: '#BABAAC' }}>
                <span className="text-sm font-medium">Dark background with light text</span>
              </div>
            </div>
          </div>
        </div>
      </GradientContainer>
    </div>
  );
};

export default ColorPalette;
