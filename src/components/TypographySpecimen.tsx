
import React from 'react';

const TypographySpecimen = () => {
  const fontWeights = [
    { weight: '300', name: 'Light', class: 'font-light' },
    { weight: '400', name: 'Regular', class: 'font-normal' },
    { weight: '500', name: 'Medium', class: 'font-medium' },
    { weight: '600', name: 'Semibold', class: 'font-semibold' },
    { weight: '700', name: 'Bold', class: 'font-bold' },
    { weight: '800', name: 'Extrabold', class: 'font-extrabold' },
  ];

  const headings = [
    { tag: 'H1', class: 'text-4xl font-bold', sample: 'The quick brown fox jumps over the lazy dog' },
    { tag: 'H2', class: 'text-3xl font-bold', sample: 'The quick brown fox jumps over the lazy dog' },
    { tag: 'H3', class: 'text-2xl font-semibold', sample: 'The quick brown fox jumps over the lazy dog' },
    { tag: 'H4', class: 'text-xl font-semibold', sample: 'The quick brown fox jumps over the lazy dog' },
    { tag: 'H5', class: 'text-lg font-medium', sample: 'The quick brown fox jumps over the lazy dog' },
    { tag: 'H6', class: 'text-base font-medium', sample: 'The quick brown fox jumps over the lazy dog' },
  ];

  const bodyText = [
    { name: 'Large', class: 'text-lg', sample: 'This is large body text that provides excellent readability for important content sections.' },
    { name: 'Regular', class: 'text-base', sample: 'This is regular body text that serves as the foundation of most content on the web.' },
    { name: 'Small', class: 'text-sm', sample: 'This is small body text often used for captions, labels, and secondary information.' },
    { name: 'Extra Small', class: 'text-xs', sample: 'This is extra small text typically used for fine print and metadata.' },
  ];

  const codeExample = `// TypeScript interface example
interface DesignSystemProps {
  theme: 'light' | 'dark';
  spacing: number;
  colors: {
    primary: string;
    secondary: string;
  };
}

const myComponent: React.FC<DesignSystemProps> = ({ theme, spacing, colors }) => {
  return (
    <div className={theme === 'dark' ? 'bg-neutral-900' : 'bg-white'}>
      <h1 style={{ color: colors.primary }}>Hello Design System</h1>
    </div>
  );
};`;

  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-display-xl font-bold text-neutral-900 mb-2">Typography</h1>
        <p className="text-lg text-neutral-600">
          A comprehensive type system built on Inter for UI text and Fira Code for code examples.
        </p>
      </div>

      {/* Font Families */}
      <section className="ds-card p-8">
        <h2 className="text-2xl font-bold text-neutral-900 mb-6">Font Families</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-neutral-900 mb-4">Inter (UI Font)</h3>
            <div className="space-y-3">
              {fontWeights.map((weight) => (
                <div key={weight.weight} className="flex items-center justify-between">
                  <span className={`text-2xl ${weight.class}`}>
                    The quick brown fox
                  </span>
                  <span className="text-sm text-neutral-500 font-mono">
                    {weight.name} {weight.weight}
                  </span>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-neutral-900 mb-4">Fira Code (Monospace)</h3>
            <div className="space-y-3">
              {fontWeights.slice(0, 4).map((weight) => (
                <div key={`mono-${weight.weight}`} className="flex items-center justify-between">
                  <span className={`text-2xl font-mono ${weight.class}`}>
                    const hello = "world";
                  </span>
                  <span className="text-sm text-neutral-500 font-mono">
                    {weight.name} {weight.weight}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Heading Hierarchy */}
      <section className="ds-card p-8">
        <h2 className="text-2xl font-bold text-neutral-900 mb-6">Heading Hierarchy</h2>
        <div className="space-y-6">
          {headings.map((heading) => (
            <div key={heading.tag} className="border-l-4 border-brand-500 pl-4">
              <div className="flex items-baseline justify-between mb-2">
                <span className="text-sm font-mono text-neutral-500 bg-neutral-100 px-2 py-1 rounded">
                  {heading.tag}
                </span>
                <span className="text-xs text-neutral-400 font-mono">
                  {heading.class}
                </span>
              </div>
              <div className={heading.class + ' text-neutral-900'}>
                {heading.sample}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Body Text */}
      <section className="ds-card p-8">
        <h2 className="text-2xl font-bold text-neutral-900 mb-6">Body Text</h2>
        <div className="space-y-6">
          {bodyText.map((text) => (
            <div key={text.name} className="border-l-4 border-accent-500 pl-4">
              <div className="flex items-baseline justify-between mb-2">
                <span className="text-sm font-mono text-neutral-500 bg-neutral-100 px-2 py-1 rounded">
                  {text.name}
                </span>
                <span className="text-xs text-neutral-400 font-mono">
                  {text.class}
                </span>
              </div>
              <div className={text.class + ' text-neutral-700'}>
                {text.sample}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Text Variations */}
      <section className="ds-card p-8">
        <h2 className="text-2xl font-bold text-neutral-900 mb-6">Text Variations</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-neutral-900">Styling</h3>
            <div className="space-y-3">
              <p className="text-base text-neutral-700">
                This is <strong className="font-semibold">bold text</strong> for emphasis.
              </p>
              <p className="text-base text-neutral-700">
                This is <em className="italic">italic text</em> for emphasis.
              </p>
              <p className="text-base text-neutral-700">
                This is <a href="#" className="text-brand-600 hover:text-brand-700 underline">a link</a> with hover states.
              </p>
              <p className="text-base text-neutral-500">
                This is muted text for secondary information.
              </p>
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-neutral-900">Lists</h3>
            <ul className="space-y-2 text-neutral-700">
              <li className="flex items-start">
                <span className="w-2 h-2 bg-brand-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                Clean, readable typography
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-brand-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                Consistent spacing and hierarchy
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-brand-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                Accessible color contrast
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Code Examples */}
      <section className="ds-card p-8">
        <h2 className="text-2xl font-bold text-neutral-900 mb-6">Code Examples</h2>
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold text-neutral-900 mb-3">TypeScript Example</h3>
            <pre className="ds-code-block overflow-x-auto">
              <code>{codeExample}</code>
            </pre>
          </div>
          
          <div className="grid md:grid-cols-3 gap-4 mt-6">
            <div>
              <h4 className="text-sm font-semibold text-neutral-900 mb-2">Inline Code</h4>
              <p className="text-sm text-neutral-700">
                Use <code className="bg-neutral-100 text-neutral-800 px-1 py-0.5 rounded text-xs font-mono">className</code> for styling.
              </p>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-neutral-900 mb-2">Keyboard</h4>
              <p className="text-sm text-neutral-700">
                Press <kbd className="bg-neutral-200 border border-neutral-300 rounded px-1.5 py-0.5 text-xs font-mono">Cmd + K</kbd> to search.
              </p>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-neutral-900 mb-2">Variable</h4>
              <p className="text-sm text-neutral-700">
                The <var className="italic text-brand-600 font-mono">primaryColor</var> variable is required.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TypographySpecimen;
