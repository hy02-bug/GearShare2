import React from 'react';
import { Bell, MessageSquare, User } from 'lucide-react';
import { Link, usePage } from '@inertiajs/react';
import PropTypes from 'prop-types';

export default function GearShareLayout({ header, children }) {
  const { user } = usePage().props;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Navbar */}
      <header className="border-b shadow-sm bg-white sticky top-0 z-10">
        <div className="container mx-auto px-6 py-3 flex items-center justify-between">
          {/* Left: Logo */}
          <div className="text-xl font-extrabold text-black">
            <Link href="/Home" className="hover:underline">GEARSHARE</Link>
          </div>

          {/* Center: Categories - Made responsive */}
          <div className="hidden md:flex space-x-6 text-md font-medium text-black">
            <Link href="/equipment" className="hover:underline">Badminton</Link>
            <Link href="/category/futsal" className="hover:underline">Futsal</Link>
            <Link href="/category/football" className="hover:underline">Football</Link>
          </div>

          {/* Right: Icons and User */}
          <div className="flex items-center space-x-4 text-black">
            <Bell className="w-5 h-5 cursor-pointer hover:text-gray-600" />
            <MessageSquare className="w-5 h-5 cursor-pointer hover:text-gray-600" />
            <div className="flex items-center space-x-2">
              <Link
                href="/UserProfile"
                className="hover:underline"
                title={user?.name || 'Profile'}
              >
                {user?.name ? user.name.substring(0, 12) + (user.name.length > 12 ? '...' : '') : 'Profile'}
              </Link>
              <User className="w-6 h-6" />
            </div>
          </div>
        </div>
      </header>

      {/* Optional Header */}
      {header && (
        <header className="bg-white shadow-sm px-6 py-4">
          <h1 className="text-xl font-semibold text-gray-900">{header}</h1>
        </header>
      )}

      {/* Main Content */}
      <main className="flex-grow container mx-auto px-4 sm:px-6 py-8">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-white text-center py-4 text-gray-500 text-sm border-t">
        &copy; {new Date().getFullYear()} GearShare. All rights reserved.
      </footer>
    </div>
  );
}

GearShareLayout.propTypes = {
  header: PropTypes.node, // Made optional since it's conditionally rendered
  children: PropTypes.node.isRequired,
};

GearShareLayout.defaultProps = {
  header: null,
};
