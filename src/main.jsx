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
import VisionBoard from './pages/VisionBoard.jsx';
import DailyExercises from './pages/DailyExercises.jsx';
import { AuthProvider } from './components/AuthContext.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import BlogPage from './pages/BlogPage.jsx';
import WelcomePage from './pages/Welcome.jsx';
import MessageBottle from './pages/MessageBottle.jsx';
import Achievements from './pages/Achievements.jsx';
import BubbleGame from './pages/BubbleGame.jsx';
import HabitTracker from './pages/HabitTracker.jsx'; // ✅ Added back


const router = createBrowserRouter([
  {
    path: '/login',
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
    element: <Questionnaire />,
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
    path: '/blogpage',
    element: (
      <ProtectedRoute>
        <BlogPage />
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
  {
    path: '/dailyexercises',
    element: (
      <ProtectedRoute>
        <DailyExercises />
      </ProtectedRoute>
    ),
  },
  {
    path: '/',
    element: <WelcomePage />,
  },
  {
    path: '/messageinabottle',
    element: (
      <ProtectedRoute>
        <MessageBottle />
      </ProtectedRoute>
    ),
  },
  {
    path: '/bubblegame',
    element: (
      <ProtectedRoute>
        <BubbleGame />
      </ProtectedRoute>
    ),
  },
  {

    path: '/habittracker', // ✅ Added back

    element: (
      <ProtectedRoute>
        <HabitTracker />
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