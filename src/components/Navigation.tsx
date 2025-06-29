import { Link, useLocation } from 'wouter'
import { Heart, Infinity, Menu, X } from 'lucide-react'

export default function Navigation() {
  const [location] = useLocation()

  const navItems = [
    { path: '/define', label: 'Define' },
    { path: '/gather', label: 'Gather' },
    { path: '/craft', label: 'Craft' },
    { path: '/audio-hug', label: 'Audio Hug' },
  ]

  return (
    <nav className="bg-white/95 backdrop-blur-md shadow-lg sticky top-0 z-50 border-b border-purple-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-2">
            <div className="flex flex-col items-center">
              <Heart className="w-4 h-4 text-cyan-400 mb-[-2px]" />
              <Infinity className="w-6 h-6 text-purple-600" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              SoulLift
            </span>
          </Link>

          {/* Navigation - Hidden on mobile */}
          <div className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={`flex items-center space-x-1 px-4 py-2 rounded-xl transition-all duration-200 ${
                  location === item.path
                    ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg'
                    : 'text-gray-700 hover:text-purple-600 hover:bg-purple-50'
                }`}
              >
                <span className="font-medium">{item.label}</span>
              </Link>
            ))}
          </div>

          {/* Sign In Button - Hidden on mobile */}
          <button className="hidden md:block soul-button">
            Sign In
          </button>
        </div>
      </div>
    </nav>
  )
}