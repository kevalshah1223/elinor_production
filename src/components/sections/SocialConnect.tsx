'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Instagram, Youtube, Play } from 'lucide-react'

const SocialConnect = () => {
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
            Stay updated with our latest work and behind-the-scenes moments. 
            Connect with us on social media for daily inspiration.
          </p>
        </motion.div>

        {/* Connect With Us on Instagram */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-center mb-16"
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
                  href="https://www.instagram.com/elinorproduction" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center"
                >
                  <Instagram className="mr-2 h-5 w-5" />
                  Follow @elinorproduction
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

        {/* Watch Our Latest Reels & Videos */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="bg-gradient-to-r from-red-500/20 to-orange-500/20 rounded-2xl p-8 backdrop-blur-sm border border-red-500/30">
            <h3 className="text-3xl font-bold text-white mb-4 font-poppins">
              Watch Our Latest Reels & Videos
            </h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Discover our cinematic storytelling and creative process through our YouTube channel 
              and Instagram reels. Get inspired by our latest projects.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white font-semibold px-8 py-6 text-lg"
                asChild
              >
                <a 
                  href="https://youtube.com/@elinorproduction" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center"
                >
                  <Youtube className="mr-2 h-5 w-5" />
                  Subscribe on YouTube
                </a>
              </Button>
              
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white text-white hover:bg-white hover:text-black font-semibold px-8 py-6 text-lg bg-black/20 backdrop-blur-sm"
                asChild
              >
                <a
                  href="https://www.instagram.com/elinor.production/reels/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center"
                >
                  <Play className="mr-2 h-5 w-5" />
                  Watch Reels
                </a>
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default SocialConnect
