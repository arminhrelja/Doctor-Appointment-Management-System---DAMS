import Header from "../components/Header";
import Hero from "../components/Hero";
import CategorySearch from "../components/CategorySearch";
import DepartmentIcons from "../components/DepartmentIcons";
import Footer from "../components/Footer";
import Banner from "@/components/Banner";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <>
      <Header />
      <Hero />
      <CategorySearch />
      <DepartmentIcons />
      <Banner />
      <Footer />
    </>
  );
}

export default Home;
