import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Menu, Users, CalendarDays, Settings } from 'lucide-react';
import { Drawer, DrawerTrigger, DrawerContent, DrawerHeader, DrawerTitle } from '@/components/ui/drawer';
import { NavLink, useNavigate, useOutletContext } from 'react-router-dom';
import axios from 'axios';
import { getAllMember } from '@/services/api';
import type { Response } from 'express';
import { useEffect, useState } from 'react';
import type { Member } from '@/services/useUser';

const expiredMembers = [
  { id: 1, name: 'John Doe', expiredAt: '2025-05-01' },
  { id: 2, name: 'Jane Smith', expiredAt: '2025-04-28' },
  { id: 3, name: 'Mark Evans', expiredAt: '2025-05-05' },
];

// export interface Member {
//   id: number;
//   name: string;
//   phone: string;
//   image: string;
//   expireDate: string;
//   status: string;
// }

export interface Visit {
  id: number;
  memberId: number;
  visitedAt: Date;
}

const getRelativeDateLabel = (dateStr: string): string => {
  const today = new Date();
  const target = new Date(dateStr);
  const diffTime = today.getTime() - target.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Yesterday';

  return target.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: today.getFullYear() !== target.getFullYear() ? 'numeric' : undefined,
  });
};

const groupByDate = (members: typeof expiredMembers) => {
  return members.reduce<Record<string, typeof expiredMembers>>((acc, member) => {
    const label = getRelativeDateLabel(member.expiredAt);
    if (!acc[label]) acc[label] = [];
    acc[label].push(member);
    return acc;
  }, {});
};

export function AdminDashboard() {
  // const { member } = useOutletContext<{ member: User[] }>();
  const [getMember, setGetMember] = useState([]);
  const [getVisit, setGetVisit] = useState([]);
  useEffect(() => {
    async function fetchMembers() {
      try {
        const member = await axios.get('http://127.0.0.1:3450/member/getallmember/');
        setGetMember(member.data);
        if (!localStorage.getItem('members')) {
        }
        const visit = await axios.get('http://127.0.0.1:3450/member/getTodayVisit/');
        setGetVisit(visit.data);
      } catch (error: any) {
        console.log(error);
      }
    }
    fetchMembers();
  }, []);
  const dataMember: Member[] = getMember;
  // const dataVisit: Visit[] = getVisit;

  const inactiveMember = dataMember.filter((obj) => obj.status == `INACTIVE`).length;
  const activeMember = getMember.length - inactiveMember;
  return (
    <div className="min-h-screen bg-gray-100 px-4 py-6 space-y-4">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold">Body Master Dashboard</h1>
        <Drawer>
          <DrawerTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
            </Button>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Expired Members</DrawerTitle>
            </DrawerHeader>
            <div className="p-4 space-y-4 max-h-[300px] overflow-y-auto">
              {Object.entries(groupByDate(expiredMembers)).map(([label, group]) => (
                <div key={label} onClick={() => alert('/members?status=inactive')} className="cursor-pointer hover:bg-gray-100 rounded px-3 py-2 transition">
                  <p className="text-sm font-medium text-gray-800">{label}</p>
                  <p className="text-xs text-gray-500">{group.length} members expired</p>
                </div>
              ))}
            </div>
          </DrawerContent>
        </Drawer>
      </div>

      {/* Summary Cards */}
      <div className="space-y-4">
        <Card className="bg-white">
          <CardContent className="py-4 px-4 flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Active Members</p>
              <p className="text-xl font-semibold">{activeMember}</p>
            </div>
            <Users className="h-6 w-6 text-gray-400" />
          </CardContent>
        </Card>

        <Card className="bg-white">
          <CardContent className="py-4 px-4 flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Visits Today</p>
              <p className="text-xl font-semibold">{getVisit.length}</p>
            </div>
            <CalendarDays className="h-6 w-6 text-gray-400" />
          </CardContent>
        </Card>
      </div>

      {/* Quick Navigation */}
      <div className="grid grid-cols-2 gap-4 mt-4">
        <NavLink to={'/payment'}>
          <Button className="w-full" variant="secondary">
            Payment Log
          </Button>
        </NavLink>
        <NavLink to={'/visitor'}>
          <Button className="w-full" variant="secondary">
            Visitor Log
          </Button>
        </NavLink>
        <NavLink to={'/memberlist'}>
          <Button className="w-full" variant="secondary">
            Member List
          </Button>
        </NavLink>
        <NavLink to={'/addmember'}>
          <Button className="w-full" variant="secondary">
            Add Member
          </Button>
        </NavLink>
      </div>
    </div>
  );
}
