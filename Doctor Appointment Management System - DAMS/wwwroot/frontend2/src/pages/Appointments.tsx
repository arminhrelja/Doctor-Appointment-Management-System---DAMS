import React from 'react';
import Header from '../components/Header';
import AdminSidebar from '@/components/AdminSidebar';

const Appointments: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex flex-1">
        <AdminSidebar />
        <main className="flex-1 p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Appointments</h1>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead>
                <tr>
                  <th className="py-3 px-6 border-b text-left">#</th>
                  <th className="py-3 px-6 border-b text-left">Patient</th>
                  <th className="py-3 px-6 border-b text-left">Age</th>
                  <th className="py-3 px-6 border-b text-left">Date & Time</th>
                  <th className="py-3 px-6 border-b text-left">Doctor</th>
                  <th className="py-3 px-6 border-b text-left">Fees</th>
                  <th className="py-3 px-6 border-b text-left">Action</th>
                </tr>
              </thead>
              <tbody className="text-lg">
                <tr>
                  <td className="py-4 px-6 border-b">1</td>
                  <td className="py-4 px-6 border-b">Avinash Kr</td>
                  <td className="py-4 px-6 border-b">31</td>
                  <td className="py-4 px-6 border-b">5 Oct 2024, 12:00 PM</td>
                  <td className="py-4 px-6 border-b">Dr. Richard James</td>
                  <td className="py-4 px-6 border-b">$50</td>
                  <td className="py-4 px-6 border-b text-red-500">Cancelled</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 border-b">2</td>
                  <td className="py-4 px-6 border-b">GreatStack</td>
                  <td className="py-4 px-6 border-b">24</td>
                  <td className="py-4 px-6 border-b">26 Sep 2024, 11:00 AM</td>
                  <td className="py-4 px-6 border-b">Dr. Richard James</td>
                  <td className="py-4 px-6 border-b">$40</td>
                  <td className="py-4 px-6 border-b text-red-500">Cancelled</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 border-b">3</td>
                  <td className="py-4 px-6 border-b">GreatStack</td>
                  <td className="py-4 px-6 border-b">24</td>
                  <td className="py-4 px-6 border-b">23 Sep 2024, 01:00 PM</td>
                  <td className="py-4 px-6 border-b">Dr. Christopher Davis</td>
                  <td className="py-4 px-6 border-b">$50</td>
                  <td className="py-4 px-6 border-b text-green-500">Completed</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 border-b">4</td>
                  <td className="py-4 px-6 border-b">GreatStack</td>
                  <td className="py-4 px-6 border-b">24</td>
                  <td className="py-4 px-6 border-b">25 Sep 2024, 02:00 PM</td>
                  <td className="py-4 px-6 border-b">Dr. Richard James</td>
                  <td className="py-4 px-6 border-b">$40</td>
                  <td className="py-4 px-6 border-b text-green-500">Completed</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 border-b">5</td>
                  <td className="py-4 px-6 border-b">GreatStack</td>
                  <td className="py-4 px-6 border-b">24</td>
                  <td className="py-4 px-6 border-b">23 Sep 2024, 11:00 AM</td>
                  <td className="py-4 px-6 border-b">Dr. Richard James</td>
                  <td className="py-4 px-6 border-b">$40</td>
                  <td className="py-4 px-6 border-b text-green-500">Completed</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 border-b">6</td>
                  <td className="py-4 px-6 border-b">GreatStack</td>
                  <td className="py-4 px-6 border-b">24</td>
                  <td className="py-4 px-6 border-b">22 Sep 2024, 06:00 PM</td>
                  <td className="py-4 px-6 border-b">Dr. Emily Larson</td>
                  <td className="py-4 px-6 border-b">$60</td>
                  <td className="py-4 px-6 border-b text-green-500">Completed</td>
                </tr>
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Appointments;