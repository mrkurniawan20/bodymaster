import { createBrowserRouter } from 'react-router-dom';
import ProtectedRouteLayout from './ProtectedRoute';
import MemberLandingPage from './user/MemberLandingPage';
import MemberInfo from './user/MemberInfo';
import GymLoginMobile from './user/MemberLogin';

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
        Component: MemberInfo,
      },
      // {
      //     path
      // }
    ],
  },
  {
    path: '/',
    Component: GymLoginMobile,
  },
]);
