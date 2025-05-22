import React from 'react';
import { Presentation } from 'lucide-react';
import { motion } from 'framer-motion';

const Header: React.FC = () => {
  return (
    <motion.header 
      className="bg-white shadow-sm py-4 px-6"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Presentation className="h-8 w-8 text-blue-600" />
          <div>
            <h1 className="text-xl font-bold text-gray-900">Presentation Creator</h1>
            <p className="text-xs text-gray-500">Create beautiful presentations easily</p>
          </div>
        </div>
        
        <nav className="hidden md:flex items-center space-x-4">
          <a 
            href="https://github.com/slidegenius/docs" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-sm text-gray-600 hover:text-blue-600 transition-colors"
          >
            Documentation
          </a>
          <a 
            href="https://slidegenius.io/templates" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-sm text-gray-600 hover:text-blue-600 transition-colors"
          >
            Templates
          </a>
        </nav>
      </div>
    </motion.header>
  );
};

export default Header;