'use client';

import { motion } from 'framer-motion';
import { useState, useRef, useEffect, useMemo, useCallback } from 'react';
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
import { MiniPlayer } from './player/MiniPlayer';
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
  autoplay?: boolean;
}

export function SpotifyMusicPlayer({ onBack, initialActiveTab = 'home', autoplay = false }: SpotifyMusicPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [activeTab, setActiveTab] = useState<'home' | 'search' | 'library'>(initialActiveTab);
  const [trackDurations, setTrackDurations] = useState<Record<string, number>>({});
  const [showMini, setShowMini] = useState(false);
  const heroRef = useRef<HTMLDivElement | null>(null);

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
  const preloadAudioRef = useRef<HTMLAudioElement | null>(null);

  const tracks: MusicTrack[] = useMemo(() => [
    {
      id: '1',
      title: 'Pelado',
      artist: 'Nattanzinho',
      file: '/musics/Pelado.mp3',
      image: '/images/image.jpg',
      duration: 180 // 3 minutos
    },
    {
      id: '2',
      title: 'O Meu Amor',
      artist: 'Maria Bethânia',
      file: '/musics/O Meu Amor - Maria Bethânia (youtube).mp3',
      image: '/images/image2.jpg',
      duration: 180 // 3 minutos
    },
    {
      id: '3',
      title: 'Have You Ever Loved a Woman',
      artist: 'Bryan Adams',
      file: '/musics/Have you Ever loved a woman bryan adams.mp3',
      image: '/images/image3.jpg',
      duration: 240 // 4 minutos
    },
    {
      id: '4',
      title: 'Absolute Beginners',
      artist: 'David Bowie',
      file: '/musics/David Bowie - Absolute Beginners (Official Video) - David Bowie (youtube).mp3',
      image: '/images/image4.jpg',
      duration: 300 // 5 minutos
    },
    {
      id: '5',
      title: "Can't Take My Eyes Off You",
      artist: 'Frankie Valli x Lauryn Hill (Joseph Vincent Cover)',
      file: '/musics/Can\'t Take My Eyes Off You - Frankie Valli x Lauryn Hill (Joseph Vincent Cover) - Joseph Vincent (youtube).mp3',
      image: '/images/image5.jpg',
      duration: 240 // 4 minutos
    }
  ], []);

  // Duração total do set (preferir metadados reais quando disponíveis)
  const totalDurationSec = useMemo(() => {
    const anyReal = tracks.some(t => typeof trackDurations[t.id] === 'number' && !Number.isNaN(trackDurations[t.id]!));
    if (anyReal) {
      return tracks.reduce((sum, t) => sum + (trackDurations[t.id] ?? t.duration), 0);
    }
    return tracks.reduce((sum, t) => sum + t.duration, 0);
  }, [tracks, trackDurations]);

  // Tempo global transcorrido somando faixas anteriores + tempo atual
  const globalTimeSec = tracks
    .slice(0, currentTrack)
    .reduce((sum, t) => sum + (trackDurations[t.id] || t.duration), 0) + currentTime;


  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handlePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        // Não precisamos setar o currentTime aqui pois o handleTimeUpdate já faz isso
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

  const handleTimeUpdate = useCallback(() => {
    const audio = audioRef.current;
    if (audio && isPlaying) {
      setCurrentTime(audio.currentTime);
    }
  }, [isPlaying]);

  const handleLoadedMetadata = useCallback(() => {
    const audio = audioRef.current;
    if (audio) {
      setDuration(audio.duration);
      const id = tracks[currentTrack]?.id;
      if (id && !Number.isNaN(audio.duration)) {
        setTrackDurations(prev => ({ ...prev, [id]: Math.floor(audio.duration) }));
      }
    }
  }, [currentTrack, tracks]);

  const handleEnded = useCallback(() => {
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
  }, [currentTrack, tracks.length]);

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  // Mostrar mini-player quando a arte do álbum não estiver visível
  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        setShowMini(!entry.isIntersecting);
      },
      { root: document.querySelector('.player-scroll'), threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [heroRef]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
      audio.addEventListener('timeupdate', handleTimeUpdate);
      audio.addEventListener('loadedmetadata', handleLoadedMetadata);
      audio.addEventListener('ended', handleEnded);
      
    // Tentar tocar apenas se a página foi acessada a partir de gesto (autoplay sinalizado via rota)
    const tryAutoplay = async () => {
      if (!autoplay) return;
        try {
          await audio.play();
          setIsPlaying(true);
      } catch {
        if (process.env.NODE_ENV !== 'production') {
          console.log('Autoplay foi bloqueado; aguardando interação do usuário.');
        }
      }
    };
    void tryAutoplay();
      
      return () => {
        audio.removeEventListener('timeupdate', handleTimeUpdate);
        audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
        audio.removeEventListener('ended', handleEnded);
      };
  }, [autoplay, handleLoadedMetadata, handleTimeUpdate, handleEnded, isPlaying]);

  // Troca de faixa: resetar tempo apenas quando a faixa muda
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = 0;
    setCurrentTime(0);
    // Não resetar duration imediatamente - deixar os metadados carregarem
    if (isPlaying) {
      audio.play().catch(() => {});
    }
  }, [currentTrack, isPlaying]);


  const currentTrackData = tracks[currentTrack];

  // Calcular qual foto deve ser exibida no AlbumArt baseado no tempo global
  const currentPhotoIndex = useMemo(() => {
    if (totalDurationSec > 0) {
      const totalPhotos = sharedPhotos.length;
      const clampedGlobal = Math.max(0, Math.min(globalTimeSec, totalDurationSec));
      const photoIndex = Math.floor((clampedGlobal / totalDurationSec) * totalPhotos);
      return Math.min(photoIndex, totalPhotos - 1);
    }
    return 0;
  }, [globalTimeSec, totalDurationSec]);

  // Preload da próxima faixa (metadados e cache)
  useEffect(() => {
    const nextIndex = currentTrack + 1;
    if (nextIndex >= tracks.length) return;
    if (!preloadAudioRef.current) {
      preloadAudioRef.current = new Audio();
    }
    const pre = preloadAudioRef.current;
    pre.preload = 'metadata';
    pre.src = encodeURI(tracks[nextIndex].file);
    const onMeta = () => {
      const id = tracks[nextIndex].id;
      if (!Number.isNaN(pre.duration)) {
        setTrackDurations(prev => ({ ...prev, [id]: Math.floor(pre.duration) }));
      }
    };
    pre.addEventListener('loadedmetadata', onMeta, { once: true });
    return () => {
      pre.removeEventListener('loadedmetadata', onMeta as EventListener);
    };
  }, [currentTrack, tracks]);

  return (
    <div className="bg-black w-full h-[100dvh] flex flex-col overflow-hidden">
      {/* Header */}
      <PlayerHeader onBack={onBack} />

      {/* Conteúdo das abas (scroll interno independente) */}
      <div className="player-scroll flex-1 overflow-y-auto pb-24">
        {activeTab === 'home' && (
          <>
            {/* Album Art (observado para mini-player) */}
            <div ref={heroRef}>
              <AlbumArt 
                src={sharedPhotos[currentPhotoIndex]?.image || currentTrackData.image} 
                alt={sharedPhotos[currentPhotoIndex]?.title || currentTrackData.title} 
                isPlaying={isPlaying} 
              />
            </div>

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
            <ProgressBar 
              currentTime={currentTime} 
              duration={duration || currentTrackData.duration} 
              onSeek={handleSeek} 
              formatTime={formatTime} 
            />

            {/* Controls */}
            <Controls
              isPlaying={isPlaying}
              onPlayPause={handlePlayPause}
              onPrev={handlePrevious}
              onNext={handleNext}
              canPrev={currentTrack !== 0}
              canNext={currentTrack !== tracks.length - 1}
            />

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
        src={encodeURI(currentTrackData.file)}
        preload="metadata"
      />

      {/* Mini Player - aparece quando a arte principal sai de vista ou outra aba */}
      {(showMini || activeTab !== 'home') && (
        <MiniPlayer
          thumbnailSrc={sharedPhotos[currentPhotoIndex]?.image || currentTrackData.image}
          title={currentTrackData.title}
          artist={currentTrackData.artist}
          isPlaying={isPlaying}
          currentTime={currentTime}
          duration={duration || currentTrackData.duration}
          onPlayPause={handlePlayPause}
          onPrev={handlePrevious}
          onNext={handleNext}
          onSeek={handleSeek}
          formatTime={formatTime}
        />
      )}
    </div>
  );
}
