import React from 'react';
import Layout from '../components/Layout';
import AnimatedPage from '../components/AnimatedPage';
import { DatabaseVisualizer } from '../features/database/components/DatabaseVisualizer';

const DBTest = () => {
  return (
    <Layout>
      <AnimatedPage>
        <DatabaseVisualizer />
      </AnimatedPage>
    </Layout>
  );
};

export default DBTest;