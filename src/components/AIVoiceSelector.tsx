import React, { useState } from 'react'
import { Volume2, Play, Wand2 } from 'lucide-react'

interface AIVoiceSelectorProps {
  message: string
  onVoiceGenerated: (audioUrl: string) => void
  className?: string
}

const voiceOptions = [
  { 
    value: 'female-warm', 
    label: 'Female - Warm & Caring', 
    description: 'Gentle, nurturing tone perfect for comfort',
    preview: '/audio/preview-female-warm.mp3' 
  },
  { 
    value: 'male-gentle', 
    label: 'Male - Gentle & Sincere', 
    description: 'Deep, reassuring voice for meaningful messages',
    preview: '/audio/preview-male-gentle.mp3' 
  },
  { 
    value: 'neutral-calm', 
    label: 'Neutral - Calm & Soothing', 
    description: 'Peaceful, meditative quality for relaxation',
    preview: '/audio/preview-neutral-calm.mp3' 
  },
]

export const AIVoiceSelector: React.FC<AIVoiceSelectorProps> = ({ 
  message, 
  onVoiceGenerated, 
  className = '' 
}) => {
  const [selectedVoice, setSelectedVoice] = useState('female-warm')
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedAudio, setGeneratedAudio] = useState<string | null>(null)

  const generateVoice = async () => {
    if (!message.trim()) return
    
    setIsGenerating(true)
    
    try {
      // Mock AI voice generation - replace with actual OpenAI TTS API call
      await new Promise(resolve => setTimeout(resolve, 3000))
      
      // Mock generated audio URL
      const mockAudioUrl = `/audio/generated-${selectedVoice}-${Date.now()}.mp3`
      setGeneratedAudio(mockAudioUrl)
      onVoiceGenerated(mockAudioUrl)
      
    } catch (error) {
      console.error('Error generating voice:', error)
    } finally {
      setIsGenerating(false)
    }
  }

  const playPreview = (previewUrl: string) => {
    const audio = new Audio(previewUrl)
    audio.play().catch(err => console.log('Preview not available:', err))
  }

  return (
    <div className={`bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 ${className}`}>
      <h3 className="text-xl font-semibold mb-4 flex items-center text-blue-700">
        <Volume2 className="w-6 h-6 mr-2" />
        AI Voice Option
      </h3>
      
      <p className="text-sm text-gray-600 mb-4">
        Don't want to record? Let AI read your message with a warm, natural voice.
      </p>
      
      <div className="space-y-3 mb-6">
        {voiceOptions.map((voice) => (
          <div
            key={voice.value}
            className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
              selectedVoice === voice.value
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:border-blue-300 bg-white'
            }`}
            onClick={() => setSelectedVoice(voice.value)}
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h4 className="font-medium text-gray-800">{voice.label}</h4>
                <p className="text-sm text-gray-600 mt-1">{voice.description}</p>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  playPreview(voice.preview)
                }}
                className="ml-3 p-2 bg-blue-100 hover:bg-blue-200 rounded-lg transition-colors"
                title="Preview voice"
              >
                <Play className="w-4 h-4 text-blue-600" />
              </button>
            </div>
          </div>
        ))}
      </div>
      
      {generatedAudio && (
        <div className="mb-4 p-3 bg-green-100 border border-green-300 rounded-lg">
          <div className="flex items-center justify-between">
            <span className="text-green-700 text-sm font-medium">✓ Voice generated successfully!</span>
            <audio controls className="h-8">
              <source src={generatedAudio} type="audio/mpeg" />
            </audio>
          </div>
        </div>
      )}
      
      <button
        onClick={generateVoice}
        disabled={isGenerating || !message.trim()}
        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white py-3 rounded-lg font-medium transition-colors flex items-center justify-center"
      >
        <Wand2 className="w-4 h-4 mr-2" />
        {isGenerating ? 'Generating Voice...' : 'Generate AI Voice'}
      </button>
      
      {!message.trim() && (
        <p className="text-xs text-gray-500 mt-2 text-center">
          Complete your message in the Craft step to generate AI voice
        </p>
      )}
    </div>
  )
}