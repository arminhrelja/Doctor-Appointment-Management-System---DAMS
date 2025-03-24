import React from 'react';
import Header from '../components/Header';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import AdminSidebar from '@/components/AdminSidebar';

const AddDoctor: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex flex-1">
        <AdminSidebar />
        <main className="flex-1 p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Add Doctor</h1>
          </div>
          <form className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="flex flex-col">
              <label className="mb-2 font-semibold text-lg">Your name</label>
              <input type="text" className="p-3 border rounded" placeholder="Name" />
            </div>
            <div className="flex flex-col">
              <label className="mb-2 font-semibold text-lg">Specialty</label>
              <Select>
                <SelectTrigger className="p-6 border rounded w-full text-md">
                  <SelectValue placeholder="Select specialty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Cardiology">Cardiology</SelectItem>
                  <SelectItem value="Neurology">Neurology</SelectItem>
                  <SelectItem value="Pulmonology">Pulmonology</SelectItem>
                  <SelectItem value="Pediatrics">Pediatrics</SelectItem>
                  <SelectItem value="Oncology">Oncology</SelectItem>
                  <SelectItem value="Infectious Diseases">Infectious Diseases</SelectItem>
                  <SelectItem value="Dermatology">Dermatology</SelectItem>
                  <SelectItem value="Psychiatry">Psychiatry</SelectItem>
                  <SelectItem value="Gynecology">Gynecology</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col">
              <label className="mb-2 font-semibold text-lg">Doctor Email</label>
              <input type="email" className="p-3 border rounded" placeholder="Email" />
            </div>
            <div className="flex flex-col">
              <label className="mb-2 font-semibold text-lg">Set Password</label>
              <input type="password" className="p-3 border rounded" placeholder="Password" />
            </div>
            <div className="flex flex-col">
              <label className="mb-2 font-semibold text-lg">Experience</label>
              <input type="text" className="p-3 border rounded" placeholder="Experience" />
            </div>
            <div className="col-span-2 flex flex-col">
              <label className="mb-2 font-semibold text-lg">About Doctor</label>
              <textarea className="p-3 border rounded h-32" placeholder="Write about doctor"></textarea>
            </div>
            <div className="col-span-1 flex">
              <Button className="bg-blue-700 text-white px-8 py-6 rounded-xl hover:bg-blue-800 text-xl">
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