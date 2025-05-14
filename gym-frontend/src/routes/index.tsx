import { createBrowserRouter } from 'react-router-dom';
import ProtectedRouteLayout from './ProtectedRoute';
import MemberLandingPage from './user/MemberLandingPage';
import { MemberInfoPage } from './user/MemberInfo';
import GymLoginMobile from './user/MemberLogin';
import EditMemberPage from './user/MemberEdit';
import NotFoundPage from './NotFound';
import { AdminDashboard } from './admin/AdminDashBoard';
import AddMember from './admin/AddMember';
import VisitorLog from './admin/VisitorLog';

export let router = createBrowserRouter([
  {
    Component: ProtectedRouteLayout,
    children: [
      {
        path: '/landingPage',
        Component: MemberLandingPage,
      },
      {
        path: '/memberInfo',
        Component: MemberInfoPage,
      },
      {
        path: '/editMember/:id',
        Component: EditMemberPage,
      },
      {
        path: '/dashboard',
        Component: AdminDashboard,
      },
      {
        path: '/addmember',
        Component: AddMember,
      },
      {
        path: '/visitor',
        Component: VisitorLog,
      },
    ],
  },
  {
    path: '/',
    Component: GymLoginMobile,
  },
  {
    path: '*',
    Component: NotFoundPage,
  },
]);
