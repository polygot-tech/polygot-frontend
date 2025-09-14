import HeroSection from "@/components/sections/hero/hero"
import { Suspense, lazy } from 'react';
import { Metadata } from 'next';

// Lazy load heavy components
const FeaturesSection = lazy(() => import("@/components/sections/features/features"));
const PricingSection = lazy(() => import("@/components/sections/pricing/pricing"));
const GlobalReachSection = lazy(() => import("@/components/sections/global-reach"));

export const metadata: Metadata = {
  title: 'Polygot – The AI-Powered Translation & Localization',
  description: 'Polygot helps developers and teams seamlessly translate and localize apps, websites, and content using advanced AI. With support for 100+ languages, real-time collaboration, and developer-friendly APIs, Polygot streamlines global app deployment — ensuring fast, accurate, and context-aware translations.',
};

export default function MainLayout() {
 const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Polygot',
  url: 'https://polygot.tech',
  logo: 'https://polygot.tech/logo.png', // Ensure this URL actually works
};

const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Polygot',
  url: 'https://polygot.tech',
};


  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />

      <HeroSection/>
      <Suspense fallback={<div className="h-screen bg-gradient-to-br from-slate-50 via-white to-green-50/30 dark:from-gray-900 dark:via-gray-950 dark:to-green-900/30 animate-pulse" />}>
        <FeaturesSection/>
      </Suspense>
      <Suspense fallback={<div className="h-screen bg-gradient-to-br from-slate-50 via-white to-green-50/30 dark:from-gray-900 dark:via-gray-950 dark:to-green-900/30 animate-pulse" />}>
        <GlobalReachSection/>
      </Suspense>
      <Suspense fallback={<div className="h-screen bg-gradient-to-br from-slate-50 via-white to-green-50/30 dark:from-gray-900 dark:via-gray-950 dark:to-green-900/30 animate-pulse" />}>
        <PricingSection/>
      </Suspense>
    </>
  );
}