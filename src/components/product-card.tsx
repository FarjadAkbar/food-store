import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Product } from "@/type/product";
import ImageFallback from "./image-fallback";
import { Button } from "./ui/button";
import Link from "next/link";
import AddToCart from "./add-to-cart";

const ProductCard = ({ product }: { product: Product }) => {
  return (
    <>
      <Card key={product.id} className="flex flex-col">
        <CardHeader className="p-0">
          <div className="aspect-square relative overflow-hidden rounded-t-lg">
            <ImageFallback
              src={product.image}
              alt={product.title}
              layout="fill"
              objectFit="cover"
              className="transition-transform hover:scale-105"
            />
          </div>
        </CardHeader>
        <CardContent className="flex-grow p-4">
          <CardTitle className="text-lg mb-2 line-clamp-2">
            {product.title}
          </CardTitle>
          <p className="text-xl font-bold text-primary">${product.price}</p>
        </CardContent>
        <CardFooter className="p-4 pt-0 flex justify-between items-center">
          <Button asChild variant="outline" size="sm">
            <Link href={`/product/${product.id}`}>View Product</Link>
          </Button>
          <AddToCart product={product} />
        </CardFooter>
      </Card>
    </>
  );
};

export default ProductCard;
