'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Star, Quote, ChevronLeft, ChevronRight, Heart, Camera } from 'lucide-react'
import Image from 'next/image'

const TestimonialsPage = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)

  // Dummy testimonials data - replace with actual client testimonials
  const testimonials = [
    {
      id: 1,
      name: 'Priya & Arjun',
      event: 'Wedding Photography',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=400&h=400&fit=crop',
      testimonial: 'Elinor Production captured our wedding day perfectly! Every moment was beautifully documented, and the team was so professional and friendly. We couldn\'t be happier with our photos and videos.',
      date: 'December 2023'
    },
    {
      id: 2,
      name: 'Sneha & Vikram',
      event: 'Pre-Wedding Shoot',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=400&h=400&fit=crop',
      testimonial: 'Our pre-wedding shoot was absolutely magical! The photographer understood our vision and created stunning images that we will treasure forever. Highly recommended!',
      date: 'November 2023'
    },
    {
      id: 3,
      name: 'Ananya Sharma',
      event: 'Fashion Photography',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=400&h=400&fit=crop',
      testimonial: 'Working with Elinor Production for my fashion portfolio was an incredible experience. The creativity and attention to detail exceeded my expectations. The final images are absolutely stunning!',
      date: 'October 2023'
    },
    {
      id: 4,
      name: 'Rajesh Kumar',
      event: 'Corporate Event',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=400&h=400&fit=crop',
      testimonial: 'Elinor Production covered our annual corporate event flawlessly. They captured all the important moments and delivered high-quality photos promptly. Very professional service!',
      date: 'September 2023'
    },
    {
      id: 5,
      name: 'Meera & Rohit',
      event: 'Wedding Reception',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=400&h=400&fit=crop',
      testimonial: 'The team captured our reception celebration beautifully! Every candid moment, every emotion was perfectly preserved. The quality of work is exceptional and the team is wonderful to work with.',
      date: 'August 2023'
    },
    {
      id: 6,
      name: 'Kavya & Aditya',
      event: 'Engagement Photography',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=400&h=400&fit=crop',
      testimonial: 'Our engagement photos turned out beyond our dreams! The photographer was patient, creative, and made us feel comfortable throughout the shoot. We love every single photo!',
      date: 'July 2023'
    },
    {
      id: 7,
      name: 'Ravi Patel',
      event: 'Birthday Celebration',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=400&h=400&fit=crop',
      testimonial: 'Elinor Production made my milestone birthday celebration memorable with their amazing photography. They captured all the joy and laughter perfectly. Highly professional and talented team!',
      date: 'June 2023'
    },
    {
      id: 8,
      name: 'Ishita & Karan',
      event: 'Wedding Videography',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?w=400&h=400&fit=crop',
      testimonial: 'The wedding film created by Elinor Production is absolutely cinematic! They captured our love story beautifully and created a masterpiece that we watch over and over again.',
      date: 'May 2023'
    }
  ]

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-5 w-5 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-400'}`}
      />
    ))
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
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            key={currentTestimonial}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <Card className="bg-gradient-to-r from-gray-800/50 to-gray-700/50 border-gray-600 overflow-hidden">
              <CardContent className="p-8 md:p-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
                  {/* Image */}
                  <div className="lg:col-span-1">
                    <div className="aspect-square relative overflow-hidden rounded-lg">
                      <Image
                        src={testimonials[currentTestimonial].image}
                        alt={testimonials[currentTestimonial].name}
                        fill
                        className="object-cover"
                        sizes="400px"
                      />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="lg:col-span-2 space-y-6">
                    <Quote className="h-12 w-12 text-gray-400" />
                    
                    <blockquote className="text-xl md:text-2xl text-gray-200 leading-relaxed italic">
                      "{testimonials[currentTestimonial].testimonial}"
                    </blockquote>

                    <div className="flex items-center space-x-1 mb-4">
                      {renderStars(testimonials[currentTestimonial].rating)}
                    </div>

                    <div>
                      <h3 className="text-2xl font-bold text-white font-poppins">
                        {testimonials[currentTestimonial].name}
                      </h3>
                      <p className="text-gray-400 font-medium">
                        {testimonials[currentTestimonial].event}
                      </p>
                      <p className="text-gray-500 text-sm">
                        {testimonials[currentTestimonial].date}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Navigation Buttons */}
            <div className="flex justify-center mt-8 space-x-4">
              <Button
                variant="outline"
                size="sm"
                onClick={prevTestimonial}
                className="border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white"
              >
                <ChevronLeft className="h-4 w-4 mr-2" />
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={nextTestimonial}
                className="border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white"
              >
                Next
                <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            </div>

            {/* Dots Indicator */}
            <div className="flex justify-center mt-6 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                    index === currentTestimonial ? 'bg-white' : 'bg-gray-600'
                  }`}
                />
              ))}
            </div>
          </motion.div>
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
            {testimonials.map((testimonial, index) => (
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
                      <div className="w-12 h-12 relative overflow-hidden rounded-full">
                        <Image
                          src={testimonial.image}
                          alt={testimonial.name}
                          fill
                          className="object-cover"
                          sizes="48px"
                        />
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
            {[
              { number: '500+', label: 'Happy Clients' },
              { number: '98%', label: 'Satisfaction Rate' },
              { number: '1000+', label: 'Events Covered' },
              { number: '5★', label: 'Average Rating' }
            ].map((stat, index) => (
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
            ))}
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
                className="bg-white text-black hover:bg-gray-200 font-semibold px-8 py-6 text-lg"
                asChild
              >
                <a href="/contact">Book Your Session</a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-black font-semibold px-8 py-6 text-lg"
                asChild
              >
                <a href="/gallery">View Our Portfolio</a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default TestimonialsPage
