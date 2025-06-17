import ProfileLayout from './ProfileLayout';
import { Link } from '@inertiajs/react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Box
} from '@mui/material';
import { Visibility, Delete } from '@mui/icons-material';

export default function RequestedBookings({ user, bookings }) {
  const handleDelete = (bookingId) => {
    if (window.confirm('Are you sure you want to delete this booking request?')) {
      // Using Inertia's delete method
      window.location.href = `/bookings/${bookingId}`;
      // Or use Inertia router: router.delete(`/bookings/${bookingId}`);
    }
  };

  return (
    <ProfileLayout user={user}>
      <h1 className="text-2xl font-bold mb-4">My Booking Requests</h1>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Equipment</TableCell>
              <TableCell>Owner</TableCell>
              <TableCell>Pickup Date</TableCell>
              <TableCell>Return Date</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {bookings.map((booking) => (
              <TableRow key={booking.id}>
                <TableCell>{booking.equipment?.name || 'N/A'}</TableCell>
                <TableCell>{booking.owner?.name || 'N/A'}</TableCell>
                <TableCell>{booking.start_date}</TableCell>
                <TableCell>{booking.end_date}</TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded text-sm ${
                    booking.status === 'approved' ? 'bg-green-100 text-green-800' :
                    booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                    booking.status === 'rejected' ? 'bg-red-100 text-red-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {booking.status}
                  </span>
                </TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Link href={route('bookings.summary', {
                        booking: booking.id,
                        equipment: booking.equipment.id
                        })}>
                      <Button
                        variant="outlined"
                        size="small"
                        startIcon={<Visibility />}
                        sx={{ minWidth: 'auto' }}
                      >
                        View Details
                      </Button>
                    </Link>
                    <Button
                      variant="outlined"
                      color="error"
                      size="small"
                      startIcon={<Delete />}
                      onClick={() => handleDelete(booking.id)}
                      sx={{ minWidth: 'auto' }}
                    >
                      Delete
                    </Button>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </ProfileLayout>
  );
}
