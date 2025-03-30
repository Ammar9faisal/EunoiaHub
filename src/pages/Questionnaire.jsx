import React from 'react';
import { useSurvey } from '../services/questionnaireService';
import background from '../assets/Purple.png';   
import '../../styles/Question.css';
import '../../styles/QResults.css';
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

    const navigate = useNavigate(); // Hook to navigate to different pages
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 7955c03 (made some changes to the questionnaire and started on habit tracker)
    const renderResultsSection = () => {
        const extraContent = {
            Anxiety: {
                label: "Anxiety",
                text: "You don’t have to control everything to feel safe. Letting go can be a power move, not a weakness.",
                link: "https://adaa.org/learn-from-us/from-the-experts/blog-posts/consumer/how-cope-uncertainty",
                linkText: "Coping with Uncertainty"
            },
            Addiction: {
                label: "Addiction",
                text: "Relapse doesn’t mean failure. Every attempt is practice. Every practice builds strength.",
                link: "https://jamesclear.com/atomic-habits-summary",
                linkText: "Science of Habit Change"
            },
            Depression: {
                label: "Depression",
                text: "Even when you feel nothing, your actions still matter. You don't have to feel better to start — you just have to start to feel better.",
                link: "https://butyoudontlooksick.com/articles/written-by-christine/the-spoon-theory/",
                linkText: "The Spoon Theory"
            }
        };
    
        const match = Object.keys(extraContent).find(key => resultText.includes(key));
        const resource = match ? extraContent[match] : null;
    
        return (
            <div className="results-page">
                <img src={background} alt='background' className='results-background' />
                <div className="results-container">
                    <h1>Survey Results</h1>
                    <p>
                        Seems like you may have{" "}
                        <span className={`question-gradient-${resource?.label.toLowerCase()}`}>
                            {resource?.label}
                        </span>.
                    </p>
                    {resource && (
                        <>
                            <p>{resource.text}</p>
                            <p style={{ marginTop: "1rem" }}>
                                Here is a resource to support you with your <strong>{resource.label.toLowerCase()}</strong>.
                                You can explore that, or continue below.
                            </p>
                        </>
                    )}
                    <div className="results-buttons">
                        {resource && (
                            <a
                            href={resource.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`results-resource-button results-gradient-${resource.label.toLowerCase()}`}
                          >
                            {resource.linkText}
                          </a>
                          
                        )}
                        <button className="results-redo-button" onClick={redoSurvey}>
                            Redo
                        </button>
                        <button className="results-dashboard-button" onClick={() => navigate('/login')}>
                            Head to Login
                        </button>
                    </div>
<<<<<<< HEAD
=======

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
                <p>You can now either go to dashboard or redo the survey</p>
                <div className="results-buttons">
                    <button className="results-redo-button" onClick={redoSurvey}>
                        Redo
                    </button>
                    <button className="results-dashboard-button" onClick={() => navigate('/dashboard')}>
                        Head to Dashboard
                    </button>
>>>>>>> d8278c2 (Pulled updates from master branch)
=======
>>>>>>> 7955c03 (made some changes to the questionnaire and started on habit tracker)
                </div>
            </div>
        );
    };
    
    // // Function to render the result text based on the survey outcome
    // const renderResultText = () => {
    //     if (resultText.includes('Anxiety')) {
    //         return (
    //             <>
    //                 Seems like you may have <span className="question-gradient-anxiety">Anxiety</span>.
    //             </>
    //         );
    //     } else if (resultText.includes('Addiction')) {
    //         return (
    //             <>
    //                 Seems like you may have an <span className="question-gradient-addiction">Addiction</span>.
    //             </>
    //         );
    //     } else if (resultText.includes('Depression')) {
    //         return (
    //             <>
    //                 Seems like you may have <span className="question-gradient-depression">Depression</span>.
    //             </>
    //         );
    //     } else {
    //         return resultText;
    //     }
    // };

    // // Function to render the results section
    // const renderResultsSection = () => (
    //     <div className="results-page">
    //         <img src={background} alt='background' className='results-background' />
    //         <div className="results-container">
    //             <h1>Survey Results</h1>
    //             <p>{renderResultText()}</p>
    //             <p>You can now either login with your credentionals or redo the survey</p>
    //             <div className="results-buttons">
    //                 <button className="results-redo-button" onClick={redoSurvey}>
    //                     Redo
    //                 </button>
    //                 <button className="results-dashboard-button" onClick={() => navigate('/login')}>
    //                     Head to Login
    //                 </button>
    //             </div>
    //         </div>
    //     </div>
    // );

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