import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Question.css';
import background from '../assets/Purple.png';

function Question3() {
    const navigate = useNavigate();
    
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    
    const answers = [
        { id: 'A', text: 'I get nervous or self-conscious in social settings.' },
        { id: 'B', text: 'I often avoid people because I feel judged about my habits.' },
        { id: 'C', text: 'I feel indifferent or too exhausted to engage with others.' },
        { id: 'D', text: 'I\'m not sure' }
    ];

    useEffect(() => {
        const savedAnswers = JSON.parse(localStorage.getItem('surveyAnswers')) || [];
        if (savedAnswers[2]) setSelectedAnswer(savedAnswers[2]); 
    }, []);

    const handleSelect = (id) => {
        setSelectedAnswer(id);

        let savedAnswers = JSON.parse(localStorage.getItem('surveyAnswers')) || [];
        savedAnswers[2] = id; // Store answer at index 0 (Question 1)
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
                            <div key={i} className={`dash ${i === 2 ? 'active' : ''}`}></div>
                        ))}
                    </div>
                </div>
                
                <h1>Question 3</h1>
                <p> How do you feel about social interactions?</p>
                
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
                    <button className="back-button" onClick={() => navigate('/question2')}>
                        Back
                    </button>
        
                    <button className="next-button" onClick={() => navigate('/question4')}>
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Question3;