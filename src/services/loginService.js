import { account, ID } from '../appwrite';

export const isLoggedIn = async (navigate) => {
    try {
        const user = await account.get();
        console.log('User is logged in:', user); // Debugging log
        return true;
    }
    catch (error) {
        console.log('User is not logged in:', error); // Debugging log
        navigate('/');
        return false;
    }
}

export const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;   // Regex statement to validate email format
    return re.test(String(email).toLowerCase());  // Returns the email in lowercase to keep the email format consistent
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
        navigate('/questionnaire'); // Redirect to questionnaire after successful account creation  
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