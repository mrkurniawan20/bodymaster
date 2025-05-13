import { createBrowserRouter } from 'react-router-dom';
import ProtectedRouteLayout from './ProtectedRoute';
import MemberLandingPage from './user/MemberLandingPage';
import { MemberInfoPage } from './user/MemberInfo';
import GymLoginMobile from './user/MemberLogin';
import EditMemberPage from './user/MemberEdit';

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
    ],
  },
  {
    path: '/',
    Component: GymLoginMobile,
  },
]);
