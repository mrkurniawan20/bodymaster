import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Kalau kamu pakai React Router

type MemberForm = {
  name: string;
  phone: string;
};

export default function AddMember() {
  const [form, setForm] = useState<MemberForm>({
    name: '',
    phone: '',
  });

  //   const navigate = useNavigate(); // Optional, kalau mau redirect setelah submit

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Kirim ke backend di sini
    console.log('Submitting new member:', form);
    // navigate('/dashboard'); // kalau mau balik ke dashboard
  };

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-6 space-y-4">
      <h1 className="text-xl font-bold">Add New Member</h1>

      <Card className="bg-white max-w-xl mx-auto">
        <CardContent className="p-6">
          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* Name */}
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" name="name" value={form.name} onChange={handleChange} placeholder="Enter full name" required className="mt-2" />
            </div>

            {/* Phone */}
            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <Input id="phone" name="phone" value={form.phone} onChange={handleChange} placeholder="08xxxxxxxxxx" required className="mt-2" />
            </div>

            {/* Submit */}
            <Button type="submit" className="w-full mt-4">
              Add Member
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
