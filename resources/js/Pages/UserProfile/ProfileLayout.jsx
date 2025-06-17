import Layout from '@/Layouts/Layout';
import { Button, Paper } from '@mui/material';
import { Link } from '@inertiajs/react';

const ProfileLayout = ({ children, user }) => {
    return (
        <Layout>
            <div className="container mx-auto px-4 py-8">
                {/* Profile Card (Reusable) */}
                <Paper className="p-6 mb-6">
                    <div className="flex items-center space-x-4">
                        <img
                            src={user.avatar || '/default-avatar.png'}
                            alt={user.name}
                            className="w-16 h-16 rounded-full"
                        />
                        <div>
                            <h2 className="text-xl font-bold">{user.name}</h2>
                            <p className="text-gray-600">{user.email}</p>
                        </div>
                    </div>
                </Paper>

                {/* Navigation Bar */}
                <nav className="flex space-x-4 mb-6 border-b pb-4">
                    <Button
                        component={Link}
                        href="/profile"
                        variant="text"
                    >
                        Edit Profile
                    </Button>
                    <Button
                        component={Link}
                        href="/UserProfile/bookings"
                        variant="text"
                    >
                        Booking Requests
                    </Button>
                    <Button
                        component={Link}
                        href={route('profile.listings')}
                        variant="text"
                    >
                        My Listings
                    </Button>
                    <Button
                        component={Link}
                        href="/equipment/create"
                        variant="text"
                    >
                        New Listing
                    </Button>
                                        <Button
                        component={Link}
                        href={route('profile.bookings')}
                        variant="text"
                    >
                        My orders
                    </Button>
                </nav>

                {/* Page Content */}
                {children}

                {/* "Add Listing" Button (Only on Listings page) */}
                {window.location.pathname.includes('/profile/listings') && (
                    <Button
                        variant="contained"
                        href="/equipment/create"
                        sx={{ mt: 3 }}
                    >
                        Add New Listing
                    </Button>
                )}
            </div>
        </Layout>
    );
};

export default ProfileLayout;
