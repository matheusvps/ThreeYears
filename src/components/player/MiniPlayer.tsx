'use client';

import { motion, useDragControls } from 'framer-motion';
import Image from 'next/image';
import { Pause, Play, SkipBack, SkipForward, ChevronUp } from 'lucide-react';
import { useState } from 'react';

interface MiniPlayerProps {
  thumbnailSrc: string;
  title: string;
  artist: string;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  onPlayPause: () => void;
  onPrev: () => void;
  onNext: () => void;
  onSeek: (e: React.ChangeEvent<HTMLInputElement>) => void;
  formatTime: (seconds: number) => string;
}

export function MiniPlayer({
  thumbnailSrc,
  title,
  artist,
  isPlaying,
  currentTime,
  duration,
  onPlayPause,
  onPrev,
  onNext,
  onSeek,
  formatTime,
}: MiniPlayerProps) {
  const [isMinimized, setIsMinimized] = useState(false);
  const dragControls = useDragControls();
  const percent = duration > 0 ? Math.min(100, Math.max(0, (currentTime / (duration || 1)) * 100)) : 0;

  return (
    <div className="fixed left-1/2 -translate-x-1/2 w-full max-w-[520px] px-3 z-[60]" style={{ bottom: 88 }}>
      {isMinimized ? (
        // Botão pequeno quando minimizado
        <motion.button
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          onClick={() => setIsMinimized(false)}
          className="bg-[#141414] border border-gray-800 rounded-full p-3 shadow-xl hover:bg-[#1a1a1a] transition-colors"
          aria-label="Expandir player"
        >
          <div className="flex items-center gap-3">
            <div className="shrink-0 rounded-lg overflow-hidden w-10 h-10 bg-black/40">
              {thumbnailSrc ? (
                <Image 
                  src={thumbnailSrc} 
                  alt={title} 
                  width={40} 
                  height={40} 
                  className="w-10 h-10 object-cover" 
                  quality={90}
                  sizes="40px"
                />
              ) : (
                <div className="w-10 h-10" />
              )}
            </div>
            <div className="min-w-0">
              <p className="text-white text-sm font-semibold truncate max-w-[200px]">{title}</p>
              <p className="text-gray-400 text-xs truncate max-w-[200px]">{artist}</p>
            </div>
            <ChevronUp className="w-5 h-5 text-gray-400" />
          </div>
        </motion.button>
      ) : (
        // Player completo
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 30, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="bg-[#141414] border border-gray-800 rounded-2xl shadow-xl overflow-hidden"
          drag="y"
          dragControls={dragControls}
          dragConstraints={{ top: 0, bottom: 200 }}
          dragElastic={0.1}
          onDragEnd={(event, info) => {
            // Se arrastou para baixo mais de 50px, minimizar
            if (info.offset.y > 50) {
              setIsMinimized(true);
            }
          }}
          dragMomentum={false}
        >
          <div className="flex items-center gap-4 p-4">
            <div className="shrink-0 rounded-lg overflow-hidden w-14 h-14 bg-black/40">
              {thumbnailSrc ? (
                <Image 
                  src={thumbnailSrc} 
                  alt={title} 
                  width={112} 
                  height={112} 
                  className="w-14 h-14 object-cover" 
                  quality={90}
                  sizes="56px"
                />
              ) : (
                <div className="w-14 h-14" />
              )}
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between gap-2">
                <div className="min-w-0">
                  <p className="text-white text-[15px] font-semibold truncate">{title}</p>
                  <p className="text-gray-400 text-[13px] truncate">{artist}</p>
                </div>
                <button onClick={onPlayPause} aria-label={isPlaying ? 'Pausar' : 'Tocar'} className="bg-white text-black rounded-full p-2.5 shadow">
                  {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-[2px]" />}
                </button>
              </div>

              <div className="mt-2">
                <div className="flex items-center gap-2">
                  <button onClick={onPrev} aria-label="Anterior" className="text-gray-400 hover:text-white">
                    <SkipBack className="w-5 h-5" />
                  </button>
                  <div className="relative flex-1">
                    <input
                      type="range"
                      min={0}
                      max={duration || 0}
                      value={currentTime}
                      onChange={onSeek}
                      className="slider w-full h-3 rounded-lg focus:outline-none focus:ring-1 focus:ring-green-500"
                      aria-label="Progresso da faixa"
                      style={{
                        background: `linear-gradient(to right, #1db954 0%, #1db954 ${percent}%, #4a4a4a ${percent}%, #4a4a4a 100%)`,
                      }}
                    />
                    <div className="flex items-center justify-between mt-1 text-[11px] px-0 select-none">
                      <span className="text-gray-300 leading-none">{formatTime(currentTime)}</span>
                      <span className="text-gray-400 leading-none">{formatTime(duration)}</span>
                    </div>
                  </div>
                  <button onClick={onNext} aria-label="Próxima" className="text-gray-400 hover:text-white">
                    <SkipForward className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}


