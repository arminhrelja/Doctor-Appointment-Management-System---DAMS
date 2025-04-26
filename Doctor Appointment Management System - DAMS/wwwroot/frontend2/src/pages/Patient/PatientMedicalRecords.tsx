import { useState, useEffect } from "react";
import Header from "../../components/Header";

const PatientMedicalRecords = () => {
  const [records, setRecords] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchRecords = async () => {
      setLoading(true);
      try {
        const res = await fetch(`https://localhost:7036/api/MedicalRecord/patient/${userId}`);
        const data = await res.json();
        setRecords(data);
      } catch (e) {
        setError("Failed to load medical records.");
      } finally {
        setLoading(false);
      }
    };
    if (userId) fetchRecords();
  }, [userId]);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-200">
      <Header />
      <div className="flex flex-1 justify-center items-center">
        <main className="flex-1 p-6 flex flex-col items-center">
          <h1 className="text-4xl font-extrabold mb-10 text-blue-800 drop-shadow-lg tracking-wide animate-fade-in">My Medical Records</h1>
          {loading ? (
            <div className="text-blue-700 text-lg animate-pulse">Loading...</div>
          ) : error ? (
            <div className="text-red-500 font-semibold animate-fade-in">{error}</div>
          ) : (
            <div className="w-full max-w-2xl bg-white/90 rounded-2xl shadow-2xl p-10 border border-blue-100 animate-fade-in">
              <h2 className="text-2xl font-bold mb-6 text-blue-700">History</h2>
              <div className="max-h-96 overflow-y-auto space-y-4">
                {records.length === 0 && <div className="text-gray-400 text-center">No records found.</div>}
                {records.map((rec: any) => (
                  <div key={rec.medicalRecordId} className="border-b border-blue-100 pb-3 mb-3 group hover:bg-blue-50 transition duration-200 rounded-lg px-3">
                    <div className="text-base text-blue-900 font-semibold">Diagnosis: <span className="font-normal text-gray-700">{rec.diagnosis}</span></div>
                    <div className="text-base text-blue-900 font-semibold">Treatment: <span className="font-normal text-gray-700">{rec.treatmentPlan || "-"}</span></div>
                    <div className="text-sm text-blue-700">Doctor: {rec.doctorName}</div>
                    <div className="text-sm text-blue-700">Institution: {rec.institutionName}</div>
                    <div className="text-xs text-gray-400 italic">Date: {new Date(rec.createdAt).toLocaleString()}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default PatientMedicalRecords;