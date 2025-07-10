'use client'

import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Camera, Video, Heart, Users, Sparkles, Calendar } from 'lucide-react'

const ServicesOverview = () => {
  const services = [
    {
      icon: Heart,
      title: 'Pre-Wedding',
      description: 'Romantic and intimate pre-wedding shoots that capture your love story in beautiful locations.',
      features: ['Couple Photography', 'Location Scouting', 'Outfit Consultation', 'Digital Gallery']
    },
    {
      icon: Camera,
      title: 'Wedding Photography',
      description: 'Complete wedding day coverage from getting ready to the final dance, preserving every precious moment.',
      features: ['Full Day Coverage', 'Candid Moments', 'Family Portraits', 'High-Res Images']
    },
    {
      icon: Sparkles,
      title: 'Fashion Photography',
      description: 'Professional fashion shoots for models, brands, and personal portfolios with creative styling.',
      features: ['Studio & Outdoor', 'Creative Direction', 'Retouching', 'Portfolio Building']
    },
    {
      icon: Users,
      title: 'Event Photography',
      description: 'Corporate events, parties, and celebrations captured with professionalism and creativity.',
      features: ['Event Coverage', 'Group Photos', 'Candid Shots', 'Quick Delivery']
    },
    {
      icon: Video,
      title: 'Videography',
      description: 'Cinematic videos and reels that tell your story with motion, emotion, and artistry.',
      features: ['4K Recording', 'Drone Footage', 'Color Grading', 'Music Sync']
    },
    {
      icon: Calendar,
      title: 'Custom Packages',
      description: 'Tailored photography and videography packages designed to meet your specific needs and budget.',
      features: ['Flexible Pricing', 'Custom Duration', 'Add-on Services', 'Payment Plans']
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
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
    <section className="py-20 bg-gradient-to-b from-black to-gray-900">
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
            Our <span className="gradient-text">Services</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            From intimate moments to grand celebrations, we offer comprehensive photography 
            and videography services tailored to capture your unique story.
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              variants={itemVariants}
              whileHover={{ y: -10 }}
              className="group"
            >
              <Card className="bg-gray-800/80 border-gray-600 hover:border-gray-500 transition-all duration-300 h-full backdrop-blur-sm">
                <CardContent className="p-8">
                  <div className="flex items-center mb-6">
                    <div className="p-3 bg-white/10 rounded-lg group-hover:bg-white/20 transition-colors duration-300">
                      <service.icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-semibold text-white ml-4 font-poppins">
                      {service.title}
                    </h3>
                  </div>
                  
                  <p className="text-gray-300 mb-6 leading-relaxed">
                    {service.description}
                  </p>
                  
                  <ul className="space-y-2">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-gray-400">
                        <div className="w-2 h-2 bg-white rounded-full mr-3 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-gray-800/80 to-gray-700/80 rounded-2xl p-8 backdrop-blur-sm border border-gray-500">
            <h3 className="text-3xl font-bold text-white mb-4 font-poppins">
              Ready to Create Something Beautiful?
            </h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Let's discuss your vision and create a custom package that perfectly captures your special moments.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="/contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-black hover:bg-gray-200 font-semibold px-8 py-3 rounded-lg transition-colors duration-300"
              >
                Get a Quote
              </motion.a>
              <motion.a
                href="https://wa.me/919662098555"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border-2 border-white text-white hover:bg-white hover:text-black font-semibold px-8 py-3 rounded-lg transition-colors duration-300 bg-black/20 backdrop-blur-sm"
              >
                WhatsApp Us
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default ServicesOverview
