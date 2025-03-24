import { account, ID } from '../appwrite';
import db from "../database";

export const isLoggedIn = async (navigate) => {
    try {
        const user = await account.get();
        console.log('User is logged in:', user); // Debugging log
        return true;
    } catch (error) {
        console.log('User is not logged in:', error); // Debugging log
        navigate('/');
        return false;
    }
}

export const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;   // Regex statement to validate email format
    return re.test(String(email).toLowerCase());  // Returns the email in lowercase to keep the email format consistent
};

export const handleCreateAccount = async (email, password, name , navigate, setError) => { // Create an account using username and password
    if (!email || !password) {
        setError('Please enter a valid email and password'); // Set error if email or password is empty
        return;
    }
    if (!validateEmail(email)) {
        setError('Please enter a valid email'); // Set error if email is invalid
        return;
    }
    try {
        const userId = ID.unique(); // Generate a unique user ID
        const response = await account.create(userId, email, password, name);
        console.log(response); // Success

        db.users.createUser(userId, { email: email, userID: userId, name: name}); // Create a new user document in the database
        console.log('User document created'); // Debugging log

        navigate('/questionnaire'); // Redirect to questionnaire after successful account creation  
    } catch (error) {
        console.log(error); // Failure
        if (error.code === 409) {
            setError('Email is already in use'); // Set error if email is already in use
        } else if (error.code === 429) {
            setError('Rate limit reached. Please try again later.'); // Set error if rate limit is reached
        }
        else if (error.code === 401) {
            setError('Incorrect user credentials'); // Set error if rate limit is reached
        } 
        else {
            setError('An error occurred. Please try again.'); // Set generic error
        }
    }
};

export const handleExistingAccount = async (loginEmail, loginPassword, navigate, setError) => { // Login with an existing account
    if (!loginEmail || !loginPassword) {
        setError('Please enter a valid email and password'); // Set error if email or password is empty
        return;
    }
    if (!validateEmail(loginEmail)) {
        setError('Please enter a valid email'); // Set error if email is invalid
        return;
    }
    try {
        const response = await account.createEmailPasswordSession(loginEmail, loginPassword);
        console.log(response); // Success
        await new Promise(resolve => setTimeout(resolve, 100));
        navigate('/dashboard'); // Redirect to dashboard after successful login
    } catch (error) {
        console.log("Login Error: " + error); // Failure
        if (error.code === 401) {
            setError('Invalid credentials. Please try again.'); // Set error if credentials are wrong
        } else if (error.code === 429) {
            setError('Rate limit reached. Please try again later.'); // Set error if rate limit is reached
        } else {
            setError('An error occurred. Please try again.'); // Set generic error
        }
    }
};