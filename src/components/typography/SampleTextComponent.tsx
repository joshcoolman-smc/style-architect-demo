
import React from 'react';
import GradientContainer from '../GradientContainer';

const SampleTextComponent = () => {
  return (
    <GradientContainer className="p-12">
      <div className="space-y-6 max-w-prose">
        <h1 className="text-heading-1 text-white font-structural">
          Typography creates hierarchy
        </h1>
        <h2 className="text-heading-2 text-white/80 font-subheader">
          Visual contrast guides the reader's eye through information
        </h2>
        <p className="text-body text-white font-content">
          Effective typography establishes clear information hierarchy through strategic use of size, weight, and spacing. By varying these elements systematically, designers create a visual roadmap that leads readers through content naturally.
        </p>
        <p className="text-caption text-white/90 font-content">
          The smallest text provides additional context and details. Caption text is perfect for metadata, annotations, and supplementary information that supports the main content without competing for attention.
        </p>
      </div>
    </GradientContainer>
  );
};

export default SampleTextComponent;
