import { useState } from 'react';
import ReviewItem from './ReviewItem';
import ReviewForm from './ReviewForm';

export default function ReviewsSection() {
  const [reviews, setReviews] = useState([
    {
      id: 1,
      user: "Sarah M.",
      rating: 5,
      comment: "The camera was in perfect condition and worked flawlessly for my project.",
      date: "2023-10-15"
    },
    {
      id: 2,
      user: "Michael T.",
      rating: 4,
      comment: "Great equipment, would rent again. Owner was very responsive.",
      date: "2023-09-28"
    }
  ]);

  const handleAddReview = (newReview) => {
    setReviews([...reviews, {
      id: reviews.length + 1,
      user: "You",
      rating: newReview.rating,
      comment: newReview.comment,
      date: new Date().toLocaleDateString()
    }]);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Reviews</h2>
        <div className="flex items-center">
          <StarRating rating={5} />
          <span className="text-gray-600 ml-2">
            {reviews.length} review{reviews.length !== 1 ? 's' : ''}
          </span>
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-6 mb-8">
        {reviews.length > 0 ? (
          reviews.map(review => (
            <ReviewItem key={review.id} review={review} />
          ))
        ) : (
          <p className="text-gray-500 py-4">No reviews yet. Be the first to review!</p>
        )}
      </div>

      {/* Add Review Form */}
      <ReviewForm onSubmit={handleAddReview} />
    </div>
  );
}
