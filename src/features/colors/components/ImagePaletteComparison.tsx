
import React from 'react';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { ColorCategory } from '../types/color.types';

interface ImagePaletteComparisonProps {
  imageUrl: string;
  categories: ColorCategory[];
  onCopyColor: (color: string) => void;
  copiedColor: string | null;
}

const ImagePaletteComparison = ({ 
  imageUrl, 
  categories, 
  onCopyColor, 
  copiedColor 
}: ImagePaletteComparisonProps) => {
  // Get all colors from all categories
  const allColors = categories.flatMap(category => category.colors);

  return (
    <div className="grid lg:grid-cols-2 gap-8 items-center">
      {/* Image Display - Left Side */}
      <div className="w-full">
        <AspectRatio ratio={1} className="bg-muted rounded-lg overflow-hidden">
          <img 
            src={imageUrl} 
            alt="Uploaded image" 
            className="w-full h-full object-cover"
          />
        </AspectRatio>
      </div>

      {/* Color Grid - Right Side */}
      <div className="grid grid-cols-3 gap-3">
        {allColors.map((color, index) => (
          <div key={`${color.name}-${index}`} className="relative group">
            <AspectRatio ratio={1}>
              <div 
                className="w-full h-full rounded-lg cursor-pointer transition-transform hover:scale-105 flex items-center justify-center"
                style={{ backgroundColor: color.value }}
                onClick={() => onCopyColor(color.value)}
              >
                {copiedColor === color.value && (
                  <span className="text-xs font-medium animate-fade-in text-white mix-blend-difference">
                    Copied!
                  </span>
                )}
              </div>
            </AspectRatio>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImagePaletteComparison;
