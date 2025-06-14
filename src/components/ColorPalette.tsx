import React from 'react';
import ColorSwatch from './ColorSwatch';

interface ColorSwatchData {
  name: string;
  value: string;
  description: string;
  textColor: 'white' | 'black';
}

interface ColorCategory {
  name: string;
  description: string;
  colors: ColorSwatchData[];
}

const ColorPalette = () => {
  const [copiedColor, setCopiedColor] = React.useState<string | null>(null);

  const copyToClipboard = async (value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedColor(value);
      setTimeout(() => setCopiedColor(null), 2000);
    } catch (err) {
      console.error('Failed to copy color:', err);
    }
  };

  const colorCategories: ColorCategory[] = [
    {
      name: 'Brand Colors',
      description: 'Primary brand colors used for key interface elements and actions.',
      colors: [
        { name: 'Brand 50', value: '#f0f9ff', description: 'Lightest brand tint for backgrounds', textColor: 'black' },
        { name: 'Brand 100', value: '#e0f2fe', description: 'Light brand tint for subtle highlights', textColor: 'black' },
        { name: 'Brand 200', value: '#bae6fd', description: 'Brand tint for hover states', textColor: 'black' },
        { name: 'Brand 300', value: '#7dd3fc', description: 'Light brand accent', textColor: 'black' },
        { name: 'Brand 400', value: '#38bdf8', description: 'Medium brand accent', textColor: 'black' },
        { name: 'Brand 500', value: '#0ea5e9', description: 'Primary brand color', textColor: 'white' },
        { name: 'Brand 600', value: '#0284c7', description: 'Primary interactive elements', textColor: 'white' },
        { name: 'Brand 700', value: '#0369a1', description: 'Pressed/active states', textColor: 'white' },
        { name: 'Brand 800', value: '#075985', description: 'Dark brand shade', textColor: 'white' },
        { name: 'Brand 900', value: '#0c4a6e', description: 'Darkest brand shade', textColor: 'white' },
      ],
    },
    {
      name: 'Accent Colors',
      description: 'Secondary colors used for highlights, success states, and visual interest.',
      colors: [
        { name: 'Accent 50', value: '#f0fdfa', description: 'Lightest accent tint', textColor: 'black' },
        { name: 'Accent 100', value: '#ccfbf1', description: 'Light accent background', textColor: 'black' },
        { name: 'Accent 200', value: '#99f6e4', description: 'Accent highlight', textColor: 'black' },
        { name: 'Accent 300', value: '#5eead4', description: 'Light accent', textColor: 'black' },
        { name: 'Accent 400', value: '#2dd4bf', description: 'Medium accent', textColor: 'black' },
        { name: 'Accent 500', value: '#14b8a6', description: 'Primary accent color', textColor: 'white' },
        { name: 'Accent 600', value: '#0d9488', description: 'Success states', textColor: 'white' },
        { name: 'Accent 700', value: '#0f766e', description: 'Accent interactive', textColor: 'white' },
        { name: 'Accent 800', value: '#115e59', description: 'Dark accent', textColor: 'white' },
        { name: 'Accent 900', value: '#134e4a', description: 'Darkest accent', textColor: 'white' },
      ],
    },
    {
      name: 'Neutral Colors',
      description: 'Grayscale colors for text, borders, backgrounds, and general UI elements.',
      colors: [
        { name: 'Neutral 50', value: '#fafafa', description: 'Page backgrounds', textColor: 'black' },
        { name: 'Neutral 100', value: '#f5f5f5', description: 'Card backgrounds', textColor: 'black' },
        { name: 'Neutral 200', value: '#e5e5e5', description: 'Subtle borders', textColor: 'black' },
        { name: 'Neutral 300', value: '#d4d4d4', description: 'UI borders', textColor: 'black' },
        { name: 'Neutral 400', value: '#a3a3a3', description: 'Placeholder text', textColor: 'black' },
        { name: 'Neutral 500', value: '#737373', description: 'Secondary text', textColor: 'white' },
        { name: 'Neutral 600', value: '#525252', description: 'Body text', textColor: 'white' },
        { name: 'Neutral 700', value: '#404040', description: 'Headings', textColor: 'white' },
        { name: 'Neutral 800', value: '#262626', description: 'High contrast text', textColor: 'white' },
        { name: 'Neutral 900', value: '#171717', description: 'Darkest text', textColor: 'white' },
      ],
    },
    {
      name: 'Semantic Colors',
      description: 'Colors that convey meaning and status in the interface.',
      colors: [
        { name: 'Success', value: '#10b981', description: 'Success states and positive actions', textColor: 'white' },
        { name: 'Warning', value: '#f59e0b', description: 'Warning states and caution', textColor: 'black' },
        { name: 'Error', value: '#ef4444', description: 'Error states and destructive actions', textColor: 'white' },
        { name: 'Info', value: '#3b82f6', description: 'Informational states', textColor: 'white' },
      ],
    },
  ];

  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-display-xl font-bold text-neutral-900 mb-2">Color Palette</h1>
        <p className="text-lg text-neutral-600">
          A carefully crafted color system that ensures accessibility and visual hierarchy.
        </p>
      </div>

      {/* Color Categories */}
      {colorCategories.map((category) => (
        <section key={category.name} className="ds-card p-8">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-neutral-900 mb-2">{category.name}</h2>
            <p className="text-neutral-600">{category.description}</p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {category.colors.map((color) => {
              const isSemanticColor = category.name === 'Semantic Colors';
              
              return (
                <ColorSwatch
                  key={color.name}
                  name={color.name}
                  value={color.value}
                  description={color.description}
                  onCopy={copyToClipboard}
                  isCopied={copiedColor === color.value}
                  isSemanticColor={isSemanticColor}
                />
              );
            })}
          </div>
        </section>
      ))}

      {/* Usage Examples */}
      <section className="ds-card p-8">
        <h2 className="text-2xl font-bold text-neutral-900 mb-6">Usage Examples</h2>
        
        <div className="grid lg:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-neutral-900 mb-4">Button Variations</h3>
            <div className="space-y-3">
              <button className="ds-button-primary">
                Primary Button
              </button>
              <button className="ds-button-secondary">
                Secondary Button
              </button>
              <button className="bg-accent-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-accent-700 transition-colors">
                Success Button
              </button>
              <button className="bg-red-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-700 transition-colors">
                Danger Button
              </button>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-neutral-900 mb-4">Status Indicators</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-sm text-neutral-700">Active / Success</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <span className="text-sm text-neutral-700">Warning / Pending</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <span className="text-sm text-neutral-700">Error / Inactive</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span className="text-sm text-neutral-700">Info / Default</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ColorPalette;
