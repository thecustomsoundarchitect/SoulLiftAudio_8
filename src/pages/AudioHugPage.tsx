import { useState, useRef, useEffect } from 'react'
import { Link } from 'wouter'
import { Mic, Square, Play, Pause, Trash2, Download, Share2, ArrowLeft, Music, Image, Volume2, Wand2, RotateCcw } from 'lucide-react'
import { useSoulHug } from '../context/SoulHugContext'

export default function AudioHugPage() {
  const { currentSoulHug, updateCurrentSoulHug } = useSoulHug()
  
  // Audio Recording State
  const [isRecording, setIsRecording] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null)
  const [audioUrl, setAudioUrl] = useState<string | null>(null)
  const [recordingTime, setRecordingTime] = useState(0)
  const [error, setError] = useState<string | null>(null)

  // AI Voice State
  const [selectedVoice, setSelectedVoice] = useState('female-warm')
  const [isGeneratingVoice, setIsGeneratingVoice] = useState(false)
  const [generatedVoiceUrl, setGeneratedVoiceUrl] = useState<string | null>(null)
  const [audioMode, setAudioMode] = useState<'record' | 'ai'>('record')

  // Music and Image State
  const [selectedMusic, setSelectedMusic] = useState<string | null>(null)
  const [musicVolume, setMusicVolume] = useState(30)
  const [voiceVolume, setVoiceVolume] = useState(80)
  const [coverImage, setCoverImage] = useState<string | null>(null)

  // Audio Processing State
  const [isMixing, setIsMixing] = useState(false)
  const [mixedAudioUrl, setMixedAudioUrl] = useState<string | null>(null)

  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const chunksRef = useRef<Blob[]>([])
  const timerRef = useRef<NodeJS.Timeout | null>(null)

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

  const musicOptions = [
    { name: 'Gentle Piano', url: '/music/gentle-piano.mp3', description: 'Soft piano melodies for peaceful moments' },
    { name: 'Nature Sounds', url: '/music/nature-sounds.mp3', description: 'Birds chirping and gentle water sounds' },
    { name: 'Soft Strings', url: '/music/soft-strings.mp3', description: 'Warm string ensemble for emotional depth' },
    { name: 'Ambient Calm', url: '/music/ambient-calm.mp3', description: 'Ethereal pads for deep relaxation' },
    { name: 'Acoustic Guitar', url: '/music/acoustic-guitar.mp3', description: 'Fingerpicked guitar for personal connection' },
    { name: 'Ocean Waves', url: '/music/ocean-waves.mp3', description: 'Gentle waves for tranquil atmosphere' }
  ]

  const presetImages = [
    { id: 'sunset-heart', name: 'Sunset Heart', gradient: 'from-orange-400 to-pink-500' },
    { id: 'ocean-waves', name: 'Ocean Waves', gradient: 'from-blue-400 to-teal-500' },
    { id: 'forest-path', name: 'Forest Path', gradient: 'from-green-400 to-emerald-500' },
    { id: 'purple-dreams', name: 'Purple Dreams', gradient: 'from-purple-400 to-indigo-500' },
    { id: 'golden-light', name: 'Golden Light', gradient: 'from-yellow-400 to-orange-500' },
    { id: 'rose-garden', name: 'Rose Garden', gradient: 'from-pink-400 to-rose-500' }
  ]

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
      if (audioUrl) {
        URL.revokeObjectURL(audioUrl)
      }
      if (generatedVoiceUrl) {
        URL.revokeObjectURL(generatedVoiceUrl)
      }
      if (mixedAudioUrl) {
        URL.revokeObjectURL(mixedAudioUrl)
      }
      if (coverImage && coverImage.startsWith('blob:')) {
        URL.revokeObjectURL(coverImage)
      }
    }
  }, [audioUrl, generatedVoiceUrl, mixedAudioUrl, coverImage])

  // Generate message from current Soul Hug data
  const soulHugMessage = `Dear ${currentSoulHug.recipient || 'Beautiful Soul'},

I wanted to take a moment to remind you of something important - you are absolutely incredible, and here's why:

${currentSoulHug.ingredients?.map(ingredient => `• ${ingredient}`).join('\n') || '• Your amazing spirit shines through everything you do'}

${currentSoulHug.descriptors?.length ? `You are: ${currentSoulHug.descriptors.join(', ')}` : ''}

Never forget how much you mean to the people around you. Your presence makes the world a brighter place.

With gratitude and love`

  // Audio Recording Functions
  const startRecording = async () => {
    try {
      setError(null)
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      
      const mediaRecorder = new MediaRecorder(stream)
      mediaRecorderRef.current = mediaRecorder
      chunksRef.current = []

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data)
        }
      }

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'audio/wav' })
        const url = URL.createObjectURL(blob)
        
        setAudioBlob(blob)
        setAudioUrl(url)
        setGeneratedVoiceUrl(null) // Clear AI voice when recording
        updateCurrentSoulHug({ audioUrl: url })
        
        stream.getTracks().forEach(track => track.stop())
      }

      mediaRecorder.start()
      setIsRecording(true)
      setRecordingTime(0)

      timerRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1)
      }, 1000)

    } catch (err) {
      setError('Unable to access microphone. Please check permissions.')
      console.error('Error accessing microphone:', err)
    }
  }

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop()
      setIsRecording(false)
      
      if (timerRef.current) {
        clearInterval(timerRef.current)
        timerRef.current = null
      }
    }
  }

  const playRecording = () => {
    if (audioRef.current && audioUrl) {
      audioRef.current.play()
      setIsPlaying(true)
    }
  }

  const pauseRecording = () => {
    if (audioRef.current) {
      audioRef.current.pause()
      setIsPlaying(false)
    }
  }

  const deleteRecording = () => {
    if (audioUrl) {
      URL.revokeObjectURL(audioUrl)
    }
    if (mixedAudioUrl) {
      URL.revokeObjectURL(mixedAudioUrl)
      setMixedAudioUrl(null)
    }
    setAudioBlob(null)
    setAudioUrl(null)
    setRecordingTime(0)
    setIsPlaying(false)
    updateCurrentSoulHug({ audioUrl: undefined })
  }

  // AI Voice Functions
  const generateAIVoice = async () => {
    if (!soulHugMessage.trim()) return
    
    setIsGeneratingVoice(true)
    
    try {
      // Mock AI voice generation - replace with actual OpenAI TTS API call
      await new Promise(resolve => setTimeout(resolve, 3000))
      
      // Mock generated audio URL
      const mockAudioUrl = `/audio/generated-${selectedVoice}-${Date.now()}.mp3`
      setGeneratedVoiceUrl(mockAudioUrl)
      setAudioUrl(null) // Clear recording when AI voice is generated
      setAudioBlob(null)
      updateCurrentSoulHug({ audioUrl: mockAudioUrl })
      
    } catch (error) {
      console.error('Error generating voice:', error)
    } finally {
      setIsGeneratingVoice(false)
    }
  }

  const playPreview = (previewUrl: string) => {
    const audio = new Audio(previewUrl)
    audio.play().catch(err => console.log('Preview not available:', err))
  }

  // Audio Mixing Functions
  const mixAudio = async () => {
    const primaryAudio = audioUrl || generatedVoiceUrl
    if (!primaryAudio || !selectedMusic) return

    setIsMixing(true)
    
    try {
      // Mock audio mixing - in production, this would use Web Audio API
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Create a mock mixed audio URL
      const mockMixedUrl = `data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIG2m98OScTgwOUarm7blmGgU7k9n1unEiBC13yO/eizEIHWq+8+OWT`
      setMixedAudioUrl(mockMixedUrl)
      
    } catch (error) {
      console.error('Error mixing audio:', error)
    } finally {
      setIsMixing(false)
    }
  }

  // Music Functions
  const handleMusicSelect = (musicUrl: string) => {
    setSelectedMusic(musicUrl)
    updateCurrentSoulHug({ backgroundMusic: musicUrl, musicVolume })
  }

  const handleVolumeChange = (type: 'voice' | 'music', newVolume: number) => {
    if (type === 'voice') {
      setVoiceVolume(newVolume)
    } else {
      setMusicVolume(newVolume)
      updateCurrentSoulHug({ musicVolume: newVolume })
    }
  }

  // Image Functions
  const handlePresetImageSelect = (imageId: string) => {
    if (coverImage && coverImage.startsWith('blob:')) {
      URL.revokeObjectURL(coverImage)
    }
    setCoverImage(imageId)
    updateCurrentSoulHug({ coverImage: imageId })
  }

  const handleCustomImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      if (coverImage && coverImage.startsWith('blob:')) {
        URL.revokeObjectURL(coverImage)
      }
      
      const reader = new FileReader()
      reader.onload = (e) => {
        const result = e.target?.result as string
        setCoverImage(result)
        updateCurrentSoulHug({ coverImage: result })
      }
      reader.readAsDataURL(file)
    }
  }

  // Delivery Functions
  const handleDownload = () => {
    const finalAudioUrl = mixedAudioUrl || audioUrl || generatedVoiceUrl
    if (finalAudioUrl) {
      const link = document.createElement('a')
      link.href = finalAudioUrl
      link.download = `soul-hug-${Date.now()}.wav`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }

  const handleShare = async () => {
    const shareUrl = `${window.location.origin}/hug/${Date.now()}`
    try {
      await navigator.clipboard.writeText(shareUrl)
      alert('Share link copied to clipboard!')
    } catch (error) {
      console.error('Error copying to clipboard:', error)
    }
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const hasAudio = audioUrl || generatedVoiceUrl
  const canMix = hasAudio && selectedMusic

  return (
    <div className="min-h-screen pt-8 pb-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="soul-card">
          <div className="flex items-center justify-between mb-6">
            <Link href="/craft" className="flex items-center text-purple-600 hover:text-purple-700 transition-colors">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Craft
            </Link>
            <h1 className="text-4xl font-bold text-center bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              CREATE AUDIO HUG
            </h1>
            <div className="w-24"></div>
          </div>

          {/* Message Preview */}
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 mb-8">
            <h3 className="text-lg font-semibold mb-3 text-purple-700">Your Message Preview</h3>
            <div className="bg-white rounded-xl p-4 text-gray-700 leading-relaxed whitespace-pre-line text-sm max-h-48 overflow-y-auto">
              {soulHugMessage}
            </div>
          </div>

          {/* Audio Mode Toggle */}
          <div className="flex justify-center mb-8">
            <div className="bg-gray-100 rounded-xl p-1 flex">
              <button
                onClick={() => setAudioMode('record')}
                className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                  audioMode === 'record'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Mic className="w-4 h-4 inline mr-2" />
                Record Voice
              </button>
              <button
                onClick={() => setAudioMode('ai')}
                className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                  audioMode === 'ai'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Wand2 className="w-4 h-4 inline mr-2" />
                AI Voice
              </button>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Left Column - Audio Creation */}
            <div className="space-y-6">
              {audioMode === 'record' ? (
                /* Voice Recording */
                <div className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-2xl p-6">
                  <h3 className="text-xl font-semibold mb-4 flex items-center text-orange-700">
                    <Mic className="w-6 h-6 mr-2" />
                    Record Your Voice
                  </h3>
                  
                  {error && (
                    <div className="mb-4 p-3 bg-red-100 border border-red-300 rounded-lg text-red-700 text-sm">
                      {error}
                    </div>
                  )}

                  <div className="text-center mb-6">
                    <div className={`w-24 h-24 mx-auto mb-4 rounded-full flex items-center justify-center transition-all duration-300 ${
                      isRecording 
                        ? 'bg-red-500 animate-pulse shadow-lg scale-110' 
                        : audioBlob 
                          ? 'bg-green-500 hover:bg-green-600' 
                          : 'bg-orange-500 hover:bg-orange-600'
                    } cursor-pointer`}>
                      <Mic className="w-8 h-8 text-white" />
                    </div>
                    
                    {isRecording && (
                      <div className="text-red-600 font-mono text-lg mb-2">
                        🔴 {formatTime(recordingTime)}
                      </div>
                    )}
                    
                    {audioBlob && !isRecording && (
                      <div className="text-green-600 font-mono text-sm mb-2">
                        ✓ Recorded: {formatTime(recordingTime)}
                      </div>
                    )}
                  </div>

                  <div className="flex justify-center space-x-2 mb-4">
                    {!isRecording && !audioBlob && (
                      <button
                        onClick={startRecording}
                        className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center"
                      >
                        <Mic className="w-4 h-4 mr-2" />
                        Start Recording
                      </button>
                    )}
                    
                    {isRecording && (
                      <button
                        onClick={stopRecording}
                        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center"
                      >
                        <Square className="w-4 h-4 mr-2" />
                        Stop Recording
                      </button>
                    )}
                    
                    {audioBlob && !isRecording && (
                      <>
                        <button
                          onClick={isPlaying ? pauseRecording : playRecording}
                          className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg font-medium transition-colors flex items-center"
                        >
                          {isPlaying ? <Pause className="w-4 h-4 mr-1" /> : <Play className="w-4 h-4 mr-1" />}
                          {isPlaying ? 'Pause' : 'Play'}
                        </button>
                        
                        <button
                          onClick={startRecording}
                          className="bg-orange-600 hover:bg-orange-700 text-white px-3 py-2 rounded-lg font-medium transition-colors flex items-center"
                        >
                          <RotateCcw className="w-4 h-4 mr-1" />
                          Re-record
                        </button>
                        
                        <button
                          onClick={deleteRecording}
                          className="bg-gray-500 hover:bg-gray-600 text-white px-3 py-2 rounded-lg font-medium transition-colors flex items-center"
                        >
                          <Trash2 className="w-4 h-4 mr-1" />
                          Delete
                        </button>
                      </>
                    )}
                  </div>

                  {audioUrl && (
                    <audio
                      ref={audioRef}
                      src={audioUrl}
                      onEnded={() => setIsPlaying(false)}
                      onPause={() => setIsPlaying(false)}
                      className="hidden"
                    />
                  )}
                </div>
              ) : (
                /* AI Voice Generation */
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6">
                  <h3 className="text-xl font-semibold mb-4 flex items-center text-blue-700">
                    <Volume2 className="w-6 h-6 mr-2" />
                    AI Voice Option
                  </h3>
                  
                  <p className="text-sm text-gray-600 mb-4">
                    Let AI read your message with a warm, natural voice.
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
                  
                  {generatedVoiceUrl && (
                    <div className="mb-4 p-3 bg-green-100 border border-green-300 rounded-lg">
                      <div className="flex items-center justify-between">
                        <span className="text-green-700 text-sm font-medium">✓ Voice generated successfully!</span>
                        <audio controls className="h-8">
                          <source src={generatedVoiceUrl} type="audio/mpeg" />
                        </audio>
                      </div>
                    </div>
                  )}
                  
                  <button
                    onClick={generateAIVoice}
                    disabled={isGeneratingVoice || !soulHugMessage.trim()}
                    className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white py-3 rounded-lg font-medium transition-colors flex items-center justify-center"
                  >
                    <Wand2 className="w-4 h-4 mr-2" />
                    {isGeneratingVoice ? 'Generating Voice...' : 'Generate AI Voice'}
                  </button>
                  
                  {!soulHugMessage.trim() && (
                    <p className="text-xs text-gray-500 mt-2 text-center">
                      Complete your message in the Craft step to generate AI voice
                    </p>
                  )}
                </div>
              )}

              {/* Background Music */}
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6">
                <h3 className="text-xl font-semibold mb-4 flex items-center text-purple-700">
                  <Music className="w-6 h-6 mr-2" />
                  Background Music
                </h3>
                
                <div className="grid grid-cols-2 gap-3 mb-4">
                  {musicOptions.map((music) => (
                    <button
                      key={music.name}
                      onClick={() => handleMusicSelect(music.url)}
                      className={`p-3 rounded-lg text-left transition-all ${
                        selectedMusic === music.url
                          ? 'bg-purple-500 text-white shadow-lg'
                          : 'bg-white hover:bg-purple-100 text-gray-700 shadow-sm hover:shadow-md'
                      }`}
                    >
                      <div className="font-medium text-sm">{music.name}</div>
                      <div className={`text-xs mt-1 ${
                        selectedMusic === music.url ? 'text-purple-200' : 'text-gray-500'
                      }`}>
                        {music.description}
                      </div>
                    </button>
                  ))}
                </div>

                {selectedMusic && (
                  <div className="mb-4 p-3 bg-purple-100 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-purple-800 font-medium text-sm">
                        Selected: {musicOptions.find(m => m.url === selectedMusic)?.name}
                      </span>
                      <button
                        onClick={() => setSelectedMusic(null)}
                        className="text-purple-600 hover:text-purple-800 text-xs underline"
                      >
                        Remove
                      </button>
                    </div>
                    <audio controls src={selectedMusic} className="w-full h-8" />
                  </div>
                )}
              </div>

              {/* Audio Mixer */}
              {canMix && (
                <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-6">
                  <h3 className="text-xl font-semibold mb-4 flex items-center text-indigo-700">
                    <Volume2 className="w-6 h-6 mr-2" />
                    Audio Mixer
                  </h3>
                  
                  <div className="space-y-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Voice Volume: {voiceVolume}%
                      </label>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={voiceVolume}
                        onChange={(e) => handleVolumeChange('voice', Number(e.target.value))}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Music Volume: {musicVolume}%
                      </label>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={musicVolume}
                        onChange={(e) => handleVolumeChange('music', Number(e.target.value))}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                      />
                    </div>
                  </div>

                  <button
                    onClick={mixAudio}
                    disabled={isMixing}
                    className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white py-3 rounded-lg font-medium transition-colors flex items-center justify-center"
                  >
                    <Music className="w-4 h-4 mr-2" />
                    {isMixing ? 'Mixing Audio...' : 'Mix Audio'}
                  </button>

                  {mixedAudioUrl && (
                    <div className="mt-4 p-3 bg-green-100 border border-green-300 rounded-lg">
                      <div className="flex items-center justify-between">
                        <span className="text-green-700 text-sm font-medium">✓ Audio mixed successfully!</span>
                      </div>
                      <audio controls src={mixedAudioUrl} className="w-full mt-2 h-8" />
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Right Column - Cover Image */}
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-green-50 to-teal-50 rounded-2xl p-6">
                <h3 className="text-xl font-semibold mb-4 flex items-center text-green-700">
                  <Image className="w-6 h-6 mr-2" />
                  Cover Image
                </h3>
                
                <div className="grid grid-cols-3 gap-3 mb-4">
                  {presetImages.map((image) => (
                    <button
                      key={image.id}
                      onClick={() => handlePresetImageSelect(image.id)}
                      className={`aspect-square rounded-lg bg-gradient-to-br ${image.gradient} flex items-center justify-center transition-all relative group ${
                        coverImage === image.id ? 'ring-4 ring-green-500 scale-105' : 'hover:scale-105'
                      }`}
                    >
                      <Image className="w-6 h-6 text-white" />
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 rounded-lg transition-all flex items-center justify-center">
                        <span className="text-white text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                          {image.name}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>

                {coverImage && coverImage.startsWith('data:') && (
                  <div className="mb-4 relative">
                    <img 
                      src={coverImage} 
                      alt="Custom cover" 
                      className="w-full h-32 object-cover rounded-lg"
                    />
                    <button
                      onClick={() => {
                        setCoverImage(null)
                        updateCurrentSoulHug({ coverImage: undefined })
                      }}
                      className="absolute top-2 right-2 p-1 bg-red-500 hover:bg-red-600 text-white rounded-full transition-colors"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                    <div className="absolute bottom-2 left-2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded">
                      Custom Image
                    </div>
                  </div>
                )}

                {coverImage && !coverImage.startsWith('data:') && (
                  <div className="mb-4 p-3 bg-green-100 rounded-lg">
                    <div className="flex items-center justify-between">
                      <span className="text-green-800 font-medium text-sm">
                        Selected: {presetImages.find(img => img.id === coverImage)?.name}
                      </span>
                      <button
                        onClick={() => {
                          setCoverImage(null)
                          updateCurrentSoulHug({ coverImage: undefined })
                        }}
                        className="text-green-600 hover:text-green-800 text-xs underline"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                )}
                
                <label className="w-full border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-green-400 transition-colors cursor-pointer block">
                  <div className="w-6 h-6 text-gray-400 mx-auto mb-2">📁</div>
                  <span className="text-sm text-gray-600">Upload Custom Image</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleCustomImageUpload}
                    className="hidden"
                  />
                </label>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-200">
            <Link href="/craft">
              <button className="flex items-center px-6 py-3 text-gray-600 border border-gray-300 rounded-xl hover:bg-gray-50 transition-all duration-200">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Craft
              </button>
            </Link>
            
            <div className="flex space-x-3">
              <button
                onClick={handleDownload}
                disabled={!hasAudio}
                className="flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white rounded-xl font-medium transition-colors"
              >
                <Download className="w-4 h-4 mr-2" />
                Download
              </button>
              
              <button
                onClick={handleShare}
                disabled={!hasAudio}
                className="flex items-center px-6 py-3 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white rounded-xl font-medium transition-colors"
              >
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}