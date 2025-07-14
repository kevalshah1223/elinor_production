'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Camera } from 'lucide-react'

const Loading = () => {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="text-center">
        <motion.div
          animate={{
            scale: [1, 1.1, 1]
          }}
          transition={{
            scale: {
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }
          }}
          className="mb-6"
        >
          <Image
            src="/el_white.png"
            alt="Elinor Production Logo"
            width={80}
            height={80}
            className="h-20 w-auto mx-auto"
          />
        </motion.div>
        
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-2xl font-bold text-white mb-4 font-poppins"
        >
          Elinor Production
        </motion.h2>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="flex space-x-1 justify-center"
        >
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              animate={{
                y: [0, -10, 0]
              }}
              transition={{
                duration: 0.6,
                repeat: Infinity,
                delay: i * 0.2
              }}
              className="w-2 h-2 bg-white rounded-full"
            />
          ))}
        </motion.div>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-gray-400 mt-4"
        >
          Loading beautiful moments...
        </motion.p>
      </div>
    </div>
  )
}

export default Loading
