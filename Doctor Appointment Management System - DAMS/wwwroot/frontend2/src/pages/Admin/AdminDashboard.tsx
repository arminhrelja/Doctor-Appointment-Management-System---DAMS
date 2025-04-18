import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import AdminSidebar from '@/components/AdminSidebar';

const AdminDashboard: React.FC = () => {
  const [latestBookings, setLatestBookings] = useState<any[]>([]);

  useEffect(() => {
    const fetchLatestBookings = async () => {
      try {
        const response = await fetch('https://localhost:7036/api/Appointment/list');
        const data = await response.json();
        const sortedData = data.sort((a: any, b: any) => new Date(b.appointmentDate).getTime() - new Date(a.appointmentDate).getTime());
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
        <AdminSidebar />
        <main className="flex-1 p-6 flex flex-col items-center">
          <h1 className="text-3xl font-bold mb-8 text-blue-700">Admin Dashboard</h1>
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

export default AdminDashboard;