import React from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import { motion } from 'framer-motion';

interface TextEditorProps {
  text: string;
  setText: (text: string) => void;
}

const TextEditor: React.FC<TextEditorProps> = ({ text, setText }) => {
  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b border-gray-200 bg-gray-50">
        <h2 className="text-lg font-semibold">Editor</h2>
        <p className="text-sm text-gray-600">
          Enter your presentation text, and it will be automatically split into slides
        </p>
      </div>
      
      <motion.div 
        className="flex-grow p-4 overflow-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <TextareaAutosize
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full h-full min-h-[400px] p-4 font-mono text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
          placeholder="My Presentation

Introduction
This will be the content of the first slide

Main Content
• First point
• Second point
• Third point

Conclusion
Thank you for your attention!"
        />
      </motion.div>
      
      <div className="p-3 border-t border-gray-200 bg-gray-50">
        <div className="text-xs text-gray-500">
          <p className="font-medium">Tips:</p>
          <ul className="list-disc list-inside">
            <li>Each new section will be a separate slide</li>
            <li>Use • to create lists</li>
            <li>Leave an empty line between sections</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TextEditor;