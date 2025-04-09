// components/products/ProductDetails.tsx
import React from 'react';
import { Product, Review } from '@/types/index';
import ReviewItem from '@/components/reviews/ReviewItem';
import Image from 'next/image';

interface ProductDetailsProps {
  product: Product & { productDescription?: string; reviews?: Review[] };
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ product }) => {
  const { productName, productImage, productDescription, productPrice, productStock, reviews } = product;

  return (
    <div className="card lg:card-side bg-base-100 shadow-xl">
      {productImage ? (
        <figure className="relative h-center w-128 bg-gray-200">
          <Image
          src={`data:image/jpeg;base64,${product.productImage}`}
          alt={product.productName}
          fill // Use fill to cover the container
          style={{ objectFit: "contain" }} // 'cover' or 'contain' based on preference
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw" // Optimize image loading
          className="bg-white" // Add bg color if images have transparency
        />
        </figure>
      ) : (
        <div className="lg:max-w-md aspect-w-4 aspect-h-3 bg-gray-200 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-24 h-24 text-gray-400">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 3.182L19.25 21m-6-6l1.5-1.5m-3.75 5.25l-2.25 2.25m-3-3l3.75 3.75m-6 6l6-6" />
          </svg>
        </div>
      )}
      <div className="card-body">
        <h2 className="card-title">{productName}</h2>
        <p className="text-lg font-semibold">Rp {productPrice?.toLocaleString('id-ID')}</p>
        <p>Stock: {productStock}</p>
        {productDescription && <p>{productDescription}</p>}
        <div className="card-actions">
          <button className="btn btn-primary">Add to Cart</button>
          {/* Add other actions as needed */}
        </div>
        {reviews && reviews.length > 0 && (
          <div className="mt-6">
            <h3 className="font-semibold text-xl mb-2">Customer Reviews</h3>
            <ul className="space-y-3">
              {reviews.map((review, index) => (
                <ReviewItem key={index} review={review} />
              ))}
            </ul>
          </div>
        )}
        {reviews && reviews.length === 0 && (
          <div className="mt-6">
            <p className="text-gray-500">No reviews yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;