# Three Years Anniversary Website ❤️

A beautiful, romantic website to celebrate three years together and an engagement! Built with Next.js, featuring a Spotify music player, animated elements, and a responsive design.

![Anniversary Website](https://github.com/user-attachments/assets/026e92a4-d408-4f67-b6ff-b5ed01317f91)

## ✨ Features

- 🎵 **Spotify Music Player** - Embedded player for your special song
- 💕 **Beautiful Animations** - Floating hearts and smooth transitions using Framer Motion
- 📱 **Fully Responsive** - Looks perfect on desktop, tablet, and mobile
- 🎨 **Customizable Theme** - Easy to personalize colors, content, and styling
- 🚀 **Vercel Ready** - Optimized for deployment on Vercel
- ⚡ **Fast Performance** - Built with Next.js 15 and optimized for speed
- 🌟 **Modern Design** - Clean, elegant UI with gradient backgrounds

## 🎯 Perfect For

- Anniversary celebrations
- Engagement announcements
- Wedding websites
- Valentine's Day surprises
- Romantic gifts

## 🚀 Quick Start

### 1. Clone and Setup
```bash
git clone https://github.com/matheusvps/ThreeYears.git
cd ThreeYears
npm install
```

### 2. Customize Your Content
Edit `src/config/site.ts` to personalize:

```typescript
export const siteConfig = {
  couple: {
    name1: "Your Name",           // First person's name
    name2: "Partner's Name",      // Second person's name
    relationshipStart: "2021-09-29", // Your start date
    engagementDate: "2024-09-29",    // Your engagement date
  },
  spotify: {
    trackId: "4iV5W9uYEdYUVa79Axb7Rh", // Your song's Spotify ID
  },
  content: {
    title: "Your Custom Title",
    // ... customize all content
  }
};
```

### 3. Update Your Spotify Song
1. Go to [Spotify](https://open.spotify.com) and find your song
2. Click "Share" → "Copy Song Link"
3. Extract the ID from the URL: `https://open.spotify.com/track/TRACK_ID`
4. Update `trackId` in `src/config/site.ts`

### 4. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to see your site!

## 🌐 Deploy to Vercel

### One-Click Deploy
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/matheusvps/ThreeYears)

### Manual Deploy
1. Push your customized code to GitHub
2. Connect your GitHub repo to [Vercel](https://vercel.com)
3. Deploy automatically with zero configuration!

## 🎨 Customization Guide

### Colors and Theme
Edit the theme section in `src/config/site.ts`:
```typescript
theme: {
  primaryColor: "#f43f5e",   // Main accent color
  secondaryColor: "#ec4899", // Secondary accent
  backgroundColor: "#fdf2f8", // Background tint
}
```

### Content Sections
All text content can be customized in `src/config/site.ts`:
- Hero title and subtitle
- Love story paragraphs
- Memory cards
- All dates and names

### Adding Photos
1. Add your photos to the `public/` directory
2. Create an image gallery component in `src/components/`
3. Import and use in your page

### Custom Styling
- Global styles: `src/app/globals.css`
- Component styles: Individual component files
- Uses Tailwind CSS for utility-first styling

## 🛠️ Tech Stack

- **Framework**: Next.js 15 with App Router
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Music**: Spotify Embed
- **Language**: TypeScript
- **Deployment**: Vercel

## 📁 Project Structure

```
src/
├── app/                 # Next.js app directory
│   ├── layout.tsx      # Root layout
│   ├── page.tsx        # Home page
│   └── globals.css     # Global styles
├── components/         # React components
│   ├── Hero.tsx        # Hero section with animation
│   ├── SpotifyPlayer.tsx # Music player
│   ├── Story.tsx       # Love story section
│   ├── Memories.tsx    # Memory cards
│   └── Footer.tsx      # Footer with links
└── config/
    └── site.ts         # Site configuration
```

## 🎵 Spotify Integration

The website uses Spotify's embed player. To change your song:

1. Find your song on Spotify
2. Copy the share link
3. Extract the track ID (the part after `/track/`)
4. Update `trackId` in the configuration

Example:
- Full URL: `https://open.spotify.com/track/4iV5W9uYEdYUVa79Axb7Rh`
- Track ID: `4iV5W9uYEdYUVa79Axb7Rh`

## 🔧 Development

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Adding New Features
1. Create components in `src/components/`
2. Add configuration options to `src/config/site.ts`
3. Update types if needed
4. Test thoroughly before deploying

## 💡 Ideas for Enhancement

- Photo gallery with lightbox
- RSVP form for engagement party
- Timeline of relationship milestones
- Guest book for messages
- Social media integration
- Email sharing functionality

## 🤝 Contributing

Feel free to fork this project and make it your own! If you create something cool, consider sharing it back with the community.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 💝 Support

If this helped you create something beautiful for your special someone, consider giving it a ⭐ on GitHub!

---

Made with 💕 for celebrating love stories everywhere.
