'use client';

import { motion } from 'framer-motion';
import { Heart, Calendar, Crown } from 'lucide-react';
import { siteConfig } from '@/config/site';

export function Hero() {
  const relationshipYears = new Date().getFullYear() - new Date(siteConfig.couple.relationshipStart).getFullYear();
  
  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-pink-100 via-rose-50 to-purple-100" />
      
      {/* Floating hearts animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-pink-300"
            initial={{ 
              x: `${Math.random() * 100}%`,
              y: '100vh',
              opacity: 0 
            }}
            animate={{ 
              y: '-100px',
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 3 + 5,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "linear"
            }}
            style={{
              left: `${Math.random() * 100}%`,
            }}
          >
            <Heart size={Math.random() * 20 + 10} />
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-600 mb-6">
            {siteConfig.content.title}
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-700 mb-8 font-light">
            {siteConfig.content.subtitle}
          </p>

          <div className="flex flex-wrap justify-center gap-6 mb-12">
            <motion.div 
              className="flex items-center gap-2 bg-white/70 backdrop-blur-sm rounded-full px-6 py-3 shadow-lg"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Calendar className="text-rose-500" size={20} />
              <span className="font-semibold text-gray-800">
                {relationshipYears} Years Together
              </span>
            </motion.div>
            
            <motion.div 
              className="flex items-center gap-2 bg-white/70 backdrop-blur-sm rounded-full px-6 py-3 shadow-lg"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Crown className="text-purple-500" size={20} />
              <span className="font-semibold text-gray-800">
                Now Engaged!
              </span>
            </motion.div>
          </div>

          <motion.div
            className="text-4xl md:text-6xl"
            animate={{ 
              scale: [1, 1.2, 1],
              rotate: [0, 10, -10, 0] 
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity,
              repeatDelay: 3 
            }}
          >
            💕
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}