
import React from 'react';
import Navigation from './Navigation';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="max-w-7xl mx-auto px-6unit sm:px-8unit lg:px-10unit py-8unit">
        <div className="mx-auto max-w-7xl">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
