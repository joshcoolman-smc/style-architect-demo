
import React from 'react';
import GradientContainer from './GradientContainer';

const TypographySpecimen = () => {
  const fontFamilies = [
    {
      name: 'Heading',
      family: 'Montserrat',
      class: 'font-structural',
      description: 'STRUCTURAL / MONTSERRAT'
    },
    {
      name: 'Subheading',
      family: 'Lora',
      class: 'font-subheader',
      description: 'SUBHEADER / LORA'
    },
    {
      name: 'Body',
      family: 'Hind Madurai',
      class: 'font-content',
      description: 'CONTENT / HIND MADURAI'
    }
  ];

  return (
    <div className="space-y-16 text-left">
      {/* Hero Typography Display */}
      <GradientContainer className="p-12 text-white">
        <div className="space-y-8">
          <div className="space-y-4">
            <h1 className="text-display-2xl font-bold  leading-none">
              Typography
            </h1>
            <p className="text-2xl  font-light max-w-2xl">
              A carefully crafted type system built on modern web fonts for optimal readability and visual hierarchy.
            </p>
          </div>
          
          {/* Large specimen display */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            <div>
              <div className="text-6xl font-bold  leading-none mb-2">
                Aa
              </div>
              <div className="ds-text-technical-light">
                STRUCTURAL / MONTSERRAT
              </div>
            </div>
            <div>
              <div className="text-6xl font-light  leading-none mb-2 font-content">
                Aa
              </div>
              <div className="ds-text-technical-light">
                CONTENT / HIND MADURAI
              </div>
            </div>
          </div>
        </div>
      </GradientContainer>

      {/* Font Families Section */}
      <GradientContainer className="p-12">
        <h2 className="text-2xl md:text-3xl font-bold border-b border-neutral-300 pb-2 mb-6 text-white">Font Families</h2>
        <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-8 mt-6">
          {fontFamilies.map((font) => (
            <div key={font.name}>
              <p className="text-xl font-bold text-white">{font.name}</p>
              <p className="text-sm ">{font.family}</p>
              <p className={`text-5xl mt-4 leading-none ${font.class} text-white`}>Aa</p>
              <div className={`mt-4 space-y-1 text-sm tracking-wider break-all ${font.class} `}>
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

      {/* Composition Examples */}
      <section>
        <h2 className="text-2xl md:text-3xl font-bold border-b pb-2 mb-6 ">Composition</h2>
        <div className="grid md:grid-cols-2 gap-8 mt-6">
          <div className="bg-card p-8 rounded-lg border relative overflow-hidden">
            <p className="font-mono text-9xl font-bold text-card-foreground/5 absolute -right-5 -top-5 select-none">01/</p>
            <div className="relative">
              <h3 className="text-3xl font-semibold font-subheader ">Article Heading</h3>
              <p className="text-lg mt-2 font-structural font-bold ">A Stunning Subtitle Follows</p>
              <p className="mt-4 text-muted-foreground font-content">
                This composition demonstrates how different type styles can work together. We combine headings, subheadings, and body text to create a clear and pleasing visual hierarchy.
              </p>
            </div>
          </div>
          <div className="bg-card p-8 rounded-lg border relative overflow-hidden">
            <p className="font-mono text-9xl font-bold text-card-foreground/5 absolute -right-5 -bottom-9 select-none">U09/</p>
            <div className="relative">
              <p className="ds-text-technical-muted">Unit Portables AB / Item 734</p>
              <h3 className="font-structural text-4xl font-bold tracking-tight my-3 ">Shoulder Bag</h3>
              <div className="flex justify-between items-baseline border-t border-muted pt-3">
                <p className="font-content ">Polyester/580x360mm</p>
                <p className="font-structural text-3xl font-bold ">15"</p>
              </div>
            </div>
          </div>
        </div>
      </section>

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
    </div>
  );
};

export default TypographySpecimen;
