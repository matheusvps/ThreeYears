import { useState, useMemo } from 'react';

export interface Photo {
  id: number;
  title: string;
  image: string;
  description: string;
  tags?: string[];
}

export function useSearch(photos: Photo[]) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  // Gerar tags baseadas no título e descrição
  const photosWithTags = useMemo(() => {
    return photos.map(photo => ({
      ...photo,
      tags: [
        ...photo.title.toLowerCase().split(' '),
        ...photo.description.toLowerCase().split(' ').filter(word => word.length > 3),
        // Adicionar tags específicas baseadas no conteúdo
        ...(photo.title.toLowerCase().includes('são joão') ? ['festa', 'fogueira', 'junho'] : []),
        ...(photo.title.toLowerCase().includes('feijoada') ? ['comida', 'noivado', 'planejamento'] : []),
        ...(photo.title.toLowerCase().includes('casa') ? ['casa', 'preparação', 'noivado'] : []),
        ...(photo.title.toLowerCase().includes('dante') || photo.title.toLowerCase().includes('cacau') ? ['cachorro', 'pets', 'animais'] : []),
        ...(photo.title.toLowerCase().includes('formatura') ? ['formatura', 'família', 'celebração'] : []),
        ...(photo.title.toLowerCase().includes('salvador') ? ['viagem', 'bahia', 'família'] : []),
        ...(photo.title.toLowerCase().includes('calabouço') ? ['restaurante', 'comida', 'reunião'] : []),
        ...(photo.title.toLowerCase().includes('louças') ? ['casa', 'compras', 'preparação'] : []),
        ...(photo.title.toLowerCase().includes('encontro') ? ['início', 'relacionamento', 'primeiros momentos'] : []),
        ...(photo.title.toLowerCase().includes('chalé') ? ['viagem', 'fogueira', 'natureza'] : []),
        ...(photo.title.toLowerCase().includes('morro') ? ['noivado', 'natureza', 'especial'] : []),
        ...(photo.title.toLowerCase().includes('marshmallow') ? ['fogueira', 'doce', 'tradição'] : []),
        ...(photo.title.toLowerCase().includes('beijo') ? ['romance', 'amor', 'intimidade'] : []),
        ...(photo.title.toLowerCase().includes('foz') ? ['viagem', 'cataratas', 'aventura'] : []),
        ...(photo.title.toLowerCase().includes('unha') ? ['cuidado', 'carinho', 'detalhes'] : []),
        ...(photo.title.toLowerCase().includes('ano novo') ? ['celebração', 'festa', 'alegria'] : []),
        ...(photo.title.toLowerCase().includes('praia') ? ['praia', 'sorvete', 'relaxamento'] : []),
        ...(photo.title.toLowerCase().includes('casamento') ? ['casamento', 'amor', 'celebração'] : []),
        ...(photo.title.toLowerCase().includes('aniversário') ? ['aniversário', 'família', 'celebração'] : [])
      ].filter((tag, index, arr) => arr.indexOf(tag) === index) // Remove duplicatas
    }));
  }, [photos]);

  // Filtrar fotos baseado na pesquisa
  const filteredPhotos = useMemo(() => {
    if (!searchQuery.trim()) return photosWithTags;

    const query = searchQuery.toLowerCase().trim();
    
    return photosWithTags.filter(photo => 
      photo.title.toLowerCase().includes(query) ||
      photo.description.toLowerCase().includes(query) ||
      photo.tags?.some(tag => tag.includes(query))
    );
  }, [photosWithTags, searchQuery]);

  // Gerar sugestões de pesquisa
  const suggestions = useMemo(() => {
    if (!searchQuery.trim()) return [];

    const query = searchQuery.toLowerCase().trim();
    const allTags = photosWithTags.flatMap(photo => photo.tags || []);
    const uniqueTags = [...new Set(allTags)];
    
    return uniqueTags
      .filter(tag => tag.includes(query))
      .sort()
      .slice(0, 8); // Limitar a 8 sugestões
  }, [photosWithTags, searchQuery]);

  const startSearch = () => {
    setIsSearching(true);
  };

  const clearSearch = () => {
    setSearchQuery('');
    setIsSearching(false);
  };

  return {
    searchQuery,
    setSearchQuery,
    isSearching,
    startSearch,
    clearSearch,
    filteredPhotos,
    suggestions,
    hasResults: filteredPhotos.length > 0
  };
}
