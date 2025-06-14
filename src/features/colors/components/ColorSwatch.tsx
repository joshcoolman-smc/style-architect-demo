
import React from 'react';
import { getReadableTextColor, hexToRgb } from '../utils/colorUtils';
import { Separator } from '@/components/ui/separator';

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
    <div className="ds-card-nested-interactive overflow-hidden">
      {/* Color Preview - Full width at top */}
      <div 
        className="w-full h-24 cursor-pointer transition-transform hover:scale-105 flex items-center justify-center"
        style={{ backgroundColor: value }}
        onClick={() => onCopy(value)}
      >
        {isCopied && (
          <span className="text-sm font-medium animate-fade-in" style={{ color: textColor }}>
            Copied!
          </span>
        )}
      </div>
      
      {/* Color Information - Below the color, with padding */}
      <div className="p-6 space-y-4">
        <div className="space-y-2">
          <h3 className="font-semibold text-card-foreground">{name}</h3>
          
          {/* Subtle horizontal rule */}
          <Separator className="my-2" />
          
          {/* Technical Details with IBM Plex Mono */}
          <div className="space-y-1">
            <div className="flex justify-between items-center">
              <span className="ds-text-technical-light">HEX</span>
              <span className="font-technical text-xs text-muted-foreground font-extralight">
                {value.toUpperCase()}
              </span>
            </div>
            {rgb && (
              <div className="flex justify-between items-center">
                <span className="ds-text-technical-light">RGB</span>
                <span className="font-technical text-xs text-muted-foreground font-extralight">
                  {rgbString}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ColorSwatch;
