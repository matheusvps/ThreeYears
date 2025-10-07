'use client';

import { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { siteConfig } from '@/config/site';
import { useSearch } from '@/hooks/useSearch';
import { Photo } from '@/types/media';
import { photos as sharedPhotos } from '@/data/photos';
import { SearchBar } from './SearchBar';
import Image from 'next/image';
import { BLUR_DATA_URL } from '@/lib/images';

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
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const resultsScrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);

  const photos: Photo[] = useMemo(() => sharedPhotos, []);

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

  // Resetar página atual quando a pesquisa mudar
  useEffect(() => {
    setCurrentPage(0);
  }, [isSearching, searchQuery]);

  // Monitorar scroll dos resultados para atualizar página atual
  useEffect(() => {
    const scrollContainer = resultsScrollRef.current;
    if (!scrollContainer) return;

    const handleScroll = () => {
      const scrollLeft = scrollContainer.scrollLeft;
      const containerWidth = scrollContainer.clientWidth;
      const photosPerPage = 3;
      const photoWidth = (containerWidth - 24) / 3; // 24px é o gap total
      const currentPageIndex = Math.round(scrollLeft / (photoWidth + 8)); // 8px é o gap entre fotos
      
      setCurrentPage(Math.min(currentPageIndex, Math.ceil(displayPhotos.length / photosPerPage) - 1));
    };

    scrollContainer.addEventListener('scroll', handleScroll);
    return () => scrollContainer.removeEventListener('scroll', handleScroll);
  }, [displayPhotos.length]);

  // Sincronizar fotos com o progresso global (todas as músicas)
  useEffect(() => {
    if (isPlaying && totalDurationSec > 0 && !isSearching) {
      const totalPhotos = displayPhotos.length;
      
      // Trocar foto a cada 30 segundos (55 fotos em ~27 minutos)
      const timeBasedIndex = Math.floor(globalTimeSec / 30) % totalPhotos;
      
      // Usar timeBasedIndex para troca baseada em tempo
      if (timeBasedIndex !== currentPhotoIndex && !isOpen) {
        setCurrentPhotoIndex(timeBasedIndex);
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

  // Funções para drag horizontal
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (!scrollContainerRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
    setScrollLeft(scrollContainerRef.current.scrollLeft);
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging || !scrollContainerRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX) * 2; // Velocidade do scroll
    scrollContainerRef.current.scrollLeft = scrollLeft - walk;
  }, [isDragging, startX, scrollLeft]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsDragging(false);
  }, []);

  // Touch events para dispositivos móveis
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    if (!scrollContainerRef.current) return;
    setIsDragging(true);
    setStartX(e.touches[0].pageX - scrollContainerRef.current.offsetLeft);
    setScrollLeft(scrollContainerRef.current.scrollLeft);
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!isDragging || !scrollContainerRef.current) return;
    const x = e.touches[0].pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    scrollContainerRef.current.scrollLeft = scrollLeft - walk;
  }, [isDragging, startX, scrollLeft]);

  const handleTouchEnd = useCallback(() => {
    setIsDragging(false);
  }, []);

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
          <div 
            ref={scrollContainerRef}
            className={`flex space-x-2 overflow-x-auto scrollbar-hide ${
              isDragging ? 'cursor-grabbing' : 'cursor-grab'
            }`}
            style={{ 
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              WebkitOverflowScrolling: 'touch'
            }}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {['Viagem', 'Família', 'Casa', 'Pets', 'Romance', 'Celebração', 'Bahia', 'Salvador', 'Foz do Iguaçu', 'Chalé', 'Fogueira', 'Academia', 'Futebol', 'Praia', 'Restaurante'].map((tag) => (
              <motion.button
                key={tag}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={(e) => {
                  // Previne o clique se estivermos arrastando
                  if (isDragging) {
                    e.preventDefault();
                    return;
                  }
                  setSearchQuery(tag.toLowerCase());
                  startSearch();
                }}
                className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap select-none"
                style={{ userSelect: 'none' }}
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
          <div className="mb-6">
            {/* Container com scroll horizontal para todas as fotos */}
            <div 
              ref={resultsScrollRef}
              className={`flex gap-3 overflow-x-auto scrollbar-hide pb-2 photo-results-scroll scroll-indicator ${
                displayPhotos.length > 3 ? 'has-more' : ''
              }`}
              style={{ 
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
                WebkitOverflowScrolling: 'touch'
              }}
            >
              {displayPhotos.map((photo, index) => (
                <motion.div
                  key={photo.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setCurrentPhotoIndex(index);
                    setIsOpen(true);
                  }}
                  className="relative rounded-lg overflow-hidden cursor-pointer aspect-[3/4] flex-shrink-0"
                  style={{ width: 'calc(33.333% - 8px)', minWidth: '120px' }}
                >
                  <Image
                    src={photo.image}
                    alt={photo.title}
                    fill
                    sizes="(max-width: 768px) 33vw, 200px"
                    className="object-cover object-top"
                    quality={90}
                    placeholder="blur"
                    blurDataURL={BLUR_DATA_URL}
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3">
                    <p className="text-white text-sm font-medium">{photo.title}</p>
                  </div>
                </motion.div>
              ))}
            </div>
            
            {/* Indicador de scroll quando há mais de 3 fotos */}
            {displayPhotos.length > 3 && (
              <div className="flex flex-col items-center mt-3 space-y-2">
                {/* Texto de instrução */}
                <div className="flex items-center space-x-1">
                  <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/>
                  </svg>
                  <span className="text-gray-400 text-sm">Deslize para ver mais</span>
                  <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M15.41 7.41L10.83 12l4.58 4.59L14 18l-6-6 6-6 1.41 1.41z"/>
                  </svg>
                </div>
                
                {/* Indicadores de página */}
                <div className="flex items-center space-x-2">
                  {Array.from({ length: Math.min(3, Math.ceil(displayPhotos.length / 3)) }).map((_, i) => (
                    <div
                      key={i}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        i === currentPage ? 'bg-green-500 scale-125' : 'bg-gray-500'
                      }`}
                    />
                  ))}
                  {displayPhotos.length > 9 && (
                    <span className="text-gray-400 text-xs ml-1">+{displayPhotos.length - 9}</span>
                  )}
                </div>
              </div>
            )}
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
            role="dialog"
            aria-modal="true"
            aria-label="Galeria de fotos"
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
                    quality={95}
                    priority
                    placeholder="blur"
                    blurDataURL={BLUR_DATA_URL}
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
                          width={200}
                          height={200}
                          className="w-full h-full object-contain bg-gray-800"
                          quality={85}
                          sizes="100px"
                          placeholder="blur"
                          blurDataURL={BLUR_DATA_URL}
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
