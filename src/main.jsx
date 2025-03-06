import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import Login from './pages/Login.jsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Dashboard from './pages/dashboard.jsx';
import Survey from './pages/Survey.jsx';
import Questionnaire from './pages/questionnaire.jsx';
import UserProfile from './pages/UserProfile.jsx';
import BlogPage from './pages/BlogPage.jsx';

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
    path: '/user',
    element: <UserProfile />,
  },
  {
    path: '/questionnaire',
    element: <Questionnaire />,
  },
  {
    path: '/blog',  // New route for Blog Page
    element: <BlogPage />,
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);



