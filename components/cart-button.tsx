"use client"

import { Button } from "./ui/button"
import { ShoppingCart } from "lucide-react"
import { useCart } from "./cart-provider"
import { Product } from "@/types"

export function CartButton({ product }: { product: Product }) {
  const { addToCart } = useCart()

  return (
    <Button 
      size="sm" 
      className="w-full"
      onClick={() => addToCart(product)}
    >
      <ShoppingCart className="mr-2 h-4 w-4" />
      Add to Cart
    </Button>
  )
}
