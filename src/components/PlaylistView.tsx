'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Playlist } from '@/hooks/usePlaylists';

interface PlaylistViewProps {
  playlist: Playlist;
  onBack: () => void;
}

export function PlaylistView({ playlist, onBack }: PlaylistViewProps) {
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(0);

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <div className="flex items-center justify-between p-4">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onBack}
          className="text-white hover:text-green-500 transition-colors"
        >
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
          </svg>
        </motion.button>
        
        <h1 className="text-white font-semibold">{playlist.title}</h1>
        
        <div className="w-6"></div>
      </div>

      {/* Playlist Header */}
      <div className={`px-6 py-8 bg-gradient-to-br ${playlist.color} relative`}>
        <div className="flex items-end space-x-6">
          {/* Cover */}
          <div className="w-48 h-48 rounded-lg shadow-2xl overflow-hidden bg-gray-900 flex items-center justify-center">
            <img
              src={playlist.coverImage}
              alt={playlist.title}
              className="w-full h-full object-contain"
            />
          </div>

          {/* Info */}
          <div className="flex-1 text-white">
            <p className="text-sm font-medium mb-2">Playlist</p>
            <h2 className="text-4xl font-bold mb-4">{playlist.title}</h2>
            <p className="text-lg opacity-90 mb-2">{playlist.description}</p>
            <p className="text-sm opacity-75">{playlist.photos.length} fotos</p>
          </div>
        </div>
      </div>

      {/* Photos Grid */}
      <div className="px-6 py-6">
        <div className="max-h-96 overflow-y-auto">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {playlist.photos.map((photo, index) => (
              <motion.div
                key={photo.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedPhotoIndex(index)}
                className="relative rounded-lg overflow-hidden cursor-pointer aspect-square"
              >
                <img
                  src={photo.image}
                  alt={photo.title}
                  className="w-full h-full object-contain bg-gray-900"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-30 transition-all duration-200 flex items-center justify-center">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileHover={{ opacity: 1, scale: 1 }}
                    className="w-12 h-12 bg-white bg-opacity-90 rounded-full flex items-center justify-center"
                  >
                    <svg className="w-6 h-6 text-black" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Photo Modal */}
      <AnimatePresence>
        {selectedPhotoIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedPhotoIndex(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-gray-900 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-gray-700">
                <h3 className="text-white text-xl font-bold">
                  {playlist.photos[(selectedPhotoIndex ?? 0)]?.title}
                </h3>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setSelectedPhotoIndex(null)}
                  className="p-2 bg-gray-700 rounded-full text-white hover:bg-gray-600 transition-colors"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                  </svg>
                </motion.button>
              </div>

              {/* Image */}
              <div className="relative">
                <img
                  src={playlist.photos[(selectedPhotoIndex ?? 0)]?.image || ''}
                  alt={playlist.photos[(selectedPhotoIndex ?? 0)]?.title || ''}
                  className="w-full h-96 object-contain bg-black"
                />
                
                {/* Navigation */}
                {playlist.photos.length > 1 && (
                  <>
                    <button
                      onClick={() => setSelectedPhotoIndex((prev) => {
                        const current = (prev ?? 0);
                        return current === 0 ? playlist.photos.length - 1 : current - 1;
                      })}
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-all"
                    >
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
                      </svg>
                    </button>
                    
                    <button
                      onClick={() => setSelectedPhotoIndex((prev) => {
                        const current = (prev ?? 0);
                        return current === playlist.photos.length - 1 ? 0 : current + 1;
                      })}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-all"
                    >
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
                      </svg>
                    </button>
                  </>
                )}
              </div>

              {/* Description */}
              <div className="p-4 border-t border-gray-700">
                <p className="text-gray-300 text-sm leading-relaxed">
                  {playlist.photos[(selectedPhotoIndex ?? 0)]?.description || 'Descrição não disponível'}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
