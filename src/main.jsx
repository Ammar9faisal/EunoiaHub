import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import Login from './pages/Login.jsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Dashboard from './pages/dashboard.jsx';
import Survey from './pages/Survey.jsx';
import Settings from './pages/Settings.jsx'; // Settings component 

const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />, // Default path to login page
  },
  {
    path: '/survey',
    element: <Survey />, // Path for the survey/check-in
  },
  {
    path: '/dashboard',
    element: <Dashboard />, // Path for the dashboard
  },
  {
    path: '/questionaire',
    element: <Survey />, // Path for the questionnaire
  },
  {
    path: '/settings', // New route for settings page
    element: <Settings />, 
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);