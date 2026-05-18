import React, { useEffect, useState, useRef } from 'react'
import { Link } from 'react-router'

// Color mapping for cards
const COLORS = {
    'Spiced Chai': 'bg-amber-100 text-amber-800',
    'Green Tea': 'bg-green-100 text-green-800',
    'Herbal Infusion': 'bg-pink-100 text-pink-800',
    'Black Tea': 'bg-gray-100 text-gray-800',
    'Oolong Tea': 'bg-yellow-100 text-yellow-800',
}

export default function FeaturedSlider({ items = [], bg = 'gray-100' }) {
  const featured = items
  const [index, setIndex] = useState(0)
  const nextIndex = (index + 1) % Math.max(1, featured.length)
  const count = featured.length
  const containerRef = useRef(null)
  const [scale, setScale] = useState(1)
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)

  // Responsive scaling function with 50px intervals
  useEffect(() => {
    const calculateScale = () => {
      const width = window.innerWidth
      let newScale = 1
      
      // Scale increases by 0.025 every 50px from 768px to 1920px
      // Base scale at 768px = 0.7, at 1920px = 1.2
      if (width <= 768) {
        // Mobile: 0.6 - 0.7 range
        const steps = Math.floor((width - 320) / 50)
        newScale = 0.55 + (steps * 0.025)
        newScale = Math.min(0.7, Math.max(0.55, newScale))
      } 
      else if (width <= 1024) {
        // Tablet portrait to landscape: 0.7 - 0.85 range
        const steps = Math.floor((width - 768) / 50)
        newScale = 0.7 + (steps * 0.025)
        newScale = Math.min(0.85, Math.max(0.7, newScale))
      }
      else if (width <= 1280) {
        // Tablet landscape to small desktop: 0.85 - 0.95 range
        const steps = Math.floor((width - 1024) / 50)
        newScale = 0.85 + (steps * 0.025)
        newScale = Math.min(0.95, Math.max(0.85, newScale))
      }
      else if (width <= 1440) {
        // Small desktop: 0.95 - 1.0 range
        const steps = Math.floor((width - 1280) / 50)
        newScale = 0.95 + (steps * 0.025)
        newScale = Math.min(1.0, Math.max(0.95, newScale))
      }
      else if (width <= 1680) {
        // Medium desktop: 1.0 - 1.1 range
        const steps = Math.floor((width - 1440) / 50)
        newScale = 1.0 + (steps * 0.025)
        newScale = Math.min(1.1, Math.max(1.0, newScale))
      }
      else if (width <= 1920) {
        // Large desktop: 1.1 - 1.2 range
        const steps = Math.floor((width - 1680) / 50)
        newScale = 1.1 + (steps * 0.025)
        newScale = Math.min(1.2, Math.max(1.1, newScale))
      }
      else {
        // Ultra wide: up to 1.35
        const steps = Math.floor((width - 1920) / 50)
        newScale = 1.2 + (steps * 0.025)
        newScale = Math.min(1.35, Math.max(1.2, newScale))
      }
      
      setScale(newScale)
      setIsMobile(width < 768)
    }

    calculateScale()
    window.addEventListener('resize', calculateScale)
    return () => window.removeEventListener('resize', calculateScale)
  }, [])

  useEffect(() => {
    return () => {}
  }, [])

  if (!count) return null

  const goTo = (i) => {
    setIndex(((i % count) + count) % count)
  }

  // Get color class for item
  const getColorClass = (itemName) => {
    return COLORS[itemName] || 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200'
  }

  // Dynamic text sizes based on scale
  const getTextSize = () => {
    if (scale >= 1.15) return 'text-7xl lg:text-8xl'
    if (scale >= 1.0) return 'text-6xl lg:text-7xl'
    if (scale >= 0.85) return 'text-5xl lg:text-6xl'
    if (scale >= 0.7) return 'text-4xl lg:text-5xl'
    return 'text-3xl lg:text-4xl'
  }

  // Dynamic padding and spacing based on scale
  const getContainerPadding = () => {
    if (scale >= 1.0) return 'px-8 py-16'
    if (scale >= 0.85) return 'px-6 py-12'
    return 'px-4 py-8'
  }

  // Mobile view: Normal slider layout
  if (isMobile) {
    return (
      <section className={`mx-auto max-w-7xl ${getContainerPadding()} transition-all duration-300`}>
        <div className="flex flex-col gap-8">
          {/* Mobile: Text at top */}
          <div className="text-center">
            <div className="max-w-full">
              <h1 className={`${getTextSize()} font-extrabold leading-tight text-gray-900 dark:text-white transition-all duration-300`}>
                {featured[index].name}
              </h1>
              <p className={`mt-3 text-sm uppercase text-amber-700 dark:text-amber-300 font-semibold transition-all duration-300`}>
                {featured[index].category}
              </p>
              <p className={`mt-6 text-gray-700 dark:text-gray-300 leading-relaxed transition-all duration-300`}>
                {featured[index].description}
              </p>

              <div className="mt-8">
                <Link 
                  to={`/product/${featured[index].id}`} 
                  className="inline-flex items-center gap-3 rounded-full bg-amber-500 px-6 py-3 text-sm font-semibold text-white hover:bg-amber-600 hover:scale-105 transition-all focus:outline-none focus:ring-2 focus:ring-amber-400"
                >
                  Buy →
                </Link>
              </div>
            </div>
          </div>

          {/* Mobile: Card at bottom */}
          <div className="relative h-80 flex items-center justify-center" ref={containerRef}>
            <div className="relative w-80 h-64 max-w-sm">
              {featured.map((item, i) => {
                const isCurrent = i === index
                const isNext = i === nextIndex
                const colorClass = getColorClass(item.name)
                const baseClass = `absolute left-0 top-0 w-full h-full rounded-2xl overflow-hidden shadow-2xl transition-all duration-500 ease-in-out ${colorClass}`

                let style = { transform: 'translate(0,0) scale(1)', opacity: 1, zIndex: 20 - i }

                if (isCurrent) {
                  style = { transform: 'translate(0,0) scale(1)', opacity: 1, zIndex: 30 }
                } else if (isNext) {
                  style = { transform: 'translate(15px,10px) scale(0.98)', opacity: 0.95, zIndex: 20 }
                } else if (i < index) {
                  style = { transform: 'translate(-40px,-24px) scale(0.95)', opacity: 0, zIndex: 10 }
                } else if (i > nextIndex) {
                  style = { transform: 'translate(40px,30px) scale(0.95)', opacity: 0, zIndex: 5 }
                }

                const pointer = isCurrent || isNext ? 'auto' : 'none'

                return (
                  <div
                    key={item.id}
                    className={baseClass}
                    style={{ ...style, pointerEvents: pointer }}
                  >
                    <div className="absolute inset-0 opacity-90" />
                    <img 
                      src={item.imageUrl} 
                      alt={item.name} 
                      className="h-full w-full object-cover mix-blend-multiply dark:mix-blend-overlay" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                    <div className="absolute left-4 bottom-4 text-white">
                      <div className="text-sm font-medium drop-shadow-md">{item.name}</div>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Quick nav */}
            <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 flex items-center gap-4">
              <div className="h-2 w-48 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
                <div className="h-full bg-amber-500 rounded-full transition-all duration-300" style={{ width: `${(index / Math.max(1, count - 1)) * 100}%` }} />
              </div>
              <div className="flex items-center gap-2">
                {featured.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => goTo(i)}
                    aria-label={`Go to ${i + 1}`}
                    className={`h-3 w-3 rounded-full transition-all duration-200 ${i === index ? 'bg-amber-600' : 'bg-gray-100 dark:bg-gray-900'}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  // Desktop view: Side-by-side layout
  return (
    <section className={`flex flex-row flex-nowrap overflow-x-auto overflow-y-hidden ${getContainerPadding()} transition-all duration-300`}>
      <div 
        className="flex flex-row flex-nowrap gap-8 items-center transition-all duration-300 w-full"
        style={{ transform: `scale(${scale})`, transformOrigin: 'center center' }}
      >
        {/* Left: Feature text - No wrap */}
        <div className="flex-shrink-0">
          <div className="max-w-400">
            <h1 className={`${getTextSize()} font-extrabold leading-tight text-gray-900 dark:text-white transition-all duration-300 whitespace-nowrap`}>
              {featured[index].name}
            </h1>
            <p className={`mt-3 text-sm uppercase text-amber-700 dark:text-amber-300 font-semibold transition-all duration-300`}>
              {featured[index].category}
            </p>
            <p className={`mt-6 text-gray-700 dark:text-gray-300 leading-relaxed transition-all duration-300 max-w-md`}>
              {featured[index].description}
            </p>

            <div className="mt-8">
              <Link 
                to={`/product/${featured[index].id}`} 
                className="inline-flex items-center gap-3 rounded-full bg-amber-500 px-6 py-3 text-sm font-semibold text-white hover:bg-amber-600 hover:scale-105 transition-all focus:outline-none focus:ring-2 focus:ring-amber-400"
              >
                Buy →
              </Link>
            </div>
          </div>
        </div>

        {/* Right: Stacked cards - No wrap */}
        <div className="flex-shrink-0 relative h-80 flex items-center justify-center" ref={containerRef}>
          <div className="relative w-80 h-64 max-w-400">
            {featured.map((item, i) => {
              const isCurrent = i === index
              const isNext = i === nextIndex
              const colorClass = getColorClass(item.name)
              const baseClass = `absolute left-0 top-0 w-full h-full rounded-2xl overflow-hidden shadow-2xl transition-all duration-500 ease-in-out ${colorClass}`

              let style = { transform: 'translate(0,0) scale(1)', opacity: 1, zIndex: 20 - i }

              if (isCurrent) {
                style = { transform: 'translate(0,0) scale(1)', opacity: 1, zIndex: 30 }
              } else if (isNext) {
                style = { transform: 'translate(15px,10px) scale(0.98)', opacity: 0.95, zIndex: 20 }
              } else if (i < index) {
                style = { transform: 'translate(-40px,-24px) scale(0.95)', opacity: 0, zIndex: 10 }
              } else if (i > nextIndex) {
                style = { transform: 'translate(40px,30px) scale(0.95)', opacity: 0, zIndex: 5 }
              }

              const pointer = isCurrent || isNext ? 'auto' : 'none'

              // Scale card dimensions based on viewport
              const cardScale = Math.min(1.2, Math.max(0.6, scale))

              return (
                <div
                  key={item.id}
                  className={baseClass}
                  style={{ 
                    ...style, 
                    pointerEvents: pointer,
                    transform: `${style.transform} scale(${cardScale})`,
                    transformOrigin: 'center center'
                  }}
                >
                  {/* Color background layer */}
                  <div className="absolute inset-0 opacity-90" />
                  
                  {/* Image with blend mode for better visibility */}
                  <img 
                    src={item.imageUrl} 
                    alt={item.name} 
                    className="h-full w-full object-cover mix-blend-multiply dark:mix-blend-overlay" 
                  />
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  <div className="absolute left-4 bottom-4 text-white">
                    <div className="text-sm font-medium drop-shadow-md">{item.name}</div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Quick nav */}
          <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 flex items-center gap-4">
            {/* progress bar */}
            <div className="h-2 w-48 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
              <div className="h-full bg-amber-500 rounded-full transition-all duration-300" style={{ width: `${(index / Math.max(1, count - 1)) * 100}%` }} />
            </div>

            {/* dots */}
            <div className="flex items-center gap-2">
              {featured.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  aria-label={`Go to ${i + 1}`}
                  className={`h-3 w-3 rounded-full transition-all duration-200 ${i === index ? 'bg-amber-600' : 'bg-gray-100 dark:bg-gray-900'}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}