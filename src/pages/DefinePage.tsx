import { useState } from 'react'
import { Link } from 'wouter'
import { ArrowRight, ArrowLeft, Heart, Sparkles, Target, Palette, User, Calendar } from 'lucide-react'
import { useSoulHug } from '../context/SoulHugContext'

export default function DefinePage() {
  const { currentSoulHug, updateCurrentSoulHug } = useSoulHug()
  
  const [formData, setFormData] = useState({
    recipient: currentSoulHug.recipient || '',
    coreFeeling: currentSoulHug.coreFeeling || '',
    occasion: currentSoulHug.occasion || '',
    tone: currentSoulHug.tone || ''
  })

  const [activeStep, setActiveStep] = useState(1)

  const occasions = [
    { value: 'Birthday', emoji: '🎂', color: 'from-pink-400 to-rose-500' },
    { value: 'Anniversary', emoji: '💕', color: 'from-red-400 to-pink-500' },
    { value: 'Graduation', emoji: '🎓', color: 'from-blue-400 to-indigo-500' },
    { value: 'New Job', emoji: '🎉', color: 'from-green-400 to-emerald-500' },
    { value: 'Difficult Time', emoji: '🤗', color: 'from-purple-400 to-violet-500' },
    { value: 'Just Because', emoji: '✨', color: 'from-yellow-400 to-orange-500' },
    { value: 'Thank You', emoji: '🙏', color: 'from-teal-400 to-cyan-500' },
    { value: 'Apology', emoji: '💙', color: 'from-blue-400 to-sky-500' },
    { value: 'Encouragement', emoji: '💪', color: 'from-orange-400 to-red-500' },
    { value: 'Celebration', emoji: '🎊', color: 'from-purple-400 to-pink-500' }
  ]

  const tones = [
    { value: 'Warm & Loving', emoji: '🤗', description: 'Gentle, nurturing, and affectionate' },
    { value: 'Playful & Fun', emoji: '😄', description: 'Light-hearted and joyful' },
    { value: 'Deep & Meaningful', emoji: '💭', description: 'Profound and thoughtful' },
    { value: 'Gentle & Comforting', emoji: '🕊️', description: 'Soothing and reassuring' },
    { value: 'Inspiring & Uplifting', emoji: '🌟', description: 'Motivational and encouraging' },
    { value: 'Heartfelt & Sincere', emoji: '❤️', description: 'Genuine and authentic' },
    { value: 'Light & Cheerful', emoji: '☀️', description: 'Bright and optimistic' },
    { value: 'Professional & Respectful', emoji: '🤝', description: 'Formal yet warm' },
    { value: 'Serious & Thoughtful', emoji: '🤔', description: 'Contemplative and earnest' },
    { value: 'Grateful & Appreciative', emoji: '🙏', description: 'Thankful and acknowledging' }
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

  const handleOccasionSelect = (occasion: string) => {
    setFormData({...formData, occasion: formData.occasion === occasion ? '' : occasion})
  }

  const handleToneSelect = (tone: string) => {
    setFormData({...formData, tone})
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#311A55] via-[#5B2885] to-[#241946] relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-32 h-32 bg-purple-400/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-blue-400/20 rounded-full blur-xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-32 left-1/4 w-40 h-40 bg-pink-400/20 rounded-full blur-xl animate-pulse delay-2000"></div>
        <div className="absolute bottom-20 right-1/3 w-28 h-28 bg-cyan-400/20 rounded-full blur-xl animate-pulse delay-3000"></div>
      </div>

      <div className="relative z-10 min-h-screen pt-8 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 backdrop-blur-sm rounded-full mb-6">
              <Heart className="w-8 h-8 text-pink-300" />
            </div>
            <h1 className="text-5xl font-bold text-white mb-4 drop-shadow-2xl">
              Define Your
              <span className="block bg-gradient-to-r from-pink-300 to-purple-300 bg-clip-text text-transparent">
                Soul Hug
              </span>
            </h1>
            <p className="text-xl text-white/80 max-w-2xl mx-auto leading-relaxed">
              Let's craft something beautiful together. Tell us about the heartfelt message you want to create.
            </p>
          </div>

          {/* Progress Steps */}
          <div className="flex justify-center mb-12">
            <div className="flex items-center space-x-4">
              {[1, 2, 3, 4].map((step) => (
                <div key={step} className="flex items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all duration-300 ${
                    step === 1 ? 'bg-white text-purple-600 shadow-lg' :
                    step === 2 ? 'bg-purple-400/30 text-white border-2 border-white/30' :
                    step === 3 ? 'bg-purple-400/20 text-white/60 border border-white/20' :
                    'bg-purple-400/10 text-white/40 border border-white/10'
                  }`}>
                    {step}
                  </div>
                  {step < 4 && (
                    <div className={`w-8 h-0.5 mx-2 ${
                      step === 1 ? 'bg-white/30' : 'bg-white/10'
                    }`}></div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Main Content */}
          <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
            <div className="p-8 lg:p-12">
              <div className="grid lg:grid-cols-2 gap-12">
                {/* Left Column - Form */}
                <div className="space-y-8">
                  {/* Recipient */}
                  <div className="group">
                    <label className="flex items-center text-lg font-semibold text-gray-800 mb-4">
                      <User className="w-5 h-5 mr-2 text-purple-600" />
                      Who is this for?
                      <span className="ml-2 text-sm font-normal text-gray-500">(Optional)</span>
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Enter their name or relationship..."
                        value={formData.recipient}
                        onChange={(e) => setFormData({...formData, recipient: e.target.value})}
                        className="w-full px-6 py-4 bg-gray-50 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-200 text-lg placeholder-gray-400"
                      />
                      <div className="absolute inset-y-0 right-0 flex items-center pr-6">
                        <Sparkles className="w-5 h-5 text-gray-300" />
                      </div>
                    </div>
                    <p className="text-sm text-gray-500 mt-2">
                      e.g., "Mom", "My best friend", "Sarah", or leave blank for anyone
                    </p>
                  </div>

                  {/* Core Feeling */}
                  <div className="group">
                    <label className="flex items-center text-lg font-semibold text-gray-800 mb-4">
                      <Target className="w-5 h-5 mr-2 text-purple-600" />
                      How do you want them to feel?
                      <span className="ml-2 text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Describe the feeling you want to create..."
                        value={formData.coreFeeling}
                        onChange={(e) => setFormData({...formData, coreFeeling: e.target.value})}
                        className="w-full px-6 py-4 bg-gray-50 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-200 text-lg placeholder-gray-400"
                        required
                      />
                      <div className="absolute inset-y-0 right-0 flex items-center pr-6">
                        <Heart className="w-5 h-5 text-gray-300" />
                      </div>
                    </div>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {['deeply appreciated', 'truly valued', 'completely loved', 'genuinely supported', 'incredibly special'].map((suggestion) => (
                        <button
                          key={suggestion}
                          onClick={() => setFormData({...formData, coreFeeling: suggestion})}
                          className="px-3 py-1 bg-purple-100 hover:bg-purple-200 text-purple-700 rounded-full text-sm transition-colors"
                        >
                          {suggestion}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Occasion */}
                  <div className="group">
                    <label className="flex items-center text-lg font-semibold text-gray-800 mb-4">
                      <Calendar className="w-5 h-5 mr-2 text-purple-600" />
                      What's the occasion?
                      <span className="ml-2 text-sm font-normal text-gray-500">(Optional)</span>
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      {occasions.map((occasion) => (
                        <button
                          key={occasion.value}
                          onClick={() => handleOccasionSelect(occasion.value)}
                          className={`p-4 rounded-xl border-2 transition-all duration-200 text-left group hover:scale-105 ${
                            formData.occasion === occasion.value
                              ? 'border-purple-400 bg-purple-50 shadow-lg'
                              : 'border-gray-200 hover:border-purple-300 hover:bg-purple-50/50'
                          }`}
                        >
                          <div className="flex items-center">
                            <span className="text-2xl mr-3">{occasion.emoji}</span>
                            <span className="font-medium text-gray-800">{occasion.value}</span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Column - Tone Selection */}
                <div>
                  <label className="flex items-center text-lg font-semibold text-gray-800 mb-6">
                    <Palette className="w-5 h-5 mr-2 text-purple-600" />
                    Choose your tone
                    <span className="ml-2 text-red-500">*</span>
                  </label>
                  <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
                    {tones.map((tone) => (
                      <button
                        key={tone.value}
                        onClick={() => handleToneSelect(tone.value)}
                        className={`w-full p-4 rounded-xl border-2 transition-all duration-200 text-left group hover:scale-[1.02] ${
                          formData.tone === tone.value
                            ? 'border-purple-400 bg-purple-50 shadow-lg'
                            : 'border-gray-200 hover:border-purple-300 hover:bg-purple-50/50'
                        }`}
                      >
                        <div className="flex items-start">
                          <span className="text-2xl mr-4 mt-1">{tone.emoji}</span>
                          <div>
                            <div className="font-semibold text-gray-800 mb-1">{tone.value}</div>
                            <div className="text-sm text-gray-600">{tone.description}</div>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Validation Message */}
              {!canProceed && (
                <div className="mt-8 p-4 bg-amber-50 border border-amber-200 rounded-xl">
                  <div className="flex items-center">
                    <Sparkles className="w-5 h-5 text-amber-500 mr-2" />
                    <p className="text-amber-700 font-medium">
                      Please complete the required fields: 
                      {!formData.coreFeeling.trim() && ' feeling'} 
                      {!formData.coreFeeling.trim() && !formData.tone && ' and '} 
                      {!formData.tone && ' tone'}
                    </p>
                  </div>
                </div>
              )}

              {/* Navigation */}
              <div className="flex justify-between items-center mt-12 pt-8 border-t border-gray-200">
                <Link href="/">
                  <button className="flex items-center px-6 py-3 text-gray-600 border-2 border-gray-300 rounded-xl hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 font-medium">
                    <ArrowLeft className="w-5 h-5 mr-2" />
                    Back to Home
                  </button>
                </Link>
                
                <Link href="/gather">
                  <button 
                    onClick={handleContinue}
                    disabled={!canProceed}
                    className={`flex items-center px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-200 ${
                      canProceed
                        ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:shadow-lg hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    Continue to Gather
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </button>
                </Link>
              </div>
            </div>
          </div>

          {/* Bottom Encouragement */}
          <div className="text-center mt-8">
            <p className="text-white/60 text-sm">
              ✨ Every great Soul Hug starts with intention. You're doing something beautiful.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}