import { useState, useEffect } from 'react'
import { Link } from 'wouter'
import { ArrowRight, ArrowLeft, X, Plus, Zap, Target } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useSoulHug } from '../context/SoulHugContext'

export default function GatherPage() {
  const { currentSoulHug, updateCurrentSoulHug } = useSoulHug()
  
  const [ingredients, setIngredients] = useState<string[]>(currentSoulHug.ingredients || [])
  const [descriptors, setDescriptors] = useState<string[]>(currentSoulHug.descriptors || [])
  const [writingModal, setWritingModal] = useState({ isOpen: false, prompt: '', story: '' })
  const [draggedItem, setDraggedItem] = useState<string | null>(null)
  const [dropZoneActive, setDropZoneActive] = useState(false)
  const [aiSuggestions, setAiSuggestions] = useState<string[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)

  const promptCards = [
    "When they showed unwavering kindness",
    "How their smile lights up rooms", 
    "Their gift of making everyone feel welcome",
    "The natural way they comfort others",
    "What you see blossoming in them",
    "That time they stood up bravely",
    "The small ways they show care",
    "Why they deserve all the love"
  ]

  const descriptorOptions = [
    'Smart', 'Caring', 'Loyal', 'Funny', 'Patient', 'Brave',
    'Creative', 'Thoughtful', 'Strong', 'Loving', 'Honest', 'Supportive',
    'Kind', 'Wise', 'Generous', 'Inspiring', 'Reliable', 'Adventurous'
  ]

  // AI suggestion system
  const generateAISuggestions = () => {
    const suggestions = [
      "Their ability to listen without judgment",
      "How they remember the little things that matter",
      "The way they make ordinary moments special",
      "Their courage to be vulnerable",
      "How they lift others up naturally"
    ]
    setAiSuggestions(suggestions)
    setShowSuggestions(true)
  }

  const addAISuggestion = (suggestion: string) => {
    const newIngredients = [...ingredients, suggestion]
    setIngredients(newIngredients)
    updateCurrentSoulHug({ ingredients: newIngredients })
    setAiSuggestions(prev => prev.filter(s => s !== suggestion))
  }

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

  // Drag and drop handlers
  const handleDragStart = (e: React.DragEvent, prompt: string) => {
    setDraggedItem(prompt)
    e.dataTransfer.setData('text/plain', prompt)
    e.dataTransfer.effectAllowed = 'copy'
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'copy'
    setDropZoneActive(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    if (!e.currentTarget.contains(e.relatedTarget as Node)) {
      setDropZoneActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    const prompt = e.dataTransfer.getData('text/plain')
    if (prompt && !ingredients.includes(prompt)) {
      const newIngredients = [...ingredients, prompt]
      setIngredients(newIngredients)
      updateCurrentSoulHug({ ingredients: newIngredients })
    }
    setDropZoneActive(false)
    setDraggedItem(null)
  }

  const canProceed = ingredients.length > 0 || descriptors.length > 0

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <motion.h1 
            className="text-4xl font-bold text-gray-900 mb-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Gather Your Ingredients
          </motion.h1>
          <motion.p 
            className="text-gray-600 text-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            Click to write • Drag to add instantly • Let AI inspire you
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column - Prompts */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-800">Story Prompts</h3>
              <motion.button
                onClick={generateAISuggestions}
                className="flex items-center px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Zap className="w-4 h-4 mr-2" />
                AI Inspire
              </motion.button>
            </div>

            {/* AI Suggestions */}
            <AnimatePresence>
              {showSuggestions && aiSuggestions.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mb-6 p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg border border-purple-200"
                >
                  <h4 className="text-sm font-semibold text-purple-800 mb-3">AI Suggestions</h4>
                  <div className="space-y-2">
                    {aiSuggestions.map((suggestion, index) => (
                      <motion.button
                        key={suggestion}
                        onClick={() => addAISuggestion(suggestion)}
                        className="w-full text-left p-3 bg-white hover:bg-purple-50 rounded-lg border border-purple-200 transition-colors text-sm"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ scale: 1.02 }}
                      >
                        {suggestion}
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="grid grid-cols-1 gap-3 mb-8">
              {promptCards.map((prompt, index) => (
                <motion.button
                  key={index}
                  onClick={() => openWritingModal(prompt)}
                  draggable
                  onDragStart={(e) => handleDragStart(e, prompt)}
                  className={`p-4 bg-white hover:bg-gray-50 rounded-lg text-left transition-all border-2 cursor-grab active:cursor-grabbing ${
                    draggedItem === prompt ? 'border-purple-400 shadow-lg' : 'border-gray-200 hover:border-gray-300'
                  }`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <p className="text-gray-700 font-medium">{prompt}</p>
                  <p className="text-xs text-gray-500 mt-1">Click to write • Drag to add</p>
                </motion.button>
              ))}
            </div>

            {/* Descriptors */}
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Choose Descriptors</h3>
              <div className="grid grid-cols-3 gap-2">
                {descriptorOptions.map((descriptor, index) => (
                  <motion.button
                    key={descriptor}
                    onClick={() => toggleDescriptor(descriptor)}
                    className={`p-3 rounded-lg text-sm font-medium transition-all ${
                      descriptors.includes(descriptor)
                        ? 'bg-purple-600 text-white shadow-lg scale-105'
                        : 'bg-white text-gray-700 hover:bg-purple-50 border border-gray-200 hover:border-purple-300'
                    }`}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 + index * 0.02 }}
                    whileHover={{ scale: descriptors.includes(descriptor) ? 1.05 : 1.02 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {descriptor}
                  </motion.button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Your Stories */}
          <div>
            <div className="flex items-center mb-6">
              <Target className="w-6 h-6 text-purple-600 mr-2" />
              <h3 className="text-xl font-semibold text-gray-800">
                Your Stories ({ingredients.length})
              </h3>
            </div>
            
            <motion.div 
              className={`border-2 border-dashed rounded-xl p-6 min-h-96 transition-all ${
                dropZoneActive 
                  ? 'border-purple-400 bg-purple-50 scale-105' 
                  : 'border-gray-300 bg-white'
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              whileHover={{ scale: 1.01 }}
            >
              {ingredients.length === 0 ? (
                <motion.div 
                  className="text-center text-gray-500 py-16"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="mb-4"
                  >
                    <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto flex items-center justify-center">
                      <Plus className="w-8 h-8 text-gray-400" />
                    </div>
                  </motion.div>
                  <p className="text-lg font-medium mb-2">Drop prompts here or click to write</p>
                  <p className="text-sm">Your stories will build your Soul Hug</p>
                </motion.div>
              ) : (
                <div className="space-y-3">
                  <AnimatePresence>
                    {ingredients.map((ingredient, index) => (
                      <motion.div 
                        key={index} 
                        className="bg-gray-50 rounded-lg p-4 border border-gray-200 group hover:shadow-md transition-shadow"
                        initial={{ opacity: 0, x: -20, scale: 0.9 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        exit={{ opacity: 0, x: 20, scale: 0.9 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ scale: 1.02 }}
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
                            className="p-2 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all rounded-lg hover:bg-red-50"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <X className="w-4 h-4" />
                          </motion.button>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              )}
            </motion.div>

            {/* Selected Descriptors */}
            <AnimatePresence>
              {descriptors.length > 0 && (
                <motion.div 
                  className="mt-6"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                >
                  <h4 className="text-sm font-semibold text-gray-700 mb-3">Selected Descriptors ({descriptors.length})</h4>
                  <div className="flex flex-wrap gap-2">
                    {descriptors.map((descriptor, index) => (
                      <motion.span
                        key={descriptor}
                        className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        {descriptor}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Navigation */}
        <motion.div 
          className="flex justify-between items-center mt-12 pt-8 border-t border-gray-200"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <Link href="/define">
            <motion.button 
              className="flex items-center px-6 py-3 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Define
            </motion.button>
          </Link>
          
          <Link href="/craft">
            <motion.button
              disabled={!canProceed}
              className={`flex items-center px-8 py-3 rounded-lg font-medium transition-all ${
                canProceed
                  ? 'bg-purple-600 hover:bg-purple-700 text-white shadow-lg'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
              whileHover={canProceed ? { scale: 1.05 } : {}}
              whileTap={canProceed ? { scale: 0.95 } : {}}
            >
              Continue to Craft
              <ArrowRight className="w-4 h-4 ml-2" />
            </motion.button>
          </Link>
        </motion.div>

        {/* Writing Modal */}
        <AnimatePresence>
          {writingModal.isOpen && (
            <motion.div 
              className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div 
                className="bg-white rounded-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto shadow-2xl"
                initial={{ opacity: 0, scale: 0.9, y: 50 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 50 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                <div className="p-8">
                  <div className="flex justify-between items-start mb-6">
                    <h3 className="text-xl font-semibold text-gray-800 pr-4">
                      {writingModal.prompt}
                    </h3>
                    <motion.button
                      onClick={closeWritingModal}
                      className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
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
                    className="w-full h-48 p-4 border-2 border-gray-200 rounded-lg resize-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    autoFocus
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  />
                  
                  <div className="flex justify-end gap-4 mt-6">
                    <motion.button
                      onClick={closeWritingModal}
                      className="px-6 py-3 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Cancel
                    </motion.button>
                    <motion.button
                      onClick={saveStory}
                      disabled={!writingModal.story.trim()}
                      className="px-8 py-3 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-lg font-medium shadow-lg transition-all"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Save Story
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}