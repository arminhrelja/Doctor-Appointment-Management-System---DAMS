import React from 'react';
import Header from '../components/Header';
import AdminSidebar from '@/components/AdminSidebar';

const doctors = [
  { name: "Dr. Richard James", specialty: "Cardiology", about: "Lorem ipsum dolor sit amet, consectetur adipiscing elit." },
  { name: "Dr. Emily Larson", specialty: "Neurology", about: "Lorem ipsum dolor sit amet, consectetur adipiscing elit." },
  { name: "Dr. Sarah Patel", specialty: "Pulmonology", about: "Lorem ipsum dolor sit amet, consectetur adipiscing elit." },
  { name: "Dr. Christopher Lee", specialty: "Pediatrics", about: "Lorem ipsum dolor sit amet, consectetur adipiscing elit." },
  { name: "Dr. Jennifer Garcia", specialty: "Oncology", about: "Lorem ipsum dolor sit amet, consectetur adipiscing elit." },
  { name: "Dr. Christopher Davis", specialty: "Infectious Diseases", about: "Lorem ipsum dolor sit amet, consectetur adipiscing elit." },
  { name: "Dr. Timothy White", specialty: "Dermatology", about: "Lorem ipsum dolor sit amet, consectetur adipiscing elit." },
  { name: "Dr. Ava Mitchell", specialty: "Psychiatry", about: "Lorem ipsum dolor sit amet, consectetur adipiscing elit." },
  { name: "Dr. Jeremy King", specialty: "Gynecology", about: "Lorem ipsum dolor sit amet, consectetur adipiscing elit." },
];

const DoctorList: React.FC = () => {
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
            {doctors.map((doctor, index) => (
              <div key={index} className="relative group bg-white border rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden h-96">
                <div className="w-full h-full">
                  <img src="/assets/doctor-img.png" alt={doctor.name} className="w-full h-full object-cover" />
                </div>
                <div className="absolute top-0 left-0 bg-gray-800 text-white p-2">
                  <p className="font-semibold">{doctor.specialty}</p>
                  <h2 className="text-lg font-bold">{doctor.name}</h2>
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gray-800 text-white p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <p>{doctor.about}</p>
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