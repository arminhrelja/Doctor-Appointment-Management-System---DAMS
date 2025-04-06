import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import AdminSidebar from '@/components/AdminSidebar';

type Doctor = {
    userId: number;
    firstName: string;
    lastName: string;
    speciality: string;
    about: string;
    experience: number;
    fee: number;
};

const DoctorList: React.FC = () => {
    const [doctors, setDoctors] = useState<Doctor[]>([]);

    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const res = await fetch("https://localhost:7036/api/Doctor/list");
                const data = await res.json();
                setDoctors(data);
            } catch (error) {
                console.error("Error fetching doctors:", error);
            }
        };

        fetchDoctors();
    }, []);

    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <div className="flex flex-1">
                <AdminSidebar />
                <main className="flex-1 p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-2xl font-bold">All Doctors</h1>
                    </div>
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-4">
                        {doctors.map((doctor) => (
                            <div key={doctor.userId} className="relative group bg-white border rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden h-96">
                                <div className="w-full h-full">
                                    <img src="/assets/doctor-img.png" alt={`${doctor.firstName} ${doctor.lastName}`} className="w-full h-full object-cover" />
                                </div>
                                <div className="absolute top-0 left-0 bg-gray-800 text-white p-2">
                                    <p className="font-semibold">{doctor.speciality}</p>
                                    <h2 className="text-lg font-bold">{`Dr. ${doctor.firstName} ${doctor.lastName}`}</h2>
                                </div>
                                <div className="absolute bottom-0 left-0 right-0 bg-gray-800 text-white p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                                    <p className="mb-1">{doctor.about}</p>
                                    <p className="text-sm">Experience: {doctor.experience} {doctor.experience === 1 ? "year" : "years"}</p>
                                    <p className="text-sm">Fee: ${doctor.fee}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default DoctorList;
