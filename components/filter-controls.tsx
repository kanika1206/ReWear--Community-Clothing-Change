"use client"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Filter, Grid, List, X } from "lucide-react"
import { useState } from "react"

interface FilterControlsProps {
  viewMode: "grid" | "list"
  onViewModeChange: (mode: "grid" | "list") => void
  filters: {
    category: string
    size: string
    condition: string
    priceRange: [number, number]
    sortBy: string
  }
  onFiltersChange: (filters: any) => void
}

export function FilterControls({ 
  viewMode, 
  onViewModeChange, 
  filters, 
  onFiltersChange 
}: FilterControlsProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [localFilters, setLocalFilters] = useState(filters)

  const handleApplyFilters = () => {
    onFiltersChange(localFilters)
    setIsOpen(false)
  }

  const handleResetFilters = () => {
    const resetFilters = {
      category: "all",
      size: "all",
      condition: "all",
      priceRange: [0, 500] as [number, number],
      sortBy: "featured"
    }
    setLocalFilters(resetFilters)
    onFiltersChange(resetFilters)
  }

  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
      <div className="flex items-center space-x-2">
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button 
              variant="outline" 
              className="flex items-center space-x-2 bg-white border-gray-200 hover:bg-gray-50"
            >
              <Filter className="w-4 h-4 text-primary-600" />
              <span>Filters</span>
              {(filters.category !== 'all' || filters.size !== 'all' || filters.condition !== 'all' || filters.priceRange[0] > 0 || filters.priceRange[1] < 500) && (
                <span className="w-2 h-2 rounded-full bg-primary-500"></span>
              )}
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Filters</h3>
                <button 
                  onClick={handleResetFilters}
                  className="text-sm text-primary-600 hover:underline"
                >
                  Reset all
                </button>
              </div>
              
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">Category</label>
                <Select
                  value={localFilters.category}
                  onValueChange={(value) => setLocalFilters({...localFilters, category: value})}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="clothing">Clothing</SelectItem>
                    <SelectItem value="accessories">Accessories</SelectItem>
                    <SelectItem value="footwear">Footwear</SelectItem>
                    <SelectItem value="jewelry">Jewelry</SelectItem>
                    <SelectItem value="bags">Bags</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">Size</label>
                <Select
                  value={localFilters.size}
                  onValueChange={(value) => setLocalFilters({...localFilters, size: value})}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select size" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Sizes</SelectItem>
                    <SelectItem value="xs">XS</SelectItem>
                    <SelectItem value="s">S</SelectItem>
                    <SelectItem value="m">M</SelectItem>
                    <SelectItem value="l">L</SelectItem>
                    <SelectItem value="xl">XL</SelectItem>
                    <SelectItem value="xxl">XXL</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">Condition</label>
                <Select
                  value={localFilters.condition}
                  onValueChange={(value) => setLocalFilters({...localFilters, condition: value})}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select condition" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Conditions</SelectItem>
                    <SelectItem value="new">New with tags</SelectItem>
                    <SelectItem value="like-new">Like New</SelectItem>
                    <SelectItem value="excellent">Excellent</SelectItem>
                    <SelectItem value="good">Good</SelectItem>
                    <SelectItem value="fair">Fair</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <label className="text-sm font-medium text-gray-700">
                  Price Range: ${localFilters.priceRange[0]} - ${localFilters.priceRange[1]}
                </label>
                <Slider
                  value={localFilters.priceRange}
                  onValueChange={(value) => setLocalFilters({...localFilters, priceRange: value as [number, number]})}
                  max={1000}
                  step={10}
                  minStepsBetweenThumbs={10}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>$0</span>
                  <span>$1000+</span>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">Sort By</label>
                <Select
                  value={localFilters.sortBy}
                  onValueChange={(value) => setLocalFilters({...localFilters, sortBy: value})}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="featured">Featured</SelectItem>
                    <SelectItem value="newest">Newest</SelectItem>
                    <SelectItem value="price-low-high">Price: Low to High</SelectItem>
                    <SelectItem value="price-high-low">Price: High to Low</SelectItem>
                    <SelectItem value="popular">Most Popular</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <Button 
                  variant="outline" 
                  onClick={() => setIsOpen(false)}
                  className="border-gray-300 text-gray-700"
                >
                  Cancel
                </Button>
                <Button 
                  onClick={handleApplyFilters}
                  className="bg-primary-600 hover:bg-primary-700 text-white"
                >
                  Apply Filters
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Active Filters */}
        <div className="flex flex-wrap gap-2">
          {filters.category !== 'all' && (
            <Badge className="bg-primary-50 text-primary-700 border border-primary-100 px-3 py-1 text-sm font-medium">
              {filters.category}
              <button 
                onClick={() => onFiltersChange({...filters, category: 'all'})}
                className="ml-2 text-primary-500 hover:text-primary-700"
              >
                <X className="w-3 h-3" />
              </button>
            </Badge>
          )}
          {filters.size !== 'all' && (
            <Badge className="bg-primary-50 text-primary-700 border border-primary-100 px-3 py-1 text-sm font-medium">
              Size: {filters.size.toUpperCase()}
              <button 
                onClick={() => onFiltersChange({...filters, size: 'all'})}
                className="ml-2 text-primary-500 hover:text-primary-700"
              >
                <X className="w-3 h-3" />
              </button>
            </Badge>
          )}
          {filters.condition !== 'all' && (
            <Badge className="bg-primary-50 text-primary-700 border border-primary-100 px-3 py-1 text-sm font-medium">
              {filters.condition}
              <button 
                onClick={() => onFiltersChange({...filters, condition: 'all'})}
                className="ml-2 text-primary-500 hover:text-primary-700"
              >
                <X className="w-3 h-3" />
              </button>
            </Badge>
          )}
          {(filters.priceRange[0] > 0 || filters.priceRange[1] < 1000) && (
            <Badge className="bg-primary-50 text-primary-700 border border-primary-100 px-3 py-1 text-sm font-medium">
              ${filters.priceRange[0]} - ${filters.priceRange[1]}
              <button 
                onClick={() => onFiltersChange({...filters, priceRange: [0, 1000]})}
                className="ml-2 text-primary-500 hover:text-primary-700"
              >
                <X className="w-3 h-3" />
              </button>
            </Badge>
          )}
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <span className="hidden sm:inline text-sm text-gray-500">View:</span>
        <Button 
          variant={viewMode === 'grid' ? 'default' : 'ghost'} 
          size="sm" 
          onClick={() => onViewModeChange('grid')}
          className={`h-9 w-9 p-0 ${viewMode === 'grid' ? 'bg-primary-600 hover:bg-primary-700' : 'text-gray-500 hover:bg-gray-100'}`}
        >
          <Grid className="w-4 h-4" />
        </Button>
        <Button 
          variant={viewMode === 'list' ? 'default' : 'ghost'} 
          size="sm" 
          onClick={() => onViewModeChange('list')}
          className={`h-9 w-9 p-0 ${viewMode === 'list' ? 'bg-primary-600 hover:bg-primary-700' : 'text-gray-500 hover:bg-gray-100'}`}
        >
          <List className="w-4 h-4" />
        </Button>
      </div>
    </div>
  )
}
