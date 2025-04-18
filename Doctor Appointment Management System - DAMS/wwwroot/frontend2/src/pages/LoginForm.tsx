import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link, useNavigate } from "react-router-dom";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

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
                navigate("/");
            } else {
                navigate("/");
            }

        } else {
            toast.error("Invalid login credentials!");
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <Card className="w-full max-w-md shadow-lg bg-white p-8">
                <CardHeader>
                    <CardTitle className="text-center text-2xl font-bold text-blue-700 mb-4">
                        Login
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div>
                        <label htmlFor="role" className="block text-gray-700 font-medium mb-2">
                            Select Role
                        </label>
                        <Select onValueChange={setRole} value={role}>
                            <SelectTrigger className="border rounded p-2 w-full">
                                <SelectValue placeholder="Select Role" />
                            </SelectTrigger>
                            <SelectContent>   
                                <SelectItem value="Patient">Patient</SelectItem>
                                <SelectItem value="Doctor">Doctor</SelectItem>
                                <SelectItem value="Admin">Admin</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                            Email
                        </label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="p-2 border rounded w-full"
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
                            Password
                        </label>
                        <Input
                            id="password"
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="p-2 border rounded w-full"
                        />
                    </div>
                    <Button
                        className="bg-blue-700 text-white w-full py-2 rounded-lg hover:bg-blue-800 shadow-md font-semibold text-lg transition"
                        onClick={handleLogin}
                    >
                        Login
                    </Button>
                    <p className="text-center text-gray-600 mt-4">Don't have an account?
                        <Link to="/register" className="text-blue-700 hover:underline"> Sign up</Link>
                    </p>
                </CardContent>
            </Card>
        </div>
    );
}

export default LoginForm;