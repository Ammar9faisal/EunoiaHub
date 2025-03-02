import React from 'react';
import { useSurvey } from '../services/surveyService';
import background from '../assets/Purple.png';
import './Question.css';
import './QResults.css';
import { useNavigate } from 'react-router-dom';

function Questionnaire() {
    const {
        questions,
        selectedAnswer,
        currentQuestion,
        resultText,
        selectedOption,
        handleSelect,
        handleNext,
        handleBack,
        redoSurvey,
        handleIntroSelect,
        handleIntroNext
    } = useSurvey();

    const navigate = useNavigate();

    const renderResultText = () => {
        if (resultText.includes('Anxiety')) {
            return (
                <>
                    Seems like you may have <span className="gradient-anxiety">Anxiety</span>.
                </>
            );
        } else if (resultText.includes('Addiction')) {
            return (
                <>
                    Seems like you may have an <span className="gradient-addiction">Addiction</span>.
                </>
            );
        } else if (resultText.includes('Depression')) {
            return (
                <>
                    Seems like you may have <span className="gradient-depression">Depression</span>.
                </>
            );
        } else {
            return resultText;
        }
    };

    if (currentQuestion === -1) {
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
                                onChange={() => handleIntroSelect('Anxiety')} 
                            />
                            Anxiety
                        </label>

                        <label className={`radio-label ${selectedOption === 'Addiction' ? 'selected' : ''}`}>
                            <input 
                                type="radio" 
                                name="category" 
                                value="Addiction" 
                                onChange={() => handleIntroSelect('Addiction')} 
                            />
                            Addiction
                        </label>

                        <label className={`radio-label ${selectedOption === 'Depression' ? 'selected' : ''}`}>
                            <input 
                                type="radio" 
                                name="category" 
                                value="Depression" 
                                onChange={() => handleIntroSelect('Depression')} 
                            />
                            Depression
                        </label>

                        <label className={`radio-label ${selectedOption === 'Survey' ? 'selected' : ''}`}>
                            <input 
                                type="radio" 
                                name="category" 
                                value="Survey" 
                                onChange={() => handleIntroSelect('Survey')} 
                            />
                            Take a survey to find out
                        </label>
                    </div>

                    <button 
                        className={`next-button ${!selectedOption ? 'disabled' : ''}`} 
                        onClick={handleIntroNext} 
                        disabled={!selectedOption}
                    >
                        Next
                    </button>
                </div>
            </div>
        );
    }

    if (currentQuestion === questions.length) {
        return (
            <div className="question-page">
                <img src={background} alt='background' className='background' />
                <div className="question-container">
                    <h1>Survey Results</h1>
                    <p>{renderResultText()}</p>
                    
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

    return (
        <div className="question-page">
            <img src={background} alt="background" className="background" />
            <div className="question-container">
                {currentQuestion < questions.length ? (
                    <>
                        <div className="progress-bar">
                            <div className="progress"></div>
                            <div className="dashes">
                                {[...Array(10)].map((_, i) => (
                                    <div key={i} className={`dash ${i === currentQuestion ? 'active' : ''}`}></div>
                                ))}
                            </div>
                        </div>

                        <h1>Question {currentQuestion + 1}</h1>
                        <p>{questions[currentQuestion].text}</p>

                        <div className="answer-options">
                            {questions[currentQuestion].answers.map((answer) => (
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
                            {currentQuestion > 0 && (
                                <button className="back-button" onClick={handleBack}>
                                    Back
                                </button>
                            )}

                            <button
                                className={`next-button ${!selectedAnswer ? 'disabled' : ''}`}
                                onClick={handleNext}
                                disabled={!selectedAnswer}
                            >
                                {currentQuestion === questions.length - 1 ? 'Finish' : 'Next'}
                            </button>
                        </div>
                    </>
                ) : (
                    <>
                        <h1>Survey Results</h1>
                        <p>{renderResultText()}</p>

                        <div className="result-buttons">
                            <button className="redo-button" onClick={redoSurvey}>
                                Redo
                            </button>
                            <button className="dashboard-button" onClick={() => navigate('/dashboard')}>
                                Head to Dashboard
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default Questionnaire;