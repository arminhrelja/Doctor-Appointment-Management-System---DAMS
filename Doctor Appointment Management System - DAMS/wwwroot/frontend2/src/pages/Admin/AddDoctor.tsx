import React from 'react';
import Header from '../../components/Header';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import AdminSidebar from '@/components/AdminSidebar';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

type FormData = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    speciality: string;
    experience: number;
    fee: number;
    about: string;
};

const AddDoctor: React.FC = () => {
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
        reset,
    } = useForm<FormData>();

    const onSubmit = async (data: FormData) => {
        try {
            const requestData = {
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
                password: data.password,
                speciality: data.speciality,
                experience: Number(data.experience),
                fee: Number(data.fee),
                about: data.about,
                roleId: 2
            };

            const response = await fetch("https://localhost:7036/api/Doctor/add", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(requestData),
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(errorText || "Neuspje�no dodavanje doktora.");
            }

            toast.success("Doctor added successfully!");
            reset();
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (err) {
            toast.error("Failed to add doctor");
        }
    };

  return (
      <div className="flex flex-col min-h-screen">
          <Header />
          <div className="flex flex-1">
              <AdminSidebar />
              <main className="flex-1 p-6">
                  <div className="flex justify-between items-center mb-6">
                      <h1 className="text-2xl font-bold">Add Doctor</h1>
                  </div>
                  <form className="grid grid-cols-1 gap-6 md:grid-cols-2" onSubmit={handleSubmit(onSubmit)}>
                      <div className="flex flex-col">
                          <label className="mb-2 font-semibold text-lg">First Name</label>
                          <input className="p-3 border rounded" {...register("firstName", { required: "First name is required" })} />
                          {errors.firstName && <span className="text-red-500">{errors.firstName.message}</span>}
                      </div>
                      <div className="flex flex-col">
                          <label className="mb-2 font-semibold text-lg">Last Name</label>
                          <input className="p-3 border rounded" {...register("lastName", { required: "Last name is required" })} />
                          {errors.lastName && <span className="text-red-500">{errors.lastName.message}</span>}
                      </div>
                      <div className="flex flex-col">
                          <label className="mb-2 font-semibold text-lg">Email</label>
                          <input type="email" className="p-3 border rounded" {...register("email", { required: "Email is required" })} />
                          {errors.email && <span className="text-red-500">{errors.email.message}</span>}
                      </div>
                      <div className="flex flex-col">
                          <label className="mb-2 font-semibold text-lg">Password</label>
                          <input type="password" className="p-3 border rounded" {...register("password", { required: "Password is required" })} />
                          {errors.password && <span className="text-red-500">{errors.password.message}</span>}
                      </div>
                      <div className="flex flex-col">
                          <label className="mb-2 font-semibold text-lg">Specialty</label>
                          <Select onValueChange={(val) => setValue("speciality", val)} >
                              <SelectTrigger className="p-3 border rounded">
                                  <SelectValue placeholder="Select specialty" />
                              </SelectTrigger>
                              <SelectContent>
                                  {["Cardiology", "Neurology", "Pulmonology", "Pediatrics", "Oncology", "Infectious Diseases", "Dermatology", "Psychiatry", "Gynecology"].map(s => (
                                      <SelectItem key={s} value={s}>{s}</SelectItem>
                                  ))}
                              </SelectContent>
                          </Select>
                          {errors.speciality && <span className="text-red-500">Specialty is required</span>}
                      </div>
                      <div className="flex flex-col">
                          <label className="mb-2 font-semibold text-lg">Experience (years)</label>
                          <input type="number" className="p-3 border rounded" {...register("experience", { required: "Experience is required" })} />
                          {errors.experience && <span className="text-red-500">{errors.experience.message}</span>}
                      </div>
                      <div className="flex flex-col">
                          <label className="mb-2 font-semibold text-lg">Fee (BAM)</label>
                          <input type="number" className="p-3 border rounded" {...register("fee", { required: "Fee is required" })} />
                          {errors.fee && <span className="text-red-500">{errors.fee.message}</span>}
                      </div>
                      <div className="col-span-2 flex flex-col">
                          <label className="mb-2 font-semibold text-lg">About Doctor</label>
                          <textarea className="p-3 border rounded h-32" {...register("about", { required: "This field is required" })} />
                          {errors.about && <span className="text-red-500">{errors.about.message}</span>}
                      </div>
                      <div className="col-span-1 flex">
                          <Button type="submit" className="bg-blue-700 text-white px-8 py-6 rounded-xl hover:bg-blue-800 text-xl cursor-pointer">
                              Add Doctor
                          </Button>
                      </div>
                  </form>
              </main>
          </div>
      </div>
  );
};

export default AddDoctor;