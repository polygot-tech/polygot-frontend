import { Header } from '@/components/layout/header';
import HeroSection from '@/components/sections/hero/hero';

export default function MainLayout() {
  return (
    <div>
      <Header />

      <main className="min-h-screen">
        <HeroSection/>
      </main>

    </div>
  );
}