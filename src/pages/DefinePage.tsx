import { useState, useEffect } from 'react'
import { Link } from 'wouter'
import { ArrowRight, ArrowLeft, Heart, CheckCircle } from 'lucide-react'
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
    <div className="min-h-screen bg-white pb-20">
      {/* Floating back button */}
      <div className="fixed top-6 left-6 z-10">
        <Link href="/">
          <button className="flex items-center justify-center w-12 h-12 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 group">
            <ArrowLeft className="w-5 h-5 text-gray-600 group-hover:text-purple-600 transition-colors" />
          </button>
        </Link>
      </div>

      <div className="max-w-2xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-3">
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              DEFINE YOUR HUG
            </span>
          </h1>
          
          <p className="text-lg text-gray-600">
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
              <span className="text-gray-400 font-normal text-base ml-2">(Optional)</span>
              {completedFields.includes('recipient') && (
                <CheckCircle className="w-5 h-5 text-green-500 ml-2" />
              )}
            </label>
            <input
              type="text"
              value={formData.recipient}
              onChange={(e) => setFormData({...formData, recipient: e.target.value})}
              placeholder="Enter their name or leave blank..."
              className={`w-full px-4 py-3 bg-white border-2 rounded-xl transition-all duration-300 text-gray-900 placeholder-gray-400 ${
                completedFields.includes('recipient')
                  ? 'border-green-400 bg-green-50/50'
                  : 'border-gray-200 hover:border-gray-300 focus:border-purple-400'
              }`}
            />
          </div>

          {/* Core Feeling Field */}
          <div className="space-y-3">
            <label className="flex items-center text-lg font-semibold text-gray-800">
              <Heart className="w-5 h-5 mr-2" />
              <span>How do you want them to feel?</span>
              <span className="text-red-500 ml-1">*</span>
              {completedFields.includes('coreFeeling') && (
                <CheckCircle className="w-5 h-5 text-green-500 ml-2" />
              )}
            </label>
            <input
              type="text"
              value={formData.coreFeeling}
              onChange={(e) => setFormData({...formData, coreFeeling: e.target.value})}
              placeholder="e.g., deeply appreciated, truly valued, completely loved..."
              className={`w-full px-4 py-3 bg-white border-2 rounded-xl transition-all duration-300 text-gray-900 placeholder-gray-400 ${
                completedFields.includes('coreFeeling')
                  ? 'border-green-400 bg-green-50/50'
                  : 'border-gray-200 hover:border-gray-300 focus:border-purple-400'
              }`}
              required
            />
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
                className={`w-full px-4 py-3 bg-white border-2 rounded-xl transition-all duration-300 text-gray-900 appearance-none cursor-pointer ${
                  completedFields.includes('occasion')
                    ? 'border-green-400 bg-green-50/50'
                    : 'border-gray-200 hover:border-gray-300 focus:border-purple-400'
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
                className={`w-full px-4 py-3 bg-white border-2 rounded-xl transition-all duration-300 text-gray-900 appearance-none cursor-pointer ${
                  completedFields.includes('tone')
                    ? 'border-green-400 bg-green-50/50'
                    : 'border-gray-200 hover:border-gray-300 focus:border-purple-400'
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
              <p className="text-sm text-red-500 mb-4 bg-red-50 border border-red-200 rounded-xl px-4 py-3">
                Please fill in the required fields: feeling and tone
              </p>
            )}
          </AnimatePresence>
          
          <Link href="/gather">
            <button 
              onClick={handleContinue}
              disabled={!canProceed}
              className={`inline-flex items-center px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 ${
                canProceed
                  ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg hover:shadow-xl hover:scale-105'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              <span>Continue to Gather</span>
              <ArrowRight className="w-5 h-5 ml-2" />
            </button>
          </Link>
        </div>

        {/* Progress Indicator */}
        <div className="mt-8 flex justify-center">
          <div className="flex space-x-2">
            <div className="w-8 h-2 bg-purple-500 rounded-full"></div>
            <div className="w-2 h-2 bg-gray-200 rounded-full"></div>
            <div className="w-2 h-2 bg-gray-200 rounded-full"></div>
            <div className="w-2 h-2 bg-gray-200 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  )
}