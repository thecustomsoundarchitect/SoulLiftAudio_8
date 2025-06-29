import { useState, useRef, useEffect } from 'react'
import { Link } from 'wouter'
import { Mic, Square, Play, Pause, Trash2, Download, Share2, ArrowLeft } from 'lucide-react'
import { useSoulHug } from '../context/SoulHugContext'

export default function AudioHugPage() {
  const { currentSoulHug, updateCurrentSoulHug } = useSoulHug()
  
  const [isRecording, setIsRecording] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null)
  const [audioUrl, setAudioUrl] = useState<string | null>(null)
  const [recordingTime, setRecordingTime] = useState(0)
  const [error, setError] = useState<string | null>(null)

  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const chunksRef = useRef<Blob[]>([])
  const timerRef = useRef<NodeJS.Timeout | null>(null)

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

  const handleDownload = () => {
    if (audioUrl) {
      const link = document.createElement('a')
      link.href = audioUrl
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

  // Generate message preview from current Soul Hug data
  const messagePreview = `Dear ${currentSoulHug.recipient || 'Beautiful Soul'},

${currentSoulHug.ingredients?.slice(0, 3).map(ingredient => `• ${ingredient}`).join('\n') || '• Your amazing spirit shines through everything you do'}

${currentSoulHug.descriptors?.length ? `You are: ${currentSoulHug.descriptors.slice(0, 5).join(', ')}` : ''}

Never forget how much you mean to the people around you.

With love ❤️`

  return (
    <div className="min-h-screen pt-8 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
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
              {messagePreview}
            </div>
          </div>

          {/* Audio Recording Section */}
          <div className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-2xl p-6 mb-8">
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

            <div className="flex justify-center space-x-3 mb-4">
              {!isRecording && !audioBlob && (
                <button
                  onClick={startRecording}
                  className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center"
                >
                  <Mic className="w-4 h-4 mr-2" />
                  Start Recording
                </button>
              )}
              
              {isRecording && (
                <button
                  onClick={stopRecording}
                  className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center"
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
                    <Mic className="w-4 h-4 mr-2" />
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

          {/* Action Buttons */}
          <div className="flex justify-between items-center">
            <Link href="/craft">
              <button className="flex items-center px-6 py-3 text-gray-600 border border-gray-300 rounded-xl hover:bg-gray-50 transition-all duration-200">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Craft
              </button>
            </Link>
            
            <div className="flex space-x-3">
              <button
                onClick={handleDownload}
                disabled={!audioUrl}
                className="flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white rounded-xl font-medium transition-colors"
              >
                <Download className="w-4 h-4 mr-2" />
                Download
              </button>
              
              <button
                onClick={handleShare}
                disabled={!audioUrl}
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