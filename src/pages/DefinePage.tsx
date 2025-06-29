import { useState } from 'react'
import { Link } from 'wouter'
import { ArrowRight, ArrowLeft, Heart, Sparkles } from 'lucide-react'
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

  const handleContinue = () => {
    updateCurrentSoulHug({
      recipient: formData.recipient,
      coreFeeling: formData.coreFeeling,
      occasion: formData.occasion,
      tone: formData.tone
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50/30">
      {/* Floating back button */}
      <div className="fixed top-6 left-6 z-10">
        <Link href="/">
          <button className="flex items-center justify-center w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 border border-gray-100">
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
        </Link>
      </div>

      <div className="max-w-2xl mx-auto px-6 py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-2xl mb-6 shadow-lg">
            <Heart className="w-8 h-8 text-white" />
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-3">
            Define Your Hug
          </h1>
          
          <p className="text-lg text-gray-600 leading-relaxed max-w-lg mx-auto">
            Let's begin crafting your heartfelt Soul Hug. Tell us about the message you want to create.
          </p>
        </div>

        {/* Form */}
        <div className="space-y-8">
          {/* Recipient Field */}
          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-700">
              Who is this for? <span className="text-gray-400 font-normal">(Optional)</span>
            </label>
            <div className="relative">
              <input
                type="text"
                value={formData.recipient}
                onChange={(e) => setFormData({...formData, recipient: e.target.value})}
                onFocus={() => setFocusedField('recipient')}
                onBlur={() => setFocusedField(null)}
                placeholder="Enter their name or leave blank..."
                className={`w-full px-4 py-4 bg-white border-2 rounded-2xl transition-all duration-200 text-gray-900 placeholder-gray-400 ${
                  focusedField === 'recipient' 
                    ? 'border-purple-400 shadow-lg shadow-purple-100' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              />
              {focusedField === 'recipient' && (
                <div className="absolute -bottom-8 left-0 text-xs text-gray-500">
                  You can write a name, like 'Dad' or 'My neighbor'
                </div>
              )}
            </div>
          </div>

          {/* Core Feeling Field */}
          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-700">
              How do you want them to feel? <span className="text-red-400">*</span>
            </label>
            <div className="relative">
              <input
                type="text"
                value={formData.coreFeeling}
                onChange={(e) => setFormData({...formData, coreFeeling: e.target.value})}
                onFocus={() => setFocusedField('coreFeeling')}
                onBlur={() => setFocusedField(null)}
                placeholder="e.g., deeply appreciated, truly valued, completely loved..."
                className={`w-full px-4 py-4 bg-white border-2 rounded-2xl transition-all duration-200 text-gray-900 placeholder-gray-400 ${
                  focusedField === 'coreFeeling' 
                    ? 'border-purple-400 shadow-lg shadow-purple-100' 
                    : formData.coreFeeling.trim() 
                      ? 'border-green-300' 
                      : 'border-gray-200 hover:border-gray-300'
                }`}
                required
              />
              {focusedField === 'coreFeeling' && (
                <div className="absolute -bottom-8 left-0 text-xs text-gray-500">
                  This is the heart of your message
                </div>
              )}
            </div>
          </div>

          {/* Occasion Field */}
          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-700">
              Occasion <span className="text-gray-400 font-normal">(Optional)</span>
            </label>
            <div className="relative">
              <select
                value={formData.occasion}
                onChange={(e) => setFormData({...formData, occasion: e.target.value})}
                onFocus={() => setFocusedField('occasion')}
                onBlur={() => setFocusedField(null)}
                className={`w-full px-4 py-4 bg-white border-2 rounded-2xl transition-all duration-200 text-gray-900 appearance-none cursor-pointer ${
                  focusedField === 'occasion' 
                    ? 'border-purple-400 shadow-lg shadow-purple-100' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <option value="">Select occasion...</option>
                {occasions.map(occasion => (
                  <option key={occasion} value={occasion}>{occasion}</option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          {/* Tone Field */}
          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-700">
              Tone <span className="text-red-400">*</span>
            </label>
            <div className="relative">
              <select
                value={formData.tone}
                onChange={(e) => setFormData({...formData, tone: e.target.value})}
                onFocus={() => setFocusedField('tone')}
                onBlur={() => setFocusedField(null)}
                className={`w-full px-4 py-4 bg-white border-2 rounded-2xl transition-all duration-200 text-gray-900 appearance-none cursor-pointer ${
                  focusedField === 'tone' 
                    ? 'border-purple-400 shadow-lg shadow-purple-100' 
                    : formData.tone 
                      ? 'border-green-300' 
                      : 'border-gray-200 hover:border-gray-300'
                }`}
                required
              >
                <option value="">Select tone...</option>
                {tones.map(tone => (
                  <option key={tone} value={tone}>{tone}</option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
              {focusedField === 'tone' && (
                <div className="absolute -bottom-8 left-0 text-xs text-gray-500">
                  Choose the emotional style for your message
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Continue Button */}
        <div className="mt-12 text-center">
          {!canProceed && (
            <p className="text-sm text-red-500 mb-4">
              Please fill in the required fields: {!formData.coreFeeling.trim() && 'feeling'} {!formData.coreFeeling.trim() && !formData.tone && ' and '} {!formData.tone && 'tone'}
            </p>
          )}
          
          <Link href="/gather">
            <button 
              onClick={handleContinue}
              disabled={!canProceed}
              className={`inline-flex items-center px-8 py-4 rounded-2xl font-medium text-lg transition-all duration-200 ${
                canProceed
                  ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg hover:shadow-xl hover:scale-105 transform'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              <span>Continue to Gather</span>
              <ArrowRight className="w-5 h-5 ml-2" />
              {canProceed && <Sparkles className="w-4 h-4 ml-2 opacity-70" />}
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