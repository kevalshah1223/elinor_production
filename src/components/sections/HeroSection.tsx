'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Instagram, Youtube, MessageCircle, Play } from 'lucide-react'
import Image from 'next/image'

const HeroSection = () => {
  const socialLinks = [
    {
      href: 'https://wa.me/c/919662098555',
      icon: MessageCircle,
      label: 'WhatsApp Catalog',
      color: 'hover:text-green-400'
    },
    {
      href: 'https://www.instagram.com/elinor.production',
      icon: Instagram,
      label: 'Instagram',
      color: 'hover:text-pink-400'
    },
    {
      href: 'https://youtube.com/@elinorproduction',
      icon: Youtube,
      label: 'YouTube',
      color: 'hover:text-red-400'
    }
  ]

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Video/Image */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70 z-10" />
        {/* Placeholder for hero background - you can replace with actual video/image */}
        <div className="w-full h-full bg-gradient-to-br from-gray-900 via-black to-gray-800" />
        {/* Animated particles effect */}
        <div className="absolute inset-0 opacity-20">
          {[...Array(50)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          {/* Main Heading */}
          <div className="space-y-4">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-5xl md:text-7xl lg:text-8xl font-bold font-poppins"
            >
              <span className="gradient-text">Elinor</span>
              <br />
              <span className="text-white">Production</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl md:text-2xl lg:text-3xl text-gray-300 font-light max-w-3xl mx-auto"
            >
              Capturing Moments, Creating Stories
            </motion.p>
          </div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed"
          >
            Professional photography and videography services for weddings, pre-weddings, 
            fashion shoots, and special events. We transform your precious moments into 
            timeless memories.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Button
              size="lg"
              className="bg-white text-black hover:bg-gray-100 font-bold px-8 py-6 text-lg shadow-lg border-2 border-white"
              asChild
            >
              <a href="/gallery" className="text-black font-bold">
                View Our Work
              </a>
            </Button>
            
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-white text-white hover:bg-white hover:text-black font-semibold px-8 py-6 text-lg bg-black/20 backdrop-blur-sm"
              asChild
            >
              <a href="/contact">
                Get In Touch
              </a>
            </Button>
          </motion.div>

          {/* Social Media Links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0 }}
            className="flex justify-center space-x-8 pt-8"
          >
            {socialLinks.map((social, index) => (
              <motion.a
                key={social.href}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`text-gray-400 ${social.color} transition-all duration-300 transform hover:scale-110`}
                aria-label={social.label}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <social.icon className="h-8 w-8" />
              </motion.a>
            ))}
          </motion.div>


        </motion.div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-1/4 left-10 w-20 h-20 border border-white/20 rotate-45 hidden lg:block" />
      <div className="absolute bottom-1/4 right-10 w-16 h-16 border border-white/20 rotate-12 hidden lg:block" />
      <div className="absolute top-1/3 right-1/4 w-2 h-2 bg-white rounded-full hidden lg:block" />
      <div className="absolute bottom-1/3 left-1/4 w-3 h-3 bg-white/50 rounded-full hidden lg:block" />
    </section>
  )
}

export default HeroSection
