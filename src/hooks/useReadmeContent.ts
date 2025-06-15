
import { useState, useEffect } from 'react';

export const useReadmeContent = () => {
  const [content, setContent] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReadme = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/README.md');
        
        if (!response.ok) {
          throw new Error('Failed to load README.md');
        }
        
        const text = await response.text();
        setContent(text);
        setError(null);
      } catch (err) {
        console.error('Error loading README:', err);
        setError(err instanceof Error ? err.message : 'Failed to load README');
      } finally {
        setIsLoading(false);
      }
    };

    fetchReadme();
  }, []);

  return { content, isLoading, error };
};
