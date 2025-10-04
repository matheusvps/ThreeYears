'use client';

import { useState } from 'react';
import { LandingScreen } from '@/components/LandingScreen';
import { SpotifyMusicPlayer } from '@/components/SpotifyMusicPlayer';

export default function Home() {
  const [currentScreen, setCurrentScreen] = useState<'landing' | 'player'>('landing');

  const handleViewGift = () => {
    setCurrentScreen('player');
  };

  const handleBack = () => {
    setCurrentScreen('landing');
  };

  if (currentScreen === 'landing') {
    return <LandingScreen onViewGift={handleViewGift} />;
  }

  return <SpotifyMusicPlayer onBack={handleBack} />;
}
