import { useState, useEffect } from 'react';
import { getProducts } from '../services/product.service';

export const useProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts((data) => {
      setProducts(data);
    });
  }, []);

  return products;
};
