
import React from 'react';
import ColorSwatch from './ColorSwatch';
import GradientContainer from '../../shared/components/GradientContainer';
import { useColorPalette } from '../hooks/useColorPalette';

const ColorPalette = () => {
  const { categories, copiedColor, copyToClipboard } = useColorPalette();

  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-display-xl font-bold text-card-foreground mb-2">Color Palette</h1>
        <p className="text-lg text-muted-foreground">
          A sophisticated three-tier color system with light, mid, and dark tones for comprehensive design flexibility.
        </p>
      </div>

      {/* Color Categories */}
      {categories.map((category) => (
        <GradientContainer key={category.name} className="p-8">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-card-foreground mb-2">{category.name}</h2>
            <p className="text-muted-foreground">{category.description}</p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {category.colors.map((color) => {
              const isSemanticColor = category.name === 'Semantic Colors';
              
              return (
                <ColorSwatch
                  key={color.name}
                  name={color.name}
                  value={color.value}
                  description={color.description}
                  onCopy={copyToClipboard}
                  isCopied={copiedColor === color.value}
                  isSemanticColor={isSemanticColor}
                />
              );
            })}
          </div>
        </GradientContainer>
      ))}

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
