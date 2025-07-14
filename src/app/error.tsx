'use client'

import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { AlertTriangle, Home, RefreshCw } from 'lucide-react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-4">
      <div className="text-center max-w-md mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <AlertTriangle className="h-20 w-20 text-red-400 mx-auto mb-6" />
          
          <h1 className="text-4xl font-bold font-poppins mb-4">
            Oops! Something went wrong
          </h1>
          
          <p className="text-gray-400 mb-8 leading-relaxed">
            We're sorry, but something unexpected happened. Don't worry, 
            our team has been notified and we're working to fix it.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={reset}
              className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold px-8 py-3 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105"
            >
              <RefreshCw className="mr-2 h-4 w-4" />
              Try Again
            </Button>

            <Button
              variant="outline"
              className="border-2 border-white text-white hover:bg-white hover:text-black font-semibold px-8 py-3 rounded-lg transition-all duration-300 transform hover:scale-105"
              asChild
            >
              <a href="/">
                <Home className="mr-2 h-4 w-4" />
                Go Home
              </a>
            </Button>
          </div>
          
          <p className="text-gray-500 text-sm mt-8">
            Error ID: {error.digest}
          </p>
        </motion.div>
      </div>
    </div>
  )
}
