import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
// import MemberInfo from './routes/user/MemberInfo';
import GymLogin from './routes/user/MemberLogin';
import MemberListDummy from './routes/admin/MemberListDummy';
import VisitorLog from './routes/admin/VisitorLog';
import AddMember from './routes/admin/AddMember';
import PaymentPage from './routes/admin/Payment';
import MemberLandingPage from './routes/user/MemberLandingPage';
import { BrowserRouter, Route, RouterProvider, Routes } from 'react-router-dom';
import { router } from './routes';

function App() {
  return (
    <RouterProvider router={router} />
    // // <BrowserRouter>
    // //   <Routes >
    // //     <Route path="/" Component={GymLogin}  />
    // //     <Route path="/landingPage" Component={MemberLandingPage} />
    // //     <Route path="/memberInfo" Component={MemberInfo} />
    // //     <Route path="/addMember" Component={AddMember} />
    // //     <Route path="/dashboard" Component={AdminDashboard} />
    // //     <Route path="/list" Component={MemberListDummy} />
    // //     <Route path="/visitorLog" Component={VisitorLog} />
    // //     <Route path="/payment" Component={PaymentPage} />
    // //   </Routes>
    // // </BrowserRouter>
    // <>
    //   <AdminDashboard />
    //   <AddMember />
    //   <GymLogin />
    //   <MemberInfo />
    //   <MemberListDummy />
    // </>
  );
}

export default App;
