import { useState, useRef, useEffect } from 'react'
import { Link, useLocation } from 'wouter'
import { ArrowLeft, Save, Trash2, RotateCcw, Mic, Square, Play, Pause, Volume2, Music, Image, Download, Share2, QrCode, Mail, Copy, Check } from 'lucide-react'
import { useSoulHug } from '../context/SoulHugContext'
import JSZip from 'jszip'
import { saveAs } from 'file-saver'
import QRCode from 'qrcode'

export default function AudioHugPage() {
  const { currentSoulHug, updateCurrentSoulHug, saveCurrentSoulHug } = useSoulHug()
  const [, setLocation] = useLocation()
  
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

  // Background Music State
  const [selectedMusic, setSelectedMusic] = useState<string | null>(null)
  const [musicVolume, setMusicVolume] = useState(30)

  // Cover Image State
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [customImage, setCustomImage] = useState<string | null>(null)

  // Delivery State
  const [linkCopied, setLinkCopied] = useState(false)
  const [isDownloading, setIsDownloading] = useState(false)

  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const chunksRef = useRef<Blob[]>([])
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  // Voice options
  const voiceOptions = [
    { 
      value: 'female-warm', 
      label: 'Female - Warm & Caring', 
      description: 'Gentle, nurturing tone perfect for comfort'
    },
    { 
      value: 'male-gentle', 
      label: 'Male - Gentle & Sincere', 
      description: 'Deep, reassuring voice for meaningful messages'
    },
    { 
      value: 'neutral-calm', 
      label: 'Neutral - Calm & Soothing', 
      description: 'Peaceful, meditative quality for relaxation'
    },
  ]

  // Music tracks
  const musicTracks = [
    { id: 'gentle-piano', name: 'Gentle Piano', genre: 'Calm', duration: '3:45' },
    { id: 'nature-sounds', name: 'Nature Sounds', genre: 'Peaceful', duration: '5:20' },
    { id: 'soft-strings', name: 'Soft Strings', genre: 'Warm', duration: '4:10' },
    { id: 'ambient-calm', name: 'Ambient Calm', genre: 'Meditative', duration: '6:00' },
    { id: 'acoustic-guitar', name: 'Acoustic Guitar', genre: 'Intimate', duration: '3:30' },
    { id: 'ocean-waves', name: 'Ocean Waves', genre: 'Soothing', duration: '4:45' }
  ]

  // Preset images
  const presetImages = [
    { id: 'sunset-heart', name: 'Sunset Heart', gradient: 'bg-gradient-to-br from-orange-400 to-pink-500' },
    { id: 'ocean-waves', name: 'Ocean Waves', gradient: 'bg-gradient-to-br from-blue-400 to-teal-500' },
    { id: 'forest-path', name: 'Forest Path', gradient: 'bg-gradient-to-br from-green-400 to-emerald-500' },
    { id: 'purple-dreams', name: 'Purple Dreams', gradient: 'bg-gradient-to-br from-purple-400 to-indigo-500' },
    { id: 'golden-light', name: 'Golden Light', gradient: 'bg-gradient-to-br from-yellow-400 to-orange-500' },
    { id: 'rose-garden', name: 'Rose Garden', gradient: 'bg-gradient-to-br from-pink-400 to-rose-500' }
  ]

  // Generate message from current Soul Hug data
  const soulHugMessage = `Dear ${currentSoulHug.recipient || 'Beautiful Soul'},

I wanted to take a moment to remind you of something important - you are absolutely incredible, and here's why:

${currentSoulHug.ingredients?.map(ingredient => `• ${ingredient}`).join('\n') || '• Your amazing spirit shines through everything you do'}

${currentSoulHug.descriptors?.length ? `You are: ${currentSoulHug.descriptors.join(', ')}` : ''}

Never forget how much you mean to the people around you. Your presence makes the world a brighter place.

With gratitude and love`

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
      if (audioUrl) {
        URL.revokeObjectURL(audioUrl)
      }
    }
  }, [audioUrl])

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
      updateCurrentSoulHug({ audioUrl: mockAudioUrl })
      
    } catch (error) {
      console.error('Error generating voice:', error)
    } finally {
      setIsGeneratingVoice(false)
    }
  }

  // Music Functions
  const handleMusicSelect = (trackId: string) => {
    setSelectedMusic(trackId)
    updateCurrentSoulHug({ backgroundMusic: trackId, musicVolume })
  }

  const handleVolumeChange = (newVolume: number) => {
    setMusicVolume(newVolume)
    updateCurrentSoulHug({ musicVolume: newVolume })
  }

  // Image Functions
  const handlePresetImageSelect = (imageId: string) => {
    setSelectedImage(imageId)
    setCustomImage(null)
    updateCurrentSoulHug({ coverImage: imageId })
  }

  const handleCustomImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const result = e.target?.result as string
        setCustomImage(result)
        setSelectedImage(null)
        updateCurrentSoulHug({ coverImage: result })
      }
      reader.readAsDataURL(file)
    }
  }

  // Delivery Functions
  const handleDownload = async () => {
    setIsDownloading(true)
    
    try {
      const zip = new JSZip()
      
      // Add message as text file
      if (soulHugMessage) {
        zip.file('soul-hug-message.txt', soulHugMessage)
      }
      
      // Add audio file (mock for now)
      if (audioUrl || generatedVoiceUrl) {
        try {
          const audioResponse = await fetch(audioUrl || generatedVoiceUrl || '')
          const audioBlob = await audioResponse.blob()
          zip.file('soul-hug-audio.mp3', audioBlob)
        } catch (error) {
          console.log('Audio file not available for download')
        }
      }
      
      // Add cover image
      if (selectedImage || customImage) {
        try {
          const imageUrl = customImage || `/images/${selectedImage}.jpg`
          const imageResponse = await fetch(imageUrl)
          const imageBlob = await imageResponse.blob()
          const extension = imageUrl.includes('.png') ? 'png' : 'jpg'
          zip.file(`cover-image.${extension}`, imageBlob)
        } catch (error) {
          console.log('Cover image not available for download')
        }
      }
      
      // Generate and save zip
      const content = await zip.generateAsync({ type: 'blob' })
      const filename = `soul-hug-${currentSoulHug.recipient || 'package'}-${Date.now()}.zip`
      saveAs(content, filename)
      
    } catch (error) {
      console.error('Error creating download package:', error)
      alert('Error creating download package. Please try again.')
    } finally {
      setIsDownloading(false)
    }
  }

  const handleShareLink = async () => {
    const shareUrl = `${window.location.origin}/hug/${currentSoulHug.id || Date.now()}`
    try {
      await navigator.clipboard.writeText(shareUrl)
      setLinkCopied(true)
      setTimeout(() => setLinkCopied(false), 2000)
    } catch (error) {
      console.error('Error copying to clipboard:', error)
    }
  }

  const handleQRCode = async () => {
    const shareUrl = `${window.location.origin}/hug/${currentSoulHug.id || Date.now()}`
    try {
      const qrCodeDataUrl = await QRCode.toDataURL(shareUrl, {
        width: 300,
        margin: 2,
        color: {
          dark: '#8B5CF6',
          light: '#FFFFFF'
        }
      })
      
      const link = document.createElement('a')
      link.href = qrCodeDataUrl
      link.download = `soul-hug-qr-${currentSoulHug.id || Date.now()}.png`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      
    } catch (error) {
      console.error('Error generating QR code:', error)
      alert('Error generating QR code. Please try again.')
    }
  }

  const handleEmail = () => {
    const subject = encodeURIComponent(`A Soul Hug for You${currentSoulHug.recipient ? ` - ${currentSoulHug.recipient}` : ''}`)
    const body = encodeURIComponent(`I've created a special Soul Hug message for you. Listen to it here: ${window.location.origin}/hug/${currentSoulHug.id || Date.now()}

${soulHugMessage ? `\n\nMessage preview:\n${soulHugMessage.substring(0, 200)}${soulHugMessage.length > 200 ? '...' : ''}` : ''}

With love ❤️`)
    
    window.location.href = `mailto:?subject=${subject}&body=${body}`
  }

  const handleSaveAndSend = () => {
    updateCurrentSoulHug({
      message: soulHugMessage,
      audioUrl: audioUrl || generatedVoiceUrl || undefined,
      coverImage: selectedImage || customImage || undefined,
      backgroundMusic: selectedMusic || undefined,
      musicVolume,
      createdAt: new Date().toISOString()
    })
    
    saveCurrentSoulHug()
    setLocation('/my-hugs')
  }

  const handleReset = () => {
    updateCurrentSoulHug({
      audioUrl: undefined,
      coverImage: undefined,
      backgroundMusic: undefined,
      musicVolume: 30
    })
    setAudioBlob(null)
    setAudioUrl(null)
    setGeneratedVoiceUrl(null)
    setSelectedMusic(null)
    setSelectedImage(null)
    setCustomImage(null)
    setMusicVolume(30)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

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

          {/* Audio Creation Options */}
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Left Column */}
            <div className="space-y-6">
              {/* Voice Recording */}
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

                <div className="text-center mb-4">
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
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center"
                      >
                        {isPlaying ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
                        {isPlaying ? 'Pause' : 'Play'}
                      </button>
                      
                      <button
                        onClick={startRecording}
                        className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center"
                      >
                        <RotateCcw className="w-4 h-4 mr-2" />
                        Re-record
                      </button>
                      
                      <button
                        onClick={deleteRecording}
                        className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center"
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
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

              {/* AI Voice Generation */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6">
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
                            // Preview voice functionality would go here
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
                  {isGeneratingVoice ? 'Generating Voice...' : 'Generate AI Voice'}
                </button>
                
                {!soulHugMessage.trim() && (
                  <p className="text-xs text-gray-500 mt-2 text-center">
                    Complete your message in the Craft step to generate AI voice
                  </p>
                )}
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Background Music */}
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6">
                <h3 className="text-xl font-semibold mb-4 flex items-center text-purple-700">
                  <Music className="w-6 h-6 mr-2" />
                  Background Music
                </h3>
                
                <div className="grid grid-cols-2 gap-3 mb-6">
                  {musicTracks.map((track) => (
                    <button
                      key={track.id}
                      onClick={() => handleMusicSelect(track.id)}
                      className={`p-3 rounded-lg text-left transition-all relative group ${
                        selectedMusic === track.id
                          ? 'bg-purple-500 text-white shadow-lg'
                          : 'bg-white hover:bg-purple-100 text-gray-700 shadow-sm hover:shadow-md'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-sm truncate">{track.name}</div>
                          <div className={`text-xs mt-1 ${
                            selectedMusic === track.id ? 'text-purple-200' : 'text-gray-500'
                          }`}>
                            {track.genre} • {track.duration}
                          </div>
                        </div>
                        
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            // Preview music functionality would go here
                          }}
                          className={`ml-2 p-1 rounded transition-colors ${
                            selectedMusic === track.id
                              ? 'hover:bg-purple-400'
                              : 'hover:bg-purple-200'
                          }`}
                        >
                          <Play className="w-3 h-3" />
                        </button>
                      </div>
                    </button>
                  ))}
                </div>

                {selectedMusic && (
                  <div className="mb-4 p-3 bg-purple-100 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-purple-800 font-medium text-sm">
                        Selected: {musicTracks.find(t => t.id === selectedMusic)?.name}
                      </span>
                      <button
                        onClick={() => setSelectedMusic(null)}
                        className="text-purple-600 hover:text-purple-800 text-xs underline"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                )}

                <div className="space-y-3">
                  <div>
                    <label htmlFor="music-volume" className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                      <Volume2 className="w-4 h-4 mr-1" />
                      Music Volume: {musicVolume}%
                    </label>
                    <input
                      id="music-volume"
                      name="musicVolume"
                      type="range"
                      min="0"
                      max="100"
                      value={musicVolume}
                      onChange={(e) => handleVolumeChange(Number(e.target.value))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                    />
                  </div>
                </div>
              </div>

              {/* Cover Image */}
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
                      className={`aspect-square rounded-lg ${image.gradient} flex items-center justify-center transition-all relative group ${
                        selectedImage === image.id ? 'ring-4 ring-green-500 scale-105' : 'hover:scale-105'
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

                {customImage && (
                  <div className="mb-4 relative">
                    <img 
                      src={customImage} 
                      alt="Custom cover" 
                      className="w-full h-32 object-cover rounded-lg"
                    />
                    <button
                      onClick={() => {
                        setCustomImage(null)
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

                {selectedImage && !customImage && (
                  <div className="mb-4 p-3 bg-green-100 rounded-lg">
                    <div className="flex items-center justify-between">
                      <span className="text-green-800 font-medium text-sm">
                        Selected: {presetImages.find(img => img.id === selectedImage)?.name}
                      </span>
                      <button
                        onClick={() => {
                          setSelectedImage(null)
                          updateCurrentSoulHug({ coverImage: undefined })
                        }}
                        className="text-green-600 hover:text-green-800 text-xs underline"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                )}
                
                <label htmlFor="custom-image" className="w-full border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-green-400 transition-colors cursor-pointer block">
                  <div className="w-6 h-6 text-gray-400 mx-auto mb-2">📁</div>
                  <span className="text-sm text-gray-600">Upload Custom Image</span>
                  <input
                    id="custom-image"
                    name="customImage"
                    type="file"
                    accept="image/*"
                    onChange={handleCustomImageUpload}
                    className="hidden"
                  />
                </label>
              </div>
            </div>
          </div>

          {/* Delivery Options */}
          <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl p-6 mt-8">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">Delivery Options</h3>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <button
                onClick={handleDownload}
                disabled={isDownloading}
                className="flex flex-col items-center p-4 bg-white rounded-lg hover:bg-blue-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow-md"
              >
                <Download className={`w-8 h-8 text-blue-600 mb-2 ${isDownloading ? 'animate-bounce' : ''}`} />
                <span className="text-sm font-medium text-gray-700">
                  {isDownloading ? 'Creating...' : 'Download'}
                </span>
                <span className="text-xs text-gray-500 mt-1">ZIP Package</span>
              </button>
              
              <button
                onClick={handleShareLink}
                className="flex flex-col items-center p-4 bg-white rounded-lg hover:bg-blue-50 transition-colors shadow-sm hover:shadow-md"
              >
                {linkCopied ? (
                  <Check className="w-8 h-8 text-green-600 mb-2" />
                ) : (
                  <Share2 className="w-8 h-8 text-purple-600 mb-2" />
                )}
                <span className="text-sm font-medium text-gray-700">
                  {linkCopied ? 'Copied!' : 'Copy Link'}
                </span>
                <span className="text-xs text-gray-500 mt-1">Share URL</span>
              </button>
              
              <button
                onClick={handleQRCode}
                className="flex flex-col items-center p-4 bg-white rounded-lg hover:bg-blue-50 transition-colors shadow-sm hover:shadow-md"
              >
                <QrCode className="w-8 h-8 text-indigo-600 mb-2" />
                <span className="text-sm font-medium text-gray-700">QR Code</span>
                <span className="text-xs text-gray-500 mt-1">Download PNG</span>
              </button>
              
              <button
                onClick={handleEmail}
                className="flex flex-col items-center p-4 bg-white rounded-lg hover:bg-blue-50 transition-colors shadow-sm hover:shadow-md"
              >
                <Mail className="w-8 h-8 text-green-600 mb-2" />
                <span className="text-sm font-medium text-gray-700">Send Email</span>
                <span className="text-xs text-gray-500 mt-1">Mail Client</span>
              </button>
            </div>

            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <h4 className="font-medium text-gray-800 mb-2">Share URL:</h4>
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={`${window.location.origin}/hug/${currentSoulHug.id || Date.now()}`}
                  readOnly
                  className="flex-1 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-600 focus:outline-none"
                />
                <button
                  onClick={handleShareLink}
                  className="p-2 bg-purple-100 hover:bg-purple-200 rounded-lg transition-colors"
                  title="Copy to clipboard"
                >
                  {linkCopied ? (
                    <Check className="w-4 h-4 text-green-600" />
                  ) : (
                    <Copy className="w-4 h-4 text-purple-600" />
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Final Action Buttons */}
          <div className="flex justify-center space-x-4 mt-8">
            <button 
              onClick={handleReset}
              className="flex items-center px-6 py-3 text-gray-600 border border-gray-300 rounded-xl hover:bg-gray-50 transition-all duration-200"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset All
            </button>
            
            <button 
              onClick={() => setLocation('/craft')}
              className="flex items-center px-6 py-3 text-red-600 border border-red-300 rounded-xl hover:bg-red-50 transition-all duration-200"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Start Over
            </button>
            
            <div className="flex-1 max-w-xs">
              <button 
                onClick={handleSaveAndSend}
                disabled={!soulHugMessage.trim() && !audioUrl && !generatedVoiceUrl}
                className="w-full flex items-center justify-center soul-button disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Save className="w-4 h-4 mr-2" />
                Save & Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}