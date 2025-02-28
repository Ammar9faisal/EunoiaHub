import { describe, expect, test, vi } from 'vitest';
import { generateResponse } from '../src/services/chatbotService';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Mocking the GoogleGenerativeAI module 
vi.mock('@google/generative-ai', () => { //Essentially the BeforeEach Function from junit that initializes the mock before each test
  return {
    GoogleGenerativeAI: vi.fn().mockImplementation(() => {  
      return {
        getGenerativeModel: vi.fn().mockReturnValue({
          startChat: vi.fn().mockReturnValue({
            sendMessage: vi.fn().mockResolvedValue({
              response: {
                text: () => 'Mocked response text',
              },
            }),
          }),
        }),
      };
    }),
  };
});

describe('chatbotService', () => {
  test('generateResponse returns expected response', async () => {  // Test to check if generateResponse returns the expected response
    const AIrequest = 'Hello'; // Sample AI request
    const history = []; // Empty history for the test
    const response = await generateResponse(AIrequest, history); // Call the function
    expect(response).toBe('Mocked response text'); // Check the response
  });

  test('generateResponse handles empty AI request', async () => { // Test to check if generateResponse handles empty AI request
    const AIrequest = ''; // Empty AI request
    const history = []; // Empty history for the test
    const response = await generateResponse(AIrequest, history); // Call the function
    expect(response).toBe('Mocked response text'); // Check the response
  });

  test('generateResponse handles non-empty history', async () => { // Test to check if generateResponse handles non-empty history
    const AIrequest = 'Hello'; // Sample AI request
    const history = [{ role: 'user', parts: [{ text: 'Previous message' }] }]; // Non-empty history
    const response = await generateResponse(AIrequest, history); // Call the function
    expect(response).toBe('Mocked response text'); // Check the response
  });

  test('generateResponse handles multiple history entries', async () => { // Test to check if generateResponse handles fine with multiple history entries
    const AIrequest = 'Hello'; // Sample AI request
    const history = [
      { role: 'user', parts: [{ text: 'First message' }] },
      { role: 'model', parts: [{ text: 'First response' }] },
      { role: 'user', parts: [{ text: 'Second message' }] },
    ]; // Multiple history entries
    const response = await generateResponse(AIrequest, history); // Call the function
    expect(response).toBe('Mocked response text'); // Check the response
  });
});