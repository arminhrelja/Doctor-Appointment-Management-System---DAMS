import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("Patient");
    const navigate = useNavigate();

    const handleLogin = async () => {
        const response = await fetch("https://localhost:7036/api/Auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (response.ok) {
            localStorage.setItem("token", data.token);
            localStorage.setItem("role", data.role);
            localStorage.setItem("userId", data.userId);

            if (data.role === "Admin") {
                navigate("/admin/dashboard");
            } else if (data.role === "Doctor") {
                navigate("/doctor/dashboard");
            } else if (data.role === "Patient") {
                navigate("/patient/dashboard");
            } else {
                navigate("/");
            }

        } else {
            alert("Invalid login credentials!");
        }
    };

  return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
          <Card className="w-full max-w-md shadow-lg bg-white p-6">
              <CardHeader>
                  <CardTitle className="text-center text-xl">Login</CardTitle>
              </CardHeader>
              <CardContent>
                  <Select onValueChange={setRole} value={role}>
                      <SelectTrigger>
                          <SelectValue placeholder="Select Role" />
                      </SelectTrigger>
                      <SelectContent>
                          <SelectItem value="Patient">Patient</SelectItem>
                          <SelectItem value="Doctor">Doctor</SelectItem>
                          <SelectItem value="Admin">Admin</SelectItem>
                      </SelectContent>
                  </Select>
                  <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                  <Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                  <Button className="bg-blue-700 text-white w-full mt-4" onClick={handleLogin}>Login</Button>
              </CardContent>
          </Card>
      </div>
  );
}

export default LoginForm;
