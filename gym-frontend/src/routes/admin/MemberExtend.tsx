import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useParams, useNavigate, useOutletContext } from 'react-router-dom';
import axios from 'axios';
import type { Member } from '@/services/useUser';

export default function MemberExtend() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const { member } = useOutletContext<{ member: Member[] }>();
  console.log(member);
  // const { id } = ; // ambil ID dari URL
  // useEffect(() => {
  //   if (user.id !== Number(id)) {
  //     navigate('/landingpage');
  //   }
  // }, []);

  const [formData, setFormData] = useState({
    id: undefined,
  });
  // const [id, setId] = useState('');
  // setFormData({
  //   name: user.name,
  //   phone: user.phone,
  //   password: '',
  // });

  const [loading, setLoading] = useState(false);

  // Fetch data member berdasarkan ID
  // useEffect(() => {
  //   const fetchMember = async () => {
  //     try {
  //       const res = await axios.get(`http://127.0.0.1:3450/member/getmember/${id}`, {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       });
  //       setFormData({
  //         name: res.data.name || '',
  //         phone: res.data.phone || '',
  //         password: '',
  //       });
  //     } catch (err) {
  //       console.error('Error fetching member:', err);
  //       navigate('/landingpage');
  //     }
  //   };

  //   fetchMember();
  // }, [id]);

  //   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //     const { name, value } = e.target;
  //     setFormData((prev) => ({
  //       ...prev,
  //       [name]: value,
  //     }));
  //   };

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    console.log(formData);
    setButtonDisable(true);
    setFormData({ ...formData, [e.target.name]: Number(e.target.value) });
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(`http://localhost:3450/member/extendmember/`, formData);
      navigate('/dashboard');
    } catch (err: any) {
      console.error('Update failed:', err);
    } finally {
      setLoading(false);
    }
  };
  const [buttonDisable, setButtonDisable] = useState(true);
  function handleClick(e: React.MouseEvent) {
    e.preventDefault();
    setButtonDisable(false);
  }
  // console.log(formData);
  return (
    <div className="min-h-screen bg-gray-50 px-4 py-6">
      <div className="max-w-md mx-auto bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4 text-center">Edit Member</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name" className="mb-2">
              Member ID
            </Label>
            <div className="flex">
              <Input id="id" name="id" value={formData.id} onChange={handleChange} placeholder="ID" /> &ensp;
              <Button onClick={handleClick}>Check Name</Button>
            </div>
          </div>
          {!buttonDisable && <div className="flex items-center justify-between font-bold">{<p>{`${member.find((m) => m.id === Number(formData.id))?.name ?? 'MEMBER TIDAK ADA '}`}</p>}</div>}
          {buttonDisable ? (
            <Button type="submit" className="w-full" disabled>
              Extend
            </Button>
          ) : (
            <Button type="submit" className="w-full">
              Extend
            </Button>
          )}
        </form>
      </div>
    </div>
  );
}
