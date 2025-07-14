'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { ArrowRight, Eye, Play, Loader2, RefreshCw, Camera, Video } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'
import { useAllMedia } from '@/hooks/useGoogleDrive'
import Link from 'next/link'

const FeaturedGallery = () => {
  const [hoveredImage, setHoveredImage] = useState<string | null>(null)

  // Use Google Drive hook to get all media
  const { data, loading, error, refetch } = useAllMedia()

  // Show first 8 items from all media for faster loading
  const filteredMedia = data?.media ? data.media.slice(0, 8) : []

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6
      }
    }
  }

  return (
    <section className="py-20 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center mb-6">
            <Camera className="h-8 w-8 text-white mr-3" />
            <h2 className="text-4xl md:text-5xl font-bold font-poppins">
              Our <span className="gradient-text">Gallery</span>
            </h2>
          </div>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Explore our complete collection of photos and videos from Google Drive.
            Every moment captured, every story told.
          </p>
        </motion.div>

        {/* Loading State */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
            {Array.from({ length: 8 }).map((_, index) => (
              <div
                key={index}
                className="relative overflow-hidden rounded-lg aspect-[4/3] bg-gradient-to-br from-gray-800 to-gray-900 animate-pulse"
              >
                <div className="absolute inset-0 bg-gray-700/50"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-gray-600/50 flex items-center justify-center">
                    <Camera className="h-6 w-6 text-gray-400" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-20">
            <div className="max-w-md mx-auto">
              <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-8 backdrop-blur-sm">
                <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Camera className="h-8 w-8 text-red-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Gallery Unavailable</h3>
                <p className="text-red-400 text-sm mb-6 leading-relaxed">{error}</p>
                <Button
                  onClick={refetch}
                  className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold px-6 py-3 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105"
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Try Again
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Gallery Grid */}
        {!loading && !error && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12"
          >
            {filteredMedia.map((item, index) => (
              <motion.div
                key={item.id}
                variants={itemVariants}
                className="group relative overflow-hidden rounded-lg aspect-[4/3] cursor-pointer"
                onMouseEnter={() => setHoveredImage(item.id)}
                onMouseLeave={() => setHoveredImage(null)}
                whileHover={{ scale: 1.02 }}
              >
                {item.type === 'video' ? (
                  <div className="relative w-full h-full bg-gradient-to-br from-gray-800 to-gray-900">
                    {item.thumbnailUrl ? (
                      <>
                        <Image
                          src={item.thumbnailUrl}
                          alt={item.name}
                          fill
                          priority={index < 4} // Priority loading for first 4 items
                          className="object-cover transition-transform duration-700 group-hover:scale-110"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                          onError={(e) => {
                            // Hide the image on error and show fallback
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                            // Show the fallback placeholder
                            const fallback = target.parentElement?.querySelector('.video-fallback') as HTMLElement;
                            if (fallback) {
                              fallback.style.display = 'flex';
                            }
                          }}
                        />

                        {/* Play button overlay for video thumbnails */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="bg-black/60 backdrop-blur-sm rounded-full p-4 transition-all duration-300 group-hover:scale-110 group-hover:bg-black/80">
                            <Play className="h-8 w-8 text-white fill-white" />
                          </div>
                        </div>

                        {/* Video badge */}
                        <div className="absolute bottom-2 right-2 bg-red-500/80 backdrop-blur-sm rounded px-2 py-1 text-white text-xs font-medium">
                          Video
                        </div>
                      </>
                    ) : null}

                    {/* Fallback video placeholder - only shown when thumbnail fails */}
                    <div className={`video-fallback absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 items-center justify-center ${item.thumbnailUrl ? 'hidden' : 'flex'}`}>
                      <div className="text-center">
                        <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-2">
                          <Play className="h-8 w-8 text-white/80 ml-1" />
                        </div>
                        <p className="text-white/70 text-sm font-medium">{item.name?.replace(/\.[^/.]+$/, '') || 'Video'}</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <Image
                    src={item.thumbnailUrl}
                    alt={item.name}
                    fill
                    priority={index < 4} // Priority loading for first 4 items
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    onError={(e) => {
                      // Fallback to a placeholder
                      const target = e.target as HTMLImageElement;
                      target.src = '/placeholder-image.svg';
                    }}
                  />
                )}

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-end p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm text-white">
                        {item.category}
                      </span>
                      {item.type === 'video' && item.duration && (
                        <span className="inline-block px-2 py-1 bg-red-500/80 backdrop-blur-sm rounded text-xs text-white">
                          {item.duration}
                        </span>
                      )}
                    </div>
                    <h3 className="text-white font-semibold text-lg mb-2 line-clamp-2">
                      {item.name.replace(/\.[^/.]+$/, "")}
                    </h3>
                    <div className="flex items-center text-white/80">
                      {item.type === 'video' ? (
                        <>
                          <Video className="h-4 w-4 mr-2" />
                          <span className="text-sm">Watch Video</span>
                        </>
                      ) : (
                        <>
                          <Eye className="h-4 w-4 mr-2" />
                          <span className="text-sm">View Image</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* No Media Message */}
        {!loading && !error && filteredMedia.length === 0 && (
          <div className="text-center py-20">
            <Camera className="h-16 w-16 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400 text-lg">No media found for this category.</p>
          </div>
        )}

        {/* View All Button */}
        {!loading && !error && filteredMedia.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <Button
              size="lg"
              className="bg-white text-black hover:bg-gray-100 font-bold px-8 py-6 text-lg group shadow-lg border-2 border-white"
              asChild
            >
              <Link href="/gallery" className="flex items-center text-black font-bold">
                View Complete Gallery
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </Button>
          </motion.div>
        )}

        {/* Stats Section */}
        {!loading && data && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 pt-16 border-t border-gray-800"
          >
            {[
              {
                number: data.breakdown?.images || 0,
                label: 'Photos'
              },
              {
                number: data.breakdown?.videos || 0,
                label: 'Videos'
              },
              {
                number: data.breakdown?.categories || 0,
                label: 'Categories'
              },
              {
                number: data.total || 0,
                label: 'Total Media'
              }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-white mb-2 font-poppins">
                  {stat.number}
                </div>
                <div className="text-gray-400 text-sm md:text-base">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  )
}

export default FeaturedGallery
