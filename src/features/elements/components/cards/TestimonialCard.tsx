import React from 'react';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';
import { useColorStore } from '../../../../stores/colorStore';
import { Testimonial } from '../../types/element.types';
import { getVariedContrastColors, invertColorScheme } from '../../../../utils/contrastUtils';

interface TestimonialCardProps {
  testimonial: Testimonial;
  colorStrategy?: number;
  cardIndex: number; // To ensure each card gets unique treatment
  isInverted?: boolean;
}

const TestimonialCard = ({ testimonial, colorStrategy = 0, cardIndex, isInverted = false }: TestimonialCardProps) => {
  const { palette, categories } = useColorStore();

  // Extract colors from categories
  const baseLightColors = categories.find(cat => cat.name === 'Light Tones')?.colors || [];
  const baseMidColors = categories.find(cat => cat.name === 'Mid Tones')?.colors || [];
  const baseDarkColors = categories.find(cat => cat.name === 'Dark Tones')?.colors || [];

  // Apply inversion if needed
  const { lightColors, midColors, darkColors } = isInverted 
    ? invertColorScheme(baseLightColors, baseMidColors, baseDarkColors, palette)
    : { lightColors: baseLightColors, midColors: baseMidColors, darkColors: baseDarkColors };


  // Get colors based on card index and strategy - all favor dark backgrounds with light foreground
  const getCardColors = () => {
    const strategies = [
      // Strategy 0: Dark backgrounds with warm light accents
      () => {
        const cardTreatments = [
          // Card 0: Primary dark with white text and warm accents
          {
            backgroundColor: darkColors[0]?.value || palette["dark-1"],
            primaryTextColor: lightColors[0]?.value || "#ffffff",
            secondaryTextColor: lightColors[1]?.value || "#e5e5e5",
            tertiaryTextColor: midColors[0]?.value || palette["mid-1"]
          },
          // Card 1: Secondary dark with light accents
          {
            backgroundColor: darkColors[1]?.value || palette["dark-2"],
            primaryTextColor: lightColors[0]?.value || "#ffffff",
            secondaryTextColor: midColors[1]?.value || palette["mid-2"],
            tertiaryTextColor: lightColors[2]?.value || "#cccccc"
          },
          // Card 2: Tertiary dark with varied light tones
          {
            backgroundColor: darkColors[2]?.value || palette["dark-3"],
            primaryTextColor: lightColors[1]?.value || "#e5e5e5",
            secondaryTextColor: lightColors[0]?.value || "#ffffff",
            tertiaryTextColor: midColors[2]?.value || palette["mid-3"]
          }
        ];
        return cardTreatments[cardIndex % 3];
      },
      // Strategy 1: Deep dark backgrounds with vibrant light accents
      () => {
        const cardTreatments = [
          // Card 0: Deep dark with bright accents
          {
            backgroundColor: darkColors[0]?.value || palette["dark-1"],
            primaryTextColor: lightColors[0]?.value || "#ffffff",
            secondaryTextColor: midColors[2]?.value || palette["mid-3"],
            tertiaryTextColor: lightColors[1]?.value || "#e5e5e5"
          },
          // Card 1: Rich dark with cool accents
          {
            backgroundColor: darkColors[2]?.value || palette["dark-3"],
            primaryTextColor: lightColors[1]?.value || "#e5e5e5",
            secondaryTextColor: lightColors[0]?.value || "#ffffff",
            tertiaryTextColor: midColors[0]?.value || palette["mid-1"]
          },
          // Card 2: Warm dark with neutral accents
          {
            backgroundColor: darkColors[1]?.value || palette["dark-2"],
            primaryTextColor: lightColors[2]?.value || "#cccccc",
            secondaryTextColor: midColors[1]?.value || palette["mid-2"],
            tertiaryTextColor: lightColors[0]?.value || "#ffffff"
          }
        ];
        return cardTreatments[cardIndex % 3];
      },
      // Strategy 2: Dark with mid-tone accents
      () => {
        const cardTreatments = [
          // Card 0: Dark with subtle mid-tone accents
          {
            backgroundColor: darkColors[1]?.value || palette["dark-2"],
            primaryTextColor: lightColors[0]?.value || "#ffffff",
            secondaryTextColor: lightColors[2]?.value || "#cccccc",
            tertiaryTextColor: midColors[1]?.value || palette["mid-2"]
          },
          // Card 1: Deep dark with contrasting accents
          {
            backgroundColor: darkColors[0]?.value || palette["dark-1"],
            primaryTextColor: lightColors[1]?.value || "#e5e5e5",
            secondaryTextColor: midColors[0]?.value || palette["mid-1"],
            tertiaryTextColor: lightColors[0]?.value || "#ffffff"
          },
          // Card 2: Rich dark with warm accents
          {
            backgroundColor: darkColors[2]?.value || palette["dark-3"],
            primaryTextColor: lightColors[0]?.value || "#ffffff",
            secondaryTextColor: lightColors[1]?.value || "#e5e5e5",
            tertiaryTextColor: midColors[2]?.value || palette["mid-3"]
          }
        ];
        return cardTreatments[cardIndex % 3];
      },
      // Strategy 3: Darkest backgrounds with brightest accents
      () => {
        const cardTreatments = [
          // Card 0: Deepest dark with maximum contrast
          {
            backgroundColor: darkColors[2]?.value || palette["dark-3"],
            primaryTextColor: lightColors[0]?.value || "#ffffff",
            secondaryTextColor: lightColors[1]?.value || "#e5e5e5",
            tertiaryTextColor: lightColors[2]?.value || "#cccccc"
          },
          // Card 1: Dark with bright mid-tone accents
          {
            backgroundColor: darkColors[0]?.value || palette["dark-1"],
            primaryTextColor: lightColors[2]?.value || "#cccccc",
            secondaryTextColor: lightColors[0]?.value || "#ffffff",
            tertiaryTextColor: midColors[0]?.value || palette["mid-1"]
          },
          // Card 2: Rich dark with varied light tones
          {
            backgroundColor: darkColors[1]?.value || palette["dark-2"],
            primaryTextColor: lightColors[1]?.value || "#e5e5e5",
            secondaryTextColor: midColors[2]?.value || palette["mid-3"],
            tertiaryTextColor: lightColors[0]?.value || "#ffffff"
          }
        ];
        return cardTreatments[cardIndex % 3];
      }
    ];

    const baseColors = strategies[colorStrategy % strategies.length]();
    const backgroundColor = baseColors.backgroundColor;

    // Use sophisticated contrast adjustment that preserves color variety
    const adjustedColors = getVariedContrastColors(
      backgroundColor,
      baseColors.primaryTextColor,
      baseColors.secondaryTextColor,
      baseColors.tertiaryTextColor,
      3.0 // Minimum contrast ratio for readability
    );

    return {
      backgroundColor,
      quoteColor: adjustedColors.primary,
      authorColor: adjustedColors.primary,
      companyColor: adjustedColors.secondary,
      iconColor: adjustedColors.tertiary
    };
  };

  const colors = getCardColors();

  return (
    <motion.div 
      className="p-8 rounded-lg shadow-lg transition-colors duration-300 relative overflow-hidden"
      style={{ backgroundColor: colors.backgroundColor }}
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
    >
      {/* Quote Icon */}
      <div className="mb-6">
        <Quote 
          className="w-8 h-8 opacity-60" 
          style={{ color: colors.iconColor }}
        />
      </div>

      {/* Quote Text - showcases typography */}
      <blockquote 
        className="text-heading-2 font-content leading-relaxed mb-6 transition-colors duration-300"
        style={{ color: colors.quoteColor }}
      >
        "{testimonial.quote}"
      </blockquote>

      {/* Attribution */}
      <div className="space-y-1">
        <div 
          className="text-body-bold font-structural transition-colors duration-300"
          style={{ color: colors.authorColor }}
        >
          {testimonial.author}
        </div>
        <div 
          className="text-caption font-structural uppercase tracking-wide transition-colors duration-300"
          style={{ color: colors.companyColor }}
        >
          {testimonial.company}
        </div>
      </div>
    </motion.div>
  );
};

export default TestimonialCard;