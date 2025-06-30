import { useState, useEffect } from 'react'
import { Link } from 'wouter'
import { ArrowRight, ArrowLeft, Heart, CheckCircle } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useSoulHug } from '../context/SoulHugContext'
import ProgressIndicator from '../components/ProgressIndicator'

export default function DefinePage() {
  const { currentSoulHug, updateCurrentSoulHug } = useSoulHug()
  
  const [formData, setFormData] = useState({
    recipient: currentSoulHug.recipient || '',
    coreFeeling: currentSoulHug.coreFeeling || '',
    occasion: currentSoulHug.occasion || '',
    tone: currentSoulHug.tone || ''
  })

  const [completedFields, setCompletedFields] = useState<string[]>([])

  const occasions = [
    'Birthday', 'Anniversary', 'Graduation', 'New Job', 'Difficult Time',
    'Just Because', 'Thank You', 'Apology', 'Encouragement', 'Celebration'
  ]

  const tones = [
    'Warm & Loving', 'Playful & Fun', 'Deep & Meaningful', 'Gentle & Comforting',
    'Inspiring & Uplifting', 'Heartfelt & Sincere', 'Light & Cheerful',
    'Professional & Respectful', 'Serious & Thoughtful', 'Grateful & Appreciative'
  ]

  const canProceed = formData.coreFeeling.trim().length > 0 && formData.tone.length > 0

  // Calculate completed fields
  useEffect(() => {
    const completed = []
    if (formData.recipient.trim()) completed.push('recipient')
    if (formData.coreFeeling.trim()) completed.push('coreFeeling')
    if (formData.occasion) completed.push('occasion')
    if (formData.tone) completed.push('tone')
    
    setCompletedFields(completed)
  }, [formData])

  const handleContinue = () => {
    updateCurrentSoulHug({
      recipient: formData.recipient,
      coreFeeling: formData.coreFeeling,
      occasion: formData.occasion,
      tone: formData.tone
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f5faff] via-[#e9f3ff] to-[#fdfdff] pb-20">

      {/* Floating back button */}
      <div className="fixed top-6 left-6 z-10">
        <Link href="/">
          <button className="flex items-center justify-center w-12 h-12 bg-white/10 backdrop-blur-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300 border border-white/20 group hover:bg-white/20">
            <ArrowLeft className="w-5 h-5 text-primary group-hover:text-secondary transition-colors" />
          </button>
        </Link>
      </div>

      <div className="max-w-2xl mx-auto px-6 py-12 page-content">
        {/* Header */}
        <div className="text-center mb-8">
          <motion.div
            className="relative mx-auto mb-6 md:mb-8 w-16 h-16 sm:w-20 sm:h-20"
            initial={{ scale: 0, rotate: -180, opacity: 0 }}
            animate={{ 
              scale: [0, 1.2, 1],
              rotate: [-180, 0, 0],
              opacity: [0, 1, 1]
            }}
            transition={{ 
              duration: 1.5,
              ease: "easeOut",
              times: [0, 0.7, 1]
            }}
            whileHover={{ 
              scale: 1.1,
              rotate: [0, -5, 5, -5, 0],
              transition: { 
                rotate: { duration: 0.5, ease: "easeInOut" },
                scale: { duration: 0.2 }
              }
            }}
          >
            {/* Splash effect background */}
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{
                background: 'radial-gradient(circle, rgba(139, 92, 246, 0.3) 0%, rgba(59, 130, 246, 0.2) 50%, transparent 70%)'
              }}
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.5, 0.8, 0.5]
              }}
              transition={{
                duration: 3,
                repeat: 999999,
                ease: "easeInOut"
              }}
            />
            
            {/* Secondary splash ring */}
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-purple-400/30"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0, 0.6, 0]
              }}
              transition={{
                duration: 2,
                repeat: 999999,
                ease: "easeInOut",
                delay: 0.5
              }}
            />
            
            {/* Main logo - using Heart icon as fallback */}
            <motion.div
              className="w-full h-full flex items-center justify-center relative z-10"
              animate={{
                y: [0, -2, 0],
              }}
              transition={{
                duration: 4,
                repeat: 999999,
                ease: "easeInOut"
              }}
            >
              <Heart className="w-12 h-12 text-purple-600" />
            </motion.div>
            
            {/* Sparkle effects */}
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full"
                style={{
                  top: `${20 + Math.sin(i * 60 * Math.PI / 180) * 30}%`,
                  left: `${50 + Math.cos(i * 60 * Math.PI / 180) * 40}%`,
                }}
                animate={{
                  scale: [0, 1, 0],
                  opacity: [0, 1, 0],
                  rotate: [0, 180, 360]
                }}
                transition={{
                  duration: 2,
                  repeat: 999999,
                  delay: i * 0.3,
                  ease: "easeInOut"
                }}
              />
            ))}
          </motion.div>
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-800 mb-4 md:mb-6">
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              SoulLift
            </span>
            <span className="block text-2xl sm:text-3xl lg:text-4xl font-normal text-gray-700 mt-2">Audio</span>
          </h1>
          
          <h1 className="text-3xl font-bold mb-3 text-primary">
            DEFINE YOUR HUG
          </h1>
          
          <p className="text-lg text-secondary">
            Tell us about the message you want to create
          </p>
        </div>

        {/* Form */}
        <div className="space-y-6">
          {/* Recipient Field */}
          <div className="space-y-3">
            <label className="flex items-center text-lg font-semibold text-primary">
              <Heart className="w-5 h-5 mr-2" />
              <span>Who is this for?</span>
              <span className="font-normal text-base ml-2 text-muted">(Optional)</span>
              {completedFields.includes('recipient') && (
                <CheckCircle className="w-5 h-5 text-green-400 ml-2" />
              )}
            </label>
            <input
              type="text"
              value={formData.recipient}
              onChange={(e) => setFormData({...formData, recipient: e.target.value})}
              placeholder="Enter their name or leave blank..."
              className={`w-full px-4 py-3 bg-white/10 backdrop-blur-lg border-2 rounded-xl transition-all duration-300 placeholder-purple-400 ${
                completedFields.includes('recipient')
                  ? 'border-green-400 bg-white/20'
                  : 'border-white/20 hover:border-white/30 focus:border-white/40 focus:bg-white/20'
              }`}
              style={{ color: '#4D1A77' }}
            />
          </div>

          {/* Core Feeling Field */}
          <div className="space-y-3">
            <label className="flex items-center text-lg font-semibold text-primary">
              <Heart className="w-5 h-5 mr-2" />
              <span>How do you want them to feel?</span>
              <span className="text-red-400 ml-1">*</span>
              {completedFields.includes('coreFeeling') && (
                <CheckCircle className="w-5 h-5 text-green-400 ml-2" />
              )}
            </label>
            <input
              type="text"
              value={formData.coreFeeling}
              onChange={(e) => setFormData({...formData, coreFeeling: e.target.value})}
              placeholder="e.g., deeply appreciated, truly valued, completely loved..."
              className={`w-full px-4 py-3 bg-white/10 backdrop-blur-lg border-2 rounded-xl transition-all duration-300 placeholder-purple-400 ${
                completedFields.includes('coreFeeling')
                  ? 'border-green-400 bg-white/20'
                  : 'border-white/20 hover:border-white/30 focus:border-white/40 focus:bg-white/20'
              }`}
              style={{ color: '#4D1A77' }}
              required
            />
          </div>

          {/* Two Column Layout for Occasion and Tone */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Occasion Field */}
            <div className="space-y-3">
              <label className="flex items-center text-lg font-semibold text-primary">
                <Heart className="w-5 h-5 mr-2" />
                <span>Occasion</span>
                {completedFields.includes('occasion') && (
                  <CheckCircle className="w-5 h-5 text-green-400 ml-2" />
                )}
              </label>
              <select
                value={formData.occasion}
                onChange={(e) => setFormData({...formData, occasion: e.target.value})}
                className={`w-full px-4 py-3 bg-white/10 backdrop-blur-lg border-2 rounded-xl transition-all duration-300 appearance-none cursor-pointer ${
                  completedFields.includes('occasion')
                    ? 'border-green-400 bg-white/20'
                    : 'border-white/20 hover:border-white/30 focus:border-white/40 focus:bg-white/20'
                }`}
                style={{ color: '#4D1A77' }}
              >
                <option value="">Select occasion...</option>
                {occasions.map(occasion => (
                  <option key={occasion} value={occasion}>{occasion}</option>
                ))}
              </select>
            </div>

            {/* Tone Field */}
            <div className="space-y-3">
              <label className="flex items-center text-lg font-semibold text-primary">
                <Heart className="w-5 h-5 mr-2" />
                <span>Tone</span>
                <span className="text-red-400 ml-1">*</span>
                {completedFields.includes('tone') && (
                  <CheckCircle className="w-5 h-5 text-green-400 ml-2" />
                )}
              </label>
              <select
                value={formData.tone}
                onChange={(e) => setFormData({...formData, tone: e.target.value})}
                className={`w-full px-4 py-3 bg-white/10 backdrop-blur-lg border-2 rounded-xl transition-all duration-300 appearance-none cursor-pointer ${
                  completedFields.includes('tone')
                    ? 'border-green-400 bg-white/20'
                    : 'border-white/20 hover:border-white/30 focus:border-white/40 focus:bg-white/20'
                }`}
                style={{ color: '#4D1A77' }}
                required
              >
                <option value="">Select tone...</option>
                {tones.map(tone => (
                  <option key={tone} value={tone}>{tone}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Continue Button */}
        <div className="mt-8 text-center">
          <AnimatePresence>
            {!canProceed && (
              <motion.p 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-sm text-red-600 mb-4 bg-red-100/80 backdrop-blur-sm border border-red-300 rounded-xl px-4 py-3"
              >
                Please fill in the required fields: feeling and tone
              </motion.p>
            )}
          </AnimatePresence>
          
          <Link href="/gather">
            <motion.button 
              onClick={handleContinue}
              disabled={!canProceed}
              whileHover={canProceed ? { scale: 1.05 } : {}}
              whileTap={canProceed ? { scale: 0.95 } : {}}
              className={`inline-flex items-center px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 ${
                canProceed
                  ? 'bg-white/10 backdrop-blur-lg border border-white/20 hover:bg-white/20 shadow-lg text-primary'
                  : 'bg-white/5 cursor-not-allowed border border-white/10 text-muted'
              }`}
            >
              <span>Continue to Gather</span>
              <ArrowRight className="w-5 h-5 ml-2" />
            </motion.button>
          </Link>
        </div>

        <ProgressIndicator className="mt-8" />
      </div>
    </div>
  )
}