import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function Header() {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const isLoggedIn = !!token;
    const [roles, setRoles] = useState<string[]>([]);
    const [currentRole, setCurrentRole] = useState<string | null>(localStorage.getItem("role"));

    useEffect(() => {
        const fetchRoles = async () => {
            if (!token) return;
            const res = await fetch("https://localhost:7036/api/Role/available-roles", {
                headers: { Authorization: `Bearer ${token}` },
            });
            if (res.ok) {
                const data = await res.json();
                setRoles(data);
                console.log("[DEBUG] roles from backend:", data);
            } else {
                console.log("[DEBUG] roles fetch failed", res.status);
            }
        };
        fetchRoles();
    }, [token]);

    const handleRoleSwitch = async (role: string) => {
        if (!token) return;
        const res = await fetch("https://localhost:7036/api/Role/switch-role", {
            method: "POST",
            headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
            body: JSON.stringify(role),
        });
        if (res.ok) {
            setCurrentRole(role);
            localStorage.setItem("role", role);
            // Redirect user based on new role
            if (role.toLowerCase() === "admin") {
                navigate("/admin/dashboard");
            } else if (role.toLowerCase() === "doctor" || role.toLowerCase() === "doktor") {
                navigate("/doctor/dashboard");
            } else {
                navigate("/"); // Patient or any other role
            }
        }
    };

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
                        </div>
                        <div className="flex items-center gap-4">
                            <nav aria-label="Global">
                                <ul className="flex items-center gap-4 text-lg">
                                    <li>
                                        <Link className="text-gray-500 transition hover:text-gray-500/75" to="/"> Home </Link>
                                    </li>

                                    <li>
                                        <Link className="text-gray-500 transition hover:text-gray-500/75" to="/all-doctors"> All Doctors </Link>
                                    </li>
                                    <li>
                                        <Link className="text-gray-500 transition hover:text-gray-500/75" to="/patient/my-appointments"> My Appointments </Link>
                                    </li>
                                    <li>
                                        <Link className="text-gray-500 transition hover:text-gray-500/75" to="/patient/medical-records"> My Medical Records </Link>
                                    </li>
                                    <li>
                                        <Link className="text-gray-500 transition hover:text-gray-500/75" to="/ai/department-recommendation">AI Specialist</Link>
                                    </li>
                                    <li>
                                        <Link className="text-gray-500 transition hover:text-gray-500/75" to="/ai/risk-prediction">AI Risk Prediction</Link>
                                    </li>
                                </ul>
                            </nav>
                            <div className="sm:flex sm:gap-1 items-center">
                                {isLoggedIn && (
                                    <>
                                        <div className="relative inline-block text-left ml-2">
                                            <details className="group">
                                                <summary className="flex items-center px-3 py-1 bg-gray-100 text-blue-700 rounded shadow-sm border border-gray-200 text-sm font-semibold hover:bg-blue-50 cursor-pointer select-none">
                                                    {currentRole || 'No Role'}
                                                    {roles.length > 1 && (
                                                        <svg className="w-4 h-4 ml-1 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                                                        </svg>
                                                    )}
                                                </summary>
                                                {roles.length > 1 && (
                                                    <div className="absolute right-0 z-10 mt-2 w-36 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 border border-gray-200">
                                                        {roles.filter((role) => role !== currentRole).map((role) => (
                                                            <button
                                                                key={role}
                                                                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-blue-100 hover:text-blue-700"
                                                                onClick={() => handleRoleSwitch(role)}
                                                            >
                                                                Switch to {role}
                                                            </button>
                                                        ))}
                                                    </div>
                                                )}
                                            </details>
                                        </div>
                                        <button className="rounded-md bg-blue-700 px-5 py-2.5 text-lg font-medium text-white shadow-sm cursor-pointer ml-2" onClick={handleLogout}>
                                            Logout
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        </div>
    );
}

export default Header;