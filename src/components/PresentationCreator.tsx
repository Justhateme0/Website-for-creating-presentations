import React, { useState, useEffect } from 'react';
import TextEditor from './TextEditor';
import PresentationPreview from './PresentationPreview';
import ToolBar from './ToolBar';
import { generateSlides } from '../utils/presentationUtils';
import { parseWordDocument } from '../utils/documentUtils';
import { motion } from 'framer-motion';
import { ChevronUp } from 'lucide-react';

export interface Slide {
  id: string;
  title: string;
  content: string[];
}

const PresentationCreator: React.FC = () => {
  const [text, setText] = useState<string>('My Presentation\n\nIntroduction\nThis will be the content of the first slide\n\nMain Content\n• First point\n• Second point\n• Third point\n\nConclusion\nThank you for your attention!');
  const [slides, setSlides] = useState<Slide[]>([]);
  const [theme, setTheme] = useState<string>('default');
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [showMobileEditor, setShowMobileEditor] = useState<boolean>(false);

  useEffect(() => {
    const updateSlides = () => {
      try {
        setIsGenerating(true);
        const newSlides = generateSlides(text);
        setSlides(newSlides);
      } catch (error) {
        console.error('Error generating slides:', error);
      } finally {
        setIsGenerating(false);
      }
    };

    updateSlides();
  }, [text]);

  const handleFileUpload = async (file: File) => {
    try {
      setIsGenerating(true);
      const content = await parseWordDocument(file);
      setText(content);
    } catch (error) {
      console.error('Error parsing Word document:', error);
      alert('Failed to process Word document. Please try another file.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="flex-grow flex flex-col max-w-7xl w-full mx-auto rounded-lg overflow-hidden bg-white shadow-md">
      <ToolBar 
        theme={theme} 
        setTheme={setTheme} 
        slides={slides}
        text={text} 
        onFileUpload={handleFileUpload} 
      />
      
      <div className="flex-grow flex flex-col">
        {/* Preview Section */}
        <motion.div 
          className="flex-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <PresentationPreview 
            slides={slides} 
            theme={theme} 
            isLoading={isGenerating} 
          />
        </motion.div>

        {/* Mobile Toggle */}
        <div className="md:hidden flex justify-center border-t border-gray-200">
          <button 
            onClick={() => setShowMobileEditor(!showMobileEditor)}
            className="flex items-center space-x-1 p-2 text-sm text-gray-600"
          >
            <span>{showMobileEditor ? 'Hide Editor' : 'Show Editor'}</span>
            <ChevronUp className={`h-4 w-4 transform transition-transform ${showMobileEditor ? 'rotate-180' : ''}`} />
          </button>
        </div>
        
        {/* Text Editor */}
        <motion.div 
          className={`border-t border-gray-200 ${showMobileEditor ? 'block' : 'hidden'} md:block`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          style={{ height: '400px' }}
        >
          <TextEditor text={text} setText={setText} />
        </motion.div>
      </div>
    </div>
  );
};

export default PresentationCreator;