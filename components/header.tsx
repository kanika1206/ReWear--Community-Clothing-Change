"use client"

import Link from "next/link"
import { useState } from "react"
import { Menu, Search, User, X, Heart, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { CartBadge } from "@/components/cart-badge"

export function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background">
      <div className="container flex h-16 items-center px-4">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[300px] sm:w-[400px]">
            <nav className="flex flex-col gap-4 mt-8">
              <Link href="/" className="text-lg font-medium">
                Home
              </Link>
              <Link href="/products" className="text-lg font-medium">
                All Products
              </Link>
              <Link href="/products/men" className="text-lg font-medium">
                Men
              </Link>
              <Link href="/products/women" className="text-lg font-medium">
                Women
              </Link>
              <Link href="/ai-recommendations" className="text-lg font-medium text-emerald-600 flex items-center gap-1 group-hover:text-emerald-700">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500/80"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                AI Recommendations
              </Link>
              <Link href="/charity-donations" className="text-lg font-medium text-emerald-600 hover:text-emerald-700 flex items-center gap-1">
                <Heart className="h-4 w-4 text-rose-500" />
                Donate
              </Link>
              <Link href="/about" className="text-lg font-medium hover:text-emerald-600">
                About
              </Link>
              <Link href="/contact" className="text-lg font-medium hover:text-emerald-600">
                Contact
              </Link>
            </nav>
          </SheetContent>
        </Sheet>

        <Link href="/" className="ml-4 md:ml-0 flex items-center gap-2 group">
          <div className="w-8 h-8 flex-shrink-0">
            <svg viewBox="0 0 64 64" fill="currentColor" className="w-full h-full text-emerald-600 group-hover:text-emerald-700 transition-colors">
              <path d="M32 6a2 2 0 0 0-2 2v3c0 1.2.6 2.2 1.6 2.8l2.4 1.3-4.2 4.2a2 2 0 1 0 2.8 2.8l5.2-5.2a2 2 0 0 0-.4-3.2l-3.4-1.9V8a2 2 0 0 0-2-2zm-2 22L4 44.5c-.8.5-1 1.5-.6 2.3a2 2 0 0 0 2.6.8L32 34l26 13.6a2 2 0 0 0 2.6-.8c.4-.8.2-1.8-.6-2.3L34 28a2 2 0 0 0-2 0z"/>
            </svg>
          </div>
          <span className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">ReWear</span>
        </Link>

        <nav className="mx-6 hidden md:flex items-center gap-6 text-sm">
          <Link href="/" className="font-medium transition-colors hover:text-primary">
            Home
          </Link>
          <Link href="/products" className="font-medium transition-colors hover:text-primary">
            All Products
          </Link>
          <Link href="/products/men" className="font-medium transition-colors hover:text-primary">
            Men
          </Link>
          <Link href="/products/women" className="font-medium transition-colors hover:text-primary">
            Women
          </Link>
          <Link 
            href="/ai-recommendations" 
            className="font-medium bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-3 py-1 rounded-full hover:opacity-90 transition-opacity flex items-center gap-1 text-sm"
          >
            <Zap className="h-3 w-3" />
            AI Recommendations
          </Link>
          <Link 
            href="/charity-donations" 
            className="font-medium text-emerald-600 hover:text-emerald-700 px-3 py-1 rounded-full flex items-center gap-1 text-sm"
          >
            <Heart className="h-3 w-3 text-rose-500" />
            Donate
          </Link>
        </nav>

        <div className="ml-auto flex items-center gap-4">
          <div className="hidden md:flex items-center gap-4">
            <Link 
              href="/auth/signin" 
              className="text-sm font-medium hover:text-emerald-600 transition-colors"
            >
              Sign In
            </Link>
            <Link 
              href="/auth/signup"
              className="text-sm font-medium bg-emerald-600 text-white px-4 py-2 rounded-md hover:bg-emerald-700 transition-colors"
            >
              Sign Up
            </Link>
          </div>
          {isSearchOpen ? (
            <div className="relative flex items-center">
              <Input type="search" placeholder="Search products..." className="w-[200px] md:w-[300px]" autoFocus />
              <Button variant="ghost" size="icon" className="absolute right-0" onClick={() => setIsSearchOpen(false)}>
                <X className="h-4 w-4" />
                <span className="sr-only">Close search</span>
              </Button>
            </div>
          ) : (
            <Button variant="ghost" size="icon" onClick={() => setIsSearchOpen(true)} className="md:ml-4">
              <Search className="h-5 w-5" />
              <span className="sr-only">Search</span>
            </Button>
          )}
          <Link href="/cart">
            <CartBadge />
          </Link>
          <Button variant="ghost" size="icon">
            <User className="h-5 w-5" />
            <span className="sr-only">Account</span>
          </Button>
        </div>
      </div>
    </header>
  )
}
