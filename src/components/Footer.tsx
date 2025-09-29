'use client';

import { motion } from 'framer-motion';
import { Heart, Github, Music } from 'lucide-react';
import { siteConfig } from '@/config/site';

export function Footer() {
  return (
    <footer className="bg-gradient-to-r from-pink-600 to-purple-600 text-white py-12">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex justify-center items-center gap-2 mb-6">
            <span className="text-2xl font-light">Made with</span>
            <motion.div
              animate={{ 
                scale: [1, 1.3, 1],
              }}
              transition={{ 
                duration: 1, 
                repeat: Infinity,
                repeatDelay: 2 
              }}
            >
              <Heart className="text-pink-200" fill="currentColor" size={28} />
            </motion.div>
            <span className="text-2xl font-light">for our anniversary</span>
          </div>

          <div className="text-lg mb-8">
            <p className="mb-2">
              <strong>{siteConfig.couple.name1}</strong> & <strong>{siteConfig.couple.name2}</strong>
            </p>
            <p className="text-pink-200">
              Together since {new Date(siteConfig.couple.relationshipStart).toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
            <p className="text-pink-200">
              Engaged on {new Date(siteConfig.couple.engagementDate).toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
          </div>

          <div className="flex justify-center gap-6 mb-8">
            <motion.a
              href="https://github.com/matheusvps/ThreeYears"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-full transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Github size={20} />
              <span>View Source</span>
            </motion.a>
            
            <motion.a
              href={`https://open.spotify.com/track/${siteConfig.spotify.trackId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-full transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Music size={20} />
              <span>Listen on Spotify</span>
            </motion.a>
          </div>

          <div className="text-sm text-pink-200">
            <p>Built with Next.js, Tailwind CSS, and lots of love 💕</p>
            <p className="mt-2">© {new Date().getFullYear()} - A celebration of our love story</p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}