import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Login from './pages/Login.jsx'
import { createBrowserRouter, RouterProvider, redirect} from 'react-router-dom'
import Dashboard from './pages/dashboard.jsx'
import Survey from './pages/Survey.jsx'
import Questionnaire from './pages/questionnaire.jsx';

//harnain added
import { QuestionnaireProvider } from './QuestionnaireContext';



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
    path: '/dashboard', // Path to dashboard page
    element: <Dashboard />,
  },
  {
    path: '/questionnaire', // Path to questionnaire page
    element: <Questionnaire />, // Corrected the typo
  },
]);

//changes made by Harnain
createRoot(document.getElementById('root')).render(
  <StrictMode>
     <QuestionnaireProvider> 
    <RouterProvider router={router} />
    </QuestionnaireProvider>
  </StrictMode>
);