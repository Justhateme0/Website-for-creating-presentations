import React from 'react';
import PresentationCreator from './components/PresentationCreator';
import Header from './components/Header';
import { motion } from 'framer-motion';

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 font-inter text-gray-900">
      <Header />
      <motion.main 
        className="flex-grow flex flex-col p-4 md:p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <PresentationCreator />
      </motion.main>
    </div>
  );
}

export default App;