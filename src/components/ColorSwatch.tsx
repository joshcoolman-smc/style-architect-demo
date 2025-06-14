
import React from 'react';
import { getReadableTextColor, hexToRgb } from '../utils/colorUtils';

interface ColorSwatchProps {
  name: string;
  value: string;
  description: string;
  onCopy: (value: string) => void;
  isCopied: boolean;
  isSemanticColor?: boolean;
}

const ColorSwatch = ({ name, value, description, onCopy, isCopied, isSemanticColor }: ColorSwatchProps) => {
  const textColor = getReadableTextColor(value);
  const rgb = hexToRgb(value);
  const rgbString = rgb ? `${rgb.r}, ${rgb.g}, ${rgb.b}` : '';

  return (
    <div className="ds-card-nested-interactive p-6 space-y-4">
      {/* Color Preview */}
      <div 
        className="w-full h-20 rounded-lg cursor-pointer transition-transform hover:scale-105"
        style={{ backgroundColor: value }}
        onClick={() => onCopy(value)}
      >
        <div className="w-full h-full flex items-center justify-center">
          {isCopied && (
            <span className="text-sm font-medium animate-fade-in" style={{ color: textColor }}>
              Copied!
            </span>
          )}
        </div>
      </div>
      
      {/* Color Information */}
      <div className="space-y-2">
        <h3 className="font-semibold text-card-foreground">{name}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
        
        {/* Technical Details with IBM Plex Mono */}
        <div className="space-y-1">
          <div className="flex justify-between items-center">
            <span className="technical-detail">HEX</span>
            <span className="font-technical text-xs text-muted-foreground font-extralight">
              {value.toUpperCase()}
            </span>
          </div>
          {rgb && (
            <div className="flex justify-between items-center">
              <span className="technical-detail">RGB</span>
              <span className="font-technical text-xs text-muted-foreground font-extralight">
                {rgbString}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ColorSwatch;
