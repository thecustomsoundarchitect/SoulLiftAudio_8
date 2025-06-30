import { useState } from 'react'
import { User, Heart, Calendar, Award, Settings, Edit3 } from 'lucide-react'
import { motion } from 'framer-motion'

export default function SoulArchivePage() {
  const [activeTab, setActiveTab] = useState('profile')

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#DCB2EF] via-[#C8A8E8] to-[#B1E0EC] relative overflow-hidden pb-20">
      {/* Glass morphism overlay */}
      <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
      
      {/* Floating glass orbs for visual interest */}
      <div className="absolute top-24 right-16 w-32 h-32 bg-white/20 rounded-full blur-xl animate-pulse delay-200"></div>
      <div className="absolute bottom-32 left-12 w-40 h-40 bg-white/15 rounded-full blur-2xl animate-pulse delay-800"></div>
      <div className="absolute top-1/2 right-1/4 w-24 h-24 bg-white/10 rounded-full blur-lg animate-pulse delay-1100"></div>

      <div className="max-w-4xl mx-auto px-6 py-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              SOUL ARCHIVE
            </span>
          </h1>
          <p className="text-gray-700">Your personal profile and achievements</p>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className="bg-white/30 backdrop-blur-md rounded-lg p-1 flex border border-white/30">
            {[
              { id: 'profile', label: 'Profile', icon: User },
              { id: 'stats', label: 'Stats', icon: Award },
              { id: 'activity', label: 'Activity', icon: Calendar },
              { id: 'settings', label: 'Settings', icon: Settings }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center px-4 py-2 rounded-md transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'bg-white/80 backdrop-blur-sm text-purple-600 shadow-sm'
                    : 'text-gray-700 hover:text-gray-800 hover:bg-white/20'
                }`}
              >
                <tab.icon className="w-4 h-4 mr-2" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="bg-white/20 backdrop-blur-md rounded-lg p-8 border border-white/30 shadow-xl">
          {activeTab === 'profile' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center"
            >
              <div className="bg-white/60 backdrop-blur-sm rounded-lg p-6 shadow-sm mb-6 border border-white/30">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Profile Information</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">Name</span>
                    <span className="font-medium">John Doe</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">Email</span>
                    <span className="font-medium">john@example.com</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">Member Since</span>
                    <span className="font-medium">January 2024</span>
                  </div>
                </div>
                <button className="mt-4 flex items-center mx-auto px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                  <Edit3 className="w-4 h-4 mr-2" />
                  Edit Profile
                </button>
              </div>
            </motion.div>
          )}

          {activeTab === 'stats' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              <div className="bg-white/60 backdrop-blur-sm rounded-lg p-6 text-center shadow-sm border border-white/30">
                <Heart className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-800">12</div>
                <div className="text-gray-700">Soul Hugs Created</div>
              </div>
              <div className="bg-white/60 backdrop-blur-sm rounded-lg p-6 text-center shadow-sm border border-white/30">
                <Calendar className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-800">45</div>
                <div className="text-gray-700">Days Active</div>
              </div>
              <div className="bg-white/60 backdrop-blur-sm rounded-lg p-6 text-center shadow-sm border border-white/30">
                <Award className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-800">3</div>
                <div className="text-gray-700">Achievements</div>
              </div>
            </motion.div>
          )}

          {activeTab === 'activity' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/60 backdrop-blur-sm rounded-lg p-6 shadow-sm border border-white/30"
            >
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Recent Activity</h3>
              <div className="space-y-4">
                <div className="flex items-center p-3 bg-white/50 backdrop-blur-sm rounded-lg border border-white/30">
                  <Heart className="w-5 h-5 text-purple-600 mr-3" />
                  <div>
                    <div className="font-medium">Created Soul Hug for Mom</div>
                    <div className="text-sm text-gray-600">2 hours ago</div>
                  </div>
                </div>
                <div className="flex items-center p-3 bg-white/50 backdrop-blur-sm rounded-lg border border-white/30">
                  <Heart className="w-5 h-5 text-purple-600 mr-3" />
                  <div>
                    <div className="font-medium">Shared Soul Hug with Sarah</div>
                    <div className="text-sm text-gray-600">1 day ago</div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'settings' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/60 backdrop-blur-sm rounded-lg p-6 shadow-sm border border-white/30"
            >
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Settings</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">Email Notifications</span>
                  <button className="w-12 h-6 bg-purple-600 rounded-full relative">
                    <div className="w-5 h-5 bg-white rounded-full absolute right-0.5 top-0.5"></div>
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">Auto-save Drafts</span>
                  <button className="w-12 h-6 bg-gray-300 rounded-full relative">
                    <div className="w-5 h-5 bg-white rounded-full absolute left-0.5 top-0.5"></div>
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">Public Profile</span>
                  <button className="w-12 h-6 bg-purple-600 rounded-full relative">
                    <div className="w-5 h-5 bg-white rounded-full absolute right-0.5 top-0.5"></div>
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}