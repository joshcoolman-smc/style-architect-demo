
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Upload, ImagePlus } from 'lucide-react';

interface ImageUploadDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSampleImageSelect: () => void;
  isAnalyzing: boolean;
}

const ImageUploadDialog = ({ 
  open, 
  onOpenChange, 
  onFileUpload, 
  onSampleImageSelect,
  isAnalyzing 
}: ImageUploadDialogProps) => {
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleUploadClick = () => {
    onOpenChange(false);
    setTimeout(() => {
      fileInputRef.current?.click();
    }, 100);
  };

  const handleSampleImageClick = () => {
    onOpenChange(false);
    onSampleImageSelect();
  };

  return (
    <>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={onFileUpload}
        className="hidden"
      />
      
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Choose Image Source</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <button
              onClick={handleUploadClick}
              disabled={isAnalyzing}
              className="w-full p-4 border-2 border-dashed border-muted-foreground/30 rounded-lg hover:border-muted-foreground/50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <div className="flex flex-col items-center space-y-2">
                <Upload className="w-6 h-6 text-muted-foreground" />
                <span className="font-medium text-card-foreground">Upload Image</span>
              </div>
            </button>

            <button
              onClick={handleSampleImageClick}
              disabled={isAnalyzing}
              className="w-full p-4 border-2 border-dashed border-muted-foreground/30 rounded-lg hover:border-muted-foreground/50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <div className="flex flex-col items-center space-y-2">
                <ImagePlus className="w-6 h-6 text-muted-foreground" />
                <span className="font-medium text-card-foreground">Use Sample Image</span>
              </div>
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ImageUploadDialog;
