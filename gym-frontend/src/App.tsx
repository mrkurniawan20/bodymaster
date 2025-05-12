import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import MemberInfo from './routes/user/MemberInfo';
import GymLogin from './routes/user/MemberLogin';
import AdminDashboard from './routes/admin/AdminDashBoard';
import MemberListDummy from './routes/admin/MemberListDummy';
import VisitorLog from './routes/admin/VisitorLog';
import AddMember from './routes/admin/AddMember';
import PaymentPage from './routes/admin/Payment';

function App() {
  return (
    <>
      {/* <MemberInfo /> */}

      {/* <GymLogin /> */}
      {/* <AdminDashboard /> */}
      {/* <MemberListDummy /> */}
      {/* <VisitorLog /> */}
      <AddMember />
      {/* <PaymentPage /> */}
    </>
  );
}

export default App;
