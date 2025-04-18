import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import AdminSidebar from '@/components/AdminSidebar';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface InstitutionType {
  institutionTypeId: number;
  name: string;
}

const AddInstitution: React.FC = () => {
  const [types, setTypes] = useState<InstitutionType[]>([]);
  const [form, setForm] = useState({
    name: '',
    address: '',
    phoneNumber: '',
    email: '',
    institutionTypeId: ''
  });

  useEffect(() => {
    fetch('https://localhost:7036/api/Institution/types')
      .then(res => res.json())
      .then(data => setTypes(data));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('https://localhost:7036/api/Institution/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          address: form.address,
          phoneNumber: form.phoneNumber,
          email: form.email,
          institutionTypeId: Number(form.institutionTypeId)
        })
      });
      if (!response.ok) throw new Error(await response.text());
      toast.success('Institution added successfully!');
      setForm({ name: '', address: '', phoneNumber: '', email: '', institutionTypeId: '' });
    } catch (err: any) {
      toast.error(err.message || 'Failed to add institution');
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex flex-1">
        <AdminSidebar />
        <main className="flex-1 p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Add Institution</h1>
          </div>
          <form className="grid grid-cols-1 gap-6 md:grid-cols-2 max-w-2xl" onSubmit={handleSubmit}>
            <div className="flex flex-col">
              <label className="mb-2 font-semibold text-lg">Name</label>
              <input className="p-3 border rounded" name="name" value={form.name} onChange={handleChange} required />
            </div>
            <div className="flex flex-col">
              <label className="mb-2 font-semibold text-lg">Address</label>
              <input className="p-3 border rounded" name="address" value={form.address} onChange={handleChange} required />
            </div>
            <div className="flex flex-col">
              <label className="mb-2 font-semibold text-lg">Phone Number</label>
              <input className="p-3 border rounded" name="phoneNumber" value={form.phoneNumber} onChange={handleChange} />
            </div>
            <div className="flex flex-col">
              <label className="mb-2 font-semibold text-lg">Email</label>
              <input className="p-3 border rounded" name="email" value={form.email} onChange={handleChange} />
            </div>
            <div className="flex flex-col">
              <label className="mb-2 font-semibold text-lg">Institution Type</label>
              <select
                className="p-3 border rounded"
                name="institutionTypeId"
                value={form.institutionTypeId}
                onChange={handleChange}
                required
              >
                <option value="" disabled>Select type</option>
                {types.map(type => (
                  <option key={type.institutionTypeId} value={type.institutionTypeId}>{type.name}</option>
                ))}
              </select>
            </div>
            <div className="col-span-2 flex">
              <Button
                className="bg-blue-700 text-white px-8 py-6 rounded-xl hover:bg-blue-800 text-xl cursor-pointer shadow-md font-semibold transition"
                type="submit"
              >
                Add Institution
              </Button>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
};

export default AddInstitution;
