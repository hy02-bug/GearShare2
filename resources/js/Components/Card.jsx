import { MapPin, User } from 'lucide-react';

export default function Card() {
return (
    <div className="border rounded-xl shadow-sm w-64 p-4">
      {/* Image */}
    <img
        src=""
        alt="Lorem Ipsum"
        className="w-full h-48 object-cover rounded-md"
    />

      {/* Title */}
    <h2 className="mt-4 font-semibold text-lg">title</h2>

      {/* Price & Size */}
    <div className="text-sm text-gray-700">
        <span className="font-bold">RM 2323 price</span>
        <span className="ml-1 text-gray-600">/ day</span>
        <span className="ml-4">Size: size</span>
    </div>

      {/* Location */}
    <div className="flex items-center mt-2 text-sm text-gray-600">
        <MapPin className="w-4 h-4 mr-1" />
        location
    </div>

      {/* Owner */}
    <div className="flex items-center mt-2 text-sm text-gray-600">
        <User className="w-4 h-4 mr-1" />
        owner
    </div>
    </div>
);
}
