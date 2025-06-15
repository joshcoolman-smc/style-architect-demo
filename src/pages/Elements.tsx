
import React from 'react';
import Layout from '../components/Layout';
import AnimatedPage from '../components/AnimatedPage';
import ElementsShowcase from '../features/elements/components/ElementsShowcase';

const Elements = () => {
  return (
    <Layout>
      <AnimatedPage>
        <ElementsShowcase />
      </AnimatedPage>
    </Layout>
  );
};

export default Elements;
