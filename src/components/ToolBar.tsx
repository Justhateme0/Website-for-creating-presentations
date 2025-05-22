import React, { useRef } from 'react';
import { Download, Upload, Palette } from 'lucide-react';
import { Slide } from './PresentationCreator';
import { generatePptx } from '../utils/presentationUtils';
import { motion } from 'framer-motion';

interface ToolBarProps {
  theme: string;
  setTheme: (theme: string) => void;
  slides: Slide[];
  text: string;
  onFileUpload: (file: File) => void;
}

const ToolBar: React.FC<ToolBarProps> = ({ 
  theme, 
  setTheme, 
  slides,
  text,
  onFileUpload 
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onFileUpload(file);
    }
  };

  const handleDownload = async () => {
    if (slides.length === 0) {
      alert('Please create slides first!');
      return;
    }
    
    try {
      await generatePptx(slides, theme, text);
    } catch (error) {
      console.error('Error generating PPTX:', error);
      alert('Failed to create presentation. Please try again.');
    }
  };

  return (
    <motion.div 
      className="p-4 border-b border-gray-200 bg-white flex flex-wrap gap-3 items-center"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center mr-auto">
        <div className="flex items-center mr-6">
          <Palette className="w-5 h-5 text-gray-600 mr-2" />
          <select 
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            className="input-field py-1 pl-2 pr-8 text-sm"
          >
            <option value="default">Default Theme</option>
            <option value="minimal">Minimal</option>
            <option value="dark">Dark</option>
            <option value="gradient">Gradient</option>
            <option value="professional">Professional</option>
          </select>
        </div>
      </div>
      
      <div className="flex items-center space-x-2">
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept=".docx"
          className="hidden"
        />
        
        <button
          onClick={() => fileInputRef.current?.click()}
          className="btn-secondary flex items-center text-sm"
        >
          <Upload className="w-4 h-4 mr-1" />
          <span>Import Word</span>
        </button>
        
        <button
          onClick={handleDownload}
          className="btn-primary flex items-center text-sm"
          disabled={slides.length === 0}
        >
          <Download className="w-4 h-4 mr-1" />
          <span>Download PPTX</span>
        </button>
      </div>
    </motion.div>
  );
};

export default ToolBar