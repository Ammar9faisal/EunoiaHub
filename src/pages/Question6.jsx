import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Question.css';
import background from '../assets/Purple.png';

function Question6() {
    const navigate = useNavigate();
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    
    const answers = [
        { id: 'A', text: 'I worry excessively about what could go wrong.' },
        { id: 'B', text: 'I feel stuck in destructive cycles but don’t know how to stop.' },
        { id: 'C', text: 'I struggle to see a positive future or find meaning in life.' },
        { id: 'D', text: 'I\'m not sure' }
    ]

    useEffect(() => {
        const savedAnswers = JSON.parse(localStorage.getItem('surveyAnswers')) || [];
        if (savedAnswers[5]) setSelectedAnswer(savedAnswers[5]); 
    }, []);

    const handleSelect = (id) => {
        setSelectedAnswer(id);

        let savedAnswers = JSON.parse(localStorage.getItem('surveyAnswers')) || [];
        savedAnswers[5] = id; // Store answer at index 0 (Question 1)
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
                            <div key={i} className={`dash ${i === 5 ? 'active' : ''}`}></div>
                        ))}
                    </div>
                </div>
                
                <h1>Question 6</h1>
                <p>How do you typically feel about your future?</p>
                
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
                    <button className="back-button" onClick={() => navigate('/question5')}>
                        Back
                    </button>
        
                    <button 
                        className={`next-button ${!selectedAnswer ? 'disabled' : ''}`} 
                        onClick={() => navigate('/question7')} 
                        disabled={!selectedAnswer} 
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Question6;