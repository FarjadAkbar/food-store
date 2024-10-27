// src/api/productApi.ts
import axios from 'axios';
import { BASE_URL, API_KEY, FIXED_PRICE } from '@/config';
import { ProductDetail } from '@/type/product';

export const fetchProducts = async (currentPage: number, productsPerPage: number, query: string) => {
  const offset = (currentPage - 1) * productsPerPage;
  const response = await axios.get(`${BASE_URL}/search`, {
    params: {
      apiKey: API_KEY,
      query,
      offset,
      number: productsPerPage,
    },
  });
  const productsWithFixedPrice = response.data.products.map((product: any) => ({
    ...product,
    price: Number(FIXED_PRICE), // Add fixed price to each product
  }));

  return {
    ...response.data,
    products: productsWithFixedPrice, // Return products with added price
  };
};



export const fetchProductDetail = async (id: number): Promise<ProductDetail> => {
  const response = await axios.get(`${BASE_URL}/${id}`, {
    params: {
      apiKey: API_KEY,
    },
  });
 
  return {
    ...response.data,
    price: FIXED_PRICE,
  };
};
