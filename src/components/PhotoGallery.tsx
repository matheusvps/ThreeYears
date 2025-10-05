'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { siteConfig } from '@/config/site';
import { useSearch, Photo } from '@/hooks/useSearch';
import { SearchBar } from './SearchBar';
import Image from 'next/image';

interface PhotoGalleryProps {
  isMuted: boolean;
  onToggleMute: () => void;
  // Tempo global transcorrido no player (em segundos), somando faixas anteriores + tempo atual
  globalTimeSec: number;
  // Duração total do conjunto de músicas (em segundos)
  totalDurationSec: number;
  isPlaying: boolean;
}

export function PhotoGallery({ isMuted, onToggleMute, globalTimeSec, totalDurationSec, isPlaying }: PhotoGalleryProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

  const photos: Photo[] = useMemo(() => [
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
    }
    ,
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
  ], []);

  // Hook de pesquisa
  const {
    searchQuery,
    setSearchQuery,
    isSearching,
    startSearch,
    clearSearch,
    filteredPhotos,
    suggestions
  } = useSearch(photos);

  // Usar fotos filtradas ou todas as fotos
  const displayPhotos = isSearching ? filteredPhotos : photos;

  // Resetar índice quando as fotos filtradas mudarem
  useEffect(() => {
    if (displayPhotos.length > 0 && currentPhotoIndex >= displayPhotos.length) {
      setCurrentPhotoIndex(0);
    }
  }, [displayPhotos.length, currentPhotoIndex]);

  // Sincronizar fotos com o progresso global (todas as músicas)
  useEffect(() => {
    if (isPlaying && totalDurationSec > 0 && !isSearching) {
      const totalPhotos = displayPhotos.length;
      const clampedGlobal = Math.max(0, Math.min(globalTimeSec, totalDurationSec));
      const photoIndex = Math.floor((clampedGlobal / totalDurationSec) * totalPhotos);
      const validIndex = Math.min(photoIndex, totalPhotos - 1);
      if (validIndex !== currentPhotoIndex && !isOpen) {
        setCurrentPhotoIndex(validIndex);
      }
    }
  }, [globalTimeSec, totalDurationSec, isPlaying, displayPhotos.length, currentPhotoIndex, isOpen, isSearching]);

  const nextPhoto = useCallback(() => {
    if (displayPhotos.length > 0) {
      setCurrentPhotoIndex((prev) => (prev + 1) % displayPhotos.length);
    }
  }, [displayPhotos.length]);

  const prevPhoto = useCallback(() => {
    if (displayPhotos.length > 0) {
      setCurrentPhotoIndex((prev) => (prev - 1 + displayPhotos.length) % displayPhotos.length);
    }
  }, [displayPhotos.length]);

  const downloadPhoto = useCallback(() => {
    const currentPhoto = displayPhotos[currentPhotoIndex];
    if (currentPhoto?.image) {
      const link = document.createElement('a');
      link.href = currentPhoto.image;
      link.download = `${currentPhoto.title}.jpg`;
      link.click();
    }
  }, [displayPhotos, currentPhotoIndex]);

  return (
    <>
      {/* Card de abertura da galeria */}
      <div className="rounded-2xl p-6 mx-4 mb-4" style={{ backgroundColor: 'rgb(51 47 47)' }}>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-white text-xl font-bold">
            {isSearching ? `Resultados (${displayPhotos.length})` : `Conheça ${siteConfig.couple.name1} e ${siteConfig.couple.name2}`}
          </h2>
          {isPlaying && !isSearching && (
            <div className="flex items-center space-x-2 text-green-500">
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="w-2 h-2 bg-green-500 rounded-full"
              />
              <span className="text-sm font-medium">Sincronizado</span>
            </div>
          )}
        </div>

        {/* Barra de pesquisa */}
        <div className="mb-6">
          <SearchBar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            suggestions={suggestions}
            isSearching={isSearching}
            onStartSearch={startSearch}
            onClearSearch={clearSearch}
            onSuggestionClick={(suggestion) => {
              setSearchQuery(suggestion);
              startSearch();
            }}
          />
        </div>

        {/* Tabs rápidas de temas (sugestões clicáveis) */}
        <div className="mb-6">
          <div className="flex space-x-2 overflow-x-auto">
            {['Viagem', 'Família', 'Casa', 'Pets', 'Romance', 'Celebração'].map((tag) => (
              <motion.button
                key={tag}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setSearchQuery(tag.toLowerCase());
                  startSearch();
                }}
                className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap"
              >
                {tag}
              </motion.button>
            ))}
          </div>
        </div>
        
        {displayPhotos.length === 0 && isSearching ? (
          <div className="text-center py-8">
            <div className="text-gray-400 mb-4">
              <svg className="w-16 h-16 mx-auto mb-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
              </svg>
            </div>
            <h3 className="text-white text-lg font-semibold mb-2">Nenhuma foto encontrada</h3>
            <p className="text-gray-400 text-sm mb-4">
              Tente pesquisar por palavras diferentes como &quot;viagem&quot;, &quot;família&quot;, &quot;casa&quot;, etc.
            </p>
            <button
              onClick={clearSearch}
              className="text-green-500 hover:text-green-400 text-sm font-medium"
            >
              Limpar pesquisa
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-3 mb-6">
            {displayPhotos.slice(0, 3).map((photo, index) => (
            <motion.div
              key={photo.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setCurrentPhotoIndex(index);
                setIsOpen(true);
              }}
              className="relative rounded-lg overflow-hidden cursor-pointer aspect-[3/4]"
            >
              <Image
                src={photo.image}
                alt={photo.title}
                fill
                sizes="33vw"
                className="object-cover object-top"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3">
                <p className="text-white text-sm font-medium">{photo.title}</p>
              </div>
            </motion.div>
          ))}
          </div>
        )}

        {/* Indicador de progresso */}
        {isPlaying && !isSearching && (
          <div className="mb-4">
            <div className="flex justify-between text-sm text-gray-400 mb-2">
              <span>Foto {currentPhotoIndex + 1} de {displayPhotos.length}</span>
              <span className="truncate max-w-[200px]">{displayPhotos[currentPhotoIndex]?.title || ''}</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <motion.div
                className="bg-green-500 h-2 rounded-full"
                style={{
                  width: `${((currentPhotoIndex + 1) / displayPhotos.length) * 100}%`
                }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              />
            </div>
          </div>
        )}

        {displayPhotos.length > 0 && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(true)}
            className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-xl transition-colors duration-200"
          >
            {isSearching ? `Ver ${displayPhotos.length} Fotos Encontradas` : 'Ver Galeria Completa'}
          </motion.button>
        )}
      </div>

      {/* Modal da galeria */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-gray-900 rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header do modal */}
              <div className="flex items-center justify-between p-4 border-b border-gray-700">
                <h3 className="text-white text-xl font-bold">
                  {displayPhotos[currentPhotoIndex]?.title || 'Foto não encontrada'}
                </h3>
                <div className="flex items-center space-x-4">
                  {/* Botão de mute */}
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={onToggleMute}
                    className={`p-2 rounded-full ${
                      isMuted ? 'bg-red-500' : 'bg-gray-700'
                    } text-white`}
                  >
                    {isMuted ? (
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>
                      </svg>
                    ) : (
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
                      </svg>
                    )}
                  </motion.button>

                  {/* Botão de download */}
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={downloadPhoto}
                    className="p-2 bg-gray-700 rounded-full text-white hover:bg-gray-600 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/>
                    </svg>
                  </motion.button>

                  {/* Botão de fechar */}
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsOpen(false)}
                    className="p-2 bg-gray-700 rounded-full text-white hover:bg-gray-600 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                    </svg>
                  </motion.button>
                </div>
              </div>

              {/* Imagem principal (sem cortes: object-contain) */}
              <div className="relative h-96 bg-black flex items-center justify-center">
                {displayPhotos[currentPhotoIndex]?.image ? (
                  <Image
                    src={displayPhotos[currentPhotoIndex].image}
                    alt={displayPhotos[currentPhotoIndex].title || ''}
                    fill
                    sizes="(max-width: 1024px) 100vw, 100vw"
                    className="object-contain"
                  />
                ) : (
                  <div className="w-full h-96 bg-gray-800 flex items-center justify-center">
                    <div className="text-center text-gray-400">
                      <svg className="w-16 h-16 mx-auto mb-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/>
                      </svg>
                      <p className="text-lg font-medium">Foto não encontrada</p>
                      <p className="text-sm">Selecione uma foto da galeria</p>
                    </div>
                  </div>
                )}
                
                {/* Navegação */}
                {displayPhotos.length > 1 && (
                  <>
                    <button
                      onClick={prevPhoto}
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-all"
                    >
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
                      </svg>
                    </button>
                    
                    <button
                      onClick={nextPhoto}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-all"
                    >
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
                      </svg>
                    </button>
                  </>
                )}
              </div>

              {/* Grid de miniaturas */}
              <div className="p-4">
                <h4 className="text-white text-lg font-semibold mb-3">
                  {isSearching ? `Fotos encontradas (${displayPhotos.length})` : 'Todas as fotos'}
                </h4>
                <div className="max-h-80 overflow-y-auto">
                  <div className="grid grid-cols-4 md:grid-cols-6 gap-2">
                    {displayPhotos.map((photo, index) => (
                      <motion.button
                        key={photo.id}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setCurrentPhotoIndex(index)}
                        className={`relative rounded-lg overflow-hidden aspect-square ${
                          index === currentPhotoIndex ? 'ring-2 ring-green-500' : ''
                        }`}
                      >
                        <Image
                          src={photo.image}
                          alt={photo.title}
                          width={100}
                          height={100}
                          className="w-full h-full object-contain bg-gray-800"
                        />
                        {index === currentPhotoIndex && (
                          <div className="absolute inset-0 bg-green-500 bg-opacity-30 flex items-center justify-center">
                            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M8 5v14l11-7z"/>
                            </svg>
                          </div>
                        )}
                      </motion.button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Informações da foto */}
              <div className="p-4 border-t border-gray-700">
                <p className="text-gray-300 text-sm leading-relaxed">
                  {displayPhotos[currentPhotoIndex]?.description || 'Descrição não disponível'}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
