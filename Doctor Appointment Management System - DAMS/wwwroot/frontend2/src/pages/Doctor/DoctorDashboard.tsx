import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import DoctorSidebar from '../../components/DoctorSidebar';
import { DollarSign, Calendar, User } from 'lucide-react';

const DoctorDashboard: React.FC = () => {
  const [latestBookings, setLatestBookings] = useState<any[]>([]);

  useEffect(() => {
    const fetchLatestBookings = async () => {
      try {
        const response = await fetch('https://localhost:7036/api/Appointment/list');
        const data = await response.json();
        const doctorId = localStorage.getItem('userId');
        const filteredData = data.filter((booking: any) => doctorId && booking.doctor.userId === parseInt(doctorId));
        const sortedData = filteredData.sort((a: any, b: any) => new Date(b.appointmentDate).getTime() - new Date(a.appointmentDate).getTime());
        setLatestBookings(sortedData.slice(0, 5));
      } catch (error) {
        console.error('Error fetching latest bookings:', error);
      }
    };

    fetchLatestBookings();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header />
      <div className="flex flex-1">
        <DoctorSidebar />
        <main className="flex-1 p-6 flex flex-col items-center">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3 w-full max-w-5xl mb-8">
            <div className="bg-white p-6 text-center border rounded-lg shadow-md flex flex-col items-center">
              <DollarSign className="text-blue-500 mb-2" size={32} />
              <h2 className="text-3xl font-bold">$80</h2>
              <p className="text-gray-600">Earnings</p>
            </div>
            <div className="bg-white p-6 text-center border rounded-lg shadow-md flex flex-col items-center">
              <Calendar className="text-green-500 mb-2" size={32} />
              <h2 className="text-3xl font-bold">4</h2>
              <p className="text-gray-600">Appointments</p>
            </div>
            <div className="bg-white p-6 text-center border rounded-lg shadow-md flex flex-col items-center">
              <User className="text-yellow-500 mb-2" size={32} />
              <h2 className="text-3xl font-bold">2</h2>
              <p className="text-gray-600">Patients</p>
            </div>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-3xl">
            <h2 className="text-2xl font-bold mb-4 text-blue-700">Latest Bookings</h2>
            <ul className="space-y-4">
              {latestBookings.length === 0 && (
                <li className="text-gray-500 text-lg">No bookings found.</li>
              )}
              {latestBookings.map((booking) => (
                <li key={booking.appointmentId} className="flex justify-between items-center p-4 border rounded-lg shadow-sm bg-gray-50">
                  <div className="flex items-center gap-4">
                    <img src="/assets/doctor-img.png" alt="Doctor" className="w-14 h-14 rounded-full object-cover border-2 border-blue-200" />
                    <div>
                      <p className="font-bold text-blue-700">{booking.patient.firstName} {booking.patient.lastName}</p>
                      <p className="text-gray-600">Booking on {new Date(booking.appointmentDate).toLocaleString()}</p>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-lg font-semibold ${booking.status === 'Cancelled' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                    {booking.status}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DoctorDashboard;