import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './QResults.css';
import background from '../assets/Purple.png';

function QResults() {
    const navigate = useNavigate();
    

    const [resultText, setResultText] = useState('');

    useEffect(() => {
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

        localStorage.setItem('finalCategory', finalCategory);

        // Set results based on final category
        if (finalCategory === 'A') setResultText('Seems like you have some Anxious traits.');
        else if (finalCategory === 'B') setResultText('Seems like you may have some symptoms similar to Addiction.');
        else if (finalCategory === 'C') setResultText('Seems like you may have traits that are likely related with Depression.');
        else setResultText('Your responses suggest general uncertainty. No worries, that just means you get the general Dashboard.');

    }, []);

    // Reset answers and restart survey
    const redoSurvey = () => {
        localStorage.removeItem('surveyAnswers');
        navigate('/question1');
    };

    return (
        <div className="question-page">
            <img src={background} alt='background' className='background' />
            <div className="question-container">
                <h1>Survey Results</h1>
                <p>{resultText}</p>
                
                <div className="result-buttons">
                    <button className="redo-button" onClick={redoSurvey}>
                        Redo
                    </button>
                    <button className="dashboard-button" onClick={() => navigate('/dashboard')}>
                        Head to Dashboard
                    </button>
                </div>
            </div>
        </div>
    );
}

export default QResults;
