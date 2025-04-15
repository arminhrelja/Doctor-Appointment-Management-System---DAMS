import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import SpecialtySidebar from "@/components/SpecialtySidebar";

interface Doctor {
  userId: number;
  firstName: string;
  lastName: string;
  speciality: string;
  about: string;
  experience: number;
  fee: number;
}

const AllDoctors: React.FC = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const specialties = [
    { name: "Cardiology", icon: "/assets/cardiology.svg" },
    { name: "Neurology", icon: "/assets/neurology.svg" },
    { name: "Pulmonology", icon: "/assets/pulmonology.svg" },
    { name: "Pediatrics", icon: "/assets/pediatrics.svg" },
    { name: "Oncology", icon: "/assets/oncology.svg" },
    { name: "Infectious Diseases", icon: "/assets/infectiousdiseases.svg" },
    { name: "Dermatology", icon: "/assets/dermatology.svg" },
    { name: "Psychiatry", icon: "/assets/psychiatry.svg" },
    { name: "Gynecology", icon: "/assets/gynecology.svg" },
  ];

  const fetchAllDoctors = async () => {
    try {
      setLoading(true);
      const res = await fetch("https://localhost:7036/api/Doctor/list");
      const data = await res.json();
      setDoctors(data);
    } catch (error) {
      console.error("Error fetching doctors:", error);
    } finally {
      setLoading(false);
    }
  };

  // Initial fetch
  useEffect(() => {
    fetchAllDoctors();
  }, []);

  const handleSpecialtyClick = async (specialty: string) => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`https://localhost:7036/api/Doctor/specialty/${specialty}`);

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error ${response.status}: ${errorText}`);
      }

      const data: Doctor[] = await response.json();
      setDoctors(data);
    } catch (err: any) {
      setError(err.message || "An unknown error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="all-doctors flex flex-col items-center p-6">
      <h1 className="text-2xl font-bold mb-6">Browse through the doctors specialist</h1>

      <div className="flex w-full max-w-7xl gap-6">
        {/* Sidebar */}
        <div className="w-1/4">
          <SpecialtySidebar specialties={specialties.map(specialty => specialty.name)} onSpecialtyClick={handleSpecialtyClick} onReset={fetchAllDoctors} />
        </div>

        {/* Doctors Grid */}
        <div className="w-3/4">
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, idx) => (
                <div key={idx} className="bg-white p-4 rounded-lg shadow-md flex flex-col items-center text-center">
                  <Skeleton className="w-24 h-24 rounded-full mb-4" />
                  <Skeleton className="w-3/4 h-4 mb-2" />
                  <Skeleton className="w-1/2 h-3 mb-2" />
                  <Skeleton className="w-1/3 h-3 mb-2" />
                  <Skeleton className="w-full h-3 mt-2 mb-1" />
                  <Skeleton className="w-2/3 h-3 mt-1" />
                  <Skeleton className="w-1/2 h-3 mt-1" />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {doctors.map((doctor) => (
                <div
                  key={doctor.userId}
                  className="doctor-card bg-white p-4 rounded-lg shadow-md flex flex-col items-center text-center"
                >
                  <img
                    src="/assets/doctor-img.png"
                    alt="Doctor"
                    className="w-24 h-24 rounded-full mb-4"
                  />
                  <h3 className="text-lg font-semibold">
                    Dr. {doctor.firstName} {doctor.lastName}
                  </h3>
                  <p className="text-sm text-gray-500 mb-2">{doctor.speciality}</p>
                  <p className="text-sm text-green-600 font-medium">Available</p>
                  <p className="text-sm text-gray-700 mt-2">{doctor.about}</p>
                  <p className="text-sm text-gray-700 mt-2">Experience: {doctor.experience} years</p>
                  <p className="text-sm text-gray-700 mt-2">Fee: ${doctor.fee}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {error && (
        <div className="error-message text-red-500 mt-4">
          <p>Error: {error}</p>
        </div>
      )}
    </div>
  );
};

export default AllDoctors;
