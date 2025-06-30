import { useState, useEffect } from 'react'
import { Link } from 'wouter'
import { ArrowRight, ArrowLeft, Heart, CheckCircle } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useSoulHug } from '../context/SoulHugContext'
import ProgressIndicator from '../components/ProgressIndicator'
import { PlaceholdersAndVanishInput } from '../components/ui/placeholders-and-vanish-input'

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

  // Animated placeholders for the core feeling input
  const feelingPlaceholders = [
    "deeply appreciated and valued",
    "completely loved and cherished",
    "truly seen and understood",
    "incredibly proud and accomplished",
    "peacefully calm and centered",
    "joyfully celebrated and honored",
    "warmly supported and cared for",
    "confidently empowered and strong",
    "gently comforted and safe",
    "beautifully unique and special"
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

  const handleCoreFeelingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({...formData, coreFeeling: e.target.value})
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#DCB2EF] via-[#C8A8E8] to-[#B1E0EC] relative overflow-hidden pb-20">
      {/* Glass morphism overlay */}
      <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
      
      {/* Floating glass orbs for visual interest */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-white/20 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-white/15 rounded-full blur-2xl animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-white/10 rounded-full blur-lg animate-pulse delay-500"></div>

      {/* Floating back button */}
      <div className="fixed top-6 left-6 z-10">
        <Link href="/">
          <button className="flex items-center justify-center w-12 h-12 bg-white/20 backdrop-blur-md rounded-full shadow-lg hover:shadow-xl transition-all duration-300 border border-white/30 group hover:bg-white/30">
            <ArrowLeft className="w-5 h-5 text-gray-700 group-hover:text-purple-600 transition-colors" />
          </button>
        </Link>
      </div>

      <div className="max-w-2xl mx-auto px-6 py-12 relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-3">
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              DEFINE YOUR HUG
            </span>
          </h1>
          
          <p className="text-lg text-gray-700">
            Tell us about the message you want to create
          </p>
        </div>

        {/* Form */}
        <div className="space-y-6">
          {/* Recipient Field */}
          <div className="space-y-3">
            <label className="flex items-center text-lg font-semibold text-gray-800">
              <Heart className="w-5 h-5 mr-2" />
              <span>Who is this for?</span>
              <span className="text-gray-500 font-normal text-base ml-2">(Optional)</span>
              {completedFields.includes('recipient') && (
                <CheckCircle className="w-5 h-5 text-green-500 ml-2" />
              )}
            </label>
            <input
              type="text"
              value={formData.recipient}
              onChange={(e) => setFormData({...formData, recipient: e.target.value})}
              placeholder="Enter their name or leave blank..."
              className={`w-full px-4 py-3 bg-white/70 backdrop-blur-sm border-2 rounded-xl transition-all duration-300 text-gray-900 placeholder-gray-500 ${
                completedFields.includes('recipient')
                  ? 'border-green-400 bg-green-50/70'
                  : 'border-white/40 hover:border-white/60 focus:border-purple-400 focus:bg-white/80'
              }`}
            />
          </div>

          {/* Core Feeling Field with Animated Input */}
          <div className="space-y-3">
            <label className="flex items-center text-lg font-semibold text-gray-800">
              <Heart className="w-5 h-5 mr-2" />
              <span>How do you want them to feel?</span>
              <span className="text-red-500 ml-1">*</span>
              {completedFields.includes('coreFeeling') && (
                <CheckCircle className="w-5 h-5 text-green-500 ml-2" />
              )}
            </label>
            
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <PlaceholdersAndVanishInput
                placeholders={feelingPlaceholders}
                onChange={handleCoreFeelingChange}
                value={formData.coreFeeling}
                className={`bg-white/70 backdrop-blur-sm ${
                  completedFields.includes('coreFeeling')
                    ? 'border-green-400 bg-green-50/70'
                    : 'border-white/40 hover:border-white/60 focus-within:border-purple-400 focus-within:bg-white/80'
                }`}
              />
            </motion.div>
          </div>

          {/* Two Column Layout for Occasion and Tone */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Occasion Field */}
            <div className="space-y-3">
              <label className="flex items-center text-lg font-semibold text-gray-800">
                <Heart className="w-5 h-5 mr-2" />
                <span>Occasion</span>
                {completedFields.includes('occasion') && (
                  <CheckCircle className="w-5 h-5 text-green-500 ml-2" />
                )}
              </label>
              <select
                value={formData.occasion}
                onChange={(e) => setFormData({...formData, occasion: e.target.value})}
                className={`w-full px-4 py-3 bg-white/70 backdrop-blur-sm border-2 rounded-xl transition-all duration-300 text-gray-900 appearance-none cursor-pointer ${
                  completedFields.includes('occasion')
                    ? 'border-green-400 bg-green-50/70'
                    : 'border-white/40 hover:border-white/60 focus:border-purple-400 focus:bg-white/80'
                }`}
              >
                <option value="">Select occasion...</option>
                {occasions.map(occasion => (
                  <option key={occasion} value={occasion}>{occasion}</option>
                ))}
              </select>
            </div>

            {/* Tone Field */}
            <div className="space-y-3">
              <label className="flex items-center text-lg font-semibold text-gray-800">
                <Heart className="w-5 h-5 mr-2" />
                <span>Tone</span>
                <span className="text-red-500 ml-1">*</span>
                {completedFields.includes('tone') && (
                  <CheckCircle className="w-5 h-5 text-green-500 ml-2" />
                )}
              </label>
              <select
                value={formData.tone}
                onChange={(e) => setFormData({...formData, tone: e.target.value})}
                className={`w-full px-4 py-3 bg-white/70 backdrop-blur-sm border-2 rounded-xl transition-all duration-300 text-gray-900 appearance-none cursor-pointer ${
                  completedFields.includes('tone')
                    ? 'border-green-400 bg-green-50/70'
                    : 'border-white/40 hover:border-white/60 focus:border-purple-400 focus:bg-white/80'
                }`}
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
                className="text-sm text-red-600 mb-4 bg-red-50/80 backdrop-blur-sm border border-red-200/50 rounded-xl px-4 py-3"
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
                  ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg hover:shadow-xl backdrop-blur-sm'
                  : 'bg-gray-200/70 text-gray-400 cursor-not-allowed backdrop-blur-sm'
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