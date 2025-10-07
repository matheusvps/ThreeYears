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
    return photos.map(photo => {
      const titleLower = photo.title.toLowerCase();
      const descLower = photo.description.toLowerCase();
      const fullText = `${titleLower} ${descLower}`;
      
      // Se a foto já tem tags manuais, usar elas como base
      const manualTags = photo.tags || [];
      
      // Gerar tags automáticas adicionais
      const autoTags = [
        // Tags básicas do título e descrição
        ...titleLower.split(' ').filter(word => word.length > 2),
        ...descLower.split(' ').filter(word => word.length > 3),
        
        // Tags específicas baseadas no conteúdo
        ...(fullText.includes('são joão') ? ['festa', 'fogueira', 'junho', 'são joão'] : []),
        ...(fullText.includes('feijoada') ? ['comida', 'noivado', 'planejamento', 'feijoada'] : []),
        ...(fullText.includes('casa') || fullText.includes('louças') ? ['casa', 'preparação', 'noivado', 'compras'] : []),
        
        // Tags para pets - mais abrangente
        ...(fullText.includes('dante') || fullText.includes('cacau') || fullText.includes('cachorro') || fullText.includes('cadela') ? 
          ['pets', 'animais', 'cachorro', 'dante', 'cacau', 'família'] : []),
        
        ...(fullText.includes('formatura') ? ['formatura', 'família', 'celebração', 'conquista'] : []),
        ...(fullText.includes('salvador') || fullText.includes('bahia') ? ['viagem', 'bahia', 'salvador', 'família', 'praia'] : []),
        ...(fullText.includes('calabouço') ? ['restaurante', 'comida', 'reunião', 'calabouço'] : []),
        ...(fullText.includes('encontro') ? ['início', 'relacionamento', 'primeiros momentos', 'encontro'] : []),
        ...(fullText.includes('chalé') ? ['viagem', 'fogueira', 'natureza', 'chalé', 'final de semana'] : []),
        ...(fullText.includes('morro') ? ['noivado', 'natureza', 'especial', 'morro', 'pedido'] : []),
        ...(fullText.includes('marshmallow') ? ['fogueira', 'doce', 'tradição', 'marshmallow'] : []),
        ...(fullText.includes('beijo') ? ['romance', 'amor', 'intimidade', 'beijo'] : []),
        ...(fullText.includes('foz') || fullText.includes('iguaçu') ? ['viagem', 'cataratas', 'aventura', 'foz', 'iguaçu'] : []),
        ...(fullText.includes('unha') ? ['cuidado', 'carinho', 'detalhes', 'beleza'] : []),
        ...(fullText.includes('ano novo') ? ['celebração', 'festa', 'alegria', 'ano novo'] : []),
        ...(fullText.includes('praia') ? ['praia', 'sorvete', 'relaxamento', 'mar', 'verão'] : []),
        ...(fullText.includes('casamento') ? ['casamento', 'amor', 'celebração', 'festa'] : []),
        ...(fullText.includes('aniversário') ? ['aniversário', 'família', 'celebração', 'festa'] : []),
        ...(fullText.includes('academia') ? ['academia', 'exercício', 'saúde', 'treino'] : []),
        ...(fullText.includes('coxa') || fullText.includes('futebol') ? ['futebol', 'coxa', 'esporte', 'estádio'] : []),
        ...(fullText.includes('oktoberfest') ? ['oktoberfest', 'festa', 'cerveja', 'alemão'] : []),
        ...(fullText.includes('tamar') ? ['tamar', 'tartaruga', 'projeto', 'natureza'] : []),
        ...(fullText.includes('farol') ? ['farol', 'barra', 'salvador', 'mar'] : []),
        ...(fullText.includes('stella maris') ? ['stella maris', 'praia', 'salvador', 'mar'] : []),
        ...(fullText.includes('praia do forte') ? ['praia do forte', 'bahia', 'praia', 'família'] : []),
        ...(fullText.includes('fonte nova') ? ['fonte nova', 'bahia', 'futebol', 'estádio'] : []),
        ...(fullText.includes('marco das três fronteiras') ? ['marco das três fronteiras', 'foz', 'iguaçu', 'fronteira'] : []),
        ...(fullText.includes('henrique') || fullText.includes('paloma') ? ['amigos', 'henrique', 'paloma', 'infância'] : []),
        ...(fullText.includes('louise') ? ['louise', 'sobrinha', 'família', 'conhecendo'] : []),
        ...(fullText.includes('gustavo') ? ['gustavo', 'sobrinho', 'família'] : []),
        ...(fullText.includes('macaca') ? ['macaca', 'aniversário', 'festa', 'gargalhando'] : [])
      ];
      
      // Combinar tags manuais com automáticas, priorizando as manuais
      const allTags = [...manualTags, ...autoTags].filter((tag, index, arr) => arr.indexOf(tag) === index);
      
      return {
        ...photo,
        tags: allTags
      };
    });
  }, [photos]);

  // Filtrar fotos baseado na pesquisa
  const filteredPhotos = useMemo(() => {
    if (!searchQuery.trim()) return photosWithTags;

    const query = searchQuery.toLowerCase().trim();
    const queryWords = query.split(' ').filter(word => word.length > 0);
    
    return photosWithTags.filter(photo => {
      const titleLower = photo.title.toLowerCase();
      const descLower = photo.description.toLowerCase();
      const allTags = photo.tags || [];
      
      // Busca exata
      if (titleLower.includes(query) || descLower.includes(query)) {
        return true;
      }
      
      // Busca por tags exatas
      if (allTags.some(tag => tag === query)) {
        return true;
      }
      
      // Busca por palavras individuais (para queries com múltiplas palavras)
      if (queryWords.length > 1) {
        const allText = `${titleLower} ${descLower} ${allTags.join(' ')}`;
        return queryWords.every(word => allText.includes(word));
      }
      
      // Busca parcial em tags
      if (allTags.some(tag => tag.includes(query))) {
        return true;
      }
      
      // Busca por sinônimos e variações
      const synonyms: { [key: string]: string[] } = {
        'pets': ['cachorro', 'cadela', 'dante', 'cacau', 'animais'],
        'viagem': ['salvador', 'bahia', 'foz', 'iguaçu', 'chalé'],
        'família': ['pais', 'mãe', 'pai', 'avô', 'avó', 'sobrinho', 'sobrinha', 'tio', 'primo'],
        'casa': ['louças', 'preparação', 'compras'],
        'romance': ['beijo', 'amor', 'intimidade'],
        'celebração': ['festa', 'aniversário', 'formatura', 'casamento', 'ano novo'],
        'natureza': ['morro', 'fogueira', 'chalé', 'praia'],
        'comida': ['feijoada', 'restaurante', 'calabouço', 'sorvete']
      };
      
      // Verificar sinônimos
      for (const [mainTag, variations] of Object.entries(synonyms)) {
        if (query === mainTag && variations.some(variation => 
          titleLower.includes(variation) || descLower.includes(variation) || 
          allTags.some(tag => tag.includes(variation))
        )) {
          return true;
        }
        
        if (variations.includes(query) && allTags.includes(mainTag)) {
          return true;
        }
      }
      
      return false;
    });
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
