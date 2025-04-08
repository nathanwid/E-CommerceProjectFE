// components/products/ProductList.tsx
'use client';
import { Product } from '@/types'; // Adjust path
import ProductCard from './ProductCard'; // Adjust path

interface ProductListProps {
  products: Product[];
}

export default function ProductList({ products }: ProductListProps) {
  if (!products || products.length === 0) {
    return null; // Or a message, handled by the parent page for now
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product.productId} product={product} />
      ))}
    </div>
  );
}