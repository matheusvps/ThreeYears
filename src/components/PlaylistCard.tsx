'use client';

import { motion } from 'framer-motion';
import { Playlist } from '@/hooks/usePlaylists';
import Image from 'next/image';
interface PlaylistCardProps {
  playlist: Playlist;
  onClick: () => void;
}

export function PlaylistCard({ playlist, onClick }: PlaylistCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="bg-gray-800 rounded-lg p-4 cursor-pointer hover:bg-gray-700 transition-colors"
    >
      <div className="flex items-center space-x-4">
        {/* Cover Image */}
        <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
          <Image
            src={playlist.coverImage}
            alt={playlist.title}
            className="w-full h-full object-cover"
          />
          <div className={`absolute inset-0 bg-gradient-to-br ${playlist.color} opacity-20`} />
        </div>

        {/* Playlist Info */}
        <div className="flex-1 min-w-0">
          <h3 className="text-white font-semibold text-lg truncate">
            {playlist.title}
          </h3>
          <p className="text-gray-400 text-sm truncate">
            {playlist.description}
          </p>
          <p className="text-gray-500 text-xs mt-1">
            {playlist.photos.length} fotos
          </p>
        </div>

        {/* Play Button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center hover:bg-green-600 transition-colors"
        >
          <svg className="w-5 h-5 text-black ml-0.5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z"/>
          </svg>
        </motion.button>
      </div>
    </motion.div>
  );
}
