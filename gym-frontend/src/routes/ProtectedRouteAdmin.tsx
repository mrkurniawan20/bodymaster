import React, { useEffect } from 'react';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { useMember, useUser } from '@/services/useUser';
import LoadingPage from './LoadingPage';
// import { useUser } from '@/utils/setUser';

interface DecodedProps {
  id: number;
  role: string;
  exp: number;
}

export function ProtectedRouteLayoutAdmin() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const decoded = jwtDecode<DecodedProps>(token!);
  function isTokenExpired(token: string): boolean {
    try {
      const decodedData = jwtDecode<DecodedProps>(token!);
      // console.log(decoded.exp);
      //   console.log(decoded);
      console.log(decodedData);
      return decodedData.exp * 1000 < Date.now();
    } catch (error) {
      return true;
    }
  }
  const title = document.title;
  useEffect(() => {
    if (token && isTokenExpired(token)) {
      localStorage.removeItem('token');
      navigate('/login');
    }
  }, [title]);

  const { member, visit, todayVisit, loading } = useMember();
  if (loading) {
    return <LoadingPage />;
  }
  console.log(decoded.role);
  if (decoded.role !== 'ADMIN') {
    return <Navigate to={'/'} />;
  } else {
    return <Outlet context={{ member, visit, todayVisit }} />;
  }
}
