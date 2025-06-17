import React from 'react';
import axios from 'axios';

export default function CheckoutForm() {
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
