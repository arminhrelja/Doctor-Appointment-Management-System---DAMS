import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Calendar, UserPlus, Users } from 'lucide-react';

const AdminSidebar: React.FC = () => {
  const location = useLocation();

  return (
    <aside className="w-64 bg-gray-100 p-4">
      <nav>
        <ul className="space-y-7 text-2xl">
          <li>
            <Link to="/admin/dashboard" className={`text-gray-700 flex items-center ${location.pathname === '/admin/dashboard' ? 'font-bold' : ''}`}>
              <Home className="mr-2" size={24} />Dashboard
            </Link>
          </li>
          <li>
            <Link to="/admin/appointments" className={`text-gray-700 flex items-center ${location.pathname === '/admin/appointments' ? 'font-bold' : ''}`}>
              <Calendar className="mr-2" size={24} />Appointments
            </Link>
          </li>
          <li>
            <Link to="/admin/add-doctor" className={`text-gray-700 flex items-center ${location.pathname === '/admin/add-doctor' ? 'font-bold' : ''}`}>
              <UserPlus className="mr-2" size={24} />Add Doctor
            </Link>
          </li>
          <li>
            <Link to="/admin/doctors-list" className={`text-gray-700 flex items-center ${location.pathname === '/admin/doctors-list' ? 'font-bold' : ''}`}>
              <Users className="mr-2" size={24} />Doctors List
            </Link>
          </li>
          <li>
            <Link to="/admin/add-institution" className={`text-gray-700 flex items-center ${location.pathname === '/admin/add-institution' ? 'font-bold' : ''}`}>
              <span className="mr-2">🏥</span>Add Institution
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default AdminSidebar;