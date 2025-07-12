"use client"

import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CartButton } from "@/components/cart-button"

type Product = {
  id: number
  name: string
  price: number
  image: string
  category: string
  isNew: boolean
}

export function ProductGrid({ products }: { products: Product[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}

function ProductCard({ product }: { product: Product }) {
  return (
    <Card className="overflow-hidden">
      <Link href={`/products/${product.id}`}>
        <div className="aspect-square overflow-hidden">
          <Image
            src={product.image}
            alt={product.name}
            width={300}
            height={300}
            className="h-full w-full object-cover transition-all hover:scale-105"
          />
        </div>
      </Link>
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <h3 className="font-medium">{product.name}</h3>
          <span className="font-bold">${product.price}</span>
        </div>
        <div className="mt-2 flex items-center justify-between">
          <Badge variant="outline">{product.category}</Badge>
          {product.isNew && <Badge variant="secondary">New</Badge>}
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <CartButton product={product} />
      </CardFooter>
    </Card>
  )
}
