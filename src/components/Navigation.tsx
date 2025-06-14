
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Palette, Type, Layout, Home } from 'lucide-react';
import FontSelector from './FontSelector';

const Navigation = () => {
  const location = useLocation();
  const [showFontSelector, setShowFontSelector] = useState(false);

  const navItems = [
    { path: '/', label: 'Overview', icon: Home },
    { path: '/typography', label: 'Typography', icon: Type },
    { path: '/colors', label: 'Colors', icon: Palette },
    { path: '/components', label: 'Components', icon: Layout },
  ];

  return (
    <>
      <nav className="bg-card border-b border-border sticky top-0 z-40 backdrop-blur-sm bg-card/95">
        <div className="max-w-7xl mx-auto px-6unit sm:px-8unit lg:px-10unit">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-8unit">
              <Link to="/" className="flex items-center space-x-3unit">
                <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent-600 rounded-lg flex items-center justify-center">
                  <span className="text-primary-foreground font-bold text-sm font-structural">DS</span>
                </div>
                <span className="font-structural font-semibold text-lg text-foreground">
                  Design System
                </span>
              </Link>
              
              <div className="hidden md:flex items-center space-x-1">
                {navItems.map((item) => {
                  const IconComponent = item.icon;
                  const isActive = location.pathname === item.path;
                  
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={`flex items-center space-x-2 px-3unit py-2 rounded-lg text-sm font-medium font-structural transition-colors ${
                        isActive
                          ? 'bg-primary/10 text-primary border border-primary/20'
                          : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                      }`}
                    >
                      <IconComponent size={16} />
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
            
            <div className="flex items-center space-x-4unit">
              <button
                onClick={() => setShowFontSelector(true)}
                className="flex items-center space-x-2 px-3unit py-2 rounded-lg text-sm font-medium font-structural text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
              >
                <Type size={16} />
                <span className="hidden sm:block">Fonts</span>
              </button>
              <span className="text-sm text-muted-foreground hidden sm:block font-mono">
                v1.0.0
              </span>
            </div>
          </div>
        </div>
      </nav>

      <FontSelector 
        isOpen={showFontSelector} 
        onClose={() => setShowFontSelector(false)} 
      />
    </>
  );
};

export default Navigation;
