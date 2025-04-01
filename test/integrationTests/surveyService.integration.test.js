import { describe, test, expect, beforeAll, afterAll } from 'vitest';
import { handleNext, happinessIndex, fetchSurveyResponse, fetchMostRecentWellnessIndex } from '../../src/services/surveyService';
import db from '../../src/database';
import { Query } from 'appwrite';

describe('surveyService Integration Tests', () => {
  let userId = '67d7a3d30007a40db90b'; // Use a test user ID
  let testDate = new Date().toISOString().split('T')[0]; // Today's date
  let testResponses = [8, 7, 9, 6, 10, 8, 7]; // Example responses

  beforeAll(async () => {
    // Clean up any existing test data for the user
    await db.surveyResponses.list([Query.equal('userID', userId)]).then(async (response) => {
      for (const doc of response.documents) {
        await db.surveyResponses.delete(doc.$id);
      }
    });
  });

  afterAll(async () => {
    // Clean up test data after tests
    await db.surveyResponses.list([Query.equal('userID', userId)]).then(async (response) => {
      for (const doc of response.documents) {
        await db.surveyResponses.delete(doc.$id);
      }
    });
  });

  test('happinessIndex calculates the correct average', () => {
    const average = happinessIndex(testResponses);
    expect(average).toBeCloseTo(7.86, 2); // Average of testResponses
  });

  test('handleNext creates a new survey response', async () => {
    const setResponses = vi.fn();
    const setCurrentPage = vi.fn();
    const navigate = vi.fn();
    const streak = null;
    const setStreak = vi.fn();

    await handleNext(7, testResponses, setResponses, setCurrentPage, navigate, userId, streak, setStreak);

    // Verify that the survey response was created in the database

    const response = await db.surveyResponses.list([
      Query.equal('userID', userId),
      Query.equal('date', testDate),
    ]);

    expect(response.documents.length).toBe(1);
    expect(response.documents[0].wellnessIndex).toBeCloseTo(7.86, 2); // Average of testResponses
  });

  test('fetchSurveyResponse retrieves the correct survey response', async () => {
    const setResponses = vi.fn();
    const setCurrentPage = vi.fn();
    const navigate = vi.fn();
    const streak = null;
    const setStreak = vi.fn();

    await handleNext(7, testResponses, setResponses, setCurrentPage, navigate, userId, streak, setStreak);

    const surveyResponse = await fetchSurveyResponse(userId);

    expect(surveyResponse).not.toBeNull();
    expect(surveyResponse.userID).toBe(userId);  //no surveys made
    expect(surveyResponse.wellnessIndex).toBeCloseTo(7.86, 2); // Average of testResponses
  });

  test('fetchMostRecentWellnessIndex retrieves the most recent wellness index', async () => {
    const wellnessIndex = await fetchMostRecentWellnessIndex(userId);

    expect(wellnessIndex).not.toBeNull();
    expect(wellnessIndex).toBeCloseTo(7.86, 2); // Average of testResponses
  });
});