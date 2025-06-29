import React from 'react'
import { motion } from 'framer-motion'

interface RiverProgressIndicatorProps {
  currentStep: number // 1-4 (Define, Gather, Craft, Audio Hug)
  className?: string
}

const steps = [
  { id: 1, label: 'Define', path: '/define' },
  { id: 2, label: 'Gather', path: '/gather' },
  { id: 3, label: 'Craft', path: '/craft' },
  { id: 4, label: 'Audio Hug', path: '/audio-hug' }
]

export const RiverProgressIndicator: React.FC<RiverProgressIndicatorProps> = ({ 
  currentStep, 
  className = '' 
}) => {
  return (
    <div className={`fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100 ${className}`}>
      <div className="relative h-20 overflow-hidden">
        {/* River Background - Split into 4 parts */}
        <div className="absolute inset-0 flex">
          {steps.map((step, index) => (
            <div
              key={step.id}
              className="flex-1 relative overflow-hidden"
              style={{
                backgroundImage: `url('/River .webp')`,
                backgroundSize: '400% 100%',
                backgroundPosition: `${index * 33.33}% center`,
                backgroundRepeat: 'no-repeat'
              }}
            >
              {/* Overlay for completed/current/future steps */}
              <motion.div
                className={`absolute inset-0 transition-all duration-500 ${
                  step.id < currentStep
                    ? 'bg-gradient-to-r from-green-500/20 to-green-400/20' // Completed
                    : step.id === currentStep
                    ? 'bg-gradient-to-r from-purple-500/30 to-blue-500/30' // Current
                    : 'bg-gray-500/40' // Future
                }`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.1 }}
              />
              
              {/* Step Content */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                <motion.div
                  className={`w-8 h-8 rounded-full border-2 flex items-center justify-center mb-1 ${
                    step.id < currentStep
                      ? 'bg-green-500 border-green-400' // Completed
                      : step.id === currentStep
                      ? 'bg-purple-600 border-purple-400 ring-2 ring-white/50' // Current
                      : 'bg-gray-400 border-gray-300' // Future
                  }`}
                  whileHover={{ scale: 1.1 }}
                  animate={{
                    scale: step.id === currentStep ? [1, 1.1, 1] : 1
                  }}
                  transition={{
                    scale: {
                      duration: 2,
                      repeat: step.id === currentStep ? Infinity : 0,
                      ease: "easeInOut"
                    }
                  }}
                >
                  <span className="text-sm font-bold">{step.id}</span>
                </motion.div>
                
                <motion.span
                  className={`text-xs font-medium ${
                    step.id === currentStep ? 'text-white font-semibold' : 'text-white/90'
                  }`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 + 0.2 }}
                >
                  {step.label}
                </motion.span>
              </div>

              {/* Flowing Animation for Current Step */}
              {step.id === currentStep && (
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  animate={{
                    x: ['-100%', '100%']
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              )}
            </div>
          ))}
        </div>

        {/* Progress Flow Line */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-200">
          <motion.div
            className="h-full bg-gradient-to-r from-purple-500 to-blue-500"
            initial={{ width: '0%' }}
            animate={{ width: `${(currentStep / 4) * 100}%` }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />
        </div>
      </div>
    </div>
  )
}