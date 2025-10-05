import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';

interface PlayerHeaderProps {
  onBack: () => void;
}

export function PlayerHeader({ onBack }: PlayerHeaderProps) {
  return (
    <div className="flex items-center justify-between p-4">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onBack}
        className="text-white hover:text-green-500 transition-colors"
        aria-label="Voltar"
      >
        <ArrowLeft className="w-6 h-6" />
      </motion.button>

      <h1 className="text-white font-semibold">Tocando agora</h1>

      <div className="w-6"></div>
    </div>
  );
}


