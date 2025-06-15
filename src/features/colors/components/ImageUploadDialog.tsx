
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
  onSampleImageSelect: (imagePath: string) => void;
  isAnalyzing: boolean;
}

const sampleImages = [
  {
    path: '/lovable-uploads/7b22b782-4c1f-4ee7-ba00-ada76ecd8f87.png',
    name: 'Cyberpunk Character'
  },
  {
    path: '/lovable-uploads/e49ac76e-0b00-474b-aed2-48b1d6495f9f.png',
    name: 'Tactical Helmet'
  },
  {
    path: '/lovable-uploads/ded06afa-e63e-4ae5-ae9c-ea01f1b7e609.png',
    name: 'Mech Pilot'
  },
  {
    path: '/lovable-uploads/45e8e9c6-3afc-4d99-a225-3cc766d0b947.png',
    name: 'Robot Design'
  },
  {
    path: '/lovable-uploads/e7f46332-598d-4741-9cdf-676a492444ee.png',
    name: 'Orange Mech'
  },
  {
    path: '/lovable-uploads/ebf33618-35ec-494a-b9a5-718e7db97000.png',
    name: 'Pink Warrior'
  },
  {
    path: '/lovable-uploads/f1a2fb77-285c-4ed3-89f0-3e1f408db11e.png',
    name: 'Green Portrait'
  },
  {
    path: '/lovable-uploads/ca87949a-4b19-4eaa-9aed-9cf381550219.png',
    name: 'Red Samurai'
  },
  {
    path: '/lovable-uploads/5122156b-c4e4-416a-a133-85e7ca00bfb3.png',
    name: 'Butterfly Vibes'
  }
];

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

  const handleSampleImageClick = (imagePath: string) => {
    onOpenChange(false);
    onSampleImageSelect(imagePath);
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
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Choose Image Source</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-6">
            {/* Upload Option */}
            <button
              onClick={handleUploadClick}
              disabled={isAnalyzing}
              className="w-full p-6 border-2 border-dashed border-muted-foreground/30 rounded-lg hover:border-muted-foreground/50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <div className="flex flex-col items-center space-y-3">
                <Upload className="w-8 h-8 text-muted-foreground" />
                <div>
                  <h3 className="font-medium text-card-foreground">Upload Your Image</h3>
                  <p className="text-sm text-muted-foreground">Choose an image from your device</p>
                </div>
              </div>
            </button>

            {/* Sample Images Option */}
            <div>
              <h3 className="font-medium text-card-foreground mb-4 flex items-center gap-2">
                <ImagePlus className="w-5 h-5" />
                Use Sample Image
              </h3>
              
              <div className="grid grid-cols-3 gap-3">
                {sampleImages.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => handleSampleImageClick(image.path)}
                    disabled={isAnalyzing}
                    className="relative group aspect-square rounded-lg overflow-hidden border-2 border-transparent hover:border-primary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <img
                      src={image.path}
                      alt={image.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                    <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white text-xs p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      {image.name}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ImageUploadDialog;
