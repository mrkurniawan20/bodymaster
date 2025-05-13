import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { useEffect, useState } from 'react';

interface Decoded {
  id: number;
}
export interface User {
  id: number;
  name: string;
  image: string;
  expireDate: Date;
  status: string;
}
export interface UserProps {
  user: User;
}

export function useUser() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setLoading(false);
      return;
    }
    try {
      const decoded = jwtDecode<Decoded>(token);
      const userId = decoded.id;
      console.log(userId);
      axios
        .get(`http://127.0.0.1:3450/member/getmember/${userId}`, { headers: { Authorization: `Bearer ${token}` } })
        // .get(`http://127.0.0.1:3450/member/getmember/${userId}`)
        .then((res) => setUser(res.data))
        // .then(() => console.log('running'))
        .catch((err) => {
          console.log(`Failed to fetch user ${err}`);
          localStorage.removeItem('token');
        })
        .finally(() => setLoading(false));
    } catch (error) {
      console.log('Unable to fetch user');
      localStorage.removeItem('token');
    }
  }, []);
  return { user, loading };
}
