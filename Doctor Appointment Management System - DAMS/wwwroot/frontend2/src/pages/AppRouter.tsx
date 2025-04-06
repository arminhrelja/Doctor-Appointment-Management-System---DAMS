import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import LoginForm from './LoginForm'; 
import RegisterForm from './RegisterForm';
import AdminDashboard from './Admin/AdminDashboard';
import AddDoctor from './Admin/AddDoctor';
import Appointments from './Admin/Appointments';
import DoctorsList from './Admin/DoctorList';
import DoctorDashboard from './Doctor/DoctorDashboard';
import DoctorAppointments from './Doctor/DoctorAppointments';
import DoctorProfile from './Doctor/DoctorProfile';

function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path='/admin/dashboard' element={<AdminDashboard />} />
        <Route path="/admin/appointments" element={<Appointments/>} />
        <Route path="/admin/add-doctor" element={<AddDoctor/>} />
        <Route path="/admin/doctors-list" element={<DoctorsList/>} />
        <Route path="/doctor/dashboard" element={<DoctorDashboard />} />
        <Route path="/doctor/appointments" element={<DoctorAppointments />} />
        <Route path="/doctor/profile" element={<DoctorProfile />} />
      </Routes>
    </Router>
  );
}

export default AppRouter;