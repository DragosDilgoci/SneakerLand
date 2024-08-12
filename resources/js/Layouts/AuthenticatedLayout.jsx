import { useState } from 'react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link } from '@inertiajs/react';

export default function Authenticated({ user, header, children }) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);

    return (
        <div className="relative min-h-screen flex flex-col bg-gray-50 text-black/50">
                <img
                    id="background"
                    className="absolute top-0 h-full w-full object-cover"
                    src="https://www.pixelstalk.net/wp-content/uploads/2016/10/Justice-in-funding-mission-pre-conference-registra.jpg"
                    alt="Background"
                />
            <nav className="bg-none border-gray-100 z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex">
                            <div className="shrink-0 flex items-center">
                                <Link href="/dashboard">
                                    <ApplicationLogo/>
                                </Link>
                            </div>

                            <div className="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">
                                <NavLink href={route('dashboard')} active={route().current('dashboard')}>
                                    Home
                                </NavLink>
                                <NavLink >
                                    Sales
                                </NavLink>
                                <NavLink >
                                    Categories
                                </NavLink>
                                <NavLink >
                                    Products
                                </NavLink>
                                <NavLink >
                                    Visit Us
                                </NavLink>
                                <NavLink >
                                    Contact
                                </NavLink>
                            </div>
                        </div>

                        <div className="hidden sm:flex sm:items-center sm:ms-6">
                            <div className="ms-3 relative">
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <span className="inline-flex rounded-md">
                                            <button
                                                type="button"
                                                className="inline-flex uppercase items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-customLightblue bg-customPurple hover:text-customPurple/70 hover:bg-customLightblue/70 focus:outline-none transition ease-in-out duration-500"
                                            >
                                                {user.name}

                                                <svg
                                                    className="ms-2 -me-0.5 h-4 w-4"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            </button>
                                        </span>
                                    </Dropdown.Trigger>

                                    <Dropdown.Content>
                                        <Dropdown.Link href={route('profile.edit')}>Profile</Dropdown.Link>
                                        <Dropdown.Link href={route('logout')} method="post" as="button">
                                            Log Out
                                        </Dropdown.Link>
                                    </Dropdown.Content>
                                </Dropdown>
                            </div>
                        </div>

                        <div className="-me-2 flex items-center sm:hidden">
                            <button
                                onClick={() => setShowingNavigationDropdown((previousState) => !previousState)}
                                className="inline-flex items-center justify-center p-2 rounded-md text-customPurple hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out"
                            >
                                <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                    <path
                                        className={!showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                    <path
                                        className={showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                <div className={(showingNavigationDropdown ? 'block' : 'hidden') + ' sm:hidden'}>
                    <div className="pt-2 pb-3 space-y-1">
                        <ResponsiveNavLink href={route('dashboard')} active={route().current('dashboard')}>
                            Dashboard
                        </ResponsiveNavLink>
                        <ResponsiveNavLink href={route('dashboard')} active={route().current('dashboard')}>
                            Home
                        </ResponsiveNavLink>
                        <ResponsiveNavLink href={route('dashboard')} active={route().current('dashboard')}>
                            Sales
                        </ResponsiveNavLink>
                        <ResponsiveNavLink href={route('dashboard')} active={route().current('dashboard')}>
                            Categories
                        </ResponsiveNavLink>
                        <ResponsiveNavLink href={route('dashboard')} active={route().current('dashboard')}>
                            Products
                        </ResponsiveNavLink>
                        <ResponsiveNavLink href={route('dashboard')} active={route().current('dashboard')}>
                            Visit Us
                        </ResponsiveNavLink>
                        <ResponsiveNavLink href={route('dashboard')} active={route().current('dashboard')}>
                            Contact
                        </ResponsiveNavLink>
                    </div>

                    <div className="pt-4 pb-1 border-t border-gray-200">
                        <div className="px-4">
                            <div className="font-medium text-base text-customLightblue">{user.name}</div>
                            <div className="font-medium text-sm text-customLightblue">{user.email}</div>
                        </div>

                        <div className="mt-3 space-y-1">
                            <ResponsiveNavLink href={route('profile.edit')}>Profile</ResponsiveNavLink>
                            <ResponsiveNavLink method="post" href={route('logout')} as="button">
                                Log Out
                            </ResponsiveNavLink>
                        </div>
                    </div>
                </div>
            </nav>

            {header && (
                <header className="bg-white shadow w-full py-8 px-4 sm:px-6 lg:px-8 border">
                    <NavLink href={route('dashboard')} active={route().current('dashboard')} className="max-w-full mx-auto py-6 px-4 sm:px-6 lg:px-8">{header}</NavLink>
                </header>
            )}

            <main /*className='z-10 relative'*/>{children}</main>
            <footer className="absolute bottom-0 text-0.75rem sm:0.75rem md:text-0.75rem lg:text-1rem w-full py-4 flex justify-center text-white">
                    SneakerLand © 2024
                </footer>
        </div>
    );
}
