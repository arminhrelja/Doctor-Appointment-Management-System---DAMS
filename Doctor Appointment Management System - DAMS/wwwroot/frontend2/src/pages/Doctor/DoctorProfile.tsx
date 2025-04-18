/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import DoctorSidebar from '../../components/DoctorSidebar';
import { toast } from "sonner";



const DoctorProfile: React.FC = () => {
    const [doctor, setDoctor] = useState<any>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        speciality: "",
        experience: "",
        about: "",
        fee: ""
    });

    const userId = localStorage.getItem("userId");

    useEffect(() => {
        const fetchDoctor = async () => {
            try {
                const res = await fetch(`https://localhost:7036/api/Doctor/${userId}`);
                const data = await res.json();
                console.log(data);
                setDoctor(data);
                setFormData({
                    firstName: data.firstName,
                    lastName: data.lastName,
                    speciality: data.speciality,
                    experience: data.experience,
                    about: data.about,
                    fee: data.fee
                });
            } catch (error) {
                toast.error("Failed to fetch doctor data");
            }
        };

        fetchDoctor();
    }, [userId]);

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await fetch(`https://localhost:7036/api/Doctor/update/${userId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    ...formData,
                    experience: Number(formData.experience),
                    fee: Number(formData.fee)
                })
            });

            if (!res.ok) {
                throw new Error("Failed to update doctor");
            }

            const updated = await res.json();
            setDoctor(updated.updatedDoctor);
            setFormData({
                firstName: updated.updatedDoctor.firstName,
                lastName: updated.updatedDoctor.lastName,
                speciality: updated.updatedDoctor.speciality,
                experience: updated.updatedDoctor.experience,
                about: updated.updatedDoctor.about,
                fee: updated.updatedDoctor.fee
            });
            setIsEditing(false);
            toast.success("Profile successfully updated!");
        } catch (err) {
            toast.error("Update of the profile did not complete!");
        }
    };

    return (
        <div className="flex flex-col min-h-screen bg-gray-100">
            <Header />
            <div className="flex flex-1">
                <DoctorSidebar />
                <main className="flex-1 p-6">
                    <div className="bg-white p-6 rounded-lg shadow-md w-full h-full">
                        {!doctor ? (
                            <p>Loading...</p>
                        ) : !isEditing ? (
                            <>
                                <div className="flex items-center mb-6">
                                    <img
                                        src="/assets/doctor-img.png" // Ispravljena putanja
                                        alt="Doctor"
                                        className="w-32 h-32 rounded-full object-cover mr-6"
                                    />
                                    <div>
                                        <h1 className="text-3xl font-bold text-gray-800">
                                            {doctor.firstName} {doctor.lastName}
                                        </h1>
                                        <p className="text-gray-600 text-lg">{doctor.speciality}</p>
                                        <p className="text-gray-600">{doctor.experience} Years</p>
                                        <p className="text-blue-700 text-lg font-semibold">Institution: {doctor.institutionName || 'Unknown'}</p>
                                    </div>
                                </div>
                                <div className="mt-6">
                                    <h2 className="text-xl font-bold text-gray-800">About:</h2>
                                    <p className="text-gray-700 mt-2">{doctor.about}</p>
                                </div>
                                <div className="mt-6">
                                    <h2 className="text-xl font-bold text-gray-800">
                                        Appointment Fee:
                                    </h2>
                                    <p className="text-gray-700 mt-2">{doctor.fee} BAM</p>
                                </div>



                                <div className="mt-6">
                                    <button
                                        onClick={() => setIsEditing(true)}
                                        className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                                    >
                                        Edit
                                    </button>
                                </div>
                            </>
                        ) : (
                            <form className="space-y-4" onSubmit={handleUpdate}>
                                <div>
                                    <label htmlFor="firstName" className="block text-gray-700 font-medium mb-1">
                                        First Name
                                    </label>
                                    <input
                                        id="firstName"
                                        className="p-2 border rounded w-full"
                                        value={formData.firstName}
                                        onChange={(e) =>
                                            setFormData({ ...formData, firstName: e.target.value })
                                        }
                                    />
                                </div>
                                <div>
                                    <label htmlFor="lastName" className="block text-gray-700 font-medium mb-1">
                                        Last Name
                                    </label>
                                    <input
                                        id="lastName"
                                        className="p-2 border rounded w-full"
                                        value={formData.lastName}
                                        onChange={(e) =>
                                            setFormData({ ...formData, lastName: e.target.value })
                                        }
                                    />
                                </div>
                                <div>
                                    <label htmlFor="speciality" className="block text-gray-700 font-medium mb-1">
                                        Speciality
                                    </label>
                                    <input
                                        id="speciality"
                                        className="p-2 border rounded w-full"
                                        value={formData.speciality}
                                        onChange={(e) =>
                                            setFormData({ ...formData, speciality: e.target.value })
                                        }
                                    />
                                </div>
                                <div>
                                    <label htmlFor="experience" className="block text-gray-700 font-medium mb-1">
                                        Experience (Years)
                                    </label>
                                    <input
                                        id="experience"
                                        type="number"
                                        className="p-2 border rounded w-full"
                                        value={formData.experience}
                                        onChange={(e) =>
                                            setFormData({ ...formData, experience: e.target.value })
                                        }
                                    />
                                </div>
                                <div>
                                    <label htmlFor="about" className="block text-gray-700 font-medium mb-1">
                                        About
                                    </label>
                                    <textarea
                                        id="about"
                                        className="p-2 border rounded w-full"
                                        value={formData.about}
                                        onChange={(e) =>
                                            setFormData({ ...formData, about: e.target.value })
                                        }
                                    />
                                </div>
                                <div>
                                    <label htmlFor="fee" className="block text-gray-700 font-medium mb-1">
                                        Appointment Fee (BAM)
                                    </label>
                                    <input
                                        id="fee"
                                        type="number"
                                        className="p-2 border rounded w-full"
                                        value={formData.fee}
                                        onChange={(e) =>
                                            setFormData({ ...formData, fee: e.target.value })
                                        }
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                                >
                                    Save
                                </button>
                            </form>
                        )}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default DoctorProfile;
