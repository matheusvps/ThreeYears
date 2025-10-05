'use client';

import { useMemo, use } from 'react';
import { SpotifyMusicPlayer } from '@/components/SpotifyMusicPlayer';

interface PlayerPageProps {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}

export default function PlayerPage({ searchParams }: PlayerPageProps) {
  const resolvedSearchParams = use(searchParams || Promise.resolve({}));
  
  const initialActiveTab = useMemo(() => {
    const tab = (resolvedSearchParams?.tab as string) || 'home';
    if (tab === 'search' || tab === 'library') return tab;
    return 'home';
  }, [resolvedSearchParams]);

  const autoplay = useMemo(() => {
    const ap = (resolvedSearchParams?.autoplay as string) || '0';
    return ap === '1' || ap === 'true';
  }, [resolvedSearchParams]);

  return (
    <SpotifyMusicPlayer onBack={() => history.back()} initialActiveTab={initialActiveTab} autoplay={autoplay} />
  );
}


