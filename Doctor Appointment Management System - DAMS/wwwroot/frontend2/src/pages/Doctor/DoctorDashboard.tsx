import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import DoctorSidebar from '../../components/DoctorSidebar';
import { DollarSign, Calendar, User } from 'lucide-react';
import { toast } from "sonner";

const DoctorDashboard: React.FC = () => {
  const [latestBookings, setLatestBookings] = useState<any[]>([]);
  const [earnings, setEarnings] = useState<number>(0);
  const [appointmentsCount, setAppointmentsCount] = useState<number>(0);
  const [patientsCount, setPatientsCount] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch all appointments
        const response = await fetch('https://localhost:7036/api/Appointment/list');
        const appointments = await response.json();
        // Fetch all doctors
        const doctorRes = await fetch('https://localhost:7036/api/Doctor/list');
        const doctors = await doctorRes.json();
        const doctorId = localStorage.getItem('userId');
        const filteredData = appointments.filter((booking: any) =>
          String(booking.doctorId) === String(doctorId)
        );
        const sortedData = filteredData.sort((a: any, b: any) => new Date(b.appointmentDate).getTime() - new Date(a.appointmentDate).getTime());
        setLatestBookings(sortedData.slice(0, 5));
        setAppointmentsCount(filteredData.length);
        // Zarada: suma fee za completed termine (fee iz liste doktora)
        const completed = filteredData.filter((b: any) => b.status === 'Completed');
        const myDoctor = doctors.find((d: any) => String(d.userId) === String(doctorId));
        const fee = myDoctor && myDoctor.fee ? Number(myDoctor.fee) : 0;
        setEarnings(completed.length * fee);
        // Broj različitih pacijenata
        const uniquePatients = new Set(filteredData.map((b: any) => b.patientId));
        setPatientsCount(uniquePatients.size);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };
    fetchData();
  }, []);

  const handleStatusChange = async (appointmentId: number, newStatus: string) => {
    try {
      const response = await fetch(`https://localhost:7036/api/Appointment/update-status/${appointmentId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      if (response.ok) {
        setLatestBookings((prev) => prev.map((b) => b.appointmentId === appointmentId ? { ...b, status: newStatus } : b));
        toast.success('Appointment status updated successfully.');
      } else {
        toast.error('Failed to update appointment status.');
      }
    } catch (error) {
      toast.error('Error updating appointment status.');
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header />
      <div className="flex flex-1">
        <DoctorSidebar />
        <main className="flex-1 p-6 flex flex-col items-center">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3 w-full max-w-5xl mb-8">
            <div className="bg-white p-6 text-center border rounded-lg shadow-md flex flex-col items-center">
              <DollarSign className="text-blue-500 mb-2" size={32} />
              <h2 className="text-3xl font-bold">{earnings} BAM</h2>
              <p className="text-gray-600">Earnings</p>
            </div>
            <div className="bg-white p-6 text-center border rounded-lg shadow-md flex flex-col items-center">
              <Calendar className="text-green-500 mb-2" size={32} />
              <h2 className="text-3xl font-bold">{appointmentsCount}</h2>
              <p className="text-gray-600">Appointments</p>
            </div>
            <div className="bg-white p-6 text-center border rounded-lg shadow-md flex flex-col items-center">
              <User className="text-yellow-500 mb-2" size={32} />
              <h2 className="text-3xl font-bold">{patientsCount}</h2>
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
                    <img src="/assets/patient-img.png" alt="Patient" className="w-14 h-14 rounded-full object-cover border-2 border-blue-200" />
                    <div>
                      <p className="font-bold text-blue-700">{booking.patient && booking.patient.firstName ? booking.patient.firstName : 'Unknown'} {booking.patient && booking.patient.lastName ? booking.patient.lastName : ''}</p>
                      <p className="text-gray-600">Booking on {new Date(booking.appointmentDate).toLocaleString()}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-3 py-1 rounded-full text-lg font-semibold ${booking.status === 'Cancelled' ? 'bg-red-100 text-red-700' : booking.status === 'Completed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                      {booking.status}
                    </span>
                    {booking.status !== 'Cancelled' && booking.status !== 'Completed' && (
                      <>
                        <button
                          className="ml-2 bg-green-500 hover:bg-green-600 text-white w-10 h-10 flex items-center justify-center rounded-full shadow focus:outline-none focus:ring-2 focus:ring-green-400"
                          title="Mark as Completed"
                          onClick={() => handleStatusChange(booking.appointmentId, 'Completed')}
                        >
                          ✓
                        </button>
                        <button
                          className="ml-2 bg-red-500 hover:bg-red-600 text-white w-10 h-10 flex items-center justify-center rounded-full shadow focus:outline-none focus:ring-2 focus:ring-red-400"
                          title="Cancel Appointment"
                          onClick={() => handleStatusChange(booking.appointmentId, 'Cancelled')}
                        >
                          ✗
                        </button>
                      </>
                    )}
                  </div>
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