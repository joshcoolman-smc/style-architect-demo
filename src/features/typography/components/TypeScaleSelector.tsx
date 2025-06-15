
import React, { useState, useEffect } from 'react';
import GradientContainer from '../../../components/GradientContainer';
import { Slider } from '../../../components/ui/slider';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../../components/ui/select';

const TypeScaleSelector = () => {
  const [selectedScale, setSelectedScale] = useState('minor-third');
  const [baseSize, setBaseSize] = useState([16]); // Default to 16px (web standard)

  const typeScales = [
    { value: 'minor-third', label: 'Minor Third', ratio: 1.2 },
    { value: 'major-third', label: 'Major Third', ratio: 1.25 },
    { value: 'perfect-fourth', label: 'Perfect Fourth', ratio: 1.333 },
    { value: 'augmented-fourth', label: 'Augmented Fourth', ratio: 1.414 },
    { value: 'perfect-fifth', label: 'Perfect Fifth', ratio: 1.5 },
    { value: 'golden-ratio', label: 'Golden Ratio', ratio: 1.618 },
  ];

  const applyTypeScale = (ratio: number, baseFontSize: number) => {
    // Proper geometric progression: each level is base × ratio^n
    const caption = Math.round(baseFontSize * 0.75); // Smaller than base
    const body = baseFontSize; // Base size
    const heading3 = Math.round(baseFontSize * Math.pow(ratio, 1)); // base × ratio¹
    const heading2 = Math.round(baseFontSize * Math.pow(ratio, 2)); // base × ratio²
    const heading1 = Math.round(baseFontSize * Math.pow(ratio, 3)); // base × ratio³
    
    // Apply to CSS custom properties
    document.documentElement.style.setProperty('--font-size-caption', `${caption}px`);
    document.documentElement.style.setProperty('--font-size-body', `${body}px`);
    document.documentElement.style.setProperty('--font-size-heading-3', `${heading3}px`);
    document.documentElement.style.setProperty('--font-size-heading-2', `${heading2}px`);
    document.documentElement.style.setProperty('--font-size-heading-1', `${heading1}px`);
    
    console.log('Applied type scale:', { 
      ratio, 
      baseSize: baseFontSize,
      sizes: { caption, body, heading3, heading2, heading1 }
    });
  };

  const handleScaleChange = (value: string) => {
    setSelectedScale(value);
    const selectedTypeScale = typeScales.find(scale => scale.value === value);
    if (selectedTypeScale) {
      applyTypeScale(selectedTypeScale.ratio, baseSize[0]);
    }
    console.log('Selected scale:', value);
  };

  const handleBaseSizeChange = (value: number[]) => {
    setBaseSize(value);
    const selectedTypeScale = typeScales.find(scale => scale.value === selectedScale);
    if (selectedTypeScale) {
      applyTypeScale(selectedTypeScale.ratio, value[0]);
    }
    console.log('Base size changed:', value[0]);
  };

  const getCurrentRatio = () => {
    const currentScale = typeScales.find(scale => scale.value === selectedScale);
    return currentScale ? currentScale.ratio.toString() : '1.2';
  };

  // Apply initial scale on mount
  useEffect(() => {
    const initialScale = typeScales.find(scale => scale.value === selectedScale);
    if (initialScale) {
      applyTypeScale(initialScale.ratio, baseSize[0]);
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
              <span className="ds-text-technical-light text-muted-foreground">Base: {baseSize[0]}px</span>
            </div>
          </div>
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
        </div>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-white font-inter text-sm">Base Font Size</label>
            <span className="ds-text-technical-light text-muted-foreground">{baseSize[0]}px</span>
          </div>
          <Slider
            value={baseSize}
            onValueChange={handleBaseSizeChange}
            max={24}
            min={12}
            step={1}
            className="w-full"
          />
        </div>
      </div>
    </GradientContainer>
  );
};

export default TypeScaleSelector;
