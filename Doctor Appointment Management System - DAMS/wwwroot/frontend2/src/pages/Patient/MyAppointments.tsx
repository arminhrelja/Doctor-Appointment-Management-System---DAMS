import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import { Button } from '@/components/ui/button';
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const MyAppointments: React.FC = () => {
  const [appointments, setAppointments] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const userId = localStorage.getItem("userId");
        const response = await fetch('https://localhost:7036/api/Appointment/list');
        const data = await response.json();
        // Filtriraj samo termine za trenutno ulogovanog pacijenta
        const filtered = data.filter((appt: any) => String(appt.patientId) === String(userId));
        setAppointments(filtered);
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
        setAppointments((prev) => prev.filter((appt) => appt.appointmentId !== id));
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
      <main className="flex-1 flex flex-col items-center p-6">
        <h1 className="text-3xl font-bold mb-8 text-blue-700">My Appointments</h1>
        <div className="overflow-x-auto w-full max-w-5xl">
          <table className="min-w-full bg-white border rounded-lg shadow-lg">
            <thead>
              <tr>
                <th className="py-3 px-6 border-b text-left">#</th>
                <th className="py-3 px-6 border-b text-left">Doctor</th>
                <th className="py-3 px-6 border-b text-left">Date & Time</th>
                <th className="py-3 px-6 border-b text-left">Status</th>
                <th className="py-3 px-6 border-b text-left">Action</th>
              </tr>
            </thead>
            <tbody className="text-lg">
              {appointments.length === 0 && (
                <tr>
                  <td colSpan={5} className="text-center text-gray-500 py-8 text-xl">No appointments found.</td>
                </tr>
              )}
              {appointments.map((appointment, idx) => {
                const doctor = appointment.doctor;
                return (
                  <tr key={appointment.appointmentId} className="hover:bg-gray-50 transition">
                    <td className="py-4 px-6 border-b">{idx + 1}</td>
                    <td className="py-4 px-6 border-b flex items-center gap-3">
                      <img src="/assets/doctor-img.png" alt="Doctor" className="w-10 h-10 rounded-full object-cover border-2 border-blue-200" />
                      <span>Dr. {doctor && doctor.firstName ? doctor.firstName : 'Unknown'} {doctor && doctor.lastName ? doctor.lastName : ''}</span>
                    </td>
                    <td className="py-4 px-6 border-b">{new Date(appointment.appointmentDate).toLocaleString()}</td>
                    <td className="py-4 px-6 border-b">
                      <span className={`font-semibold ${appointment.status === 'Cancelled' ? 'text-red-500' : 'text-green-600'}`}>{appointment.status}</span>
                    </td>
                    <td className="py-4 px-6 border-b">
                      {appointment.status !== 'Cancelled' && appointment.status !== 'Completed' && (
                        <Button
                          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 shadow-md font-semibold transition"
                          onClick={() => cancelAppointment(appointment.appointmentId)}
                        >
                          Cancel
                        </Button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default MyAppointments;