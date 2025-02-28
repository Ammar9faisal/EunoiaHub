import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Question.css';
import background from '../assets/Purple.png';

function Question8() {
    const navigate = useNavigate();
    
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    
    const answers = [
        { id: 'A', text: 'I get overwhelmed and panic.' },
        { id: 'B', text: 'I rely on unhealthy habits to cope.' },
        { id: 'C', text: 'I shut down emotionally or mentally.' },
        { id: 'D', text: 'I\'m not sure' }
    ];

    useEffect(() => {
        const savedAnswers = JSON.parse(localStorage.getItem('surveyAnswers')) || [];
        if (savedAnswers[7]) setSelectedAnswer(savedAnswers[7]); 
    }, []);

    const handleSelect = (id) => {
        setSelectedAnswer(id);

        let savedAnswers = JSON.parse(localStorage.getItem('surveyAnswers')) || [];
        savedAnswers[7] = id; // Store answer at index 0 (Question 1)
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
                            <div key={i} className={`dash ${i === 7 ? 'active' : ''}`}></div>
                        ))}
                    </div>
                </div>
                
                <h1>Question 8</h1>
                <p>How do you handle unexpected challenges?</p>
                
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
                    <button className="back-button" onClick={() => navigate('/question7')}>
                        Back
                    </button>
        
                    <button className="next-button" onClick={() => navigate('/question9')}>
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Question8;