import { Link, useLocation } from 'wouter'
import { Home, Heart, Archive, User, Search } from 'lucide-react'
import { motion } from 'framer-motion'
import { PlaceholdersAndVanishInput } from './ui/placeholders-and-vanish-input'
import { useState } from 'react'

export default function BottomNavigation() {
  const [location, setLocation] = useLocation()

  const navigationPlaceholders = [
    "Go to Home",
    "Create new Soul Hug",
    "View My Hugs",
    "Open Profile",
    "Start creating...",
    "Find my messages",
    "Navigate to...",
    "Search pages..."
  ]

  const handleNavigationSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.toLowerCase()
    
    // Auto-navigate based on keywords
    if (query.includes('home') || query.includes('start')) {
      setLocation('/')
    } else if (query.includes('create') || query.includes('new') || query.includes('define')) {
      setLocation('/define')
    } else if (query.includes('hug') || query.includes('my') || query.includes('saved')) {
      setLocation('/my-hugs')
    } else if (query.includes('profile') || query.includes('archive') || query.includes('settings')) {
      setLocation('/soul-archive')
    } else if (query.includes('gather')) {
      setLocation('/gather')
    } else if (query.includes('craft') || query.includes('write')) {
      setLocation('/craft')
    } else if (query.includes('audio') || query.includes('record')) {
      setLocation('/audio-hug')
    }
  }

  const handleNavigationSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // Could add more sophisticated search logic here
  }

  const navItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/define', label: 'Create', icon: Heart },
    { path: '/my-hugs', label: 'My Hugs', icon: Archive },
    { path: '/soul-archive', label: 'Profile', icon: User }
  ]

  const isActive = (path: string) => {
    if (path === '/') return location === '/'
    return location.startsWith(path)
  }

  return (
    <motion.div 
      className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-t border-gray-200 z-50 shadow-lg"
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <div className="max-w-4xl mx-auto px-4 py-3">
        {/* Search Navigation Input */}
        <div className="mb-3">
          <PlaceholdersAndVanishInput
            placeholders={navigationPlaceholders}
            onChange={handleNavigationSearch}
            onSubmit={handleNavigationSubmit}
            className="border-purple-200 hover:border-purple-300 focus-within:border-purple-400 bg-white/80"
          />
        </div>

        {/* Quick Access Icons */}
        <div className="flex items-center justify-around">
          {navItems.map((item) => (
            <Link key={item.path} href={item.path}>
              <motion.button
                className={`flex flex-col items-center py-1 px-3 rounded-lg transition-colors ${
                  isActive(item.path)
                    ? 'text-purple-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                whileTap={{ scale: 0.95 }}
                whileHover={{ scale: 1.05 }}
              >
                <motion.div
                  animate={{
                    scale: isActive(item.path) ? 1.1 : 1,
                    color: isActive(item.path) ? '#9333ea' : '#6b7280'
                  }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <item.icon className="w-5 h-5" />
                </motion.div>
                <span className={`text-xs mt-1 font-medium ${
                  isActive(item.path) ? 'text-purple-600' : 'text-gray-500'
                }`}>
                  {item.label}
                </span>
                {isActive(item.path) && (
                  <motion.div
                    className="w-1 h-1 bg-purple-600 rounded-full mt-1"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  />
                )}
              </motion.button>
            </Link>
          ))}
        </div>

        {/* Search hint */}
        <div className="text-center mt-2">
          <p className="text-xs text-gray-400">
            Type to navigate: "create", "my hugs", "home", "profile"
          </p>
        </div>
      </div>
    </motion.div>
  )
}