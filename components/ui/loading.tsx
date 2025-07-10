import { useEffect, useState } from "react"

const SkeletonBox = ({
  className = "",
  delay = 0,
}: {
  className?: string
  delay?: number
}) => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay * 1000)
    return () => clearTimeout(timer)
  }, [delay])

  return (
    <div
      className={`relative overflow-hidden bg-gray-200 rounded transition-opacity duration-300 ${
        isVisible ? "opacity-100" : "opacity-0"
      } ${className}`}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent animate-shimmer" />
    </div>
  )
}

export default function SkeletonLoadingScreen() {
  const [cardVisibleStates, setCardVisibleStates] = useState(Array(6).fill(false))

  useEffect(() => {
    const timers = cardVisibleStates.map((_, i) => {
      return setTimeout(
        () => {
          setCardVisibleStates((prevStates) => {
            const newStates = [...prevStates]
            newStates[i] = true
            return newStates
          })
        },
        (2.0 + i * 0.1) * 1000,
      )
    })

    return () => {
      timers.forEach((timer) => clearTimeout(timer))
    }
  }, [])

  return (
    <div className="fixed inset-0 z-50 bg-white/70 backdrop-blur-sm animate-fade-in">
      <div className="absolute inset-0 p-4 sm:p-6 lg:p-8">
        {/* Header Skeleton */}
        <div className="max-w-7xl mx-auto mb-8">
          <div className="flex items-center justify-between mb-6">
            <SkeletonBox className="h-8 w-32" delay={0.1} />
            <div className="flex space-x-3">
              <SkeletonBox className="h-8 w-20" delay={0.2} />
              <SkeletonBox className="h-8 w-24" delay={0.3} />
            </div>
          </div>
        </div>

        {/* Hero Section Skeleton */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <SkeletonBox className="h-6 w-40 mx-auto mb-6" delay={0.4} />
          <SkeletonBox className="h-16 w-full max-w-3xl mx-auto mb-6" delay={0.5} />
          <SkeletonBox className="h-6 w-full max-w-2xl mx-auto mb-8" delay={0.6} />

          {/* Button Skeletons */}
          <div className="flex justify-center space-x-4 mb-12">
            <SkeletonBox className="h-12 w-32" delay={0.7} />
            <SkeletonBox className="h-12 w-40" delay={0.8} />
          </div>

          {/* Feature Cards Skeleton */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {[0, 1, 2].map((i) => (
              <div key={i} className="flex flex-col items-center">
                <SkeletonBox className="h-16 w-16 rounded-full mb-4" delay={0.9 + i * 0.1} />
                <SkeletonBox className="h-6 w-32 mb-2" delay={1.0 + i * 0.1} />
                <SkeletonBox className="h-4 w-40" delay={1.1 + i * 0.1} />
              </div>
            ))}
          </div>
        </div>

        {/* Content Section Skeleton */}
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            {/* Left Column */}
            <div className="space-y-6">
              <SkeletonBox className="h-8 w-3/4" delay={1.4} />
              <SkeletonBox className="h-4 w-full" delay={1.5} />
              <SkeletonBox className="h-4 w-5/6" delay={1.6} />
              <SkeletonBox className="h-4 w-4/5" delay={1.7} />
              <SkeletonBox className="h-10 w-32" delay={1.8} />
            </div>

            {/* Right Column */}
            <div className="space-y-4">
              <SkeletonBox className="h-48 w-full rounded-lg" delay={1.9} />
            </div>
          </div>

          {/* Card Grid Skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className={`bg-white/50 backdrop-blur-sm border border-gray-200/50 rounded-lg p-6 space-y-4 transition-all duration-400 ${
                  cardVisibleStates[i] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
                }`}
              >
                <SkeletonBox className="h-6 w-3/4" delay={2.1 + i * 0.1} />
                <SkeletonBox className="h-4 w-full" delay={2.2 + i * 0.1} />
                <SkeletonBox className="h-4 w-5/6" delay={2.3 + i * 0.1} />
                <div className="flex space-x-2 pt-2">
                  <SkeletonBox className="h-8 w-16" delay={2.4 + i * 0.1} />
                  <SkeletonBox className="h-8 w-20" delay={2.5 + i * 0.1} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Skeleton */}
        <div className="max-w-6xl mx-auto mt-20 pt-12 border-t border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="space-y-4">
                <SkeletonBox className="h-6 w-24" delay={2.8 + i * 0.1} />
                <SkeletonBox className="h-4 w-20" delay={2.9 + i * 0.1} />
                <SkeletonBox className="h-4 w-16" delay={3.0 + i * 0.1} />
                <SkeletonBox className="h-4 w-18" delay={3.1 + i * 0.1} />
              </div>
            ))}
          </div>
        </div>

        {/* Floating Loading Indicator */}
        <div className="fixed bottom-8 right-8 bg-white/90 backdrop-blur-sm border border-gray-200/50 rounded-full p-3 shadow-lg animate-pulse">
          <div className="w-5 h-5 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin" />
        </div>
      </div>
    </div>
  )
}
