import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Login from './pages/Login.jsx'
import { createBrowserRouter, RouterProvider, redirect} from 'react-router-dom'
import Dashboard from './pages/dashboard.jsx'
import { account } from './appwrite'
import Survey from './pages/Survey.jsx'



const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />,
  },
  {
    path: '/survey',
    element: <Survey />,    //creates default path to login page
  },
  {
    path: '/dashboard',
    element: <Dashboard />, // Use the new App component for the dashboard
  },
  {
    path: '/questionaire',
    element: <Survey />, // ----------------> Change to the new questionaire component
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);