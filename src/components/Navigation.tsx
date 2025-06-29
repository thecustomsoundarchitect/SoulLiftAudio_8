import { useState } from 'react'
import { Link, useLocation } from 'wouter'
import { Heart, Infinity, Menu, X } from 'lucide-react'

export default function Navigation() {
  const [location] = useLocation()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const navItems = [
    { path: '/define', label: 'Define' },
    { path: '/gather', label: 'Gather' },
    { path: '/craft', label: 'Craft' },
    { path: '/audio-hug', label: 'Audio Hug' },
  ]

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  return (
    <nav className="bg-white/90 backdrop-blur-sm shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14 md:h-16">
          <Link href="/" className="flex items-center space-x-2" onClick={closeMobileMenu}>
            <div className="flex flex-col items-center">
              <Heart className="w-3 h-3 md:w-4 md:h-4 text-cyan-400 mb-[-2px]" />
              <Infinity className="w-5 h-5 md:w-6 md:h-6 text-purple-600" />
            </div>
            <span className="text-lg md:text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              SoulLift
            </span>
          </Link>

          {/* Desktop Navigation */}
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

          {/* Desktop Sign In Button */}
          <button className="hidden md:block soul-button">
            Sign In
          </button>

          {/* Mobile menu button */}
          <button 
            onClick={toggleMobileMenu}
            className="md:hidden p-2 rounded-lg text-gray-700 hover:text-purple-600 hover:bg-purple-50 transition-colors"
          >
            {isMobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 bg-white/95 backdrop-blur-sm">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  onClick={closeMobileMenu}
                  className={`block px-3 py-2 rounded-lg text-base font-medium transition-all duration-200 ${
                    location === item.path
                      ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white'
                      : 'text-gray-700 hover:text-purple-600 hover:bg-purple-50'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              <div className="pt-2">
                <button className="w-full soul-button text-sm">
                  Sign In
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}