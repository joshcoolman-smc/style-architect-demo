import React, { useState, useEffect } from 'react';
import GradientContainer from '../../../components/GradientContainer';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../../components/ui/select';

const TypeScaleSelector = () => {
  const [selectedScale, setSelectedScale] = useState('minor-third');
  const [baseSize, setBaseSize] = useState(16); // Default to 16px (web standard)

  const typeScales = [
    { value: 'minor-second', label: 'Minor Second', ratio: 1.067 },
    { value: 'major-second', label: 'Major Second', ratio: 1.125 },
    { value: 'minor-third', label: 'Minor Third', ratio: 1.2 },
    { value: 'major-third', label: 'Major Third', ratio: 1.25 },
    { value: 'perfect-fourth', label: 'Perfect Fourth', ratio: 1.333 },
    { value: 'augmented-fourth', label: 'Augmented Fourth', ratio: 1.414 },
    { value: 'perfect-fifth', label: 'Perfect Fifth', ratio: 1.5 },
    { value: 'golden-ratio', label: 'Golden Ratio', ratio: 1.618 },
  ];

  const baseSizeOptions = [
    { value: '14', label: '14px' },
    { value: '15', label: '15px' },
    { value: '16', label: '16px' },
    { value: '17', label: '17px' },
  ];

  // Calculate proportional line height based on font size and text type
  const calculateLineHeight = (fontSize: number, textType: 'caption' | 'body' | 'heading') => {
    let baseLineHeightRatio;
    
    // Different base line height ratios for different text types
    switch (textType) {
      case 'caption':
        baseLineHeightRatio = 1.5; // Tighter for small text
        break;
      case 'body':
        baseLineHeightRatio = 1.5; // Comfortable for reading
        break;
      case 'heading':
        baseLineHeightRatio = 1.2; // Tighter for headings, gets looser as size increases
        break;
      default:
        baseLineHeightRatio = 1.4;
    }
    
    // Adjust line height based on font size - larger fonts need relatively tighter line heights
    // but still need adequate spacing
    let adjustedRatio = baseLineHeightRatio;
    
    if (textType === 'heading') {
      // For headings, use a formula that provides appropriate spacing
      // Larger headings get slightly looser line heights
      if (fontSize > 32) {
        adjustedRatio = 1.1;
      } else if (fontSize > 24) {
        adjustedRatio = 1.15;
      } else {
        adjustedRatio = 1.2;
      }
    }
    
    return Math.round(fontSize * adjustedRatio);
  };

  const applyTypeScale = (ratio: number, baseFontSize: number) => {
    // Proper geometric progression: each level is base × ratio^n
    const caption = Math.round(baseFontSize * 0.875); // Slightly smaller than base
    const body = baseFontSize; // Base size
    const heading3 = Math.round(baseFontSize * Math.pow(ratio, 1)); // base × ratio¹
    const heading2 = Math.round(baseFontSize * Math.pow(ratio, 2)); // base × ratio²
    const heading1 = Math.round(baseFontSize * Math.pow(ratio, 3)); // base × ratio³
    
    // Calculate proportional line heights
    const captionLineHeight = calculateLineHeight(caption, 'caption');
    const bodyLineHeight = calculateLineHeight(body, 'body');
    const heading3LineHeight = calculateLineHeight(heading3, 'heading');
    const heading2LineHeight = calculateLineHeight(heading2, 'heading');
    const heading1LineHeight = calculateLineHeight(heading1, 'heading');
    
    // Apply font sizes to CSS custom properties
    document.documentElement.style.setProperty('--font-size-caption', `${caption}px`);
    document.documentElement.style.setProperty('--font-size-body', `${body}px`);
    document.documentElement.style.setProperty('--font-size-heading-3', `${heading3}px`);
    document.documentElement.style.setProperty('--font-size-heading-2', `${heading2}px`);
    document.documentElement.style.setProperty('--font-size-heading-1', `${heading1}px`);
    
    // Apply line heights to CSS custom properties
    document.documentElement.style.setProperty('--line-height-caption', `${captionLineHeight}px`);
    document.documentElement.style.setProperty('--line-height-body', `${bodyLineHeight}px`);
    document.documentElement.style.setProperty('--line-height-heading-3', `${heading3LineHeight}px`);
    document.documentElement.style.setProperty('--line-height-heading-2', `${heading2LineHeight}px`);
    document.documentElement.style.setProperty('--line-height-heading-1', `${heading1LineHeight}px`);
    
    console.log('Applied type scale with proportional line heights:', { 
      ratio, 
      baseSize: baseFontSize,
      sizes: { caption, body, heading3, heading2, heading1 },
      lineHeights: { captionLineHeight, bodyLineHeight, heading3LineHeight, heading2LineHeight, heading1LineHeight }
    });
  };

  const handleScaleChange = (value: string) => {
    setSelectedScale(value);
    const selectedTypeScale = typeScales.find(scale => scale.value === value);
    if (selectedTypeScale) {
      applyTypeScale(selectedTypeScale.ratio, baseSize);
    }
    console.log('Selected scale:', value);
  };

  const handleBaseSizeChange = (value: string) => {
    const newBaseSize = parseInt(value);
    setBaseSize(newBaseSize);
    const selectedTypeScale = typeScales.find(scale => scale.value === selectedScale);
    if (selectedTypeScale) {
      applyTypeScale(selectedTypeScale.ratio, newBaseSize);
    }
    console.log('Base size changed:', newBaseSize);
  };

  const getCurrentRatio = () => {
    const currentScale = typeScales.find(scale => scale.value === selectedScale);
    return currentScale ? currentScale.ratio.toString() : '1.2';
  };

  // Apply initial scale on mount
  useEffect(() => {
    const initialScale = typeScales.find(scale => scale.value === selectedScale);
    if (initialScale) {
      applyTypeScale(initialScale.ratio, baseSize);
    }
  }, []);

  return (
    <GradientContainer className="p-6">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold text-white font-inter">Type Scale</h3>
            <div className="flex gap-4 mt-1">
              <span className="ds-text-technical-light text-muted-foreground">Ratio: {getCurrentRatio()}</span>
              <span className="ds-text-technical-light text-muted-foreground">Base: {baseSize}px</span>
            </div>
          </div>
          <div className="flex gap-3">
            <Select value={selectedScale} onValueChange={handleScaleChange}>
              <SelectTrigger className="w-64 bg-transparent border-white/20 text-white font-inter text-base">
                <SelectValue placeholder="Select a type scale" />
              </SelectTrigger>
              <SelectContent className="bg-zinc-800 border-zinc-700 font-inter text-base">
                {typeScales.map((scale) => (
                  <SelectItem 
                    key={scale.value} 
                    value={scale.value}
                    className="text-white hover:bg-zinc-700 focus:bg-zinc-700 font-inter text-base"
                  >
                    {scale.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select value={baseSize.toString()} onValueChange={handleBaseSizeChange}>
              <SelectTrigger className="w-20 bg-transparent border-white/20 text-white font-inter text-base">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-zinc-800 border-zinc-700 font-inter text-base">
                {baseSizeOptions.map((option) => (
                  <SelectItem 
                    key={option.value} 
                    value={option.value}
                    className="text-white hover:bg-zinc-700 focus:bg-zinc-700 font-inter text-base"
                  >
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </GradientContainer>
  );
};

export default TypeScaleSelector;
