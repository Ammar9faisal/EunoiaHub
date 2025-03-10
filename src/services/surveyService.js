import db from '../database';
import { account } from '../appwrite';
import { Query } from 'appwrite';

export const questions = [
    { id: 1, text: "How happy do you feel today? (1 = Not happy at all, 10 = Extremely happy)" },
    { id: 2, text: "How overwhelmed do you feel today? (1 = Extremely overwhelmed, 10 = Not at all)" },
    { id: 3, text: "How motivated do you feel to complete your daily tasks? (1 = No motivation, 10 = Highly motivated)" },
    { id: 4, text: "How supported do you feel emotionally? (1 = Not at all, 10 = Very supported)" },
    { id: 5, text: "How much time have you spent on activities that bring you joy today? (1 = None, 10 = A Lot)" },
    { id: 6, text: "How well do you feel you are managing stress today? (1 = Not well at all, 10 = Very well)" },
    { id: 7, text: "How hopeful do you feel about tomorrow? (1 = Not hopeful, 10 = Very hopeful)" },
];

export const handleNext = async (pageNum, responses, setResponses, setCurrentPage, navigate, userId) => {
    if (pageNum === 7) {
        const date = new Date().toISOString().split('T')[0]; // Get current date in YYYY-MM-DD format
        const wellnessIndex = happinessIndex(responses);
        try {
            await db.surveyResponses.create({
                userID: userId,
                date,
                wellnessIndex
            });
            setCurrentPage(8);
        } catch (error) {
            console.error('Error creating survey response:', error);
        }
        return;
    }
    setCurrentPage(pageNum + 1);
};

export const happinessIndex = (responses) => {
    const total = responses.reduce((sum, value) => sum + value, 0);
    return total / questions.length;
};

export const handleBack = (currentPage, setCurrentPage) => {
    setCurrentPage(currentPage - 1);
};

export const handleNumberClick = (value, currentPage, responses, setResponses) => {
    const updatedResponses = [...responses];
    updatedResponses[currentPage - 1] = value;
    setResponses(updatedResponses);
};

export const fetchSurveyResponse = async (userId) => {
    const date = new Date().toISOString().split('T')[0]; // Get current date in YYYY-MM-DD format

    try {
        const response = await db.surveyResponses.list([
            Query.equal('userID', userId),
            Query.equal('date', date)
        ]);
        return response.documents.length > 0 ? response.documents[0] : null;
    } catch (error) {
        console.error('Error fetching survey response:', error);
        return null;
    }
};