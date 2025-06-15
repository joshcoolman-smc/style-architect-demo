
import React from 'react';
import Layout from '../components/Layout';
import MarkdownRenderer from '../components/MarkdownRenderer';
import { useReadmeContent } from '../hooks/useReadmeContent';

const Readme = () => {
  const { content, loading, error } = useReadmeContent();

  return (
    <Layout>
      <div className="ds-section-spacing">
        {loading && (
          <div className="ds-card p-8unit text-center">
            <div className="animate-pulse">
              <div className="h-4 bg-muted rounded w-1/4 mx-auto mb-4unit"></div>
              <div className="h-3 bg-muted rounded w-3/4 mx-auto mb-3unit"></div>
              <div className="h-3 bg-muted rounded w-1/2 mx-auto"></div>
            </div>
          </div>
        )}

        {error && (
          <div className="ds-card p-8unit text-center">
            <h2 className="text-heading-2 text-destructive mb-3unit">Error Loading README</h2>
            <p className="text-body text-muted-foreground">{error}</p>
          </div>
        )}

        {content && !loading && !error && (
          <div className="ds-card p-8unit">
            <MarkdownRenderer content={content} />
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Readme;
