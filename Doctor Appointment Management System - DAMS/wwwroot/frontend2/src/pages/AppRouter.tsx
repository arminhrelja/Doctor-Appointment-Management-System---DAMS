import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import LoginForm from './LoginForm'; 
import RegisterForm from './RegisterForm';
import AdminDashboard from './AdminDashboard';
import AddDoctor from './AddDoctor';
import Appointments from './Appointments';
import DoctorsList from './DoctorList';

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
      </Routes>
    </Router>
  );
}

export default AppRouter;