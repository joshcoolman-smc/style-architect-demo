
import React, { useState, useEffect } from 'react';
import { Pencil } from 'lucide-react';
import { Button } from './ui/button';
import GradientContainer from './GradientContainer';
import FontSidebar from '../features/fonts/components/FontSidebar';

const TypographySpecimen = () => {
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

    // Update on mount
    updateFontNames();

    // Listen for changes to CSS custom properties
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
    <div className="space-y-16 text-left">
      
      {/* Font Families Section */}
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

      {/* Type Scale */}
      <GradientContainer className="p-12">
        <h2 className="text-2xl md:text-3xl font-bold border-b border-neutral-300 pb-2 mb-6 text-white">Type Scale</h2>
        <div className="space-y-10 mt-6 flow-root">
          <div className="grid grid-cols-[auto,1fr] items-baseline gap-x-6">
            <span className="ds-text-technical-light">h1</span>
            <h1 className="text-5xl font-extrabold tracking-tighter text-white">The quick brown fox</h1>
          </div>
          <div className="grid grid-cols-[auto,1fr] items-baseline gap-x-6">
            <span className="ds-text-technical-light">h2</span>
            <h2 className="text-4xl font-bold tracking-tight text-white">The quick brown fox</h2>
          </div>
          <div className="grid grid-cols-[auto,1fr] items-baseline gap-x-6">
            <span className="ds-text-technical-light">h3</span>
            <h3 className="text-3xl font-semibold text-white">The quick brown fox</h3>
          </div>
          <div className="grid grid-cols-[auto,1fr] items-baseline gap-x-6">
            <span className="ds-text-technical-light">h4</span>
            <h4 className="text-2xl font-semibold text-white">The quick brown fox</h4>
          </div>
          <div className="grid grid-cols-[auto,1fr] items-baseline gap-x-6">
            <span className="ds-text-technical-light">h5</span>
            <h5 className="text-xl font-medium text-white">The quick brown fox</h5>
          </div>
          <div className="grid grid-cols-[auto,1fr] items-baseline gap-x-6">
            <span className="ds-text-technical-light">h6</span>
            <h6 className="text-lg font-medium text-white">The quick brown fox</h6>
          </div>
        </div>
      </GradientContainer>

      {/* Paragraph Styles */}
      <GradientContainer className="p-12">
        <h2 className="text-2xl md:text-3xl font-bold border-b border-neutral-300 pb-2 mb-6 text-white">Paragraph Styles</h2>
        <div className="space-y-4 max-w-prose mt-6">
          <p className="text-lg font-content ">
            This is large body text. The quick brown fox jumps over the lazy dog. A true master of the arts, this sentence contains every letter of the alphabet. It's perfect for introductions and lead paragraphs.
          </p>
          <p className="font-content ">
            This is standard body text. The quick brown fox jumps over the lazy dog. A true master of the arts, this sentence contains every letter of the alphabet. It is the workhorse of our design system, used for most long-form content.
          </p>
          <p className="text-sm  font-content">
            This is small, muted body text. The quick brown fox jumps over the lazy dog. A true master of the arts, this sentence contains every letter of the alphabet. Ideal for captions, footnotes, and other supplementary information.
          </p>
        </div>
      </GradientContainer>

      <FontSidebar 
        isOpen={showFontSidebar} 
        onClose={() => setShowFontSidebar(false)} 
      />
    </div>
  );
};

export default TypographySpecimen;
