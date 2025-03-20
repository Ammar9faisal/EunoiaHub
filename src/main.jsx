import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Login from './pages/Login.jsx';
import Dashboard from './pages/dashboard.jsx';
import Survey from './pages/Survey.jsx';
import Questionnaire from './pages/Questionnaire.jsx';
import FindHelp from './pages/FindHelp.jsx';
import ToDoList from './pages/ToDoList.jsx';
import UserTickets from './pages/UserTickets.jsx';
import Resources from './pages/Resources.jsx';
import VisionBoard from './pages/VisionBoard.jsx';
import Achievements from './pages/Achievements.jsx'; // Import Achievements page
import { AuthProvider } from './components/AuthContext.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />, 
  },
  {
    path: '/survey',
    element: (
      <ProtectedRoute>
        <Survey />
      </ProtectedRoute>
    ),
  },
  {
    path: '/dashboard',
    element: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: '/achievements',
    element: (
      <ProtectedRoute>
        <Achievements />
      </ProtectedRoute>
    ),
  },
  {
    path: '/questionnaire',
    element: <Questionnaire />
  },
  {
    path: '/findhelp',
    element: (
      <ProtectedRoute>
        <FindHelp />
      </ProtectedRoute>
    ),
  },
  {
    path: '/todo',
    element: (
      <ProtectedRoute>
        <ToDoList />
      </ProtectedRoute>
    ),
  },
  {
    path: '/resources',
    element: (
      <ProtectedRoute>
        <Resources />
      </ProtectedRoute>
    ),
  },
  {
    path: '/usertickets',
    element: (
      <ProtectedRoute>
        <UserTickets />
      </ProtectedRoute>
    ),
  },
  {
    path: '/visionboard',
    element: (
      <ProtectedRoute>
        <VisionBoard />
      </ProtectedRoute>
    ),
  },
  {
    path: '/vision-board',
    element: (
      <ProtectedRoute>
        <VisionBoard />
      </ProtectedRoute>
    ),
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);
