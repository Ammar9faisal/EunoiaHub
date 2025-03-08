import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import Login from './pages/Login.jsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Dashboard from './pages/dashboard.jsx';
import Survey from './pages/Survey.jsx';
import Settings from './pages/Settings.jsx';
import VisionBoard from './pages/VisionBoard.jsx'; // Import Vision Board page

const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />, 
  },
  {
    path: '/survey',
    element: <Survey />, 
  },
  {
    path: '/dashboard',
    element: <Dashboard />, 
  },
  {
    path: '/vision-board', // Add the Vision Board route
    element: <VisionBoard />, 
  },
  {
    path: '/settings',
    element: <Settings />, 
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
