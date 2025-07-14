'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { RefreshCw, AlertTriangle, Camera, Wifi, Server } from 'lucide-react'

interface ErrorStateProps {
  title?: string
  message: string
  onRetry?: () => void
  retrying?: boolean
  type?: 'network' | 'server' | 'gallery' | 'general'
  className?: string
}

const ErrorState = ({ 
  title, 
  message, 
  onRetry, 
  retrying = false, 
  type = 'general',
  className = ''
}: ErrorStateProps) => {
  const getIcon = () => {
    switch (type) {
      case 'network':
        return Wifi
      case 'server':
        return Server
      case 'gallery':
        return Camera
      default:
        return AlertTriangle
    }
  }

  const getDefaultTitle = () => {
    switch (type) {
      case 'network':
        return 'Connection Error'
      case 'server':
        return 'Server Error'
      case 'gallery':
        return 'Gallery Unavailable'
      default:
        return 'Something Went Wrong'
    }
  }

  const Icon = getIcon()
  const displayTitle = title || getDefaultTitle()

  return (
    <div className={`text-center py-20 ${className}`}>
      <div className="max-w-md mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-red-500/10 border border-red-500/20 rounded-xl p-8 backdrop-blur-sm"
        >
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4"
          >
            <Icon className="h-8 w-8 text-red-400" />
          </motion.div>
          
          <motion.h3 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-xl font-semibold text-white mb-2"
          >
            {displayTitle}
          </motion.h3>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-red-400 text-sm mb-6 leading-relaxed"
          >
            {message}
          </motion.p>
          
          {onRetry && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <Button 
                onClick={onRetry}
                disabled={retrying}
                className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold px-6 py-3 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                <RefreshCw className={`h-4 w-4 mr-2 ${retrying ? 'animate-spin' : ''}`} />
                {retrying ? 'Retrying...' : 'Try Again'}
              </Button>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  )
}

export default ErrorState
