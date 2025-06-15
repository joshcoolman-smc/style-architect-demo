
import React from 'react';
import GradientContainer from '../../shared/components/GradientContainer';
import { useTypography } from '../hooks/useTypography';

const TypographySpecimen = () => {
  const { fontFamilies } = useTypography();

  return (
    <div className="space-y-8 text-left">
      
      {/* Font Families Section */}
      <GradientContainer className="p-12">
        <h2 className="text-heading-2 border-b border-neutral-300 pb-2 mb-6 text-white">Font Families</h2>
        <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-8 mt-6">
          {fontFamilies.map((font) => (
            <div key={font.name}>
              <p className="text-heading-2 text-white">{font.name}</p>
              <p className="ds-text-technical-light text-white">{font.family}</p>
              <p className={`text-5xl mt-4 leading-none ${font.class} text-white`}>Aa</p>
              <div className={`mt-4 space-y-1 text-caption tracking-wider break-all text-white/70 ${font.class} `}>
                <p>ABCDEFGHIJKLMNOPQRSTUVWXYZ</p>
                <p>abcdefghijklmnopqrstuvwxyz</p>
                <p>0123456789</p>
              </div>
            </div>
          ))}
        </div>
      </GradientContainer>

      {/* Type Scale and Editorial Example Side by Side */}
      <div className="grid md:grid-cols-2 gap-8">
        {/* Type Scale */}
        <GradientContainer className="p-12">
          <h2 className="text-heading-2 border-b border-neutral-300 pb-2 mb-6 text-white">Type Scale</h2>
          <div className="space-y-6 mt-6">
            <div className="grid grid-cols-[auto,1fr] items-baseline gap-x-6">
              <span className="ds-text-technical-light text-white">heading-1</span>
              <h1 className="text-heading-1 text-white">Quick brown fox</h1>
            </div>
            <div className="grid grid-cols-[auto,1fr] items-baseline gap-x-6">
              <span className="ds-text-technical-light text-white">heading-2</span>
              <h2 className="text-heading-2 text-white">Quick brown fox</h2>
            </div>
            <div className="grid grid-cols-[auto,1fr] items-baseline gap-x-6">
              <span className="ds-text-technical-light text-white">heading-3</span>
              <h3 className="text-heading-3 text-white">Quick brown fox</h3>
            </div>
            <div className="grid grid-cols-[auto,1fr] items-baseline gap-x-6">
              <span className="ds-text-technical-light text-white">body</span>
              <p className="text-body text-white">Quick brown fox jumps over the lazy dog</p>
            </div>
            <div className="grid grid-cols-[auto,1fr] items-baseline gap-x-6">
              <span className="ds-text-technical-light text-white">caption</span>
              <p className="text-caption text-white">Quick brown fox jumps over the lazy dog</p>
            </div>
          </div>
        </GradientContainer>

        {/* Editorial Example */}
        <GradientContainer className="p-12">
          <h2 className="text-heading-2 border-b border-neutral-300 pb-2 mb-6 text-white">In Practice</h2>
          <div className="space-y-6 max-w-prose mt-6">
            <h1 className="text-heading-1 text-white font-structural">
              Typography creates hierarchy
            </h1>
            <h2 className="text-heading-2 text-white/80 font-subheader">
              Visual contrast guides the reader's eye
            </h2>
            <p className="text-body text-white font-content">
              Effective typography establishes clear information hierarchy through strategic use of size, weight, and spacing. This larger paragraph demonstrates how body text appears at the standard reading size.
            </p>
            <p className="text-caption text-white/90 font-content">
              The smallest text provides additional context and details. Caption text is perfect for metadata, annotations, and supplementary information that supports the main content without competing for attention.
            </p>
          </div>
        </GradientContainer>
      </div>
    </div>
  );
};

export default TypographySpecimen;
