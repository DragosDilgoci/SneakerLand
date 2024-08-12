import { Link } from '@inertiajs/react';

export default function ResponsiveNavLink({ active = false, className = '', children, ...props }) {
    return (
        <Link
            {...props}
            className={`w-full flex items-start ps-3 pe-4 py-2 border-l-4 ${
                active
                    ? 'border-customPurple text-customPurple bg-white  focus:text-customPurple/70 focus:bg-customLightblue focus:border-customPurple/70 hover:bg-customLightblue'
                    : 'border-transparent text-customPurple hover:bg-customLightblue hover:border-white focus:text-customPurple/70 focus:bg-customLightblue focus:border-customPurple'
            } text-base font-medium focus:outline-none transition duration-150 ease-in-out ${className}`}
        >
            {children}
        </Link>
    );
}
