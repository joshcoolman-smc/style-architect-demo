import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useColorStore } from '../../../../stores/colorStore';
import { Project } from '../../types/element.types';
import { AspectRatio } from '../../../../components/ui/aspect-ratio';
import { getVariedContrastColors, invertColorScheme } from '../../../../utils/contrastUtils';

interface ProjectShowcaseCardProps {
  project: Project;
  colorStrategy?: number;
  isInverted?: boolean;
}

const ProjectShowcaseCard = ({ project, colorStrategy = 0, isInverted = false }: ProjectShowcaseCardProps) => {
  const { palette, categories } = useColorStore();
  const [imageLoaded, setImageLoaded] = useState(false);

  // Extract colors from categories
  const baseLightColors = categories.find(cat => cat.name === 'Light Tones')?.colors || [];
  const baseMidColors = categories.find(cat => cat.name === 'Mid Tones')?.colors || [];
  const baseDarkColors = categories.find(cat => cat.name === 'Dark Tones')?.colors || [];

  // Apply inversion if needed
  const { lightColors, midColors, darkColors } = isInverted 
    ? invertColorScheme(baseLightColors, baseMidColors, baseDarkColors, palette)
    : { lightColors: baseLightColors, midColors: baseMidColors, darkColors: baseDarkColors };

  // Get colors based on strategy - all favor dark backgrounds with light foreground
  const getCardColors = () => {
    const strategies = [
      // Strategy 0: Primary dark backgrounds with clean light text
      {
        backgroundColor: darkColors[0]?.value || palette["dark-1"],
        titleColor: lightColors[0]?.value || "#ffffff",
        locationColor: lightColors[1]?.value || "#e5e5e5",
        descriptionColor: midColors[0]?.value || palette["mid-1"]
      },
      // Strategy 1: Rich dark backgrounds with varied light accents
      {
        backgroundColor: darkColors[1]?.value || palette["dark-2"],
        titleColor: lightColors[1]?.value || "#e5e5e5",
        locationColor: midColors[1]?.value || palette["mid-2"],
        descriptionColor: lightColors[0]?.value || "#ffffff"
      },
      // Strategy 2: Deep dark backgrounds with vibrant accents
      {
        backgroundColor: darkColors[2]?.value || palette["dark-3"],
        titleColor: lightColors[0]?.value || "#ffffff",
        locationColor: midColors[2]?.value || palette["mid-3"],
        descriptionColor: lightColors[2]?.value || "#cccccc"
      }
    ];
    
    const baseStrategy = strategies[colorStrategy % strategies.length];
    const backgroundColor = baseStrategy.backgroundColor;
    
    // Use sophisticated contrast adjustment that preserves color variety
    const adjustedColors = getVariedContrastColors(
      backgroundColor,
      baseStrategy.titleColor,
      baseStrategy.locationColor,
      baseStrategy.descriptionColor,
      3.0 // Minimum contrast ratio
    );
    
    return {
      backgroundColor,
      titleColor: adjustedColors.primary,
      locationColor: adjustedColors.secondary,
      descriptionColor: adjustedColors.tertiary
    };
  };

  const colors = getCardColors();

  return (
    <div 
      className="shadow-lg rounded-lg overflow-hidden transition-colors duration-300" 
      style={{ 
        backgroundColor: colors.backgroundColor,
        border: `1px solid ${colors.backgroundColor}10`
      }}
    >
      <div className="flex">
        <div className="w-48 flex-shrink-0 bg-zinc-800 overflow-hidden">
          <AspectRatio ratio={2/3}>
            <motion.img 
              src={project.imageUrl} 
              alt={project.title}
              className="w-full h-full object-cover"
              initial={{ opacity: 0 }}
              animate={{ opacity: imageLoaded ? 1 : 0 }}
              whileHover={{ scale: 1.05 }}
              transition={{ 
                opacity: { duration: 0.3 },
                scale: { duration: 0.3, ease: "easeOut" }
              }}
              onLoad={() => setImageLoaded(true)}
            />
          </AspectRatio>
        </div>
        <div className="flex-1 p-8 space-y-3 flex flex-col justify-center">
          <h4 
            className="text-heading-2 font-structural transition-colors duration-300"
            style={{ color: colors.titleColor }}
          >
            {project.title}
          </h4>
          <div 
            className="text-body font-subheader transition-colors duration-300" 
            style={{ color: colors.locationColor }}
          >
            {project.location}
          </div>
          <p 
            className="text-body font-content transition-colors duration-300 leading-relaxed"
            style={{ color: colors.descriptionColor }}
          >
            {project.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProjectShowcaseCard;
