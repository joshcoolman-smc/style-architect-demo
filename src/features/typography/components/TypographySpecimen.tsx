
import React from 'react';
import GradientContainer from '../../shared/components/GradientContainer';
import { useTypography } from '../hooks/useTypography';

const TypographySpecimen = () => {
  const { fontFamilies } = useTypography();

  return (
    <div className="space-y-16 text-left">
      
      {/* Font Families Section */}
      <GradientContainer className="p-12">
        <h2 className="text-2xl md:text-3xl font-bold border-b border-neutral-300 pb-2 mb-6 text-white">Font Families</h2>
        <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-8 mt-6">
          {fontFamilies.map((font) => (
            <div key={font.name}>
              <p className="text-xl font-bold text-white">{font.name}</p>
              <p className="ds-text-technical-light text-white">{font.family}</p>
              <p className={`text-5xl mt-4 leading-none ${font.class} text-white`}>Aa</p>
              <div className={`mt-4 space-y-1 text-sm tracking-wider break-all text-white/70 ${font.class} `}>
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
            <span className="ds-text-technical-light text-white">h1</span>
            <h1 className="text-5xl font-extrabold tracking-tighter text-white">The quick brown fox</h1>
          </div>
          <div className="grid grid-cols-[auto,1fr] items-baseline gap-x-6">
            <span className="ds-text-technical-light text-white">h2</span>
            <h2 className="text-4xl font-bold tracking-tight text-white">The quick brown fox</h2>
          </div>
          <div className="grid grid-cols-[auto,1fr] items-baseline gap-x-6">
            <span className="ds-text-technical-light text-white">h3</span>
            <h3 className="text-3xl font-semibold text-white">The quick brown fox</h3>
          </div>
          <div className="grid grid-cols-[auto,1fr] items-baseline gap-x-6">
            <span className="ds-text-technical-light text-white">h4</span>
            <h4 className="text-2xl font-semibold text-white">The quick brown fox</h4>
          </div>
          <div className="grid grid-cols-[auto,1fr] items-baseline gap-x-6">
            <span className="ds-text-technical-light text-white">h5</span>
            <h5 className="text-xl font-medium text-white">The quick brown fox</h5>
          </div>
          <div className="grid grid-cols-[auto,1fr] items-baseline gap-x-6">
            <span className="ds-text-technical-light text-white">h6</span>
            <h6 className="text-lg font-medium text-white">The quick brown fox</h6>
          </div>
        </div>
      </GradientContainer>

      {/* Paragraph Styles */}
      <GradientContainer className="p-12">
        <h2 className="text-2xl md:text-3xl font-bold border-b border-neutral-300 pb-2 mb-6 text-white">Paragraph Styles</h2>
        <div className="space-y-4 max-w-prose mt-6">
          <p className="text-lg font-content text-white">
            This is large body text. The quick brown fox jumps over the lazy dog. A true master of the arts, this sentence contains every letter of the alphabet. It's perfect for introductions and lead paragraphs.
          </p>
          <p className="font-content text-white">
            This is standard body text. The quick brown fox jumps over the lazy dog. A true master of the arts, this sentence contains every letter of the alphabet. It is the workhorse of our design system, used for most long-form content.
          </p>
          <p className="text-sm font-content text-white/70">
            This is small, muted body text. The quick brown fox jumps over the lazy dog. A true master of the arts, this sentence contains every letter of the alphabet. Ideal for captions, footnotes, and other supplementary information.
          </p>
        </div>
      </GradientContainer>
    </div>
  );
};

export default TypographySpecimen;
