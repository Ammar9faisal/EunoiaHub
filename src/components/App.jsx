// App.jsx or your routing file
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Question1 from '../pages/Question1';  
import Question2 from '../pages/Question2';  
import Question3 from '../pages/Question3';  
import Question4 from '../pages/Question4';  
import Question5 from '../pages/Question5';  
import Question6 from '../pages/Question6';  
import Question7 from '../pages/Question7';  
import Question8 from '../pages/Question8';  
import Question9 from '../pages/Question9';  
import Question10 from '../pages/Question10'; 
 
import QResults from '../pages/QResults';   
import Dashboard from '../pages/dashboard'; 

//main component that contains all the routes
function App() {
  return (
    // Router component that contains all the routing
    <Router>  
        {/* Routes is container for all route components */}
      <Routes>
        <Route path="/Question1" element={<question1 />} />
        <Route path="/Question1" element={<question2 />} />
        <Route path="/Question1" element={<question3 />} />
        <Route path="/Question1" element={<question4 />} />
        <Route path="/Question1" element={<question5 />} />
        <Route path="/Question1" element={<question6 />} />
        <Route path="/Question1" element={<question7 />} />
        <Route path="/Question1" element={<question8 />} />
        <Route path="/Question1" element={<question9 />} />
        <Route path="/Question1" element={<question10 />} />

        <Route path="/QResults" element={<QResults />} />
        <Route path="/dashboard" element={<dashboard />} />

        {/* Catch-all route for 404 
        The fallback route for all undefined paths*/}

        <Route path="*" element={<h1>404 - Page Not Found</h1>} />
      </Routes>
    </Router>
  );
}

export default App;
