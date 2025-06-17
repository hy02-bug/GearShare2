import PropTypes from 'prop-types';
import StarRating from '@/Components/review/StarRating';

export default function SellerInfo({ seller }) {
  return (
    <div className="flex items-center mb-4">
      <span className="text-gray-600 mr-2">Sold by:</span>
      <a
        href={seller.profileLink || "#"}
        className="text-blue-600 hover:text-blue-800 font-medium"
      >
        {seller.name}
      </a>
      <div className="flex items-center ml-4">
        <StarRating rating={Math.round(seller.rating)} />
        <span className="text-gray-600 ml-1">
          {seller.rating} ({seller.reviewsCount})
        </span>
      </div>
    </div>
  );
}

SellerInfo.propTypes = {
  seller: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string,
    profileLink: PropTypes.string,
    rating: PropTypes.number.isRequired,
    reviewsCount: PropTypes.number.isRequired, // corrected from ratingCount to match usage
    joinDate: PropTypes.string,
    profileImage: PropTypes.string,
    verified: PropTypes.bool
  }).isRequired
};

