import { Hero } from '@/components/Hero';
import { Story } from '@/components/Story';
import { SpotifyPlayer } from '@/components/SpotifyPlayer';
import { Memories } from '@/components/Memories';
import { Footer } from '@/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-12">
            Our Song ❤️
          </h2>
          <SpotifyPlayer />
        </div>
      </section>

      <Story />
      <Memories />
      <Footer />
    </main>
  );
}
