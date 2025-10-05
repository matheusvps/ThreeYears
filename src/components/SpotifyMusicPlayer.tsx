'use client';

import { motion } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import { CoupleInfoCard } from './CoupleInfoCard';
import { SpecialMessage } from './SpecialMessage';
import { PhotoGallery } from './PhotoGallery';
import { LibraryView } from './LibraryView';
import { Photo } from '@/types/media';
import { photos as sharedPhotos } from '@/data/photos';
import Image from 'next/image';
import { BLUR_DATA_URL } from '@/lib/images';
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
  }, [currentTrack]);

  const currentTrackData = tracks[currentTrack];

  // Dados das fotos para a biblioteca
  const photos: Photo[] = [
    {
      id: 1,
      title: "São João 2025",
      image: "/images/image.jpg",
      description: "Nós dois no São João de 2025, de frente à uma fogueira, abraçados"
    },
    {
      id: 2,
      title: "Feijoada do Noivado",
      image: "/images/image2.jpg",
      description: "Fomos comer uma feijoada enquanto planejávamos o noivado. Foi muito gostoso, passamos o dia juntos"
    },
    {
      id: 3,
      title: "Preparando a Casa",
      image: "/images/image3.jpg",
      description: "Comprando louças e algumas coisas que queríamos pra casa, preparando pro noivado"
    },
    {
      id: 4,
      title: "Momentos de Paz",
      image: "/images/image4.jpg",
      description: "Deitados, apenas. Ela sorrindo e eu de perfil olhando alguma outra coisa"
    },
    {
      id: 5,
      title: "Com o Dante",
      image: "/images/image5.jpg",
      description: "Nós dois sorrindo, deitados, com o Dante (cachorro salsicha dela)"
    },
    {
      id: 6,
      title: "Com a Cacau",
      image: "/images/image6.jpg",
      description: "Nós dois deitados, sorrindo, com Cacau (minha cadela) entre nós dois"
    },
    {
      id: 7,
      title: "Formatura em Família",
      image: "/images/image7.jpg",
      description: "Comemorando a formatura dela em família (pais dela, irmão dela, minha mãe e nós dois)"
    },
    {
      id: 8,
      title: "Salvador 2025R",
      image: "/images/image8.jpg",
      description: "Segunda viagem à Salvador (Bahia). Foto com meu pai e meu sobrinho no meu ombro"
    },
    {
      id: 9,
      title: "O Calabouço",
      image: "/images/image9.jpg",
      description: "Fomos num restaurante chamado O Calabouço, depois que passei 1 mês fora viajando, pra matar a saudade e comemorar as conquistas dela"
    },
    {
      id: 10,
      title: "Kit de Louças",
      image: "/images/image10.jpg",
      description: "Nós dois, deitados, com o kit de 52 louças que compramos pra quando formos morar juntos"
    },
    {
      id: 11,
      title: "Primeiros Encontros",
      image: "/images/image11.jpg",
      description: "Um dos nossos primeiros encontros, quando tudo ainda era novidade e cada momento juntos era uma descoberta"
    },
    {
      id: 12,
      title: "Olhares e Sorrisos",
      image: "/images/image12.jpg",
      description: "Nosso segundo ou terceiro encontro, nos olhando e sorrindo - quando soubemos que algo especial estava nascendo entre nós"
    },
    {
      id: 13,
      title: "Chalé e Fogueira",
      image: "/images/image13.jpg",
      description: "Nosso primeiro chalé alugado, acendendo uma fogueira juntos e criando memórias que aquecem o coração até hoje"
    },
    {
      id: 14,
      title: "Reencontro Após Salvador",
      image: "/images/image14.jpg",
      description: "O reencontro depois de dois meses longe, quando viajei para Salvador. O abraço que valeu por todos os dias de saudade"
    },
    {
      id: 15,
      title: "Café da Manhã Sério",
      image: "/images/image15.jpg",
      description: "Um momento sério em uma cafeteria, quando os olhares já falavam mais que as palavras"
    },
    {
      id: 16,
      title: "Enchendo o Bucho",
      image: "/images/image16.jpg",
      description: "Aquele momento descontraído enchendo o bucho de comida, quando a felicidade simples se tornou nossa rotina"
    },
    {
      id: 17,
      title: "Primeiro Morro",
      image: "/images/image17.jpg",
      description: "Nosso primeiro morro juntos, onde eu estava morrendo de frio mas o coração estava quente. Foi ali que pedi você em noivado"
    },
    {
      id: 18,
      title: "Marshmallow na Fogueira",
      image: "/images/image18.jpg",
      description: "Comendo marshmallow na fogueira, criando tradições que se tornaram parte da nossa história de amor"
    },
    {
      id: 19,
      title: "Chalé do Final de Semana",
      image: "/images/image19.jpg",
      description: "Mais uma vez alugamos um chalé no final de semana, porque esses momentos a sós são os que mais nos conectam"
    },
    {
      id: 20,
      title: "Beijo no Deck",
      image: "/images/image20.jpg",
      description: "Nosso beijo no deck sobre o lago do chalé - um momento de pura paixão e conexão, com a natureza como testemunha"
    },
    {
      id: 21,
      title: "Marco das Três Fronteiras",
      image: "/images/image21.jpg",
      description: "Nós dois no Marco das Três Fronteiras em Foz do Iguaçu, explorando o mundo juntos e descobrindo novos horizontes"
    },
    {
      id: 22,
      title: "Foz do Iguaçu",
      image: "/images/image22.jpg",
      description: "Mais uma foto nossa em Foz do Iguaçu, registrando nossa aventura pelas cataratas e pela vida a dois"
    },
    {
      id: 23,
      title: "Bancando a unha da madame",
      image: "/images/image23.jpg",
      description: "Banquei uma unha para você ficar bem bonitona - pequenos gestos que mostram o quanto me importo com seus detalhes"
    },
    {
      id: 24,
      title: "Ano Novo 2023-2024",
      image: "/images/image24.jpg",
      description: "Nosso ano novo de 2023 para 2024, levemente alcoolizados e muito felizes, celebrando mais um ano de amor"
    },
    {
      id: 25,
      title: "Sorvete na Praia",
      image: "/images/image25.jpg",
      description: "Tomando sorvete na praia do Ervino, saboreando a doçura do momento e da nossa companhia"
    },
    {
      id: 26,
      title: "Formatura do João",
      image: "/images/image26.jpg",
      description: "Arrumados para a formatura do João, celebrando conquistas em família e criando memórias especiais"
    },
    {
      id: 27,
      title: "Casamento Especial",
      image: "/images/image27.jpg",
      description: "Em um casamento especial, nos beijando e celebrando o amor - não só o dos noivos, mas o nosso também"
    },
    {
      id: 28,
      title: "Meu Aniversário",
      image: "/images/image28.jpg",
      description: "Meu aniversário em família, rindo e celebrando a vida ao lado das pessoas que mais amo, especialmente você"
    },
    {
      id: 29,
      title: "Juntos e Sorrindo",
      image: "/images/image29.jpg",
      description: "Simplesmente nós dois, juntos e sorrindo - porque às vezes o mais bonito é a simplicidade de estar ao lado de quem amamos"
    },
    {
      id: 30,
      title: "Em Família com Dona Dora",
      image: "/images/image30.jpg",
      description: "Eu, Sofia, minha mãe, minha avó e dona Dora – um momento em família para guardar no coração"
    },
    {
      id: 31,
      title: "Viagem de Carro com Cacau",
      image: "/images/image31.jpg",
      description: "Nós dois e Cacau viajando de carro – estrada, risadas e companhia perfeita"
    },
    {
      id: 32,
      title: "Jogo do Coxa – Dupla Pé Quente",
      image: "/images/image32.jpg",
      description: "Fomos ao jogo do Coxa com meu sogro. O Coxa ganhou – dupla pé quente!"
    },
    {
      id: 33,
      title: "Nós Dois na Academia",
      image: "/images/image33.jpg",
      description: "Treinando juntos – motivação, parceria e saúde lado a lado"
    },
    {
      id: 34,
      title: "Com Meu Avô Ari",
      image: "/images/image34.jpg",
      description: "Nós dois e meu avô Ari – carinho, respeito e gerações juntas"
    },
    {
      id: 35,
      title: "Família na Bahia",
      image: "/images/image35.jpg",
      description: "Nós dois e minha família na Bahia: meu avô Jonas, Gustavo e Louise (sobrinhos), meu pai, meu tio da Suíça e minha prima"
    },
    {
      id: 36,
      title: "Deitados com Cacau no Meio",
      image: "/images/image36.jpg",
      description: "Nós dois deitados e Cacau enfiada no meio – cena clássica do nosso trio"
    },
    {
      id: 37,
      title: "Flores Para Ela",
      image: "/images/image37.jpg",
      description: "Ela recebendo as flores que enviei – gesto simples, significado enorme"
    },
    {
      id: 38,
      title: "Primeira Mensagem – Pokémon Go",
      image: "/images/image38.jpg",
      description: "Primeiras mensagens no Instagram – começando a conversa falando sobre Pokémon Go"
    },
    {
      id: 39,
      title: "11/10 – Depois do Primeiro Encontro",
      image: "/images/image39.jpg",
      description: "Mensagens do dia 11/10, depois do nosso primeiro encontro – borboletas e sorrisos"
    },
    {
      id: 40,
      title: "Melhores Amigos? Quero Para Todos!",
      image: "/images/image40.jpg",
      description: "Quando postei uma foto dela só nos melhores amigos e ela cobrou que fosse para todos verem"
    },
    {
      id: 41,
      title: "Choque de Realidade – Baiano em Curitiba",
      image: "/images/image41.jpg",
      description: "Ela descobrindo que eu não era de Curitiba e sim baiano – 14 de setembro"
    },
    {
      id: 42,
      title: "Seis Meses de Namoro",
      image: "/images/image42.jpg",
      description: "Nossa comemoração de seis meses de namoro – amor que só cresceu desde então"
    }
  ];

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
