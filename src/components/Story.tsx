'use client';

import { motion } from 'framer-motion';
import { siteConfig } from '@/config/site';

export function Story() {
  return (
    <section className="py-20 px-4 bg-gradient-to-b from-white to-pink-50">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            {siteConfig.content.story.title}
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-pink-500 to-purple-500 mx-auto rounded-full" />
        </motion.div>

        <div className="space-y-8">
          {siteConfig.content.story.paragraphs.map((paragraph, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className={`flex ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}
            >
              <div className={`max-w-2xl p-8 rounded-2xl shadow-lg ${
                index % 2 === 0 
                  ? 'bg-white/80 backdrop-blur-sm' 
                  : 'bg-gradient-to-br from-pink-100 to-purple-100'
              }`}>
                <p className="text-lg leading-relaxed text-gray-700">
                  {paragraph}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center mt-16"
        >
          <div className="inline-block p-8 bg-gradient-to-br from-pink-200 to-purple-200 rounded-full">
            <div className="text-6xl animate-pulse">
              💖
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}