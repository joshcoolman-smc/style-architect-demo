
import React from 'react';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { RefreshCw } from 'lucide-react';
import { useColorStore } from '../../../stores/colorStore';

interface ImagePaletteComparisonProps {
  imageUrl: string;
  onCopyColor: (color: string) => void;
  copiedColor: string | null;
  isSampleImage?: boolean;
  onCycleImage?: () => void;
}

const ImagePaletteComparison = ({ 
  imageUrl, 
  onCopyColor, 
  copiedColor,
  isSampleImage = false,
  onCycleImage
}: ImagePaletteComparisonProps) => {
  const { palette } = useColorStore();

  // Get only the 9 derived colors from the palette
  const derivedColors = [
    palette["light-1"],
    palette["light-2"], 
    palette["light-3"],
    palette["mid-1"],
    palette["mid-2"],
    palette["mid-3"],
    palette["dark-1"],
    palette["dark-2"],
    palette["dark-3"]
  ];

  const handleImageClick = () => {
    if (isSampleImage && onCycleImage) {
      onCycleImage();
    }
  };

  return (
    <div className="grid lg:grid-cols-2 gap-8 items-center">
      {/* Image Display - Left Side */}
      <div className="w-full relative">
        <AspectRatio ratio={1} className="bg-muted rounded-lg overflow-hidden">
          <img 
            src={imageUrl} 
            alt="Uploaded image" 
            className={`w-full h-full object-cover ${isSampleImage ? 'cursor-pointer' : ''}`}
            onClick={handleImageClick}
          />
          {isSampleImage && (
            <div 
              className="absolute bottom-2 right-2 w-8 h-8 bg-black/50 rounded-full flex items-center justify-center cursor-pointer hover:bg-black/70 transition-colors"
              onClick={handleImageClick}
            >
              <RefreshCw className="w-4 h-4 text-white" />
            </div>
          )}
        </AspectRatio>
      </div>

      {/* Color Grid - Right Side */}
      <div className="grid grid-cols-3 gap-3">
        {derivedColors.map((color, index) => (
          <div key={`derived-${index}`} className="relative group">
            <AspectRatio ratio={1}>
              <div 
                className="w-full h-full rounded-lg cursor-pointer transition-transform hover:scale-105 flex items-center justify-center"
                style={{ backgroundColor: color }}
                onClick={() => onCopyColor(color)}
              >
                {copiedColor === color && (
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
