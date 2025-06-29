import { useState } from 'react'
import { User, Heart, Calendar, Award, Settings, Edit3 } from 'lucide-react'
import { motion } from 'framer-motion'

export default function SoulArchivePage() {
  const [activeTab, setActiveTab] = useState('profile')

  return (
    <div className="min-h-screen bg-white pb-20">
      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              SOUL ARCHIVE
            </span>
          </h1>
          <p className="text-gray-600">Your personal profile and achievements</p>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className="bg-gray-100 rounded-lg p-1 flex">
            {[
              { id: 'profile', label: 'Profile', icon: User },
              { id: 'stats', label: 'Stats', icon: Award },
              { id: 'activity', label: 'Activity', icon: Calendar },
              { id: 'settings', label: 'Settings', icon: Settings }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center px-4 py-2 rounded-md transition-colors ${
                  activeTab === tab.id
                    ? 'bg-white text-purple-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                <tab.icon className="w-4 h-4 mr-2" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="bg-gray-50 rounded-lg p-8">
          {activeTab === 'profile' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center"
            >
              <div className="bg-white rounded-lg p-6 shadow-sm mb-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Profile Information</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Name</span>
                    <span className="font-medium">John Doe</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Email</span>
                    <span className="font-medium">john@example.com</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Member Since</span>
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
              <div className="bg-white rounded-lg p-6 text-center shadow-sm">
                <Heart className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-800">12</div>
                <div className="text-gray-600">Soul Hugs Created</div>
              </div>
              <div className="bg-white rounded-lg p-6 text-center shadow-sm">
                <Calendar className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-800">45</div>
                <div className="text-gray-600">Days Active</div>
              </div>
              <div className="bg-white rounded-lg p-6 text-center shadow-sm">
                <Award className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-800">3</div>
                <div className="text-gray-600">Achievements</div>
              </div>
            </motion.div>
          )}

          {activeTab === 'activity' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-lg p-6 shadow-sm"
            >
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Recent Activity</h3>
              <div className="space-y-4">
                <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                  <Heart className="w-5 h-5 text-purple-600 mr-3" />
                  <div>
                    <div className="font-medium">Created Soul Hug for Mom</div>
                    <div className="text-sm text-gray-600">2 hours ago</div>
                  </div>
                </div>
                <div className="flex items-center p-3 bg-gray-50 rounded-lg">
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
              className="bg-white rounded-lg p-6 shadow-sm"
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