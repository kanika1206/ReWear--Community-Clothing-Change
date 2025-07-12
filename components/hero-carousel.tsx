"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Play, Pause, ArrowRight, Sparkles } from "lucide-react"
import Image from "next/image"

interface HeroSlide {
  title: string
  subtitle: string
  image: string
  cta: string
  badge?: string
}

interface HeroCarouselProps {
  slides?: HeroSlide[]
}

const defaultSlides: HeroSlide[] = [
  {
    title: "Sustainable Fashion Revolution",
    subtitle: "Join 50K+ eco-conscious fashion lovers",
    image: "/images/hero-banner-1.jpg",
    cta: "Start Your Journey",
    badge: "New Collection"
  },
  {
    title: "Designer Pieces, Accessible Prices",
    subtitle: "Luxury fashion for everyone",
    image: "/images/hero-banner-2.jpg",
    cta: "Explore Collection",
    badge: "Trending Now"
  },
  {
    title: "Local Community, Global Impact",
    subtitle: "Connect with fashion lovers nearby",
    image: "/images/hero-banner-3.jpg",
    cta: "Find Your Tribe",
    badge: "Community Picks"
  },
]

export function HeroCarousel({ slides = defaultSlides }: HeroCarouselProps) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const [isMounted, setIsMounted] = useState(false)

  // Auto-advance slides
  useEffect(() => {
    if (!isPlaying) return
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)
    
    return () => clearInterval(interval)
  }, [isPlaying, slides.length])

  // Set mounted state for animations
  useEffect(() => {
    setIsMounted(true)
  }, [])

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
    // Restart auto-play when manually changing slides
    if (!isPlaying) setIsPlaying(true)
  }

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
    if (!isPlaying) setIsPlaying(true)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
    if (!isPlaying) setIsPlaying(true)
  }

  return (
    <section className="relative h-[80vh] min-h-[500px] overflow-hidden">
      {/* Background Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary-900/80 via-primary-700/60 to-transparent z-10" />
      
      {/* Carousel Slides */}
      <div className="relative h-full w-full">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
            style={{
              transform: `translateX(${(index - currentSlide) * 100}%)`,
              transition: 'transform 0.8s cubic-bezier(0.77, 0, 0.175, 1)'
            }}
          >
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              className="object-cover"
              priority={index === 0}
              sizes="100vw"
            />
          </div>
        ))}
      </div>

      {/* Content Overlay */}
      <div className="absolute inset-0 z-20 flex items-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            {slides[currentSlide].badge && (
              <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm mb-6 px-4 py-2 text-sm font-medium">
                <Sparkles className="w-4 h-4 mr-2" />
                {slides[currentSlide].badge}
              </Badge>
            )}
            
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              {slides[currentSlide].title}
            </h2>
            
            <p className="text-lg sm:text-xl text-white/90 mb-8 max-w-lg">
              {slides[currentSlide].subtitle}
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="bg-white text-primary-700 hover:bg-gray-100 px-8 py-6 text-base sm:text-lg font-semibold transition-all hover:shadow-lg"
              >
                {slides[currentSlide].cta}
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              
              <Button
                variant="outline"
                size="lg"
                className="border-2 border-white text-white hover:bg-white/10 px-8 py-6 text-base sm:text-lg font-medium backdrop-blur-sm bg-transparent"
              >
                <Play className="w-5 h-5 mr-2" />
                Watch Story
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-300"
        aria-label="Previous slide"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-300"
        aria-label="Next slide"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Carousel Controls */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30 flex items-center space-x-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsPlaying(!isPlaying)}
          className="text-white hover:bg-white/20 backdrop-blur-sm rounded-full p-2"
          aria-label={isPlaying ? 'Pause carousel' : 'Play carousel'}
        >
          {isPlaying ? (
            <Pause className="w-5 h-5" />
          ) : (
            <Play className="w-5 h-5" />
          )}
        </Button>
        
        <div className="flex space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentSlide ? 'bg-white w-8' : 'bg-white/40 w-3'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
        
        <div className="text-white text-sm font-medium backdrop-blur-sm bg-black/20 px-3 py-1 rounded-full hidden sm:block">
          {currentSlide + 1} / {slides.length}
        </div>
      </div>
    </section>
  )
}
