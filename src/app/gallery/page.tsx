'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { X, ChevronLeft, ChevronRight, Camera } from 'lucide-react'
import Image from 'next/image'

const GalleryPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedImage, setSelectedImage] = useState<typeof galleryImages[0] | null>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const categories = ['All', 'Pre-Wedding', 'Wedding', 'Fashion', 'Events']

  // Dummy gallery data - replace with actual Google Drive images
  const galleryImages = [
    {
      id: 1,
      src: 'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=800&h=600&fit=crop',
      alt: 'Wedding Ceremony',
      category: 'Wedding',
      title: 'Beautiful Wedding Ceremony',
      description: 'A magical moment captured during the wedding ceremony'
    },
    {
      id: 2,
      src: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=800&h=600&fit=crop',
      alt: 'Pre-Wedding Shoot',
      category: 'Pre-Wedding',
      title: 'Romantic Pre-Wedding Session',
      description: 'Intimate moments before the big day'
    },
    {
      id: 3,
      src: 'https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=800&h=600&fit=crop',
      alt: 'Fashion Portrait',
      category: 'Fashion',
      title: 'Fashion Photography',
      description: 'Professional fashion portrait session'
    },
    {
      id: 4,
      src: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&h=600&fit=crop',
      alt: 'Corporate Event',
      category: 'Events',
      title: 'Corporate Event Coverage',
      description: 'Professional event photography'
    },
    {
      id: 5,
      src: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&h=600&fit=crop',
      alt: 'Wedding Reception',
      category: 'Wedding',
      title: 'Wedding Reception',
      description: 'Celebration moments at the reception'
    },
    {
      id: 6,
      src: 'https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=800&h=600&fit=crop',
      alt: 'Engagement Photos',
      category: 'Pre-Wedding',
      title: 'Engagement Session',
      description: 'Beautiful engagement photography'
    },
    {
      id: 7,
      src: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=800&h=600&fit=crop',
      alt: 'Fashion Shoot',
      category: 'Fashion',
      title: 'Studio Fashion Shoot',
      description: 'Creative fashion photography in studio'
    },
    {
      id: 8,
      src: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800&h=600&fit=crop',
      alt: 'Birthday Party',
      category: 'Events',
      title: 'Birthday Celebration',
      description: 'Joyful birthday party moments'
    },
    {
      id: 9,
      src: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?w=800&h=600&fit=crop',
      alt: 'Wedding Portraits',
      category: 'Wedding',
      title: 'Couple Portraits',
      description: 'Beautiful wedding day portraits'
    }
  ]

  const filteredImages = selectedCategory === 'All' 
    ? galleryImages 
    : galleryImages.filter(img => img.category === selectedCategory)

  const openLightbox = (image: typeof galleryImages[0], index: number) => {
    setSelectedImage(image)
    setCurrentImageIndex(index)
  }

  const closeLightbox = () => {
    setSelectedImage(null)
  }

  const navigateImage = (direction: 'prev' | 'next') => {
    const newIndex = direction === 'prev' 
      ? (currentImageIndex - 1 + filteredImages.length) % filteredImages.length
      : (currentImageIndex + 1) % filteredImages.length
    
    setCurrentImageIndex(newIndex)
    setSelectedImage(filteredImages[newIndex])
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

      {/* Gallery Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {filteredImages.map((image, index) => (
              <motion.div
                key={image.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.4 }}
                className="group relative aspect-[4/3] overflow-hidden rounded-lg cursor-pointer"
                onClick={() => openLightbox(image, index)}
                whileHover={{ scale: 1.02 }}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <span className="inline-block px-2 py-1 bg-white/20 backdrop-blur-sm rounded text-xs text-white mb-2">
                      {image.category}
                    </span>
                    <h3 className="text-white font-semibold text-sm mb-1">
                      {image.title}
                    </h3>
                    <p className="text-white/80 text-xs">
                      {image.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {filteredImages.length === 0 && (
            <div className="text-center py-20">
              <p className="text-gray-400 text-lg">No images found in this category.</p>
            </div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      <Dialog open={!!selectedImage} onOpenChange={closeLightbox}>
        <DialogContent className="max-w-7xl w-full h-full bg-black/95 border-none p-0">
          {selectedImage && (
            <div className="relative w-full h-full flex items-center justify-center">
              {/* Close Button */}
              <Button
                variant="ghost"
                size="sm"
                className="absolute top-4 right-4 z-50 text-white hover:bg-white/20"
                onClick={closeLightbox}
              >
                <X className="h-6 w-6" />
              </Button>

              {/* Navigation Buttons */}
              <Button
                variant="ghost"
                size="sm"
                className="absolute left-4 top-1/2 transform -translate-y-1/2 z-50 text-white hover:bg-white/20"
                onClick={() => navigateImage('prev')}
              >
                <ChevronLeft className="h-8 w-8" />
              </Button>

              <Button
                variant="ghost"
                size="sm"
                className="absolute right-4 top-1/2 transform -translate-y-1/2 z-50 text-white hover:bg-white/20"
                onClick={() => navigateImage('next')}
              >
                <ChevronRight className="h-8 w-8" />
              </Button>

              {/* Image */}
              <div className="relative w-full h-full max-w-5xl max-h-[80vh]">
                <Image
                  src={selectedImage.src}
                  alt={selectedImage.alt}
                  fill
                  className="object-contain"
                  sizes="100vw"
                />
              </div>

              {/* Image Info */}
              <div className="absolute bottom-4 left-4 right-4 bg-black/50 backdrop-blur-sm rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-white font-semibold text-lg mb-1">
                      {selectedImage.title}
                    </h3>
                    <p className="text-gray-300 text-sm">
                      {selectedImage.description}
                    </p>
                  </div>
                  <span className="px-3 py-1 bg-white/20 rounded-full text-sm text-white">
                    {selectedImage.category}
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
