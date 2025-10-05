import { useMemo } from 'react';
import { Photo } from './useSearch';

export interface Playlist {
  id: string;
  title: string;
  description: string;
  coverImage: string;
  photos: Photo[];
  theme: string;
  color: string;
}

export function usePlaylists(photos: Photo[]) {
  const playlists = useMemo((): Playlist[] => [
    {
      id: 'viagens',
      title: 'Nossas Viagens',
      description: 'Aventuras e descobertas pelo mundo',
      coverImage: '/images/image21.jpg',
      theme: 'viagem',
      color: 'from-blue-500 to-purple-600',
      photos: photos.filter(photo => 
        photo.title.toLowerCase().includes('salvador') ||
        photo.title.toLowerCase().includes('foz') ||
        photo.title.toLowerCase().includes('marco') ||
        photo.title.toLowerCase().includes('cataratas')
      )
    },
    {
      id: 'chalés',
      title: 'Chalés e Fogueiras',
      description: 'Momentos íntimos na natureza',
      coverImage: '/images/image13.jpg',
      theme: 'natureza',
      color: 'from-orange-500 to-red-600',
      photos: photos.filter(photo => 
        photo.title.toLowerCase().includes('chalé') ||
        photo.title.toLowerCase().includes('fogueira') ||
        photo.title.toLowerCase().includes('marshmallow') ||
        photo.title.toLowerCase().includes('morro')
      )
    },
    {
      id: 'pets',
      title: 'Com os Nossos Pets',
      description: 'Dante e Cacau fazendo parte da família',
      coverImage: '/images/image5.jpg',
      theme: 'pets',
      color: 'from-yellow-500 to-orange-500',
      photos: photos.filter(photo => 
        photo.title.toLowerCase().includes('dante') ||
        photo.title.toLowerCase().includes('cacau')
      )
    },
    {
      id: 'celebrações',
      title: 'Celebrações Especiais',
      description: 'Formatura, noivado e momentos marcantes',
      coverImage: '/images/image7.jpg',
      theme: 'celebração',
      color: 'from-pink-500 to-purple-600',
      photos: photos.filter(photo => 
        photo.title.toLowerCase().includes('formatura') ||
        photo.title.toLowerCase().includes('noivado') ||
        photo.title.toLowerCase().includes('casamento') ||
        photo.title.toLowerCase().includes('aniversário') ||
        photo.title.toLowerCase().includes('ano novo')
      )
    },
    {
      id: 'primeiros-momentos',
      title: 'Primeiros Momentos',
      description: 'O início da nossa história de amor',
      coverImage: '/images/image11.jpg',
      theme: 'início',
      color: 'from-green-500 to-teal-600',
      photos: photos.filter(photo => 
        photo.title.toLowerCase().includes('encontro') ||
        photo.title.toLowerCase().includes('primeiros') ||
        photo.title.toLowerCase().includes('olhares')
      )
    },
    {
      id: 'preparação-casa',
      title: 'Preparando Nosso Lar',
      description: 'Montando nosso cantinho com carinho',
      coverImage: '/images/image3.jpg',
      theme: 'casa',
      color: 'from-indigo-500 to-blue-600',
      photos: photos.filter(photo => 
        photo.title.toLowerCase().includes('casa') ||
        photo.title.toLowerCase().includes('louças') ||
        photo.title.toLowerCase().includes('preparando')
      )
    },
    {
      id: 'momentos-cotidianos',
      title: 'Momentos do Dia a Dia',
      description: 'A simplicidade de estar juntos',
      coverImage: '/images/image4.jpg',
      theme: 'cotidiano',
      color: 'from-gray-500 to-gray-700',
      photos: photos.filter(photo => 
        photo.title.toLowerCase().includes('momentos') ||
        photo.title.toLowerCase().includes('paz') ||
        photo.title.toLowerCase().includes('café') ||
        photo.title.toLowerCase().includes('comida') ||
        photo.title.toLowerCase().includes('sorvete') ||
        photo.title.toLowerCase().includes('juntos')
      )
    },
    {
      id: 'cuidados',
      title: 'Pequenos Cuidados',
      description: 'Gestos de carinho e atenção',
      coverImage: '/images/image23.jpg',
      theme: 'cuidado',
      color: 'from-rose-500 to-pink-600',
      photos: photos.filter(photo => 
        photo.title.toLowerCase().includes('unha') ||
        photo.title.toLowerCase().includes('cuidado')
      )
    },
    {
      id: 'romance',
      title: 'Momentos Românticos',
      description: 'Beijos, abraços e declarações de amor',
      coverImage: '/images/image20.jpg',
      theme: 'romance',
      color: 'from-red-500 to-pink-600',
      photos: photos.filter(photo => 
        photo.title.toLowerCase().includes('beijo') ||
        photo.title.toLowerCase().includes('abraçados') ||
        photo.title.toLowerCase().includes('romance')
      )
    }
  ], [photos]);

  const getPlaylistById = (id: string) => {
    return playlists.find(playlist => playlist.id === id);
  };

  const getPlaylistsByTheme = (theme: string) => {
    return playlists.filter(playlist => playlist.theme === theme);
  };

  return {
    playlists,
    getPlaylistById,
    getPlaylistsByTheme
  };
}
