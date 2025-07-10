'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { Play, X, Video, Youtube, Instagram, ExternalLink } from 'lucide-react'
import Image from 'next/image'

const ReelsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedVideo, setSelectedVideo] = useState<any>(null)

  const categories = ['All', 'Wedding Films', 'Pre-Wedding', 'Fashion', 'Events', 'Behind the Scenes']

  // Dummy video data - replace with actual video content
  const videoReels = [
    {
      id: 1,
      title: 'Romantic Wedding Film',
      category: 'Wedding Films',
      thumbnail: 'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=800&h=600&fit=crop',
      duration: '3:45',
      description: 'A beautiful wedding film capturing the magic of love',
      embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      platform: 'youtube'
    },
    {
      id: 2,
      title: 'Pre-Wedding Story',
      category: 'Pre-Wedding',
      thumbnail: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=800&h=600&fit=crop',
      duration: '2:30',
      description: 'Intimate pre-wedding moments in cinematic style',
      embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      platform: 'youtube'
    },
    {
      id: 3,
      title: 'Fashion Reel',
      category: 'Fashion',
      thumbnail: 'https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=800&h=600&fit=crop',
      duration: '1:15',
      description: 'Dynamic fashion photography in motion',
      embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      platform: 'instagram'
    },
    {
      id: 4,
      title: 'Corporate Event Highlights',
      category: 'Events',
      thumbnail: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&h=600&fit=crop',
      duration: '4:20',
      description: 'Professional event coverage and highlights',
      embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      platform: 'youtube'
    },
    {
      id: 5,
      title: 'Behind the Scenes',
      category: 'Behind the Scenes',
      thumbnail: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&h=600&fit=crop',
      duration: '2:10',
      description: 'See how we create magic behind the camera',
      embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      platform: 'youtube'
    },
    {
      id: 6,
      title: 'Reception Celebration',
      category: 'Wedding Films',
      thumbnail: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&h=600&fit=crop',
      duration: '3:00',
      description: 'Joyful reception moments and celebrations',
      embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      platform: 'youtube'
    }
  ]

  const filteredVideos = selectedCategory === 'All' 
    ? videoReels 
    : videoReels.filter(video => video.category === selectedCategory)

  const openVideoModal = (video: any) => {
    setSelectedVideo(video)
  }

  const closeVideoModal = () => {
    setSelectedVideo(null)
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-b from-gray-900 to-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center justify-center mb-6">
              <Video className="h-8 w-8 text-white mr-3" />
              <h1 className="text-4xl md:text-6xl font-bold font-poppins">
                Our <span className="gradient-text">Reels</span>
              </h1>
            </div>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Experience our storytelling through motion. Watch our latest reels, wedding films, 
              and behind-the-scenes content that brings moments to life.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-6 bg-black/90 backdrop-blur-sm sticky top-16 z-40 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                className={`${
                  selectedCategory === category
                    ? 'bg-white text-black hover:bg-gray-100 font-bold border-2 border-white shadow-lg'
                    : 'border-2 border-gray-400 text-gray-200 hover:bg-white hover:text-black hover:border-white bg-black/30 backdrop-blur-sm'
                } font-semibold px-6 py-3 text-sm transition-all duration-300 rounded-lg`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Video Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredVideos.map((video, index) => (
              <motion.div
                key={video.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.4 }}
                className="group relative aspect-video overflow-hidden rounded-lg cursor-pointer bg-gray-900"
                onClick={() => openVideoModal(video)}
                whileHover={{ scale: 1.02 }}
              >
                {/* Thumbnail */}
                <Image
                  src={video.thumbnail}
                  alt={video.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-colors duration-300" />
                
                {/* Play Button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:bg-white/30 transition-colors duration-300"
                  >
                    <Play className="h-8 w-8 text-white ml-1" fill="currentColor" />
                  </motion.div>
                </div>

                {/* Duration Badge */}
                <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-sm rounded px-2 py-1">
                  <span className="text-white text-sm font-medium">{video.duration}</span>
                </div>

                {/* Platform Badge */}
                <div className="absolute top-4 left-4">
                  {video.platform === 'youtube' ? (
                    <Youtube className="h-6 w-6 text-red-500" />
                  ) : (
                    <Instagram className="h-6 w-6 text-pink-500" />
                  )}
                </div>

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                  <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <span className="inline-block px-2 py-1 bg-white/20 backdrop-blur-sm rounded text-xs text-white mb-2">
                      {video.category}
                    </span>
                    <h3 className="text-white font-semibold text-lg mb-2">
                      {video.title}
                    </h3>
                    <p className="text-white/80 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {video.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {filteredVideos.length === 0 && (
            <div className="text-center py-20">
              <p className="text-gray-400 text-lg">No videos found in this category.</p>
            </div>
          )}
        </div>
      </section>

      {/* Social Media CTAs */}
      <section className="py-16 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* YouTube CTA */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-gradient-to-r from-red-500/20 to-orange-500/20 rounded-2xl p-8 backdrop-blur-sm border border-red-500/30"
            >
              <Youtube className="h-12 w-12 text-red-500 mb-4" />
              <h3 className="text-2xl font-bold text-white mb-4 font-poppins">
                Subscribe to Our YouTube
              </h3>
              <p className="text-gray-300 mb-6">
                Watch our latest wedding films, tutorials, and behind-the-scenes content on YouTube.
              </p>
              <Button
                size="lg"
                className="bg-red-600 hover:bg-red-700 text-white font-semibold"
                asChild
              >
                <a 
                  href="https://youtube.com/@elinorproduction" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center"
                >
                  <Youtube className="mr-2 h-5 w-5" />
                  Subscribe Now
                  <ExternalLink className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </motion.div>

            {/* Instagram CTA */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-gradient-to-r from-pink-500/20 to-purple-500/20 rounded-2xl p-8 backdrop-blur-sm border border-pink-500/30"
            >
              <Instagram className="h-12 w-12 text-pink-500 mb-4" />
              <h3 className="text-2xl font-bold text-white mb-4 font-poppins">
                Follow on Instagram
              </h3>
              <p className="text-gray-300 mb-6">
                Get daily inspiration and see our latest reels and stories on Instagram.
              </p>
              <Button
                size="lg"
                className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white font-semibold"
                asChild
              >
                <a 
                  href="https://www.instagram.com/elinor.production" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center"
                >
                  <Instagram className="mr-2 h-5 w-5" />
                  Follow Us
                  <ExternalLink className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Video Modal */}
      <Dialog open={!!selectedVideo} onOpenChange={closeVideoModal}>
        <DialogContent className="max-w-6xl w-full bg-black border-gray-800 p-0">
          {selectedVideo && (
            <div className="relative">
              {/* Close Button */}
              <Button
                variant="ghost"
                size="sm"
                className="absolute top-4 right-4 z-50 text-white hover:bg-white/20"
                onClick={closeVideoModal}
              >
                <X className="h-6 w-6" />
              </Button>

              {/* Video Embed */}
              <div className="aspect-video">
                <iframe
                  src={selectedVideo.embedUrl}
                  title={selectedVideo.title}
                  className="w-full h-full rounded-t-lg"
                  allowFullScreen
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                />
              </div>

              {/* Video Info */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 bg-gray-800 rounded-full text-sm text-gray-300">
                    {selectedVideo.category}
                  </span>
                  <span className="text-gray-400 text-sm">{selectedVideo.duration}</span>
                </div>
                <h3 className="text-white font-bold text-xl mb-2">
                  {selectedVideo.title}
                </h3>
                <p className="text-gray-300">
                  {selectedVideo.description}
                </p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default ReelsPage
