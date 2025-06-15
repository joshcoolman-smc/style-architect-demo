import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Copy, Check, FileText, X } from 'lucide-react';
import { useColorStore } from '../../../stores/colorStore';
import { useColorStrategy } from '../hooks/useColorStrategy';
import MarkdownRenderer from '../../../components/MarkdownRenderer';

const DesignSpecification = () => {
  const { palette, categories } = useColorStore();
  const { strategyState } = useColorStrategy();
  const [copied, setCopied] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Get current font families from CSS custom properties
  const getCurrentFonts = () => {
    const style = getComputedStyle(document.documentElement);
    return {
      structural: style.getPropertyValue('--font-structural').trim() || 'Montserrat',
      subheader: style.getPropertyValue('--font-subheader').trim() || 'Lora',
      content: style.getPropertyValue('--font-content').trim() || 'Hind Madurai'
    };
  };

  // Get current TypeScale from CSS custom properties
  const getCurrentTypeScale = () => {
    const style = getComputedStyle(document.documentElement);
    return {
      caption: style.getPropertyValue('--font-size-caption').trim() || '12px',
      body: style.getPropertyValue('--font-size-body').trim() || '14px',
      heading3: style.getPropertyValue('--font-size-heading-3').trim() || '16px',
      heading2: style.getPropertyValue('--font-size-heading-2').trim() || '20px',
      heading1: style.getPropertyValue('--font-size-heading-1').trim() || '30px'
    };
  };

  // Get actual colors for each component section based on current strategy
  const getComponentColors = (sectionName: string) => {
    const state = strategyState[sectionName as keyof typeof strategyState];
    if (!state) return { background: '', foreground: [] };

    const lightColors = categories.find(cat => cat.name === 'Light Tones')?.colors || [];
    const midColors = categories.find(cat => cat.name === 'Mid Tones')?.colors || [];
    const darkColors = categories.find(cat => cat.name === 'Dark Tones')?.colors || [];

    // Get strategy colors (simplified logic based on component patterns)
    let background = '';
    let foreground: string[] = [];

    if (state.isInverted) {
      // Inverted: prefer light backgrounds, dark foregrounds
      background = lightColors[0]?.value || palette['light-1'];
      foreground = [
        darkColors[0]?.value || palette['dark-1'],
        darkColors[1]?.value || palette['dark-2'],
        midColors[0]?.value || palette['mid-1']
      ];
    } else {
      // Normal: prefer dark backgrounds, light foregrounds
      background = darkColors[0]?.value || palette['dark-1'];
      foreground = [
        lightColors[0]?.value || palette['light-1'],
        lightColors[1]?.value || palette['light-2'],
        midColors[0]?.value || palette['mid-1']
      ];
    }

    return { background, foreground: foreground.filter(Boolean) };
  };

  // Generate the design specification
  const generateSpecification = () => {
    const lightColors = categories.find(cat => cat.name === 'Light Tones')?.colors || [];
    const midColors = categories.find(cat => cat.name === 'Mid Tones')?.colors || [];
    const darkColors = categories.find(cat => cat.name === 'Dark Tones')?.colors || [];
    const currentFonts = getCurrentFonts();
    const currentTypeScale = getCurrentTypeScale();

    return `# Design System Specification

## Typography

### Google Font Families
- **Structural**: ${currentFonts.structural} - Headers, navigation, UI elements
- **Subheader**: ${currentFonts.subheader} - Subtitles, quotes, secondary text  
- **Content**: ${currentFonts.content} - Body copy, descriptions, readable text

### TypeScale
- **Caption**: ${currentTypeScale.caption}
- **Body**: ${currentTypeScale.body}
- **Heading 3**: ${currentTypeScale.heading3}
- **Heading 2**: ${currentTypeScale.heading2}
- **Heading 1**: ${currentTypeScale.heading1}

## Color Palette
- **Light Tones**: ${lightColors.map(c => c.value).join(', ')}
- **Mid Tones**: ${midColors.map(c => c.value).join(', ')}
- **Dark Tones**: ${darkColors.map(c => c.value).join(', ')}

## Components

### Team Member Cards
${(() => {
  const colors = getComponentColors('cards');
  return `- **Props**: name, role, description, image
- **Background Color**: ${colors.background}
- **Foreground Colors**: ${colors.foreground.join(', ')}`;
})()}

### Project Showcase Cards
${(() => {
  const colors = getComponentColors('cards');
  return `- **Props**: title, location, description, image
- **Layout**: Horizontal format with image and content sections
- **Background Color**: ${colors.background}
- **Foreground Colors**: ${colors.foreground.join(', ')}`;
})()}

### Testimonial Cards
${(() => {
  const colors = getComponentColors('testimonials');
  return `- **Props**: quote, author, company
- **Layout**: Quote text with attribution
- **Background Color**: ${colors.background}
- **Foreground Colors**: ${colors.foreground.join(', ')}`;
})()}

### Data Visualization
${(() => {
  const colors = getComponentColors('dataVisualization');
  return `- **Statistics Cards**: label, value, percentage, icon, trend indicator
- **Progress Indicators**: label, value, description
- **Background Color**: ${colors.background}
- **Foreground Colors**: ${colors.foreground.join(', ')}`;
})()}

### Interactive Forms
${(() => {
  const colors = getComponentColors('forms');
  return `- **Form Fields**: label, placeholder, value, type
- **Buttons**: label, type (primary/secondary/outline)
- **Background Color**: ${colors.background}
- **Foreground Colors**: ${colors.foreground.join(', ')}`;
})()}`;
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(generateSpecification());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <>
      {/* Design Spec Button */}
      <div className="ds-card p-6 mb-8">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <FileText className="w-5 h-5 text-muted-foreground" />
            <div>
              <h3 className="text-heading-3 font-structural text-foreground">
                AI-Ready Design Specification
              </h3>
              <p className="text-body font-content text-muted-foreground">
                Framework-agnostic specification for LLM implementation
              </p>
            </div>
          </div>
          
          <motion.button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white transition-colors"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <FileText className="w-4 h-4" />
            Design Spec
          </motion.button>
        </div>
      </div>

      {/* Full-screen Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="fixed inset-4 bg-background rounded-xl shadow-2xl overflow-hidden flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between p-6 border-b border-border bg-card">
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-muted-foreground" />
                  <h2 className="text-heading-2 font-structural text-foreground">
                    Design System Specification
                  </h2>
                </div>
                
                <div className="flex items-center gap-2">
                  <motion.button
                    onClick={handleCopy}
                    className="p-2 rounded-lg bg-muted hover:bg-muted/80 transition-colors text-muted-foreground"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    title="Copy to clipboard"
                  >
                    {copied ? (
                      <Check className="w-4 h-4 text-green-500" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </motion.button>
                  
                  <motion.button
                    onClick={() => setIsModalOpen(false)}
                    className="p-2 rounded-lg bg-muted hover:bg-muted/80 transition-colors text-muted-foreground"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <X className="w-4 h-4" />
                  </motion.button>
                </div>
              </div>

              {/* Modal Content */}
              <div className="flex-1 overflow-y-auto p-6">
                <MarkdownRenderer content={generateSpecification()} />
              </div>
            </motion.div>

            {/* Copy Success Toast */}
            <AnimatePresence>
              {copied && (
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 50 }}
                  className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-60"
                >
                  <div className="bg-card border border-border rounded-lg px-4 py-2 shadow-lg flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-500" />
                    <span className="text-body font-content text-foreground">
                      Copied to clipboard
                    </span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default DesignSpecification;