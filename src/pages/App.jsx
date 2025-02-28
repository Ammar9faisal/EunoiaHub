// App.jsx or your routing file
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Question1 from './Question1';  
import QResults from './QResults';   
import Dashboard from './dashboard'; 

//main component that contains all the routes
function App() {
  return (
    // Router component that contains all the routing
    <Router>  
        {/* Routes is container for all route components */}
      <Routes>
        <Route path="/Question1" element={<Question1 />} />
        <Route path="/Question1" element={<Question2 />} />
        <Route path="/Question1" element={<Question3 />} />
        <Route path="/Question1" element={<Question4 />} />
        <Route path="/Question1" element={<Question5 />} />
        <Route path="/Question1" element={<Question6 />} />
        <Route path="/Question1" element={<Question7 />} />
        <Route path="/Question1" element={<Question8 />} />
        <Route path="/Question1" element={<Question9 />} />
        <Route path="/Question1" element={<Question10 />} />

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
