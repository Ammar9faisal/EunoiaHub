import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

export const useSurvey = () => {
    const navigate = useNavigate();
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [currentQuestion, setCurrentQuestion] = useState(-1); // Start with -1 for Intro
    const [resultText, setResultText] = useState('');
    const [selectedOption, setSelectedOption] = useState(null);

    const questions = [
        {
            id: 1,
            text: 'How would you describe your biggest daily struggle?',
            answers: [
                { id: 'A', text: 'Feeling constantly worried or overwhelmed by small things.' },
                { id: 'B', text: 'Struggling to resist certain habits or urges.' },
                { id: 'C', text: 'Feeling persistently sad, unmotivated, or hopeless.' },
                { id: 'D', text: 'I\'m not sure' }
            ]
        },
        {
            id: 2,
            text: 'How do you usually handle stress?',
            answers: [
                { id: 'A', text: 'I overthink and feel tense, even about minor issues.' },
                { id: 'B', text: 'I turn to substances or behaviors (e.g., alcohol, smoking, gaming, etc.).' },
                { id: 'C', text: 'I withdraw from people and lose interest in activities.' },
                { id: 'D', text: 'I\'m not sure' }
            ]
        },
        {
            id: 3,
            text: 'How do you feel about social interactions?',
            answers: [
                { id: 'A', text: 'I get nervous or self-conscious in social settings.' },
                { id: 'B', text: 'I often avoid people because I feel judged about my habits.' },
                { id: 'C', text: 'I feel indifferent or too exhausted to engage with others.' },
                { id: 'D', text: 'I\'m not sure' }
            ]
        },
        {
            id: 4,
            text: 'How do you sleep at night?',
            answers: [
                { id: 'A', text: 'I have trouble falling asleep because my mind won’t stop racing.' },
                { id: 'B', text: 'My sleep is irregular due to certain habits or substances.' },
                { id: 'C', text: 'I sleep too much or too little and still feel exhausted.' },
                { id: 'D', text: 'I\'m not sure' }
            ]
        },
        {
            id: 5,
            text: 'What best describes your emotional state most of the time?',
            answers: [
                { id: 'A', text: 'Restless, nervous, or on edge.' },
                { id: 'B', text: 'Frustrated, guilty, or craving relief.' },
                { id: 'C', text: 'Empty, numb, or deeply sad.' },
                { id: 'D', text: 'I\'m not sure' }
            ]
        },
        {
            id: 6,
            text: 'How do you typically feel about your future?',
            answers: [
                { id: 'A', text: 'I worry excessively about what could go wrong.' },
                { id: 'B', text: 'I feel stuck in destructive cycles but don’t know how to stop.' },
                { id: 'C', text: 'I struggle to see a positive future or find meaning in life.' },
                { id: 'D', text: 'I\'m not sure' }
            ]
        },
        {
            id: 7,
            text: 'What best describes your emotional state most of the time?',
            answers: [
                { id: 'A', text: 'I constantly second-guess myself and fear making mistakes.' },
                { id: 'B', text: 'I frequently think about engaging in a habit I’m trying to control.' },
                { id: 'C', text: 'I feel like nothing really matters, and it’s hard to find motivation.' },
                { id: 'D', text: 'I\'m not sure' }
            ]
        },
        {
            id: 8,
            text: 'How do you handle unexpected challenges?',
            answers: [
                { id: 'A', text: 'I get overwhelmed and panic.' },
                { id: 'B', text: 'I rely on unhealthy habits to cope.' },
                { id: 'C', text: 'I shut down emotionally or mentally.' },
                { id: 'D', text: 'I\'m not sure' }
            ]
        },
        {
            id: 9,
            text: 'What best describes your emotional state most of the time?',
            answers: [
                { id: 'A', text: 'I feel like I need control over everything to feel safe.' },
                { id: 'B', text: 'I want to change but feel trapped by my habits.' },
                { id: 'C', text: 'I don’t believe anything will change, no matter what I do.' },
                { id: 'D', text: 'I\'m not sure' }
            ]
        },
        {
            id: 10,
            text: 'How do you usually feel after a long day?',
            answers: [
                { id: 'A', text: 'Drained from worrying all day.' },
                { id: 'B', text: 'Regretful about certain behaviors but unsure how to stop.' },
                { id: 'C', text: 'Emotionally exhausted and unmotivated.' },
                { id: 'D', text: 'I\'m not sure' }
            ]
        }
    ];

    useEffect(() => {
        const savedAnswers = JSON.parse(localStorage.getItem('surveyAnswers')) || [];
        if (savedAnswers[currentQuestion]) setSelectedAnswer(savedAnswers[currentQuestion]);
    }, [currentQuestion]);

    const handleSelect = (id) => {
        setSelectedAnswer(id);

        let savedAnswers = JSON.parse(localStorage.getItem('surveyAnswers')) || [];
        savedAnswers[currentQuestion] = id;
        localStorage.setItem('surveyAnswers', JSON.stringify(savedAnswers));
    };

    const handleNext = () => {
        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
            setSelectedAnswer(null);
        } else {
            setCurrentQuestion(questions.length); // Move to results page
        }
    };

    const handleBack = () => {  // Go back to previous question
        if (currentQuestion > 0) {
            setCurrentQuestion(currentQuestion - 1);
            setSelectedAnswer(null);
        }
    };

    const redoSurvey = () => {  // Clear saved answers and start over
        localStorage.removeItem('surveyAnswers');
        setCurrentQuestion(0);
        setSelectedAnswer(null);
    };

    const handleIntroSelect = (option) => {  // Select either Survey or Dashboard
        setSelectedOption(option);
    };

    const handleIntroNext = () => {  // Move to first question or Dashboard
        if (selectedOption) {
            if (selectedOption === 'Survey') {
                setCurrentQuestion(0);
            } else {
                navigate('/dashboard');
            }
        }
    };

    useEffect(() => {  // Calculate results based on final category
        if (currentQuestion === questions.length) {
            const savedAnswers = JSON.parse(localStorage.getItem('surveyAnswers')) || [];

            // Count occurrences of A, B, C, D
            let counts = { A: 0, B: 0, C: 0, D: 0 };
            savedAnswers.forEach(answer => {
                if (counts[answer] !== undefined) counts[answer]++;
            });

            // Find max frequency
            let maxCount = Math.max(...Object.values(counts));
            let highestCategories = Object.keys(counts).filter(key => counts[key] === maxCount);

            let finalCategory;

            if (highestCategories.length === 1) {
                // Only one category has the most selections
                finalCategory = highestCategories[0];
            } else if (highestCategories.length === 2) {
                // Two categories are tied, pick alphabetically
                finalCategory = highestCategories.sort()[0];
            } else if (highestCategories.length === 3) {
                // Three categories tied, default to "D"
                finalCategory = "D";
            } else {
                // If all four are equal (very unlikely), default to "D"
                finalCategory = "D";
            }

            // Set results based on final category
            if (finalCategory === 'A') {
                setResultText('Seems like you may have Anxiety.');
            } else if (finalCategory === 'B') {
                setResultText('Seems like you may have an Addiction.');
            } else if (finalCategory === 'C') {
                setResultText('Seems like you may have Depression.');
            } else {
                setResultText('Your responses suggest general uncertainty. No worries, that just means you get the general Dashboard.');
            }
        }
    }, [currentQuestion]);

    return {
        questions,
        selectedAnswer,
        currentQuestion,
        resultText,
        selectedOption,
        handleSelect,
        handleNext,
        handleBack,
        redoSurvey,
        handleIntroSelect,
        handleIntroNext
    };
};