'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Instagram, Youtube, MessageCircle, Play } from 'lucide-react'
import { useState, useEffect } from 'react'

const HeroSection = () => {
  const [particles, setParticles] = useState<Array<{
    id: number
    left: number
    top: number
    duration: number
    delay: number
  }>>([])

  useEffect(() => {
    // Generate particles only on client side to avoid hydration mismatch
    const newParticles = [...Array(50)].map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      duration: 3 + Math.random() * 2,
      delay: Math.random() * 2,
    }))
    setParticles(newParticles)
  }, [])
  const socialLinks = [
    {
      href: 'https://wa.me/c/919662098555',
      icon: MessageCircle,
      label: 'WhatsApp Catalog',
      color: 'hover:text-green-400'
    },
    {
      href: 'https://www.instagram.com/elinorproduction',
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
        {/* Red tone blend overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-red-950/30 to-black/80 z-10" />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-red-900/20 to-transparent z-10" />
        {/* Placeholder for hero background - you can replace with actual video/image */}
        <div className="w-full h-full bg-gradient-to-br from-gray-900 via-red-950/40 to-black" />
        {/* Animated particles effect with red tones */}
        <div className="absolute inset-0 opacity-30">
          {particles.map((particle) => (
            <motion.div
              key={particle.id}
              className="absolute w-1 h-1 rounded-full"
              style={{
                left: `${particle.left}%`,
                top: `${particle.top}%`,
                background: particle.id % 3 === 0 ? '#ef4444' : particle.id % 3 === 1 ? '#dc2626' : '#ffffff',
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: particle.duration,
                repeat: Infinity,
                delay: particle.delay,
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
          {/* Company Name */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="flex justify-center mb-12"
          >
            <h1 className="text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-bold font-poppins tracking-wider">
              <span className="bg-gradient-to-r from-white via-red-100 to-white bg-clip-text text-transparent">
                ELINOR
              </span>
              <span className="block text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-light tracking-widest mt-2 bg-gradient-to-r from-gray-300 via-red-200 to-gray-300 bg-clip-text text-transparent">
                PRODUCTION
              </span>
            </h1>
          </motion.div>

          {/* Main Tagline */}
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-2xl md:text-4xl lg:text-5xl text-white font-light max-w-4xl mx-auto mb-8 font-poppins"
          >
            Capturing Moments, Creating Stories
          </motion.h2>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
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
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Button
              size="lg"
              className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold px-8 py-6 text-lg shadow-lg border-2 border-red-600 hover:border-red-700 transition-all duration-300"
              asChild
            >
              <a href="/gallery" className="text-white font-bold">
                View Our Work
              </a>
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="border-2 border-red-500 text-red-400 hover:bg-red-600 hover:text-white hover:border-red-600 font-semibold px-8 py-6 text-lg bg-black/20 backdrop-blur-sm transition-all duration-300"
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
            transition={{ duration: 0.8, delay: 0.8 }}
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

      {/* Decorative Elements with Red Accents */}
      <div className="absolute top-1/4 left-10 w-20 h-20 border border-red-500/30 rotate-45 hidden lg:block" />
      <div className="absolute bottom-1/4 right-10 w-16 h-16 border border-red-400/40 rotate-12 hidden lg:block" />
      <div className="absolute top-1/3 right-1/4 w-2 h-2 bg-red-500 rounded-full hidden lg:block animate-pulse" />
      <div className="absolute bottom-1/3 left-1/4 w-3 h-3 bg-red-400/70 rounded-full hidden lg:block animate-pulse" />
      <div className="absolute top-1/2 left-1/3 w-1 h-1 bg-red-300 rounded-full hidden lg:block" />
      <div className="absolute bottom-1/2 right-1/3 w-1 h-1 bg-red-600 rounded-full hidden lg:block" />
    </section>
  )
}

export default HeroSection
