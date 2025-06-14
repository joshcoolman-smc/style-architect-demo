
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Palette, Type, Layout as LayoutIcon } from 'lucide-react';
import Layout from '../components/Layout';

const Index = () => {
  const features = [
    {
      icon: Type,
      title: 'Typography System',
      description: 'Comprehensive type scale with mathematical spacing and hierarchy.',
      href: '/typography',
      color: 'primary',
    },
    {
      icon: Palette,
      title: 'Color Palette',
      description: 'Dark-optimized colors with accessibility and contrast considerations.',
      href: '/colors',
      color: 'accent',
    },
    {
      icon: LayoutIcon,
      title: 'Interactive Components',
      description: 'Complete library of UI components with consistent dark styling.',
      href: '/components',
      color: 'primary',
    },
  ];

  return (
    <Layout>
      <div className="ds-section-spacing">
        {/* Hero Section */}
        <div className="text-center ds-component-spacing">
          <div className="ds-content-spacing">
            <h1 className="text-display-2xl font-bold text-foreground font-structural">
              Design System
              <span className="block text-primary">Showcase</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto font-content leading-relaxed">
              A comprehensive design system built with modern web technologies. 
              Featuring mathematical spacing, accessible dark colors, and interactive components 
              that scale beautifully across projects.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4unit justify-center">
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
        <div className="grid lg:grid-cols-3 gap-8unit">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <Link
                key={index}
                to={feature.href}
                className="ds-card-interactive group"
              >
                <div className="p-8unit">
                  <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl mb-6unit ${
                    feature.color === 'primary' 
                      ? 'bg-primary/10 text-primary' 
                      : 'bg-accent-600/10 text-accent-600'
                  }`}>
                    <IconComponent size={24} />
                  </div>
                  
                  <h3 className="text-xl font-semibold text-foreground mb-3unit group-hover:text-primary transition-colors font-structural">
                    {feature.title}
                  </h3>
                  
                  <p className="text-muted-foreground mb-4unit font-content leading-relaxed">
                    {feature.description}
                  </p>
                  
                  <div className="flex items-center text-primary text-sm font-medium group-hover:text-primary/80 transition-colors font-structural">
                    <span>Learn more</span>
                    <ArrowRight size={14} className="ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Stats Section */}
        <div className="ds-card p-8unit">
          <div className="text-center mb-8unit">
            <h2 className="text-2xl font-bold text-foreground mb-2 font-structural">Built for Scale</h2>
            <p className="text-muted-foreground font-content">
              A robust foundation for building consistent user experiences
            </p>
          </div>
          
          <div className="grid sm:grid-cols-3 gap-8unit text-center">
            <div>
              <div className="text-3xl font-bold text-primary mb-2 font-structural">50+</div>
              <div className="text-sm text-muted-foreground font-content">Color Variations</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-accent-600 mb-2 font-structural">12</div>
              <div className="text-sm text-muted-foreground font-content">Typography Scales</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2 font-structural">25+</div>
              <div className="text-sm text-muted-foreground font-content">UI Components</div>
            </div>
          </div>
        </div>

        {/* Implementation Section */}
        <div className="ds-card p-8unit">
          <h2 className="text-2xl font-bold text-foreground mb-6unit font-structural">Implementation</h2>
          <div className="grid lg:grid-cols-2 gap-8unit items-center">
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-3unit font-subheader subheader">Easy to Use</h3>
              <p className="text-muted-foreground mb-4unit font-content leading-relaxed">
                Our design system uses mathematical spacing (8px base unit) and semantic class names 
                to make implementation straightforward and maintainable.
              </p>
              <ul className="ds-content-spacing text-sm text-muted-foreground font-content">
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3unit flex-shrink-0"></span>
                  Mathematical spacing system (8px base)
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3unit flex-shrink-0"></span>
                  Dark-first accessible design
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3unit flex-shrink-0"></span>
                  Typography hierarchy with font families
                </li>
              </ul>
            </div>
            
            <div>
              <pre className="bg-neutral-50 text-neutral-800 p-6unit rounded-lg text-sm overflow-x-auto font-mono">
                <code>{`// Using design system classes
<button className="ds-button-primary">
  Primary Action
</button>

<div className="ds-card p-8unit">
  <h2 className="text-display-md mb-4unit 
               font-structural">
    Card Title
  </h2>
  <p className="text-muted-foreground 
             font-content">
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
