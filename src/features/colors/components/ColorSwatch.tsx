
import React from 'react';
import { motion } from 'framer-motion';
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

const ColorSwatch = React.memo(({ name, value, description, onCopy, isCopied, isSemanticColor }: ColorSwatchProps) => {
  const textColor = getReadableTextColor(value);
  const rgb = hexToRgb(value);
  const rgbString = rgb ? `${rgb.r}, ${rgb.g}, ${rgb.b}` : '';

  return (
    <motion.div 
      className="ds-card-nested-interactive overflow-hidden"
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      {/* Color Preview - Full width at top */}
      <motion.div 
        className="w-full h-24 cursor-pointer flex items-center justify-center"
        style={{ backgroundColor: value }}
        onClick={() => onCopy(value)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
      >
        {isCopied && (
          <motion.span 
            className="text-sm font-medium"
            style={{ color: textColor }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ type: "spring", stiffness: 500, damping: 25 }}
          >
            Copied!
          </motion.span>
        )}
      </motion.div>
      
      {/* Color Information - Below the color, with padding */}
      <div className="p-6 space-y-4">
        <div className="space-y-2">
          <h3 className="font-technical text-xs text-card-foreground font-extralight">{name}</h3>
          
          {/* Horizontal rule under the color name */}
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
    </motion.div>
  );
});

export default ColorSwatch;
