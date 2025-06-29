import { useState, useEffect } from 'react'
import { Link } from 'wouter'
import { ArrowRight, ArrowLeft, X, Plus, Sparkles, CheckCircle, Heart, Target, Star } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useSoulHug } from '../context/SoulHugContext'

export default function GatherPage() {
  const { currentSoulHug, updateCurrentSoulHug } = useSoulHug()
  
  const [ingredients, setIngredients] = useState<string[]>(currentSoulHug.ingredients || [])
  const [descriptors, setDescriptors] = useState<string[]>(currentSoulHug.descriptors || [])
  const [writingModal, setWritingModal] = useState({ isOpen: false, prompt: '', story: '' })
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)
  const [progress, setProgress] = useState(0)

  const promptCards = [
    { text: "When they showed unwavering kindness", icon: Heart, color: "from-pink-400 to-rose-500" },
    { text: "How their smile lights up rooms", icon: Star, color: "from-yellow-400 to-orange-500" },
    { text: "Their gift of making everyone feel welcome", icon: Sparkles, color: "from-blue-400 to-cyan-500" },
    { text: "The natural way they comfort others", icon: Heart, color: "from-green-400 to-emerald-500" },
    { text: "What you see blossoming in them", icon: Star, color: "from-purple-400 to-pink-500" },
    { text: "That time they stood up bravely", icon: CheckCircle, color: "from-red-400 to-pink-500" },
    { text: "The small ways they show care", icon: Sparkles, color: "from-indigo-400 to-purple-500" },
    { text: "Why they deserve all the love", icon: Heart, color: "from-rose-400 to-red-500" },
    { text: "The real them that shines through", icon: Star, color: "from-amber-400 to-yellow-500" }
  ]

  const descriptorOptions = [
    'Smart', 'Caring', 'Loyal', 'Funny', 'Patient', 'Brave',
    'Creative', 'Thoughtful', 'Strong', 'Loving', 'Honest', 'Supportive',
    'Kind', 'Wise', 'Generous', 'Inspiring', 'Reliable', 'Adventurous'
  ]

  useEffect(() => {
    const totalPossible = promptCards.length + descriptorOptions.length
    const currentTotal = ingredients.length + descriptors.length
    setProgress((currentTotal / totalPossible) * 100)
  }, [ingredients, descriptors])

  const openWritingModal = (prompt: string) => {
    setWritingModal({ isOpen: true, prompt, story: '' })
  }

  const closeWritingModal = () => {
    setWritingModal({ isOpen: false, prompt: '', story: '' })
  }

  const saveStory = () => {
    if (writingModal.story.trim()) {
      const storyIngredient = `${writingModal.prompt}: ${writingModal.story.trim()}`
      const newIngredients = [...ingredients, storyIngredient]
      setIngredients(newIngredients)
      updateCurrentSoulHug({ ingredients: newIngredients })
    }
    closeWritingModal()
  }

  const addIngredient = (ingredient: string) => {
    if (!ingredients.includes(ingredient)) {
      const newIngredients = [...ingredients, ingredient]
      setIngredients(newIngredients)
      updateCurrentSoulHug({ ingredients: newIngredients })
    }
  }

  const removeIngredient = (ingredient: string) => {
    const newIngredients = ingredients.filter(item => item !== ingredient)
    setIngredients(newIngredients)
    updateCurrentSoulHug({ ingredients: newIngredients })
  }

  const toggleDescriptor = (descriptor: string) => {
    let newDescriptors: string[]
    if (descriptors.includes(descriptor)) {
      newDescriptors = descriptors.filter(item => item !== descriptor)
    } else {
      newDescriptors = [...descriptors, descriptor]
    }
    setDescriptors(newDescriptors)
    updateCurrentSoulHug({ descriptors: newDescriptors })
  }

  const canProceed = ingredients.length > 0 || descriptors.length > 0

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50/20 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ 
            x: [0, 100, 0],
            y: [0, -50, 0],
            rotate: [0, 180, 360]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute top-20 right-10 w-32 h-32 bg-gradient-to-r from-purple-200/30 to-blue-200/30 rounded-full blur-xl"
        />
        <motion.div
          animate={{ 
            x: [0, -80, 0],
            y: [0, 100, 0],
            rotate: [360, 180, 0]
          }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-20 left-10 w-40 h-40 bg-gradient-to-r from-pink-200/30 to-purple-200/30 rounded-full blur-xl"
        />
      </div>

      {/* Floating back button */}
      <motion.div 
        className="fixed top-6 left-6 z-10"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <Link href="/define">
          <button className="flex items-center justify-center w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100/50 group">
            <ArrowLeft className="w-5 h-5 text-gray-600 group-hover:text-purple-600 transition-colors" />
          </button>
        </Link>
      </motion.div>

      {/* Progress bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-gray-200 z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <motion.div
          className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      </motion.div>

      <div className="max-w-6xl mx-auto px-6 py-20 relative z-10">
        {/* Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div 
            className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-purple-500 via-pink-500 to-purple-600 rounded-3xl mb-8 shadow-xl shadow-purple-200/50 relative overflow-hidden"
            whileHover={{ scale: 1.05, rotate: 5 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent"
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            />
            <Sparkles className="w-10 h-10 text-white relative z-10" />
          </motion.div>
          
          <motion.h1 
            className="text-4xl font-bold text-gray-900 mb-4 tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Gather Your Ingredients
          </motion.h1>
          
          <motion.p 
            className="text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            Click to write a story • Drag to add as ingredient
          </motion.p>
        </motion.div>

        {/* Prompt Cards */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          {promptCards.map((card, index) => (
            <motion.button
              key={index}
              onClick={() => openWritingModal(card.text)}
              onDragStart={(e) => {
                e.dataTransfer.setData('text/plain', card.text)
              }}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
              draggable
              className={`relative p-6 bg-gradient-to-br ${card.color} rounded-2xl text-white text-left transition-all duration-300 cursor-grab active:cursor-grabbing shadow-lg hover:shadow-xl group overflow-hidden`}
              whileHover={{ scale: 1.02, y: -5 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 + index * 0.1, duration: 0.5 }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"
                animate={{ 
                  opacity: hoveredCard === index ? 1 : 0.5,
                  scale: hoveredCard === index ? 1.1 : 1
                }}
                transition={{ duration: 0.3 }}
              />
              <div className="relative z-10">
                <card.icon className="w-8 h-8 mb-3 text-white" />
                <p className="text-sm font-medium leading-tight">{card.text}</p>
              </div>
              <motion.div
                className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                whileHover={{ scale: 1.2 }}
              >
                <Plus className="w-4 h-4" />
              </motion.div>
            </motion.button>
          ))}
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {/* Your Ingredients */}
          <motion.div 
            className="mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.6 }}
          >
            <motion.h3 
              className="text-2xl font-semibold text-center mb-6 flex items-center justify-center"
              whileHover={{ scale: 1.05 }}
            >
              <Target className="w-6 h-6 mr-2 text-purple-600" />
              Your Ingredients
              {ingredients.length > 0 && (
                <motion.span 
                  className="ml-3 px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {ingredients.length}
                </motion.span>
              )}
            </motion.h3>
            
            <motion.div 
              className="border-2 border-dashed border-purple-200 rounded-3xl p-8 min-h-64 bg-gradient-to-br from-purple-50/50 to-pink-50/50 backdrop-blur-sm relative overflow-hidden"
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault()
                const prompt = e.dataTransfer.getData('text/plain')
                addIngredient(prompt)
              }}
              whileHover={{ scale: 1.01 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-purple-100/30 to-pink-100/30"
                animate={{ opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 3, repeat: Infinity }}
              />
              
              {ingredients.length === 0 ? (
                <motion.div 
                  className="text-center text-gray-500 py-12 relative z-10"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.2 }}
                >
                  <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Heart className="w-16 h-16 text-purple-300 mx-auto mb-4" />
                  </motion.div>
                  <p className="text-lg font-medium mb-2">Your stories will appear here</p>
                  <p className="text-sm text-purple-600">0 ingredients collected</p>
                </motion.div>
              ) : (
                <div className="space-y-3 relative z-10">
                  <AnimatePresence>
                    {ingredients.map((ingredient, index) => (
                      <motion.div 
                        key={index} 
                        className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-white/50 group hover:shadow-xl transition-all duration-300"
                        initial={{ opacity: 0, x: -30, scale: 0.9 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        exit={{ opacity: 0, x: 30, scale: 0.9 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ scale: 1.02, y: -2 }}
                      >
                        <div className="flex justify-between items-start">
                          <p className="text-sm text-gray-700 flex-1 pr-4 leading-relaxed">
                            {ingredient.includes(':') ? (
                              <>
                                <span className="font-semibold text-purple-700 block mb-2">
                                  {ingredient.split(':')[0]}:
                                </span>
                                <span className="text-gray-600">
                                  {ingredient.split(':').slice(1).join(':').trim()}
                                </span>
                              </>
                            ) : (
                              <span className="font-semibold text-purple-700">{ingredient}</span>
                            )}
                          </p>
                          <motion.button
                            onClick={() => removeIngredient(ingredient)}
                            className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all duration-200 opacity-0 group-hover:opacity-100"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <X className="w-4 h-4" />
                          </motion.button>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                  <motion.div 
                    className="text-center pt-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    <span className="text-purple-600 font-semibold flex items-center justify-center">
                      <CheckCircle className="w-4 h-4 mr-2" />
                      {ingredients.length} ingredients collected
                    </span>
                  </motion.div>
                </div>
              )}
            </motion.div>
          </motion.div>

          {/* Descriptors Section */}
          <motion.div 
            className="mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.6 }}
          >
            <motion.h3 
              className="text-2xl font-semibold text-center mb-6 flex items-center justify-center"
              whileHover={{ scale: 1.05 }}
            >
              <Star className="w-6 h-6 mr-2 text-purple-600" />
              Choose Descriptors
              {descriptors.length > 0 && (
                <motion.span 
                  className="ml-3 px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {descriptors.length}
                </motion.span>
              )}
            </motion.h3>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
              {descriptorOptions.map((descriptor, index) => (
                <motion.button
                  key={descriptor}
                  onClick={() => toggleDescriptor(descriptor)}
                  className={`p-3 rounded-2xl text-sm font-medium transition-all duration-300 relative overflow-hidden ${
                    descriptors.includes(descriptor)
                      ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg scale-105'
                      : 'bg-white/80 backdrop-blur-sm text-gray-700 hover:bg-purple-100 hover:text-purple-700 border border-gray-200 hover:border-purple-300'
                  }`}
                  whileHover={{ scale: descriptors.includes(descriptor) ? 1.05 : 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.3 + index * 0.05, duration: 0.3 }}
                >
                  {descriptors.includes(descriptor) && (
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
                      animate={{ x: ["-100%", "100%"] }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                    />
                  )}
                  <span className="relative z-10">{descriptor}</span>
                  {descriptors.includes(descriptor) && (
                    <motion.div
                      className="absolute top-1 right-1"
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <CheckCircle className="w-3 h-3" />
                    </motion.div>
                  )}
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Navigation */}
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.6 }}
          >
            <Link href="/craft">
              <motion.button 
                disabled={!canProceed}
                className={`inline-flex items-center px-12 py-5 rounded-3xl font-semibold text-xl transition-all duration-300 relative overflow-hidden ${
                  canProceed
                    ? 'bg-gradient-to-r from-purple-600 via-pink-600 to-purple-700 text-white shadow-xl shadow-purple-200/50'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
                whileHover={canProceed ? { 
                  scale: 1.05, 
                  boxShadow: "0 25px 50px -12px rgba(139, 92, 246, 0.4)" 
                } : {}}
                whileTap={canProceed ? { scale: 0.98 } : {}}
              >
                {canProceed && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
                    animate={{ x: ["-100%", "100%"] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  />
                )}
                <span className="relative z-10">Continue to Craft</span>
                <motion.div
                  className="relative z-10 ml-3"
                  animate={{ x: canProceed ? [0, 5, 0] : 0 }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ArrowRight className="w-6 h-6" />
                </motion.div>
                {canProceed && (
                  <motion.div
                    className="relative z-10 ml-2"
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  >
                    <Sparkles className="w-5 h-5 opacity-70" />
                  </motion.div>
                )}
              </motion.button>
            </Link>
            
            <AnimatePresence>
              {!canProceed && (
                <motion.p 
                  className="text-sm text-gray-500 mt-4 bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3 max-w-md mx-auto"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                >
                  Add at least one ingredient or descriptor to continue
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Writing Modal */}
        <AnimatePresence>
          {writingModal.isOpen && (
            <motion.div 
              className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div 
                className="bg-white/95 backdrop-blur-sm rounded-3xl max-w-2xl w-full max-h-[80vh] overflow-y-auto shadow-2xl border border-white/50"
                initial={{ opacity: 0, scale: 0.9, y: 50 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 50 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                <div className="p-8">
                  <div className="flex justify-between items-start mb-6">
                    <motion.h3 
                      className="text-xl font-semibold text-gray-800 pr-4"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 }}
                    >
                      {writingModal.prompt}
                    </motion.h3>
                    <motion.button
                      onClick={closeWritingModal}
                      className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-all duration-200"
                      whileHover={{ scale: 1.1, rotate: 90 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <X className="w-5 h-5" />
                    </motion.button>
                  </div>
                  
                  <motion.textarea
                    value={writingModal.story}
                    onChange={(e) => setWritingModal(prev => ({ ...prev, story: e.target.value }))}
                    placeholder="Share your story here..."
                    className="w-full h-48 p-4 border-2 border-gray-200 rounded-2xl resize-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 bg-white/80 backdrop-blur-sm"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    autoFocus
                  />
                  
                  <motion.div 
                    className="flex justify-end gap-4 mt-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <motion.button
                      onClick={closeWritingModal}
                      className="px-6 py-3 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-2xl transition-all duration-200"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Cancel
                    </motion.button>
                    <motion.button
                      onClick={saveStory}
                      disabled={!writingModal.story.trim()}
                      className="px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-2xl font-medium transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Save Story
                    </motion.button>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}