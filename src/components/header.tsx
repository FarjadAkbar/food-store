"use client";
import Link from "next/link"
import { ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import CartMenu from "./cart-menu"
import { useSelector } from "react-redux";
import { RootState } from "@/store"

export default function Header() {
   
    const cartItems = useSelector((state: RootState) => state.cart.items);

    
  return (
    <header className="border-b">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold text-primary">
              E-Shop
            </Link>
            {/* <nav className="ml-10 flex items-baseline space-x-4">
              <Link href="/products" className="text-sm font-medium text-muted-foreground hover:text-primary">
                Products
              </Link>
              <Link href="/categories" className="text-sm font-medium text-muted-foreground hover:text-primary">
                Categories
              </Link>
              <Link href="/deals" className="text-sm font-medium text-muted-foreground hover:text-primary">
                Deals
              </Link>
            </nav> */}
          </div>
          <div className="flex items-center">
            <CartMenu>
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                {
                    cartItems.length > 0 && (
                        <span className="absolute top-0 right-0 h-4 w-4 text-[10px] font-bold rounded-full bg-primary text-primary-foreground flex items-center justify-center">
                            {cartItems.length}
                        </span>
                    )
                }
              </Button>
            </CartMenu>
          </div>
        </div>
      </div>
    </header>
  )
}