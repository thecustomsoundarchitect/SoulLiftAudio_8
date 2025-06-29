import { useState, useEffect } from 'react'
import { Link } from 'wouter'
import { ArrowRight, ArrowLeft, Heart, Sparkles, CheckCircle, Star, Zap, Target, Palette } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useSoulHug } from '../context/SoulHugContext'

export default function DefinePage() {
  const { currentSoulHug, updateCurrentSoulHug } = useSoulHug()
  
  const [formData, setFormData] = useState({
    recipient: currentSoulHug.recipient || '',
    coreFeeling: currentSoulHug.coreFeeling || '',
    occasion: currentSoulHug.occasion || '',
    tone: currentSoulHug.tone || ''
  })

  const [focusedField, setFocusedField] = useState<string | null>(null)
  const [completedFields, setCompletedFields] = useState<string[]>([])
  const [showCelebration, setShowCelebration] = useState(false)
  const [progress, setProgress] = useState(0)

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

  // Calculate progress and update completed fields
  useEffect(() => {
    const completed = []
    if (formData.recipient.trim()) completed.push('recipient')
    if (formData.coreFeeling.trim()) completed.push('coreFeeling')
    if (formData.occasion) completed.push('occasion')
    if (formData.tone) completed.push('tone')
    
    setCompletedFields(completed)
    setProgress((completed.length / 4) * 100)

    // Show celebration when all required fields are complete
    if (formData.coreFeeling.trim() && formData.tone && !showCelebration) {
      setShowCelebration(true)
      setTimeout(() => setShowCelebration(false), 2000)
    }
  }, [formData])

  const handleContinue = () => {
    updateCurrentSoulHug({
      recipient: formData.recipient,
      coreFeeling: formData.coreFeeling,
      occasion: formData.occasion,
      tone: formData.tone
    })
  }

  const getFieldIcon = (fieldName: string) => {
    switch (fieldName) {
      case 'recipient': return <Heart className="w-5 h-5" />
      case 'coreFeeling': return <Target className="w-5 h-5" />
      case 'occasion': return <Star className="w-5 h-5" />
      case 'tone': return <Palette className="w-5 h-5" />
      default: return null
    }
  }

  const suggestionPrompts = [
    "deeply appreciated and valued",
    "completely loved and supported", 
    "truly seen and understood",
    "incredibly proud and inspired",
    "genuinely cared for and cherished"
  ]

  const [currentSuggestion, setCurrentSuggestion] = useState(0)

  useEffect(() => {
    if (focusedField === 'coreFeeling' && !formData.coreFeeling.trim()) {
      const interval = setInterval(() => {
        setCurrentSuggestion(prev => (prev + 1) % suggestionPrompts.length)
      }, 2000)
      return () => clearInterval(interval)
    }
  }, [focusedField, formData.coreFeeling])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50/20 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ 
            x: [0, 100, 0],
            y: [0, -50, 0],
            rotate: [0, 180, 360]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-purple-200/30 to-blue-200/30 rounded-full blur-xl"
        />
        <motion.div
          animate={{ 
            x: [0, -80, 0],
            y: [0, 100, 0],
            rotate: [360, 180, 0]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-r from-pink-200/30 to-purple-200/30 rounded-full blur-xl"
        />
      </div>

      {/* Floating back button */}
      <motion.div 
        className="fixed top-6 left-6 z-10"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <Link href="/">
          <button className="flex items-center justify-center w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100/50 group">
            <ArrowLeft className="w-5 h-5 text-gray-600 group-hover:text-purple-600 transition-colors" />
          </button>
        </Link>
      </motion.div>

      {/* Progress bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-gray-200 z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <motion.div
          className="h-full bg-gradient-to-r from-purple-500 to-blue-500"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      </motion.div>

      <div className="max-w-2xl mx-auto px-6 py-20 relative z-10">
        {/* Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div 
            className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-purple-500 via-purple-600 to-blue-600 rounded-3xl mb-8 shadow-xl shadow-purple-200/50 relative overflow-hidden"
            whileHover={{ scale: 1.05, rotate: 5 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent"
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            />
            <Heart className="w-10 h-10 text-white relative z-10" />
          </motion.div>
          
          <motion.h1 
            className="text-4xl font-bold text-gray-900 mb-4 tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Define Your Hug
          </motion.h1>
          
          <motion.p 
            className="text-xl text-gray-600 leading-relaxed max-w-lg mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            Let's begin crafting your heartfelt Soul Hug. Tell us about the message you want to create.
          </motion.p>
        </motion.div>

        {/* Form */}
        <motion.div 
          className="space-y-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          {/* Recipient Field */}
          <motion.div 
            className="space-y-4"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7, duration: 0.5 }}
          >
            <motion.label 
              className="flex items-center text-lg font-semibold text-gray-800"
              whileHover={{ x: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {getFieldIcon('recipient')}
              <span className="ml-2">Who is this for?</span>
              <span className="text-gray-400 font-normal text-base ml-2">(Optional)</span>
              {completedFields.includes('recipient') && (
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  className="ml-2"
                >
                  <CheckCircle className="w-5 h-5 text-green-500" />
                </motion.div>
              )}
            </motion.label>
            <div className="relative">
              <motion.input
                type="text"
                value={formData.recipient}
                onChange={(e) => setFormData({...formData, recipient: e.target.value})}
                onFocus={() => setFocusedField('recipient')}
                onBlur={() => setFocusedField(null)}
                placeholder="Enter their name or leave blank..."
                className={`w-full px-6 py-5 bg-white/80 backdrop-blur-sm border-2 rounded-3xl transition-all duration-300 text-gray-900 placeholder-gray-400 text-lg ${
                  focusedField === 'recipient' 
                    ? 'border-purple-400 shadow-xl shadow-purple-100/50 bg-white scale-[1.02]' 
                    : completedFields.includes('recipient')
                      ? 'border-green-400 bg-green-50/50 shadow-lg shadow-green-100/50'
                      : 'border-gray-200 hover:border-gray-300 hover:shadow-lg'
                }`}
                whileFocus={{ scale: 1.02 }}
                whileHover={{ scale: 1.01 }}
              />
              <AnimatePresence>
                {focusedField === 'recipient' && (
                  <motion.div 
                    className="absolute -bottom-10 left-0 text-sm text-gray-500"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    You can write a name, like 'Dad' or 'My neighbor'
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Core Feeling Field */}
          <motion.div 
            className="space-y-4"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            <motion.label 
              className="flex items-center text-lg font-semibold text-gray-800"
              whileHover={{ x: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {getFieldIcon('coreFeeling')}
              <span className="ml-2">How do you want them to feel?</span>
              <span className="text-red-500 ml-1">*</span>
              {completedFields.includes('coreFeeling') && (
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  className="ml-2"
                >
                  <CheckCircle className="w-5 h-5 text-green-500" />
                </motion.div>
              )}
            </motion.label>
            <div className="relative">
              <motion.input
                type="text"
                value={formData.coreFeeling}
                onChange={(e) => setFormData({...formData, coreFeeling: e.target.value})}
                onFocus={() => setFocusedField('coreFeeling')}
                onBlur={() => setFocusedField(null)}
                placeholder={focusedField === 'coreFeeling' && !formData.coreFeeling.trim() ? suggestionPrompts[currentSuggestion] : "e.g., deeply appreciated, truly valued, completely loved..."}
                className={`w-full px-6 py-5 bg-white/80 backdrop-blur-sm border-2 rounded-3xl transition-all duration-300 text-gray-900 placeholder-gray-400 text-lg ${
                  focusedField === 'coreFeeling' 
                    ? 'border-purple-400 shadow-xl shadow-purple-100/50 bg-white scale-[1.02]' 
                    : completedFields.includes('coreFeeling')
                      ? 'border-green-400 bg-green-50/50 shadow-lg shadow-green-100/50' 
                      : 'border-gray-200 hover:border-gray-300 hover:shadow-lg'
                }`}
                required
                whileFocus={{ scale: 1.02 }}
                whileHover={{ scale: 1.01 }}
              />
              <AnimatePresence>
                {focusedField === 'coreFeeling' && (
                  <motion.div 
                    className="absolute -bottom-10 left-0 text-sm text-gray-500"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    This is the heart of your message
                  </motion.div>
                )}
              </AnimatePresence>
              
              {/* Suggestion chips */}
              <AnimatePresence>
                {focusedField === 'coreFeeling' && !formData.coreFeeling.trim() && (
                  <motion.div 
                    className="absolute top-full left-0 right-0 mt-2 flex flex-wrap gap-2"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    {suggestionPrompts.map((prompt, index) => (
                      <motion.button
                        key={prompt}
                        onClick={() => setFormData({...formData, coreFeeling: prompt})}
                        className="px-3 py-1 bg-purple-100 hover:bg-purple-200 text-purple-700 rounded-full text-sm transition-colors"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        {prompt}
                      </motion.button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Optional Context Section */}
          <motion.div 
            className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 border border-gray-100/50 shadow-lg"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.5 }}
            whileHover={{ shadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)" }}
          >
            <motion.h3 
              className="text-xl font-semibold text-gray-800 mb-6 flex items-center"
              whileHover={{ x: 5 }}
            >
              <Sparkles className="w-6 h-6 mr-2 text-purple-600" />
              Optional Context
            </motion.h3>
            
            <div className="space-y-8">
              {/* Occasion Field */}
              <motion.div 
                className="space-y-4"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.0, duration: 0.4 }}
              >
                <motion.label 
                  className="flex items-center text-lg font-medium text-gray-700"
                  whileHover={{ x: 3 }}
                >
                  {getFieldIcon('occasion')}
                  <span className="ml-2">Occasion</span>
                  {completedFields.includes('occasion') && (
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      className="ml-2"
                    >
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    </motion.div>
                  )}
                </motion.label>
                <div className="relative">
                  <motion.select
                    value={formData.occasion}
                    onChange={(e) => setFormData({...formData, occasion: e.target.value})}
                    onFocus={() => setFocusedField('occasion')}
                    onBlur={() => setFocusedField(null)}
                    className={`w-full px-6 py-5 bg-white border-2 rounded-2xl transition-all duration-300 text-gray-900 appearance-none cursor-pointer text-lg ${
                      focusedField === 'occasion' 
                        ? 'border-purple-400 shadow-lg shadow-purple-100/50 scale-[1.01]' 
                        : completedFields.includes('occasion')
                          ? 'border-green-400 bg-green-50/50'
                          : 'border-gray-200 hover:border-gray-300'
                    }`}
                    whileFocus={{ scale: 1.01 }}
                    whileHover={{ scale: 1.005 }}
                  >
                    <option value="">Select occasion...</option>
                    {occasions.map(occasion => (
                      <option key={occasion} value={occasion}>{occasion}</option>
                    ))}
                  </motion.select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-6 pointer-events-none">
                    <motion.svg 
                      className="w-6 h-6 text-gray-400" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                      animate={{ rotate: focusedField === 'occasion' ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </motion.svg>
                  </div>
                </div>
              </motion.div>

              {/* Tone Field */}
              <motion.div 
                className="space-y-4"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.1, duration: 0.4 }}
              >
                <motion.label 
                  className="flex items-center text-lg font-medium text-gray-700"
                  whileHover={{ x: 3 }}
                >
                  {getFieldIcon('tone')}
                  <span className="ml-2">Tone</span>
                  <span className="text-red-500 ml-1">*</span>
                  {completedFields.includes('tone') && (
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      className="ml-2"
                    >
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    </motion.div>
                  )}
                </motion.label>
                <div className="relative">
                  <motion.select
                    value={formData.tone}
                    onChange={(e) => setFormData({...formData, tone: e.target.value})}
                    onFocus={() => setFocusedField('tone')}
                    onBlur={() => setFocusedField(null)}
                    className={`w-full px-6 py-5 bg-white border-2 rounded-2xl transition-all duration-300 text-gray-900 appearance-none cursor-pointer text-lg ${
                      focusedField === 'tone' 
                        ? 'border-purple-400 shadow-lg shadow-purple-100/50 scale-[1.01]' 
                        : completedFields.includes('tone')
                          ? 'border-green-400 bg-green-50/50' 
                          : 'border-gray-200 hover:border-gray-300'
                    }`}
                    required
                    whileFocus={{ scale: 1.01 }}
                    whileHover={{ scale: 1.005 }}
                  >
                    <option value="">Select tone...</option>
                    {tones.map(tone => (
                      <option key={tone} value={tone}>{tone}</option>
                    ))}
                  </motion.select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-6 pointer-events-none">
                    <motion.svg 
                      className="w-6 h-6 text-gray-400" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                      animate={{ rotate: focusedField === 'tone' ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </motion.svg>
                  </div>
                  <AnimatePresence>
                    {focusedField === 'tone' && (
                      <motion.div 
                        className="absolute -bottom-10 left-0 text-sm text-gray-500"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                      >
                        Choose the emotional style for your message
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>

        {/* Continue Button */}
        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.5 }}
        >
          <AnimatePresence>
            {!canProceed && (
              <motion.p 
                className="text-sm text-red-500 mb-6 bg-red-50 border border-red-200 rounded-2xl px-4 py-3"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
              >
                Please fill in the required fields: {!formData.coreFeeling.trim() && 'feeling'} {!formData.coreFeeling.trim() && !formData.tone && ' and '} {!formData.tone && 'tone'}
              </motion.p>
            )}
          </AnimatePresence>
          
          <Link href="/gather">
            <motion.button 
              onClick={handleContinue}
              disabled={!canProceed}
              className={`inline-flex items-center px-12 py-5 rounded-3xl font-semibold text-xl transition-all duration-300 relative overflow-hidden ${
                canProceed
                  ? 'bg-gradient-to-r from-purple-600 via-purple-700 to-blue-600 text-white shadow-xl shadow-purple-200/50'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
              whileHover={canProceed ? { 
                scale: 1.05, 
                boxShadow: "0 25px 50px -12px rgba(139, 92, 246, 0.4)" 
              } : {}}
              whileTap={canProceed ? { scale: 0.98 } : {}}
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
            >
              {canProceed && (
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
                  animate={{ x: ["-100%", "100%"] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                />
              )}
              <span className="relative z-10">Continue to Gather</span>
              <motion.div
                className="relative z-10 ml-3"
                animate={{ x: canProceed ? [0, 5, 0] : 0 }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <ArrowRight className="w-6 h-6" />
              </motion.div>
              {canProceed && (
                <motion.div
                  className="relative z-10 ml-2"
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                >
                  <Sparkles className="w-5 h-5 opacity-70" />
                </motion.div>
              )}
            </motion.button>
          </Link>
        </motion.div>

        {/* Enhanced Progress Indicator */}
        <motion.div 
          className="mt-12 flex justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.5 }}
        >
          <div className="flex space-x-3">
            <motion.div 
              className="h-3 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full shadow-lg relative overflow-hidden"
              initial={{ width: 12 }}
              animate={{ width: progress > 0 ? 48 : 12 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              {progress > 0 && (
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-white/30 to-transparent"
                  animate={{ x: ["-100%", "100%"] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                />
              )}
            </motion.div>
            {[1, 2, 3].map((step) => (
              <motion.div
                key={step}
                className="w-3 h-3 bg-gray-200 rounded-full"
                whileHover={{ scale: 1.2 }}
                animate={{ 
                  backgroundColor: progress >= (step * 25) ? "#8B5CF6" : "#E5E7EB",
                  scale: progress >= (step * 25) ? 1.1 : 1
                }}
                transition={{ duration: 0.3 }}
              />
            ))}
          </div>
        </motion.div>

        {/* Celebration Animation */}
        <AnimatePresence>
          {showCelebration && (
            <motion.div
              className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {[...Array(12)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-4 h-4 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full"
                  initial={{ 
                    scale: 0,
                    x: 0,
                    y: 0,
                    rotate: 0
                  }}
                  animate={{ 
                    scale: [0, 1, 0],
                    x: Math.cos(i * 30 * Math.PI / 180) * 200,
                    y: Math.sin(i * 30 * Math.PI / 180) * 200,
                    rotate: 360
                  }}
                  transition={{ 
                    duration: 2,
                    ease: "easeOut"
                  }}
                />
              ))}
              <motion.div
                className="text-4xl"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: [0, 1.2, 1], rotate: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                🎉
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}