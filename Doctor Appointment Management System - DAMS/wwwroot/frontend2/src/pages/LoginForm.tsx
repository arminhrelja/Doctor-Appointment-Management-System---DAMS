import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

type LoginFormData = z.infer<typeof loginSchema>;

function LoginForm() {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const [role, setRole] = useState("patient"); // Default role: Pacijent

  const onSubmit = (data: LoginFormData) => {
    console.log("Login data:", { ...data, role });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg">
        <CardHeader>
          <CardTitle className="text-center text-2xl text-blue-700 font-bold">Sign in to your Account</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div>
              <Input type="email" placeholder="Email" {...register("email")} />
              {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
            </div>
            <div>
              <Input type="password" placeholder="Password" {...register("password")} />
              {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
            </div>
            {/* Dropdown za izbor uloge */}
            <div>
              <label className="text-gray-700 text-sm font-medium">Login as:</label>
              <Select onValueChange={setRole} defaultValue="patient">
                <SelectTrigger className="w-full mt-1 border rounded-lg">
                  <SelectValue placeholder="Select Role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="patient">Patient</SelectItem>
                  <SelectItem value="doctor">Doctor</SelectItem>
                  <SelectItem value="admin">Administrator</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button type="submit" className="w-full bg-blue-700 text-white py-2 rounded-lg hover:bg-blue-800 transition">
              Login
            </Button>
          </form>
          <p className="text-center text-gray-600 mt-4">Don't have an account? 
            <Link to="/register" className="text-blue-700 hover:underline"> Sign up</Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

export default LoginForm;
