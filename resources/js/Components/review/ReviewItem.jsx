import StarRating from './StarRating';

export default function ReviewItem({ review }) {
  return (
    <div className="border-b border-gray-200 pb-6 last:border-b-0 last:pb-0">
      <div className="flex justify-between mb-2">
        <h3 className="font-medium">{review.user}</h3>
        <StarRating rating={review.rating} />
      </div>
      <p className="text-gray-600 mb-1">{review.comment}</p>
      <p className="text-sm text-gray-400">{review.date}</p>
    </div>
  );
}
