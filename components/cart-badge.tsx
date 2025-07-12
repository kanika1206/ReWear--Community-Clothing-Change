"use client"

import { ShoppingCart } from "lucide-react"
import { Button } from "./ui/button"
import { useCart } from "./cart-provider"

export function CartBadge() {
  const { cartItems } = useCart()
  const itemCount = cartItems.length

  return (
    <Button variant="ghost" size="icon" className="relative">
      <ShoppingCart className="h-5 w-5" />
      {itemCount > 0 && (
        <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-medium text-primary-foreground">
          {itemCount}
        </span>
      )}
    </Button>
  )
}
