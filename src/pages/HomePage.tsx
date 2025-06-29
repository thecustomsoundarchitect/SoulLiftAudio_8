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
      blur={15}
      speed="slow"
      waveOpacity={0.2}
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
          <div className="flex flex-col items-center gap-6 max-w-sm sm:max-w-2xl lg:max-w-4xl mx-auto mb-8 md:mb-12">
            <Link href="/define">
              <button className="
                relative
                bg-gradient-to-br from-purple-400 to-purple-600 
                rounded-3xl 
                p-6 
                shadow-xl 
                text-white 
                font-semibold 
                text-lg
                transform 
                hover:scale-105 
                transition-all 
                duration-200
                border-0
                min-w-[280px]
                overflow-hidden
                before:absolute
                before:inset-0
                before:bg-gradient-to-br
                before:from-white/30
                before:via-white/10
                before:to-transparent
                before:rounded-3xl
                before:pointer-events-none
                after:absolute
                after:top-0
                after:left-0
                after:right-0
                after:h-1/2
                after:bg-gradient-to-b
                after:from-white/20
                after:to-transparent
                after:rounded-t-3xl
                after:pointer-events-none
              ">
                <span className="relative z-10">Create New Soul Hug</span>
              </button>
            </Link>

            <Link href="/my-hugs">
              <button className="
                relative
                bg-gradient-to-br from-blue-400 to-blue-600 
                rounded-3xl 
                p-6 
                shadow-xl 
                text-white 
                font-semibold 
                text-lg
                transform 
                hover:scale-105 
                transition-all 
                duration-200
                border-0
                min-w-[280px]
                overflow-hidden
                before:absolute
                before:inset-0
                before:bg-gradient-to-br
                before:from-white/30
                before:via-white/10
                before:to-transparent
                before:rounded-3xl
                before:pointer-events-none
                after:absolute
                after:top-0
                after:left-0
                after:right-0
                after:h-1/2
                after:bg-gradient-to-b
                after:from-white/20
                after:to-transparent
                after:rounded-t-3xl
                after:pointer-events-none
              ">
                <span className="relative z-10">View My Soul Hugs</span>
              </button>
            </Link>
          </div>

          {/* Sign In CTA */}
          <div className="text-center">
            <button className="soul-button-outline text-base md:text-lg px-8">
              Sign In to Save Your Creations
            </button>
          </div>
        </div>
      </div>
    </WavyBackground>
  )
}