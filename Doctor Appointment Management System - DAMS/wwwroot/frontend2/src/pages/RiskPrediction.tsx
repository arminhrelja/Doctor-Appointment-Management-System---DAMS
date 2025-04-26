import { useState } from "react";

const RiskPrediction = () => {
  const [form, setForm] = useState({ age: "", gender: "", smoker: false, diabetes: false });
  const [result, setResult] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setForm(f => ({ ...f, [name]: type === "checkbox" ? checked : value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResult(null);
    try {
      const res = await fetch("https://localhost:7036/api/AI/predict-risk", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          age: Number(form.age),
          gender: form.gender,
          smoker: form.smoker,
          diabetes: form.diabetes,
        }),
      });
      if (!res.ok) throw new Error("AI service error");
      const data = await res.json();
      setResult(data.riskScore);
    } catch (e) {
      setError("Failed to get risk prediction.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-200 justify-center items-center">
      <div className="w-full max-w-xl bg-white/90 rounded-2xl shadow-2xl p-10 border border-blue-100 animate-fade-in mt-10">
        <h1 className="text-3xl font-extrabold mb-8 text-blue-800 drop-shadow-lg tracking-wide">AI Risk Prediction</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <input type="number" name="age" placeholder="Age" className="w-full border rounded p-2" value={form.age} onChange={handleChange} required />
          <select name="gender" className="w-full border rounded p-2" value={form.gender} onChange={handleChange} required>
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
          <label className="flex items-center gap-2">
            <input type="checkbox" name="smoker" checked={form.smoker} onChange={handleChange} /> Smoker
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" name="diabetes" checked={form.diabetes} onChange={handleChange} /> Diabetes
          </label>
          <button type="submit" className="bg-blue-700 text-white px-6 py-2 rounded hover:bg-blue-800 shadow-lg transition-transform active:scale-95 w-full font-semibold text-lg" disabled={loading}>
            {loading ? 'Calculating...' : 'Predict Risk'}
          </button>
        </form>
        {error && <div className="text-red-500 mt-4">{error}</div>}
        {result !== null && (
          <div className="mt-8 text-xl text-blue-700 font-semibold animate-fade-in text-center">
            Risk Score: <span className="font-bold">{(result * 100).toFixed(1)}%</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default RiskPrediction;
