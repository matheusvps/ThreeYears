'use client';

import { motion } from 'framer-motion';
import { siteConfig } from '@/config/site';

export function Memories() {
  return (
    <section className="py-20 px-4 bg-gradient-to-b from-pink-50 to-purple-50">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            {siteConfig.content.memories.title}
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto rounded-full" />
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {siteConfig.content.memories.items.map((memory, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 20px 40px rgba(0,0,0,0.1)"
              }}
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="text-center">
                <div className="text-4xl mb-4 animate-bounce">
                  {memory.emoji}
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">
                  {memory.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {memory.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-center mt-16"
        >
          <p className="text-2xl text-gray-700 font-light italic">
            &ldquo;Every moment with you becomes a treasured memory&rdquo;
          </p>
        </motion.div>
      </div>
    </section>
  );
}