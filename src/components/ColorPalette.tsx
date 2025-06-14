
import React from 'react';
import ColorSwatch from './ColorSwatch';
import GradientContainer from './GradientContainer';

interface ColorSwatchData {
  name: string;
  value: string;
  description: string;
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
      description: 'Primary brand colors for sophisticated, modern interfaces.',
      colors: [
        { name: 'Brand 50', value: '#f8fafc', description: 'Lightest brand tint for backgrounds' },
        { name: 'Brand 100', value: '#f1f5f9', description: 'Light brand tint for subtle highlights' },
        { name: 'Brand 200', value: '#e2e8f0', description: 'Brand tint for hover states' },
        { name: 'Brand 300', value: '#cbd5e1', description: 'Light brand accent' },
        { name: 'Brand 400', value: '#94a3b8', description: 'Medium brand accent' },
        { name: 'Brand 500', value: '#64748b', description: 'Primary brand color' },
        { name: 'Brand 600', value: '#475569', description: 'Primary interactive elements' },
        { name: 'Brand 700', value: '#334155', description: 'Pressed/active states' },
        { name: 'Brand 800', value: '#1e293b', description: 'Dark brand shade' },
        { name: 'Brand 900', value: '#0f172a', description: 'Darkest brand shade' },
      ],
    },
    {
      name: 'Accent Colors',
      description: 'Sophisticated accent colors inspired by luxury automotive design.',
      colors: [
        { name: 'Accent 50', value: '#fdf4ff', description: 'Lightest accent tint' },
        { name: 'Accent 100', value: '#fae8ff', description: 'Light accent background' },
        { name: 'Accent 200', value: '#f3d4fe', description: 'Accent highlight' },
        { name: 'Accent 300', value: '#e879f9', description: 'Light accent' },
        { name: 'Accent 400', value: '#d946ef', description: 'Medium accent' },
        { name: 'Accent 500', value: '#c026d3', description: 'Primary accent color' },
        { name: 'Accent 600', value: '#a21caf', description: 'Success states' },
        { name: 'Accent 700', value: '#86198f', description: 'Accent interactive' },
        { name: 'Accent 800', value: '#701a75', description: 'Dark accent' },
        { name: 'Accent 900', value: '#581c87', description: 'Darkest accent' },
      ],
    },
    {
      name: 'Metallic Accents',
      description: 'Metallic tones for premium design elements and highlights.',
      colors: [
        { name: 'Gold Light', value: '#fbbf24', description: 'Light gold for highlights' },
        { name: 'Gold', value: '#f59e0b', description: 'Primary gold accent' },
        { name: 'Gold Dark', value: '#d97706', description: 'Dark gold for depth' },
        { name: 'Bronze Light', value: '#dc2626', description: 'Light bronze accent' },
        { name: 'Bronze', value: '#b91c1c', description: 'Primary bronze tone' },
        { name: 'Bronze Dark', value: '#991b1b', description: 'Dark bronze for contrast' },
        { name: 'Steel Light', value: '#6b7280', description: 'Light steel gray' },
        { name: 'Steel', value: '#4b5563', description: 'Primary steel tone' },
        { name: 'Steel Dark', value: '#374151', description: 'Dark steel for depth' },
      ],
    },
    {
      name: 'Neutral Colors',
      description: 'Sophisticated grayscale palette for modern interfaces.',
      colors: [
        { name: 'Neutral 50', value: '#fafafa', description: 'Page backgrounds' },
        { name: 'Neutral 100', value: '#f5f5f5', description: 'Card backgrounds' },
        { name: 'Neutral 200', value: '#e5e5e5', description: 'Subtle borders' },
        { name: 'Neutral 300', value: '#d4d4d4', description: 'UI borders' },
        { name: 'Neutral 400', value: '#a3a3a3', description: 'Placeholder text' },
        { name: 'Neutral 500', value: '#737373', description: 'Secondary text' },
        { name: 'Neutral 600', value: '#525252', description: 'Body text' },
        { name: 'Neutral 700', value: '#404040', description: 'Headings' },
        { name: 'Neutral 800', value: '#262626', description: 'High contrast text' },
        { name: 'Neutral 900', value: '#171717', description: 'Darkest text' },
      ],
    },
    {
      name: 'Semantic Colors',
      description: 'Colors that convey meaning and status in the interface.',
      colors: [
        { name: 'Success', value: '#10b981', description: 'Success states and positive actions' },
        { name: 'Warning', value: '#f59e0b', description: 'Warning states and caution' },
        { name: 'Error', value: '#ef4444', description: 'Error states and destructive actions' },
        { name: 'Info', value: '#3b82f6', description: 'Informational states' },
      ],
    },
  ];

  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-display-xl font-bold text-neutral-900 mb-2">Color Palette</h1>
        <p className="text-lg text-neutral-600">
          A sophisticated color system inspired by luxury automotive design and modern interfaces.
        </p>
      </div>

      {/* Color Categories */}
      {colorCategories.map((category) => (
        <GradientContainer key={category.name} className="p-8">
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
        </GradientContainer>
      ))}

      {/* Usage Examples */}
      <GradientContainer className="p-8">
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
                Accent Button
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
      </GradientContainer>
    </div>
  );
};

export default ColorPalette;
