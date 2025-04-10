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
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex flex-1">
        <DoctorSidebar />
        <main className="flex-1 p-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
                      {!doctor ? (
                          <p>Loading...</p>
                      ) : !isEditing ? (
                          <>
                              <img src="assets/doctor-img.png" alt="Doctor" className="w-32 h-32 rounded-full object-cover mb-4" />"
                              <h1 className="text-2xl font-bold">{doctor.firstName} {doctor.lastName}</h1>
                              <p className="text-gray-600">{doctor.speciality}</p>
                              <p className="text-gray-600">{doctor.experience} Years</p>
                              <div className="mt-6">
                                  <h2 className="text-lg font-bold">About:</h2>
                                  <p className="text-gray-700 mt-2">{doctor.about}</p>
                              </div>
                              <div className="mt-6">
                                  <h2 className="text-lg font-bold">Appointment Fee:</h2>
                                  <p className="text-gray-700 mt-2">{doctor.fee} BAM</p>
                                  </div>
                                  <div className="mt-6">
                                      <button onClick={() =>
                                          setIsEditing(true)} className="px-6 py-2 bg-blue-600 
                                                                        text-white rounded hover:bg-blue-700">
                                        Edit
                                      </button>
                                  </div>
                          </>
                      ) : (
                          <form className="space-y-4" onSubmit={handleUpdate}>
                              <input className="p-2 border rounded w-full" value={formData.firstName} onChange={(e) => setFormData({ ...formData, firstName: e.target.value })} />
                              <input className="p-2 border rounded w-full" value={formData.lastName} onChange={(e) => setFormData({ ...formData, lastName: e.target.value })} />
                              <input className="p-2 border rounded w-full" value={formData.speciality} onChange={(e) => setFormData({ ...formData, speciality: e.target.value })} />
                              <input type="number" className="p-2 border rounded w-full" value={formData.experience} onChange={(e) => setFormData({ ...formData, experience: e.target.value })} />
                              <textarea className="p-2 border rounded w-full" value={formData.about} onChange={(e) => setFormData({ ...formData, about: e.target.value })} />
                              <input type="number" className="p-2 border rounded w-full" value={formData.fee} onChange={(e) => setFormData({ ...formData, fee: e.target.value })} />
                              <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded">Save</button>
                          </form>
                      )}

          </div>
        </main>
      </div>
    </div>
  );
};

export default DoctorProfile;
