
import React from 'react';
import FontFamiliesComponent from './typography/FontFamiliesComponent';
import TypeScaleComponent from './typography/TypeScaleComponent';
import SampleTextComponent from './typography/SampleTextComponent';

const TypographySpecimen = () => {
  return (
    <div className="space-y-16 text-left">
      {/* Font Families Section */}
      <FontFamiliesComponent />

      {/* Type Scale and Editorial Example Side by Side */}
      <div className="grid md:grid-cols-2 gap-8">
        {/* Type Scale - Simplified */}
        <TypeScaleComponent />

        {/* Editorial Example */}
        <SampleTextComponent />
      </div>
    </div>
  );
};

export default TypographySpecimen;
