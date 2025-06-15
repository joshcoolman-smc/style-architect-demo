
import React from 'react';
import { Separator } from '../../../components/ui/separator';
import GradientContainer from '../../../components/GradientContainer';

const TypeScaleComponent = () => {
  return (
    <GradientContainer className="p-12">
      <div className="space-y-12">
        <div className="relative">
          <h1 className="text-heading-1 text-white">Quick brown fox</h1>
          <span className="ds-text-technical-light text-muted-foreground absolute -bottom-5 left-0">h-1</span>
        </div>
        <Separator className="bg-white/20" />
        <div className="relative">
          <h2 className="text-heading-2 text-white">Quick brown fox</h2>
          <span className="ds-text-technical-light text-muted-foreground absolute -bottom-5 left-0">h-2</span>
        </div>
        <Separator className="bg-white/20" />
        <div className="relative">
          <h3 className="text-heading-3 text-white">Quick brown fox</h3>
          <span className="ds-text-technical-light text-muted-foreground absolute -bottom-5 left-0">h-3</span>
        </div>
        <Separator className="bg-white/20" />
        <div className="relative">
          <p className="text-body text-white">Quick brown fox jumps over the lazy dog</p>
          <span className="ds-text-technical-light text-muted-foreground absolute -bottom-5 left-0">body</span>
        </div>
        <Separator className="bg-white/20" />
        <div className="relative">
          <p className="text-caption text-white">Quick brown fox jumps over the lazy dog</p>
          <span className="ds-text-technical-light text-muted-foreground absolute -bottom-5 left-0">caption</span>
        </div>
      </div>
    </GradientContainer>
  );
};

export default TypeScaleComponent;
