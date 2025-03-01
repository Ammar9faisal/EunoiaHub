import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Login from './pages/Login.jsx'
import { createBrowserRouter, RouterProvider, redirect} from 'react-router-dom'
import Dashboard from './pages/dashboard.jsx'
import { account } from './appwrite'
import Question1 from './pages/Question1.jsx'
import Question2 from './pages/Question2.jsx'
import Question3 from './pages/Question3.jsx'
import Question4 from './pages/Question4.jsx'
import Question5 from './pages/Question5.jsx'
import Question6 from './pages/Question6.jsx'
import Question7 from './pages/Question7.jsx'
import Question8 from './pages/Question8.jsx'
import Question9 from './pages/Question9.jsx'
import Question10 from './pages/Question10.jsx'
import QResults from './pages/QResults.jsx'
import Intro from './pages/Intro.jsx';


const router = createBrowserRouter([  //initialize the browser rerouter to navigate between pages
  {
    path: '/',
    element: <Login />,    //creates default path to login page
  },
  {
    path: '/dashboard',     //creates path to dashboard page
    element: <Dashboard />,
    // loader: async () => {
    //   try{
    //     // logged in? pass user to the route
    //     const user = await account.get();
    //     return { user };
    //   }
    //   catch {
    //     // not logged in? redirect to login page
    //     throw redirect('/')  
    //   }
    // }
  },

  {
    path: '/question1',    //creates path to login page
    element: <Question1 />,
  },

  {
    path: '/question2',    //creates path to login page
    element: <Question2 />,
  },

  {
    path: '/question3',    //creates path to login page
    element: <Question3 />,
  },

  {
    path: '/question4',    //creates path to login page
    element: <Question4 />,
  },

  {
    path: '/question5',    //creates path to login page
    element: <Question5 />,
  },

  {
    path: '/question6',    //creates path to login page
    element: <Question6 />,
  },

  {
    path: '/question7',    //creates path to login page
    element: <Question7 />,
  },

  {
    path: '/question8',    //creates path to login page
    element: <Question8 />,
  },

  {
    path: '/question9',    //creates path to login page
    element: <Question9 />,
  },

  {
    path: '/question10',    //creates path to login page
    element: <Question10 />,
  },

  {
    path: '/QResults',    //creates path to login page
    element: <QResults />,
  },

  {
    path: '/intro',    //creates path to login page
    element: <Intro />,
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)


