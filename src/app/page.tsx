'use client';

import { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { LandingScreen } from '@/components/LandingScreen';

export default function Home() {
  const router = useRouter();

  const goToPlayer = useCallback((tab: 'home' | 'search' | 'library') => {
    const params = new URLSearchParams({ tab, autoplay: '1' });
    router.push(`/player?${params.toString()}`);
  }, [router]);

  return (
    <LandingScreen
      onViewGift={() => goToPlayer('home')}
      onOpenSearch={() => goToPlayer('search')}
      onOpenLibrary={() => goToPlayer('library')}
    />
  );
}
