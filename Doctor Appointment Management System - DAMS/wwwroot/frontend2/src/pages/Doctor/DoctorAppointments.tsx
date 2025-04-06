import React from 'react';
import Header from '../../components/Header';
import DoctorSidebar from '../../components/DoctorSidebar';

const DoctorAppointments: React.FC = () => {
  const appointments = [
    {
      id: 0,
      patient: "Avinash Kr",
      payment: "CASH",
      age: 31,
      dateTime: "5 Oct 2024, 12:00 PM",
      fees: "$50",
      status: "Cancelled",
    },
    {
      id: 1,
      patient: "GreatStack",
      payment: "CASH",
      age: 24,
      dateTime: "26 Sep 2024, 11:00 AM",
      fees: "$40",
      status: "Completed",
    },
    {
      id: 2,
      patient: "GreatStack",
      payment: "CASH",
      age: 24,
      dateTime: "25 Sep 2024, 02:00 PM",
      fees: "$40",
      status: "Completed",
    },
    {
      id: 3,
      patient: "GreatStack",
      payment: "CASH",
      age: 24,
      dateTime: "23 Sep 2024, 11:00 AM",
      fees: "$40",
      status: "Completed",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex flex-1">
        <DoctorSidebar />
        <main className="flex-1 p-6">
          <h1 className="text-2xl font-bold mb-6">All Appointments</h1>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border rounded-lg shadow-md">
              <thead>
                <tr>
                  <th className="py-3 px-6 border-b text-left">#</th>
                  <th className="py-3 px-6 border-b text-left">Patient</th>
                  <th className="py-3 px-6 border-b text-left">Payment</th>
                  <th className="py-3 px-6 border-b text-left">Age</th>
                  <th className="py-3 px-6 border-b text-left">Date & Time</th>
                  <th className="py-3 px-6 border-b text-left">Fees</th>
                  <th className="py-3 px-6 border-b text-left">Action</th>
                </tr>
              </thead>
              <tbody className="text-lg">
                {appointments.map((appointment) => (
                  <tr key={appointment.id}>
                    <td className="py-4 px-6 border-b">{appointment.id}</td>
                    <td className="py-4 px-6 border-b">{appointment.patient}</td>
                    <td className="py-4 px-6 border-b">
                      <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded">
                        {appointment.payment}
                      </span>
                    </td>
                    <td className="py-4 px-6 border-b">{appointment.age}</td>
                    <td className="py-4 px-6 border-b">{appointment.dateTime}</td>
                    <td className="py-4 px-6 border-b">{appointment.fees}</td>
                    <td className="py-4 px-6 border-b">
                      {appointment.status === "Cancelled" ? (
                        <span className="text-red-500">Cancelled</span>
                      ) : (
                        <span className="text-green-500">Completed</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DoctorAppointments;