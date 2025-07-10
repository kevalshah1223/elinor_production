'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Instagram, ExternalLink, Heart, MessageCircle } from 'lucide-react'
import Image from 'next/image'

const InstagramFeed = () => {
  // Dummy Instagram posts - replace with actual Instagram API data
  const instagramPosts = [
    {
      id: 1,
      src: 'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=400&h=400&fit=crop',
      alt: 'Instagram Post 1',
      likes: 245,
      comments: 18,
      caption: 'Beautiful wedding moments captured ✨ #ElinorProduction #WeddingPhotography'
    },
    {
      id: 2,
      src: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=400&h=400&fit=crop',
      alt: 'Instagram Post 2',
      likes: 189,
      comments: 12,
      caption: 'Pre-wedding magic in the golden hour 🌅 #PreWedding #CoupleGoals'
    },
    {
      id: 3,
      src: 'https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=400&h=400&fit=crop',
      alt: 'Instagram Post 3',
      likes: 312,
      comments: 25,
      caption: 'Fashion photography at its finest 📸 #FashionPhotography #Portrait'
    },
    {
      id: 4,
      src: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=400&h=400&fit=crop',
      alt: 'Instagram Post 4',
      likes: 156,
      comments: 8,
      caption: 'Corporate event coverage 🎉 #EventPhotography #Corporate'
    },
    {
      id: 5,
      src: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=400&h=400&fit=crop',
      alt: 'Instagram Post 5',
      likes: 278,
      comments: 22,
      caption: 'Reception celebrations that last forever 💃 #WeddingReception'
    },
    {
      id: 6,
      src: 'https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=400&h=400&fit=crop',
      alt: 'Instagram Post 6',
      likes: 203,
      comments: 15,
      caption: 'Engagement session vibes 💍 #Engagement #LoveStory'
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
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  }

  return (
    <section className="py-20 bg-gradient-to-b from-gray-900 to-black">
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
            <Instagram className="h-8 w-8 text-pink-400 mr-3" />
            <h2 className="text-4xl md:text-5xl font-bold font-poppins">
              Follow Our <span className="gradient-text">Journey</span>
            </h2>
          </div>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Stay updated with our latest work and behind-the-scenes moments on Instagram. 
            Join our community of photography enthusiasts.
          </p>
        </motion.div>

        {/* Instagram Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12"
        >
          {instagramPosts.map((post, index) => (
            <motion.div
              key={post.id}
              variants={itemVariants}
              className="group relative aspect-square overflow-hidden rounded-lg cursor-pointer"
              whileHover={{ scale: 1.05 }}
            >
              <Image
                src={post.src}
                alt={post.alt}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-110"
                sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 16vw"
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="text-white text-center">
                  <div className="flex items-center justify-center space-x-4 mb-2">
                    <div className="flex items-center">
                      <Heart className="h-4 w-4 mr-1" />
                      <span className="text-sm">{post.likes}</span>
                    </div>
                    <div className="flex items-center">
                      <MessageCircle className="h-4 w-4 mr-1" />
                      <span className="text-sm">{post.comments}</span>
                    </div>
                  </div>
                  <ExternalLink className="h-5 w-5 mx-auto" />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Instagram CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="bg-gradient-to-r from-pink-500/20 to-purple-500/20 rounded-2xl p-8 backdrop-blur-sm border border-pink-500/30">
            <h3 className="text-3xl font-bold text-white mb-4 font-poppins">
              Connect With Us on Instagram
            </h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Follow @elinor.production for daily inspiration, behind-the-scenes content, 
              and the latest from our photography adventures.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white font-semibold px-8 py-6 text-lg"
                asChild
              >
                <a 
                  href="https://www.instagram.com/elinor.production" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center"
                >
                  <Instagram className="mr-2 h-5 w-5" />
                  Follow @elinor.production
                </a>
              </Button>
              
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white text-white hover:bg-white hover:text-black font-semibold px-8 py-6 text-lg bg-black/20 backdrop-blur-sm"
                asChild
              >
                <a
                  href="https://www.instagram.com/elinor_production"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center"
                >
                  <Instagram className="mr-2 h-5 w-5" />
                  @elinor_production
                </a>
              </Button>
            </div>
          </div>
        </motion.div>

        {/* YouTube Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="bg-gradient-to-r from-red-500/20 to-orange-500/20 rounded-2xl p-8 backdrop-blur-sm border border-red-500/30">
            <h3 className="text-2xl font-bold text-white mb-4 font-poppins">
              Watch Our Latest Reels & Videos
            </h3>
            <p className="text-gray-300 mb-6">
              Subscribe to our YouTube channel for cinematic wedding films, behind-the-scenes content, and photography tutorials.
            </p>
            <Button
              size="lg"
              className="bg-red-600 hover:bg-red-700 text-white font-semibold px-8 py-3"
              asChild
            >
              <a 
                href="https://youtube.com/@elinorproduction" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center"
              >
                <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
                Subscribe to YouTube
              </a>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default InstagramFeed
