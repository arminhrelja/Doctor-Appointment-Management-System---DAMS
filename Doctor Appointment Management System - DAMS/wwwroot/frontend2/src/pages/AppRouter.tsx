import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import LoginForm from './LoginForm'; 
import RegisterForm from './RegisterForm';

function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
      </Routes>
    </Router>
  );
}

export default AppRouter;