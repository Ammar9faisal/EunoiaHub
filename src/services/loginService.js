import { account, ID } from '../appwrite';

export const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;   // Regex statement to validate email format
    return re.test(String(email).toLowerCase());  // Returns the email in lowercase to keep the email format consistent
};

export const handleLogin = async () => { // Login with Google by creating an OAuth2 session
    account.createOAuth2Session('google', 'http://localhost:5173/dashboard', 'http://localhost:5173/fail');
};

export const handleCreateAccount = async (email, password, navigate) => { // Create an account using username and password
    if (!email || !password) {
        alert('Please enter a valid email and password'); // Alert if email or password is empty
        return;
    }
    if (!validateEmail(email)) {
        alert('Please enter a valid email'); // Alert if email is invalid
        return;
    }
    const promise = account.create(ID.unique(), email, password);
    promise.then(function (response) {   // Error handling for account creation - similar to try-catch statements
        console.log(response); // Success
        navigate('/dashboard'); // Redirect to dashboard after successful account creation  
    }, function (error) {
        console.log(error); // Failure
    });
};

export const handleExistingAccount = async (loginEmail, loginPassword, navigate) => { // Login with an existing account
    if (!loginEmail || !loginPassword) {
        alert('Please enter a valid email and password'); // Alert if email or password is empty
        return;
    }
    if (!validateEmail(loginEmail)) {
        alert('Please enter a valid email'); // Alert if email is invalid
        return;
    }
    const promise = account.createEmailPasswordSession(loginEmail, loginPassword);
    promise.then(function (response) {  // Error handling for login - same thing as try-catch statements
        console.log(response); // Success
        navigate('/dashboard'); // Redirect to dashboard after successful login
    }, function (error) {
        console.log(error); // Failure
    });
};