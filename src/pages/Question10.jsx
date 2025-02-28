import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Question.css';
import background from '../assets/Purple.png';

function Question10() {
    const navigate = useNavigate();
    
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    
    const answers = [
        { id: 'A', text: 'Drained from worrying all day.' },
        { id: 'B', text: 'Regretful about certain behaviors but unsure how to stop.' },
        { id: 'C', text: 'Emotionally exhausted and unmotivated.' },
        { id: 'D', text: 'I\'m not sure' }
    ];

    useEffect(() => {
        const savedAnswers = JSON.parse(localStorage.getItem('surveyAnswers')) || [];
        if (savedAnswers[9]) setSelectedAnswer(savedAnswers[9]); 
    }, []);

    const handleSelect = (id) => {
        setSelectedAnswer(id);

        let savedAnswers = JSON.parse(localStorage.getItem('surveyAnswers')) || [];
        savedAnswers[9] = id; // Store answer at index 0 (Question 1)
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
                            <div key={i} className={`dash ${i === 9 ? 'active' : ''}`}></div>
                        ))}
                    </div>
                </div>
                
                <h1>Question 10</h1>
                <p>How do you usually feel after a long day?</p>
                
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
                    <button className="back-button" onClick={() => navigate('/question9')}>
                        Back
                    </button>
        
                    <button className="next-button" onClick={() => navigate('/QResults')}>
                        Finish
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Question10;
