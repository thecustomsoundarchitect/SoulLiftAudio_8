import { useState, useEffect } from 'react'
import { Link } from 'wouter'
import { ArrowRight, ArrowLeft, X, Plus } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useSoulHug } from '../context/SoulHugContext'

export default function GatherPage() {
  const { currentSoulHug, updateCurrentSoulHug } = useSoulHug()
  
  const [ingredients, setIngredients] = useState<string[]>(currentSoulHug.ingredients || [])
  const [descriptors, setDescriptors] = useState<string[]>(currentSoulHug.descriptors || [])
  const [writingModal, setWritingModal] = useState({ isOpen: false, prompt: '', story: '' })

  const promptCards = [
    "When they showed unwavering kindness",
    "How their smile lights up rooms", 
    "Their gift of making everyone feel welcome",
    "The natural way they comfort others",
    "What you see blossoming in them",
    "That time they stood up bravely",
    "The small ways they show care",
    "Why they deserve all the love",
    "The real them that shines through"
  ]

  const descriptorOptions = [
    'Smart', 'Caring', 'Loyal', 'Funny', 'Patient', 'Brave',
    'Creative', 'Thoughtful', 'Strong', 'Loving', 'Honest', 'Supportive'
  ]

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

  const canProceed = ingredients.length > 0 || descriptors.length > 0

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              GATHER YOUR INGREDIENTS
            </span>
          </h1>
          <p className="text-gray-600">
            Click prompts to write stories, select descriptors that fit
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Prompts */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Story Prompts</h3>
            <div className="grid grid-cols-1 gap-3 mb-6">
              {promptCards.map((prompt, index) => (
                <button
                  key={index}
                  onClick={() => openWritingModal(prompt)}
                  className="p-4 bg-gray-50 hover:bg-gray-100 rounded-lg text-left transition-colors border border-gray-200"
                >
                  <p className="text-sm text-gray-700">{prompt}</p>
                </button>
              ))}
            </div>

            {/* Descriptors */}
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Choose Descriptors</h3>
            <div className="grid grid-cols-3 gap-2">
              {descriptorOptions.map((descriptor) => (
                <button
                  key={descriptor}
                  onClick={() => toggleDescriptor(descriptor)}
                  className={`p-2 rounded-lg text-sm font-medium transition-colors ${
                    descriptors.includes(descriptor)
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {descriptor}
                </button>
              ))}
            </div>
          </div>

          {/* Right Column - Your Stories */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Your Stories ({ingredients.length})
            </h3>
            
            <div className="border-2 border-dashed border-gray-200 rounded-lg p-4 min-h-80 bg-gray-50">
              {ingredients.length === 0 ? (
                <div className="text-center text-gray-500 py-12">
                  <p className="text-lg font-medium mb-2">Your stories will appear here</p>
                  <p className="text-sm">Click prompts on the left to get started</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {ingredients.map((ingredient, index) => (
                    <div 
                      key={index} 
                      className="bg-white rounded-lg p-3 shadow-sm border border-gray-200 group"
                    >
                      <div className="flex justify-between items-start">
                        <p className="text-sm text-gray-700 flex-1 pr-4">
                          {ingredient.includes(':') ? (
                            <>
                              <span className="font-semibold text-purple-700 block mb-1">
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
                        <button
                          onClick={() => removeIngredient(ingredient)}
                          className="p-1 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Selected Descriptors */}
            {descriptors.length > 0 && (
              <div className="mt-4">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Selected Descriptors</h4>
                <div className="flex flex-wrap gap-2">
                  {descriptors.map((descriptor) => (
                    <span
                      key={descriptor}
                      className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm"
                    >
                      {descriptor}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-200">
          <Link href="/define">
            <button className="flex items-center px-6 py-3 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Define
            </button>
          </Link>
          
          <Link href="/craft">
            <button
              disabled={!canProceed}
              className={`flex items-center px-8 py-3 rounded-lg font-medium transition-colors ${
                canProceed
                  ? 'bg-purple-600 hover:bg-purple-700 text-white'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              Continue to Craft
              <ArrowRight className="w-4 h-4 ml-2" />
            </button>
          </Link>
        </div>

        {/* Writing Modal */}
        <AnimatePresence>
          {writingModal.isOpen && (
            <motion.div 
              className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div 
                className="bg-white rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto shadow-xl"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
              >
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-lg font-semibold text-gray-800 pr-4">
                      {writingModal.prompt}
                    </h3>
                    <button
                      onClick={closeWritingModal}
                      className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                  
                  <textarea
                    value={writingModal.story}
                    onChange={(e) => setWritingModal(prev => ({ ...prev, story: e.target.value }))}
                    placeholder="Share your story here..."
                    className="w-full h-48 p-4 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    autoFocus
                  />
                  
                  <div className="flex justify-end gap-3 mt-4">
                    <button
                      onClick={closeWritingModal}
                      className="px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={saveStory}
                      disabled={!writingModal.story.trim()}
                      className="px-6 py-2 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-lg font-medium"
                    >
                      Save Story
                    </button>
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