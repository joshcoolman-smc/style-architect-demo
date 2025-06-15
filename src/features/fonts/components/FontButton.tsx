
import React, { useState } from 'react';
import { Type } from 'lucide-react';
import FontSidebar from './FontSidebar';

const FontButton = () => {
  const [showFontSidebar, setShowFontSidebar] = useState(false);

  return (
    <>
      <button
        onClick={() => setShowFontSidebar(true)}
        className="w-8 h-8 flex items-center justify-center rounded-lg text-sm font-medium font-structural text-muted-foreground hover:text-foreground hover:bg-muted transition-colors border border-border/50 hover:border-border"
      >
        <Type size={16} />
      </button>

      <FontSidebar 
        isOpen={showFontSidebar} 
        onClose={() => setShowFontSidebar(false)} 
      />
    </>
  );
};

export default FontButton;
