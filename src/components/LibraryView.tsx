'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { usePlaylists } from '@/hooks/usePlaylists';
import { PlaylistCard } from './PlaylistCard';
import { PlaylistView } from './PlaylistView';
import { Photo } from '@/hooks/useSearch';

interface LibraryViewProps {
  photos: Photo[];
}

export function LibraryView({ photos }: LibraryViewProps) {
  const [selectedPlaylist, setSelectedPlaylist] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const { playlists, getPlaylistById } = usePlaylists(photos);

  // Filtrar playlists baseado na pesquisa
  const filteredPlaylists = playlists.filter(playlist =>
    playlist.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    playlist.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    playlist.theme.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (selectedPlaylist) {
    const playlist = getPlaylistById(selectedPlaylist);
    if (playlist) {
      return (
        <PlaylistView
          playlist={playlist}
          onBack={() => setSelectedPlaylist(null)}
        />
      );
    }
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <div className="flex items-center justify-between p-4">
        <h1 className="text-white text-2xl font-bold">Sua Biblioteca</h1>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-full text-sm font-medium transition-colors"
        >
          Criar
        </motion.button>
      </div>

      {/* Search Bar */}
      <div className="px-4 mb-6">
        <div className="relative">
          <div className="flex items-center bg-gray-800 rounded-lg px-4 py-3">
            <svg className="w-5 h-5 text-gray-400 mr-3" fill="currentColor" viewBox="0 0 24 24">
              <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
            </svg>
            <input
              type="text"
              placeholder="Pesquisar playlists..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 bg-transparent text-white placeholder-gray-400 outline-none text-sm"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="text-gray-400 hover:text-white transition-colors ml-2"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                </svg>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="px-4 mb-6">
        <div className="flex space-x-2 overflow-x-auto">
          {['Todas', 'Viagens', 'Celebrações', 'Pets', 'Romance', 'Casa'].map((filter) => (
            <motion.button
              key={filter}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap"
            >
              {filter}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Playlists Grid */}
      <div className="px-4 pb-20">
        {filteredPlaylists.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <svg className="w-16 h-16 mx-auto mb-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-1 9H9V9h10v2zm-4 4H9v-2h6v2zm4-8H9V5h10v2z"/>
              </svg>
            </div>
            <h3 className="text-white text-lg font-semibold mb-2">
              {searchQuery ? 'Nenhuma playlist encontrada' : 'Nenhuma playlist criada'}
            </h3>
            <p className="text-gray-400 text-sm">
              {searchQuery ? 'Tente pesquisar por palavras diferentes' : 'Suas playlists aparecerão aqui'}
            </p>
          </div>
        ) : (
          <div className="max-h-96 overflow-y-auto">
            <div className="space-y-3">
              {filteredPlaylists.map((playlist) => (
                <PlaylistCard
                  key={playlist.id}
                  playlist={playlist}
                  onClick={() => setSelectedPlaylist(playlist.id)}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
