import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { Home, Calendar, UserPlus, Users, User, ClipboardList, UserCheck } from 'lucide-react';

const AdminDashboard: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex flex-1">
        <aside className="w-64 bg-gray-100 p-4">
          <nav>
            <ul className="space-y-8 text-2xl">
              <li><Link to="/admin/dashboard" className="text-gray-700 flex items-center"><Home className="mr-2" size={24} />Dashboard</Link></li>
              <li><Link to="/admin/appointments" className="text-gray-700 flex items-center"><Calendar className="mr-2" size={24} />Appointments</Link></li>
              <li><Link to="/admin/add-doctor" className="text-gray-700 flex items-center"><UserPlus className="mr-2" size={24} />Add Doctor</Link></li>
              <li><Link to="/admin/doctors-list" className="text-gray-700 flex items-center"><Users className="mr-2" size={24} />Doctors List</Link></li>
            </ul>
          </nav>
        </aside>
        <main className="flex-1 p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Dashboard</h1>
          </div>
          <div className="grid grid-cols-3 gap-6 mb-6 max-w-4xl">
            <div className="bg-white p-4 text-center border rounded flex flex-col items-center">
              <User className="text-blue-500 mb-2" size={32} />
              <h2 className="text-3xl font-bold">15</h2>
              <p className="text-gray-600">Doctors</p>
            </div>
            <div className="bg-white p-4 text-center border rounded flex flex-col items-center">
              <ClipboardList className="text-green-500 mb-2" size={32} />
              <h2 className="text-3xl font-bold">6</h2>
              <p className="text-gray-600">Appointments</p>
            </div>
            <div className="bg-white p-4 text-center border rounded flex flex-col items-center">
              <UserCheck className="text-yellow-500 mb-2" size={32} />
              <h2 className="text-3xl font-bold">3</h2>
              <p className="text-gray-600">Patients</p>
            </div>
          </div>
          <div className="max-w-2xl">
            <h2 className="text-xl font-bold mb-4">Latest Bookings</h2>
            <ul className="space-y-4">
              <li className="flex justify-between items-center p-4 border rounded">
                <div>
                  <p className="font-bold">Dr. Richard James</p>
                  <p className="text-gray-600">Booking on 5 Oct 2024</p>
                </div>
                <span className="bg-red-100 text-red-700 px-2 py-1 rounded">Cancelled</span>
              </li>
              <li className="flex justify-between items-center p-4 border rounded">
                <div>
                  <p className="font-bold">Dr. Richard James</p>
                  <p className="text-gray-600">Booking on 26 Sep 2024</p>
                </div>
                <span className="bg-red-100 text-red-700 px-2 py-1 rounded">Cancelled</span>
              </li>
              <li className="flex justify-between items-center p-4 border rounded">
                <div>
                  <p className="font-bold">Dr. Christopher Davis</p>
                  <p className="text-gray-600">Booking on 23 Sep 2024</p>
                </div>
                <span className="bg-green-100 text-green-700 px-2 py-1 rounded">Completed</span>
              </li>
              <li className="flex justify-between items-center p-4 border rounded">
                <div>
                  <p className="font-bold">Dr. Richard James</p>
                  <p className="text-gray-600">Booking on 25 Sep 2024</p>
                </div>
                <span className="bg-green-100 text-green-700 px-2 py-1 rounded">Completed</span>
              </li>
              <li className="flex justify-between items-center p-4 border rounded">
                <div>
                  <p className="font-bold">Dr. Richard James</p>
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

export default AdminDashboard;