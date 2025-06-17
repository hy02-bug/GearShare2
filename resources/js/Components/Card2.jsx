import PropTypes from 'prop-types';
import { MapPin, User } from 'lucide-react';
import { Link } from '@inertiajs/react';

export default function Card2({ item }) {
  return (
    <Link href={route('equipment.show', item.id)}>
      <div className="border rounded-xl shadow-sm w-64 p-4 hover:shadow-lg transition-shadow duration-300">
        {/* Image - now using image_url from media relationship */}
        <img
          src={item.image_url || '/placeholder-image.jpg'}
          alt={item.name}
          className="w-full h-48 object-cover rounded-md"
          onError={(e) => {
            e.target.src = '/placeholder-image.jpg'; // Fallback if image fails to load
          }}
        />

        {/* Title */}
        <h2 className="mt-4 font-semibold text-lg">{item.name}</h2>

        {/* Price & Size */}
        <div className="text-sm text-gray-700">
          <span className="font-bold">RM {item.rentalPrice}</span>
          <span className="ml-1 text-gray-600">/ day</span>
          <span className="ml-4">Size: {item.size}</span>
        </div>

        {/* Location */}
        <div className="flex items-center mt-2 text-sm text-gray-600">
          <MapPin className="w-4 h-4 mr-1" />
          {item.location}
        </div>

        {/* Owner */}
        <div className="flex items-center mt-2 text-sm text-gray-600">
          <User className="w-4 h-4 mr-1" />
          {item.owner?.name || 'Unknown'}
        </div>
      </div>
    </Link>
  );
}

Card2.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    rentalPrice: PropTypes.number.isRequired,
    size: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    image_url: PropTypes.string, // Added for the image URL
    owner: PropTypes.shape({
      name: PropTypes.string,
    }),
  }).isRequired,
};
