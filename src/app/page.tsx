'use client'

import { motion } from 'framer-motion'
import HeroSection from '@/components/sections/HeroSection'
import FeaturedGallery from '@/components/sections/FeaturedGallery'
import ServicesOverview from '@/components/sections/ServicesOverview'
import LatestVideos from '@/components/sections/LatestVideos'
import SocialConnect from '@/components/sections/SocialConnect'

export default function Home() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <ServicesOverview />
      <LatestVideos />
      <FeaturedGallery />
      <SocialConnect />
    </div>
  );
}
