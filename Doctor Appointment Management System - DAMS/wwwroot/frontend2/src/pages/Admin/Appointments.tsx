import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import AdminSidebar from '@/components/AdminSidebar';
import { toast } from "sonner";

const Appointments: React.FC = () => {
  const [appointments, setAppointments] = useState<any[]>([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await fetch('https://localhost:7036/api/Appointment/list');
        const data = await response.json();
        setAppointments(data);
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    };

    fetchAppointments();
  }, []);

  const cancelAppointment = async (id: number) => {
    try {
      const response = await fetch(`https://localhost:7036/api/Appointment/cancel/${id}`, {
        method: 'PUT',
      });

      if (response.ok) {
        toast.success('Appointment cancelled successfully.');
        setAppointments((prev) => prev.map((appt) => appt.appointmentId === id ? { ...appt, status: 'Cancelled' } : appt));
      } else {
        toast.error('Failed to cancel appointment.');
      }
    } catch (error) {
      console.error('Error cancelling appointment:', error);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header />
      <div className="flex flex-1">
        <AdminSidebar />
        <main className="flex-1 p-6 flex flex-col items-center">
          <h1 className="text-3xl font-bold mb-8 text-blue-700">All Appointments</h1>
          <div className="overflow-x-auto w-full max-w-5xl">
            <table className="min-w-full bg-white border rounded-lg shadow-lg">
              <thead>
                <tr>
                  <th className="py-3 px-6 border-b text-left">#</th>
                  <th className="py-3 px-6 border-b text-left">Patient</th>
                  <th className="py-3 px-6 border-b text-left">Doctor</th>
                  <th className="py-3 px-6 border-b text-left">Date & Time</th>
                  <th className="py-3 px-6 border-b text-left">Status</th>
                  <th className="py-3 px-6 border-b text-left">Action</th>
                </tr>
              </thead>
              <tbody className="text-lg">
                {appointments.length === 0 && (
                  <tr>
                    <td colSpan={6} className="text-center text-gray-500 py-8 text-xl">No appointments found.</td>
                  </tr>
                )}
                {appointments.map((appointment) => (
                  <tr key={appointment.appointmentId} className="hover:bg-gray-50 transition">
                    <td className="py-4 px-6 border-b">{appointment.appointmentId}</td>
                    <td className="py-4 px-6 border-b flex items-center gap-3">
                      <img src="/assets/patient-img.png" alt="Patient" className="w-10 h-10 rounded-full object-cover border-2 border-blue-200" />
                      <span>{appointment.patient.firstName} {appointment.patient.lastName}</span>
                    </td>
                    <td className="py-4 px-6 border-b">Dr. {appointment.doctor.firstName} {appointment.doctor.lastName}</td>
                    <td className="py-4 px-6 border-b">{new Date(appointment.appointmentDate).toLocaleString()}</td>
                    <td className="py-4 px-6 border-b">
                      <span className={`px-3 py-1 rounded-full text-lg font-semibold ${appointment.status === 'Cancelled' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                        {appointment.status}
                      </span>
                    </td>
                    <td className="py-4 px-6 border-b">
                      {appointment.status !== 'Cancelled' && appointment.status !== 'Completed' && (
                        <button
                          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                          onClick={() => cancelAppointment(appointment.appointmentId)}
                        >
                          Cancel
                        </button>
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

export default Appointments;