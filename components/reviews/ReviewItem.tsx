// components/reviews/ReviewItem.tsx
import React from 'react';
import { Review } from '@/types/index';

interface ReviewItemProps {
  review: Review;
}

const ReviewItem: React.FC<ReviewItemProps> = ({ review }) => {
  return (
    <li className="border rounded-md p-4 bg-base-200">
      <div className="rating mb-1">
        {Array.from({ length: review.rating }).map((_, index) => (
          <input key={index} type="radio" name={`review-rating-${index}`} className="mask mask-star-2 bg-yellow-500" checked readOnly />
        ))}
        {Array.from({ length: 5 - review.rating }).map((_, index) => (
          <input key={index} type="radio" name={`review-rating-${index}`} className="mask mask-star-2 bg-gray-300" readOnly />
        ))}
      </div>
      <p className="text-sm italic text-gray-600">{review.comment}</p>
      <p className="text-xs text-gray-500 mt-1">
        {(new Date(review.createdAt), 'MMM dd, yyyy HH:mm')}
      </p>
    </li>
  );
};

export default ReviewItem;