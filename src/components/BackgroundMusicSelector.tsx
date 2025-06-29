import React, { useState } from 'react'
import { Music, Play, Pause, Volume2 } from 'lucide-react'

interface BackgroundMusicSelectorProps {
  onMusicSelected: (musicUrl: string | null, volume: number) => void
  className?: string
}

const musicTracks = [
  { 
    id: 'gentle-piano', 
    name: 'Gentle Piano', 
    genre: 'Calm', 
    duration: '3:45',
    url: '/music/gentle-piano.mp3',
    description: 'Soft piano melodies for peaceful moments'
  },
  { 
    id: 'nature-sounds', 
    name: 'Nature Sounds', 
    genre: 'Peaceful', 
    duration: '5:20',
    url: '/music/nature-sounds.mp3',
    description: 'Birds chirping and gentle water sounds'
  },
  { 
    id: 'soft-strings', 
    name: 'Soft Strings', 
    genre: 'Warm', 
    duration: '4:10',
    url: '/music/soft-strings.mp3',
    description: 'Warm string ensemble for emotional depth'
  },
  { 
    id: 'ambient-calm', 
    name: 'Ambient Calm', 
    genre: 'Meditative', 
    duration: '6:00',
    url: '/music/ambient-calm.mp3',
    description: 'Ethereal pads for deep relaxation'
  },
  { 
    id: 'acoustic-guitar', 
    name: 'Acoustic Guitar', 
    genre: 'Intimate', 
    duration: '3:30',
    url: '/music/acoustic-guitar.mp3',
    description: 'Fingerpicked guitar for personal connection'
  },
  { 
    id: 'ocean-waves', 
    name: 'Ocean Waves', 
    genre: 'Soothing', 
    duration: '4:45',
    url: '/music/ocean-waves.mp3',
    description: 'Gentle waves for tranquil atmosphere'
  }
]

export const BackgroundMusicSelector: React.FC<BackgroundMusicSelectorProps> = ({ 
  onMusicSelected, 
  className = '' 
}) => {
  const [selectedTrack, setSelectedTrack] = useState<string | null>(null)
  const [isPlaying, setIsPlaying] = useState<string | null>(null)
  const [volume, setVolume] = useState(30)
  const [audioElements] = useState<{ [key: string]: HTMLAudioElement }>({})

  const handleTrackSelect = (trackId: string) => {
    const track = musicTracks.find(t => t.id === trackId)
    if (track) {
      setSelectedTrack(trackId)
      onMusicSelected(track.url, volume)
    }
  }

  const handleVolumeChange = (newVolume: number) => {
    setVolume(newVolume)
    if (selectedTrack) {
      const track = musicTracks.find(t => t.id === selectedTrack)
      if (track) {
        onMusicSelected(track.url, newVolume)
      }
    }
  }

  const togglePlayPreview = (trackId: string) => {
    const track = musicTracks.find(t => t.id === trackId)
    if (!track) return

    // Stop any currently playing audio
    Object.values(audioElements).forEach(audio => {
      audio.pause()
      audio.currentTime = 0
    })

    if (isPlaying === trackId) {
      setIsPlaying(null)
      return
    }

    // Create or get audio element
    if (!audioElements[trackId]) {
      audioElements[trackId] = new Audio(track.url)
      audioElements[trackId].volume = 0.3
      audioElements[trackId].addEventListener('ended', () => {
        setIsPlaying(null)
      })
    }

    audioElements[trackId].play()
    setIsPlaying(trackId)
  }

  const clearSelection = () => {
    setSelectedTrack(null)
    onMusicSelected(null, volume)
    
    // Stop any playing audio
    Object.values(audioElements).forEach(audio => {
      audio.pause()
      audio.currentTime = 0
    })
    setIsPlaying(null)
  }

  return (
    <div className={`bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 ${className}`}>
      <h3 className="text-xl font-semibold mb-4 flex items-center text-purple-700">
        <Music className="w-6 h-6 mr-2" />
        Background Music
      </h3>
      
      <div className="grid grid-cols-2 gap-3 mb-6">
        {musicTracks.map((track) => (
          <button
            key={track.id}
            onClick={() => handleTrackSelect(track.id)}
            className={`p-3 rounded-lg text-left transition-all relative group ${
              selectedTrack === track.id
                ? 'bg-purple-500 text-white shadow-lg'
                : 'bg-white hover:bg-purple-100 text-gray-700 shadow-sm hover:shadow-md'
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1 min-w-0">
                <div className="font-medium text-sm truncate">{track.name}</div>
                <div className={`text-xs mt-1 ${
                  selectedTrack === track.id ? 'text-purple-200' : 'text-gray-500'
                }`}>
                  {track.genre} • {track.duration}
                </div>
                <div className={`text-xs mt-1 ${
                  selectedTrack === track.id ? 'text-purple-100' : 'text-gray-400'
                }`}>
                  {track.description}
                </div>
              </div>
              
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  togglePlayPreview(track.id)
                }}
                className={`ml-2 p-1 rounded transition-colors ${
                  selectedTrack === track.id
                    ? 'hover:bg-purple-400'
                    : 'hover:bg-purple-200'
                }`}
              >
                {isPlaying === track.id ? (
                  <Pause className="w-3 h-3" />
                ) : (
                  <Play className="w-3 h-3" />
                )}
              </button>
            </div>
          </button>
        ))}
      </div>

      {selectedTrack && (
        <div className="mb-4 p-3 bg-purple-100 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-purple-800 font-medium text-sm">
              Selected: {musicTracks.find(t => t.id === selectedTrack)?.name}
            </span>
            <button
              onClick={clearSelection}
              className="text-purple-600 hover:text-purple-800 text-xs underline"
            >
              Remove
            </button>
          </div>
        </div>
      )}

      <div className="space-y-3">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
            <Volume2 className="w-4 h-4 mr-1" />
            Music Volume: {volume}%
          </label>
          <input
            type="range"
            min="0"
            max="100"
            value={volume}
            onChange={(e) => handleVolumeChange(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
          />
        </div>
      </div>
    </div>
  )
}