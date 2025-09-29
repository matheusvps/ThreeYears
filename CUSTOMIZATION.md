# 🎨 Customization Guide

This guide will help you personalize your anniversary website to perfectly tell your love story.

## 📝 Basic Configuration

All main content is configured in `src/config/site.ts`. Here's how to customize each section:

### 👫 Couple Information
```typescript
couple: {
  name1: "João",                    // Replace with first person's name
  name2: "Maria",                   // Replace with second person's name
  relationshipStart: "2021-09-29",  // Your relationship start date (YYYY-MM-DD)
  engagementDate: "2024-09-29",     // Your engagement date (YYYY-MM-DD)
},
```

### 🎵 Spotify Integration
```typescript
spotify: {
  trackId: "4iV5W9uYEdYUVa79Axb7Rh", // Your special song's Spotify ID
},
```

**How to find your Spotify Track ID:**
1. Open Spotify and find your song
2. Right-click the song → "Share" → "Copy Song Link"
3. The URL looks like: `https://open.spotify.com/track/4iV5W9uYEdYUVa79Axb7Rh`
4. Copy the ID part: `4iV5W9uYEdYUVa79Axb7Rh`

### 📖 Content Customization
```typescript
content: {
  title: "Three Beautiful Years Together ❤️",    // Main hero title
  subtitle: "Celebrating our journey from dating to engagement", // Hero subtitle
  
  story: {
    title: "Our Love Story",           // Story section title
    paragraphs: [
      "Your first paragraph here...",  // Replace with your story
      "Your second paragraph here...", // Add as many as you want
      "Your third paragraph here...",
      "Your fourth paragraph here..."
    ]
  },
  
  memories: {
    title: "Our Favorite Memories",   // Memories section title
    items: [
      {
        title: "First Date",           // Memory title
        description: "Your description...", // Memory description
        emoji: "🌹"                   // Fun emoji for the memory
      },
      // Add more memories...
    ]
  }
}
```

### 🎨 Theme Colors
```typescript
theme: {
  primaryColor: "#f43f5e",    // Main pink/rose color
  secondaryColor: "#ec4899",  // Secondary pink color
  backgroundColor: "#fdf2f8", // Light background tint
}
```

**Color Ideas:**
- **Classic Romance**: `#f43f5e`, `#ec4899`, `#fdf2f8`
- **Purple Love**: `#8b5cf6`, `#a855f7`, `#f3e8ff`
- **Blue Elegance**: `#3b82f6`, `#6366f1`, `#eff6ff`
- **Sunset Romance**: `#f97316`, `#ea580c`, `#fff7ed`

## 🖼️ Adding Your Photos

### Option 1: Replace Placeholder Content
The website uses animated elements instead of photos by default. To add photos:

1. **Add photos to the public folder:**
   ```
   public/
   ├── photo1.jpg
   ├── photo2.jpg
   └── photo3.jpg
   ```

2. **Create a photo gallery component:**
   ```typescript
   // src/components/PhotoGallery.tsx
   import Image from 'next/image';
   
   export function PhotoGallery() {
     const photos = [
       { src: '/photo1.jpg', alt: 'Our first date' },
       { src: '/photo2.jpg', alt: 'First trip together' },
       { src: '/photo3.jpg', alt: 'The proposal' },
     ];
   
     return (
       <div className="grid md:grid-cols-3 gap-4">
         {photos.map((photo, index) => (
           <Image
             key={index}
             src={photo.src}
             alt={photo.alt}
             width={400}
             height={300}
             className="rounded-lg shadow-lg"
           />
         ))}
       </div>
     );
   }
   ```

3. **Add to your main page:**
   ```typescript
   // src/app/page.tsx
   import { PhotoGallery } from '@/components/PhotoGallery';
   
   // Add between other sections:
   <section className="py-20">
     <PhotoGallery />
   </section>
   ```

### Option 2: Hero Background Image
Replace the animated background with your photo:

```typescript
// src/components/Hero.tsx
// Replace the gradient background div with:
<div 
  className="absolute inset-0 bg-cover bg-center bg-no-repeat"
  style={{
    backgroundImage: 'url(/your-hero-photo.jpg)',
    filter: 'brightness(0.7)' // Darkens image for text readability
  }}
/>
```

## 📱 Responsive Design

The website is already fully responsive, but you can adjust breakpoints:

- `sm:` - Small screens (640px+)
- `md:` - Medium screens (768px+)
- `lg:` - Large screens (1024px+)
- `xl:` - Extra large screens (1280px+)

## 🎭 Animation Customization

### Disable Animations
If you prefer a simpler design, you can disable animations:

```typescript
// In any component, replace motion.div with regular div
// From:
<motion.div
  initial={{ opacity: 0, y: 50 }}
  animate={{ opacity: 1, y: 0 }}
>
  Content
</motion.div>

// To:
<div>
  Content
</div>
```

### Customize Animation Speed
```typescript
// Slower animations:
transition={{ duration: 2.0 }}

// Faster animations:
transition={{ duration: 0.3 }}
```

## 🔤 Typography

### Custom Fonts
Add Google Fonts to your layout:

```typescript
// src/app/layout.tsx
import { Inter, Dancing_Script } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });
const dancing = Dancing_Script({ subsets: ['latin'] });

// Use in components:
<h1 className={dancing.className}>
  Your Title
</h1>
```

### Font Sizes
Current typography scale:
- `text-5xl md:text-7xl` - Main hero title
- `text-xl md:text-2xl` - Subtitle
- `text-4xl md:text-5xl` - Section titles
- `text-lg` - Body text

## 🌟 Advanced Customization

### Add New Sections
1. Create a new component in `src/components/`
2. Import and add to `src/app/page.tsx`
3. Follow the existing pattern for animations and styling

### Custom CSS
Add custom styles to `src/app/globals.css`:

```css
.custom-gradient {
  background: linear-gradient(45deg, #your-color1, #your-color2);
}

.custom-animation {
  animation: custom-bounce 2s infinite;
}

@keyframes custom-bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}
```

### Environment Variables
Add configuration to `.env.local`:

```bash
NEXT_PUBLIC_SITE_URL=https://your-domain.com
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

Use in your code:
```typescript
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
```

## 🚀 Performance Tips

1. **Optimize Images**: Use WebP format and proper sizing
2. **Lazy Loading**: Next.js Image component handles this automatically
3. **Bundle Size**: Remove unused dependencies
4. **Animation Performance**: Use CSS transforms instead of changing layout properties

## 🎯 Common Customizations

### Change Date Format
```typescript
// In Footer.tsx, modify:
new Date(date).toLocaleDateString('en-US', { 
  year: 'numeric', 
  month: 'long', 
  day: 'numeric' 
})

// To Portuguese:
new Date(date).toLocaleDateString('pt-BR', { 
  year: 'numeric', 
  month: 'long', 
  day: 'numeric' 
})
```

### Add Social Sharing
```typescript
// Create a share button component:
const shareUrl = `https://twitter.com/intent/tweet?text=Check out our anniversary website!&url=${siteUrl}`;
```

### Multi-language Support
Create separate config files:
- `src/config/site-en.ts`
- `src/config/site-pt.ts`

Use based on user preference or URL parameter.

## 🔧 Troubleshooting

### Common Issues:

**Spotify not loading?**
- Check if the track ID is correct
- Ensure the song is available in your region
- Try a different song to test

**Animations not working?**
- Check browser compatibility
- Ensure Framer Motion is installed correctly
- Try disabling animations for testing

**Build failures?**
- Run `npm run lint` to check for errors
- Ensure all imports are correct
- Check the build logs for specific errors

Need more help? Check the main README.md or create an issue on GitHub!