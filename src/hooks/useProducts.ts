import { useQuery } from 'react-query';
import { fetchProductDetail, fetchProducts } from '@/service/productApi';

export const useProducts = (page: number, productsPerPage: number, query: string) => {
  return useQuery(
    ['products', page, query], // Unique query key
    () => fetchProducts(page, productsPerPage, query), // Fetch function
    {
      keepPreviousData: true, // Keep old data while loading new data
      staleTime: 1000 * 60 * 5, // 5 minutes
    }
  );
};


export const useProductDetail = (id: number) => {
    return useQuery(
      ['product-detail', id], // Unique query key
      () => fetchProductDetail(id), // Fetch function
      {
        keepPreviousData: true, // Keep old data while loading new data
        staleTime: 1000 * 60 * 5, // 5 minutes
      }
    );
  };
  