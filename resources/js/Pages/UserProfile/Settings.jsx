import ProfileLayout from './ProfileLayout';

export default function Settings() {
    return (
        <ProfileLayout>
            <h1 className="text-2xl font-bold mb-4">Account Settings</h1>
            <div className="space-y-4">
                <div>
                    <h3 className="font-medium">Profile Information</h3>
                    <p className="text-sm text-gray-600">Update your account details.</p>
                </div>
                {/* Add form here later */}
            </div>
        </ProfileLayout>
    );
}
