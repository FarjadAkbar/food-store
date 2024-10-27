"use client";
import { useState } from 'react';
import Head from 'next/head';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { useProducts } from '@/hooks/useProducts';
import { addToCart } from '@/store/slices/cartSlice';
import { setPage } from '@/store/slices/paginationSlice';
import { Product } from '@/type/product';
import Loading from '@/components/loading';
import ApiError from '@/components/api-error';
import CustomPagination from '@/components/custom-pagination';
import ProductCard from '@/components/product-card';


const HomePage = () => {
  const dispatch = useDispatch();
  const page = useSelector((state: RootState) => state.pagination.currentPage);
  const productsPerPage = 12;
  const query = 'burger';
  const { data, error, isLoading } = useProducts(page, productsPerPage, query);

  if (isLoading) return <Loading />;
  if (error) {
    const apiError = error as { name: string; message: string };
    return <ApiError error={apiError} />;
  }

  const totalPages = Math.ceil(data.totalProducts / productsPerPage);


  return (
    <>
      <Head>
          <title>Products - Our Burger Store</title>
          <meta name="description" content="Explore our delicious burger selection! Freshly made and available for quick delivery." />
          <meta name="keywords" content="burgers, food, products, shopping" />
          <meta property="og:title" content="Burger Products" />
          <meta property="og:description" content="Find a variety of burgers at our store!" />
          <meta property="og:image" content="https://example.com/image.jpg" />
          <meta property="og:type" content="website" />
        </Head>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Products</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {data.products.map((product: Product) => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}
        </div>
        <CustomPagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={(page) => dispatch(setPage(page))}
      />
      </div>
    </>
  );
};

export default HomePage;
