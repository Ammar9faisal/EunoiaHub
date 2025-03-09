import React from 'react';
import { useSurvey } from '../services/questionnaireService';
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

    // Function to render the result text based on the survey outcome
    const renderResultText = () => {
        if (resultText.includes('Anxiety')) {
            return (
                <>
                    Seems like you may have <span className="question-gradient-anxiety">Anxiety</span>.
                </>
            );
        } else if (resultText.includes('Addiction')) {
            return (
                <>
                    Seems like you may have an <span className="question-gradient-addiction">Addiction</span>.
                </>
            );
        } else if (resultText.includes('Depression')) {
            return (
                <>
                    Seems like you may have <span className="question-gradient-depression">Depression</span>.
                </>
            );
        } else {
            return resultText;
        }
    };

    // Function to render the results section
    const renderResultsSection = () => (
        <div className="results-page">
            <img src={background} alt='background' className='results-background' />
            <div className="results-container">
                <h1>Survey Results</h1>
                <p>{renderResultText()}</p>
                <p>You can now either login with your credentionals or redo the survey</p>
                <div className="results-buttons">
                    <button className="results-redo-button" onClick={redoSurvey}>
                        Redo
                    </button>
                    <button className="results-dashboard-button" onClick={() => navigate('/')}>
                        Head to Login
                    </button>
                </div>
            </div>
        </div>
    );

    // Render the intro section if the current question is -1
    if (currentQuestion === -1) {
        return (
            <div className="question-page">
                <img src={background} alt="background" className="question-background" />
                <div className="question-container">
                    <h1 className="question-eunoia-gradient">Welcome to Eunoia Hub!</h1>
                    <p>Would you like to take a survey or do you already know why you're here?</p>

                    <div className="question-radio-options">
                        <label className={`question-radio-label ${selectedOption === 'Anxiety' ? 'selected' : ''}`}>
                            <input 
                                type="radio" 
                                name="category" 
                                value="Anxiety" 
                                onChange={() => handleIntroSelect('Anxiety')} 
                            />
                            Anxiety
                        </label>

                        <label className={`question-radio-label ${selectedOption === 'Addiction' ? 'selected' : ''}`}>
                            <input 
                                type="radio" 
                                name="category" 
                                value="Addiction" 
                                onChange={() => handleIntroSelect('Addiction')} 
                            />
                            Addiction
                        </label>

                        <label className={`question-radio-label ${selectedOption === 'Depression' ? 'selected' : ''}`}>
                            <input 
                                type="radio" 
                                name="category" 
                                value="Depression" 
                                onChange={() => handleIntroSelect('Depression')} 
                            />
                            Depression
                        </label>

                        <label className={`question-radio-label ${selectedOption === 'Survey' ? 'selected' : ''}`}>
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
                        className={`question-next-button ${!selectedOption ? 'disabled' : ''}`} 
                        onClick={handleIntroNext} 
                        disabled={!selectedOption}
                    >
                        Next
                    </button>
                </div>
            </div>
        );
    }

    // Render the results section if the survey is complete
    if (currentQuestion === questions.length) {
        return renderResultsSection();
    }

    // Render the survey questions if the survey is in progress
    return (
        <div className="question-page">
            <img src={background} alt="background" className="question-background" />
            <div className="question-container">
                {currentQuestion < questions.length ? (
                    <>
                        <div className="question-progress-bar">
                            <div className="question-dashes">
                                {[...Array(10)].map((_, i) => (
                                    <div key={i} className={`question-dash ${i === currentQuestion ? 'active' : ''}`}></div>
                                ))}
                            </div>
                        </div>

                        <h1>Question {currentQuestion + 1}</h1>
                        <p>{questions[currentQuestion].text}</p>

                        <div className="question-answer-options">
                            {questions[currentQuestion].answers.map((answer) => (
                                <button
                                    key={answer.id}
                                    className={`question-answer-button ${selectedAnswer === answer.id ? 'selected' : ''}`}
                                    onClick={() => handleSelect(answer.id)}
                                >
                                    {answer.id}. {answer.text}
                                </button>
                            ))}
                        </div>

                        <div className="question-navigation-buttons">
                            {currentQuestion > 0 && (
                                <button className="question-back-button" onClick={handleBack}>
                                    Back
                                </button>
                            )}

                            <button
                                className={`question-next-button ${!selectedAnswer ? 'disabled' : ''}`}
                                onClick={handleNext}
                                disabled={!selectedAnswer}
                            >
                                {currentQuestion === questions.length - 1 ? 'Finish' : 'Next'}
                            </button>
                        </div>
                    </>
                ) : (
                    renderResultsSection()
                )}
            </div>
        </div>
    );
}

export default Questionnaire;