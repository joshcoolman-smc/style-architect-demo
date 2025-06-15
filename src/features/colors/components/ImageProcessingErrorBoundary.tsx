import React from 'react';
import { ImageOff, Upload } from 'lucide-react';
import ErrorBoundary from '../../../components/ErrorBoundary';

const ImageProcessingErrorFallback: React.FC<{ error?: Error; retry: () => void }> = ({ error, retry }) => (
  <div className="flex flex-col items-center justify-center p-8 bg-card rounded-lg border">
    <div className="text-center space-y-4">
      <ImageOff className="h-10 w-10 text-muted-foreground mx-auto" />
      <h3 className="text-lg font-medium text-card-foreground">Image Processing Failed</h3>
      <p className="text-sm text-muted-foreground max-w-sm">
        {error?.message?.includes('Failed to analyze image') 
          ? 'Unable to extract colors from this image. Try a different image with more distinct colors.'
          : 'Something went wrong while processing your image. Please try again.'}
      </p>
      <div className="flex gap-2 justify-center">
        <button
          onClick={retry}
          className="inline-flex items-center px-3 py-2 text-sm bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
        >
          <Upload className="h-4 w-4 mr-2" />
          Try another image
        </button>
      </div>
    </div>
  </div>
);

const ImageProcessingErrorBoundary: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <ErrorBoundary 
    fallback={ImageProcessingErrorFallback}
    onError={(error) => {
      // Log specific image processing errors
      console.error('Image processing error:', error);
    }}
  >
    {children}
  </ErrorBoundary>
);

export default ImageProcessingErrorBoundary;