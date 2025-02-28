import { describe, expect, test, vi } from 'vitest';
import { questions, handleNext, handleBack, handleNumberClick, happinessIndex } from '../src/services/surveyService';


describe('surveyService', () => {
    test('questions array is defined and has correct length', () => { // Test to check if questions array is defined and has correct length
        expect(questions).toBeDefined();
        expect(questions.length).toBe(7);
    });

    test('handleNext moves to the next page', () => { // Test to check if handleNext moves to the next page
        const setCurrentPage = vi.fn();
        const setResponses = vi.fn();
        const responses = { 1: 5 }; 
        handleNext(1, responses, setResponses, setCurrentPage, vi.fn());
        expect(setCurrentPage).toHaveBeenCalledWith(2);
        expect(setResponses).not.toHaveBeenCalled();
    });

    test('handleNext moves to the completion page on the last question', () => { // Test to check if handleNext moves to the completion page on the last question
        const setCurrentPage = vi.fn();
        const setResponses = vi.fn();
        const responses = { 7: 10 };
        handleNext(7, responses, setResponses, setCurrentPage, vi.fn());
        expect(setCurrentPage).toHaveBeenCalledWith(8);
        expect(setResponses).not.toHaveBeenCalled();
    });

    test('handleBack moves to the previous page', () => { // Test to check if handleBack moves to the previous page
        const setCurrentPage = vi.fn();
        handleBack(2, setCurrentPage);
        expect(setCurrentPage).toHaveBeenCalledWith(1);
    });

    test('handleNumberClick records the user’s rating', () => { // Test to check if handleNumberClick records the user’s rating
        const setResponses = vi.fn();
        const responses = {};
        handleNumberClick(5, 1, responses, setResponses);
        expect(setResponses).toHaveBeenCalledWith({ 1: 5 });
    });

    test('handleNumberClick updates existing rating', () => { // Test to check if handleNumberClick updates existing rating
        const setResponses = vi.fn();
        const responses = { 1: 5 };
        handleNumberClick(7, 1, responses, setResponses);
        expect(setResponses).toHaveBeenCalledWith({ 1: 7 });
    });

    test('handleNumberClick updates rating on new page', () => { // Test to check if handleNumberClick ratings on new page
        const setResponses = vi.fn();
        const responses = { 1: 5 };
        handleNumberClick(7, 2, responses, setResponses);
        console.log(responses);
        expect(setResponses).toHaveBeenCalledWith({ 1: 5, 2: 7 }); 
    });

    test('checks to see if happiness index calculation is correct', () => { // Test to check if the happiness index calculation is correct
        const responses = { 1: 5, 2: 6, 3: 7, 4: 8, 5: 9, 6: 10, 7: 10 };
        const index = happinessIndex(responses);
        expect(index).toBe(7.857142857142857);
    });

    test('happinessIndex returns 0 if no responses', () => { // Test to check if happinessIndex returns 0 if no responses
        const responses = {};
        const index = happinessIndex(responses);
        expect(index).toBe(0);
    });


  test('handleNumberClick records the user’s rating', () => { // Test to check if handleNumberClick records the user’s rating
    const setResponses = vi.fn(); 
    const responses = {}; 
    handleNumberClick(5, 1, responses, setResponses); 
    expect(setResponses).toHaveBeenCalledWith({ 1: 5 }); 
  });

  test('checks to see if happiness index calculation is correct', () => { // Test to check if the happiness index calculation is correct 
    const responses = { 1: 5, 2: 6, 3: 7, 4: 8, 5: 9, 6: 10, 7: 10 }; 
    const index = happinessIndex(responses);
    expect(index).toBe(7.857142857142857);
  });
});