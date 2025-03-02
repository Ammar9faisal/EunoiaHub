import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import Login from './pages/Login.jsx';
import { createBrowserRouter, RouterProvider, redirect } from 'react-router-dom';
import Dashboard from './pages/dashboard.jsx';
import Questionnaire from './pages/questionnaire.jsx'; // Corrected the typo

const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />, // Default path to login page
  },
  {
    path: '/dashboard', // Path to dashboard page
    element: <Dashboard />,
  },
  {
    path: '/questionnaire', // Path to questionnaire page
    element: <Questionnaire />, // Corrected the typo
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);


