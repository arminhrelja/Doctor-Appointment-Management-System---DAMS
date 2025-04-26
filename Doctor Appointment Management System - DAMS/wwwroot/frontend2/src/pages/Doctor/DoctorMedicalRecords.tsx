import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "../../components/Header";
import DoctorSidebar from "../../components/DoctorSidebar";
import { Button } from "@/components/ui/button";

const DoctorMedicalRecords = () => {
  const { patientId } = useParams<{ patientId: string }>();
  const doctorId = localStorage.getItem("userId");
  const [records, setRecords] = useState<any[]>([]);
  const [diagnosis, setDiagnosis] = useState("");
  const [treatmentPlan, setTreatmentPlan] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRecords = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `https://localhost:7036/api/MedicalRecord/doctor/${doctorId}/patient/${patientId}`
        );
        const data = await res.json();
        setRecords(data);
        if (data.length > 0) {
          setDiagnosis(data[0].diagnosis);
          setTreatmentPlan(data[0].treatmentPlan || "");
        }
      } catch (e) {
        setError("Failed to load medical records.");
      } finally {
        setLoading(false);
      }
    };
    if (doctorId && patientId) fetchRecords();
  }, [doctorId, patientId]);

  const handleSave = async () => {
    if (!diagnosis) return;
    try {
      let recordId = records[0]?.medicalRecordId;
      if (recordId) {
        // Update existing
        await fetch(`https://localhost:7036/api/MedicalRecord/${recordId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ diagnosis, treatmentPlan }),
        });
      } else {
        // Create new
        await fetch(`https://localhost:7036/api/MedicalRecord`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            patientId: Number(patientId),
            doctorId: Number(doctorId),
            institutionId: records[0]?.institutionId || 1, // fallback
            diagnosis,
            treatmentPlan,
          }),
        });
      }
      window.location.reload();
    } catch (e) {
      setError("Failed to save record.");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-200">
      <Header />
      <div className="flex flex-1">
        <DoctorSidebar />
        <main className="flex-1 p-6 flex flex-col items-center">
          <h1 className="text-4xl font-extrabold mb-10 text-blue-800 drop-shadow-lg tracking-wide animate-fade-in">Patient Medical Records</h1>
          {loading ? (
            <div className="text-blue-700 text-lg animate-pulse">Loading...</div>
          ) : error ? (
            <div className="text-red-500 font-semibold animate-fade-in">{error}</div>
          ) : (
            <div className="w-full max-w-2xl bg-white/90 rounded-2xl shadow-2xl p-10 border border-blue-100 animate-fade-in">
              <h2 className="text-2xl font-bold mb-6 text-blue-700">Latest Record</h2>
              <div className="mb-4">
                <label className="block font-medium mb-1 text-blue-900">Diagnosis</label>
                <textarea
                  className="w-full border rounded p-2 focus:ring-2 focus:ring-blue-300 transition"
                  value={diagnosis}
                  onChange={e => setDiagnosis(e.target.value)}
                  rows={3}
                />
              </div>
              <div className="mb-4">
                <label className="block font-medium mb-1 text-blue-900">Treatment Plan</label>
                <textarea
                  className="w-full border rounded p-2 focus:ring-2 focus:ring-blue-300 transition"
                  value={treatmentPlan}
                  onChange={e => setTreatmentPlan(e.target.value)}
                  rows={3}
                />
              </div>
              <Button className="bg-blue-700 text-white px-6 py-2 rounded hover:bg-blue-800 shadow-lg transition-transform active:scale-95" onClick={handleSave}>
                Save
              </Button>
              <h3 className="text-lg font-semibold mt-8 mb-2 text-blue-700">History</h3>
              <div className="max-h-64 overflow-y-auto space-y-4">
                {records.length === 0 && <div className="text-gray-400 text-center">No records found.</div>}
                {records.map((rec: any) => (
                  <div key={rec.medicalRecordId} className="border-b border-blue-100 pb-3 mb-3 group hover:bg-blue-50 transition duration-200 rounded-lg px-3">
                    <div className="text-base text-blue-900 font-semibold">Diagnosis: <span className="font-normal text-gray-700">{rec.diagnosis}</span></div>
                    <div className="text-base text-blue-900 font-semibold">Treatment: <span className="font-normal text-gray-700">{rec.treatmentPlan || "-"}</span></div>
                    <div className="text-sm text-blue-700">Date: {new Date(rec.createdAt).toLocaleString()}</div>
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

export default DoctorMedicalRecords;