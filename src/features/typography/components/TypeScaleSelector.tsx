
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
    { value: 'minor-third', label: 'Minor Third (1.2)' },
    { value: 'major-third', label: 'Major Third (1.25)' },
    { value: 'perfect-fourth', label: 'Perfect Fourth (1.333)' },
    { value: 'augmented-fourth', label: 'Augmented Fourth (1.414)' },
  ];

  const handleScaleChange = (value: string) => {
    setSelectedScale(value);
    // No implementation yet - just visual for now
    console.log('Selected scale:', value);
  };

  return (
    <GradientContainer className="p-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold text-white">Type Scale</h3>
        <Select value={selectedScale} onValueChange={handleScaleChange}>
          <SelectTrigger className="w-64 bg-transparent border-white/20 text-white">
            <SelectValue placeholder="Select a type scale" />
          </SelectTrigger>
          <SelectContent className="bg-zinc-800 border-zinc-700">
            {typeScales.map((scale) => (
              <SelectItem 
                key={scale.value} 
                value={scale.value}
                className="text-white hover:bg-zinc-700 focus:bg-zinc-700"
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
