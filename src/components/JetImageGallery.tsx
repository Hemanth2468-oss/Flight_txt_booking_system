
import { useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { Dialog, DialogContent } from "@/components/ui/dialog";

interface JetImageGalleryProps {
  isOpen: boolean;
  onClose: () => void;
  images: string[];
  jetName: string;
}

const JetImageGallery = ({ isOpen, onClose, images, jetName }: JetImageGalleryProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const handleNext = () => {
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };
  
  const handlePrevious = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-4xl p-0 overflow-hidden bg-black">
        <div className="relative h-full">
          {/* Close button */}
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 z-50 bg-black/50 p-2 rounded-full text-white hover:bg-black/70 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
          
          {/* Image */}
          <div className="relative h-[60vh] bg-black flex items-center justify-center">
            {images.length > 0 && (
              <img 
                src={images[currentImageIndex]} 
                alt={`${jetName} - image ${currentImageIndex + 1}`}
                className="max-h-full max-w-full object-contain"
              />
            )}
            
            {/* Caption */}
            <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white p-3 text-center">
              <h3 className="text-lg font-semibold">{jetName}</h3>
              <p className="text-sm text-gray-300">Image {currentImageIndex + 1} of {images.length}</p>
            </div>
          </div>
          
          {/* Navigation arrows */}
          {images.length > 1 && (
            <>
              <button 
                onClick={handlePrevious}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 p-2 rounded-full text-white hover:bg-black/70 transition-colors"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button 
                onClick={handleNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 p-2 rounded-full text-white hover:bg-black/70 transition-colors"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </>
          )}
          
          {/* Thumbnail navigation */}
          <div className="flex overflow-x-auto bg-black/90 p-2 gap-2 justify-center">
            {images.map((image, index) => (
              <button 
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`flex-shrink-0 h-16 w-24 border-2 transition-all ${
                  currentImageIndex === index ? 'border-blue-500' : 'border-transparent'
                }`}
              >
                <img 
                  src={image} 
                  alt={`${jetName} thumbnail ${index + 1}`}
                  className="h-full w-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default JetImageGallery;
