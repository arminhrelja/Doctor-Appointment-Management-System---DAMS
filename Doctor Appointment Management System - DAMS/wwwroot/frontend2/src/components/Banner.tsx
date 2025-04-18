import React from "react";
import { Link } from "react-router-dom";

const Banner: React.FC = () => {
  return (
    <div className="bg-blue-500 text-white py-8 px-8 relative overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between relative z-10">
        {/* Text Section */}
        <div className="text-center md:text-left mb-8 md:mb-0">
          <h1 className="text-4xl font-bold mb-4">Book Appointment</h1>
          <h2 className="text-2xl font-medium mb-6">With 100+ Trusted Doctors</h2>
          <button className="bg-white text-blue-500 font-semibold py-2 px-6 rounded-lg shadow-md hover:bg-gray-100 transition">
            <Link to="/register">Create account</Link>
          </button>
        </div>
        {/* Image Section */}
        <div className="flex justify-center">
          <img
            src="src/assets/banner-img.png"
            alt="Doctors"
            className="w-full max-w-sm md:max-w-md object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default Banner;