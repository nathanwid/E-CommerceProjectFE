// components/products/ProductCard.tsx
'use client';

import { Product } from '@/types'; // Adjust path
import Image from 'next/image';
import Link from 'next/link'; // Import Link for navigation

// Helper function to format currency (example for IDR)
function formatPrice(price: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0, // Optional: remove decimals for IDR
  }).format(price);
}

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const placeholderImage = '/placeholder-image.png'; // Add a placeholder image to your /public folder

  // Check if the product image is base64 encoded
  const productImageSrc = product.productImage?.startsWith('data:image/')
    ? product.productImage
    : placeholderImage;
  
  return (
    <div className="card card-compact bg-base-100 shadow-xl transition-shadow hover:shadow-lg">
      <figure className="relative h-48 w-full bg-gray-200"> {/* Fixed height container */}
        <Image
          src={productImageSrc}
          alt={product.productName}
          fill // Use fill to cover the container
          style={{ objectFit: 'contain' }} // 'cover' or 'contain' based on preference
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw" // Optimize image loading
          className="bg-white" // Add bg color if images have transparency
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title text-base line-clamp-2" title={product.productName}> {/* Limit lines */}
          {/* Link the title to the product detail page (adjust href later) */}
          <Link href={`/products/${product.productId}`} className="hover:text-primary">
             {product.productName}
          </Link>
        </h2>
        <p className="text-lg font-semibold text-primary">
          {formatPrice(product.productPrice)}
        </p>
        <div className="text-sm text-gray-500">
          <p>Stock: {product.productStock > 0 ? product.productStock : 'Out of Stock'}</p>
          {/* Display review score if available */}
          {product.averageReviewScore !== null && (
            <p>Rating: {product.averageReviewScore.toFixed(1)} / 5</p> // Example formatting
          )}
           {product.averageReviewScore === null && (
             <p className="italic text-xs">No reviews yet</p>
          )}
        </div>
        <div className="card-actions justify-end mt-2">
           {/* Add to Cart button or View Details if title isn't linked */}
           <Link href={`/products/${product.productId}`} className="btn btn-sm btn-outline btn-primary">
             View Details
           </Link>
           {/* <button className="btn btn-sm btn-primary">Add to Cart</button> */}
        </div>
      </div>
    </div>
  );
}