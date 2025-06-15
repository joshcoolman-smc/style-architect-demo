
import React from 'react';
import Layout from '../components/Layout';
import MarkdownRenderer from '../components/MarkdownRenderer';
import { useReadmeContent } from '../hooks/useReadmeContent';

const Readme = () => {
  const { content, isLoading, error } = useReadmeContent();

  return (
    <Layout>
      <div className="ds-section-spacing">
        <div className="ds-card p-8unit">
          {isLoading && (
            <div className="flex items-center justify-center py-12">
              <div className="text-muted-foreground">Loading README...</div>
            </div>
          )}
          
          {error && (
            <div className="flex items-center justify-center py-12">
              <div className="text-destructive">Error: {error}</div>
            </div>
          )}
          
          {content && !isLoading && !error && (
            <MarkdownRenderer content={content} />
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Readme;
