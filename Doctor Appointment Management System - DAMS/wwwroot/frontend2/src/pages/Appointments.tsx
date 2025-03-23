import React from 'react';
import Header from '../components/Header';

const Appointments: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex flex-1 p-6">
        <h1 className="text-2xl font-bold">Appointments</h1>
      </div>
    </div>
  );
};

export default Appointments;