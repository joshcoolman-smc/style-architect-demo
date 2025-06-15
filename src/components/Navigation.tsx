
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import FontButton from '../features/fonts/components/FontButton';

const Navigation = () => {
  const location = useLocation();

  const navItems = [
    { path: '/typography', label: 'Typography' },
    { path: '/colors', label: 'Colors' },
    { path: '/elements', label: 'Elements' },
    { path: '/readme', label: 'About' },
  ];

  return (
    <nav className="bg-card border-b border-border sticky top-0 z-40 backdrop-blur-sm bg-card/95">
      <div className="w-full px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center">
            <span className="font-inter font-semibold text-lg text-foreground">
              Style Guide
            </span>
          </Link>
          
          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center space-x-1 relative">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path;
                
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`px-3unit py-2 text-sm font-medium font-inter transition-colors flex items-center gap-1.5 relative ${
                      isActive
                        ? 'text-foreground'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
              
              {/* Active indicator that slides between nav items */}
              {navItems.map((item) => {
                const isActive = location.pathname === item.path;
                return isActive ? (
                  <motion.div
                    key="activeIndicator"
                    className="absolute bottom-0 h-0.5 bg-foreground"
                    layoutId="activeNavIndicator"
                    transition={{
                      type: "spring",
                      stiffness: 380,
                      damping: 30,
                      mass: 0.8
                    }}
                    style={{
                      left: `${navItems.findIndex(navItem => navItem.path === item.path) * 25}%`,
                      width: `${100 / navItems.length}%`
                    }}
                  />
                ) : null;
              })}
            </div>
            
            <FontButton />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
