import { describe, expect, test, vi } from 'vitest';
import { validateEmail, handleLogin, handleCreateAccount, handleExistingAccount } from '../src/services/loginService';
import { account, ID } from '../src/appwrite';

// Mocking the appwrite module
vi.mock('../src/appwrite', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
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

  test('handleCreateAccount calls account.create with valid email and password', async () => {  // Test to check if handleCreateAccount calls account.create with valid email and password and it navigates
    const navigate = vi.fn(); // Mock function for navigate
    const setError = vi.fn(); // Mock function for setError
    await handleCreateAccount('test@example.com', 'password', navigate, setError); // Call the function
    expect(account.create).toHaveBeenCalledWith('unique-id', 'test@example.com', 'password', navigate); // Check if account.create was called with the correct arguments
  });

  test('handleExistingAccount calls createEmailPasswordSession with valid email and password', async () => { // Test to check if handleExistingAccount calls createEmailPasswordSession with valid email and password and it navigates
    const navigate = vi.fn(); // Mock function for navigate
    const setError = vi.fn(); // Mock function for setError
    await handleExistingAccount('test@example.com', 'password', navigate, setError); // Call the function
    expect(account.createEmailPasswordSession).toHaveBeenCalledWith('test@example.com', 'password'); // Check if createEmailPasswordSession was called with the correct arguments
    expect(navigate).toHaveBeenCalledWith('/dashboard'); // Check if navigate was called with the correct argument
  });
});