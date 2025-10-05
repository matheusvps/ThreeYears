'use client';

import { useState } from 'react';
import { LandingScreen } from '@/components/LandingScreen';
import { SpotifyMusicPlayer } from '@/components/SpotifyMusicPlayer';

export default function Home() {
  const [currentScreen, setCurrentScreen] = useState<'landing' | 'player'>('landing');
  const [initialActiveTab, setInitialActiveTab] = useState<'home' | 'search' | 'library'>('home');

  const handleViewGift = () => {
    console.log('[Page] handleViewGift called');
    setInitialActiveTab('home');
    setCurrentScreen('player');
  };

  const handleOpenSearch = () => {
    console.log('[Page] handleOpenSearch called');
    setInitialActiveTab('search');
    setCurrentScreen('player');
  };

  const handleOpenLibrary = () => {
    console.log('[Page] handleOpenLibrary called');
    setInitialActiveTab('library');
    setCurrentScreen('player');
  };

  const handleBack = () => {
    console.log('[Page] handleBack called');
    setCurrentScreen('landing');
  };

  if (currentScreen === 'landing') {
    return <LandingScreen onViewGift={handleViewGift} onOpenSearch={handleOpenSearch} onOpenLibrary={handleOpenLibrary} />;
  }

  return <SpotifyMusicPlayer onBack={handleBack} initialActiveTab={initialActiveTab} />;
}
