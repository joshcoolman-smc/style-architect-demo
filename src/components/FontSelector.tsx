
import React, { useState } from 'react';
import { Type, X } from 'lucide-react';

interface FontOption {
  name: string;
  structural: string;
  subheader: string;
  content: string;
  description: string;
}

const fontCombinations: FontOption[] = [
  {
    name: 'Modern Editorial',
    structural: 'Montserrat',
    subheader: 'Lora', 
    content: 'Hind Madurai',
    description: 'Clean headlines, elegant subtext, readable body'
  },
  {
    name: 'Corporate Clean',
    structural: 'Inter',
    subheader: 'Inter',
    content: 'Inter',
    description: 'Consistent and professional throughout'
  },
  {
    name: 'Friendly Modern',
    structural: 'Poppins',
    subheader: 'Lora',
    content: 'Open Sans',
    description: 'Approachable and contemporary feel'
  },
  {
    name: 'Tech Minimal',
    structural: 'Roboto',
    subheader: 'Roboto',
    content: 'Open Sans',
    description: 'Clean, technical, and highly legible'
  },
  {
    name: 'Editorial Luxury',
    structural: 'Playfair Display',
    subheader: 'Lora',
    content: 'Hind Madurai',
    description: 'Sophisticated and content-focused'
  }
];

interface FontSelectorProps {
  isOpen: boolean;
  onClose: () => void;
}

const FontSelector: React.FC<FontSelectorProps> = ({ isOpen, onClose }) => {
  const [selectedFont, setSelectedFont] = useState(fontCombinations[0]);

  const applyFontCombination = (font: FontOption) => {
    document.documentElement.style.setProperty('--font-structural', font.structural);
    document.documentElement.style.setProperty('--font-subheader', font.subheader);
    document.documentElement.style.setProperty('--font-content', font.content);
    setSelectedFont(font);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-card border border-border rounded-xl shadow-2xl p-8unit max-w-2xl w-full mx-4unit max-h-[80vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6unit">
          <div className="flex items-center gap-3unit">
            <Type className="text-primary" size={24} />
            <h2 className="text-xl font-structural font-semibold text-foreground">
              Font Selector
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-muted rounded-lg transition-colors"
          >
            <X size={20} className="text-muted-foreground" />
          </button>
        </div>

        <div className="space-y-4unit">
          {fontCombinations.map((font, index) => (
            <div
              key={index}
              className={`p-6unit rounded-lg border cursor-pointer transition-all ${
                selectedFont.name === font.name
                  ? 'border-primary bg-primary/5'
                  : 'border-border bg-card hover:border-accent-600 hover:bg-muted/30'
              }`}
              onClick={() => applyFontCombination(font)}
            >
              <div className="flex items-start justify-between mb-3unit">
                <div>
                  <h3 className="font-medium text-foreground mb-1">
                    {font.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {font.description}
                  </p>
                </div>
                {selectedFont.name === font.name && (
                  <div className="w-4 h-4 bg-primary rounded-full flex-shrink-0 mt-1" />
                )}
              </div>

              <div className="space-y-3unit">
                <div>
                  <div 
                    className="text-2xl font-bold mb-1"
                    style={{ fontFamily: font.structural }}
                  >
                    Structural Text
                  </div>
                  <div className="text-xs text-muted-foreground font-mono">
                    {font.structural} • Headers, Navigation, UI
                  </div>
                </div>

                <div>
                  <div 
                    className="text-lg font-medium mb-1 subheader"
                    style={{ fontFamily: font.subheader }}
                  >
                    Subheader Text
                  </div>
                  <div className="text-xs text-muted-foreground font-mono">
                    {font.subheader} • Subtitles, Quotes
                  </div>
                </div>

                <div>
                  <div 
                    className="text-base mb-1"
                    style={{ fontFamily: font.content }}
                  >
                    Body content text for comfortable reading
                  </div>
                  <div className="text-xs text-muted-foreground font-mono">
                    {font.content} • Body copy, Descriptions
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8unit pt-6unit border-t border-border">
          <p className="text-sm text-muted-foreground text-center">
            Font changes apply instantly and persist across the application
          </p>
        </div>
      </div>
    </div>
  );
};

export default FontSelector;
