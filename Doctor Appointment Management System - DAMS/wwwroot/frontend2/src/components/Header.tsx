import { Link, useNavigate } from "react-router-dom";

function Header() {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    const isLoggedIn = !!token;


    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        navigate("/");
    };

    return (
        <div>
            <header className="bg-gray-50 shadow-sm">
                <div className="mx-auto max-w-screen-l px-4 sm:px-6 lg:px-8">
                    <div className="flex h-30 items-center justify-between">
                        <div className="md:flex md:items-center md:gap-12">
                            <Link to="/" className="flex gap-5 text-blue-700 text-3xl font-bold">
                                <span className="sr-only">Home</span>
                                <svg width="70" height="40" viewBox="0 0 70 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M37.2551 1.61586C38.1803 0.653384 39.4368 0.112671 40.7452 0.112671C46.6318 0.112671 52.1793 0.112674 57.6424 0.112685C68.6302 0.112708 74.1324 13.9329 66.3629 22.0156L49.4389 39.6217C48.662 40.43 47.3335 39.8575 47.3335 38.7144V23.2076L49.2893 21.1729C50.8432 19.5564 49.7427 16.7923 47.5451 16.7923H22.6667L37.2551 1.61586Z" fill="#3A04FF"></path>
                                    <path d="M32.7449 38.3842C31.8198 39.3467 30.5633 39.8874 29.2549 39.8874C23.3683 39.8874 17.8208 39.8874 12.3577 39.8874C1.36983 39.8873 -4.13236 26.0672 3.63721 17.9844L20.5612 0.378369C21.3381 -0.429908 22.6666 0.142547 22.6666 1.28562L22.6667 16.7923L20.7108 18.8271C19.1569 20.4437 20.2574 23.2077 22.455 23.2077L47.3335 23.2076L32.7449 38.3842Z" fill="#3A04FF"></path>
                                </svg>
                                <p>DAMS</p>
                            </Link>
                            <a className="flex gap-5 text-blue-700 text-3xl font-bold" href="#">
                                
                            </a>
                        </div>

                        <div className="hidden md:block">
                            <nav aria-label="Global">
                                <ul className="flex items-center gap-6 text-xl">
                                    <li>
                                        <a className="text-gray-500 transition hover:text-gray-500/75" href="#"> About </a>
                                    </li>

                                    <li>
                                        <a className="text-gray-500 transition hover:text-gray-500/75" href="#"> Careers </a>
                                    </li>

                                    <li>
                                        <a className="text-gray-500 transition hover:text-gray-500/75" href="#"> History </a>
                                    </li>

                                    <li>
                                        <a className="text-gray-500 transition hover:text-gray-500/75" href="#"> Services </a>
                                    </li>

                                    <li>
                                        <a className="text-gray-500 transition hover:text-gray-500/75" href="#"> Projects </a>
                                    </li>

                                    <li>
                                        <a className="text-gray-500 transition hover:text-gray-500/75" href="#"> Blog </a>
                                    </li>
                                </ul>
                            </nav>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="sm:flex sm:gap-4">
                                {!isLoggedIn && (
                                    <>
                                        <Link className="rounded-md bg-blue-700 px-5 py-2.5 text-lg font-medium text-white shadow-sm" to="/login">
                                            Login
                                        </Link>
                                        <div className="hidden sm:flex">
                                            <Link className="rounded-md bg-gray-100 px-5 py-2.5 text-lg font-medium text-blue-700" to="/register">
                                                Register
                                            </Link>
                                        </div>
                                    </>
                                )}
                                {isLoggedIn && (
                                    <button className="rounded-md bg-blue-700 px-5 py-2.5 text-lg font-medium text-white shadow-sm cursor-pointer" onClick={handleLogout}>
                                        Logout
                                    </button>
                                )}
                            </div>

                            <div className="block md:hidden">
                                <button className="rounded-sm bg-gray-100 p-2 text-gray-600 transition hover:text-gray-600/75">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        </div>
    );
}

export default Header;