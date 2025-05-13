import React, { useEffect } from 'react';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { useUser } from '@/services/useUser';
// import { useUser } from '@/utils/setUser';

interface DecodedProps {
  id: number;
  exp: number;
}

function ProtectedRouteLayout() {
  // const { user } = useUserStore();
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  // if (!token) {
  //   return;
  // }
  // useEffect(() => {
  //   if (!token) {
  //     navigate('/login');
  //   }
  //   return;
  // }, []);
  //   if (!token) {
  //     navigate('/login');
  //     return;
  //   }

  // const decoded = jwtDecode<DecodedProps>(token);
  // const userId = decoded.id;

  function isTokenExpired(token: string): boolean {
    const decoded = jwtDecode<DecodedProps>(token);
    try {
      // console.log(decoded.exp);
      //   console.log(decoded);
      return decoded.exp * 1000 < Date.now();
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

  const { user, loading } = useUser();
  if (loading) {
    return <div>Loading...</div>;
  }

  //   const isLogin = true;
  // const user = useUser();

  if (!token) {
    return <Navigate to={'/'} />;
  } else {
    return <Outlet context={{ user }} />;
  }
}

export default ProtectedRouteLayout;
