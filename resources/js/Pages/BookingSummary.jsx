import Layout from '@/Layouts/Layout';
import axios from '@/axios'; // or your path to axios instance
import { useState } from 'react';
import { usePage } from '@inertiajs/react';
import { format, differenceInDays, parseISO } from 'date-fns';

export default function BookingSummary() {
  const { props } = usePage();
  const { bookings, equipment } = props;

  //set loading
  const [isLoading, setIsLoading] = useState(false);

  // Use actual data or fallback to dummy data
  const booking = bookings;
  const equipmentData = equipment;

  // Safely parse dates with fallbacks
  const pickupDate = booking?.start_date ? parseISO(booking.start_date) : new Date();
  const returnDate = booking?.end_date ? parseISO(booking.end_date) : new Date(Date.now() + 86400000);

  // Calculate rental details with proper fallbacks
  const rentalDays = Math.max(1, differenceInDays(returnDate, pickupDate) + 1);
  const rentalPrice = equipmentData?.rentalPrice || 25.00;
  const subtotal = bookings.total_price;
  const serviceFee = subtotal * 0.1;
  const total = subtotal + serviceFee;

  const handlePayment = async () => {
  try {
    const response = await axios.post(route('stripe.checkout'), { // Use named route
      booking_id: booking.id,
      product_name: equipmentData?.name,
      unit_amount: subtotal * 100,
    });
    window.location.href = response.data.checkout_url;
  } catch (error) {
    console.error('Payment error:', error.response?.data);
    alert(error.response?.data?.message || 'Payment failed');
  } finally {
    setIsLoading(false);
  }
};

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Booking Summary</h1>
          {booking?.status === 'pending' && (
            <div className="bg-blue-100 border-l-4 border-blue-500 p-4 mt-4">
              <p className="text-blue-700">
                <strong>Status:</strong> Waiting for payment
              </p>
            </div>
          )}
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Equipment and Booking Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Equipment Card */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4">Equipment Details</h2>
              <div className="flex flex-col sm:flex-row gap-6">
                <div className="w-full sm:w-40 h-40 bg-gray-100 rounded-lg overflow-hidden">
                  <img
                    src={equipmentData?.image_path || '/images/default-equipment.jpg'}
                    alt={equipmentData?.name || 'Equipment'}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-medium">{equipmentData?.name || 'Badminton Racket'}</h3>
                  <div className="mt-2 space-y-1">
                    <p className="text-gray-600">Owner: {booking?.owner?.name || 'John Doe'}</p>
                    <p className="text-gray-600">Sport: {equipmentData?.sports || 'Badminton'}</p>
                    <p className="text-gray-600">Size: {equipmentData?.size || 'Medium'}</p>
                    <p className="text-gray-600">Condition: {equipmentData?.condition || 'Good'}</p>
                    <p className="text-gray-600">
                     <span>Daily Rate: RM {equipmentData?.rentalPrice?.toFixed(2) || '0.00'}</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Booking Details */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4">Booking Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-medium text-gray-700 mb-2">Pickup</h3>
                  <p className="text-gray-900">{booking?.pickup_loc || 'Not Found'}</p>
                  <p className="text-gray-600 mt-1">
                    {format(pickupDate, 'EEEE, MMMM d, yyyy ')}
                  </p>
                </div>
                <div>
                  <h3 className="font-medium text-gray-700 mb-2">Return</h3>
                  <p className="text-gray-900">{booking?.return_loc || 'Not Found'}</p>
                  <p className="text-gray-600 mt-1">
                    {format(returnDate, 'EEEE, MMMM d, yyyy ')}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow p-6 sticky top-4">
              <h2 className="text-xl font-semibold mb-4">Payment Summary</h2>

              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Subtotal ({rentalDays} days)</span>
                  <span>RM {booking.total_price.toFixed(2)}</span>
                </div>

                <div className="flex justify-between text-gray-600">
                  <span>Service Fee (10%)</span>
                  <span>RM {serviceFee.toFixed(2)}</span>
                </div>

                <div className="border-t border-gray-200 pt-3 mt-3 flex justify-between font-semibold text-lg">
                  <span>Total</span>
                  <span>RM {total.toFixed(2)}</span>
                </div>
              </div>
{booking?.status === 'accepted' && (
  <button
    className={`w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-md shadow ${
      isLoading ? 'opacity-50 cursor-not-allowed' : ''
    }`}
    onClick={handlePayment}
    disabled={isLoading}
  >
    {isLoading ? (
      <>
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        Processing...
      </>
    ) : (
      'Confirm & Pay'
    )}
  </button>
)}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
