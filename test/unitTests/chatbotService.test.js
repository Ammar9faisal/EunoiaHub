import { describe, expect, test, vi } from 'vitest';
import { generateResponse } from '../../src/services/chatbotService';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Mocking the GoogleGenerativeAI module
vi.mock('@google/generative-ai', () => {
    return {
        GoogleGenerativeAI: vi.fn().mockImplementation(() => {
            return {
                getGenerativeModel: vi.fn().mockImplementation(() => {
                    return {
                        startChat: vi.fn().mockImplementation(() => {
                            return {
                                sendMessage: vi.fn().mockResolvedValue({
                                    response: {
                                        text: vi.fn().mockReturnValue('Mocked response text')
                                    }
                                })
                            }
                        })
                    }
                })
            }
        })
    }
});

describe('chatbotService', () => {
    test('generateResponse returns expected response text', async () => {
        const AIrequest = 'Hello, how can I improve my mental health?';
        const history = [];

        const response = await generateResponse(AIrequest, history);

        expect(response).toBe('Mocked response text');
    });

    test('generateResponse handles errors', async () => {
        const AIrequest = 'Hello, how can I improve my mental health?';
        const history = [];

        // Mock the sendMessage function to throw an error
        vi.mocked(GoogleGenerativeAI).mockImplementationOnce(() => {
            return {
                getGenerativeModel: () => {
                    return {
                        startChat: () => {
                            return {
                                sendMessage: vi.fn().mockRejectedValue(new Error('Mocked error'))
                            }
                        }
                    }
                }
            }
        });

        const response = await generateResponse(AIrequest, history);
    });
});