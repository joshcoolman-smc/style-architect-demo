
import React from 'react';
import { cn } from '@/lib/utils';

interface GradientContainerProps {
  children: React.ReactNode;
  className?: string;
  startColor?: string;
  endColor?: string;
}

const GradientContainer = ({ 
  children, 
  className = "",
  startColor = "from-zinc-900/90",
  endColor = "to-zinc-800/90"
}: GradientContainerProps) => {
  return (
    <div className={cn(
      "ds-card bg-gradient-to-br",
      startColor,
      endColor,
      className
    )}>
      {children}
    </div>
  );
};

export default GradientContainer;
