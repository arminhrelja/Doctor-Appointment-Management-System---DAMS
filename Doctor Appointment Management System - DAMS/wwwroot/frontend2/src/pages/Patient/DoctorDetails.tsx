import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import { Button } from '@/components/ui/button';
import { addDays, format } from 'date-fns';
import { toast } from "sonner";

const getNext7Days = () => {
  const days = [];
  for (let i = 0; i < 7; i++) {
    const date = addDays(new Date(), i);
    days.push({
      date,
      label: format(date, 'EEE, dd MMM'),
      value: format(date, 'yyyy-MM-dd'),
    });
  }
  return days;
};

const getTimeSlots = () => {
  const slots = [];
  for (let hour = 8; hour <= 17; hour++) {
    slots.push(`${hour.toString().padStart(2, '0')}:00`);
    if (hour !== 17) slots.push(`${hour.toString().padStart(2, '0')}:30`);
  }
  return slots;
};

const DoctorDetails: React.FC = () => {
  const { doctorId } = useParams<{ doctorId: string }>();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  // Redirect to login if not logged in
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);
  const [doctor, setDoctor] = useState<any>(null);
  const [selectedDate, setSelectedDate] = useState<string>(getNext7Days()[0].value);
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [bookedSlots, setBookedSlots] = useState<string[]>([]);

  useEffect(() => {
    const fetchDoctorDetails = async () => {
      try {
        const response = await fetch(`https://localhost:7036/api/Doctor/${doctorId}`);
        const data = await response.json();
        setDoctor(data);
      } catch (error) {
        console.error('Error fetching doctor details:', error);
      }
    };

    fetchDoctorDetails();
  }, [doctorId]);

  useEffect(() => {
    const fetchBookedSlots = async () => {
      try {
        const response = await fetch(`https://localhost:7036/api/Appointment/list`);
        const data = await response.json();
        const slots = data
          .filter((a: any) =>
            a.doctorId === parseInt(doctorId || '0') &&
            a.appointmentDate.startsWith(selectedDate) &&
            a.status !== 'Cancelled' &&
            a.status !== 'Completed'
          )
          .map((a: any) => format(new Date(a.appointmentDate), 'HH:mm'));
        setBookedSlots(slots);
      } catch (error) {
        setBookedSlots([]);
      }
    };
    fetchBookedSlots();
  }, [doctorId, selectedDate]);

  const bookAppointment = async () => {
    try {
      const patientId = localStorage.getItem('userId');
      if (!selectedDate || !selectedTime) {
        toast.error('Please select date and time.');
        return;
      }
      const response = await fetch('https://localhost:7036/api/Appointment/book', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          patientId: parseInt(patientId || '0'),
          doctorId: parseInt(doctorId || '0'),
          appointmentDate: `${selectedDate}T${selectedTime}:00`,
          status: 'Scheduled',
        }),
      });

      if (response.ok) {
        toast.success('Appointment booked successfully!');
        navigate('/patient/my-appointments');
      } else {
        toast.error('Failed to book appointment.');
      }
    } catch (error) {
      console.error('Error booking appointment:', error);
    }
  };

  if (!doctor) {
    return <p>Loading doctor details...</p>;
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header />
      <main className="flex-1 flex flex-col items-center justify-center p-6">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-2xl w-full flex flex-col md:flex-row gap-8 items-center">
          <img
            src="/assets/doctor-img.png"
            alt="Doctor"
            className="w-40 h-40 rounded-full object-cover border-4 border-blue-200 shadow-md mb-4 md:mb-0"
          />
          <div className="flex-1 flex flex-col gap-2">
            <h2 className="text-3xl font-bold text-blue-700 mb-2">Dr. {doctor.firstName} {doctor.lastName}</h2>
            <p className="text-blue-700 text-lg font-semibold mb-2">Institution: {doctor.institutionName || 'Unknown'}</p>
            <div className="flex flex-wrap gap-4 mb-2">
              <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-lg font-semibold">{doctor.speciality}</span>
              <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-lg font-semibold">{doctor.experience} years exp.</span>
              <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-lg font-semibold">{doctor.fee} BAM</span>
            </div>
            <p className="text-gray-700 text-lg mb-2"><span className="font-semibold">About:</span> {doctor.about}</p>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-8 mt-8 max-w-2xl w-full flex flex-col items-center">
          <h3 className="text-2xl font-bold mb-4 text-blue-700">Book an Appointment</h3>
          <div className="flex gap-2 mb-6 overflow-x-auto w-full">
            {getNext7Days().map((d) => (
              <button
                key={d.value}
                className={`px-4 py-2 rounded-lg border text-lg font-semibold transition-all ${selectedDate === d.value ? 'bg-blue-700 text-white' : 'bg-gray-100 text-gray-700 hover:bg-blue-100'}`}
                onClick={() => { setSelectedDate(d.value); setSelectedTime(''); }}
              >
                {d.label}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-4 gap-4 w-full max-w-lg mb-6">
            {getTimeSlots().map((slot) => {
              const isBooked = bookedSlots.includes(slot);
              return (
                <button
                  key={slot}
                  className={`px-3 py-2 rounded-lg text-lg font-semibold border transition-all ${selectedTime === slot && !isBooked ? 'bg-blue-700 text-white' : isBooked ? 'bg-red-200 text-red-700 cursor-not-allowed' : 'bg-gray-100 text-gray-700 hover:bg-blue-100'}`}
                  onClick={() => !isBooked && setSelectedTime(slot)}
                  disabled={isBooked}
                >
                  {slot}
                </button>
              );
            })}
          </div>
          <Button
            className="bg-blue-700 text-white px-8 py-3 rounded-lg text-lg hover:bg-blue-800 transition shadow-md font-semibold"
            onClick={bookAppointment}
            disabled={!selectedDate || !selectedTime}
          >
            Book Appointment
          </Button>
        </div>
      </main>
    </div>
  );
};

export default DoctorDetails;