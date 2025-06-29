import { useEffect, useState } from 'react'
import { Play, Heart, Calendar, Download, Share2, X, Plus, Sparkles, CheckCircle, Star } from 'lucide-react'
import { Link } from 'wouter'
import { motion, AnimatePresence } from 'framer-motion'
import { useSoulHug } from '../context/SoulHugContext'

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
          <motion.div 
            className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-500 via-teal-500 to-green-600 rounded-3xl mb-8 shadow-xl shadow-green-200/50 relative overflow-hidden"
            whileHover={{ scale: 1.05, rotate: 5 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent"
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            />
            <Heart className="w-10 h-10 text-white relative z-10" />
          </motion.div>
          
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
        </motion.div>

        {savedSoulHugs.length === 0 ? (
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
            className="space-y-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <AnimatePresence>
              {savedSoulHugs.map((hug, index) => (
                <motion.div 
                  key={hug.id} 
                  className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-white/50 group relative overflow-hidden"
                  initial={{ opacity: 0, y: 30, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -30, scale: 0.95 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  whileHover={{ scale: 1.02, y: -5 }}
                  onMouseEnter={() => setHoveredHug(hug.id!)}
                  onMouseLeave={() => setHoveredHug(null)}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"
                    animate={{ 
                      opacity: hoveredHug === hug.id ? 1 : 0.3,
                      scale: hoveredHug === hug.id ? 1.1 : 1
                    }}
                    transition={{ duration: 0.3 }}
                  />
                  
                  <div className="flex items-center relative z-10">
                    {/* Thumbnail */}
                    <motion.div 
                      className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${getThumbnailGradient(hug.coreFeeling)} flex items-center justify-center mr-6 flex-shrink-0 shadow-lg relative overflow-hidden`}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                    >
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent"
                        animate={{ rotate: hoveredHug === hug.id ? [0, 360] : 0 }}
                        transition={{ duration: 2, ease: "linear" }}
                      />
                      <Heart className="w-8 h-8 text-white relative z-10" />
                    </motion.div>
                    
                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <motion.h3 
                        className="text-lg font-semibold text-gray-800 mb-2 truncate"
                        whileHover={{ x: 5 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        {getTitle(hug)}
                      </motion.h3>
                      <motion.p 
                        className="text-sm text-gray-600 mb-2"
                        initial={{ opacity: 0.7 }}
                        animate={{ opacity: hoveredHug === hug.id ? 1 : 0.7 }}
                      >
                        For {hug.recipient || 'Someone Special'} • {hug.duration || '2:30'}
                      </motion.p>
                      <div className="flex items-center text-xs text-gray-500">
                        <Calendar className="w-3 h-3 mr-1" />
                        {new Date(hug.createdAt || Date.now()).toLocaleDateString()}
                      </div>
                    </div>
                    
                    {/* Actions */}
                    <motion.div 
                      className="flex items-center space-x-2 ml-4"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ 
                        opacity: hoveredHug === hug.id ? 1 : 0.7,
                        x: hoveredHug === hug.id ? 0 : 10
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <motion.button 
                        className="p-3 bg-blue-100 hover:bg-blue-200 rounded-xl transition-colors shadow-sm hover:shadow-md"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Play className="w-4 h-4 text-blue-600" />
                      </motion.button>
                      <motion.button 
                        className="p-3 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors shadow-sm hover:shadow-md"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Download className="w-4 h-4 text-gray-600" />
                      </motion.button>
                      <motion.button 
                        className="p-3 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors shadow-sm hover:shadow-md"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Share2 className="w-4 h-4 text-gray-600" />
                      </motion.button>
                      <motion.button 
                        onClick={() => deleteSoulHug(hug.id!)}
                        className="p-3 bg-red-100 hover:bg-red-200 rounded-xl transition-colors shadow-sm hover:shadow-md"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <X className="w-4 h-4 text-red-600" />
                      </motion.button>
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {/* Stats */}
        {savedSoulHugs.length > 0 && (
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
                  {savedSoulHugs.length}
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
                  {savedSoulHugs.reduce((total, hug) => {
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
                  {new Set(savedSoulHugs.map(hug => hug.recipient)).size}
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