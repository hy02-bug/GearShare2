// import React from 'react';
// import { Head, Link, useForm } from '@inertiajs/react';
// import axios from 'axios';

// export default function OrderSummary() {

// const handleCheckout = async (e) => {
//         e.preventDefault();
//         try {
//             const response = await axios.post('/checkout', {
//                 // optional: you can send product data here if needed
//                 name: 'Futsal Shin Pad - Brand Mizuno',
//                 amount: 2000, // amount in cents (RM 20.00 = 2000 sen)
//             });

//             // Redirect to Stripe Checkout
//             window.location.href = response.data.url;
//         } catch (error) {
//             console.error('Stripe checkout error:', error);
//             alert('Something went wrong during checkout.');
//         }
//     };

//     return (
// //         <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
// //             <Head title="GEARSHARE - Order Summary" />

// //             <h1 className="text-2xl font-bold text-center mb-6">GEARSHARE</h1>

// //             <div className="mb-6">
// //                 <h2 className="text-lg font-semibold mb-2">Backup Location</h2>
// //                 <div className="space-y-2">
// //                     <label className="flex items-center">
// //                         <input type="checkbox" className="form-checkbox" />
// //                         <span className="ml-2">MRT UPM, Pintu A</span>
// //                     </label>
// //                     <div className="ml-6 space-y-2">
// //                         <h3 className="text-sm font-medium">Return Location</h3>
// //                         <label className="flex items-center">
// //                             <input type="checkbox" checked className="form-checkbox" />
// //                             <span className="ml-2">MRT UPM, Pintu A</span>
// //                         </label>
// //                     </div>
// //                 </div>
// //             </div>

// //             <div className="mb-6">
// //                 <h2 className="text-lg font-semibold mb-2">Renting Period</h2>
// //                 <p className="mb-2">2 day</p>

// //                 <h3 className="text-sm font-medium mb-2">Payment Method</h3>
// //                 <div className="space-y-2">
// //                     <label className="flex items-center">
// //                         <input type="radio" name="payment" className="form-radio" />
// //                         <span className="ml-2">Maybank2U</span>
// //                     </label>
// //                     <label className="flex items-center">
// //                         <input type="radio" name="payment" className="form-radio" />
// //                         <span className="ml-2">Trig eWallet</span>
// //                     </label>
// //                     <label className="flex items-center">
// //                         <input type="radio" name="payment" className="form-radio" />
// //                         <span className="ml-2">Credit/Debit Card</span>
// //                     </label>
// //                 </div>
// //             </div>

// //             <hr className="my-4 border-t border-gray-300" />

// //             <div className="mb-6">
// //                 <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
// //                 <p className="font-medium">Futsal Shin Pad - Brand Mizuno</p>

// //                 <div className="mt-4">
// //                     <h3 className="text-lg font-semibold mb-2">Payment Summary</h3>
// //                     <div className="space-y-1">
// //                         <div className="flex justify-between">
// //                             <span>Price per day</span>
// //                             <span>RM 10</span>
// //                         </div>
// //                         <div className="flex justify-between">
// //                             <span>Renting Period</span>
// //                             <span>2 day</span>
// //                         </div>
// //                         <div className="flex justify-between font-bold mt-2">
// //                             <span>Total</span>
// //                             <span>RM 20</span>
// //                         </div>
// //                     </div>
// //                 </div>
// //             </div>
//             <form onSubmit={handleCheckout}>
//                 <button
//                     type="submit"
//                     className="block w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-center"
//                 >
//                     Proceed to payment
//                 </button>
//             </form>
//         // </div>
//     );
// }

import React from 'react';
import axios from 'axios';

export default function OrderSummary() {
  const handleCheckout = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/checkout');

      if (response.data.checkout_url) {
        window.location.href = response.data.checkout_url; // Redirect to Stripe
      } else {
        alert('Stripe URL not returned.');
      }
    } catch (error) {
      console.error('Checkout error:', error);
      alert('Checkout failed.');
    }
  };

  return (
    <form onSubmit={handleCheckout}>
      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Proceed to payment
      </button>
    </form>
  );
}
