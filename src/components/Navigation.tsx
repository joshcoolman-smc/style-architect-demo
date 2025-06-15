
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navigation = () => {
  const location = useLocation();

  const navItems = [
    { path: '/typography', label: 'Typography' },
    { path: '/colors', label: 'Colors' },
    { path: '/elements', label: 'Elements' },
  ];

  return (
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
                    className={`px-3unit py-2 text-sm font-medium font-structural transition-colors border-b-2 ${
                      isActive
                        ? 'text-foreground border-foreground'
                        : 'text-muted-foreground border-transparent hover:text-foreground'
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
