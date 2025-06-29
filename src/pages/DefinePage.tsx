import { useState } from 'react'
import { Link } from 'wouter'
import { ArrowRight, ArrowLeft } from 'lucide-react'
import { useSoulHug } from '../context/SoulHugContext'

export default function DefinePage() {
  const { currentSoulHug, updateCurrentSoulHug } = useSoulHug()
  
  const [formData, setFormData] = useState({
    recipient: currentSoulHug.recipient || '',
    coreFeeling: currentSoulHug.coreFeeling || '',
    occasion: currentSoulHug.occasion || '',
    tone: currentSoulHug.tone || ''
  })

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
    <div className="min-h-screen pt-8 pb-16">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="soul-card">
          <h1 className="text-4xl font-bold text-center bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-6">
            DEFINE YOUR HUG
          </h1>
          
          <p className="text-center text-gray-600 mb-8 leading-relaxed">
            Let's begin crafting your heartfelt Soul Hug. Tell us about the message you want to create.
          </p>

          <div className="space-y-6">
            {/* Recipient */}
            <div>
              <label htmlFor="recipient" className="block text-lg font-semibold text-gray-700 mb-2">
                Who is this for? (Optional)
              </label>
              <p className="text-gray-500 text-sm mb-3">
                You can write a name, like 'Dad' or 'My neighbor' — or leave it blank.
              </p>
              <input
                type="text"
                id="recipient"
                name="recipient"
                placeholder="Enter their name or leave blank..."
                value={formData.recipient}
                onChange={(e) => setFormData({...formData, recipient: e.target.value})}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-200"
              />
            </div>

            {/* Core Feeling */}
            <div>
              <label htmlFor="coreFeeling" className="block text-lg font-semibold text-gray-700 mb-3">
                How do you want them to feel? *
              </label>
              <input
                type="text"
                id="coreFeeling"
                name="coreFeeling"
                placeholder="e.g., deeply appreciated, truly valued, completely loved, genuinely supported..."
                value={formData.coreFeeling}
                onChange={(e) => setFormData({...formData, coreFeeling: e.target.value})}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-200"
                required
              />
            </div>

            {/* Optional Context */}
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-700 mb-4">Optional Context</h3>
              
              {/* Occasion */}
              <div className="mb-4">
                <label htmlFor="occasion" className="block text-gray-700 font-medium mb-2">Occasion</label>
                <select
                  id="occasion"
                  name="occasion"
                  value={formData.occasion}
                  onChange={(e) => setFormData({...formData, occasion: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-200"
                >
                  <option value="">Select occasion...</option>
                  {occasions.map(occasion => (
                    <option key={occasion} value={occasion}>{occasion}</option>
                  ))}
                </select>
              </div>

              {/* Tone */}
              <div>
                <label htmlFor="tone" className="block text-gray-700 font-medium mb-2">Tone *</label>
                <select
                  id="tone"
                  name="tone"
                  value={formData.tone}
                  onChange={(e) => setFormData({...formData, tone: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-200"
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

          <div className="flex justify-between items-center mt-8">
            <Link href="/">
              <button className="flex items-center px-6 py-3 text-gray-600 border border-gray-300 rounded-xl hover:bg-gray-50 transition-all duration-200">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </button>
            </Link>
            
            <div className="text-center">
              {!canProceed && (
                <p className="text-red-500 text-sm mb-2">
                  Please fill in: {!formData.coreFeeling.trim() && 'feeling'} {!formData.coreFeeling.trim() && !formData.tone && ' and '} {!formData.tone && 'tone'}
                </p>
              )}
              <Link href="/gather">
                <button 
                  onClick={handleContinue}
                  disabled={!canProceed}
                  className={`soul-button flex items-center ${!canProceed ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  Continue to Gather
                  <ArrowRight className="w-4 h-4 ml-2" />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}