import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Button } from '@headlessui/react';
import { Head } from '@inertiajs/react';
import { Link, usePage } from '@inertiajs/react';

export default function Dashboard() {
    const { user } = usePage().props;
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            You're logged in!
                        </div>
                           <Link href="/Home">
                                    <Button className="block h-9 w-auto fill-current text-gray-800">Home</Button>
                            </Link>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
