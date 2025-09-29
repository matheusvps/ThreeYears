'use client';

import { siteConfig } from '@/config/site';

export function SpotifyPlayer() {
  return (
    <div className="w-full max-w-lg mx-auto">
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
        <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">
          Our Song ❤️
        </h3>
        <div className="relative">
          <iframe
            src={`https://open.spotify.com/embed/track/${siteConfig.spotify.trackId}?utm_source=generator&theme=0`}
            width="100%"
            height="152"
            frameBorder="0"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
            className="rounded-xl"
          />
        </div>
        <p className="text-sm text-gray-600 mt-3 text-center">
          The song that perfectly captures our love story
        </p>
      </div>
    </div>
  );
}