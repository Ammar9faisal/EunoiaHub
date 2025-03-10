import { describe, expect, test, vi } from 'vitest';
import { questions, handleNext, handleBack, handleNumberClick, happinessIndex, fetchSurveyResponse, fetchMostRecentWellnessIndex } from '../src/services/surveyService';
import db from '../src/database';
import { account } from '../src/appwrite';

// Mock the database and account modules
vi.mock('../src/database', () => ({
    default: {
        surveyResponses: {
            create: vi.fn(),
            list: vi.fn(),
        },
    },
}));

vi.mock('../src/appwrite', () => ({
    account: {
        get: vi.fn(),
    },
}));

describe('surveyService', () => {
    test('questions array is defined and has correct length', () => {
        expect(questions).toBeDefined();
        expect(questions.length).toBe(7);
    });

    test('handleNext moves to the next page', async () => {
        const setCurrentPage = vi.fn();
        const setResponses = vi.fn();
        const responses = [5];
        await handleNext(1, responses, setResponses, setCurrentPage, vi.fn(), 'testUserId');
        expect(setCurrentPage).toHaveBeenCalledWith(2);
        expect(setResponses).not.toHaveBeenCalled();
    });

    test('handleNext moves to the completion page on the last question', async () => {
        db.surveyResponses.create.mockResolvedValue({});
        const setCurrentPage = vi.fn();
        const setResponses = vi.fn();
        const responses = [10];
        await handleNext(7, responses, setResponses, setCurrentPage, vi.fn(), 'testUserId');
        expect(setCurrentPage).toHaveBeenCalledWith(8);
        expect(setResponses).not.toHaveBeenCalled();
    });

    test('handleBack moves to the previous page', () => {
        const setCurrentPage = vi.fn();
        handleBack(2, setCurrentPage);
        expect(setCurrentPage).toHaveBeenCalledWith(1);
    });

    test('handleNumberClick records the user’s rating', () => {
        const setResponses = vi.fn();
        const responses = [];
        handleNumberClick(5, 1, responses, setResponses);
        expect(setResponses).toHaveBeenCalledWith([5]);
    });

    test('handleNumberClick updates existing rating', () => {
        const setResponses = vi.fn();
        const responses = [5];
        handleNumberClick(7, 1, responses, setResponses);
        expect(setResponses).toHaveBeenCalledWith([7]);
    });

    test('handleNumberClick updates rating on new page', () => {
        const setResponses = vi.fn();
        const responses = [5];
        handleNumberClick(7, 2, responses, setResponses);
        expect(setResponses).toHaveBeenCalledWith([5, 7]);
    });

    test('happinessIndex calculation is correct', () => {
        const responses = [5, 6, 7, 8, 9, 10, 10];
        const index = happinessIndex(responses);
        expect(index).toBe(7.857142857142857);
    });

    test('happinessIndex returns 0 if no responses', () => {
        const responses = [];
        const index = happinessIndex(responses);
        expect(index).toBe(0);
    });
});