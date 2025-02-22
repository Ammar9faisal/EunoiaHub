import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Question.css';
import background from '../assets/Purple.png';

function Question9() {
    const navigate = useNavigate();
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    
    const answers = [
        { id: 'A', text: 'I feel like I need control over everything to feel safe.' },
        { id: 'B', text: 'I want to change but feel trapped by my habits.' },
        { id: 'C', text: 'I don’t believe anything will change, no matter what I do.' },
        { id: 'D', text: 'I\'m not sure' }
    ];

    useEffect(() => {
        const savedAnswers = JSON.parse(localStorage.getItem('surveyAnswers')) || [];
        if (savedAnswers[8]) setSelectedAnswer(savedAnswers[8]); 
    }, []);

    const handleSelect = (id) => {
        setSelectedAnswer(id);

        let savedAnswers = JSON.parse(localStorage.getItem('surveyAnswers')) || [];
        savedAnswers[8] = id; // Store answer at index 0 (Question 1)
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
                            <div key={i} className={`dash ${i === 8 ? 'active' : ''}`}></div>
                        ))}
                    </div>
                </div>
                
                <h1>Question 9</h1>
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
                    <button className="back-button" onClick={() => navigate('/question8')}>
                        Back
                    </button>
        
                    <button 
                        className={`next-button ${!selectedAnswer ? 'disabled' : ''}`} 
                        onClick={() => navigate('/question10')} 
                        disabled={!selectedAnswer} 
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Question9;