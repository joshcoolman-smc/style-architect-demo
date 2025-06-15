
import React from 'react';
import FontFamiliesComponent from './FontFamiliesComponent';
import TypeScaleComponent from './TypeScaleComponent';
import SampleTextComponent from './SampleTextComponent';

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
