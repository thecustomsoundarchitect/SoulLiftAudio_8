import { useEffect, useState } from 'react'
import { Play, Heart, Calendar, Download, Share2, X, Plus, Sparkles, CheckCircle, Star } from 'lucide-react'
import { Link } from 'wouter'
import { motion, AnimatePresence } from 'framer-motion'
import { useSoulHug } from '../context/SoulHugContext'
import ExpandableCardDemo from '../components/ui/expandable-card-demo-standard'
import FloatingDockDemo from '../components/ui/floating-dock-demo'

export default function MyHugsPage() {
  const { savedSoulHugs, loadSavedSoulHugs, deleteSoulHug } = useSoulHug()
  const [hoveredHug, setHoveredHug] = useState<string | null>(null)

  useEffect(() => {
    loadSavedSoulHugs()
  }, [])

  const getThumbnailGradient = (feeling: string) => {
    const gradientMap: { [key: string]: string } = {
      'love': 'from-pink-400 via-rose-500 to-purple-500',
      'appreciation': 'from-blue-400 via-cyan-500 to-teal-500',
      'support': 'from-green-400 via-emerald-500 to-blue-500',
      'encouragement': 'from-yellow-400 via-orange-500 to-red-500',
      'gratitude': 'from-purple-400 via-pink-500 to-rose-500'
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

  return (
    <div className="min-h-screen light-background">

      {/* Floating back button */}
      <motion.div 
        className="fixed top-6 left-6 z-10"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <Link href="/">
          <button className="flex items-center justify-center w-12 h-12 bg-white/60 backdrop-blur-md rounded-full shadow-lg hover:shadow-xl transition-all duration-300 border border-purple-200 group hover:bg-white/80">
            <Heart className="w-5 h-5 text-gray-700 group-hover:text-purple-600 transition-colors" />
          </button>
        </Link>
      </motion.div>

      <div className="max-w-4xl mx-auto px-6 py-20 page-content">
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
              <span style={{ color: '#8A37EA' }}>MY SOUL HUGS</span>
            </span>
          </motion.h1>
          
          <motion.p 
            className="text-xl text-gray-700 leading-relaxed max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <span className="text-white/80">Your saved creations and heartfelt messages</span>
            <span style={{ color: '#8A37EA', opacity: 0.8 }}>Your saved creations and heartfelt messages</span>
          </motion.p>
        </motion.div>

        {savedSoulHugs.length === 0 ? (
          <motion.div 
            className="text-center py-16"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <div className="bg-white/70 backdrop-blur-lg rounded-3xl p-8 border border-purple-200 shadow-xl">
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="mb-8"
              >
                <Heart className="w-20 h-20 mx-auto" style={{ color: '#8A37EA', opacity: 0.6 }} />
              </motion.div>
              <motion.h3 
                className="text-2xl font-semibold mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                style={{ color: '#8A37EA' }}
              >
                No Soul Hugs Yet
              </motion.h3>
              <motion.p 
                className="mb-8 text-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0 }}
                style={{ color: '#8A37EA', opacity: 0.8 }}
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
                    className="bg-white/60 backdrop-blur-lg border border-purple-300 px-8 py-4 rounded-xl font-medium transition-all duration-200 hover:bg-white/80 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-400 text-lg"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    style={{ color: '#8A37EA' }}
                  >
                    <Plus className="w-5 h-5 mr-2" />
                    Create Your First Soul Hug
                  </motion.button>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <div className="bg-white/70 backdrop-blur-lg rounded-3xl p-6 border border-purple-200 shadow-xl">
              <ExpandableCardDemo />
            </div>
            
            {/* Floating Dock Demo */}
            <motion.div 
              className="mt-16"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0, duration: 0.6 }}
            >
              <div className="text-center mb-8">
                <h3 className="text-2xl font-semibold mb-4">
                  <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                    <span style={{ color: '#8A37EA' }}>Quick Navigation</span>
                  </span>
                </h3>
                <p style={{ color: '#8A37EA', opacity: 0.8 }}>
                  Access your favorite features with our floating dock
                </p>
              </div>
              <FloatingDockDemo />
            </motion.div>
          </motion.div>
        )}

        {/* Stats */}
        {savedSoulHugs.length > 0 && (
          <motion.div 
            className="mt-16 pt-8 border-t border-white/20"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.6 }}
          >
            <div className="grid grid-cols-3 gap-6">
              <motion.div 
                className="text-center bg-white/60 backdrop-blur-lg rounded-2xl p-6 border border-purple-200 shadow-lg"
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <motion.div 
                  className="text-3xl font-bold text-purple-600 mb-2"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  {savedSoulHugs.length}
                </motion.div>
                <div className="text-sm font-medium" style={{ color: '#8A37EA' }}>Total Hugs</div>
              </motion.div>
              
              <motion.div 
                className="text-center bg-white/60 backdrop-blur-lg rounded-2xl p-6 border border-purple-200 shadow-lg"
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <motion.div 
                  className="text-3xl font-bold text-blue-600 mb-2"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                >
                  {savedSoulHugs.reduce((total, hug) => {
                    const duration = hug.duration || '2:30'
                    const [min, sec] = duration.split(':').map(Number)
                    return total + min + sec / 60
                  }, 0).toFixed(0)}
                </motion.div>
                <div className="text-sm font-medium" style={{ color: '#8A37EA' }}>Minutes Created</div>
              </motion.div>
              
              <motion.div 
                className="text-center bg-white/60 backdrop-blur-lg rounded-2xl p-6 border border-purple-200 shadow-lg"
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <motion.div 
                  className="text-3xl font-bold text-green-600 mb-2"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                >
                  {new Set(savedSoulHugs.map(hug => hug.recipient)).size}
                </motion.div>
                <div className="text-sm font-medium" style={{ color: '#8A37EA' }}>People Touched</div>
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
              className="bg-white/20 backdrop-blur-lg border border-white/30 text-white px-8 py-4 rounded-xl font-medium transition-all duration-200 hover:bg-white/30 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white/40 text-lg relative overflow-hidden"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
                animate={{ x: ["-100%", "100%"] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="bg-white/60 backdrop-blur-lg border border-purple-300 px-8 py-4 rounded-xl font-medium transition-all duration-200 hover:bg-white/80 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-400 text-lg relative overflow-hidden"
              <span className="relative z-10 flex items-center">
                <Plus className="w-5 h-5 mr-2" />
                style={{ color: '#8A37EA' }}
                Create New Soul Hug
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-purple-200/50 to-transparent"
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