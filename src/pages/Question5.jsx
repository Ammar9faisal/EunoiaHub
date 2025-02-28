import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Question.css';
import background from '../assets/Purple.png';

function Question5() {
    const navigate = useNavigate();
    navigate('/Question5'); // Navigate to the fifth question
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    
    const answers = [
        { id: 'A', text: 'Restless, nervous, or on edge.' },
        { id: 'B', text: 'Frustrated, guilty, or craving relief.' },
        { id: 'C', text: 'Empty, numb, or deeply sad.' },
        { id: 'D', text: 'I\'m not sure' }
    ];

    useEffect(() => {
        const savedAnswers = JSON.parse(localStorage.getItem('surveyAnswers')) || [];
        if (savedAnswers[4]) setSelectedAnswer(savedAnswers[4]); 
    }, []);

    const handleSelect = (id) => {
        setSelectedAnswer(id);

        let savedAnswers = JSON.parse(localStorage.getItem('surveyAnswers')) || [];
        savedAnswers[4] = id; // Store answer at index 0 (Question 1)
        localStorage.setItem('surveyAnswers', JSON.stringify(savedAnswers));
    };

    return (
        <div className="question-page">
            <img src={background} alt='background' className='background' />
            <div className="question-container">
                <div className="progress-bar">
                    <div className="progress"></div>
                    <div className="dashes">
                        {[...Array(10)].map((_, i) => (
                            <div key={i} className={`dash ${i === 4 ? 'active' : ''}`}></div>
                        ))}
                    </div>
                </div>
                
                <h1>Question 5</h1>
                <p>What best describes your emotional state most of the time?</p>
                
                <div className="answer-options">
                    {answers.map((answer) => (
                        <button 
                            key={answer.id} 
                            className={`answer-button ${selectedAnswer === answer.id ? 'selected' : ''}`} 
                            onClick={() => handleSelect(answer.id)}
                        >
                            {answer.id}. {answer.text}
                        </button>
                    ))}
                </div>
                
                <div className="navigation-buttons">
                    <button className="back-button" onClick={() => navigate('/question4')}>
                        Back
                    </button>
        
                    <button className="next-button" onClick={() => navigate('/question6')}>
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Question5;