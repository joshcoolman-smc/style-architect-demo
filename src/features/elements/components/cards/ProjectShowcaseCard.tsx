
import React from 'react';
import { useColorStore } from '../../../../stores/colorStore';
import { Project } from '../../types/element.types';
import { AspectRatio } from '../../../../components/ui/aspect-ratio';

interface ProjectShowcaseCardProps {
  project: Project;
}

const ProjectShowcaseCard = ({ project }: ProjectShowcaseCardProps) => {
  const { palette, categories } = useColorStore();

  // Extract colors from categories
  const lightColors = categories.find(cat => cat.name === 'Light Tones')?.colors || [];
  const midColors = categories.find(cat => cat.name === 'Mid Tones')?.colors || [];
  const darkColors = categories.find(cat => cat.name === 'Dark Tones')?.colors || [];

  // Helper to ensure text color is different from background
  const ensureDifferent = (textColor: string, bgColor: string, fallback: string) => {
    return textColor.toLowerCase() === bgColor.toLowerCase() ? fallback : textColor;
  };

  // Get colors based on the project's tone
  const getCardColors = () => {
    switch (project.colorTone) {
      case 'light':
        return {
          backgroundColor: lightColors[1]?.value || palette["light-2"],
          titleColor: ensureDifferent(darkColors[0]?.value || palette["dark-1"], lightColors[1]?.value || palette["light-2"], "#000000"),
          locationColor: ensureDifferent(midColors[1]?.value || palette["mid-2"], lightColors[1]?.value || palette["light-2"], "#666666"),
          descriptionColor: ensureDifferent(darkColors[1]?.value || palette["dark-2"], lightColors[1]?.value || palette["light-2"], "#333333")
        };
      case 'mid':
        return {
          backgroundColor: midColors[1]?.value || palette["mid-2"],
          titleColor: ensureDifferent(lightColors[0]?.value || "#ffffff", midColors[1]?.value || palette["mid-2"], "#ffffff"),
          locationColor: ensureDifferent(lightColors[2]?.value || "#cccccc", midColors[1]?.value || palette["mid-2"], "#cccccc"),
          descriptionColor: ensureDifferent(lightColors[1]?.value || "#aaaaaa", midColors[1]?.value || palette["mid-2"], "#aaaaaa")
        };
      default:
        return {
          backgroundColor: lightColors[1]?.value || palette["light-2"],
          titleColor: "#000000",
          locationColor: "#666666",
          descriptionColor: "#333333"
        };
    }
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
        <div className="w-48 flex-shrink-0 bg-zinc-800">
          <AspectRatio ratio={2/3}>
            <img 
              src={project.imageUrl} 
              alt={project.title}
              className="w-full h-full object-cover"
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
