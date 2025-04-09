// components/reviews/PostReview.tsx
'use client';

import React, { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation'; // Import useRouter
import { refreshProductDetailsAction } from '@/app/(main)/products/[productId]/actions'; // Import the Server Action

interface PostReviewProps {
  productId: string;
}

const PostReview: React.FC<PostReviewProps> = ({ productId }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [rating, setRating] = useState<number | null>(null);
  const [comment, setComment] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const { data: session } = useSession();
  const router = useRouter(); // Get the router instance

  const token = session?.user?.token;
  const userId = session?.user?.id;

  const openModal = () => setIsOpen(true);
  const closeModal = () => {
    setIsOpen(false);
    setRating(null);
    setComment('');
    setError(null);
  };

  const handleRatingChange = (newRating: number) => {
    setRating(newRating);
  };

  const handleCommentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(event.target.value);
  };

  const handleSubmit = async () => {
    if (!rating) {
      setError('Please select a rating.');
      return;
    }

    if (!token || !userId) {
      setError('You must be logged in to post a review.');
      return;
    }

    setError(null);

    try {
      const response = await fetch(`/api/ControllerReview/product/post/${productId}/review`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          userId: userId,
          productId: productId,
          comment: comment,
          rating: rating,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData?.message || 'Failed to post review.');
        return;
      }

      closeModal();
      // Instead of calling a prop, call the Server Action
      await refreshProductDetailsAction(productId);
      router.refresh(); // Alternatively, use router.refresh() to re-fetch server components
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred.');
    }
  };
  const safeRating = rating ?? 0; // Use 0 as a default value
  return (
    <div>
      <button className="btn btn-sm btn-outline" onClick={openModal}>
        Post a Review
      </button>

      {isOpen && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Write a Review</h3>

            {error && <div className="alert alert-error mt-4">{error}</div>}

            <div className="form-control mt-4">
              <label className="label">
                <span className="label-text">Rating (1-5 stars)</span>
              </label>
              <div className="rating">
                {[1, 2, 3, 4, 5].map((value) => (
                  <input
                    key={value}
                    type="radio"
                    name="rating"
                    className={`mask mask-star-2 ${safeRating >= value ? 'bg-yellow-500' : 'bg-gray-300'}`}
                    value={value}
                    checked={rating === value}
                    onChange={() => handleRatingChange(value)}
                  />
                ))}
              </div>
            </div>

            <div className="form-control mt-4">
              <label className="label">
                <span className="label-text">Comment (optional)</span>
              </label>
              <textarea
                className="textarea textarea-bordered"
                placeholder="Your feedback..."
                value={comment}
                onChange={handleCommentChange}
              ></textarea>
            </div>

            <div className="modal-action mt-6">
              <button className="btn" onClick={closeModal}>
                Cancel
              </button>
              <button className="btn btn-primary" onClick={handleSubmit}>
                Submit Review
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostReview;