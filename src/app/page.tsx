'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import AnnouncementBanner from '@/components/AnnouncementBanner';
import ProductsAndPricing from '@/components/Pricing';
import OwlTableSpotlight from '@/components/OwlTableSpotlight';
import Features from '@/components/Features';
import UseCases from '@/components/UseCases';


export default function Home() {
  const [isBannerVisible, setIsBannerVisible] = useState(true);

  return (
      <main className="min-h-screen overflow-hidden bg-[#070b14] text-white selection:bg-blue-500/30">
      <AnnouncementBanner isVisible={isBannerVisible} onClose={() => setIsBannerVisible(false)} />
      <Navbar withMarginTop={isBannerVisible} />
      <Hero />
      <OwlTableSpotlight />
      <Features />
      <UseCases />
      <ProductsAndPricing />
    </main>
  );
}
