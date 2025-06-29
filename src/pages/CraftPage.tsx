import { useState } from 'react'
import { Link } from 'wouter'
import { ArrowLeft, Download } from 'lucide-react'
import { useSoulHug } from '../context/SoulHugContext'

export default function CraftPage() {
  const { currentSoulHug, updateCurrentSoulHug } = useSoulHug()
  
  const [message, setMessage] = useState(currentSoulHug.message || '')
  const [targetLength, setTargetLength] = useState('1m - Heartfelt')
  const [isWeaving, setIsWeaving] = useState(false)
  const [isPolishing, setIsPolishing] = useState(false)

  // Mock data - in real app this would come from gathered ingredients
  const ingredients = currentSoulHug.ingredients || []
  const descriptors = currentSoulHug.descriptors || []

  const handleMessageChange = (newMessage: string) => {
    setMessage(newMessage)
    updateCurrentSoulHug({ message: newMessage })
  }

  const handleDragStart = (e: React.DragEvent, ingredient: string) => {
    e.dataTransfer.setData('text/plain', ingredient)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    const draggedText = e.dataTransfer.getData('text/plain')
    const textArea = e.target as HTMLTextAreaElement
    const cursorPosition = textArea.selectionStart
    const newMessage = message.slice(0, cursorPosition) + '\n\n' + draggedText + '\n\n' + message.slice(cursorPosition)
    handleMessageChange(newMessage)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const moveAllDescriptors = () => {
    if (descriptors.length === 0) return
    
    const descriptorText = `\n\n${descriptors.join(', ')}\n\n`
    const newMessage = message + descriptorText
    handleMessageChange(newMessage)
  }

  const handleDescriptorDragStart = (e: React.DragEvent) => {
    const descriptorText = `${descriptors.join(', ')}`
    e.dataTransfer.setData('text/plain', descriptorText)
  }

  const aiWeave = () => {
    setIsWeaving(true)
    setTimeout(() => {
      const weavedMessage = `Dear ${currentSoulHug.recipient || 'friend'},

Your caring nature and thoughtful approach to everything you do truly sets you apart. When times get tough, you're always there with a warm smile and helping hand - that unwavering kindness you show makes such a difference in people's lives.

What I admire most is your gift of making everyone feel welcome. You create such an inclusive environment wherever you go, and it's beautiful to witness. The natural way you comfort others, knowing exactly what to say when someone needs support, shows just how wise and loving you are.

Your supportive spirit touches everyone around you. Thank you for being exactly who you are.

With gratitude and love`

      setMessage(weavedMessage)
      updateCurrentSoulHug({ message: weavedMessage })
      setIsWeaving(false)
    }, 2000)
  }

  const aiPolish = () => {
    if (!message.trim()) return
    
    setIsPolishing(true)
    setTimeout(() => {
      const polishedMessage = message
        .replace(/\n\n/g, '\n\n')
        .replace(/\. /g, '. ')
        .trim()
      setMessage(polishedMessage)
      updateCurrentSoulHug({ message: polishedMessage })
      setIsPolishing(false)
    }, 1500)
  }

  const exportHug = () => {
    const element = document.createElement('a')
    const file = new Blob([message], { type: 'text/plain' })
    element.href = URL.createObjectURL(file)
    element.download = `soul-hug-message.txt`
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  const wordCount = message ? message.split(' ').filter(word => word.length > 0).length : 0

  return (
    <div className="min-h-screen pt-8 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="soul-card">
          <h1 className="text-4xl font-bold text-center bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent mb-8">
            CRAFT YOUR SOUL HUG
          </h1>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Left Column - Ingredients */}
            <div>
              <div className="bg-purple-50 rounded-2xl p-6 mb-6">
                <div className="flex items-center mb-4">
                  <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center mr-3">
                    <span className="text-white text-sm font-bold">✓</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800">Your Ingredients</h3>
                </div>
                
                {ingredients.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-gray-500 text-sm">No ingredients available</p>
                    <p className="text-gray-400 text-xs mt-1">Go back to Gather to collect some!</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {ingredients.map((ingredient, index) => (
                      <div
                        key={index}
                        draggable
                        onDragStart={(e) => handleDragStart(e, ingredient)}
                        className="bg-white rounded-lg p-3 shadow-sm cursor-grab active:cursor-grabbing hover:shadow-md transition-shadow border border-gray-100"
                      >
                        <p className="text-sm text-gray-700 leading-relaxed">
                          {ingredient.includes(':') ? (
                            <>
                              <span className="font-medium text-purple-700 block mb-1">
                                {ingredient.split(':')[0]}
                              </span>
                              <span className="text-gray-600">
                                {ingredient.split(':').slice(1).join(':').trim()}
                              </span>
                            </>
                          ) : (
                            <span className="font-medium text-purple-700">{ingredient}</span>
                          )}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Descriptors */}
              {descriptors.length > 0 && (
                <div className="bg-gray-50 rounded-2xl p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-medium text-gray-700">Selected Descriptors</h4>
                    <button
                      onClick={moveAllDescriptors}
                      className="text-xs bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-full transition-colors"
                    >
                      Move All to Message
                    </button>
                  </div>
                  <div 
                    draggable={descriptors.length > 0}
                    onDragStart={handleDescriptorDragStart}
                    className={`bg-white rounded-lg p-3 shadow-sm border border-gray-200 ${
                      descriptors.length > 0 ? 'cursor-grab active:cursor-grabbing hover:shadow-md' : ''
                    } transition-shadow`}
                  >
                    <div className="flex flex-wrap gap-2">
                      {descriptors.map((descriptor) => (
                        <span
                          key={descriptor}
                          className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
                        >
                          {descriptor}
                        </span>
                      ))}
                    </div>
                    {descriptors.length > 0 && (
                      <p className="text-xs text-gray-500 mt-2">
                        💡 Drag this box to your message or click "Move All"
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Right Column - Message */}
            <div>
              <div className="bg-green-50 rounded-2xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center mr-3">
                      <span className="text-white text-sm font-bold">✓</span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800">Your Soul Hug Message</h3>
                  </div>
                  <div className="text-sm text-gray-600">
                    {wordCount} words
                  </div>
                </div>

                <textarea
                  id="message-input"
                  name="message"
                  value={message}
                  onChange={(e) => handleMessageChange(e.target.value)}
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  placeholder="Begin crafting your Soul Hug here... Click on ingredients from the left panel to add them, or start typing your heart's message."
                  className="w-full h-80 p-4 border-2 border-dashed border-gray-300 rounded-xl bg-white focus:outline-none focus:border-green-400 focus:bg-green-50/30 resize-none text-gray-700 leading-relaxed"
                  style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
                />
              </div>
            </div>
          </div>

          {/* Bottom Controls */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
              {/* Target Length */}
              <div className="flex items-center space-x-4">
                <label htmlFor="target-length" className="text-sm font-medium text-gray-700">Target Length</label>
                <select
                  id="target-length"
                  name="targetLength"
                  value={targetLength}
                  onChange={(e) => setTargetLength(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
                >
                  <option value="30s - Brief">30s - Brief</option>
                  <option value="1m - Heartfelt">1m - Heartfelt</option>
                  <option value="2m - Deep">2m - Deep</option>
                  <option value="Custom">Custom</option>
                </select>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center space-x-3">
                <button
                  onClick={aiWeave}
                  disabled={isWeaving || ingredients.length === 0}
                  className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isWeaving ? 'AI Weaving...' : 'AI Weave (1 Credit)'}
                </button>
                
                <button
                  onClick={aiPolish}
                  disabled={isPolishing || !message.trim()}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isPolishing ? 'AI Polishing...' : 'AI Polish (1 Credit)'}
                </button>

                <button
                  onClick={exportHug}
                  disabled={!message.trim()}
                  className="flex items-center bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Export Hug
                </button>
              </div>
            </div>

            {/* Pro tip */}
            <p className="text-xs text-gray-500 mt-4">
              Pro tip: Click on ingredients from the left panel to add them to your message. Use AI Weave to create from ingredients, or AI Polish to refine existing text.
            </p>
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-200">
            <Link href="/gather">
              <button className="flex items-center px-6 py-3 text-gray-600 border border-gray-300 rounded-xl hover:bg-gray-50 transition-all duration-200">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Gather
              </button>
            </Link>
            
            <Link href="/audio-hug">
              <button
                disabled={!message.trim()}
                className="soul-button disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Continue to Audio
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}