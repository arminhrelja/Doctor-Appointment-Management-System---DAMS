import React from 'react';
import Header from '../../components/Header';
import DoctorSidebar from '../../components/DoctorSidebar';
import { DollarSign, Calendar, User } from 'lucide-react';

const DoctorDashboard: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex flex-1">
        <DoctorSidebar />
        <main className="flex-1 p-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="bg-white p-4 text-center border rounded-lg shadow-md flex flex-col items-center">
              <DollarSign className="text-blue-500 mb-2" size={32} />
              <h2 className="text-3xl font-bold">$80</h2>
              <p className="text-gray-600">Earnings</p>
            </div>
            <div className="bg-white p-4 text-center border rounded-lg shadow-md flex flex-col items-center">
              <Calendar className="text-green-500 mb-2" size={32} />
              <h2 className="text-3xl font-bold">4</h2>
              <p className="text-gray-600">Appointments</p>
            </div>
            <div className="bg-white p-4 text-center border rounded-lg shadow-md flex flex-col items-center">
              <User className="text-yellow-500 mb-2" size={32} />
              <h2 className="text-3xl font-bold">2</h2>
              <p className="text-gray-600">Patients</p>
            </div>
          </div>
          <div className="mt-8">
            <h2 className="text-xl font-bold mb-4">Latest Bookings</h2>
            <ul className="space-y-4">
              <li className="flex justify-between items-center p-4 border rounded">
                <div>
                  <p className="font-bold">Avinash Kr</p>
                  <p className="text-gray-600">Booking on 5 Oct 2024</p>
                </div>
                <span className="bg-red-100 text-red-700 px-2 py-1 rounded">Cancelled</span>
              </li>
              <li className="flex justify-between items-center p-4 border rounded">
                <div>
                  <p className="font-bold">GreatStack</p>
                  <p className="text-gray-600">Booking on 26 Sep 2024</p>
                </div>
                <span className="bg-green-100 text-green-700 px-2 py-1 rounded">Completed</span>
              </li>
              <li className="flex justify-between items-center p-4 border rounded">
                <div>
                  <p className="font-bold">GreatStack</p>
                  <p className="text-gray-600">Booking on 25 Sep 2024</p>
                </div>
                <span className="bg-green-100 text-green-700 px-2 py-1 rounded">Completed</span>
              </li>
              <li className="flex justify-between items-center p-4 border rounded">
                <div>
                  <p className="font-bold">GreatStack</p>
                  <p className="text-gray-600">Booking on 23 Sep 2024</p>
                </div>
                <span className="bg-green-100 text-green-700 px-2 py-1 rounded">Completed</span>
              </li>
            </ul>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DoctorDashboard;