import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useColorStore } from '../../../../stores/colorStore';
import { TeamMember } from '../../types/element.types';
import { getVariedContrastColors, invertColorScheme } from '../../../../utils/contrastUtils';
import { teamMembers } from '../../data/teamMembers';

interface TeamMemberCardProps {
  member: TeamMember;
  colorStrategy?: number;
  isInverted?: boolean;
}

const TeamMemberCard = ({ member, colorStrategy = 0, isInverted = false }: TeamMemberCardProps) => {
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

  // Get colors based on strategy and member index - each card gets unique colors
  const getCardColors = () => {
    const strategies = [
      // Strategy 0: Dark backgrounds with distinct color treatments per card
      [
        // Card 0: Primary dark with clean whites
        {
          backgroundColor: darkColors[0]?.value || palette["dark-1"],
          titleColor: lightColors[0]?.value || "#ffffff",
          roleColor: lightColors[1]?.value || "#e5e5e5",
          descriptionColor: midColors[0]?.value || palette["mid-1"]
        },
        // Card 1: Rich dark with warm accents
        {
          backgroundColor: darkColors[1]?.value || palette["dark-2"],
          titleColor: lightColors[1]?.value || "#e5e5e5",
          roleColor: midColors[1]?.value || palette["mid-2"],
          descriptionColor: lightColors[0]?.value || "#ffffff"
        },
        // Card 2: Deep dark with vibrant accents
        {
          backgroundColor: darkColors[2]?.value || palette["dark-3"],
          titleColor: lightColors[0]?.value || "#ffffff",
          roleColor: midColors[2]?.value || palette["mid-3"],
          descriptionColor: lightColors[2]?.value || "#cccccc"
        }
      ],
      // Strategy 1: Dark backgrounds with high-contrast variety
      [
        // Card 0: Primary dark with bright light accents
        {
          backgroundColor: darkColors[0]?.value || palette["dark-1"],
          titleColor: lightColors[0]?.value || "#ffffff",
          roleColor: midColors[0]?.value || palette["mid-1"],
          descriptionColor: lightColors[1]?.value || "#e5e5e5"
        },
        // Card 1: Secondary dark with mixed light tones
        {
          backgroundColor: darkColors[2]?.value || palette["dark-3"],
          titleColor: lightColors[2]?.value || "#cccccc",
          roleColor: lightColors[0]?.value || "#ffffff",
          descriptionColor: midColors[2]?.value || palette["mid-3"]
        },
        // Card 2: Rich dark with warm light mix
        {
          backgroundColor: darkColors[1]?.value || palette["dark-2"],
          titleColor: lightColors[1]?.value || "#e5e5e5",
          roleColor: lightColors[2]?.value || "#cccccc",
          descriptionColor: midColors[1]?.value || palette["mid-2"]
        }
      ],
      // Strategy 2: Dark backgrounds with unique accent personalities
      [
        // Card 0: Cool dark with blue-ish accents
        {
          backgroundColor: darkColors[2]?.value || palette["dark-3"],
          titleColor: lightColors[0]?.value || "#ffffff",
          roleColor: lightColors[1]?.value || "#e5e5e5",
          descriptionColor: midColors[0]?.value || palette["mid-1"]
        },
        // Card 1: Warm dark with amber accents
        {
          backgroundColor: darkColors[0]?.value || palette["dark-1"],
          titleColor: lightColors[2]?.value || "#cccccc",
          roleColor: midColors[2]?.value || palette["mid-3"],
          descriptionColor: lightColors[0]?.value || "#ffffff"
        },
        // Card 2: Neutral dark with balanced accents
        {
          backgroundColor: darkColors[1]?.value || palette["dark-2"],
          titleColor: lightColors[1]?.value || "#e5e5e5",
          roleColor: midColors[1]?.value || palette["mid-2"],
          descriptionColor: lightColors[2]?.value || "#cccccc"
        }
      ]
    ];
    
    const currentStrategy = strategies[colorStrategy % strategies.length];
    const memberIndex = teamMembers.findIndex(m => m.id === member.id);
    const cardColors = currentStrategy[memberIndex % currentStrategy.length];
    
    // Use sophisticated contrast adjustment that preserves color variety
    const adjustedColors = getVariedContrastColors(
      cardColors.backgroundColor,
      cardColors.titleColor,
      cardColors.roleColor,
      cardColors.descriptionColor,
      3.0 // Minimum contrast ratio
    );
    
    return {
      backgroundColor: cardColors.backgroundColor,
      titleColor: adjustedColors.primary,
      roleColor: adjustedColors.secondary,
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
