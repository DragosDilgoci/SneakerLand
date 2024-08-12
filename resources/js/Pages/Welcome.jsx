import { Link, Head } from '@inertiajs/react';
import Countdown from '@/Components/Countdown';

export default function Welcome({ auth, laravelVersion, phpVersion }) {
    return (
        <>
            <Head title="SneakerLand - Summer Sale" />
            <div className="relative min-h-screen flex flex-col bg-gray-50 text-black/50 dark:bg-black dark:text-white/50">
                <img
                    id="background"
                    className="absolute top-0 h-full w-full object-cover"
                    src="https://www.pixelstalk.net/wp-content/uploads/2016/10/Justice-in-funding-mission-pre-conference-registra.jpg"
                    alt="Background"
                />

                <header className="fixed top-0 right-0 p-6 z-10">
                    <nav className="flex space-x-4">
                        {auth.user ? (
                            <Link
                                href={route('dashboard')}
                                className="rounded-md px-3 py-2 text-customLightblue ring-1 ring-transparent transition hover:text-customPurple focus:outline-none"
                            >
                                Home
                            </Link>
                        ) : (
                            <>
                                <Link>
                                    <div className="fixed left-5 w-44 lg:w-64 md:w-56 sm:w-44 drop-shadow-logo">
                                        <img
                                        src="https://i.imgur.com/VfOdqlJ.png"
                                        alt="sales"
                                        className="w-full h-auto"
                                        />
                                    </div>
                                </Link>
                                <Link
                                    href={route('login')}
                                    className="rounded-md px-3 py-2 text-1rem sm:text-1rem md:text-1rem lg:text-1rem bg-customPurple text-customLightblue ring-1 ring-transparent transition duration-500 ease-in-out hover:bg-customLightblue/70 hover:text-customPurple/70 focus:outline-none"
                                >
                                    Log in
                                </Link>
                                <Link
                                    href={route('register')}
                                    className="rounded-md px-3 py-2 text-1rem sm:text-1rem md:text-1rem lg:text-1rem bg-customLightblue text-customPurple ring-1 ring-transparent transition duration-500 ease-in-out hover:bg-customPurple/70 hover:text-customLightblue/70 focus:outline-none"
                                >
                                    Register
                                </Link>
                            </>
                        )}
                    </nav>
                </header>

                <main className="flex flex-col items-center justify-center md:flex-1 md:flex-row md:items-center md:justify-between lg:flex-1 lg:flex-row lg:items-center lg:justify-between">
                    <div className="relative sm:relative lg:fixed md:fixed right-0 max-w-[75vw] lg:max-w-[40vw] md:max-w-[40vw] drop-shadow-image mt-32 md:mt-auto lg:mt-auto mb-20 lg:mb-0 md:mb-0">
                        <img
                            src="https://i.imgur.com/H7nuFkj.png"
                            alt="sales"
                            
                        />
                    </div>
                    <div className="relative md:fixed lg:fixed top-2/4 md:top-1/3 lg:top-33% w-11/12 md:w-3/5 lg:w-3/5 left-0 transform -translate-y-1/2 pl-[5vw] z-10">
                        <div className="text-white tracking-tight text-1.25rem sm:text-1.25rem md:text-2rem lg:text-2.25rem md:mt-80 lg:mt-80 font-normal">
                            🌞<b>Summer Sneaker Sale!</b>🌞
                            Cool off with hot deals! Save up to 50% on the latest styles and top brands. Sign in now and step into summer in style!
                        </div>
                    </div>
                    <div className="relative lg:fixed md:fixed top-3/4 w-11/12 transform -translate-y-3/4 pl-[5vw] z-10">
                        <div className="font-normal text-1.5rem sm:text-1.5rem md:text-2rem lg:text-2rem mt-60 text-white drop-shadow-glow">
                            Time left:
                            <Countdown />
                        </div>
                    </div>
                    
                </main>

                <footer className="absolute bottom-0 text-0.75rem sm:0.75rem md:text-0.75rem lg:text-1rem w-full py-4 flex justify-center text-white">
                    SneakerLand © 2024
                </footer>
            </div>
        </>
    );
}
