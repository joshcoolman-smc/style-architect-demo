import React from 'react';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';
import { useColorStore } from '../../../../stores/colorStore';
import { Testimonial } from '../../types/element.types';

interface TestimonialCardProps {
  testimonial: Testimonial;
  colorStrategy?: number;
}

const TestimonialCard = ({ testimonial, colorStrategy = 0 }: TestimonialCardProps) => {
  const { palette, categories } = useColorStore();

  // Extract colors from categories
  const lightColors = categories.find(cat => cat.name === 'Light Tones')?.colors || [];
  const midColors = categories.find(cat => cat.name === 'Mid Tones')?.colors || [];
  const darkColors = categories.find(cat => cat.name === 'Dark Tones')?.colors || [];

  // Helper to ensure text color is different from background
  const ensureDifferent = (textColor: string, bgColor: string, fallback: string) => {
    return textColor.toLowerCase() === bgColor.toLowerCase() ? fallback : textColor;
  };

  // Get colors based on testimonial tone and strategy
  const getCardColors = () => {
    const strategies = [
      // Strategy 0: Original - tone-based backgrounds
      () => {
        switch (testimonial.colorTone) {
          case 'light':
            return {
              backgroundColor: lightColors[0]?.value || palette["light-1"],
              quoteColor: ensureDifferent(darkColors[0]?.value || palette["dark-1"], lightColors[0]?.value || palette["light-1"], "#000000"),
              authorColor: ensureDifferent(darkColors[1]?.value || palette["dark-2"], lightColors[0]?.value || palette["light-1"], "#333333"),
              companyColor: ensureDifferent(midColors[1]?.value || palette["mid-2"], lightColors[0]?.value || palette["light-1"], "#666666"),
              iconColor: ensureDifferent(midColors[0]?.value || palette["mid-1"], lightColors[0]?.value || palette["light-1"], "#888888")
            };
          case 'mid':
            return {
              backgroundColor: midColors[1]?.value || palette["mid-2"],
              quoteColor: ensureDifferent(lightColors[0]?.value || "#ffffff", midColors[1]?.value || palette["mid-2"], "#ffffff"),
              authorColor: ensureDifferent(lightColors[0]?.value || "#ffffff", midColors[1]?.value || palette["mid-2"], "#ffffff"),
              companyColor: ensureDifferent(lightColors[1]?.value || "#e5e5e5", midColors[1]?.value || palette["mid-2"], "#e5e5e5"),
              iconColor: ensureDifferent(lightColors[2]?.value || "#cccccc", midColors[1]?.value || palette["mid-2"], "#cccccc")
            };
          case 'dark':
            return {
              backgroundColor: darkColors[0]?.value || palette["dark-1"],
              quoteColor: ensureDifferent(lightColors[0]?.value || "#ffffff", darkColors[0]?.value || palette["dark-1"], "#ffffff"),
              authorColor: ensureDifferent(lightColors[0]?.value || "#ffffff", darkColors[0]?.value || palette["dark-1"], "#ffffff"),
              companyColor: ensureDifferent(lightColors[1]?.value || "#e5e5e5", darkColors[0]?.value || palette["dark-1"], "#e5e5e5"),
              iconColor: ensureDifferent(midColors[0]?.value || palette["mid-1"], darkColors[0]?.value || palette["dark-1"], "#888888")
            };
          default:
            return {
              backgroundColor: lightColors[0]?.value || palette["light-1"],
              quoteColor: "#000000", authorColor: "#333333", companyColor: "#666666", iconColor: "#888888"
            };
        }
      },
      // Strategy 1: High contrast - all light backgrounds with dark text
      () => ({
        backgroundColor: lightColors[0]?.value || palette["light-1"],
        quoteColor: darkColors[0]?.value || palette["dark-1"],
        authorColor: darkColors[1]?.value || palette["dark-2"],
        companyColor: midColors[2]?.value || palette["mid-3"],
        iconColor: midColors[0]?.value || palette["mid-1"]
      }),
      // Strategy 2: Monochromatic mid-tones
      () => ({
        backgroundColor: midColors[2]?.value || palette["mid-3"],
        quoteColor: lightColors[0]?.value || "#ffffff",
        authorColor: lightColors[1]?.value || "#f5f5f5",
        companyColor: lightColors[2]?.value || "#e5e5e5",
        iconColor: lightColors[0]?.value || "#ffffff"
      }),
      // Strategy 3: Inverted - dark backgrounds with accent colors
      () => ({
        backgroundColor: darkColors[1]?.value || palette["dark-2"],
        quoteColor: lightColors[0]?.value || "#ffffff",
        authorColor: midColors[0]?.value || palette["mid-1"],
        companyColor: midColors[1]?.value || palette["mid-2"],
        iconColor: lightColors[2]?.value || palette["light-3"]
      })
    ];

    return strategies[colorStrategy % strategies.length]();
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

      {/* Subtle decoration */}
      <div 
        className="absolute top-0 right-0 w-24 h-24 opacity-5 transform translate-x-8 -translate-y-8"
        style={{ backgroundColor: colors.iconColor }}
      />
    </motion.div>
  );
};

export default TestimonialCard;