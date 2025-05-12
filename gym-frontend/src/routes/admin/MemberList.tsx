import { useState, useEffect } from 'react';
import axios from 'axios';

export default function MemberList() {
  const [search, setSearch] = useState('');
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get('/api/members', {
          params: { search },
          signal: controller.signal, // kasih signal untuk abort
        });
        setMembers(response.data);
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log('Request dibatalkan');
        } else {
          console.error(error);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    // Clean-up function untuk cancel request
    return () => {
      controller.abort(); // cancel request kalo effect rerun atau komponen unmount
    };
  }, [search]); // fetch data ulang setiap `search` berubah

  return (
    <div>
      <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search Members" />
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {members.map((member) => (
            <li key={member.id}>{member.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
