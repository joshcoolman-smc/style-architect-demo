
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Type } from 'lucide-react';
import FontSelector from './FontSelector';

const Navigation = () => {
  const location = useLocation();
  const [showFontSelector, setShowFontSelector] = useState(false);

  const navItems = [
    { path: '/typography', label: 'Type' },
    { path: '/colors', label: 'Color' },
    { path: '/elements', label: 'Elements' },
  ];

  return (
    <>
      <nav className="bg-card border-b border-border sticky top-0 z-40 backdrop-blur-sm bg-card/95">
        <div className="max-w-7xl mx-auto px-6unit sm:px-8unit lg:px-10unit">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center">
              <span className="font-structural font-semibold text-lg text-foreground">
                Style Guide
              </span>
            </Link>
            
            <div className="flex items-center space-x-6unit">
              <div className="hidden md:flex items-center space-x-1">
                {navItems.map((item) => {
                  const isActive = location.pathname === item.path;
                  
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={`px-3unit py-2 rounded-lg text-sm font-medium font-structural transition-colors ${
                        isActive
                          ? 'bg-zinc-800 text-zinc-100'
                          : 'text-muted-foreground hover:text-foreground hover:bg-zinc-800/50'
                      }`}
                    >
                      {item.label}
                    </Link>
                  );
                })}
              </div>
              
              <button
                onClick={() => setShowFontSelector(true)}
                className="flex items-center space-x-2 px-3unit py-2 rounded-lg text-sm font-medium font-structural text-muted-foreground hover:text-foreground hover:bg-zinc-800/50 transition-colors"
              >
                <Type size={16} />
                <span className="hidden sm:block">Fonts</span>
              </button>
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
