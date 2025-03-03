import { describe, expect, test, vi } from 'vitest';
import { validateEmail, handleLogin, handleCreateAccount, handleExistingAccount } from '../src/services/loginService';
import { account, ID } from '../src/appwrite';

// Mocking the appwrite module
vi.mock('../src/appwrite', () => {
  return {
    account: {
      createOAuth2Session: vi.fn(), // Mock function for createOAuth2Session
      create: vi.fn().mockResolvedValue({}), // Mock function for create
      createEmailPasswordSession: vi.fn().mockResolvedValue({}), // Mock function for createEmailPasswordSession
    },
    ID: {
      unique: vi.fn().mockReturnValue('unique-id'), // Mock function for unique
    },
  };
});

describe('loginService', () => {
  test('validateEmail returns true for valid email', () => {  // Test to check if validateEmail returns true for valid email
    const email = 'test@example.com';  //example of valid email
    expect(validateEmail(email)).toBe(true); 
  });

  test('validateEmail returns false for invalid email', () => { // Test to check if validateEmail returns false for invalid email
    const email = 'invalid-email'; // Sample invalid email
    expect(validateEmail(email)).toBe(false); 
  });

  test('handleLogin calls createOAuth2Session', async () => {  // Test to check if handleLogin calls createOAuth2Session for the login
    await handleLogin(); // Call the function
    expect(account.createOAuth2Session).toHaveBeenCalledWith('google', 'http://localhost:5173/dashboard', 'http://localhost:5173/fail'); // Check if createOAuth2Session was called with the correct arguments
  });

  test('handleCreateAccount calls account.create with valid email and password', async () => {  // Test to check if handleCreateAccount calls account.create with valid email and password and it navigates
    const navigate = vi.fn(); // Mock function for navigate
    await handleCreateAccount('test@example.com', 'password', navigate); // Call the function
    expect(account.create).toHaveBeenCalledWith('unique-id', 'test@example.com', 'password'); // Check if account.create was called with the correct arguments
    expect(navigate).toHaveBeenCalledWith('/dashboard'); // Check if navigate was called with the correct argument
  });

  test('handleExistingAccount calls createEmailPasswordSession with valid email and password', async () => { // Test to check if handleExistingAccount calls createEmailPasswordSession with valid email and password and it navigates
    const navigate = vi.fn(); // Mock function for navigate
    await handleExistingAccount('test@example.com', 'password', navigate); // Call the function
    expect(account.createEmailPasswordSession).toHaveBeenCalledWith('test@example.com', 'password'); // Check if createEmailPasswordSession was called with the correct arguments
    expect(navigate).toHaveBeenCalledWith('/dashboard'); // Check if navigate was called with the correct argument
  });
});