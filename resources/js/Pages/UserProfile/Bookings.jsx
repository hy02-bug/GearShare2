import ProfileLayout from './ProfileLayout';
import { usePage } from '@inertiajs/react';
import { router } from '@inertiajs/react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import { useState } from 'react';

export default function Bookings() {
    const { bookings, user, statusLabels } = usePage().props;
    const [loading, setLoading] = useState({});

    // Date formatting function
    const formatDate = (dateString) => {
        if (!dateString) return '-';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    // Format date range
    const formatDateRange = (start, end) => {
        if (!start || !end) return '-';
        return `${formatDate(start)} - ${formatDate(end)}`;
    };

    // Handle accept booking
    const handleAccept = (order) => {
        setLoading(prev => ({ ...prev, [order.id]: 'accepting' }));

        router.post(`/bookings/${order.id}/accept`, {}, {
            onSuccess: () => {
                setLoading(prev => ({ ...prev, [order.id]: false }));
                // Optional: Show success message
                console.log('Booking accepted successfully');
            },
            onError: (errors) => {
                setLoading(prev => ({ ...prev, [order.id]: false }));
                // Handle error
                console.error('Error accepting booking:', errors);
            }
        });
    };

    // Handle deny booking
    const handleDeny = (order) => {
        setLoading(prev => ({ ...prev, [order.id]: 'denying' }));

        router.post(`/bookings/${order.id}/deny`, {}, {
            onSuccess: () => {
                setLoading(prev => ({ ...prev, [order.id]: false }));
                // Optional: Show success message
                console.log('Booking denied successfully');
            },
            onError: (errors) => {
                setLoading(prev => ({ ...prev, [order.id]: false }));
                // Handle error
                console.error('Error denying booking:', errors);
            }
        });
    };

    // Get status styling
    const getStatusClass = (status) => {
        switch (status?.toLowerCase()) {
            case 'pending':
                return 'text-yellow-600 bg-yellow-100 px-2 py-1 rounded-full text-xs';
            case 'accepted':
                return 'text-green-600 bg-green-100 px-2 py-1 rounded-full text-xs';
            case 'denied':
                return 'text-red-600 bg-red-100 px-2 py-1 rounded-full text-xs';
            default:
                return 'text-gray-600 bg-gray-100 px-2 py-1 rounded-full text-xs';
        }
    };

    return (
        <ProfileLayout user={user}>
            <h1 className="text-2xl font-bold mb-4">Booking Requests</h1>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Item</TableCell>
                            <TableCell>Customer</TableCell>
                            <TableCell>Dates</TableCell>
                            <TableCell>Pickup Location</TableCell>
                            <TableCell>Return Location</TableCell>
                            <TableCell>Remarks</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {bookings.map((booking) => (
                            <TableRow key={booking.id}>
                                <TableCell>{booking.equipment?.name || '-'}</TableCell>
                                <TableCell>{booking.customer?.name || '-'}</TableCell>
                                <TableCell>
                                    {formatDateRange(booking.start_date, booking.end_date)}
                                </TableCell>
                                <TableCell>{booking.pickup_location || '-'}</TableCell>
                                <TableCell>{booking.return_location || '-'}</TableCell>
                                <TableCell>{booking.customer_notes || '-'}</TableCell>
                                <TableCell>
                                    <span className={getStatusClass(booking.status)}>
                                        {booking.status}
                                    </span>
                                </TableCell>
                                <TableCell>
                                    {booking.status?.toLowerCase() === 'pending' ? (
                                        <>
                                            <Button
                                                color="success"
                                                size="small"
                                                sx={{ mr: 1 }}
                                                onClick={() => handleAccept(booking)}
                                                disabled={loading[booking.id] === 'accepting'}
                                            >
                                                {loading[booking.id] === 'accepting' ? 'Accepting...' : 'Accept'}
                                            </Button>
                                            <Button
                                                color="error"
                                                size="small"
                                                onClick={() => handleDeny(booking)}
                                                disabled={loading[booking.id] === 'denying'}
                                            >
                                                {loading[booking.id] === 'denying' ? 'Denying...' : 'Deny'}
                                            </Button>
                                        </>
                                    ) : (
                                        <span className="text-gray-500 text-sm">
                                            {booking.status === 'accepted' ? 'Accepted' : 'Denied'}
                                        </span>
                                    )}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </ProfileLayout>
    );
}
