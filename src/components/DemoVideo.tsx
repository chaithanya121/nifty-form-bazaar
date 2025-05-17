
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface DemoVideoProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const DemoVideo: React.FC<DemoVideoProps> = ({ open, onOpenChange }) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-3xl bg-gray-900 border-gray-700 p-0 overflow-hidden">
        <div className="absolute top-2 right-2">
          <Button
            variant="ghost"
            className="h-8 w-8 p-0 rounded-full"
            onClick={() => onOpenChange(false)}
          >
            <X className="h-4 w-4 text-gray-400" />
          </Button>
        </div>
        
        <DialogHeader className="p-4 pb-0">
          <DialogTitle className="text-xl font-bold text-white">Form Builder Pro Demo</DialogTitle>
        </DialogHeader>
        
        <div className="relative aspect-video w-full overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center bg-gray-800">
            <div className="w-full h-full">
              <iframe 
                width="100%" 
                height="100%" 
                src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=0" 
                title="Form Builder Pro Demo"
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
        
        <div className="p-4 bg-gray-800">
          <p className="text-gray-300 text-sm">
            Watch this short demo to learn how to create beautiful forms in minutes with 
            our intuitive drag-and-drop builder. No coding required.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DemoVideo;
