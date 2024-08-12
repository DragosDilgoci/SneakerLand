import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Dashboard({ auth }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<div className="flex justify-center items-center py-10 animate-bounce font-bold w-full lg:text-1.40vw md:text-1.5vw text-3vw text-white leading-tight">🌞Summer Sneaker Sale!🌞 Cool off with hot deals! Save up to 50% on the latest styles and top brands. Shop now and step into summer in style!</div>}
        >
            <Head title="SneakerLand - Summer Sale" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">You're logged in!</div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
