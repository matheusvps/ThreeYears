export const siteConfig = {
  // Couple Information
  couple: {
    name1: "Matheus", // First person's name
    name2: "Sofia", // Second person's name
    relationshipStart: "2022-10-11", // Date when the relationship started (YYYY-MM-DD)
    engagementDate: "2024-10-11", // Date of engagement (YYYY-MM-DD)
  },

  // Spotify Integration
  spotify: {
    // Spotify track ID from the URL: https://open.spotify.com/track/TRACK_ID
    trackId: "0t0wQ6xZspmsXXekHfRoDH", // Música personalizada do casal
  },

  // Website Content
  content: {
    title: "Três Anos Lindos Juntos ❤️",
    subtitle: "Celebrando nossa jornada do namoro ao noivado",
    story: {
      title: "Nossa História de Amor",
      paragraphs: [
        "Três anos atrás, nossos caminhos se cruzaram e tudo mudou. O que começou como uma bela amizade floresceu na história de amor mais incrível.",
        "Através de cada estação, cada desafio e cada alegria, crescemos mais fortes juntos. Nosso amor tem sido a constante que faz tudo mais fazer sentido.",
        "Hoje celebramos não apenas três anos incríveis juntos, mas também o início do nosso para sempre. Sim, estamos noivos! 💍",
        "Aqui está para muitos mais anos de aventuras, risadas, amor e construindo nossos sonhos juntos. Obrigado por ser minha pessoa, minha melhor amiga e agora minha noiva."
      ]
    },
    memories: {
      title: "Nossas Memórias Favoritas",
      items: [
        {
          title: "Primeiro Encontro",
          description: "Aquela noite mágica quando ambos sabíamos que algo especial estava começando",
          emoji: "🌹",
          image: "/images/image.jpg"
        },
        {
          title: "Primeira Viagem Juntos",
          description: "Explorando novos lugares e criando memórias inesquecíveis",
          emoji: "✈️",
          image: "/images/image2.jpg"
        },
        {
          title: "Morando Juntos",
          description: "Transformando nossa casa em um lar cheio de amor e risadas",
          emoji: "🏠",
          image: "/images/image3.jpg"
        },
        {
          title: "O Pedido",
          description: "O momento em que nosso para sempre oficialmente começou",
          emoji: "💍",
          image: "/images/image4.jpg"
        },
        {
          title: "Aniversários Especiais",
          description: "Celebrando cada ano de amor e crescimento juntos",
          emoji: "🎂",
          image: "/images/image5.jpg"
        },
        {
          title: "Momentos do Dia a Dia",
          description: "As pequenas alegrias que fazem nossa vida especial",
          emoji: "☕",
          image: "/images/image6.jpg"
        },
        {
          title: "Família e Amigos",
          description: "Compartilhando nosso amor com as pessoas que mais amamos",
          emoji: "👨‍👩‍👧‍👦",
          image: "/images/image7.jpg"
        },
        {
          title: "Sonhos Realizados",
          description: "Cada conquista e sonho que realizamos juntos",
          emoji: "⭐",
          image: "/images/image8.jpg"
        }
      ]
    }
  },

  // Styling
  theme: {
    primaryColor: "#1db954", // Spotify green
    secondaryColor: "#1ed760", // Spotify light green
    backgroundColor: "#191414", // Spotify black
    textColor: "#ffffff", // White text
    secondaryTextColor: "#b3b3b3", // Spotify gray
  }
};

export type SiteConfig = typeof siteConfig;