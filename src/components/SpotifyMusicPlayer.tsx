'use client';

import { motion } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import { CoupleInfoCard } from './CoupleInfoCard';
import { SpecialMessage } from './SpecialMessage';
import { PhotoGallery } from './PhotoGallery';
import { LibraryView } from './LibraryView';
import { Photo } from '@/types/media';
import { photos as sharedPhotos } from '@/data/photos';
import { PlayerHeader } from './player/PlayerHeader';
import { AlbumArt } from './player/AlbumArt';
import { ProgressBar } from './player/ProgressBar';
import { Controls } from './player/Controls';
import { BottomNav } from './player/BottomNav';
interface MusicTrack {
  id: string;
  title: string;
  artist: string;
  file: string;
  image: string;
  duration: number;
}

interface SpotifyMusicPlayerProps {
  onBack: () => void;
  initialActiveTab?: 'home' | 'search' | 'library';
}

export function SpotifyMusicPlayer({ onBack, initialActiveTab = 'home' }: SpotifyMusicPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [activeTab, setActiveTab] = useState<'home' | 'search' | 'library'>(initialActiveTab);

  // Depuração: logar mudanças de aba (apenas em dev)
  useEffect(() => {
    if (process.env.NODE_ENV !== 'production') {
      console.log('[Player] activeTab mudou para:', activeTab);
    }
  }, [activeTab]);

  const handleSetActiveTab = (tab: 'home' | 'search' | 'library') => {
    if (process.env.NODE_ENV !== 'production') {
      console.log('[Player] clicou no footer para alterar aba:', tab);
    }
    setActiveTab(tab);
    // Resetar scroll do conteúdo quando trocar de aba
    const scrollContainers = document.querySelectorAll('.player-scroll');
    scrollContainers.forEach((el) => {
      try {
        (el as HTMLElement).scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
      } catch {
        (el as HTMLElement).scrollTop = 0;
      }
    });
  };

  // Depuração global de clique (apenas em dev)
  useEffect(() => {
    if (process.env.NODE_ENV !== 'production') {
      const onDocClick = (e: MouseEvent) => {
        const target = e.target as HTMLElement;
        console.log('[Global Click]', { tag: target?.tagName, classes: target?.className });
      };
      document.addEventListener('click', onDocClick);
      return () => document.removeEventListener('click', onDocClick);
    }
  }, []);
  const audioRef = useRef<HTMLAudioElement>(null);

  const tracks: MusicTrack[] = [
    {
      id: '1',
      title: 'O Meu Amor',
      artist: 'Maria Bethânia',
      file: '/musics/O Meu Amor - Maria Bethânia (youtube).mp3',
      image: '/images/image.jpg', // Usando uma das imagens existentes
      duration: 180 // 3 minutos
    },
    {
      id: '2',
      title: 'Absolute Beginners',
      artist: 'David Bowie',
      file: '/musics/David Bowie - Absolute Beginners (Official Video) - David Bowie (youtube).mp3',
      image: '/images/image2.jpg',
      duration: 300 // 5 minutos
    },
    {
      id: '3',
      title: "Can't Take My Eyes Off You",
      artist: 'Frankie Valli x Lauryn Hill (Joseph Vincent Cover)',
      file: '/musics/Can\'t Take My Eyes Off You - Frankie Valli x Lauryn Hill (Joseph Vincent Cover) - Joseph Vincent (youtube).mp3',
      image: '/images/image3.jpg',
      duration: 240 // 4 minutos
    }
  ];

  // Duração total do set
  const totalDurationSec = tracks.reduce((sum, t) => sum + t.duration, 0);

  // Tempo global transcorrido somando faixas anteriores + tempo atual
  const globalTimeSec = tracks
    .slice(0, currentTrack)
    .reduce((sum, t) => sum + t.duration, 0) + currentTime;

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handlePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handlePrevious = () => {
    if (currentTrack > 0) {
      setCurrentTrack(currentTrack - 1);
    }
  };

  const handleNext = () => {
    if (currentTrack < tracks.length - 1) {
      setCurrentTrack(currentTrack + 1);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    setCurrentTime(newTime);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleEnded = () => {
    if (currentTrack < tracks.length - 1) {
      setCurrentTrack((prev) => prev + 1);
      setCurrentTime(0);
      // auto play next track se já estava tocando
      const audio = audioRef.current;
      if (audio) {
        // play ocorrerá após o src trocar no render; garantir async
        setTimeout(() => {
          audio.play().catch(() => {});
          setIsPlaying(true);
        }, 0);
      }
    } else {
      setIsPlaying(false);
      setCurrentTime(0);
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.addEventListener('timeupdate', handleTimeUpdate);
      audio.addEventListener('loadedmetadata', handleLoadedMetadata);
      audio.addEventListener('ended', handleEnded);
      
      // Autoplay na primeira música
      const playAudio = async () => {
        try {
          await audio.play();
          setIsPlaying(true);
        } catch (error) {
          console.log('Autoplay bloqueado pelo navegador:', error);
        }
      };
      
      // Tentar tocar após um pequeno delay para garantir que o áudio carregou
      const timer = setTimeout(playAudio, 500);
      
      return () => {
        audio.removeEventListener('timeupdate', handleTimeUpdate);
        audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
        audio.removeEventListener('ended', handleEnded);
        clearTimeout(timer);
      };
    }
  }, []);

  // Troca de faixa: resetar tempo e manter autoplay se já estava tocando
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = 0;
    if (isPlaying) {
      audio.play().catch(() => {});
    }
  }, [currentTrack, isPlaying]);

  const currentTrackData = tracks[currentTrack];

  return (
    <div className="bg-black w-full h-[100dvh] flex flex-col overflow-hidden">
      {/* Header */}
      <PlayerHeader onBack={onBack} />

      {/* Album Art */}
      <AlbumArt src={currentTrackData.image} alt={currentTrackData.title} isPlaying={isPlaying} />

      {/* Track Info */}
      <div className="px-6 mb-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center"
        >
          <h2 className="text-white text-xl font-bold mb-1">{currentTrackData.title}</h2>
          <p className="text-gray-400 text-sm">{currentTrackData.artist}</p>
        </motion.div>
      </div>

      {/* Progress Bar */}
      <ProgressBar currentTime={currentTime} duration={duration} onSeek={handleSeek} formatTime={formatTime} />

      {/* Controls */}
      <Controls
        isPlaying={isPlaying}
        onPlayPause={handlePlayPause}
        onPrev={handlePrevious}
        onNext={handleNext}
        canPrev={currentTrack !== 0}
        canNext={currentTrack !== tracks.length - 1}
      />

      {/* Conteúdo das abas (scroll interno independente) */}
      <div className="player-scroll flex-1 overflow-y-auto pb-24">
        {activeTab === 'home' && (
          <>
            <CoupleInfoCard />
            <SpecialMessage />
            <PhotoGallery 
              isMuted={isMuted} 
              onToggleMute={toggleMute}
              globalTimeSec={globalTimeSec}
              totalDurationSec={totalDurationSec}
              isPlaying={isPlaying}
            />
          </>
        )}
        
        {activeTab === 'search' && (
          <div className="px-4 py-6">
            <div className="text-center mb-8">
              <h2 className="text-white text-2xl font-bold mb-4">Pesquisar Fotos</h2>
              <p className="text-gray-400 text-sm">
                Encontre suas memórias favoritas pesquisando por palavras-chave
              </p>
            </div>
            <PhotoGallery 
              isMuted={isMuted} 
              onToggleMute={toggleMute}
              globalTimeSec={globalTimeSec}
              totalDurationSec={totalDurationSec}
              isPlaying={isPlaying}
            />
          </div>
        )}
        
        {activeTab === 'library' && (
          <LibraryView photos={sharedPhotos as Photo[]} />
        )}
      </div>

      {/* Bottom Navigation */}
      <BottomNav activeTab={activeTab} onSetTab={handleSetActiveTab} />

      {/* Audio Element */}
      <audio
        ref={audioRef}
        src={currentTrackData.file}
        preload="metadata"
      />
    </div>
  );
}
