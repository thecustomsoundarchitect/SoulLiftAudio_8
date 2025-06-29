import { useLocation } from 'wouter'

interface ProgressIndicatorProps {
  className?: string
}

export default function ProgressIndicator({ className = '' }: ProgressIndicatorProps) {
  const [location] = useLocation()
  
  const getProgress = () => {
    switch (location) {
      case '/define':
        return 25
      case '/gather':
        return 50
      case '/craft':
        return 75
      case '/audio-hug':
        return 100
      default:
        return 0
    }
  }

  const progress = getProgress()

  if (progress === 0) return null

  return (
    <div className={`flex justify-center ${className}`}>
      <div className="flex items-center space-x-2">
        <img 
          src="/images/2.png" 
          alt="SoulLift Logo" 
          className="w-8 h-8 object-contain"
          style={{
            clipPath: `inset(0 ${100 - progress}% 0 0)`
          }}
        />
        <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  )
}