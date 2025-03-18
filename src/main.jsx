import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import Login from './pages/Login.jsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Dashboard from './pages/dashboard.jsx';
import Survey from './pages/Survey.jsx';
import Questionnaire from './pages/Questionnaire.jsx';
import FindHelp from './pages/FindHelp.jsx';
import ToDoList from './pages/ToDoList.jsx';
import UserTickets from './pages/UserTickets.jsx';
import Resources from './pages/Resources.jsx';
import VisionBoard from './pages/VisionBoard.jsx'; // Added VisionBoard import
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
    path: '/resources', // Path to resources page
    element: (
      <ProtectedRoute>
        <Resources />
      </ProtectedRoute>
    ), // Corrected the typo
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
        <VisionBoard/>
      </ProtectedRoute>
    ),
  },

  {
    path: '/vision-board', // Add the Vision Board route
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