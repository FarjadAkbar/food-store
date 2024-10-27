"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { RootState } from "@/store";
import { clearCart } from "@/store/slices/cartSlice";
import { clearCheckoutDetails } from "@/store/slices/checkoutSlice";
import { OrderDetails, OrderItem } from "@/type/order";
import { CheckCircle, Mail, MapPin, Phone, ShoppingBag } from "lucide-react";

const ThankYouPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const checkoutDetails = useSelector((state: RootState) => state.checkout.details);
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const totalAmount = useSelector((state: RootState) => state.cart.totalAmount);

  const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null);
  const [orderedItems, setOrderedItems] = useState<OrderItem[]>([]);
  const [finalAmount, setFinalAmount] = useState<number>(0);

  useEffect(() => {
     // Store current details in component state
     if (checkoutDetails) {
      setOrderDetails(checkoutDetails);
      setOrderedItems(cartItems);
      setFinalAmount(totalAmount);

      // Clear cart and checkout details in Redux store
      dispatch(clearCart());
      dispatch(clearCheckoutDetails());
    } else {
      // Redirect to homepage if no order found
      router.push('/');
    }
  }, []);

  if (!orderDetails) return null;

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-2xl mx-auto">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
            <CheckCircle className="h-6 w-6 text-green-600" />
          </div>
          <CardTitle className="text-2xl font-bold">Thank You for Your Order!</CardTitle>
          <CardDescription>Your order has been successfully placed.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-2">Order Details</h3>
            <div className="space-y-2">
              <div className="flex items-center">
                <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                <span>{orderDetails.email}</span>
              </div>
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                <span>{orderDetails.address}</span>
              </div>
              <div className="flex items-center">
                <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                <span>{orderDetails.phone}</span>
              </div>
            </div>
          </div>
          <Separator />
          <div>
            <h3 className="text-lg font-semibold mb-2">Ordered Items</h3>
            <div className="space-y-4">
              {orderedItems.map(item => (
                <div key={item.id} className="flex justify-between items-center">
                  <div className="flex items-center">
                    <ShoppingBag className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>{item.title} x {item.quantity}</span>
                  </div>
                  <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
          </div>
          <Separator />
          <div className="flex justify-between items-center">
            <span className="text-lg font-semibold">Total Amount:</span>
            <span className="text-lg font-bold">${finalAmount.toFixed(2)}</span>
          </div>
        </CardContent>
        <CardFooter>
          <Button asChild className="w-full">
            <Link href="/">Continue Shopping</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
  };
  
  export default ThankYouPage;
  