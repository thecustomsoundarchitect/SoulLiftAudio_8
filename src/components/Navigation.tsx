import { Link, useLocation } from 'wouter'
import { Heart } from 'lucide-react'

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
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center">
              <Heart className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              SoulLift
            </span>
          </Link>

          <div className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-all duration-200 ${
                  location === item.path
                    ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white'
                    : 'text-gray-700 hover:text-purple-600 hover:bg-purple-50'
                }`}
              >
                <span className="font-medium">{item.label}</span>
              </Link>
            ))}
          </div>

          <button className="soul-button">
            Sign In
          </button>
        </div>
      </div>
    </nav>
  )
}