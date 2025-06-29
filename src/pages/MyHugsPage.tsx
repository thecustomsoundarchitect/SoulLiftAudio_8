import { useEffect, useState } from 'react'
import { Play, Heart, Calendar, Download, Share2, X, Plus, Sparkles, CheckCircle, Star, Pause } from 'lucide-react'
import { Link } from 'wouter'
import { motion, AnimatePresence } from 'framer-motion'
import { useSoulHug } from '../context/SoulHugContext'
import ExpandableCardDemo from '../components/ui/expandable-card-demo-standard'

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

  // Use dummy data for demonstration
  const displayHugs = savedSoulHugs.length > 0 ? savedSoulHugs : dummySoulHugs

  useEffect(() => {
    loadSavedSoulHugs()
  }, [])

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

        {displayHugs.length === 0 ? (
          <motion.div 
            className="text-center py-16"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="mb-8"
            >
              <Heart className="w-20 h-20 text-gray-300 mx-auto" />
            </motion.div>
            <motion.h3 
              className="text-2xl font-semibold text-gray-500 mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              No Soul Hugs Yet
            </motion.h3>
            <motion.p 
              className="text-gray-400 mb-8 text-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0 }}
            >
              Create your first heartfelt message to get started
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
            >
              <Link href="/define">
                <motion.button 
                  className="soul-button text-lg px-8 py-4"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Plus className="w-5 h-5 mr-2" />
                  Create Your First Soul Hug
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <ExpandableCardDemo />
          </motion.div>
        )}

        {/* Stats */}
        {displayHugs.length > 0 && (
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
        )}

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