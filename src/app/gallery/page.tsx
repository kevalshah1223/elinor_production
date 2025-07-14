'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import { X, ChevronLeft, ChevronRight, Camera, Loader2, RefreshCw, Play } from 'lucide-react'
import Image from 'next/image'
import { useGalleryImages } from '@/hooks/useGoogleDrive'

const GalleryPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('wedding')
  const [selectedImage, setSelectedImage] = useState<any>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const categories = [
    { id: 'wedding', label: 'Wedding' },
    { id: 'pre-wedding', label: 'Pre-Wedding' },
    { id: 'fashion', label: 'Fashion' },
    { id: 'events', label: 'Events' }
  ]

  // Use Google Drive hook
  const { data, loading, error, refetch } = useGalleryImages(selectedCategory)

  const openLightbox = (image: any, index: number) => {
    setSelectedImage(image)
    setCurrentImageIndex(index)
  }

  const closeLightbox = () => {
    setSelectedImage(null)
  }

  const navigateImage = (direction: 'prev' | 'next') => {
    if (!data?.media) return

    const newIndex = direction === 'prev'
      ? (currentImageIndex - 1 + data.media.length) % data.media.length
      : (currentImageIndex + 1) % data.media.length

    setCurrentImageIndex(newIndex)
    setSelectedImage(data.media[newIndex])
  }

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!selectedImage) return

      switch (e.key) {
        case 'ArrowLeft':
          e.preventDefault()
          navigateImage('prev')
          break
        case 'ArrowRight':
          e.preventDefault()
          navigateImage('next')
          break
        case 'Escape':
          e.preventDefault()
          closeLightbox()
          break
      }
    }

    if (selectedImage) {
      window.addEventListener('keydown', handleKeyPress)
      return () => window.removeEventListener('keydown', handleKeyPress)
    }
  }, [selectedImage, currentImageIndex, data?.media])

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
              <Camera className="h-8 w-8 text-white mr-3" />
              <h1 className="text-4xl md:text-6xl font-bold font-poppins">
                Our <span className="gradient-text">Gallery</span>
              </h1>
            </div>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Explore our portfolio of captured moments, from intimate pre-wedding sessions
              to grand celebrations and everything in between.
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
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                className={`${
                  selectedCategory === category.id
                    ? 'bg-white text-black hover:bg-gray-100 font-bold border-2 border-white shadow-lg'
                    : 'border-2 border-gray-400 text-gray-200 hover:bg-white hover:text-black hover:border-white bg-black/30 backdrop-blur-sm'
                } font-semibold px-6 py-3 text-sm transition-all duration-300 rounded-lg`}
                onClick={() => setSelectedCategory(category.id)}
              >
                {category.label}
              </Button>
            ))}
          </div>

          {/* Coming Soon Message - Below Tabs */}
          {data?.media && data.media.length === 0 && (
            <div className="text-center mt-8 py-6 border-t border-gray-800">
              <Camera className="h-12 w-12 text-gray-600 mx-auto mb-3" />
              <p className="text-gray-400 text-lg font-medium">Coming Soon</p>
              <p className="text-gray-500 text-sm mt-1">
                New content will be added to this category soon.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {/* Loading State */}
            {loading && (
              <div className="col-span-full flex items-center justify-center py-20">
                <Loader2 className="h-8 w-8 animate-spin text-white mr-3" />
                <span className="text-gray-400">Loading</span>
              </div>
            )}

            {/* Error State */}
            {error && (
              <div className="col-span-full text-center py-20">
                <div className="max-w-md mx-auto">
                  <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-8 backdrop-blur-sm">
                    <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Camera className="h-8 w-8 text-red-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">Unable to Load Gallery</h3>
                    <p className="text-red-400 text-sm mb-6 leading-relaxed">{error}</p>
                    <Button
                      onClick={refetch}
                      className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold px-6 py-3 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105"
                      disabled={loading}
                    >
                      <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
                      {loading ? 'Retrying...' : 'Try Again'}
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* Gallery Media (Images and Videos) */}
            {data?.media && data.media.map((item, index) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.4 }}
                className="group relative aspect-[4/3] overflow-hidden rounded-lg cursor-pointer"
                onClick={() => openLightbox(item, index)}
                whileHover={{ scale: 1.02 }}
              >
                {item.type === 'video' ? (
                  <div className="relative w-full h-full bg-gradient-to-br from-gray-800 to-gray-900">
                    {item.thumbnailUrl && item.thumbnailUrl.trim() !== '' ? (
                      <>
                        <Image
                          src={item.thumbnailUrl}
                          alt={item.name || 'Video thumbnail'}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
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

                        {/* Play Button Overlay */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="bg-black/60 backdrop-blur-sm rounded-full p-4 transition-all duration-300 group-hover:scale-110 group-hover:bg-black/80">
                            <Play className="h-8 w-8 text-white fill-white" />
                          </div>
                        </div>

                        {/* Video Badge */}
                        <div className="absolute bottom-2 right-2 bg-red-500/80 backdrop-blur-sm rounded px-2 py-1 text-white text-xs font-medium">
                          Video
                        </div>
                      </>
                    ) : null}

                    {/* Fallback video placeholder - only shown when thumbnail fails */}
                    <div className={`video-fallback absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 items-center justify-center ${item.thumbnailUrl && item.thumbnailUrl.trim() !== '' ? 'hidden' : 'flex'}`}>
                      <div className="text-center">
                        <div className="w-20 h-20 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-3">
                          <Play className="h-10 w-10 text-white/80 ml-1" />
                        </div>
                        <p className="text-white/70 text-sm font-medium">{item.name?.replace(/\.[^/.]+$/, '') || 'Video'}</p>
                        <p className="text-white/50 text-xs mt-1">Click to play</p>
                      </div>
                    </div>
                  </div>
                ) : item.thumbnailUrl && item.thumbnailUrl.trim() !== '' ? (
                  <Image
                    src={item.thumbnailUrl}
                    alt={item.name || 'Gallery image'}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    onError={(e) => {
                      // Fallback to placeholder for failed image loads
                      const target = e.target as HTMLImageElement;
                      target.src = '/placeholder-image.svg';
                    }}
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                    <Camera className="h-16 w-16 text-gray-400" />
                  </div>
                )}

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <span className="inline-block px-2 py-1 bg-white/20 backdrop-blur-sm rounded text-xs text-white mb-2 capitalize">
                      {selectedCategory}
                    </span>
                    <h3 className="text-white font-semibold text-sm">
                      Elinor Production
                    </h3>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>


        </div>
      </section>

      {/* Lightbox */}
      <Dialog open={!!selectedImage} onOpenChange={closeLightbox}>
        <DialogContent className="max-w-7xl w-full h-full bg-black/95 border-none p-0">
          <DialogTitle className="sr-only">
            {selectedImage?.type === 'video' ? 'Video Player' : 'Image Viewer'}
          </DialogTitle>
          {selectedImage && (
            <div className="relative w-full h-full flex items-center justify-center">
              {/* Close Button */}
              <Button
                variant="ghost"
                size="lg"
                className="absolute top-4 right-4 z-50 text-white hover:bg-black/60 bg-black/40 backdrop-blur-sm border border-white/20 rounded-full w-12 h-12 p-0 transition-all duration-300 hover:scale-110 shadow-lg"
                onClick={closeLightbox}
              >
                <X className="h-5 w-5" />
              </Button>

              {/* Image Counter */}
              <div className="absolute top-4 left-4 z-50 bg-black/40 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 text-white text-sm font-medium">
                {currentImageIndex + 1} / {data?.media?.length || 0}
              </div>

              {/* Navigation Buttons */}
              <Button
                variant="ghost"
                size="lg"
                className="absolute left-4 top-1/2 transform -translate-y-1/2 z-50 text-white hover:bg-black/60 bg-black/40 backdrop-blur-sm border border-white/20 rounded-full w-14 h-14 p-0 transition-all duration-300 hover:scale-110 shadow-lg"
                onClick={() => navigateImage('prev')}
              >
                <ChevronLeft className="h-6 w-6" />
              </Button>

              <Button
                variant="ghost"
                size="lg"
                className="absolute right-4 top-1/2 transform -translate-y-1/2 z-50 text-white hover:bg-black/60 bg-black/40 backdrop-blur-sm border border-white/20 rounded-full w-14 h-14 p-0 transition-all duration-300 hover:scale-110 shadow-lg"
                onClick={() => navigateImage('next')}
              >
                <ChevronRight className="h-6 w-6" />
              </Button>

              {/* Media Content */}
              <div className="relative w-full h-full max-w-5xl max-h-[80vh]">
                {selectedImage.type === 'video' ? (
                  <iframe
                    src={`${selectedImage.url}&embedded=true`}
                    className="w-full h-full"
                    allowFullScreen
                    allow="autoplay; encrypted-media"
                    style={{ border: 'none' }}
                  />
                ) : (
                  <Image
                    src={selectedImage.url}
                    alt={selectedImage.name || 'Gallery image'}
                    fill
                    className="object-contain"
                    sizes="100vw"
                  />
                )}
              </div>

              {/* Image Info */}
              <div className="absolute bottom-4 left-4 right-4 bg-black/50 backdrop-blur-sm rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-white font-semibold text-lg">
                      Elinor Production
                    </h3>
                  </div>
                  <span className="px-3 py-1 bg-white/20 rounded-full text-sm text-white capitalize">
                    {selectedCategory}
                  </span>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default GalleryPage
