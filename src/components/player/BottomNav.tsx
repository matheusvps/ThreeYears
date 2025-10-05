import { motion } from 'framer-motion';
import { Home, Search, Library } from 'lucide-react';

interface BottomNavProps {
  activeTab: 'home' | 'search' | 'library';
  onSetTab: (tab: 'home' | 'search' | 'library') => void;
}

export function BottomNav({ activeTab, onSetTab }: BottomNavProps) {
  return (
    <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[480px] bg-black border-t border-gray-800 z-50 pointer-events-auto">
      <div className="flex justify-around items-center py-4 px-6">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onSetTab('home')}
          className={`flex flex-col items-center space-y-1 transition-colors ${
            activeTab === 'home' ? 'text-white' : 'text-gray-400 hover:text-white'
          }`}
          aria-label="Aba Início"
        >
          <Home className="w-6 h-6" />
          <span className="text-xs font-medium">Início</span>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onSetTab('search')}
          className={`flex flex-col items-center space-y-1 transition-colors ${
            activeTab === 'search' ? 'text-white' : 'text-gray-400 hover:text-white'
          }`}
          aria-label="Aba Pesquisar"
        >
          <Search className="w-6 h-6" />
          <span className="text-xs font-medium">Pesquisar</span>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onSetTab('library')}
          className={`flex flex-col items-center space-y-1 transition-colors ${
            activeTab === 'library' ? 'text-white' : 'text-gray-400 hover:text-white'
          }`}
          aria-label="Aba Sua biblioteca"
        >
          <Library className="w-6 h-6" />
          <span className="text-xs font-medium">Sua biblioteca</span>
        </motion.button>
      </div>
    </div>
  );
}


