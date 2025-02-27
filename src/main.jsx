import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Login from './pages/Login.jsx'
import { createBrowserRouter, RouterProvider, redirect} from 'react-router-dom'
import Dashboard from './pages/dashboard.jsx'
import { account } from './appwrite'



const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />,
  },
  {
    path: '/dashboard',
    element: <Dashboard />, // Use the new App component for the dashboard
  },
  {
    path: '/survey',
    element: <Dashboard />, //  ---------------> Change to the new survey component
  },
  {
    path: '/questionaire',
    element: <Dashboard />, // ----------------> Change to the new questionaire component
  },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
