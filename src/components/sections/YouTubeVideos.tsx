'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Play, Youtube, ExternalLink } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface YouTubeVideo {
  id: string
  title: string
  description: string
  thumbnail: {
    default: string
    medium: string
    high: string
  }
  publishedAt: string
  viewCount?: string
  duration?: string
}

const YouTubeVideos = () => {
  const [videos, setVideos] = useState<YouTubeVideo[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchYouTubeVideos()
  }, [])

  const fetchYouTubeVideos = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/youtube/videos')
      
      if (!response.ok) {
        throw new Error('Failed to fetch videos')
      }
      
      const data = await response.json()
      setVideos(data.videos || [])
    } catch (err) {
      console.error('Error fetching YouTube videos:', err)
      setError('Failed to load videos')
    } finally {
      setLoading(false)
    }
  }

  const openVideo = (videoId: string) => {
    window.open(`https://www.youtube.com/watch?v=${videoId}`, '_blank')
  }

  if (loading) {
    return (
      <section className="py-16 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-700 rounded w-64 mx-auto mb-4"></div>
              <div className="h-4 bg-gray-700 rounded w-96 mx-auto mb-8"></div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="bg-gray-800 rounded-lg h-64"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  if (error || videos.length === 0) {
    return (
      <section className="py-16 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div className="flex items-center justify-center mb-6">
              <Youtube className="h-8 w-8 text-red-500 mr-3" />
              <h2 className="text-4xl md:text-5xl font-bold font-poppins text-white">
                Latest <span className="gradient-text">Videos</span>
              </h2>
            </div>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed mb-8">
              Watch our latest cinematic creations and behind-the-scenes content.
            </p>
            <Button
              size="lg"
              className="bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white font-semibold px-8 py-6 text-lg"
              asChild
            >
              <a 
                href="https://www.youtube.com/@elinorproduction" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center"
              >
                <Youtube className="mr-2 h-5 w-5" />
                Visit Our Channel
              </a>
            </Button>
          </motion.div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 bg-gradient-to-b from-black to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center mb-6">
            <Youtube className="h-8 w-8 text-red-500 mr-3" />
            <h2 className="text-4xl md:text-5xl font-bold font-poppins text-white">
              Latest <span className="gradient-text">Videos</span>
            </h2>
          </div>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Watch our latest cinematic creations and behind-the-scenes content.
          </p>
        </motion.div>

        {/* Video Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {videos.slice(0, 6).map((video, index) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group cursor-pointer"
              onClick={() => openVideo(video.id)}
            >
              <div className="relative overflow-hidden rounded-lg bg-gray-800 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                {/* Thumbnail */}
                <div className="relative aspect-video">
                  <img
                    src={video.thumbnail.high || video.thumbnail.medium || video.thumbnail.default}
                    alt={video.title}
                    className="w-full h-full object-cover"
                  />
                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="bg-red-600 rounded-full p-4 transform scale-100 group-hover:scale-110 transition-transform duration-300">
                      <Play className="h-8 w-8 text-white fill-current" />
                    </div>
                  </div>
                </div>
                
                {/* Video Info */}
                <div className="p-4">
                  <h3 className="text-white font-semibold text-lg mb-2 line-clamp-2 group-hover:text-red-400 transition-colors duration-300">
                    {video.title}
                  </h3>
                  <p className="text-gray-400 text-sm line-clamp-2 mb-3">
                    {video.description}
                  </p>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>{new Date(video.publishedAt).toLocaleDateString()}</span>
                    {video.viewCount && (
                      <span>{parseInt(video.viewCount).toLocaleString()} views</span>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View More Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Button
            size="lg"
            className="bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white font-semibold px-8 py-6 text-lg"
            asChild
          >
            <a 
              href="https://www.youtube.com/@elinorproduction" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center"
            >
              <Youtube className="mr-2 h-5 w-5" />
              View All Videos
              <ExternalLink className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}

export default YouTubeVideos
