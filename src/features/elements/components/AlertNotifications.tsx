import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, AlertTriangle, XCircle, Info, X } from 'lucide-react';
import { useColorStore } from '../../../stores/colorStore';

interface Alert {
  id: string;
  type: 'success' | 'warning' | 'error' | 'info';
  title: string;
  message: string;
  dismissible?: boolean;
}

const AlertNotifications = () => {
  const { palette, categories } = useColorStore();

  // Extract colors from categories for alert theming
  const lightColors = categories.find(cat => cat.name === 'Light Tones')?.colors || [];
  const midColors = categories.find(cat => cat.name === 'Mid Tones')?.colors || [];
  const darkColors = categories.find(cat => cat.name === 'Dark Tones')?.colors || [];

  const alerts: Alert[] = [
    {
      id: '1',
      type: 'success',
      title: 'Design System Updated',
      message: 'Your color palette and typography changes have been successfully applied across all components.',
      dismissible: true
    },
    {
      id: '2',
      type: 'warning',
      title: 'Color Contrast Notice',
      message: 'Some text may have low contrast on light backgrounds. Consider adjusting your palette for better accessibility.',
      dismissible: true
    },
    {
      id: '3',
      type: 'error',
      title: 'Font Loading Failed',
      message: 'Unable to load custom fonts. Falling back to system fonts. Check your network connection.',
      dismissible: true
    },
    {
      id: '4',
      type: 'info',
      title: 'Typography Tip',
      message: 'Try pairing a serif font for headings with a sans-serif for body text to create visual hierarchy.',
      dismissible: false
    }
  ];

  const getAlertStyling = (type: Alert['type']) => {
    const baseColors = {
      success: {
        primary: '#10b981',    // Green
        light: '#ecfdf5',
        icon: CheckCircle
      },
      warning: {
        primary: '#f59e0b',    // Amber
        light: '#fffbeb',
        icon: AlertTriangle
      },
      error: {
        primary: '#ef4444',    // Red
        light: '#fef2f2',
        icon: XCircle
      },
      info: {
        primary: midColors[0]?.value || palette["mid-1"],  // Use palette color
        light: lightColors[0]?.value || palette["light-1"],
        icon: Info
      }
    };

    // For semantic colors, use the base colors but blend with palette
    const semanticColor = baseColors[type];
    const titleColor = darkColors[0]?.value || palette["dark-1"];
    const textColor = darkColors[1]?.value || palette["dark-2"];

    return {
      backgroundColor: type === 'info' ? semanticColor.light : semanticColor.light,
      borderColor: semanticColor.primary,
      iconColor: semanticColor.primary,
      titleColor,
      textColor,
      Icon: semanticColor.icon
    };
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 
          className="text-heading-2 font-structural mb-4 transition-colors duration-300"
          style={{ color: darkColors[0]?.value || palette["dark-1"] }}
        >
          Alert Components
        </h3>
        <p 
          className="text-body font-content mb-6 transition-colors duration-300"
          style={{ color: darkColors[1]?.value || palette["dark-2"] }}
        >
          See how semantic colors and typography work together to communicate different message types.
        </p>
      </div>

      <div className="space-y-4">
        {alerts.map((alert, index) => {
          const styling = getAlertStyling(alert.type);
          const Icon = styling.Icon;
          
          return (
            <motion.div
              key={alert.id}
              className="p-4 rounded-lg border-l-4 shadow-sm transition-colors duration-300"
              style={{
                backgroundColor: styling.backgroundColor,
                borderLeftColor: styling.borderColor
              }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.01, y: -1 }}
            >
              <div className="flex items-start space-x-3">
                <Icon 
                  className="w-5 h-5 mt-0.5 flex-shrink-0 transition-colors duration-300" 
                  style={{ color: styling.iconColor }}
                />
                
                <div className="flex-1 min-w-0">
                  <h4 
                    className="text-body-bold font-structural mb-1 transition-colors duration-300"
                    style={{ color: styling.titleColor }}
                  >
                    {alert.title}
                  </h4>
                  <p 
                    className="text-body font-content transition-colors duration-300"
                    style={{ color: styling.textColor }}
                  >
                    {alert.message}
                  </p>
                </div>

                {alert.dismissible && (
                  <motion.button
                    className="p-1 rounded-md transition-colors duration-300 hover:bg-black hover:bg-opacity-5"
                    style={{ color: styling.textColor }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <X className="w-4 h-4" />
                  </motion.button>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Status Badges */}
      <div className="pt-8">
        <h4 
          className="text-heading-3 font-structural mb-4 transition-colors duration-300"
          style={{ color: darkColors[0]?.value || palette["dark-1"] }}
        >
          Status Badges
        </h4>
        
        <div className="flex flex-wrap gap-3">
          {[
            { label: 'Active', type: 'success' as const },
            { label: 'Pending', type: 'warning' as const },
            { label: 'Failed', type: 'error' as const },
            { label: 'Draft', type: 'info' as const },
            { label: 'Processing', type: 'info' as const },
            { label: 'Completed', type: 'success' as const }
          ].map((badge, index) => {
            const styling = getAlertStyling(badge.type);
            
            return (
              <motion.span
                key={badge.label}
                className="px-3 py-1 rounded-full text-caption-bold font-structural transition-colors duration-300"
                style={{
                  backgroundColor: styling.iconColor,
                  color: badge.type === 'info' ? darkColors[0]?.value || palette["dark-1"] : '#ffffff'
                }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.5 + index * 0.05 }}
                whileHover={{ scale: 1.05 }}
              >
                {badge.label}
              </motion.span>
            );
          })}
        </div>
      </div>

      {/* Progress Notifications */}
      <div className="pt-8">
        <h4 
          className="text-heading-3 font-structural mb-4 transition-colors duration-300"
          style={{ color: darkColors[0]?.value || palette["dark-1"] }}
        >
          Progress Indicators
        </h4>
        
        <div className="space-y-4">
          {[
            { label: 'Color Analysis', progress: 100, status: 'Complete' },
            { label: 'Font Loading', progress: 75, status: 'In Progress' },
            { label: 'Component Rendering', progress: 45, status: 'Processing' }
          ].map((item, index) => (
            <motion.div
              key={item.label}
              className="p-4 rounded-lg transition-colors duration-300"
              style={{ backgroundColor: lightColors[0]?.value || palette["light-1"] }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.7 + index * 0.1 }}
            >
              <div className="flex justify-between items-center mb-2">
                <span 
                  className="text-body-bold font-structural transition-colors duration-300"
                  style={{ color: darkColors[0]?.value || palette["dark-1"] }}
                >
                  {item.label}
                </span>
                <span 
                  className="text-caption font-technical transition-colors duration-300"
                  style={{ color: darkColors[1]?.value || palette["dark-2"] }}
                >
                  {item.status}
                </span>
              </div>
              
              <div className="relative">
                <div 
                  className="h-2 rounded-full transition-colors duration-300"
                  style={{ backgroundColor: darkColors[0]?.value + '20' || palette["dark-1"] + '20' }}
                />
                <motion.div 
                  className="absolute top-0 left-0 h-2 rounded-full transition-colors duration-300"
                  style={{ backgroundColor: midColors[0]?.value || palette["mid-1"] }}
                  initial={{ width: 0 }}
                  animate={{ width: `${item.progress}%` }}
                  transition={{ duration: 1, delay: 1 + index * 0.2 }}
                />
              </div>
              
              <div className="mt-1 text-right">
                <span 
                  className="text-caption font-technical transition-colors duration-300"
                  style={{ color: darkColors[1]?.value || palette["dark-2"] }}
                >
                  {item.progress}%
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AlertNotifications;