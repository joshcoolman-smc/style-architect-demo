import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useColorStore } from '../../../stores/colorStore';

const HeroBanner = () => {
  const { palette, categories } = useColorStore();

  // Extract colors from categories
  const lightColors = categories.find(cat => cat.name === 'Light Tones')?.colors || [];
  const midColors = categories.find(cat => cat.name === 'Mid Tones')?.colors || [];
  const darkColors = categories.find(cat => cat.name === 'Dark Tones')?.colors || [];

  // Create a gradient background using palette colors
  const backgroundColor = lightColors[0]?.value || palette["light-1"];
  const gradientColor = lightColors[1]?.value || palette["light-2"];
  const headlineColor = darkColors[0]?.value || palette["dark-1"];
  const subtitleColor = darkColors[1]?.value || palette["dark-2"];
  const buttonBgColor = midColors[0]?.value || palette["mid-1"];
  const buttonTextColor = lightColors[0]?.value || "#ffffff";

  return (
    <motion.div 
      className="relative overflow-hidden rounded-lg p-12 transition-colors duration-300"
      style={{ 
        background: `linear-gradient(135deg, ${backgroundColor} 0%, ${gradientColor} 100%)`
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Background decoration */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `radial-gradient(circle at 20% 80%, ${midColors[0]?.value || palette["mid-1"]} 0%, transparent 50%),
                           radial-gradient(circle at 80% 20%, ${midColors[1]?.value || palette["mid-2"]} 0%, transparent 50%)`
        }}
      />

      <div className="relative z-10 max-w-4xl">
        {/* Main Headline - showcases large typography */}
        <motion.h1 
          className="text-display-lg font-structural leading-tight mb-6 transition-colors duration-300"
          style={{ color: headlineColor }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Experience Design
          <br />
          <span className="font-content italic">
            That Transforms
          </span>
        </motion.h1>

        {/* Subtitle - showcases font pairing */}
        <motion.p 
          className="text-heading-1 font-content leading-relaxed mb-8 max-w-2xl transition-colors duration-300"
          style={{ color: subtitleColor }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Explore how typography and color choices create entirely different moods and personalities for the same content.
        </motion.p>

        {/* Call to Action Button */}
        <motion.button
          className="inline-flex items-center px-8 py-4 rounded-lg text-body-bold font-structural transition-all duration-300 hover:shadow-lg transform hover:scale-105"
          style={{ 
            backgroundColor: buttonBgColor,
            color: buttonTextColor 
          }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.98 }}
        >
          Explore Components
          <ArrowRight className="ml-2 w-5 h-5" />
        </motion.button>
      </div>

      {/* Typography showcase labels */}
      <div className="absolute top-4 right-4 space-y-2">
        <div 
          className="text-caption font-technical opacity-60 transition-colors duration-300"
          style={{ color: headlineColor }}
        >
          STRUCTURAL • CONTENT
        </div>
        <div 
          className="text-caption font-technical opacity-60 transition-colors duration-300"
          style={{ color: subtitleColor }}
        >
          DISPLAY • HEADING • BODY
        </div>
      </div>
    </motion.div>
  );
};

export default HeroBanner;