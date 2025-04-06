import React from 'react';
import Header from '../../components/Header';
import DoctorSidebar from '../../components/DoctorSidebar';

const DoctorProfile: React.FC = () => {
  const doctor = {
    name: "Dr. Richard James",
    specialty: "MBBS - General Physician",
    experience: "4 Years",
    about:
      "Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.",
    appointmentFee: "$50",
    address: "24 Main Street, 10 Clause Road"
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex flex-1">
        <DoctorSidebar />
        <main className="flex-1 p-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center space-x-6">
              <img
                src="/assets/doctor-img.png"
                alt={doctor.name}
                className="w-32 h-32 rounded-lg object-cover"
              />
              <div>
                <h1 className="text-2xl font-bold">{doctor.name}</h1>
                <p className="text-gray-600">{doctor.specialty}</p>
                <p className="text-gray-600">{doctor.experience}</p>
              </div>
            </div>
            <div className="mt-6">
              <h2 className="text-lg font-bold">About:</h2>
              <p className="text-gray-700 mt-2">{doctor.about}</p>
            </div>
            <div className="mt-6">
              <h2 className="text-lg font-bold">Appointment Fee:</h2>
              <p className="text-gray-700 mt-2">{doctor.appointmentFee}</p>
            </div>
            <div className="mt-6">
              <h2 className="text-lg font-bold">Address:</h2>
              <p className="text-gray-700 mt-2">{doctor.address}</p>
            </div>
            <div className="mt-6">
              <button className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                Edit
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DoctorProfile;