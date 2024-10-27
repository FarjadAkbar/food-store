import { useQuery, UseQueryResult } from 'react-query';
import { fetchProductDetail, fetchProducts } from '@/service/productApi';
import { ProductDetail } from '@/type/product';

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


export const useProductDetail = (id: number): UseQueryResult<ProductDetail, Error> => {
  return useQuery<ProductDetail, Error>(
    ['product-detail', id],
    () => fetchProductDetail(id),
    {
      keepPreviousData: true,
      staleTime: 1000 * 60 * 5, // 5 minutes
    }
  );
};
  