import { Head, Link } from '@inertiajs/react';

export default function Welcome({ auth, laravelVersion, phpVersion }) {
    return (
        <>
            <Head title="Welcome to GearShare" />
            <div className="bg-gradient-to-b from-blue-50 to-white text-gray-800 min-h-screen">
                <div className="relative flex min-h-screen flex-col items-center justify-center">
                    <div className="relative w-full max-w-7xl px-6">
                        <header className="flex items-center justify-between py-8">
                            <div className="flex items-center">
                                <svg className="h-12 w-auto text-black" viewBox="0 0 62 65" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M31 40C42.0457 40 51 31.0457 51 20C51 8.9543 42.0457 0 31 0C19.9543 0 11 8.9543 11 20C11 31.0457 19.9543 40 31 40Z" fill="#3B82F6"/>
                                    <path d="M31 65C48.1208 65 62 51.1208 62 34C62 16.8792 48.1208 3 31 3C13.8792 3 0 16.8792 0 34C0 51.1208 13.8792 65 31 65Z" fill="#1D4ED8"/>
                                    <path d="M31 45C41.4934 45 50 36.4934 50 26C50 15.5066 41.4934 7 31 7C20.5066 7 12 15.5066 12 26C12 36.4934 20.5066 45 31 45Z" fill="#93C5FD"/>
                                </svg>
                                                            <div className="text-2xl font-extrabold text-black">
                                <Link href="/" className="hover:underline">GEARSHARE</Link>
                            </div>
                            </div>
                            <nav className="flex items-center space-x-6">
                                {auth.user ? (
                                    <Link
                                        href={route('Home')}
                                        className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300"
                                    >
                                        Home Page
                                    </Link>
                                ) : (
                                    <>
                                        <Link
                                            href={route('login')}
                                            className="rounded-lg px-5 py-2.5 text-sm font-medium text-blue-600 transition hover:bg-blue-50 focus:outline-none focus:ring-4 focus:ring-blue-300"
                                        >
                                            Log in
                                        </Link>
                                        <Link
                                            href={route('register')}
                                            className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300"
                                        >
                                            Get Started
                                        </Link>
                                    </>
                                )}
                            </nav>
                        </header>

                        <main className="mt-10">
                            <div className="grid gap-8 lg:grid-cols-2">
                                <div className="lg:col-span-2">
                                    <div className="rounded-3xl bg-white p-8 shadow-xl lg:p-12">
                                        <div className="flex flex-col items-center gap-8 lg:flex-row">
                                            <div className="lg:w-1/2">
                                                <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">
                                                    Rent Top-Quality Sports Equipment
                                                </h1>
                                                <p className="mt-6 text-lg text-gray-600">
                                                    GearShare connects you with the best sports gear in your area.
                                                    Whether you're a weekend warrior or a seasoned pro, we've got
                                                    the equipment you need to perform at your best.
                                                </p>
                                                <div className="mt-8 flex flex-wrap gap-4">
                                                    <Link
                                                        href={route('register')}
                                                        className="rounded-lg bg-blue-600 px-6 py-3 text-lg font-medium text-white transition hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300"
                                                    >
                                                        Join Now
                                                    </Link>
                                                    <Link
                                                        href="#how-it-works"
                                                        className="rounded-lg border border-blue-600 px-6 py-3 text-lg font-medium text-blue-600 transition hover:bg-blue-50 focus:outline-none focus:ring-4 focus:ring-blue-300"
                                                    >
                                                        How It Works
                                                    </Link>
                                                </div>
                                            </div>
                                            <div className="lg:w-1/2">
                                                <img
                                                    src="https://images.unsplash.com/photo-1543357480-c60d400e7ef6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
                                                    alt="Sports equipment"
                                                    className="rounded-2xl shadow-lg"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div id="how-it-works" className="rounded-3xl bg-white p-8 shadow-xl">
                                    <div className="flex items-center gap-4">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                            </svg>
                                        </div>
                                        <h2 className="text-2xl font-bold text-gray-900">Find Equipment</h2>
                                    </div>
                                    <p className="mt-4 text-gray-600">
                                        Browse our extensive catalog of sports equipment from trusted providers in your area.
                                        Filter by sport, price, or availability to find exactly what you need.
                                    </p>
                                </div>

                                <div className="rounded-3xl bg-white p-8 shadow-xl">
                                    <div className="flex items-center gap-4">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                        </div>
                                        <h2 className="text-2xl font-bold text-gray-900">Book & Pay</h2>
                                    </div>
                                    <p className="mt-4 text-gray-600">
                                        Reserve your gear for the dates you need with our secure booking system.
                                        Pay online with confidence using our encrypted payment processing.
                                    </p>
                                </div>

                                <div className="rounded-3xl bg-white p-8 shadow-xl">
                                    <div className="flex items-center gap-4">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                                            </svg>
                                        </div>
                                        <h2 className="text-2xl font-bold text-gray-900">Pick Up or Delivery</h2>
                                    </div>
                                    <p className="mt-4 text-gray-600">
                                        Choose to pick up your equipment at a convenient location or have it delivered
                                        right to your door. We offer flexible options to fit your schedule.
                                    </p>
                                </div>

                                <div className="rounded-3xl bg-white p-8 shadow-xl">
                                    <div className="flex items-center gap-4">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                            </svg>
                                        </div>
                                        <h2 className="text-2xl font-bold text-gray-900">Play with Confidence</h2>
                                    </div>
                                    <p className="mt-4 text-gray-600">
                                        All equipment is professionally maintained and sanitized between uses.
                                        Our quality guarantee ensures you get gear that performs when you need it.
                                    </p>
                                </div>
                            </div>

                            <div className="mt-16 rounded-3xl bg-blue-600 p-8 text-white shadow-xl lg:p-12">
                                <div className="mx-auto max-w-4xl text-center">
                                    <h2 className="text-3xl font-bold sm:text-4xl">Ready to Get in the Game?</h2>
                                    <p className="mt-4 text-lg">
                                        Join thousands of athletes who trust GearShare for their equipment needs.
                                        Sign up today and get 20% off your first rental!
                                    </p>
                                    <div className="mt-8">
                                        <Link
                                            href={route('register')}
                                            className="inline-block rounded-lg bg-white px-8 py-3 text-lg font-medium text-blue-600 transition hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-blue-300"
                                        >
                                            Start Renting Now
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </main>

                        <footer className="py-12 text-center text-sm text-gray-600">
                            <p>© {new Date().getFullYear()} GearShare. All rights reserved.</p>
                            <p className="mt-2">Laravel v{laravelVersion} (PHP v{phpVersion})</p>
                        </footer>
                    </div>
                </div>
            </div>
        </>
    );
}
