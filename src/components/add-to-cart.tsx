"use client";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "@/store/slices/cartSlice";
import { Button } from "./ui/button";
import { Product } from "@/type/product";
import { ShoppingCart } from "lucide-react";

export default function AddToCart({ product }: { product: Product }) {
  const dispatch = useDispatch();
  const [loadingProductId, setLoadingProductId] = useState<number | null>(null);

  const handleAddToCart = async (product: Product) => {
    setLoadingProductId(product.id);
    await dispatch(addToCart(product));
    setLoadingProductId(null);
  };
  return (
    <Button
      size="sm"
      onClick={() => handleAddToCart(product)}
      disabled={loadingProductId === product.id}
    >
      <ShoppingCart className="w-4 h-4 mr-2" />
      Add to Cart
    </Button>
  );
}
