"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Recycle, Search, Camera, Sparkles, Plus, Bell, Globe, Leaf, ChevronRight, Menu, X } from "lucide-react"

interface AdvancedHeaderProps {
  onMenuToggle?: (isOpen: boolean) => void
}

export function AdvancedHeader({ onMenuToggle }: AdvancedHeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleMenuToggle = () => {
    const newState = !isMenuOpen
    setIsMenuOpen(newState)
    onMenuToggle?.(newState)
  }

  return (
    <header className="border-b bg-white/95 backdrop-blur-xl sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4">
        {/* Top Bar */}
        <div className="flex items-center justify-between py-2 text-sm border-b border-gray-100">
          <div className="flex items-center space-x-4 text-gray-600">
            <span className="flex items-center">
              <Globe className="w-4 h-4 mr-1 text-primary-600" />
              Global Community
            </span>
            <span className="flex items-center">
              <Leaf className="w-4 h-4 mr-1 text-emerald-500" />
              Carbon Neutral Shipping
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" className="text-gray-600 hover:bg-gray-100">
              <Bell className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm" className="text-gray-600 hover:bg-gray-100">
              Help
            </Button>
            <Select defaultValue="en">
              <SelectTrigger className="w-16 border-0 shadow-none">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">EN</SelectItem>
                <SelectItem value="fr">FR</SelectItem>
                <SelectItem value="es">ES</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Main Header */}
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-secondary-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <Recycle className="w-7 h-7 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-400 rounded-full border-2 border-white"></div>
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                  ReWear
                </h1>
                <p className="text-xs text-gray-500 font-medium">Circular Fashion Hub</p>
              </div>
            </div>

            <nav className="hidden lg:flex items-center space-x-8">
              <div className="relative group">
                <Button variant="ghost" className="font-medium text-gray-700 hover:text-primary-600 group-hover:bg-primary-50 rounded-lg px-3 py-2">
                  Discover
                  <ChevronRight className="w-4 h-4 ml-1 group-hover:rotate-90 transition-transform" />
                </Button>
              </div>
              <div className="relative group">
                <Button variant="ghost" className="font-medium text-gray-700 hover:text-primary-600 group-hover:bg-primary-50 rounded-lg px-3 py-2">
                  Categories
                  <ChevronRight className="w-4 h-4 ml-1 group-hover:rotate-90 transition-transform" />
                </Button>
              </div>
              <Button variant="ghost" className="font-medium text-gray-700 hover:text-primary-600 hover:bg-primary-50 rounded-lg px-3 py-2">
                Community
              </Button>
              <Button variant="ghost" className="font-medium text-gray-700 hover:text-primary-600 hover:bg-primary-50 rounded-lg px-3 py-2">
                Events
              </Button>
              <div className="flex items-center space-x-1">
                <Button variant="ghost" className="font-medium text-gray-700 hover:text-primary-600 hover:bg-primary-50 rounded-lg px-3 py-2">
                  Sustainability
                </Button>
                <Badge className="bg-emerald-100 text-emerald-700 text-xs">New</Badge>
              </div>
            </nav>
          </div>

          {/* Advanced Search */}
          <div className="hidden md:flex items-center flex-1 max-w-2xl mx-8">
            <div className="relative w-full">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Search brands, styles, or users..."
                className="pl-12 pr-20 py-3 border-gray-200 focus:border-primary-300 rounded-2xl bg-gray-50/50 focus:bg-white transition-all focus:ring-2 focus:ring-primary-100"
              />
              <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center space-x-1">
                <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-gray-500 hover:text-primary-600">
                  <Camera className="w-4 h-4" />
                </Button>
                <Button
                  size="sm"
                  className="h-8 bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 text-white"
                >
                  <Sparkles className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <Button variant="ghost" size="sm" className="hidden md:flex text-gray-700 hover:bg-primary-50 hover:text-primary-600">
              <Plus className="w-4 h-4 mr-2" />
              Share Item
            </Button>
            <Button variant="outline" size="sm" className="border-gray-300 text-gray-700 hover:border-primary-400 hover:text-primary-600">
              Sign In
            </Button>
            <Button className="bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 text-white">
              Join Now
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className="lg:hidden text-gray-700 hover:bg-primary-50" 
              onClick={handleMenuToggle}
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
