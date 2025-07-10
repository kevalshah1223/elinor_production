'use client'

import { motion } from 'framer-motion'
import HeroSection from '@/components/sections/HeroSection'
import FeaturedGallery from '@/components/sections/FeaturedGallery'
import InstagramFeed from '@/components/sections/InstagramFeed'
import ServicesOverview from '@/components/sections/ServicesOverview'

export default function Home() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <ServicesOverview />
      <FeaturedGallery />
      <InstagramFeed />
    </div>
  );
}
