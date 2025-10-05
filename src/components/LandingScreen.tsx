'use client';

import { motion } from 'framer-motion';

interface LandingScreenProps {
  onViewGift: () => void;
  onOpenSearch: () => void;
  onOpenLibrary: () => void;
}

export function LandingScreen({ onViewGift, onOpenSearch, onOpenLibrary }: LandingScreenProps) {
  return (
    <div className="min-h-screen bg-black flex flex-col w-full">
      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-sm mx-auto w-full"
        >
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-4 leading-tight">
            Eu quis fazer um{' '}
            <span className="text-green-500">presente especial</span>!
          </h1>
          
          <p className="text-gray-400 text-sm md:text-base mb-8 leading-relaxed">
            Um momento único feito com carinho para celebrar a jornada de nós
          </p>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onViewGift}
            className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-4 px-8 rounded-full text-lg transition-colors duration-200"
          >
            Ver Presente
          </motion.button>
        </motion.div>
      </div>

      {/* Bottom Navigation */}
      <div className="bg-black border-t border-gray-800">
        <div className="flex justify-around items-center py-4 px-6">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              console.log('[Landing] clique em Início (ver presente)');
              onViewGift();
            }}
            className="flex flex-col items-center space-y-1 text-gray-400 hover:text-white transition-colors"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
            </svg>
            <span className="text-xs font-medium">Início</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              console.log('[Landing] clique em Pesquisar');
              onOpenSearch();
            }}
            className="flex flex-col items-center space-y-1 text-white transition-colors"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
            </svg>
            <span className="text-xs font-medium">Pesquisar</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              console.log('[Landing] clique em Sua biblioteca');
              onOpenLibrary();
            }}
            className="flex flex-col items-center space-y-1 text-gray-400 hover:text-white transition-colors"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-1 9H9V9h10v2zm-4 4H9v-2h6v2zm4-8H9V5h10v2z"/>
            </svg>
            <span className="text-xs font-medium">Sua biblioteca</span>
          </motion.button>
        </div>
      </div>
    </div>
  );
}
