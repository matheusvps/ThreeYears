import { motion } from 'framer-motion';
import Image from 'next/image';
import { BLUR_DATA_URL } from '@/lib/images';

interface AlbumArtProps {
  src: string;
  alt: string;
  isPlaying: boolean;
}

export function AlbumArt({ src, alt, isPlaying }: AlbumArtProps) {
  return (
    <div className="flex items-center justify-center px-6 py-8">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-64 h-64 relative max-w-sm"
      >
        <Image
          src={src}
          alt={alt}
          width={100}
          height={100}
          className="w-full h-full object-cover rounded-lg shadow-2xl"
          placeholder="blur"
          blurDataURL={BLUR_DATA_URL}
        />
        {isPlaying && (
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-0 border-4 border-green-500 rounded-lg opacity-20"
          />
        )}
      </motion.div>
    </div>
  );
}


