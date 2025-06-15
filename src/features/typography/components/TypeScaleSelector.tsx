
import React, { useState } from 'react';
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
    { value: 'minor-third', label: 'Minor Third' },
    { value: 'major-third', label: 'Major Third' },
    { value: 'perfect-fourth', label: 'Perfect Fourth' },
    { value: 'augmented-fourth', label: 'Augmented Fourth' },
  ];

  const handleScaleChange = (value: string) => {
    setSelectedScale(value);
    // No implementation yet - just visual for now
    console.log('Selected scale:', value);
  };

  return (
    <GradientContainer className="p-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold text-white font-inter">Type Scale</h3>
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
