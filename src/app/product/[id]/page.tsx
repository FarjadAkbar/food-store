"use client";
import React from 'react';
import { useParams } from 'next/navigation'
import { useProductDetail } from '@/hooks/useProducts';
import ApiError from '@/components/api-error';
import Loading from '@/components/loading';
import Image from 'next/image';
import { Heart, ShoppingCart, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import AddToCart from '@/components/add-to-cart';

const ProductDetail = () => {
    const { id } = useParams();
    const { data, error, isLoading } = useProductDetail(+id);

    if (isLoading) return <Loading />;
    if (error) {
      const apiError = error as { name: string; message: string };
      return <ApiError error={apiError} />;
    }
    
    return (
        <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <div className="aspect-square relative overflow-hidden rounded-lg mb-4">
              <Image
                src={data.image}
                alt={data.title}
                layout="fill"
                objectFit="cover"
                className="transition-transform hover:scale-105"
              />
            </div>
            <div className="grid grid-cols-4 gap-4">
              {data.images.map((img, index) => (
                <div key={index} className="aspect-square relative overflow-hidden rounded-lg">
                  <Image
                    src={img}
                    alt={`Product image ${index + 1}`}
                    layout="fill"
                    objectFit="cover"
                    className="transition-transform hover:scale-105"
                  />
                </div>
              ))}
            </div>
          </div>
          <div>
            <h1 className="text-3xl font-bold mb-2">{data.title}</h1>
            <p className="text-lg text-muted-foreground mb-4">{data.category}</p>
            <div className="flex items-center gap-4 mb-4">
              <p className="text-2xl font-bold">${data.price}</p>
              <div className="flex items-center">
                <Heart className="w-5 h-5 text-red-500 mr-1" />
                <span>{data.likes} likes</span>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 mb-4">
              {data.badges.map((badge) => (
                <Badge key={badge} variant="secondary">
                  {badge.replace(/_/g, ' ')}
                </Badge>
              ))}
            </div>
            <p className="mb-4">{data.description || 'No description available.'}</p>
            <p className="text-sm text-muted-foreground mb-4">UPC: {data.upc}</p>
            <div className="flex gap-4">
                <AddToCart product={data} />
              {/* <Button variant="outline" className="flex-1">
                <Heart className="w-4 h-4 mr-2" />
                Add to Wishlist
              </Button> */}
            </div>
          </div>
        </div>
        <Separator className="my-8" />
        <Tabs defaultValue="nutrition" className="w-full">
          <TabsList>
            <TabsTrigger value="nutrition">Nutrition Information</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>
          <TabsContent value="nutrition">
            <Card>
              <CardHeader>
                <CardTitle>Nutrition Information</CardTitle>
                <CardDescription>Per serving size</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {data.nutrition.nutrients.map((nutrient) => (
                    <div key={nutrient.name} className="flex justify-between items-center">
                      <span className="font-medium">{nutrient.name}</span>
                      <span>
                        {nutrient.amount} {nutrient.unit} ({nutrient.percentOfDailyNeeds}% daily value)
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="reviews">
            <Card>
              <CardHeader>
                <CardTitle>Customer Reviews</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center mb-4">
                  <Star className="w-5 h-5 text-yellow-400 mr-1" />
                  <Star className="w-5 h-5 text-yellow-400 mr-1" />
                  <Star className="w-5 h-5 text-yellow-400 mr-1" />
                  <Star className="w-5 h-5 text-yellow-400 mr-1" />
                  <Star className="w-5 h-5 text-muted mr-2" />
                  <span className="text-sm text-muted-foreground">4.0 out of 5</span>
                </div>
                <p className="text-sm text-muted-foreground">No reviews yet. Be the first to review this product!</p>
              </CardContent>
              <CardFooter>
                <Button variant="outline">Write a Review</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    );
};

export default ProductDetail;
