import React from "react";
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
import "../../styles/Welcome.css";
=======
import "./Welcome.css";
>>>>>>> d8278c2 (Pulled updates from master branch)
=======
import "../../styles/Welcome.css";
>>>>>>> 7c59e5a (Refactored Css styling from Master/improve Achievements page styling)
=======
import "../../styles/Welcome.css";
>>>>>>> 386749c (refactored CSS file structure for better coding practices)
import logo from '../assets/logo.png';
import sideImage from "../assets/Laptop.png"; 
import background from "../assets/WelcomeBackground.png"; 
import { useNavigate } from "react-router-dom";

const WelcomePage = () => {
  const navigate = useNavigate();
  return (
    <div className="welcome-page">
      {/* Background Image */}
      <img src={background} alt="Background" className="background-image" />
      
      <div className="welcome-container">
        <div className="content">
          <img src={logo} alt="EunoiaHub Logo" className="logo" />
          <h1>Welcome to <span className="highlight">EunoiaHub</span></h1>
          <h3>-Personal Sanctuary for Mental Wellness-</h3>
          <p>Your Journey to Well-being Starts Here</p>
          <p>
            At EunoiaHub, we believe in a holistic approach to mental wellness. Whether
            you're looking for guidance, self-reflection, or valuable resources,
            we're here to support you every step of the way.
          </p>
          <p>
            Our AI Chatbot offers guidance when you need it, with our Mental Checklist
            helping you track your well-being, and our Resources providing expert-backed tools
            for growth.
          </p>
          <p>
            Sign up or log in to begin your personalized wellness experience.
            Let’s make mental health a priority—together.
          </p>
          <button onClick={() => navigate("/login")} className="get-started">Get Started</button>
        </div>
        <img src={sideImage} alt="EunoiaHub Preview" className="side-image" />
      </div>
    </div>
  );
};

<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
export default WelcomePage;
=======
export default WelcomePage;
>>>>>>> d8278c2 (Pulled updates from master branch)
=======
export default WelcomePage;
>>>>>>> 7c59e5a (Refactored Css styling from Master/improve Achievements page styling)
=======
export default WelcomePage;
>>>>>>> d3f6374 (Revert "Achivements implementation")
