
import React from 'react';
import Layout from '../components/Layout';
import AnimatedPage from '../components/AnimatedPage';
import TypographySpecimen from '../features/typography/components/TypographySpecimen';

const Typography = () => {
  return (
    <Layout>
      <AnimatedPage>
        <TypographySpecimen />
      </AnimatedPage>
    </Layout>
  );
};

export default Typography;
