import { useLocation } from 'wouter'
import { motion } from 'framer-motion'

export default function ProgressIndicator() {
  const [location] = useLocation()
  
  // Determine current stage based on location
  const getCurrentStage = () => {
    switch (location) {
      case '/define': return 1
      case '/gather': return 2
      case '/craft': return 3
      case '/audio-hug': return 4
      default: return 0
    }
  }

  const currentStage = getCurrentStage()

  return (
    <div className="w-full bg-white border-b border-gray-100">
      <div className="max-w-4xl mx-auto px-6 py-4">
        <div className="relative w-full h-16 overflow-hidden rounded-lg">
          {/* Base image container */}
          <div className="relative w-full h-full">
            {/* Split the image into 4 equal parts */}
            {[1, 2, 3, 4].map((stage) => (
              <motion.div
                key={stage}
                className="absolute top-0 h-full overflow-hidden"
                style={{
                  left: `${(stage - 1) * 25}%`,
                  width: '25%'
                }}
                initial={{ opacity: 0 }}
                animate={{ 
                  opacity: currentStage >= stage ? 1 : 0.2
                }}
                transition={{ duration: 0.5, delay: currentStage >= stage ? (stage - 1) * 0.1 : 0 }}
              >
                <img
                  src="/River .webp"
                  alt=""
                  className="w-full h-full object-cover"
                  style={{
                    objectPosition: `${(stage - 1) * 25}% center`,
                    transform: `translateX(-${(stage - 1) * 100}%)`
                  }}
                />
                {/* Overlay for incomplete stages */}
                {currentStage < stage && (
                  <div className="absolute inset-0 bg-gray-300/70" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}