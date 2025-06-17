import ProfileLayout from './ProfileLayout';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';

export default function Listings({user}) {
    const listings = [
        { id: 1, name: 'Professional Camera', price: '$50/day', status: 'Active' },
        { id: 2, name: 'DJI Drone', price: '$75/day', status: 'Inactive' },
    ];

    return (
        <ProfileLayout user={user}>
            <h1 className="text-2xl font-bold mb-4">My Listings</h1>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Price</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {listings.map((listing) => (
                            <TableRow key={listing.id}>
                                <TableCell>{listing.name}</TableCell>
                                <TableCell>{listing.price}</TableCell>
                                <TableCell>{listing.status}</TableCell>
                                <TableCell>
                                    <IconButton color="primary">
                                        <Edit />
                                    </IconButton>
                                    <IconButton color="error">
                                        <Delete />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </ProfileLayout>
    );
}
