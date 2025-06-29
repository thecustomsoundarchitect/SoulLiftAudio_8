import { useEffect, useState } from 'react'
import { Play, Heart, Calendar, Download, Share2, X, Plus, Sparkles, CheckCircle, Star, Pause } from 'lucide-react'
import { Link } from 'wouter'
import { motion, AnimatePresence } from 'framer-motion'
import { useSoulHug } from '../context/SoulHugContext'

// Dummy data for demonstration
const dummySoulHugs = [
  {
    id: '1',
    recipient: 'Mom',
    coreFeeling: 'deeply loved',
    occasion: 'Birthday',
    tone: 'Warm & Loving',
    message: `Dear Mom,

Your love and wisdom have shaped who I am today. Every lesson you taught me, every hug you gave me, and every sacrifice you made has led me to this moment. On your special day, I want you to know how deeply grateful I am to have you as my mother.

You've always been my biggest supporter, my voice of reason, and my source of unconditional love. The way you light up a room with your smile and make everyone feel welcome is truly magical. May this year bring you all the joy and happiness you've given to others.

With endless love and gratitude ❤️`,
    ingredients: [
      'Your unwavering support through every challenge',
      'The way you make everyone feel welcome and loved',
      'Your incredible strength and wisdom',
      'How you taught me to be kind and compassionate'
    ],
    descriptors: ['Caring', 'Strong', 'Wise', 'Loving'],
    audioUrl: '/audio/mom-birthday.mp3',
    coverImage: '/images/sunset-heart.jpg',
    createdAt: '2024-01-15T10:30:00Z',
    duration: '3:45'
  },
  {
    id: '2',
    recipient: 'Sarah',
    coreFeeling: 'encouraged',
    occasion: 'Difficult Time',
    tone: 'Gentle & Comforting',
    message: `Hey Sarah,

I know things have been tough lately, but I want you to remember something important - you are absolutely incredible. Your strength and determination inspire me every single day. The way you handle challenges with grace and keep pushing forward is remarkable.

You've overcome so much already, and I have complete faith that you'll get through this too. Your resilience, your kind heart, and your brilliant mind are more powerful than any obstacle in your path.

Remember: you are braver than you believe, stronger than you seem, and more loved than you know. I'm here for you, always.

Sending you strength and love 💪`,
    ingredients: [
      'Your incredible resilience in tough times',
      'The grace with which you handle challenges',
      'Your kind heart that touches everyone',
      'The strength you show even when you don\'t feel strong'
    ],
    descriptors: ['Brave', 'Resilient', 'Kind', 'Strong'],
    audioUrl: '/audio/sarah-encouragement.mp3',
    createdAt: '2024-01-20T14:15:00Z',
    duration: '2:30'
  },
  {
    id: '3',
    recipient: 'Dad',
    coreFeeling: 'appreciated',
    occasion: 'Thank You',
    tone: 'Heartfelt & Sincere',
    message: `Dear Dad,

I've been thinking about all the ways you've shaped my life, and I realized I don't say "thank you" nearly enough. Your guidance, your patience, and your unwavering support have been the foundation of everything good in my life.

From teaching me to ride a bike to helping me navigate life's biggest decisions, you've always been there. Your wisdom, your work ethic, and your integrity have shown me what it means to be a good person.

Thank you for believing in me even when I didn't believe in myself. Thank you for your sacrifices, your love, and for being the amazing father you are.

With endless gratitude 🙏`,
    ingredients: [
      'Your patient guidance through all of life\'s lessons',
      'The way you believed in me when I couldn\'t',
      'Your incredible work ethic and integrity',
      'How you taught me what it means to be good'
    ],
    descriptors: ['Patient', 'Wise', 'Supportive', 'Honest'],
    audioUrl: '/audio/dad-gratitude.mp3',
    createdAt: '2024-01-25T09:45:00Z',
    duration: '4:15'
  },
  {
    id: '4',
    recipient: 'Best Friend',
    coreFeeling: 'cherished',
    occasion: 'Just Because',
    tone: 'Playful & Fun',
    message: `Hey you amazing human!

I was just thinking about our friendship and couldn't help but smile. You bring so much joy, laughter, and light into my life. From our inside jokes to our deep 2 AM conversations, every moment with you is a treasure.

You have this incredible ability to make everyone around you feel special and loved. Your authenticity, your humor, and your generous heart make you one of the most wonderful people I know.

Thank you for being you - for your friendship, your support, and for all the memories we've created together. Here's to many more adventures ahead!

Love you to the moon and back! 🌙✨`,
    ingredients: [
      'Your infectious laughter and joy',
      'The way you make everyone feel special',
      'Our incredible inside jokes and memories',
      'Your authentic and generous heart'
    ],
    descriptors: ['Funny', 'Loyal', 'Authentic', 'Generous'],
    createdAt: '2024-02-01T16:20:00Z',
    duration: '2:45'
  },
  {
    id: '5',
    recipient: 'Alex',
    coreFeeling: 'proud',
    occasion: 'Graduation',
    tone: 'Inspiring & Uplifting',
    message: `Congratulations Alex!

What an incredible achievement! All those late nights studying, the stress of exams, the hard work and dedication - it has all led to this amazing moment. I am so incredibly proud of you and everything you've accomplished.

Your determination, intelligence, and perseverance have brought you to this milestone. But more than that, your kindness, your curiosity, and your passion for learning make you truly special.

As you step into this next chapter, remember that this is just the beginning. You have so much potential and so many wonderful things ahead of you. The world is lucky to have someone like you ready to make a difference.

Celebrating you today and always! 🎉`,
    ingredients: [
      'Your incredible determination and hard work',
      'The late nights and dedication you put in',
      'Your natural curiosity and love of learning',
      'The bright future that awaits you'
    ],
    descriptors: ['Smart', 'Determined', 'Curious', 'Passionate'],
    audioUrl: '/audio/alex-graduation.mp3',
    createdAt: '2024-02-10T11:00:00Z',
    duration: '3:20'
  }
]

export default function MyHugsPage() {
  const { savedSoulHugs, loadSavedSoulHugs, deleteSoulHug } = useSoulHug()
  const [hoveredHug, setHoveredHug] = useState<string | null>(null)
  const [expandedHug, setExpandedHug] = useState<any>(null)
  const [playingAudio, setPlayingAudio] = useState<string | null>(null)

  // Use dummy data for demonstration
  const displayHugs = savedSoulHugs.length > 0 ? savedSoulHugs : dummySoulHugs

  useEffect(() => {
    loadSavedSoulHugs()
  }, [])

  const getThumbnailGradient = (feeling: string) => {
    const gradientMap: { [key: string]: string } = {
      'love': 'from-pink-400 via-rose-500 to-purple-500',
      'loved': 'from-pink-400 via-rose-500 to-purple-500',
      'appreciation': 'from-blue-400 via-cyan-500 to-teal-500',
      'appreciated': 'from-blue-400 via-cyan-500 to-teal-500',
      'support': 'from-green-400 via-emerald-500 to-blue-500',
      'encouraged': 'from-green-400 via-emerald-500 to-blue-500',
      'encouragement': 'from-yellow-400 via-orange-500 to-red-500',
      'gratitude': 'from-purple-400 via-pink-500 to-rose-500',
      'cherished': 'from-indigo-400 via-purple-500 to-pink-500',
      'proud': 'from-yellow-400 via-orange-500 to-red-500'
    }
    return gradientMap[feeling?.toLowerCase()] || 'from-gray-400 via-gray-500 to-gray-600'
  }

  const getTitle = (hug: any) => {
    if (hug.occasion && hug.recipient) {
      return `${hug.occasion} Message for ${hug.recipient}`
    } else if (hug.recipient) {
      return `Soul Hug for ${hug.recipient}`
    } else {
      return `${hug.coreFeeling} Message`
    }
  }

  const getDescription = (hug: any) => {
    const parts = []
    if (hug.tone) parts.push(hug.tone)
    if (hug.occasion) parts.push(hug.occasion)
    if (hug.createdAt) {
      const date = new Date(hug.createdAt)
      parts.push(date.toLocaleDateString())
    }
    return parts.join(' • ')
  }

  const toggleAudio = (hugId: string, audioUrl: string) => {
    if (playingAudio === hugId) {
      setPlayingAudio(null)
    } else {
      setPlayingAudio(hugId)
      // In a real app, you'd play the actual audio here
      setTimeout(() => setPlayingAudio(null), 3000) // Mock 3 second playback
    }
  }

  const handleShare = async (hug: any) => {
    const shareUrl = `${window.location.origin}/hug/${hug.id}`
    try {
      await navigator.clipboard.writeText(shareUrl)
      alert('Share link copied to clipboard!')
    } catch (error) {
      console.error('Error copying to clipboard:', error)
    }
  }

  const handleDownload = (hug: any) => {
    if (hug.message) {
      const element = document.createElement('a')
      const file = new Blob([hug.message], { type: 'text/plain' })
      element.href = URL.createObjectURL(file)
      element.download = `soul-hug-${hug.recipient || 'message'}.txt`
      document.body.appendChild(element)
      element.click()
      document.body.removeChild(element)
    }
  }

  const handleDelete = (hugId: string) => {
    if (savedSoulHugs.length > 0) {
      deleteSoulHug(hugId)
    } else {
      // For dummy data, just close the modal
      setExpandedHug(null)
      alert('This is demo data - in the real app, this would delete the Soul Hug!')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-green-50/20 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ 
            x: [0, 120, 0],
            y: [0, -60, 0],
            rotate: [0, 180, 360]
          }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute top-20 right-10 w-32 h-32 bg-gradient-to-r from-green-200/30 to-teal-200/30 rounded-full blur-xl"
        />
        <motion.div
          animate={{ 
            x: [0, -100, 0],
            y: [0, 80, 0],
            rotate: [360, 180, 0]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-20 left-10 w-40 h-40 bg-gradient-to-r from-blue-200/30 to-green-200/30 rounded-full blur-xl"
        />
      </div>

      {/* Floating back button */}
      <motion.div 
        className="fixed top-6 left-6 z-10"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <Link href="/">
          <button className="flex items-center justify-center w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100/50 group">
            <Heart className="w-5 h-5 text-gray-600 group-hover:text-green-600 transition-colors" />
          </button>
        </Link>
      </motion.div>

      <div className="max-w-4xl mx-auto px-6 py-20 relative z-10">
        {/* Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.h1 
            className="text-4xl font-bold mb-4 tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              MY SOUL HUGS
            </span>
          </motion.h1>
          
          <motion.p 
            className="text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            Your saved creations and heartfelt messages
          </motion.p>

          {savedSoulHugs.length === 0 && (
            <motion.div
              className="mt-4 px-4 py-2 bg-blue-100 border border-blue-300 rounded-lg inline-block"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 }}
            >
              <p className="text-blue-700 text-sm">
                ✨ Showing demo data - create your own Soul Hugs to see them here!
              </p>
            </motion.div>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          {/* Expandable Cards */}
          <div className="max-w-2xl mx-auto w-full gap-4">
            {displayHugs.map((hug, index) => (
              <motion.div
                key={hug.id}
                layoutId={`card-${hug.id}`}
                onClick={() => setExpandedHug(hug)}
                className="p-4 flex flex-col md:flex-row justify-between items-center hover:bg-neutral-50 rounded-xl cursor-pointer mb-4 bg-white shadow-sm border border-gray-100"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02, y: -2 }}
              >
                <div className="flex gap-4 flex-col md:flex-row w-full">
                  <motion.div 
                    layoutId={`image-${hug.id}`}
                    className={`h-40 w-40 md:h-14 md:w-14 rounded-lg bg-gradient-to-br ${getThumbnailGradient(hug.coreFeeling)} flex items-center justify-center flex-shrink-0`}
                  >
                    <Heart className="w-8 h-8 md:w-6 md:h-6 text-white" />
                  </motion.div>
                  <div className="flex-1">
                    <motion.h3
                      layoutId={`title-${hug.id}`}
                      className="font-medium text-neutral-800 text-center md:text-left mb-1"
                    >
                      {getTitle(hug)}
                    </motion.h3>
                    <motion.p
                      layoutId={`description-${hug.id}`}
                      className="text-neutral-600 text-center md:text-left text-sm"
                    >
                      {getDescription(hug)}
                    </motion.p>
                  </div>
                </div>
                <div className="flex items-center gap-2 mt-4 md:mt-0">
                  {hug.audioUrl && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        toggleAudio(hug.id, hug.audioUrl)
                      }}
                      className="p-2 bg-blue-100 hover:bg-blue-200 rounded-full transition-colors"
                    >
                      {playingAudio === hug.id ? (
                        <Pause className="w-4 h-4 text-blue-600" />
                      ) : (
                        <Play className="w-4 h-4 text-blue-600" />
                      )}
                    </button>
                  )}
                  <motion.button
                    layoutId={`button-${hug.id}`}
                    className="px-4 py-2 text-sm rounded-full font-bold bg-gray-100 hover:bg-green-500 hover:text-white text-black transition-colors"
                  >
                    View
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Expanded Modal */}
          <AnimatePresence>
            {expandedHug && (
              <>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 bg-black/20 h-full w-full z-10"
                  onClick={() => setExpandedHug(null)}
                />
                <div className="fixed inset-0 grid place-items-center z-[100] p-4">
                  <motion.div
                    layoutId={`card-${expandedHug.id}`}
                    className="w-full max-w-[500px] h-full md:h-fit md:max-h-[90%] flex flex-col bg-white rounded-3xl overflow-hidden shadow-2xl"
                  >
                    <motion.div 
                      layoutId={`image-${expandedHug.id}`}
                      className={`w-full h-80 bg-gradient-to-br ${getThumbnailGradient(expandedHug.coreFeeling)} flex items-center justify-center relative`}
                    >
                      <Heart className="w-16 h-16 text-white" />
                      <button
                        onClick={() => setExpandedHug(null)}
                        className="absolute top-4 right-4 p-2 bg-white/20 hover:bg-white/30 rounded-full transition-colors"
                      >
                        <X className="w-5 h-5 text-white" />
                      </button>
                    </motion.div>

                    <div className="p-6 flex-1 overflow-y-auto">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <motion.h3
                            layoutId={`title-${expandedHug.id}`}
                            className="font-bold text-neutral-700 text-xl mb-2"
                          >
                            {getTitle(expandedHug)}
                          </motion.h3>
                          <motion.p
                            layoutId={`description-${expandedHug.id}`}
                            className="text-neutral-600"
                          >
                            {getDescription(expandedHug)}
                          </motion.p>
                        </div>
                      </div>

                      <div className="space-y-4">
                        {expandedHug.message && (
                          <div>
                            <h4 className="font-semibold text-gray-800 mb-2">Message:</h4>
                            <div className="bg-gray-50 rounded-lg p-4 text-gray-700 leading-relaxed whitespace-pre-line">
                              {expandedHug.message}
                            </div>
                          </div>
                        )}

                        {expandedHug.ingredients && expandedHug.ingredients.length > 0 && (
                          <div>
                            <h4 className="font-semibold text-gray-800 mb-2">Ingredients:</h4>
                            <div className="space-y-2">
                              {expandedHug.ingredients.map((ingredient: string, index: number) => (
                                <div key={index} className="bg-purple-50 rounded-lg p-3 text-sm">
                                  {ingredient}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {expandedHug.descriptors && expandedHug.descriptors.length > 0 && (
                          <div>
                            <h4 className="font-semibold text-gray-800 mb-2">Descriptors:</h4>
                            <div className="flex flex-wrap gap-2">
                              {expandedHug.descriptors.map((descriptor: string) => (
                                <span
                                  key={descriptor}
                                  className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                                >
                                  {descriptor}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                        <div className="flex gap-3 pt-4 border-t">
                          <button
                            onClick={() => handleShare(expandedHug)}
                            className="flex-1 flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                          >
                            <Share2 className="w-4 h-4 mr-2" />
                            Share
                          </button>
                          <button
                            onClick={() => handleDownload(expandedHug)}
                            className="flex-1 flex items-center justify-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                          >
                            <Download className="w-4 h-4 mr-2" />
                            Download
                          </button>
                          <button
                            onClick={() => handleDelete(expandedHug.id)}
                            className="px-4 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Stats */}
        <motion.div 
          className="mt-16 pt-8 border-t border-gray-200"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.6 }}
        >
          <div className="grid grid-cols-3 gap-6">
            <motion.div 
              className="text-center bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/50 shadow-lg"
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <motion.div 
                className="text-3xl font-bold text-purple-600 mb-2"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {displayHugs.length}
              </motion.div>
              <div className="text-sm text-gray-600 font-medium">Total Hugs</div>
            </motion.div>
            
            <motion.div 
              className="text-center bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/50 shadow-lg"
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <motion.div 
                className="text-3xl font-bold text-blue-600 mb-2"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
              >
                {displayHugs.reduce((total, hug) => {
                  const duration = hug.duration || '2:30'
                  const [min, sec] = duration.split(':').map(Number)
                  return total + min + sec / 60
                }, 0).toFixed(0)}
              </motion.div>
              <div className="text-sm text-gray-600 font-medium">Minutes Created</div>
            </motion.div>
            
            <motion.div 
              className="text-center bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/50 shadow-lg"
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <motion.div 
                className="text-3xl font-bold text-green-600 mb-2"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: 1 }}
              >
                {new Set(displayHugs.map(hug => hug.recipient)).size}
              </motion.div>
              <div className="text-sm text-gray-600 font-medium">People Touched</div>
            </motion.div>
          </div>
        </motion.div>

        {/* Create New Button */}
        <motion.div 
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
        >
          <Link href="/define">
            <motion.button 
              className="soul-button text-lg px-8 py-4 relative overflow-hidden"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
                animate={{ x: ["-100%", "100%"] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              />
              <span className="relative z-10 flex items-center">
                <Plus className="w-5 h-5 mr-2" />
                Create New Soul Hug
                <motion.div
                  className="ml-2"
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                >
                  <Sparkles className="w-5 h-5 opacity-70" />
                </motion.div>
              </span>
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </div>
  )
}