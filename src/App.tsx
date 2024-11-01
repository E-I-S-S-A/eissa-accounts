import React from 'react';
import './App.css';
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import Auth from './pages/Auth/Auth';
import Signin from './components/Signin/Signin';
import Signup from './components/Signup/Signup';
import { ROUTES } from './constants/routes';
import ForgotPassword from './components/ForgotPassword/ForgotPassword';

const router = createBrowserRouter([
  {
    path: ROUTES.auth.root,
    element: <Auth />,
    children: [
      {
        path: ROUTES.auth.root,
        element: <Navigate to={ROUTES.auth.signin}/>
        
      },
      {
        path: ROUTES.auth.signin,
        element: <Signin />
      },
      {
        path: ROUTES.auth.signup,
        element: <Signup />
      },
      {
        path: ROUTES.auth.forgotPassword,
        element: <ForgotPassword />
      }
    ]
  },
]);


function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
