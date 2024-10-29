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

const router = createBrowserRouter([
  {
    path: "/",
    element: <Auth />,
    children: [
      {
        path: "",
        element: <Navigate to={"/signin"}/>
        
      },
      {
        path: "signin",
        element: <Signin />
      },
      {
        path: "signup",
        element: <Signup />
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
