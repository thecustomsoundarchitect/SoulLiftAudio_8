import { Link } from 'wouter'
import { Plus, Eye, Headphones, Heart, Infinity } from 'lucide-react'
import { WavyBackground } from '../components/ui/wavy-background'

export default function HomePage() {
  return (
    <WavyBackground
      colors={["#311A55", "#5B2885", "#7B4EFF", "#9F7AEA", "#B794F6"]}
      waveWidth={60}
      backgroundFill="linear-gradient(135deg, #311A55 0%, #241946 100%)"
      blur={15}
      speed="slow"
      waveOpacity={0.3}
      containerClassName="min-h-screen"
      className="w-full"
    >
      <div className="relative z-50 min-h-screen pt-8 pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <div className="inline-flex flex-col items-center justify-center w-24 h-24 bg-white/10 backdrop-blur-sm rounded-full mb-8">
              <Heart className="w-8 h-8 text-cyan-300 mb-[-2px] drop-shadow-lg" />
              <Infinity className="w-12 h-12 text-purple-300 drop-shadow-lg" />
            </div>
            
            <h1 className="text-6xl font-bold text-white mb-6 drop-shadow-2xl">
              <span className="bg-gradient-to-r from-purple-300 to-blue-300 bg-clip-text text-transparent">
                SoulLift
              </span>
              <span className="block text-4xl font-normal text-white/90 mt-2">Audio</span>
            </h1>
            
            <p className="text-xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed drop-shadow-lg">
              Join thousands creating meaningful connections through personalized audio messages
            </p>
          </div>

          {/* Main Action Cards */}
          <div className="grid md:grid-cols-1 gap-8 max-w-4xl mx-auto mb-12">
            <Link href="/define">
              <div className="soul-card cursor-pointer group backdrop-blur-sm bg-white/95 hover:bg-white/100 transition-all duration-300">
                <div className="flex items-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mr-6 group-hover:scale-110 transition-transform duration-200">
                    <Plus className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">Create New Soul Hug</h3>
                    <p className="text-gray-600">Start your creative journey with AI assistance</p>
                  </div>
                  <div className="text-gray-400 group-hover:text-gray-600 transition-colors">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>

            <Link href="/my-hugs">
              <div className="soul-card cursor-pointer group backdrop-blur-sm bg-white/95 hover:bg-white/100 transition-all duration-300">
                <div className="flex items-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-teal-500 rounded-2xl flex items-center justify-center mr-6 group-hover:scale-110 transition-transform duration-200">
                    <Eye className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">View My Soul Hugs</h3>
                    <p className="text-gray-600">Access your saved creations and memories</p>
                  </div>
                  <div className="text-gray-400 group-hover:text-gray-600 transition-colors">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>

            <Link href="/audio-hug">
              <div className="soul-card cursor-pointer group backdrop-blur-sm bg-white/95 hover:bg-white/100 transition-all duration-300">
                <div className="flex items-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-2xl flex items-center justify-center mr-6 group-hover:scale-110 transition-transform duration-200">
                    <Headphones className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">Audio Features</h3>
                    <p className="text-gray-600">Voice recording, AI narration, and music mixing</p>
                  </div>
                  <div className="text-gray-400 group-hover:text-gray-600 transition-colors">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>
          </div>

          {/* Sign In CTA */}
          <div className="text-center">
            <button className="soul-button-outline text-lg px-8 py-4 backdrop-blur-sm">
              Sign In to Save Your Creations
            </button>
          </div>
        </div>
      </div>
    </WavyBackground>
  )
}