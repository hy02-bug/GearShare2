import React from 'react';
import { Link } from '@inertiajs/react';

export default function Navigation({ activeTab }) {
    const tabs = [
        { name: 'My Items', href: '' },
        { name: 'Currently Renting', href: '' },
        { name: 'Past Renting', href: '' },
    ];

    return (
        <nav className="bg-white shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex">
                        {tabs.map((tab) => (
                            <Link
                                key={tab.name}
                                href={tab.href}
                                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                                    activeTab === tab.name.toLowerCase()
                                        ? 'border-indigo-500 text-gray-900'
                                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                }`}
                            >
                                {tab.name}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </nav>
    );
}
