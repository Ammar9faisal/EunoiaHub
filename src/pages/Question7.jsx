import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Question.css';
import background from '../assets/Purple.png';

function Question7() {
    const navigate = useNavigate();
   
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    
    const answers = [
        { id: 'A', text: 'I constantly second-guess myself and fear making mistakes.' },
        { id: 'B', text: 'I frequently think about engaging in a habit I’m trying to control.' },
        { id: 'C', text: 'I feel like nothing really matters, and it’s hard to find motivation.' },
        { id: 'D', text: 'I\'m not sure' }
    ];

    useEffect(() => {
        const savedAnswers = JSON.parse(localStorage.getItem('surveyAnswers')) || [];
        if (savedAnswers[6]) setSelectedAnswer(savedAnswers[6]); 
    }, []);

    const handleSelect = (id) => {
        setSelectedAnswer(id);

        let savedAnswers = JSON.parse(localStorage.getItem('surveyAnswers')) || [];
        savedAnswers[6] = id; // Store answer at index 0 (Question 1)
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
                            <div key={i} className={`dash ${i === 6 ? 'active' : ''}`}></div>
                        ))}
                    </div>
                </div>
                
                <h1>Question 7</h1>
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
                    <button className="back-button" onClick={() => navigate('/question6')}>
                        Back
                    </button>
        
                    <button className="next-button" onClick={() => navigate('/question8')}>
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Question7;