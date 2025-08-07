import { useState } from 'react';
import { useForm, Head } from '@inertiajs/react';
import { format, differenceInDays, parseISO } from 'date-fns';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default function BookingForm({ defaultLocation = '', equipmentId, equipment, existingRequest }) {
  const [calculatedPrice, setCalculatedPrice] = useState(0);
  const [isPriceCalculated, setIsPriceCalculated] = useState(false);

  const isSubmitted = existingRequest;

  const { data, setData, post, processing, errors } = useForm({
    pickupLocation: defaultLocation,
    returnLocation: '',
    pickupDate: null,
    returnDate: null,
    equipmentId,
    totalPrice: 0,
  });

  const formatDate = (date) => {
    if (!date) return null;
    // Ensure consistent timezone handling
    return format(date, 'yyyy-MM-dd');
  };

  const calculateTotalPrice = () => {
    // Validate required fields
    if (!data.pickupDate || !data.returnDate || !equipment?.rentalPrice) return 0;

    // Ensure return date is after pickup date
    if (data.returnDate <= data.pickupDate) return 0;

    // Calculate days (min 1 day)
    const rentalDays = Math.max(1, differenceInDays(data.returnDate, data.pickupDate) + 1);
    const rentalPrice = equipment.rentalPrice || 0.00;

    return rentalDays * rentalPrice;
  };

  const handleCalculate = (e) => {
    e.preventDefault();
    const price = calculateTotalPrice();
    setCalculatedPrice(price);
    setData('totalPrice', price);
    setIsPriceCalculated(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSubmitted) return;

    const submissionData = {
      equipmentId: data.equipmentId,
      pickupLocation: data.pickupLocation,
      returnLocation: data.returnLocation,
      pickupDate: formatDate(data.pickupDate),
      returnDate: formatDate(data.returnDate),
      totalPrice: calculatedPrice, // Use the calculated price
    };

    post(route('equipment.book', { equipment: equipmentId }), {
      data: submissionData
    });
  };
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-12">
      <Head title="Book Equipment" />
      <h2 className="text-2xl font-bold mb-6">Book This Item</h2>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Pickup Location */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Pickup Location</label>
            <input
              type="text"
              value={data.pickupLocation}
              onChange={(e) => setData('pickupLocation', e.target.value)}
              placeholder="Enter pickup location"
              disabled={isSubmitted}
              className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
            />
            {errors.pickupLocation && <p className="text-sm text-red-600 mt-1">{errors.pickupLocation}</p>}
          </div>

          {/* Return Location */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Return Location</label>
            <input
              type="text"
              value={data.returnLocation}
              onChange={(e) => setData('returnLocation', e.target.value)}
              placeholder="Enter return location"
              disabled={isSubmitted}
              className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
            />
            {errors.returnLocation && <p className="text-sm text-red-600 mt-1">{errors.returnLocation}</p>}
          </div>

          {/* Pickup Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Pickup Date</label>
            <DatePicker
              selected={data.pickupDate}
              onChange={(date) => setData('pickupDate', date)}
              minDate={new Date()}
              placeholderText="Select pickup date"
              dateFormat="MMMM d, yyyy"
              disabled={isSubmitted}
              className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
            />
            {errors.pickupDate && <p className="text-sm text-red-600 mt-1">{errors.pickupDate}</p>}
          </div>

          {/* Return Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Return Date</label>
            <DatePicker
              selected={data.returnDate}
              onChange={(date) => setData('returnDate', date)}
              minDate={data.pickupDate || new Date()}
              placeholderText="Select return date"
              dateFormat="MMMM d, yyyy"
              disabled={isSubmitted}
              className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
            />
            {errors.returnDate && <p className="text-sm text-red-600 mt-1">{errors.returnDate}</p>}
          </div>
        </div>

        {/* Error message */}
        {errors.message && <p className="mt-4 text-sm text-red-600">{errors.message}</p>}

        {/* Debug info - optional in dev */}
        {/* <div className="mt-4 p-3 bg-gray-100 rounded text-sm">
          <p>Debug Info:</p>
          <p>Equipment ID: {data.equipmentId}</p>
          <p>Pickup Location: {data.pickupLocation || 'Not entered'}</p>
          <p>Return Location: {data.returnLocation || 'Not entered'}</p>
          <p>Pickup Date: {data.pickupDate ? data.pickupDate.toString() : 'Not selected'}</p>
          <p>Return Date: {data.returnDate ? data.returnDate.toString() : 'Not selected'}</p>
          <p>Rental Price: {equipment?.rentalPrice ?? 'Not available'}</p>
          <p>Total Price: {data.totalPrice}</p>
          <p>Already Submitted: {isSubmitted ? 'Yes' : 'No'}</p>
        </div> */}

        {/* Calculate Price */}
        <button
          type="button"
          onClick={handleCalculate}
          disabled={isSubmitted}
          className="mt-4 w-full bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded-md transition disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          Calculate Price
        </button>

        {/* Price Display */}
        {calculatedPrice >= 0 && data.pickupDate && data.returnDate && (
          <div className="mt-4 text-lg font-semibold">
            {calculatedPrice > 0 ? (
              <span className="text-green-600">Total Price: RM {calculatedPrice.toFixed(2)}</span>
            ) : (
              <span className="text-red-600">Please check your dates and equipment pricing</span>
            )}
          </div>
        )}

        {/* Submit Request */}
        {isPriceCalculated && calculatedPrice > 0 && (
          <button
            type="submit"
            disabled={processing || isSubmitted}
            className={`mt-6 w-full font-bold py-3 px-4 rounded-md transition ${
              isSubmitted
                ? 'bg-green-500 text-white cursor-not-allowed'
                : processing
                  ? 'bg-blue-600 opacity-50 cursor-not-allowed text-white'
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
          >
            {isSubmitted
              ? 'Request Already Submitted'
              : processing
                ? 'Processing...'
                : 'Request to Book'}
          </button>
        )}
      </form>
    </div>
  );
}
