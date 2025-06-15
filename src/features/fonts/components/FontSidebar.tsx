
import React, { useState } from 'react';
import { FontOption } from '../types/font.types';
import { fontCombinations } from '../data/fontCombinations';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet';

interface FontSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const FontSidebar: React.FC<FontSidebarProps> = ({ isOpen, onClose }) => {
  const [selectedFont, setSelectedFont] = useState(fontCombinations[0]);

  const applyFontCombination = (font: FontOption) => {
    document.documentElement.style.setProperty('--font-structural', font.structural);
    document.documentElement.style.setProperty('--font-subheader', font.subheader);
    document.documentElement.style.setProperty('--font-content', font.content);
    setSelectedFont(font);
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="right" className="w-96 overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="font-structural">Font Selector</SheetTitle>
          <SheetDescription>
            Choose a font combination that fits your design
          </SheetDescription>
        </SheetHeader>

        <div className="space-y-4unit mt-6unit">
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
      </SheetContent>
    </Sheet>
  );
};

export default FontSidebar;
