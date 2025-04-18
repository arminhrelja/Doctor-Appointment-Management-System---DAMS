import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import { Button } from '@/components/ui/button';

const MyAppointments: React.FC = () => {
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
        alert('Appointment cancelled successfully.');
        setAppointments((prev) => prev.filter((appt) => appt.appointmentId !== id));
      } else {
        alert('Failed to cancel appointment.');
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
          {appointments.length === 0 && (
            <div className="col-span-2 text-center text-gray-500 text-xl">No appointments found.</div>
          )}
          {appointments.map((appointment) => (
            <div key={appointment.appointmentId} className="bg-white rounded-lg shadow-lg p-6 flex flex-col md:flex-row items-center gap-6">
              <img
                src="/assets/doctor-img.png"
                alt="Doctor"
                className="w-24 h-24 rounded-full object-cover border-2 border-blue-200 shadow-md mb-4 md:mb-0"
              />
              <div className="flex-1 flex flex-col gap-2">
                <h2 className="text-xl font-bold text-blue-700 mb-1">Dr. {appointment.doctor.firstName} {appointment.doctor.lastName}</h2>
                <p className="text-gray-600 text-lg">Date: <span className="font-semibold">{new Date(appointment.appointmentDate).toLocaleString()}</span></p>
                <p className="text-gray-600 text-lg">Status: <span className={`font-semibold ${appointment.status === 'Cancelled' ? 'text-red-500' : 'text-green-600'}`}>{appointment.status}</span></p>
                <Button
                  className="mt-2 bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 w-fit"
                  onClick={() => cancelAppointment(appointment.appointmentId)}
                  disabled={appointment.status === 'Cancelled'}
                >
                  Cancel Appointment
                </Button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default MyAppointments;