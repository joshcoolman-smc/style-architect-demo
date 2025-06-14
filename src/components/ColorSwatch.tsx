
import React from 'react';
import { Copy, Check } from 'lucide-react';
import { getReadableTextColor, hexToRgb } from '../utils/colorUtils';

interface ColorSwatchProps {
  name: string;
  value: string;
  description: string;
  onCopy: (value: string) => void;
  isCopied: boolean;
  isSemanticColor?: boolean;
}

const ColorSwatch: React.FC<ColorSwatchProps> = ({
  name,
  value,
  description,
  onCopy,
  isCopied,
  isSemanticColor = false
}) => {
  const rgb = hexToRgb(value);
  const textColor = getReadableTextColor(value);

  return (
    <div
      className="ds-card-nested-interactive group cursor-pointer overflow-hidden"
      onClick={() => onCopy(value)}
    >
      <div
        className={`h-24 ${isSemanticColor ? 'h-20' : ''} relative flex items-center justify-center`}
        style={{ backgroundColor: value }}
      >
        {/* Hover overlay */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-black bg-opacity-10 flex items-center justify-center">
          {isCopied ? (
            <Check size={20} style={{ color: textColor }} />
          ) : (
            <Copy size={20} style={{ color: textColor }} />
          )}
        </div>
        
        {/* Hex value overlay in lower right */}
        <div 
          className="absolute bottom-2 right-2 text-xs font-mono font-medium"
          style={{ color: textColor }}
        >
          {value.toUpperCase()}
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-semibold text-neutral-900">{name}</h3>
        </div>
        
        <p className="text-sm text-neutral-600 mb-3">{description}</p>
        
        {rgb && (
          <div className="text-xs text-neutral-500 space-y-1">
            <div className="flex justify-between">
              <span>RGB</span>
              <span className="font-mono">{rgb.r}, {rgb.g}, {rgb.b}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ColorSwatch;
