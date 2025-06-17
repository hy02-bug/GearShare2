import React, { useState, useRef, useEffect } from 'react';
import { Bell, MessageSquare, User, ChevronDown } from 'lucide-react';
import { Link, usePage } from '@inertiajs/react';
import PropTypes from 'prop-types';

export default function GearShareLayout({ header, children }) {
  const { auth } = usePage().props;
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

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

            {/* User Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={toggleDropdown}
                className="flex items-center space-x-2 hover:text-gray-600 focus:outline-none"
                type="button"
              >
                <span className="text-sm font-medium">
                  {auth.user?.name ?
                    auth.user.name.substring(0, 12) + (auth.user.name.length > 12 ? '...' : '') :
                    'Profile'
                  }
                </span>
                <User className="w-6 h-6" />
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 py-1 z-20">
                  <Link
                    href="/UserProfile"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-150"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    Profile
                  </Link>
                  <Link
                    href="/logout"
                    method="post"
                    as="button"
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-150"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    Logout
                  </Link>
                </div>
              )}
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
  header: PropTypes.node,
  children: PropTypes.node.isRequired,
};

GearShareLayout.defaultProps = {
  header: null,
};
