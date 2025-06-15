import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Users, Target, Zap } from 'lucide-react';
import { useColorStore } from '../../../stores/colorStore';

interface StatItem {
  id: string;
  label: string;
  value: string;
  percentage: number;
  icon: React.ElementType;
  trend: 'up' | 'down' | 'neutral';
}

interface DataVisualizationProps {
  colorStrategy?: number;
}

const DataVisualization = ({ colorStrategy = 0 }: DataVisualizationProps) => {
  const { palette, categories } = useColorStore();

  // Extract colors from categories
  const lightColors = categories.find(cat => cat.name === 'Light Tones')?.colors || [];
  const midColors = categories.find(cat => cat.name === 'Mid Tones')?.colors || [];
  const darkColors = categories.find(cat => cat.name === 'Dark Tones')?.colors || [];

  const stats: StatItem[] = [
    {
      id: '1',
      label: 'User Engagement',
      value: '94%',
      percentage: 94,
      icon: Users,
      trend: 'up'
    },
    {
      id: '2',
      label: 'Conversion Rate',
      value: '67%',
      percentage: 67,
      icon: Target,
      trend: 'up'
    },
    {
      id: '3',
      label: 'Performance Score',
      value: '89%',
      percentage: 89,
      icon: Zap,
      trend: 'neutral'
    },
    {
      id: '4',
      label: 'Growth Metric',
      value: '156%',
      percentage: 78,
      icon: TrendingUp,
      trend: 'up'
    }
  ];

  // Color mapping for different stats based on strategy
  const getStatColors = (index: number) => {
    const strategies = [
      // Strategy 0: Original - varied backgrounds
      [
        {
          background: lightColors[0]?.value || palette["light-1"],
          progress: midColors[0]?.value || palette["mid-1"],
          text: darkColors[0]?.value || palette["dark-1"],
          icon: midColors[1]?.value || palette["mid-2"]
        },
        {
          background: lightColors[1]?.value || palette["light-2"],
          progress: midColors[1]?.value || palette["mid-2"],
          text: darkColors[0]?.value || palette["dark-1"],
          icon: darkColors[1]?.value || palette["dark-2"]
        },
        {
          background: lightColors[2]?.value || palette["light-3"],
          progress: darkColors[0]?.value || palette["dark-1"],
          text: darkColors[0]?.value || palette["dark-1"],
          icon: midColors[0]?.value || palette["mid-1"]
        },
        {
          background: midColors[2]?.value || palette["mid-3"],
          progress: lightColors[0]?.value || palette["light-1"],
          text: lightColors[0]?.value || "#ffffff",
          icon: lightColors[1]?.value || palette["light-2"]
        }
      ],
      // Strategy 1: High contrast - light backgrounds, bold progress
      [
        {
          background: lightColors[0]?.value || palette["light-1"],
          progress: darkColors[0]?.value || palette["dark-1"],
          text: darkColors[0]?.value || palette["dark-1"],
          icon: darkColors[1]?.value || palette["dark-2"]
        },
        {
          background: lightColors[1]?.value || palette["light-2"],
          progress: darkColors[1]?.value || palette["dark-2"],
          text: darkColors[0]?.value || palette["dark-1"],
          icon: darkColors[2]?.value || palette["dark-3"]
        },
        {
          background: lightColors[2]?.value || palette["light-3"],
          progress: midColors[0]?.value || palette["mid-1"],
          text: darkColors[0]?.value || palette["dark-1"],
          icon: midColors[1]?.value || palette["mid-2"]
        },
        {
          background: lightColors[0]?.value || palette["light-1"],
          progress: midColors[2]?.value || palette["mid-3"],
          text: darkColors[0]?.value || palette["dark-1"],
          icon: midColors[0]?.value || palette["mid-1"]
        }
      ],
      // Strategy 2: Dark mode - dark backgrounds with light accents
      [
        {
          background: darkColors[0]?.value || palette["dark-1"],
          progress: lightColors[0]?.value || palette["light-1"],
          text: lightColors[0]?.value || "#ffffff",
          icon: lightColors[1]?.value || palette["light-2"]
        },
        {
          background: darkColors[1]?.value || palette["dark-2"],
          progress: lightColors[1]?.value || palette["light-2"],
          text: lightColors[0]?.value || "#ffffff",
          icon: lightColors[2]?.value || palette["light-3"]
        },
        {
          background: darkColors[2]?.value || palette["dark-3"],
          progress: midColors[0]?.value || palette["mid-1"],
          text: lightColors[0]?.value || "#ffffff",
          icon: midColors[1]?.value || palette["mid-2"]
        },
        {
          background: midColors[2]?.value || palette["mid-3"],
          progress: lightColors[2]?.value || palette["light-3"],
          text: lightColors[0]?.value || "#ffffff",
          icon: lightColors[0]?.value || palette["light-1"]
        }
      ],
      // Strategy 3: Monochromatic - single tone family
      [
        {
          background: midColors[0]?.value || palette["mid-1"],
          progress: lightColors[0]?.value || palette["light-1"],
          text: lightColors[0]?.value || "#ffffff",
          icon: lightColors[1]?.value || palette["light-2"]
        },
        {
          background: midColors[1]?.value || palette["mid-2"],
          progress: lightColors[1]?.value || palette["light-2"],
          text: lightColors[0]?.value || "#ffffff",
          icon: lightColors[2]?.value || palette["light-3"]
        },
        {
          background: midColors[2]?.value || palette["mid-3"],
          progress: lightColors[2]?.value || palette["light-3"],
          text: lightColors[0]?.value || "#ffffff",
          icon: lightColors[0]?.value || palette["light-1"]
        },
        {
          background: darkColors[0]?.value || palette["dark-1"],
          progress: midColors[0]?.value || palette["mid-1"],
          text: lightColors[0]?.value || "#ffffff",
          icon: midColors[1]?.value || palette["mid-2"]
        }
      ]
    ];
    
    const currentStrategy = strategies[colorStrategy % strategies.length];
    return currentStrategy[index % currentStrategy.length];
  };

  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => {
          const colors = getStatColors(index);
          const Icon = stat.icon;
          
          return (
            <motion.div
              key={stat.id}
              className="p-6 rounded-lg transition-colors duration-300 relative overflow-hidden"
              style={{ backgroundColor: colors.background }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -4, scale: 1.02 }}
            >
              {/* Icon */}
              <div className="flex items-center justify-between mb-4">
                <Icon 
                  className="w-6 h-6 transition-colors duration-300" 
                  style={{ color: colors.icon }}
                />
                <div 
                  className="text-caption font-technical uppercase tracking-wide transition-colors duration-300"
                  style={{ color: colors.text, opacity: 0.6 }}
                >
                  {stat.trend === 'up' ? '↗' : stat.trend === 'down' ? '↘' : '→'}
                </div>
              </div>

              {/* Value - showcases number typography */}
              <div 
                className="text-display-md font-structural mb-2 transition-colors duration-300"
                style={{ color: colors.text }}
              >
                {stat.value}
              </div>

              {/* Label */}
              <div 
                className="text-body font-content mb-4 transition-colors duration-300"
                style={{ color: colors.text, opacity: 0.8 }}
              >
                {stat.label}
              </div>

              {/* Progress Bar */}
              <div className="relative">
                <div 
                  className="h-1 rounded-full transition-colors duration-300"
                  style={{ backgroundColor: colors.text, opacity: 0.1 }}
                />
                <motion.div 
                  className="absolute top-0 left-0 h-1 rounded-full transition-colors duration-300"
                  style={{ backgroundColor: colors.progress }}
                  initial={{ width: 0 }}
                  animate={{ width: `${stat.percentage}%` }}
                  transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                />
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Large Progress Indicators */}
      <div className="grid gap-8 sm:grid-cols-3">
        {[
          { label: 'Design Consistency', value: 92, description: 'Across all components' },
          { label: 'Color Harmony', value: 88, description: 'Palette relationships' },
          { label: 'Typography Flow', value: 95, description: 'Reading experience' }
        ].map((item, index) => {
          const progressColor = index === 0 
            ? midColors[0]?.value || palette["mid-1"]
            : index === 1 
            ? midColors[1]?.value || palette["mid-2"] 
            : darkColors[0]?.value || palette["dark-1"];
          
          const textColor = darkColors[0]?.value || palette["dark-1"];
          const bgColor = lightColors[0]?.value || palette["light-1"];

          return (
            <motion.div
              key={item.label}
              className="text-center p-6 rounded-lg transition-colors duration-300"
              style={{ backgroundColor: bgColor }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.8 + index * 0.2 }}
            >
              {/* Circular Progress */}
              <div className="relative w-24 h-24 mx-auto mb-4">
                <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 96 96">
                  <circle
                    cx="48"
                    cy="48"
                    r="40"
                    stroke={textColor}
                    strokeWidth="4"
                    fill="none"
                    opacity="0.1"
                  />
                  <motion.circle
                    cx="48"
                    cy="48"
                    r="40"
                    stroke={progressColor}
                    strokeWidth="4"
                    fill="none"
                    strokeLinecap="round"
                    initial={{ strokeDasharray: "0 251.2" }}
                    animate={{ strokeDasharray: `${(item.value / 100) * 251.2} 251.2` }}
                    transition={{ duration: 1.5, delay: 1 + index * 0.2 }}
                  />
                </svg>
                <div 
                  className="absolute inset-0 flex items-center justify-center text-heading-2 font-structural transition-colors duration-300"
                  style={{ color: textColor }}
                >
                  {item.value}%
                </div>
              </div>

              <h4 
                className="text-body-bold font-structural mb-2 transition-colors duration-300"
                style={{ color: textColor }}
              >
                {item.label}
              </h4>
              <p 
                className="text-caption font-content transition-colors duration-300"
                style={{ color: textColor, opacity: 0.7 }}
              >
                {item.description}
              </p>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default DataVisualization;