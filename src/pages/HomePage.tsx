import { Link } from 'wouter'
import { Plus, Eye, Headphones, Heart, Infinity } from 'lucide-react'
import { WavyBackground } from '../components/ui/wavy-background'

export default function HomePage() {
  return (
    <WavyBackground
      className="min-h-screen"
      containerClassName="min-h-screen"
      colors={["#5B2885", "#DF86F9", "#29D3FF"]}
      waveWidth={50}
      backgroundFill="white"
      blur={10}
      speed="slow"
      waveOpacity={0.3}
    >
      <div className="relative z-10 min-h-screen pt-8 pb-16">
        <div className="max-w-sm sm:max-w-2xl lg:max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <div className="text-center mb-8 md:mb-16">
            <img 
              src="/images/Screenshot 2025-06-29 at 3.40.03 AM copy.jpg" 
              alt="SoulLift Audio Logo" 
              className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-6 md:mb-8 object-cover object-bottom"
            />
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-800 mb-4 md:mb-6">
              <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                SoulLift
              </span>
              <span className="block text-2xl sm:text-3xl lg:text-4xl font-normal text-gray-700 mt-2">Audio</span>
            </h1>
            
            <p className="text-lg sm:text-xl text-gray-600 mb-8 md:mb-12 max-w-3xl mx-auto leading-relaxed px-2">
              Join thousands creating meaningful connections through personalized audio messages
            </p>
          </div>

          {/* Main Action Cards */}
          <div className="grid grid-cols-1 gap-4 md:gap-8 max-w-sm sm:max-w-2xl lg:max-w-4xl mx-auto mb-8 md:mb-12">
            <Link href="/define">
              <div className="soul-card cursor-pointer group hover:shadow-2xl transition-all duration-300">
                <div className="flex items-center p-4 md:p-0">
                  <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl md:rounded-2xl flex items-center justify-center mr-4 md:mr-6 group-hover:scale-110 transition-transform duration-200 flex-shrink-0">
                    <Plus className="w-6 h-6 md:w-8 md:h-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg md:text-2xl font-bold text-gray-800 mb-1 md:mb-2">Create New Soul Hug</h3>
                    <p className="text-sm md:text-base text-gray-600">Start your creative journey with AI assistance</p>
                  </div>
                  <div className="text-gray-400 group-hover:text-gray-600 transition-colors">
                    <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>

            <Link href="/my-hugs">
              <div className="soul-card cursor-pointer group hover:shadow-2xl transition-all duration-300">
                <div className="flex items-center p-4 md:p-0">
                  <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-r from-green-500 to-teal-500 rounded-xl md:rounded-2xl flex items-center justify-center mr-4 md:mr-6 group-hover:scale-110 transition-transform duration-200 flex-shrink-0">
                    <Eye className="w-6 h-6 md:w-8 md:h-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg md:text-2xl font-bold text-gray-800 mb-1 md:mb-2">View My Soul Hugs</h3>
                    <p className="text-sm md:text-base text-gray-600">Access your saved creations and memories</p>
                  </div>
                  <div className="text-gray-400 group-hover:text-gray-600 transition-colors">
                    <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>

            <Link href="/audio-hug">
              <div className="soul-card cursor-pointer group hover:shadow-2xl transition-all duration-300">
                <div className="flex items-center p-4 md:p-0">
                  <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-xl md:rounded-2xl flex items-center justify-center mr-4 md:mr-6 group-hover:scale-110 transition-transform duration-200 flex-shrink-0">
                    <Headphones className="w-6 h-6 md:w-8 md:h-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg md:text-2xl font-bold text-gray-800 mb-1 md:mb-2">Audio Features</h3>
                    <p className="text-sm md:text-base text-gray-600">Voice recording, AI narration, and music mixing</p>
                  </div>
                  <div className="text-gray-400 group-hover:text-gray-600 transition-colors">
                    <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>
          </div>

          {/* Sign In CTA */}
          <div className="text-center">
            <button className="border-2 border-purple-600 text-purple-600 px-6 md:px-8 py-3 md:py-4 rounded-xl font-medium transition-all duration-200 hover:bg-purple-600 hover:text-white text-base md:text-lg min-h-12">
              Sign In to Save Your Creations
            </button>
          </div>
        </div>
      </div>
    </WavyBackground>
  )
}