'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Star, Quote, ChevronLeft, ChevronRight, Heart, Camera, Loader2, RefreshCw, Play, Pause } from 'lucide-react'

interface Testimonial {
  id: string;
  name: string;
  event: string;
  rating: number;
  testimonial: string;
  date: string;
}

const TestimonialsPage = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [isPaused, setIsPaused] = useState(false)

  // Fetch testimonials from Google Sheets
  const fetchTestimonials = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch('/api/testimonials')
      const data = await response.json()

      if (data.success) {
        setTestimonials(data.testimonials || [])
        console.log(`📊 Loaded ${data.testimonials?.length || 0} testimonials from ${data.source}`)
      } else {
        setError('Failed to load testimonials')
        setTestimonials(data.testimonials || [])
      }
    } catch (err) {
      console.error('Error fetching testimonials:', err)
      setError('Failed to load testimonials')
      setTestimonials([])
    } finally {
      setLoading(false)
    }
  }

  // Load testimonials on component mount
  useEffect(() => {
    fetchTestimonials()
  }, [])

  // Reset current testimonial when testimonials change
  useEffect(() => {
    if (Array.isArray(testimonials) && testimonials.length > 0 && currentTestimonial >= testimonials.length) {
      setCurrentTestimonial(0)
    }
  }, [testimonials, currentTestimonial])

  // Add keyboard navigation
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (Array.isArray(testimonials) && testimonials.length > 1) {
        if (event.key === 'ArrowLeft') {
          prevTestimonial()
        } else if (event.key === 'ArrowRight') {
          nextTestimonial()
        }
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [testimonials, currentTestimonial])

  // Auto-play testimonials
  useEffect(() => {
    if (Array.isArray(testimonials) && testimonials.length > 1 && isAutoPlaying && !isPaused) {
      const interval = setInterval(() => {
        nextTestimonial()
      }, 5000) // Change every 5 seconds

      return () => clearInterval(interval)
    }
  }, [testimonials, currentTestimonial, isAutoPlaying, isPaused])

  const nextTestimonial = () => {
    if (Array.isArray(testimonials) && testimonials.length > 0) {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }
  }

  const prevTestimonial = () => {
    if (Array.isArray(testimonials) && testimonials.length > 0) {
      setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)
    }
  }

  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <Star
          key={i}
          className={`h-5 w-5 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-400'}`}
        />
      );
    }
    return stars;
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
              <Heart className="h-8 w-8 text-red-400 mr-3" />
              <h1 className="text-4xl md:text-6xl font-bold font-poppins">
                Client <span className="gradient-text">Testimonials</span>
              </h1>
            </div>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Don't just take our word for it. Here's what our amazing clients have to say 
              about their experience with Elinor Production.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Featured Testimonial */}
      <section className="py-16 bg-black">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <Card className="bg-gradient-to-r from-gray-800/50 to-gray-700/50 border-gray-600">
              <CardContent className="p-8 md:p-12">
                <div className="flex items-center justify-center space-x-3">
                  <Loader2 className="h-6 w-6 animate-spin text-gray-400" />
                  <span className="text-gray-400">Loading</span>
                </div>
              </CardContent>
            </Card>
          ) : error ? (
            <Card className="bg-red-500/10 border border-red-500/20 backdrop-blur-sm">
              <CardContent className="p-8 md:p-12 text-center">
                <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <RefreshCw className="h-8 w-8 text-red-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Failed to Load Testimonials</h3>
                <p className="text-red-400 text-sm mb-6 leading-relaxed">{error}</p>
                <Button
                  onClick={fetchTestimonials}
                  className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold px-6 py-3 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105"
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Try Again
                </Button>
              </CardContent>
            </Card>
          ) : !Array.isArray(testimonials) || testimonials.length === 0 ? (
            <Card className="bg-gradient-to-r from-gray-800/50 to-gray-700/50 border-gray-600">
              <CardContent className="p-8 md:p-12 text-center">
                <p className="text-gray-400">No testimonials available at the moment.</p>
              </CardContent>
            </Card>
          ) : (
            <motion.div
              key={currentTestimonial}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <Card
                className="bg-gradient-to-r from-gray-800/50 to-gray-700/50 border-gray-600 overflow-hidden"
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
              >
                <CardContent className="p-8 md:p-12">
                  <div className="text-center space-y-6">
                    {/* Quote Icon */}
                    <Quote className="h-12 w-12 text-gray-400 mx-auto" />

                    {/* Testimonial Text */}
                    <blockquote className="text-xl md:text-2xl text-gray-200 leading-relaxed italic max-w-3xl mx-auto">
                      "{Array.isArray(testimonials) && testimonials[currentTestimonial] ? testimonials[currentTestimonial].testimonial : ''}"
                    </blockquote>

                    {/* Rating */}
                    <div className="flex items-center justify-center space-x-1 mb-4">
                      {Array.isArray(testimonials) && testimonials[currentTestimonial] ? renderStars(testimonials[currentTestimonial].rating) : renderStars(5)}
                    </div>

                    {/* Client Info */}
                    <div className="space-y-2">
                      <h3 className="text-2xl font-bold text-white font-poppins">
                        {Array.isArray(testimonials) && testimonials[currentTestimonial] ? testimonials[currentTestimonial].name : 'Loading...'}
                      </h3>
                      <p className="text-gray-400 font-medium">
                        {Array.isArray(testimonials) && testimonials[currentTestimonial] ? testimonials[currentTestimonial].event : 'Loading...'}
                      </p>
                      <p className="text-gray-500 text-sm">
                        {Array.isArray(testimonials) && testimonials[currentTestimonial] ? testimonials[currentTestimonial].date : ''}
                      </p>
                    </div>
                  </div>
                </CardContent>
            </Card>

            {/* Navigation Buttons - Only show if multiple testimonials */}
            {Array.isArray(testimonials) && testimonials.length > 1 && (
              <>
                <div className="flex justify-center items-center mt-8 space-x-6">
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={prevTestimonial}
                    className="group relative bg-gray-800/50 border-2 border-gray-600 text-white hover:border-white hover:bg-white hover:text-black transition-all duration-300 px-6 py-3 rounded-full shadow-lg backdrop-blur-sm"
                  >
                    <ChevronLeft className="h-5 w-5 mr-2 group-hover:scale-110 transition-transform duration-300" />
                    <span className="font-semibold">Previous</span>
                  </Button>

                  {/* Current testimonial indicator with play/pause */}
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                      className="group p-3 bg-gray-800/50 border border-gray-600 rounded-full hover:border-white hover:bg-white hover:text-black transition-all duration-300 backdrop-blur-sm"
                      aria-label={isAutoPlaying ? 'Pause auto-play' : 'Start auto-play'}
                    >
                      {isAutoPlaying ? (
                        <Pause className="h-4 w-4 group-hover:scale-110 transition-transform duration-300" />
                      ) : (
                        <Play className="h-4 w-4 group-hover:scale-110 transition-transform duration-300" />
                      )}
                    </button>

                    <div className="flex items-center space-x-2 px-4 py-2 bg-gray-800/30 rounded-full border border-gray-600 backdrop-blur-sm">
                      <span className="text-gray-400 text-sm font-medium">
                        {currentTestimonial + 1} of {testimonials.length}
                      </span>
                    </div>
                  </div>

                  <Button
                    variant="outline"
                    size="lg"
                    onClick={nextTestimonial}
                    className="group relative bg-gray-800/50 border-2 border-gray-600 text-white hover:border-white hover:bg-white hover:text-black transition-all duration-300 px-6 py-3 rounded-full shadow-lg backdrop-blur-sm"
                  >
                    <span className="font-semibold">Next</span>
                    <ChevronRight className="h-5 w-5 ml-2 group-hover:scale-110 transition-transform duration-300" />
                  </Button>
                </div>

                {/* Dots Indicator */}
                <div className="flex justify-center mt-8 space-x-3">
                  {Array.isArray(testimonials) && testimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentTestimonial(index)}
                      className={`group relative transition-all duration-300 ${
                        index === currentTestimonial
                          ? 'w-8 h-3 bg-white rounded-full shadow-lg'
                          : 'w-3 h-3 bg-gray-600 hover:bg-gray-400 rounded-full hover:scale-125'
                      }`}
                      aria-label={`Go to testimonial ${index + 1}`}
                    >
                      {index === currentTestimonial && (
                        <div className="absolute inset-0 bg-white rounded-full animate-pulse opacity-50"></div>
                      )}
                    </button>
                  ))}
                </div>
              </>
            )}
            </motion.div>
          )}
        </div>
      </section>

      {/* All Testimonials Grid */}
      <section className="py-20 bg-gradient-to-b from-gray-900 to-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold font-poppins mb-6">
              What Our <span className="gradient-text">Clients Say</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Every testimonial represents a story we've had the privilege to capture
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.isArray(testimonials) && testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <Card className="bg-gray-800/50 border-gray-700 hover:border-gray-600 transition-all duration-300 h-full">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-1 mb-4">
                      {renderStars(testimonial.rating)}
                    </div>
                    
                    <blockquote className="text-gray-300 mb-6 leading-relaxed">
                      "{testimonial.testimonial}"
                    </blockquote>

                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-gray-600 to-gray-800 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-lg">
                          {testimonial.name.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <h4 className="text-white font-semibold">
                          {testimonial.name}
                        </h4>
                        <p className="text-gray-400 text-sm">
                          {testimonial.event}
                        </p>
                        <p className="text-gray-500 text-xs">
                          {testimonial.date}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold font-poppins mb-4">
              Trusted by <span className="gradient-text">Hundreds</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {(() => {
              const stats = [
                { number: '500+', label: 'Happy Clients' },
                { number: '98%', label: 'Satisfaction Rate' },
                { number: '1000+', label: 'Events Covered' },
                { number: '5★', label: 'Average Rating' }
              ];
              return stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-bold text-white mb-2 font-poppins">
                  {stat.number}
                </div>
                <div className="text-gray-400 text-sm md:text-base">
                  {stat.label}
                </div>
              </motion.div>
              ));
            })()}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-b from-gray-900 to-black">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-white mb-6 font-poppins">
              Ready to Create Your Own Success Story?
            </h2>
            <p className="text-xl text-gray-400 mb-8 leading-relaxed">
              Join our family of satisfied clients and let us capture your special moments.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-white text-black hover:bg-gray-100 font-bold px-8 py-6 text-lg shadow-lg border-2 border-white"
                asChild
              >
                <a href="/contact" className="text-black font-bold">Book Your Session</a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white text-white hover:bg-white hover:text-black font-bold px-8 py-6 text-lg bg-black/20 backdrop-blur-sm"
                asChild
              >
                <a href="/gallery" className="font-bold">View Our Portfolio</a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default TestimonialsPage
