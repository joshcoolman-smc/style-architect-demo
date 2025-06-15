
import React, { useState } from 'react';
import { FontOption } from '../types/font.types';
import { fontCombinations } from '../data/fontCombinations';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetOverlay,
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
      <SheetOverlay className="bg-black/20 backdrop-blur-[1px]" />
      <SheetContent 
        side="right" 
        className="w-96 overflow-y-auto bg-zinc-900 border-l border-zinc-700"
        onInteractOutside={onClose}
      >
        <SheetHeader>
          <SheetTitle className="text-zinc-100" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            Font Selector
          </SheetTitle>
          <SheetDescription className="text-zinc-400" style={{ fontFamily: 'Hind Madurai, sans-serif' }}>
            Choose a font combination that fits your design
          </SheetDescription>
        </SheetHeader>

        <div className="space-y-4unit mt-6unit">
          {fontCombinations.map((font, index) => (
            <div
              key={index}
              className={`p-4unit rounded-lg border cursor-pointer transition-all ${
                selectedFont.name === font.name
                  ? 'border-blue-500 bg-blue-500/10'
                  : 'border-zinc-700 bg-zinc-800 hover:border-zinc-600 hover:bg-zinc-750'
              }`}
              onClick={() => applyFontCombination(font)}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-zinc-100 mb-2" style={{ fontFamily: font.structural + ', sans-serif' }}>
                    {font.name}
                  </h3>
                  <div className="text-sm text-zinc-400 space-y-1" style={{ fontFamily: 'Hind Madurai, sans-serif' }}>
                    <div>{font.structural}, {font.subheader}, {font.content}</div>
                  </div>
                </div>
                {selectedFont.name === font.name && (
                  <div className="w-4 h-4 bg-blue-500 rounded-full flex-shrink-0" />
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8unit pt-6unit border-t border-zinc-700">
          <p className="text-sm text-zinc-400 text-center" style={{ fontFamily: 'Hind Madurai, sans-serif' }}>
            Font changes apply instantly and persist across the application
          </p>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default FontSidebar;
