import { useEffect } from 'react'
import { Play, Heart, Calendar, Download, Share2, X } from 'lucide-react'
import { Link } from 'wouter'
import { useSoulHug } from '../context/SoulHugContext'

export default function MyHugsPage() {
  const { savedSoulHugs, loadSavedSoulHugs, deleteSoulHug } = useSoulHug()

  useEffect(() => {
    loadSavedSoulHugs()
  }, [])

  const getThumbnailColor = (feeling: string) => {
    const colorMap: { [key: string]: string } = {
      'love': 'bg-gradient-to-r from-pink-400 to-purple-500',
      'appreciation': 'bg-gradient-to-r from-blue-400 to-teal-500',
      'support': 'bg-gradient-to-r from-green-400 to-blue-500',
      'encouragement': 'bg-gradient-to-r from-yellow-400 to-orange-500',
      'gratitude': 'bg-gradient-to-r from-purple-400 to-pink-500'
    }
    return colorMap[feeling.toLowerCase()] || 'bg-gradient-to-r from-gray-400 to-gray-500'
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
    <div className="min-h-screen pt-8 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="soul-card">
          <h1 className="text-4xl font-bold text-center bg-gradient-to-r from-green-500 to-teal-500 bg-clip-text text-transparent mb-6">
            MY SOUL HUGS
          </h1>
          
          <p className="text-center text-gray-600 mb-8">
            Your saved creations and heartfelt messages
          </p>

          {savedSoulHugs.length === 0 ? (
            <div className="text-center py-12">
              <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-500 mb-2">No Soul Hugs Yet</h3>
              <p className="text-gray-400 mb-6">Create your first heartfelt message to get started</p>
              <Link href="/define">
                <button className="soul-button">
                  <span className="soul-button-spinner" />
                  <span className="soul-button-inner">
                    Create Your First Soul Hug
                  </span>
                </button>
              </Link>
            </div>
          ) : (
            <div className="grid gap-6">
              {savedSoulHugs.map((hug) => (
                <div key={hug.id} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
                  <div className="flex items-center">
                    {/* Thumbnail */}
                    <div className={`w-16 h-16 rounded-xl ${getThumbnailColor(hug.coreFeeling)} flex items-center justify-center mr-4 flex-shrink-0`}>
                      <Heart className="w-8 h-8 text-white" />
                    </div>
                    
                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-semibold text-gray-800 mb-1 truncate">
                        {getTitle(hug)}
                      </h3>
                      <p className="text-sm text-gray-600 mb-2">
                        For {hug.recipient} • {hug.duration || '2:30'}
                      </p>
                      <div className="flex items-center text-xs text-gray-500">
                        <Calendar className="w-3 h-3 mr-1" />
                        {new Date(hug.createdAt || Date.now()).toLocaleDateString()}
                      </div>
                    </div>
                    
                    {/* Actions */}
                    <div className="flex items-center space-x-2 ml-4">
                      <button className="p-2 bg-blue-100 hover:bg-blue-200 rounded-lg transition-colors">
                        <Play className="w-4 h-4 text-blue-600" />
                      </button>
                      <button className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">
                        <Download className="w-4 h-4 text-gray-600" />
                      </button>
                      <button className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">
                        <Share2 className="w-4 h-4 text-gray-600" />
                      </button>
                      <button 
                        onClick={() => deleteSoulHug(hug.id!)}
                        className="p-2 bg-red-100 hover:bg-red-200 rounded-lg transition-colors"
                      >
                        <X className="w-4 h-4 text-red-600" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Stats */}
          {savedSoulHugs.length > 0 && (
            <div className="mt-8 pt-8 border-t border-gray-200">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-purple-600">{savedSoulHugs.length}</div>
                  <div className="text-sm text-gray-600">Total Hugs</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-blue-600">
                    {savedSoulHugs.reduce((total, hug) => {
                      const duration = hug.duration || '2:30'
                      const [min, sec] = duration.split(':').map(Number)
                      return total + min + sec / 60
                    }, 0).toFixed(0)}
                  </div>
                  <div className="text-sm text-gray-600">Minutes Created</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-600">
                    {new Set(savedSoulHugs.map(hug => hug.recipient)).size}
                  </div>
                  <div className="text-sm text-gray-600">People Touched</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}