
import React from 'react';
import Layout from '../components/Layout';
import AnimatedPage from '../components/AnimatedPage';
import ColorPalette from '../features/colors/components/ColorPalette';

const Colors = () => {
  return (
    <Layout>
      <AnimatedPage>
        <ColorPalette />
      </AnimatedPage>
    </Layout>
  );
};

export default Colors;
