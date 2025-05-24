

import { Head, Link } from '@inertiajs/react';

export default function ProductShow({ equipment }) {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <Head title={equipment.name} />

      <div className="grid md:grid-cols-2 gap-8">
        {/* Image Gallery */}
        <div>
          <img
            src={equipment.image_path}
            alt={equipment.name}
            className="w-full rounded-lg"
          />
        </div>

        {/* Product Info */}
        <div>
          <h1 className="text-2xl font-bold">{equipment.name}</h1>
          <p className="text-gray-600 mt-2">RM {equipment.rentalPrice}/day</p>

          <div className="mt-6 space-y-4">
            <div>
              <span className="font-semibold">Size:</span> {equipment.size}
            </div>
            <div>
              <span className="font-semibold">Condition:</span> {equipment.condition}
            </div>
            <div>
              <span className="font-semibold">Location:</span> {equipment.location}
            </div>
          </div>

          {/* Book Button */}
          <Link
            href={route('orders.summary', equipment.id)}
            as="button"
            className="mt-8 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
          >
            Book Now
          </Link>
        </div>
      </div>
    </div>
  );
}

// import React from 'react';

// export default function Equipmentdetails() {
//   // Sample data - replace with props or API data as needed
//   const equipment = {
//     name: 'Futsal Shin Pad - Brand Mizuno',
//     price: 10,
//     size: 'M',
//     color: 'Black',
//     brand: 'Mizuno',
//     condition: 'Well Used',
//     pickupLocations: ['Putrajaya', 'Kajang', 'Bangi'],
//     availableDates: [
//       // Example dates; replace with calendar data or component
//       '2025-03-15',
//       '2025-03-20',
//       '2025-04-05',
//     ],
//     owner: {
//       username: 'Amzy345',
//       rating: 4.5,
//       reviews: 31,
//     },
//     imageUrl: '/path-to-image/shinpad.jpg', // Replace with your image path
//   };

//   const renderStars = (rating) => {
//     const fullStars = Math.floor(rating);
//     const halfStar = rating % 1 >= 0.5;
//     const stars = [];

//     for (let i = 0; i < fullStars; i++) {
//       stars.push(<span key={i} className="text-yellow-400">★</span>);
//     }
//     if (halfStar) {
//       stars.push(<span key="half" className="text-yellow-400">☆</span>);
//     }
//     return stars;
//   };

//   return (
//     <div className="max-w-6xl mx-auto mt-10 p-6 bg-white rounded shadow-md grid grid-cols-12 gap-6">
//       {/* Image */}
//       <div className="col-span-3">
//         <img
//           src={equipment.imageUrl}
//           alt={equipment.name}
//           className="rounded border border-gray-300"
//         />
//       </div>

//       {/* Details */}
//       <div className="col-span-6 bg-blue-200 p-4 rounded">
//         <h2 className="font-bold text-lg mb-1">{equipment.name}</h2>
//         <p className="text-xl font-semibold mb-3">RM {equipment.price}/day</p>

//         <div>
//           <h3 className="font-semibold mb-1">Details</h3>
//           <ul className="text-sm leading-relaxed">
//             <li><strong>Size:</strong> {equipment.size}</li>
//             <li><strong>Color:</strong> {equipment.color}</li>
//             <li><strong>Brand:</strong> {equipment.brand}</li>
//             <li><strong>Condition:</strong> {equipment.condition}</li>
//           </ul>
//         </div>

//         <div className="grid grid-cols-2 gap-4 mt-6 bg-blue-100 p-3 rounded">
//           <div>
//             <h3 className="font-semibold mb-1">Pickup Location</h3>
//             <ul className="list-disc list-inside text-sm">
//               {equipment.pickupLocations.map((loc, idx) => (
//                 <li key={idx}>{loc}</li>
//               ))}
//             </ul>
//           </div>

//           <div>
//             <h3 className="font-semibold mb-1">Available Date</h3>
//             <div className="text-center bg-white p-2 rounded border border-gray-300">
//               {/* Replace with calendar component */}
//               <p className="text-xs text-gray-600 italic">Calendar Component Here</p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Owner details */}
//       <div className="col-span-3 bg-blue-400 p-4 rounded text-black flex flex-col justify-between">
//         <div>
//           <h3 className="font-semibold mb-4 text-white">Owner’s Details</h3>
//           <div className="flex items-center space-x-2 mb-2">
//             <svg
//               className="w-6 h-6 text-white"
//               fill="currentColor"
//               viewBox="0 0 24 24"
//             >
//               <path d="M12 12c2.7 0 5-2.3 5-5s-2.3-5-5-5-5 2.3-5 5 2.3 5 5 5zm0 2c-3.3 0-10 1.7-10 5v3h20v-3c0-3.3-6.7-5-10-5z" />
//             </svg>
//             <span className="font-semibold text-white">{equipment.owner.username}</span>
//           </div>
//           <div className="flex items-center space-x-1 mb-1">
//             <span className="text-yellow-400">{renderStars(equipment.owner.rating)}</span>
//             <span className="text-white ml-2">{equipment.owner.rating} ★</span>
//           </div>
//           <p className="text-white text-xs">{equipment.owner.reviews} Reviews</p>
//         </div>

//         <div className="flex flex-col space-y-3 mt-8">
//           <button className="bg-white text-black font-semibold py-2 rounded hover:bg-gray-200 transition">
//             Contact
//           </button>
//           <button className="bg-white text-black font-semibold py-2 rounded hover:bg-gray-200 transition">
//             Book item
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

