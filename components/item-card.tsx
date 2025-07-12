"use client"

import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Heart, Eye, MapPin, Clock, Bookmark, MessageCircle, Share2, Award, Star } from "lucide-react"
import Image from "next/image"
import { cn } from "@/lib/utils"

interface ItemCardProps {
  item: {
    id: number
    title: string
    brand: string
    user: string
    userAvatar?: string
    location: string
    size: string
    condition: string
    originalPrice: number
    currentPrice: number
    likes: number
    views: number
    rating: number
    reviewCount: number
    timeAgo: string
    images: string[]
    tags: string[]
    verified?: boolean
    featured?: boolean
    onSale?: boolean
    saleDiscount?: number
    isLiked?: boolean
    onLike?: (id: number) => void
  }
  variant?: 'default' | 'compact' | 'featured'
  className?: string
}

export function ItemCard({ item, variant = 'default', className }: ItemCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isLiked, setIsLiked] = useState(item.isLiked || false)
  
  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsLiked(!isLiked)
    if (item.onLike) {
      item.onLike(item.id)
    }
  }

  const nextImage = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setCurrentImageIndex((prev) => (prev + 1) % item.images.length)
  }

  const prevImage = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setCurrentImageIndex((prev) => (prev - 1 + item.images.length) % item.images.length)
  }

  const isCompact = variant === 'compact'
  const isFeatured = variant === 'featured'

  return (
    <Card 
      className={cn(
        'group relative overflow-hidden transition-all duration-300 border border-gray-100 hover:shadow-lg',
        isFeatured ? 'border-2 border-primary-500' : '',
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Badges */}
      <div className="absolute top-3 left-3 z-10 flex flex-col items-start space-y-2">
        {item.featured && (
          <Badge className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white border-0 shadow-md">
            <Award className="w-3 h-3 mr-1" />
            Featured
          </Badge>
        )}
        {item.onSale && item.saleDiscount && (
          <Badge className="bg-red-500 text-white border-0 shadow-md">
            -{item.saleDiscount}%
          </Badge>
        )}
      </div>

      {/* Like Button */}
      <Button 
        variant="ghost" 
        size="icon" 
        className={cn(
          'absolute top-3 right-3 z-10 rounded-full bg-white/90 backdrop-blur-sm hover:bg-white/80 transition-all',
          isLiked ? 'text-red-500' : 'text-gray-400'
        )}
        onClick={handleLike}
      >
        <Heart className={cn('w-5 h-5', isLiked ? 'fill-current' : '')} />
      </Button>

      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden bg-gray-50">
        <Image
          src={item.images[currentImageIndex] || "/placeholder.svg"}
          alt={item.title}
          fill
          className={cn(
            'object-cover transition-transform duration-500',
            isHovered ? 'scale-105' : 'scale-100'
          )}
          sizes={isCompact ? '200px' : isFeatured ? '400px' : '300px'}
        />

        {/* Image Navigation */}
        {item.images.length > 1 && (
          <>
            <button 
              onClick={prevImage}
              className={cn(
                'absolute left-2 top-1/2 -translate-y-1/2 z-10 p-1.5 rounded-full bg-white/80 backdrop-blur-sm text-gray-700 opacity-0 group-hover:opacity-100 transition-opacity',
                'hover:bg-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2'
              )}
              aria-label="Previous image"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button 
              onClick={nextImage}
              className={cn(
                'absolute right-2 top-1/2 -translate-y-1/2 z-10 p-1.5 rounded-full bg-white/80 backdrop-blur-sm text-gray-700 opacity-0 group-hover:opacity-100 transition-opacity',
                'hover:bg-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2'
              )}
              aria-label="Next image"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        )}

        {/* Image Count */}
        {item.images.length > 1 && (
          <div className="absolute bottom-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded-full backdrop-blur-sm">
            {currentImageIndex + 1}/{item.images.length}
          </div>
        )}

        {/* Quick Actions Overlay */}
        <div className={cn(
          'absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-2',
          isCompact && 'opacity-0 group-hover:opacity-0' // Hide on compact view
        )}>
          <Button size="sm" className="bg-white/90 text-gray-900 hover:bg-white">
            <Eye className="w-4 h-4 mr-1" />
            Quick View
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="border-white text-white hover:bg-white/10 bg-transparent"
            onClick={handleLike}
          >
            <Heart className={cn('w-4 h-4', isLiked ? 'fill-current text-red-500' : '')} />
          </Button>
        </div>
      </div>

      {/* Card Content */}
      <CardContent className={cn(
        'p-4',
        isCompact ? 'p-2' : '',
        isFeatured ? 'p-6' : ''
      )}>
        {/* Title and Brand */}
        <div className="flex items-start justify-between mb-2">
          <div className="flex-1">
            <h4 className={cn(
              'font-semibold text-gray-900 group-hover:text-primary-600 transition-colors line-clamp-1',
              isCompact ? 'text-sm' : 'text-base',
              isFeatured && 'text-lg'
            )}>
              {item.title}
            </h4>
            <p className={cn(
              'text-gray-500',
              isCompact ? 'text-xs' : 'text-sm',
              isFeatured && 'text-base'
            )}>
              {item.brand}
            </p>
          </div>
          <Button variant="ghost" size="icon" className="h-8 w-8 p-0 text-gray-400 hover:text-primary-600">
            <Bookmark className="w-4 h-4" />
          </Button>
        </div>

        {/* Price */}
        <div className="flex items-center justify-between mb-3">
          <div>
            <span className={cn(
              'font-bold text-gray-900',
              isCompact ? 'text-sm' : 'text-lg',
              isFeatured && 'text-xl'
            )}>
              ${item.currentPrice.toFixed(2)}
            </span>
            {item.onSale && item.originalPrice > item.currentPrice && (
              <span className="ml-2 text-sm text-gray-500 line-through">
                ${item.originalPrice.toFixed(2)}
              </span>
            )}
          </div>
          <div className="flex items-center">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="ml-1 text-sm font-medium text-gray-700">
              {item.rating.toFixed(1)}
            </span>
            <span className="mx-1 text-gray-400">•</span>
            <span className="text-sm text-gray-500">
              {item.reviewCount} {item.reviewCount === 1 ? 'review' : 'reviews'}
            </span>
          </div>
        </div>

        {/* User Info - Only show in default and featured views */}
        {!isCompact && (
          <div className="flex items-center space-x-3 mb-3">
            <Avatar className={cn(
              'border-2 border-white shadow-sm',
              isFeatured ? 'w-10 h-10' : 'w-8 h-8'
            )}>
              <AvatarImage src={item.userAvatar} />
              <AvatarFallback className="bg-gradient-to-br from-primary-500 to-secondary-600 text-white">
                {item.user.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className={cn(
                'font-medium text-gray-900 truncate',
                isFeatured ? 'text-base' : 'text-sm'
              )}>
                {item.user}
              </p>
              <div className="flex items-center text-xs text-gray-500">
                <MapPin className="w-3 h-3 mr-1 flex-shrink-0" />
                <span className="truncate">{item.location}</span>
              </div>
            </div>
          </div>
        )}

        {/* Tags and Details - Only show in default and featured views */}
        {!isCompact && item.tags && item.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-3">
            {item.tags.slice(0, 3).map((tag, index) => (
              <Badge 
                key={index} 
                variant="secondary" 
                className={cn(
                  'text-xs font-normal',
                  isFeatured ? 'px-2 py-1' : 'px-1.5 py-0.5'
                )}
              >
                #{tag}
              </Badge>
            ))}
            {item.tags.length > 3 && (
              <span className="text-xs text-gray-500 self-center">+{item.tags.length - 3} more</span>
            )}
          </div>
        )}

        {/* Size and Condition - Only show in default and featured views */}
        {!isCompact && (
          <div className="flex items-center space-x-2 mb-3">
            <Badge variant="outline" className="text-xs bg-gray-50">
              Size {item.size}
            </Badge>
            <Badge className="bg-emerald-100 text-emerald-700 text-xs">
              {item.condition}
            </Badge>
            <span className="text-xs text-gray-500 ml-auto">
              <Clock className="w-3 h-3 inline mr-1" />
              {item.timeAgo}
            </span>
          </div>
        )}
      </CardContent>

      {/* Card Footer - Only show in default and featured views */}
      {!isCompact && (
        <CardFooter className={cn(
          'border-t border-gray-100 p-4 pt-3',
          isFeatured ? 'p-6 pt-3' : ''
        )}>
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center space-x-1 text-sm text-gray-500">
              <div className="flex items-center">
                <Heart className={cn(
                  'w-4 h-4 mr-1',
                  isLiked ? 'text-red-500 fill-current' : 'text-gray-400'
                )} />
                <span>{item.likes}</span>
              </div>
              <span className="mx-1">•</span>
              <div className="flex items-center">
                <Eye className="w-4 h-4 mr-1 text-gray-400" />
                <span>{item.views}</span>
              </div>
            </div>
            <div className="flex space-x-1">
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-gray-500 hover:text-primary-600">
                <MessageCircle className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-gray-500 hover:text-primary-600">
                <Share2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardFooter>
      )}
    </Card>
  )
}
