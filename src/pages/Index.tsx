
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Palette, Type, Layout as LayoutIcon } from 'lucide-react';
import Layout from '../components/Layout';

const Index = () => {
  const features = [
    {
      icon: Type,
      title: 'Typography System',
      description: 'Comprehensive type scale with Inter for UI and Fira Code for code examples.',
      href: '/typography',
      color: 'brand',
    },
    {
      icon: Palette,
      title: 'Color Palette',
      description: 'Carefully crafted colors with accessibility and contrast considerations.',
      href: '/colors',
      color: 'accent',
    },
    {
      icon: LayoutIcon,
      title: 'Interactive Components',
      description: 'Complete library of UI components with consistent styling and behavior.',
      href: '/components',
      color: 'brand',
    },
  ];

  return (
    <Layout>
      <div className="space-y-16">
        {/* Hero Section */}
        <div className="text-center space-y-8">
          <div className="space-y-4">
            <h1 className="text-display-2xl font-bold text-neutral-900">
              Design System
              <span className="block text-brand-600">Showcase</span>
            </h1>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
              A comprehensive design system built with modern web technologies. 
              Featuring consistent typography, accessible colors, and interactive components 
              that scale beautifully across projects.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/typography"
              className="ds-button-primary inline-flex items-center justify-center space-x-2"
            >
              <span>Explore Typography</span>
              <ArrowRight size={16} />
            </Link>
            <Link
              to="/colors"
              className="ds-button-secondary inline-flex items-center justify-center space-x-2"
            >
              <span>View Colors</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="grid lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <Link
                key={index}
                to={feature.href}
                className="ds-card-interactive group"
              >
                <div className="p-8">
                  <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl mb-6 ${
                    feature.color === 'brand' 
                      ? 'bg-brand-100 text-brand-600' 
                      : 'bg-accent-100 text-accent-600'
                  }`}>
                    <IconComponent size={24} />
                  </div>
                  
                  <h3 className="text-xl font-semibold text-neutral-900 mb-3 group-hover:text-brand-600 transition-colors">
                    {feature.title}
                  </h3>
                  
                  <p className="text-neutral-600 mb-4">
                    {feature.description}
                  </p>
                  
                  <div className="flex items-center text-brand-600 text-sm font-medium group-hover:text-brand-700 transition-colors">
                    <span>Learn more</span>
                    <ArrowRight size={14} className="ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Stats Section */}
        <div className="ds-card p-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-neutral-900 mb-2">Built for Scale</h2>
            <p className="text-neutral-600">
              A robust foundation for building consistent user experiences
            </p>
          </div>
          
          <div className="grid sm:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-brand-600 mb-2">50+</div>
              <div className="text-sm text-neutral-600">Color Variations</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-accent-600 mb-2">12</div>
              <div className="text-sm text-neutral-600">Typography Scales</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-brand-600 mb-2">25+</div>
              <div className="text-sm text-neutral-600">UI Components</div>
            </div>
          </div>
        </div>

        {/* Code Example */}
        <div className="ds-card p-8">
          <h2 className="text-2xl font-bold text-neutral-900 mb-6">Implementation</h2>
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-lg font-semibold text-neutral-900 mb-3">Easy to Use</h3>
              <p className="text-neutral-600 mb-4">
                Our design system uses semantic class names and CSS custom properties 
                to make implementation straightforward and maintainable.
              </p>
              <ul className="space-y-2 text-sm text-neutral-600">
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-brand-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Consistent naming conventions
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-brand-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Accessible by default
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-brand-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Responsive design principles
                </li>
              </ul>
            </div>
            
            <div>
              <pre className="ds-code-block text-sm overflow-x-auto">
                <code>{`// Using design system classes
<button className="ds-button-primary">
  Primary Action
</button>

<div className="ds-card p-6">
  <h2 className="text-display-md mb-4">
    Card Title
  </h2>
  <p className="text-neutral-600">
    Card content with proper typography.
  </p>
</div>`}</code>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
