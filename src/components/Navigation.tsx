import { Link, useLocation } from 'wouter'
import { Heart, Infinity } from 'lucide-react'

export default function Navigation() {
  const [location] = useLocation()

  const navItems = [
    { path: '/define', label: 'Define' },
    { path: '/gather', label: 'Gather' },
    { path: '/craft', label: 'Craft' },
    { path: '/audio-hug', label: 'Audio Hug' },
  ]

  return (
    <nav className="bg-white/90 backdrop-blur-sm shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14 md:h-16">
          <Link href="/" className="flex items-center space-x-2">
            <div className="flex flex-col items-center">
              <Heart className="w-3 h-3 md:w-4 md:h-4 text-cyan-400 mb-[-2px]" />
              <Infinity className="w-5 h-5 md:w-6 md:h-6 text-purple-600" />
            </div>
            <span className="text-lg md:text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              SoulLift
            </span>
          </Link>

          <div className="hidden sm:flex space-x-4 md:space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={`flex items-center space-x-1 px-2 md:px-3 py-2 rounded-lg transition-all duration-200 text-sm md:text-base ${
                  location === item.path
                    ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white'
                    : 'text-gray-700 hover:text-purple-600 hover:bg-purple-50'
                }`}
              >
                <span className="font-medium">{item.label}</span>
              </Link>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="sm:hidden">
            <button className="text-gray-700 hover:text-purple-600 p-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>

          <button className="hidden sm:block soul-button text-sm md:text-base px-4 md:px-6 py-2 md:py-3">
            Sign In
          </button>
          <button className="sm:hidden soul-button text-sm px-3 py-2">
            Sign In
          </button>
        </div>
      </div>
    </nav>
  )
}