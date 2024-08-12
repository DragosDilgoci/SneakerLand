import { Link } from '@inertiajs/react';

export default function NavLink({ active = false, className = '', children, ...props }) {
    return (
        <Link
            {...props}
            className={
                'inline-flex items-center px-1 pt-1 border-b-2 text-1rem font-medium leading-5 transition duration-150 ease-in-out focus:outline-none ' +
                (active
                    ? 'border-customPurple text-customLightblue hover:text-customLightblue/70 focus:border-customPurple/70'
                    : 'border-transparent text-customLightblue hover:text-customLightblue/70 hover:border-customPurple/70 focus:text-gray-700 focus:border-gray-300 ') +
                className
            }
        >
            {children}
        </Link>
    );
}
