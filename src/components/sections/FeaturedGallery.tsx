'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { ArrowRight, Eye } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'

const FeaturedGallery = () => {
  const [hoveredImage, setHoveredImage] = useState<number | null>(null)

  // Dummy featured images - replace with actual images
  const featuredImages = [
    {
      id: 1,
      src: 'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=800&h=600&fit=crop',
      alt: 'Wedding Photography',
      category: 'Wedding',
      title: 'Romantic Wedding Ceremony'
    },
    {
      id: 2,
      src: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=800&h=600&fit=crop',
      alt: 'Pre-Wedding Photography',
      category: 'Pre-Wedding',
      title: 'Couple Portrait Session'
    },
    {
      id: 3,
      src: 'https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=800&h=600&fit=crop',
      alt: 'Fashion Photography',
      category: 'Fashion',
      title: 'Fashion Portrait'
    },
    {
      id: 4,
      src: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&h=600&fit=crop',
      alt: 'Event Photography',
      category: 'Events',
      title: 'Corporate Event'
    },
    {
      id: 5,
      src: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&h=600&fit=crop',
      alt: 'Wedding Reception',
      category: 'Wedding',
      title: 'Reception Celebration'
    },
    {
      id: 6,
      src: 'https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=800&h=600&fit=crop',
      alt: 'Engagement Session',
      category: 'Pre-Wedding',
      title: 'Engagement Photos'
    }
  ]

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
          <h2 className="text-4xl md:text-5xl font-bold font-poppins mb-6">
            Featured <span className="gradient-text">Gallery</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            A glimpse into our portfolio showcasing the beauty, emotion, and artistry 
            we bring to every project.
          </p>
        </motion.div>

        {/* Gallery Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
        >
          {featuredImages.map((image, index) => (
            <motion.div
              key={image.id}
              variants={itemVariants}
              className="group relative overflow-hidden rounded-lg aspect-[4/3] cursor-pointer"
              onMouseEnter={() => setHoveredImage(image.id)}
              onMouseLeave={() => setHoveredImage(null)}
              whileHover={{ scale: 1.02 }}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-end p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm text-white mb-2">
                    {image.category}
                  </span>
                  <h3 className="text-white font-semibold text-lg mb-2">
                    {image.title}
                  </h3>
                  <div className="flex items-center text-white/80">
                    <Eye className="h-4 w-4 mr-2" />
                    <span className="text-sm">View Details</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* View All Button */}
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
            <a href="/gallery" className="flex items-center text-black font-bold">
              View Complete Gallery
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
            </a>
          </Button>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 pt-16 border-t border-gray-800"
        >
          {[
            { number: '500+', label: 'Happy Clients' },
            { number: '1000+', label: 'Events Covered' },
            { number: '50K+', label: 'Photos Captured' },
            { number: '5+', label: 'Years Experience' }
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
      </div>
    </section>
  )
}

export default FeaturedGallery
