import './Login.css';
import React, { useState, useEffect } from 'react';
import { validateEmail, handleCreateAccount, handleExistingAccount } from '../services/loginService';
import background from '../assets/Purple.png';
import { useNavigate } from 'react-router-dom';
import { account } from '../appwrite';

function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true); // Add loading state
  const [error, setError] = useState(''); // Add error state

  useEffect(() => {
    // Check if the user is already logged in
    account.get().then(
      () => {
        navigate('/dashboard'); // If logged in, navigate to the dashboard
        setLoading(false); // Set loading to false
      },
      () => {
        setLoading(false); // If not logged in, set loading to false
      }
    );
  }, [navigate]); // Empty dependency array ensures this runs only once

  const [email, setUser] = useState(""); // State for sign-up email
  const [password, setPassword] = useState(""); // State for sign-up password

  const [loginEmail, setLoginUser] = useState(""); // State for login email
  const [loginPassword, setLoginPassword] = useState(""); // State for login password

  // Toggle between Sign Up and Sign In screens
  function toggle() {
    setError(''); // Clear error message
    const signUp = document.querySelector('.signUp');
    const signIn = document.querySelector('.signIn');
    const signUpBtn = document.querySelector('.signup-btn');
    const signInBtn = document.querySelector('.signin-btn');

    if (signUp.style.display === 'none') {
      signUp.style.display = 'block';
      signIn.style.display = 'none';
      signUpBtn.style.display = 'none';
      signInBtn.style.display = 'block';
    } else {
      signUp.style.display = 'none';
      signIn.style.display = 'block';
      signUpBtn.style.display = 'block';
      signInBtn.style.display = 'none';
    }
  }

  if (loading) {
    return <div>Loading...</div>; // Show loading state while checking for logged-in user
  }

  return (
    <div className="loginPage">
      <img src={background} alt='background' className='login-background' /> {/* Background image */}
      <div className='login-container'>
        <div className='signUp' style={{ display: 'none' }}> {/* Sign up hidden by default */}
          <h1>Sign Up</h1>
          <input className="email" type="email" placeholder="Email" onChange={e => setUser(e.target.value)} /> {/* Inputs for sign-up */}
          {email && !validateEmail(email) && <p style={{ color: 'red' }}>Invalid email format</p>} {/* Error message for invalid email format */}
          <input className="password" type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
          {password && (password.length < 8 || password.length > 256) && <p style={{ color: 'red' }}>Password must be between 8-256 chars long</p>}
          {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error message */}
          <button className="button" onClick={() => handleCreateAccount(email, password, navigate, setError)}>Create Account</button> {/* Button to create account */}
          <h3>Or Sign-In Using</h3>
          <button className='signin-btn' onClick={toggle}>Sign-In</button> {/* Button to toggle to sign-in screen */}
        </div>

        <div className='signIn'>
          <h1>Login</h1>
          <input className="email" type="email" placeholder="Type your email" onChange={e => setLoginUser(e.target.value)} /> {/* Inputs for sign-in */}
          {loginEmail && !validateEmail(loginEmail) && <p style={{ color: 'red' }}>Invalid email format</p>} {/* Error message for invalid email format */}
          <input className="password" type="password" placeholder="Type your password" onChange={e => setLoginPassword(e.target.value)} />
          {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error message */}
          <button className="button" onClick={() => handleExistingAccount(loginEmail, loginPassword, navigate, setError)}>Login</button> {/* Button to login */}
          <h3>Or Sign-Up Using:</h3>
          <button className='signup-btn' onClick={toggle}>Sign Up</button> {/* Button to toggle to sign-up screen */}
        </div>
      </div>
    </div>
  );
}

export default Login;