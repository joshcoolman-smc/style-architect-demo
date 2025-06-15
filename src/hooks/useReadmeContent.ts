
import React from 'react';

export const useReadmeContent = () => {
  const [content, setContent] = React.useState<string>('');
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const loadReadme = async () => {
      try {
        const response = await fetch('/README.md');
        if (!response.ok) {
          throw new Error('Failed to load README.md');
        }
        const text = await response.text();
        setContent(text);
      } catch (err) {
        console.error('Error loading README:', err);
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    loadReadme();
  }, []);

  return { content, loading, error };
};
