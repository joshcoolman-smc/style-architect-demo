import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useColorStore } from '../../../../stores/colorStore';
import { TeamMember } from '../../types/element.types';

interface TeamMemberCardProps {
  member: TeamMember;
}

const TeamMemberCard = ({ member }: TeamMemberCardProps) => {
  const { palette, categories } = useColorStore();
  const [imageLoaded, setImageLoaded] = useState(false);

  // Extract colors from categories
  const lightColors = categories.find(cat => cat.name === 'Light Tones')?.colors || [];
  const midColors = categories.find(cat => cat.name === 'Mid Tones')?.colors || [];
  const darkColors = categories.find(cat => cat.name === 'Dark Tones')?.colors || [];

  // Helper to ensure text color is different from background
  const ensureDifferent = (textColor: string, bgColor: string, fallback: string) => {
    return textColor.toLowerCase() === bgColor.toLowerCase() ? fallback : textColor;
  };

  // Get colors based on the member's tone
  const getCardColors = () => {
    switch (member.colorTone) {
      case 'light':
        return {
          backgroundColor: lightColors[0]?.value || palette["light-1"],
          titleColor: ensureDifferent(darkColors[0]?.value || palette["dark-1"], lightColors[0]?.value || palette["light-1"], "#000000"),
          roleColor: ensureDifferent(darkColors[0]?.value || palette["dark-1"], lightColors[0]?.value || palette["light-1"], "#000000"),
          descriptionColor: ensureDifferent(darkColors[1]?.value || palette["dark-2"], lightColors[0]?.value || palette["light-1"], "#333333")
        };
      case 'mid':
        return {
          backgroundColor: midColors[0]?.value || palette["mid-1"],
          titleColor: ensureDifferent(lightColors[0]?.value || "#ffffff", midColors[0]?.value || palette["mid-1"], "#ffffff"),
          roleColor: ensureDifferent(lightColors[1]?.value || "#cccccc", midColors[0]?.value || palette["mid-1"], "#cccccc"),
          descriptionColor: ensureDifferent(lightColors[2]?.value || "#aaaaaa", midColors[0]?.value || palette["mid-1"], "#aaaaaa")
        };
      case 'dark':
        return {
          backgroundColor: darkColors[0]?.value || palette["dark-1"],
          titleColor: ensureDifferent(lightColors[0]?.value || "#ffffff", darkColors[0]?.value || palette["dark-1"], "#ffffff"),
          roleColor: ensureDifferent(lightColors[0]?.value || "#ffffff", darkColors[0]?.value || palette["dark-1"], "#ffffff"),
          descriptionColor: ensureDifferent(lightColors[1]?.value || "#cccccc", darkColors[0]?.value || palette["dark-1"], "#cccccc")
        };
      default:
        return {
          backgroundColor: lightColors[0]?.value || palette["light-1"],
          titleColor: "#000000",
          roleColor: "#666666",
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
      <div className="aspect-square w-full bg-zinc-800 overflow-hidden">
        <motion.img 
          src={member.imageUrl} 
          alt={member.name}
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
      </div>
      <div className="p-6 space-y-2">
        <h4 
          className="text-heading-3 font-structural transition-colors duration-300"
          style={{ color: colors.titleColor }}
        >
          {member.name}
        </h4>
        <div 
          className="text-body font-subheader transition-colors duration-300" 
          style={{ color: colors.roleColor }}
        >
          {member.role}
        </div>
        <p 
          className="text-body font-content transition-colors duration-300"
          style={{ color: colors.descriptionColor }}
        >
          {member.description}
        </p>
      </div>
    </div>
  );
};

export default TeamMemberCard;
