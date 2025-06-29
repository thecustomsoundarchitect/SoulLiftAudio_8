import { useState } from 'react'
import { Link } from 'wouter'
import { ArrowRight, ArrowLeft, X } from 'lucide-react'
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
    'Creative', 'Thoughtful', 'Strong', 'Loving', 'Honest', 'Supportive',
    'Kind', 'Wise', 'Generous', 'Inspiring', 'Reliable', 'Adventurous'
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

  return (
    <div className="min-h-screen pt-8 pb-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="soul-card">
          <h1 className="text-4xl font-bold text-center bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-6">
            GATHER YOUR INGREDIENTS
          </h1>
          
          <div className="text-center text-gray-600 mb-8">
            Click to write a story • Drag to add as ingredient
          </div>

          {/* Prompt Cards */}
          <div className="grid grid-cols-3 gap-3 mb-8">
            {promptCards.map((prompt, index) => (
              <button
                key={index}
                onClick={() => openWritingModal(prompt)}
                onDragStart={(e) => {
                  e.dataTransfer.setData('text/plain', prompt)
                }}
                draggable
                className="p-3 bg-gray-50 rounded-lg text-left hover:bg-purple-50 transition-colors duration-200 text-xs leading-tight cursor-grab active:cursor-grabbing"
              >
                {prompt}
              </button>
            ))}
          </div>

          <div className="max-w-2xl mx-auto">
            {/* Your Ingredients */}
            <div className="w-full">
              <h3 className="text-lg font-semibold text-center mb-4">Your Ingredients</h3>
              <div 
                className="border-2 border-dashed border-purple-200 rounded-xl p-4 min-h-64 bg-purple-50/30"
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault()
                  const prompt = e.dataTransfer.getData('text/plain')
                  addIngredient(prompt)
                }}
              >
                {ingredients.length === 0 ? (
                  <div className="text-center text-gray-500 py-8">
                    <p className="text-sm">Your stories and dragged prompts will appear here.</p>
                    <p className="text-xs mt-2 text-purple-600">0 ingredients</p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {ingredients.map((ingredient, index) => (
                      <div key={index} className="bg-white rounded-lg p-2 shadow-sm text-xs">
                        <div className="flex justify-between items-start">
                          <p className="text-gray-700 flex-1 pr-2">
                            {ingredient.includes(':') ? (
                              <>
                                <span className="font-medium text-purple-700">{ingredient.split(':')[0]}:</span>
                                <span className="text-gray-600">{ingredient.split(':').slice(1).join(':')}</span>
                              </>
                            ) : (
                              <span className="font-medium text-purple-700">{ingredient}</span>
                            )}
                          </p>
                          <button
                            onClick={() => removeIngredient(ingredient)}
                            className="text-gray-400 hover:text-red-500"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    ))}
                    <div className="text-center pt-2">
                      <span className="text-purple-600 text-xs font-medium">
                        {ingredients.length} ingredients
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Descriptors Section */}
            <div className="w-full mt-8">
              <h3 className="text-lg font-semibold text-center mb-4">Choose Descriptors</h3>
              <div className="grid grid-cols-3 gap-2">
                {descriptorOptions.map((descriptor) => (
                  <button
                    key={descriptor}
                    onClick={() => toggleDescriptor(descriptor)}
                    className={`p-2 rounded-lg text-xs transition-colors duration-200 ${
                      descriptors.includes(descriptor)
                        ? 'bg-purple-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-purple-100'
                    }`}
                  >
                    {descriptor}
                  </button>
                ))}
              </div>
              {descriptors.length > 0 && (
                <div className="text-center mt-4">
                  <span className="text-purple-600 text-xs font-medium">
                    {descriptors.length} descriptors selected
                  </span>
                </div>
              )}
            </div>

            {/* Navigation */}
            <div className="flex justify-between items-center mt-8">
              <Link href="/define">
                <button className="flex items-center px-4 py-2 text-purple-600 hover:text-purple-700 transition-colors">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Define
                </button>
              </Link>
              
              <Link href="/craft">
                <button 
                  className={`${
                    ingredients.length > 0 || descriptors.length > 0
                      ? 'soul-button'
                      : 'soul-button opacity-50 cursor-not-allowed'
                  }`}
                  disabled={ingredients.length === 0 && descriptors.length === 0}
                >
                  <span className="soul-button-spinner" />
                  <span className="soul-button-inner flex items-center">
                    Continue to Craft
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </span>
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Writing Modal */}
        {writingModal.isOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {writingModal.prompt}
                  </h3>
                  <button
                    onClick={closeWritingModal}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                
                <textarea
                  id="story-input"
                  name="story"
                  value={writingModal.story}
                  onChange={(e) => setWritingModal(prev => ({ ...prev, story: e.target.value }))}
                  placeholder="Share your story here..."
                  className="w-full h-40 p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
                
                <div className="flex justify-end gap-3 mt-4">
                  <button
                    onClick={closeWritingModal}
                    className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={saveStory}
                    className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                  >
                    Save Story
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}