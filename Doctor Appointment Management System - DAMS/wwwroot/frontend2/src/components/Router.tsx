import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "../components/Header";
import LoginForm from "../pages/LoginForm";
import RegisterForm from "../pages/RegisterForm";

function AppRouter() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
      </Routes>
    </Router>
  );
}

export default AppRouter;
