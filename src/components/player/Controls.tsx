import { motion } from 'framer-motion';
import { SkipBack, Play, Pause, SkipForward } from 'lucide-react';

interface ControlsProps {
  isPlaying: boolean;
  onPlayPause: () => void;
  onPrev: () => void;
  onNext: () => void;
  canPrev: boolean;
  canNext: boolean;
}

export function Controls({ isPlaying, onPlayPause, onPrev, onNext, canPrev, canNext }: ControlsProps) {
  return (
    <div className="px-6 mb-8">
      <div className="flex items-center justify-center space-x-8">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={onPrev}
          disabled={!canPrev}
          className="text-gray-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          aria-label="Faixa anterior"
        >
          <SkipBack className="w-6 h-6" />
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={onPlayPause}
          className="bg-white text-black rounded-full p-4 hover:scale-105 transition-transform"
          aria-label={isPlaying ? 'Pausar' : 'Tocar'}
        >
          {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-1" />}
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={onNext}
          disabled={!canNext}
          className="text-gray-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          aria-label="Próxima faixa"
        >
          <SkipForward className="w-6 h-6" />
        </motion.button>
      </div>
    </div>
  );
}


