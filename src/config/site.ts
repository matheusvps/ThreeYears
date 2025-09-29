export const siteConfig = {
  // Couple Information
  couple: {
    name1: "João", // First person's name
    name2: "Maria", // Second person's name
    relationshipStart: "2021-09-29", // Date when the relationship started (YYYY-MM-DD)
    engagementDate: "2024-09-29", // Date of engagement (YYYY-MM-DD)
  },

  // Spotify Integration
  spotify: {
    // Spotify track ID from the URL: https://open.spotify.com/track/TRACK_ID
    trackId: "4iV5W9uYEdYUVa79Axb7Rh", // Example: "Perfect" by Ed Sheeran
    // You can find the track ID by copying the Spotify song link and extracting the ID
  },

  // Website Content
  content: {
    title: "Three Beautiful Years Together ❤️",
    subtitle: "Celebrating our journey from dating to engagement",
    story: {
      title: "Our Love Story",
      paragraphs: [
        "Three years ago, our paths crossed and everything changed. What started as a beautiful friendship blossomed into the most incredible love story.",
        "Through every season, every challenge, and every joy, we've grown stronger together. Our love has been the constant that makes everything else make sense.",
        "Today, we celebrate not just three amazing years together, but also the beginning of our forever. Yes, we're engaged! 💍",
        "Here's to many more years of adventures, laughter, love, and building our dreams together. Thank you for being my person, my best friend, and now my fiancé(e)."
      ]
    },
    memories: {
      title: "Our Favorite Memories",
      items: [
        {
          title: "First Date",
          description: "That magical evening when we both knew something special was beginning",
          emoji: "🌹"
        },
        {
          title: "First Trip Together",
          description: "Exploring new places and creating unforgettable memories",
          emoji: "✈️"
        },
        {
          title: "Moving In Together",
          description: "Making our house a home filled with love and laughter",
          emoji: "🏠"
        },
        {
          title: "The Proposal",
          description: "The moment our forever officially began",
          emoji: "💍"
        }
      ]
    }
  },

  // Styling
  theme: {
    primaryColor: "#f43f5e", // Rose color for love theme
    secondaryColor: "#ec4899", // Pink accent
    backgroundColor: "#fdf2f8", // Light pink background
  }
};

export type SiteConfig = typeof siteConfig;