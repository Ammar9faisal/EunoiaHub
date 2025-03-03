import './Login.css';
import { React, useState } from 'react';
import { validateEmail, handleLogin, handleCreateAccount, handleExistingAccount } from '../services/loginService';
import GoogleButton from 'react-google-button';
import background from '../assets/Purple.png';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();

  const [email, setUser] = useState("");      // Initialized the state of inputs for sign up
  const [password, setPassword] = useState("");

  const [loginEmail, setLoginUser] = useState("");  // Initialized the state of inputs for login
  const [loginPassword, setLoginPassword] = useState("");

  function toggle() { // Toggle between Sign Up and Sign In screens 
    const signUp = document.querySelector('.signUp');
    const signIn = document.querySelector('.signIn');
    const signUpBtn = document.querySelector('.signup-btn');
    const signInBtn = document.querySelector('.signin-btn');

    if (signUp.style.display === 'none') {   // If sign up is hidden, show sign up and hide sign in
      signUp.style.display = 'block';
      signIn.style.display = 'none';
      signUpBtn.style.display = 'none';
      signInBtn.style.display = 'block';
    } else {
      signUp.style.display = 'none';    // If sign up is shown, hide sign up and show sign in
      signIn.style.display = 'block';
      signUpBtn.style.display = 'block';
      signInBtn.style.display = 'none';
    }
  }

  return (
    <div className="loginPage">
      <img src={background} alt='background' className='login-background' /> {/* Background image*/}
      <div className='login-container'>
        <div className='signUp' style={{ display: 'none' }}>   {/* Sign up hidden by default*/}
          <h1>Sign Up</h1>
          <input className="email" type="email" placeholder="Email" onChange={e => setUser(e.target.value)} />       {/* Inputs for signup*/}
          {email && !validateEmail(email) && <p style={{ color: 'red' }}>Invalid email format</p>} {/* Error message for invalid email format*/}
          <input className="password" type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
          <button className="button" onClick={() => handleCreateAccount(email, password, navigate)}>Create Account</button>   {/* Button to create account*/}

          <h3>Or Sign-in With Google:</h3>
          <GoogleButton onClick={handleLogin} />  {/* Button to sign in with Google*/}
          <h3>Or Sign-In Using</h3>
          <button className='signin-btn' onClick={toggle}>Sign-In</button>  {/* Button to toggle to sign in screen*/}
        </div>

        <div className='signIn'>
          <h1>Login</h1>
          <input className="email" type="email" placeholder="Type your email" onChange={e => setLoginUser(e.target.value)} /> {/* Inputs for sign in*/}
          {loginEmail && !validateEmail(loginEmail) && <p style={{ color: 'red' }}>Invalid email format</p>} {/* Error message for invalid email format*/}
          <input className="password" type="password" placeholder="Type your password" onChange={e => setLoginPassword(e.target.value)} />
          <button className="button" onClick={() => handleExistingAccount(loginEmail, loginPassword, navigate)}>Login</button>  {/* Button to login*/}

          <h3>Or Sign-In With Google:</h3>
          <GoogleButton onClick={handleLogin} /> {/* Button to sign in with Google*/}

          <h3>Or Sign-Up Using:</h3>
          <button className='signup-btn' onClick={toggle}>Sign Up</button> {/* Button to toggle to sign up screen*/}
        </div>
      </div>
    </div>
  );
}

export default Login;