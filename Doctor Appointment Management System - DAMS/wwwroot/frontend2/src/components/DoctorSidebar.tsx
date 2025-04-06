import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Calendar, User } from 'lucide-react';

const DoctorSidebar: React.FC = () => {
  const location = useLocation();

  return (
    <aside className="w-64 bg-gray-100 p-4">
      <nav>
        <ul className="space-y-4 text-lg">
          <li>
            <Link to="/doctor/dashboard" className={`text-gray-700 flex items-center ${location.pathname === '/doctor/dashboard' ? 'font-bold' : ''}`}>
              <Home className="mr-2" size={24} />Dashboard
            </Link>
          </li>
          <li>
            <Link to="/doctor/appointments" className={`text-gray-700 flex items-center ${location.pathname === '/doctor/appointments' ? 'font-bold' : ''}`}>
              <Calendar className="mr-2" size={24} />Appointments
            </Link>
          </li>
          <li>
            <Link to="/doctor/profile" className={`text-gray-700 flex items-center ${location.pathname === '/doctor/profile' ? 'font-bold' : ''}`}>
              <User className="mr-2" size={24} />Profile
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default DoctorSidebar;