
import React, { useState, useEffect } from 'react';
import { Pencil } from 'lucide-react';
import { Button } from '../ui/button';
import GradientContainer from '../GradientContainer';
import FontSidebar from '../../features/fonts/components/FontSidebar';

const FontFamiliesComponent = () => {
  const [showFontSidebar, setShowFontSidebar] = useState(false);
  const [currentFonts, setCurrentFonts] = useState({
    structural: 'Montserrat',
    subheader: 'Lora', 
    content: 'Hind Madurai'
  });

  useEffect(() => {
    const updateFontNames = () => {
      const rootStyles = getComputedStyle(document.documentElement);
      const structural = rootStyles.getPropertyValue('--font-structural').trim() || 'Montserrat';
      const subheader = rootStyles.getPropertyValue('--font-subheader').trim() || 'Lora';
      const content = rootStyles.getPropertyValue('--font-content').trim() || 'Hind Madurai';
      
      setCurrentFonts({ structural, subheader, content });
    };

    updateFontNames();

    const observer = new MutationObserver(updateFontNames);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['style']
    });

    return () => observer.disconnect();
  }, []);

  const fontFamilies = [
    {
      name: 'Heading',
      family: currentFonts.structural,
      class: 'font-structural',
      description: `STRUCTURAL / ${currentFonts.structural.toUpperCase()}`
    },
    {
      name: 'Subheading',
      family: currentFonts.subheader,
      class: 'font-subheader',
      description: `SUBHEADER / ${currentFonts.subheader.toUpperCase()}`
    },
    {
      name: 'Body',
      family: currentFonts.content,
      class: 'font-content',
      description: `CONTENT / ${currentFonts.content.toUpperCase()}`
    }
  ];

  return (
    <>
      <GradientContainer className="p-12">
        <div className="flex items-center justify-between border-b border-neutral-300 pb-2 mb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-white">Font Families</h2>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setShowFontSidebar(true)}
            className="bg-transparent border-white/20 text-white hover:bg-white/10"
          >
            <Pencil size={16} />
          </Button>
        </div>
        <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-8 mt-6">
          {fontFamilies.map((font) => (
            <div key={font.name}>
              <p className="text-xl font-bold text-white">{font.name}</p>
              <p className="ds-text-technical-muted">{font.family}</p>
              <p className={`text-5xl mt-4 leading-none ${font.class} text-white`}>Aa</p>
              <div className={`mt-4 space-y-1 text-sm tracking-wider break-all text-muted-foreground ${font.class} `}>
                <p>ABCDEFGHIJKLMNOPQRSTUVWXYZ</p>
                <p>abcdefghijklmnopqrstuvwxyz</p>
                <p>0123456789</p>
              </div>
            </div>
          ))}
        </div>
      </GradientContainer>

      <FontSidebar 
        isOpen={showFontSidebar} 
        onClose={() => setShowFontSidebar(false)} 
      />
    </>
  );
};

export default FontFamiliesComponent;
