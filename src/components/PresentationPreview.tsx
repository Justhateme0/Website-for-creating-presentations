import React, { useState, useEffect } from 'react';
import { Slide } from './PresentationCreator';
import { ChevronLeft, ChevronRight, Loader } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface PresentationPreviewProps {
  slides: Slide[];
  theme: string;
  isLoading: boolean;
}

const PresentationPreview: React.FC<PresentationPreviewProps> = ({ 
  slides, 
  theme, 
  isLoading 
}) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  
  useEffect(() => {
    if (currentSlideIndex >= slides.length && slides.length > 0) {
      setCurrentSlideIndex(slides.length - 1);
    }
  }, [slides, currentSlideIndex]);

  const nextSlide = () => {
    if (currentSlideIndex < slides.length - 1) {
      setCurrentSlideIndex(currentSlideIndex + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlideIndex > 0) {
      setCurrentSlideIndex(currentSlideIndex - 1);
    }
  };

  const getThemeStyles = () => {
    switch (theme) {
      case 'minimal':
        return 'bg-white text-gray-900';
      case 'dark':
        return 'bg-gray-900 text-white';
      case 'gradient':
        return 'bg-gradient-to-br from-blue-500 to-purple-600 text-white';
      case 'professional':
        return 'bg-blue-50 text-gray-900 border-l-4 border-blue-500';
      default:
        return 'bg-white text-gray-900';
    }
  };

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
        <h2 className="text-lg font-semibold">Preview</h2>
        <div className="text-sm text-gray-600">
          {slides.length > 0 ? (
            <span>Slide {currentSlideIndex + 1} of {slides.length}</span>
          ) : (
            <span>No slides</span>
          )}
        </div>
      </div>
      
      <div className="flex-grow relative flex items-center justify-center p-6 bg-gray-100">
        {isLoading ? (
          <div className="flex items-center justify-center">
            <Loader className="w-8 h-8 text-blue-500 animate-spin" />
            <span className="ml-2 text-gray-600">Creating slides...</span>
          </div>
        ) : slides.length > 0 ? (
          <>
            <button 
              className="absolute left-2 z-10 p-2 rounded-full bg-white shadow-md text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={prevSlide}
              disabled={currentSlideIndex === 0}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            
            <div className="w-full max-w-3xl aspect-[16/9] rounded-lg shadow-slide overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlideIndex}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className={`w-full h-full p-8 flex flex-col ${getThemeStyles()}`}
                >
                  <h2 className="text-2xl md:text-3xl font-bold mb-6">{slides[currentSlideIndex].title}</h2>
                  <div className="flex-grow">
                    {slides[currentSlideIndex].content.map((item, index) => (
                      <motion.p 
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className="mb-4 text-lg"
                      >
                        {item}
                      </motion.p>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
            
            <button 
              className="absolute right-2 z-10 p-2 rounded-full bg-white shadow-md text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={nextSlide}
              disabled={currentSlideIndex === slides.length - 1}
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        ) : (
          <div className="text-center text-gray-500">
            <p>Enter text in the editor to create slides</p>
          </div>
        )}
      </div>
      
      <div className="p-3 border-t border-gray-200 bg-gray-50 text-center text-xs text-gray-500">
        Use navigation buttons to view slides
      </div>
    </div>
  );
};

export default PresentationPreview;