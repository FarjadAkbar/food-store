"use client"
import { useState } from "react"
import Image from "next/image"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { Minus, Plus, Trash2 } from "lucide-react"
import { RootState } from "@/store"
import { useDispatch, useSelector } from "react-redux"
import { decreaseQuantity, increaseQuantity, removeFromCart } from "@/store/slices/cartSlice"
import Link from "next/link"


export default function CartMenu({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
 
  const dispatch = useDispatch();
   
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const totalAmount = useSelector((state: RootState) => state.cart.totalAmount);

  const handleRemove = (id: number) => dispatch(removeFromCart(id));
  const handleIncrease = (id: number) => dispatch(increaseQuantity(id));
  const handleDecrease = (id: number) => dispatch(decreaseQuantity(id));

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <div onMouseEnter={() => setIsOpen(true)} onMouseLeave={() => setIsOpen(false)}>
          {children}
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-80" onMouseEnter={() => setIsOpen(true)} onMouseLeave={() => setIsOpen(false)}>
        {
          cartItems.length > 0 ? (
            <div className="grid gap-4">
              <h3 className="font-medium leading-none">Your Cart</h3>
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-center gap-4">
                  <Image src={item.image} alt={item.title} width={50} height={50} className="rounded-md" />
                  <div className="flex-1">
                    <h4 className="text-sm font-medium">{item.title}</h4>
                    <p className="text-sm text-muted-foreground">${item.price}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Button variant="outline" size="icon" onClick={() => handleDecrease(item.id)}>
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="text-sm">{item.quantity}</span>
                      <Button variant="outline" size="icon" onClick={() => handleIncrease(item.id)}>
                        <Plus className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="icon" onClick={() => handleRemove(item.id)} className="ml-auto">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
              <div className="flex items-center justify-between pt-4 border-t">
                <span className="text-sm font-medium">Total:</span>
                <span className="text-sm font-medium">${totalAmount}</span>
              </div>
              <Button asChild variant="outline" size="sm">
                <Link href={`/checkout`}>Checkout</Link>
              </Button>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-4">
              <p className="text-sm text-muted-foreground">Your cart is empty.</p>
            </div>
          )
        }
      </PopoverContent>
    </Popover>
  )
}