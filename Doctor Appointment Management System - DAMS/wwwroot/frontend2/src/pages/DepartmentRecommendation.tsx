import { useState } from "react";

const DepartmentRecommendation = () => {
  const [symptoms, setSymptoms] = useState("");
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResult(null);
    try {
      const res = await fetch("https://localhost:7036/api/AI/classify-department", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ symptoms }),
      });
      if (!res.ok) throw new Error("AI service error");
      const data = await res.json();
      setResult(data.department);
    } catch (e) {
      setError("Failed to get recommendation.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-200 justify-center items-center">
      <div className="w-full max-w-xl bg-white/90 rounded-2xl shadow-2xl p-10 border border-blue-100 animate-fade-in mt-10">
        <h1 className="text-3xl font-extrabold mb-8 text-blue-800 drop-shadow-lg tracking-wide">AI Specialist Recommendation</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <textarea
            className="w-full border rounded p-3 focus:ring-2 focus:ring-blue-300 transition"
            rows={4}
            placeholder="Describe your symptoms..."
            value={symptoms}
            onChange={e => setSymptoms(e.target.value)}
            required
          />
          <button
            type="submit"
            className="bg-blue-700 text-white px-6 py-2 rounded hover:bg-blue-800 shadow-lg transition-transform active:scale-95 w-full font-semibold text-lg"
            disabled={loading}
          >
            {loading ? "Analyzing..." : "Get Recommendation"}
          </button>
        </form>
        {error && <div className="text-red-500 mt-4">{error}</div>}
        {result && (
          <div className="mt-8 text-xl text-blue-700 font-semibold animate-fade-in text-center">
            Recommended Department: <span className="font-bold">{result}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default DepartmentRecommendation;
