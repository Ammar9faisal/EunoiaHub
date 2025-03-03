// This is our list of survey questions - each has an ID and text to display
export const questions = [
    { id: 1, text: "How happy do you feel today? (1 = Not happy at all, 10 = Extremely happy)" },
    { id: 2, text: "How overwhelmed do you feel today? (1 = Extremely overwhelmed, 10 = Not at all)" },
    { id: 3, text: "How motivated do you feel to complete your daily tasks? (1 = No motivation, 10 = Highly motivated)" },
    { id: 4, text: "How supported do you feel emotionally? (1 = Not at all, 10 = Very supported)" },
    { id: 5, text: "How much time have you spent on activities that bring you joy today? (1 = None, 10 = A Lot)" },
    { id: 6, text: "How well do you feel you are managing stress today? (1 = Not well at all, 10 = Very well)" },
    { id: 7, text: "How hopeful do you feel about tomorrow? (1 = Not hopeful, 10 = Very hopeful)" },
];

// Handles clicking the "Next" button - moves to the next page or finishes the survey
export const handleNext = (pageNum, responses, setResponses, setCurrentPage, navigate) => {
    // If we’re on the last question (page 7), move to the completion page
    if (pageNum === 7) {
        setCurrentPage(8);
        return;
    }
    // Otherwise, just bump up to the next page
    setCurrentPage(pageNum + 1);
};

// Calculates the average of all responses
export const happinessIndex = (responses) => {
    const total = Object.values(responses).reduce((sum, value) => sum + value, 0);
    return total / questions.length;
};

// Moves us back one page when the "Back" button is clicked
export const handleBack = (currentPage, setCurrentPage) => {
    setCurrentPage(currentPage - 1);
};

// Records the user’s rating (1-10) when they click a number
export const handleNumberClick = (value, currentPage, responses, setResponses) => {
    // Spread the old responses and add the new one for the current page
    setResponses({ ...responses, [currentPage]: value });
};