import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Question.css';
import background from '../assets/Purple.png';

function Question1() {
    const navigate = useNavigate();
   

    const [selectedAnswer, setSelectedAnswer] = useState(null);
    
    const answers = [
        { id: 'A', text: 'Feeling constantly worried or overwhelmed by small things.' },
        { id: 'B', text: 'Struggling to resist certain habits or urges.' },
        { id: 'C', text: 'Feeling persistently sad, unmotivated, or hopeless.' },
        { id: 'D', text: 'I\'m not sure' }
    ];

    useEffect(() => {
        const savedAnswers = JSON.parse(localStorage.getItem('surveyAnswers')) || [];
        if (savedAnswers[0]) setSelectedAnswer(savedAnswers[0]); 
    }, []);

    const handleSelect = (id) => {
        setSelectedAnswer(id);

        let savedAnswers = JSON.parse(localStorage.getItem('surveyAnswers')) || [];
        savedAnswers[0] = id; // Store answer at index 0 (Question 1)
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
                            <div key={i} className={`dash ${i === 0 ? 'active' : ''}`}></div>
                        ))}
                    </div>
                </div>
                
                <h1>Question 1</h1>
                <p>How would you describe your biggest daily struggle?</p>
                
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
                
                <button className="next-button" onClick={() => navigate('/question2')}>
                    Next
                </button>
            </div>
        </div>
    );
}

export default Question1;