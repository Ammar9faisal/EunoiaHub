import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Question.css'; // Uses the same styles as questions
import background from '../assets/Purple.png';

function Intro() {
    const navigate = useNavigate();
    const [selectedOption, setSelectedOption] = useState(null);

    const handleSelect = (option) => {
        setSelectedOption(option);
    };

    const handleNext = () => {
        if (selectedOption) {
            // Navigate to the correct page based on selection
            if (selectedOption === 'Anxiety') navigate('/dashboard');
            else if (selectedOption === 'Addiction') navigate('/dashboard');
            else if (selectedOption === 'Depression') navigate('/dashboard');
            else navigate('/question1'); // If "Take survey..." is selected, start the questionnaire
        }
    };

    return (
        <div className="question-page">
            <img src={background} alt="background" className="background" />
            <div className="question-container">
                <h1 className="eunoia-gradient">Welcome to Eunoia Hub!</h1>
                <p>Would you like to take a survey or do you already know why you're here?</p>

                <div className="radio-options">
                    <label className={`radio-label ${selectedOption === 'Anxiety' ? 'selected' : ''}`}>
                        <input 
                            type="radio" 
                            name="category" 
                            value="Anxiety" 
                            onChange={() => handleSelect('Anxiety')} 
                        />
                        Anxiety
                    </label>

                    <label className={`radio-label ${selectedOption === 'Addiction' ? 'selected' : ''}`}>
                        <input 
                            type="radio" 
                            name="category" 
                            value="Addiction" 
                            onChange={() => handleSelect('Addiction')} 
                        />
                        Addiction
                    </label>

                    <label className={`radio-label ${selectedOption === 'Depression' ? 'selected' : ''}`}>
                        <input 
                            type="radio" 
                            name="category" 
                            value="Depression" 
                            onChange={() => handleSelect('Depression')} 
                        />
                        Depression
                    </label>

                    <label className={`radio-label ${selectedOption === 'Survey' ? 'selected' : ''}`}>
                        <input 
                            type="radio" 
                            name="category" 
                            value="Survey" 
                            onChange={() => handleSelect('Survey')} 
                        />
                        Take a survey to find out
                    </label>
                </div>

                <button 
                    className={`next-button ${!selectedOption ? 'disabled' : ''}`} 
                    onClick={handleNext} 
                    disabled={!selectedOption}
                >
                    Next
                </button>
            </div>
        </div>
    );
}

export default Intro;
