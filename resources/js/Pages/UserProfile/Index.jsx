import ProfileLayout from './ProfileLayout';
import { usePage } from '@inertiajs/react';

export default function ProfileIndex() {
    const { user } = usePage().props;

    return (
        <ProfileLayout user={user}>
            <h1 className="text-2xl font-bold mb-4">Welcome back, {user.name}!</h1>
            <p>This is your profile dashboard. Manage your bookings, listings, and settings.</p>
        </ProfileLayout>
    );
}
