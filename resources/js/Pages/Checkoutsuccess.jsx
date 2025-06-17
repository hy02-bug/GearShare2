import React from 'react';
import { Link } from '@inertiajs/react';

export default function CheckoutSuccess() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="text-center">
                <h1 className="text-3xl font-bold text-green-600 mb-4">
                    Payment Success
                </h1>
                <p className="text-gray-600 mb-6">
                    Your payment was processed successfully.
                </p>
                <Link
                    href="/Home"
                    className="inline-block px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
                >
                    Back to Home
                </Link>
            </div>
        </div>
    );
}
