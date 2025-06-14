import React from 'react';
import GradientContainer from './GradientContainer';

const TypographySpecimen = () => {
  const fontWeights = [
    { weight: '300', name: 'Light', class: 'font-light' },
    { weight: '400', name: 'Regular', class: 'font-normal' },
    { weight: '500', name: 'Medium', class: 'font-medium' },
    { weight: '600', name: 'Semibold', class: 'font-semibold' },
    { weight: '700', name: 'Bold', class: 'font-bold' },
    { weight: '800', name: 'Extrabold', class: 'font-extrabold' },
  ];

  return (
    <div className="space-y-16 text-left">
      {/* Hero Typography Display */}
      <GradientContainer className="p-12">
        <div className="space-y-8">
          <div className="space-y-4">
            <h1 className="text-display-2xl font-bold text-neutral-900 leading-none">
              Typography
            </h1>
            <p className="text-2xl text-neutral-600 font-light max-w-2xl">
              A carefully crafted type system built on modern web fonts for optimal readability and visual hierarchy.
            </p>
          </div>
          
          {/* Large specimen display */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            <div>
              <div className="text-6xl font-bold text-neutral-900 leading-none mb-2">
                Aa
              </div>
              <div className="technical-detail">
                STRUCTURAL / MONTSERRAT
              </div>
            </div>
            <div>
              <div className="text-6xl font-light text-neutral-700 leading-none mb-2 font-content">
                Aa
              </div>
              <div className="technical-detail">
                CONTENT / HIND MADURAI
              </div>
            </div>
          </div>
        </div>
      </GradientContainer>

      {/* Font Weight Specimens */}
      <section className="grid md:grid-cols-2 gap-8">
        <GradientContainer className="p-8">
          <h2 className="text-xl font-semibold text-neutral-900 mb-8">Structural Font Weights</h2>
          <div className="space-y-6">
            {fontWeights.map((weight) => (
              <div key={weight.weight} className="group">
                <div className="flex items-baseline justify-between mb-2">
                  <span className="technical-detail">
                    {weight.name}
                  </span>
                  <span className="technical-detail">
                    {weight.weight}
                  </span>
                </div>
                <div className={`text-3xl ${weight.class} text-neutral-900 leading-tight`}>
                  The quick brown fox
                </div>
              </div>
            ))}
          </div>
        </GradientContainer>

        <GradientContainer className="p-8">
          <h2 className="text-xl font-semibold text-neutral-900 mb-8">Content Font Weights</h2>
          <div className="space-y-6">
            {fontWeights.slice(0, 4).map((weight) => (
              <div key={`content-${weight.weight}`} className="group">
                <div className="flex items-baseline justify-between mb-2">
                  <span className="technical-detail">
                    {weight.name}
                  </span>
                  <span className="technical-detail">
                    {weight.weight}
                  </span>
                </div>
                <div className={`text-3xl font-content ${weight.class} text-neutral-900 leading-tight`}>
                  The quick brown fox
                </div>
              </div>
            ))}
          </div>
        </GradientContainer>
      </section>

      {/* Display Scale */}
      <GradientContainer className="p-8">
        <h2 className="text-xl font-semibold text-neutral-900 mb-8">Display Scale</h2>
        <div className="space-y-8">
          <div className="py-8 border-2 border-dashed border-neutral-300 rounded-lg px-6">
            <div className="text-display-2xl font-bold text-neutral-900 leading-none mb-2">
              Display 2XL
            </div>
            <div className="technical-detail">72px / 4.5rem</div>
          </div>
          
          <div className="py-6 border-2 border-dashed border-neutral-300 rounded-lg px-6">
            <div className="text-display-xl font-bold text-neutral-900 leading-none mb-2">
              Display XL
            </div>
            <div className="technical-detail">60px / 3.75rem</div>
          </div>
          
          <div className="py-4 border-2 border-dashed border-neutral-300 rounded-lg px-6">
            <div className="text-display-lg font-bold text-neutral-900 leading-none mb-2">
              Display Large
            </div>
            <div className="technical-detail">48px / 3rem</div>
          </div>
          
          <div className="py-3 border-2 border-dashed border-neutral-300 rounded-lg px-6">
            <div className="text-display-md font-semibold text-neutral-900 leading-none mb-2">
              Display Medium
            </div>
            <div className="technical-detail">36px / 2.25rem</div>
          </div>
        </div>
      </GradientContainer>

      {/* Reading Specimens */}
      <section className="grid md:grid-cols-2 gap-8">
        <GradientContainer className="p-8">
          <h2 className="text-xl font-semibold text-neutral-900 mb-6">Heading Hierarchy</h2>
          <div className="space-y-6">
            <div>
              <h1 className="text-4xl font-bold text-neutral-900 leading-tight mb-1">
                Heading 1
              </h1>
              <span className="technical-detail">text-4xl / font-bold</span>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-neutral-900 leading-tight mb-1">
                Heading 2
              </h2>
              <span className="technical-detail">text-3xl / font-bold</span>
            </div>
            <div>
              <h3 className="text-2xl font-semibold text-neutral-900 leading-tight mb-1">
                Heading 3
              </h3>
              <span className="technical-detail">text-2xl / font-semibold</span>
            </div>
            <div>
              <h4 className="text-xl font-semibold text-neutral-900 leading-tight mb-1">
                Heading 4
              </h4>
              <span className="technical-detail">text-xl / font-semibold</span>
            </div>
          </div>
        </GradientContainer>

        <GradientContainer className="p-8">
          <h2 className="text-xl font-semibold text-neutral-900 mb-6">Body Text</h2>
          <div className="space-y-6">
            <div>
              <p className="text-lg text-neutral-700 leading-relaxed mb-2 font-content">
                Large body text provides excellent readability for important content sections and introductory paragraphs.
              </p>
              <span className="technical-detail">text-lg / font-content</span>
            </div>
            <div>
              <p className="text-base text-neutral-700 leading-relaxed mb-2 font-content">
                Regular body text serves as the foundation of most content on the web, providing comfortable reading at standard sizes.
              </p>
              <span className="technical-detail">text-base / font-content</span>
            </div>
            <div>
              <p className="text-sm text-neutral-600 leading-relaxed mb-2 font-content">
                Small body text is often used for captions, labels, and secondary information that supports the main content.
              </p>
              <span className="technical-detail">text-sm / font-content</span>
            </div>
          </div>
        </GradientContainer>
      </section>

      {/* Typography Showcase */}
      <section className="ds-card p-12 bg-gradient-to-br from-zinc-900 to-zinc-800">
        <div className="space-y-6">
          <div className="text-6xl font-bold text-white leading-none">
            Design
          </div>
          <div className="text-4xl font-light text-zinc-300 leading-none font-content">
            Typography
          </div>
          <div className="text-lg text-zinc-400 max-w-md font-content">
            Crafted for clarity, designed for impact, built for the modern web.
          </div>
        </div>
      </section>
    </div>
  );
};

export default TypographySpecimen;
