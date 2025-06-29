import { useState } from 'react'
import { Link } from 'wouter'
import { ArrowRight, ArrowLeft, Heart, Sparkles, CheckCircle } from 'lucide-react'
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50/20">
      {/* Floating back button */}
      <div className="fixed top-6 left-6 z-10">
        <Link href="/">
          <button className="flex items-center justify-center w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-gray-100/50">
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
        </Link>
      </div>

      <div className="max-w-2xl mx-auto px-6 py-20">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-purple-500 via-purple-600 to-blue-600 rounded-3xl mb-8 shadow-xl shadow-purple-200/50">
            <Heart className="w-10 h-10 text-white" />
          </div>
          
          <h1 className="text-4xl font-bold text-gray-900 mb-4 tracking-tight">
            Define Your Hug
          </h1>
          
          <p className="text-xl text-gray-600 leading-relaxed max-w-lg mx-auto">
            Let's begin crafting your heartfelt Soul Hug. Tell us about the message you want to create.
          </p>
        </div>

        {/* Form */}
        <div className="space-y-10">
          {/* Recipient Field */}
          <div className="space-y-4">
            <label className="block text-lg font-semibold text-gray-800">
              Who is this for?
              <span className="text-gray-400 font-normal text-base ml-2">(Optional)</span>
            </label>
            <div className="relative">
              <input
                type="text"
                value={formData.recipient}
                onChange={(e) => setFormData({...formData, recipient: e.target.value})}
                onFocus={() => setFocusedField('recipient')}
                onBlur={() => setFocusedField(null)}
                placeholder="Enter their name or leave blank..."
                className={`w-full px-6 py-5 bg-white/80 backdrop-blur-sm border-2 rounded-3xl transition-all duration-300 text-gray-900 placeholder-gray-400 text-lg ${
                  focusedField === 'recipient' 
                    ? 'border-purple-400 shadow-xl shadow-purple-100/50 bg-white' 
                    : 'border-gray-200 hover:border-gray-300 hover:shadow-lg'
                }`}
              />
              {focusedField === 'recipient' && (
                <div className="absolute -bottom-10 left-0 text-sm text-gray-500 animate-in fade-in duration-200">
                  You can write a name, like 'Dad' or 'My neighbor'
                </div>
              )}
            </div>
          </div>

          {/* Core Feeling Field */}
          <div className="space-y-4">
            <label className="block text-lg font-semibold text-gray-800">
              How do you want them to feel?
              <span className="text-red-500 ml-1">*</span>
            </label>
            <div className="relative">
              <input
                type="text"
                value={formData.coreFeeling}
                onChange={(e) => setFormData({...formData, coreFeeling: e.target.value})}
                onFocus={() => setFocusedField('coreFeeling')}
                onBlur={() => setFocusedField(null)}
                placeholder="e.g., deeply appreciated, truly valued, completely loved..."
                className={`w-full px-6 py-5 bg-white/80 backdrop-blur-sm border-2 rounded-3xl transition-all duration-300 text-gray-900 placeholder-gray-400 text-lg ${
                  focusedField === 'coreFeeling' 
                    ? 'border-purple-400 shadow-xl shadow-purple-100/50 bg-white' 
                    : formData.coreFeeling.trim() 
                      ? 'border-green-400 bg-green-50/50 shadow-lg shadow-green-100/50' 
                      : 'border-gray-200 hover:border-gray-300 hover:shadow-lg'
                }`}
                required
              />
              {formData.coreFeeling.trim() && focusedField !== 'coreFeeling' && (
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                  <CheckCircle className="w-6 h-6 text-green-500" />
                </div>
              )}
              {focusedField === 'coreFeeling' && (
                <div className="absolute -bottom-10 left-0 text-sm text-gray-500 animate-in fade-in duration-200">
                  This is the heart of your message
                </div>
              )}
            </div>
          </div>

          {/* Optional Context Section */}
          <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 border border-gray-100/50 shadow-lg">
            <h3 className="text-xl font-semibold text-gray-800 mb-6">Optional Context</h3>
            
            <div className="space-y-8">
              {/* Occasion Field */}
              <div className="space-y-4">
                <label className="block text-lg font-medium text-gray-700">
                  Occasion
                </label>
                <div className="relative">
                  <select
                    value={formData.occasion}
                    onChange={(e) => setFormData({...formData, occasion: e.target.value})}
                    onFocus={() => setFocusedField('occasion')}
                    onBlur={() => setFocusedField(null)}
                    className={`w-full px-6 py-5 bg-white border-2 rounded-2xl transition-all duration-300 text-gray-900 appearance-none cursor-pointer text-lg ${
                      focusedField === 'occasion' 
                        ? 'border-purple-400 shadow-lg shadow-purple-100/50' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <option value="">Select occasion...</option>
                    {occasions.map(occasion => (
                      <option key={occasion} value={occasion}>{occasion}</option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-6 pointer-events-none">
                    <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Tone Field */}
              <div className="space-y-4">
                <label className="block text-lg font-medium text-gray-700">
                  Tone
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <div className="relative">
                  <select
                    value={formData.tone}
                    onChange={(e) => setFormData({...formData, tone: e.target.value})}
                    onFocus={() => setFocusedField('tone')}
                    onBlur={() => setFocusedField(null)}
                    className={`w-full px-6 py-5 bg-white border-2 rounded-2xl transition-all duration-300 text-gray-900 appearance-none cursor-pointer text-lg ${
                      focusedField === 'tone' 
                        ? 'border-purple-400 shadow-lg shadow-purple-100/50' 
                        : formData.tone 
                          ? 'border-green-400 bg-green-50/50' 
                          : 'border-gray-200 hover:border-gray-300'
                    }`}
                    required
                  >
                    <option value="">Select tone...</option>
                    {tones.map(tone => (
                      <option key={tone} value={tone}>{tone}</option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-6 pointer-events-none">
                    {formData.tone ? (
                      <CheckCircle className="w-6 h-6 text-green-500" />
                    ) : (
                      <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    )}
                  </div>
                  {focusedField === 'tone' && (
                    <div className="absolute -bottom-10 left-0 text-sm text-gray-500 animate-in fade-in duration-200">
                      Choose the emotional style for your message
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Continue Button */}
        <div className="mt-16 text-center">
          {!canProceed && (
            <p className="text-sm text-red-500 mb-6 bg-red-50 border border-red-200 rounded-2xl px-4 py-3">
              Please fill in the required fields: {!formData.coreFeeling.trim() && 'feeling'} {!formData.coreFeeling.trim() && !formData.tone && ' and '} {!formData.tone && 'tone'}
            </p>
          )}
          
          <Link href="/gather">
            <button 
              onClick={handleContinue}
              disabled={!canProceed}
              className={`inline-flex items-center px-12 py-5 rounded-3xl font-semibold text-xl transition-all duration-300 transform ${
                canProceed
                  ? 'bg-gradient-to-r from-purple-600 via-purple-700 to-blue-600 text-white shadow-xl shadow-purple-200/50 hover:shadow-2xl hover:scale-105 hover:from-purple-700 hover:to-blue-700'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              <span>Continue to Gather</span>
              <ArrowRight className="w-6 h-6 ml-3" />
              {canProceed && <Sparkles className="w-5 h-5 ml-2 opacity-70" />}
            </button>
          </Link>
        </div>

        {/* Progress Indicator */}
        <div className="mt-12 flex justify-center">
          <div className="flex space-x-3">
            <div className="w-12 h-3 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full shadow-lg"></div>
            <div className="w-3 h-3 bg-gray-200 rounded-full"></div>
            <div className="w-3 h-3 bg-gray-200 rounded-full"></div>
            <div className="w-3 h-3 bg-gray-200 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  )
}