
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

  const typeScales = [
    { value: 'minor-third', label: 'Minor Third', ratio: 1.2 },
    { value: 'major-third', label: 'Major Third', ratio: 1.25 },
    { value: 'perfect-fourth', label: 'Perfect Fourth', ratio: 1.333 },
    { value: 'augmented-fourth', label: 'Augmented Fourth', ratio: 1.414 },
  ];

  const applyTypeScale = (ratio: number) => {
    const baseSize = 14; // base body text size in px
    
    // Calculate sizes using the ratio
    const caption = baseSize * 0.857; // 12px
    const body = baseSize; // 14px
    const heading3 = baseSize * Math.pow(ratio, 0.143); // ~16px
    const heading2 = baseSize * Math.pow(ratio, 0.429); // ~20px
    const heading1 = baseSize * Math.pow(ratio, 1.143); // ~30px
    
    // Apply to CSS custom properties
    document.documentElement.style.setProperty('--font-size-caption', `${caption}px`);
    document.documentElement.style.setProperty('--font-size-body', `${body}px`);
    document.documentElement.style.setProperty('--font-size-heading-3', `${heading3}px`);
    document.documentElement.style.setProperty('--font-size-heading-2', `${heading2}px`);
    document.documentElement.style.setProperty('--font-size-heading-1', `${heading1}px`);
    
    console.log('Applied type scale:', { ratio, caption, body, heading3, heading2, heading1 });
  };

  const handleScaleChange = (value: string) => {
    setSelectedScale(value);
    const selectedTypeScale = typeScales.find(scale => scale.value === value);
    if (selectedTypeScale) {
      applyTypeScale(selectedTypeScale.ratio);
    }
    console.log('Selected scale:', value);
  };

  const getCurrentRatio = () => {
    const currentScale = typeScales.find(scale => scale.value === selectedScale);
    return currentScale ? currentScale.ratio.toString() : '1.2';
  };

  // Apply initial scale on mount
  useEffect(() => {
    const initialScale = typeScales.find(scale => scale.value === selectedScale);
    if (initialScale) {
      applyTypeScale(initialScale.ratio);
    }
  }, []);

  return (
    <GradientContainer className="p-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-bold text-white font-inter">Type Scale</h3>
          <span className="ds-text-technical-light text-muted-foreground">{getCurrentRatio()}</span>
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
    </GradientContainer>
  );
};

export default TypeScaleSelector;
