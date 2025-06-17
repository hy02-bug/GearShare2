import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default function RentalForm() {
  const [meetupLocation, setMeetupLocation] = useState('');
  const [pickupDate, setPickupDate] = useState(null);
  const [returnDate, setReturnDate] = useState(null);
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length === 0) {
      console.log({ meetupLocation, pickupDate, returnDate });
      alert('Booking request submitted successfully!');
    } else {
      setErrors(validationErrors);
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!meetupLocation.trim()) newErrors.meetupLocation = 'Meetup location is required';
    if (!pickupDate) newErrors.pickupDate = 'Pickup date is required';
    if (!returnDate) {
      newErrors.returnDate = 'Return date is required';
    } else if (pickupDate && returnDate <= pickupDate) {
      newErrors.returnDate = 'Return date must be after pickup date';
    }

    return newErrors;
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-semibold text-gray-800 mb-6">Request Booking</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Meetup Location */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Meetup Location</label>
          <input
            type="text"
            value={meetupLocation}
            onChange={(e) => setMeetupLocation(e.target.value)}
            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.meetupLocation ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Enter meetup address"
          />
          {errors.meetupLocation && (
            <p className="mt-1 text-sm text-red-600">{errors.meetupLocation}</p>
          )}
        </div>

        {/* Pickup Date */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Pickup Date</label>
          <DatePicker
            selected={pickupDate}
            onChange={(date) => setPickupDate(date)}
            minDate={new Date()}
            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.pickupDate ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholderText="Select pickup date"
            dateFormat="MMMM d, yyyy h:mm aa"
            showTimeSelect
            timeIntervals={30}
          />
          {errors.pickupDate && (
            <p className="mt-1 text-sm text-red-600">{errors.pickupDate}</p>
          )}
        </div>

        {/* Return Date */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Return Date</label>
          <DatePicker
            selected={returnDate}
            onChange={(date) => setReturnDate(date)}
            minDate={pickupDate || new Date()}
            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.returnDate ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholderText="Select return date"
            dateFormat="MMMM d, yyyy h:mm aa"
            showTimeSelect
            timeIntervals={30}
          />
          {errors.returnDate && (
            <p className="mt-1 text-sm text-red-600">{errors.returnDate}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md shadow-sm transition duration-150"
        >
          Request Booking
        </button>
      </form>
    </div>
  );
}
