import React from 'react';
import Sidebar from '../components/Sidebar.jsx';
import './DailyExercises.css';
import {
  exercises,
  triggersList,
  selfCompassionPrompts,
  requiredGroundingCounts,
  useDailyExercisesLogic,
} from '../services/dailyExercisesService';

// The main DailyExercises component that renders the page
const DailyExercises = () => {

  // Pull in all the state and functions we need from our custom hook
  const {
    selectedExercise,
    timeLeft,
    phase,
    paused,
    breathingStarted,
    gratitudeEntries,
    gratitudeInput,
    setGratitudeInput,
    groundingAnswers,
    groundingStep,
    currentGroundingInput,
    setCurrentGroundingInput,
    selfCompassionAnswers,
    selfCompassionStep,
    currentSelfCompassionInput,
    setCurrentSelfCompassionInput,
    triggers,
    mindfulnessStarted,
    playMusic,
    setPlayMusic,
    audioRef,
    startExercise,
    goBack,
    pauseExercise,
    startBreathingExercise,
    startMindfulnessTimer,
    handleGratitudeSubmit,
    handleGroundingSubmit,
    handleGroundingDelete,
    handleSelfCompassionSubmit,
    handleTriggerSelect,
    upliftingAudio,
  } = useDailyExercisesLogic();

  return (
    // The main container for the page, with a sidebar and content area
    <div className="de-container">
      <Sidebar />
      <div className="de-main">
        <div className="de-content">
          <section className="de-section">
            {/* The title of the page */}
            <h2 className="de-section-title">Your Daily Wellness Boost</h2>

            {/* If an exercise is selected, show its focused view; otherwise, show the list of exercise cards */}
            {selectedExercise ? (
              <div className="de-focused-view">
                <button className="de-back-button" onClick={goBack}>
                  Back
                </button>

                {/* Find the selected exercise and render its content */}
                {exercises.map((exercise) => (
                  exercise.id === selectedExercise && (
                    <div key={exercise.id} className="de-exercise-content">
                      <h3 className="de-exercise-title">{exercise.title}</h3>

                      {/* Breathing Exercise: Show the animated circle and controls */}
                      {exercise.type === 'breathing' && (
                        <>
                          <div className="de-breathing-circle-container">
                            <div className={`de-breathing-circle ${phase}`}>
                              <span>{timeLeft}s</span>
                            </div>
                            {breathingStarted && paused && (
                              <p className="de-phase">Paused</p>
                            )}
                            {breathingStarted && !paused && (
                              <p className="de-phase">{phase}</p>
                            )}
                          </div>
                          <div className="de-controls">
                            {!breathingStarted ? (
                              <button
                                className="de-start-button"
                                onClick={startBreathingExercise}
                              >
                                Start
                              </button>
                            ) : (
                              <>
                                <button
                                  className="de-pause-button"
                                  onClick={pauseExercise}
                                >
                                  {paused ? 'Resume' : 'Pause'}
                                </button>
                                <button className="de-done-button" onClick={goBack}>
                                  Done
                                </button>
                              </>
                            )}
                          </div>
                        </>
                      )}

                      {/* Gratitude Journal: Let the user add entries and display them */}
                      {exercise.type === 'gratitude' && (
                        <>
                          <div className="de-gratitude-journal">
                            {gratitudeEntries.length < 3 ? (
                              <form onSubmit={handleGratitudeSubmit}>
                                <p className="de-gratitude-instruction">
                                  Write 3 things you are grateful for:
                                </p>
                                <input
                                  type="text"
                                  value={gratitudeInput}
                                  onChange={(e) => setGratitudeInput(e.target.value)}
                                  placeholder="What are you grateful for?"
                                  className="de-gratitude-input"
                                />
                                <button type="submit" className="de-gratitude-submit">
                                  Add
                                </button>
                              </form>
                            ) : (
                              <>
                                <p className="de-gratitude-complete">
                                  Great job! You’ve added 3 entries.
                                </p>
                                <p className="de-affirming-line">
                                  You’re cultivating positivity—well done!
                                </p>
                              </>
                            )}
                            <ul className="de-gratitude-list">
                              {gratitudeEntries.map((entry, index) => (
                                <li key={index}>{entry}</li>
                              ))}
                            </ul>
                          </div>
                          <div className="de-controls">
                            <button className="de-done-button" onClick={goBack}>
                              Done
                            </button>
                          </div>
                        </>
                      )}

                      {/* Grounding Exercise: Guide the user through the 5-4-3-2-1 method */}
                      {exercise.type === 'grounding' && (
                        <>
                          <div className="de-grounding-exercise">
                            {groundingStep ? (
                              <>
                                <p>
                                  Name{' '}
                                  {requiredGroundingCounts[groundingStep] -
                                    groundingAnswers[groundingStep].length}{' '}
                                  more thing(s) you can {groundingStep}:
                                </p>
                                <form onSubmit={handleGroundingSubmit}>
                                  <input
                                    type="text"
                                    value={currentGroundingInput}
                                    onChange={(e) =>
                                      setCurrentGroundingInput(e.target.value)
                                    }
                                    placeholder={`Enter a ${groundingStep} item`}
                                    className="de-grounding-input"
                                  />
                                  <button type="submit" className="de-grounding-submit">
                                    Add
                                  </button>
                                </form>
                                <div className="de-grounding-summary">
                                  {Object.entries(groundingAnswers).map(
                                    ([category, items]) =>
                                      items.length > 0 && (
                                        <div key={category}>
                                          <h4>
                                            {category.charAt(0).toUpperCase() +
                                              category.slice(1)}
                                            :
                                          </h4>
                                          <ul className="de-grounding-list">
                                            {items.map((item, index) => (
                                              <li key={index}>
                                                {item}
                                                <button
                                                  className="de-grounding-delete-button"
                                                  onClick={() =>
                                                    handleGroundingDelete(category, index)
                                                  }
                                                >
                                                  Delete
                                                </button>
                                              </li>
                                            ))}
                                          </ul>
                                        </div>
                                      )
                                  )}
                                </div>
                              </>
                            ) : (
                              <>
                                <p className="de-grounding-complete">
                                  Well done! You’ve completed the grounding exercise.
                                </p>
                                <div className="de-grounding-summary">
                                  {Object.entries(groundingAnswers).map(
                                    ([category, items]) => (
                                      <div key={category}>
                                        <h4>
                                          {category.charAt(0).toUpperCase() +
                                            category.slice(1)}
                                          :
                                        </h4>
                                        <ul className="de-grounding-list">
                                          {items.map((item, index) => (
                                            <li key={index}>
                                              {item}
                                              <button
                                                className="de-grounding-delete-button"
                                                onClick={() =>
                                                  handleGroundingDelete(category, index)
                                                }
                                              >
                                                Delete
                                              </button>
                                            </li>
                                          ))}
                                        </ul>
                                      </div>
                                    )
                                  )}
                                </div>
                              </>
                            )}
                          </div>
                          <div className="de-controls">
                            <button className="de-done-button" onClick={goBack}>
                              Done
                            </button>
                          </div>
                        </>
                      )}

                      {/* Self-Compassion Exercise: Prompt the user with affirmations */}
                      {exercise.type === 'self-compassion' && (
                        <>
                          <div className="de-self-compassion-exercise">
                            {selfCompassionStep < selfCompassionPrompts.length ? (
                              <>
                                <p>{selfCompassionPrompts[selfCompassionStep]}</p>
                                <form onSubmit={handleSelfCompassionSubmit}>
                                  <input
                                    type="text"
                                    value={currentSelfCompassionInput}
                                    onChange={(e) =>
                                      setCurrentSelfCompassionInput(e.target.value)
                                    }
                                    placeholder="Type your response"
                                    className="de-self-compassion-input"
                                  />
                                  {selfCompassionStep < selfCompassionPrompts.length - 1 ? (
                                    <button
                                      type="submit"
                                      className="de-self-compassion-submit"
                                    >
                                      Next
                                    </button>
                                  ) : (
                                    <button
                                      type="submit"
                                      className="de-self-compassion-submit"
                                    >
                                      Complete
                                    </button>
                                  )}
                                </form>
                                {Object.keys(selfCompassionAnswers).length > 0 && (
                                  <div className="de-self-compassion-summary">
                                    {Object.entries(selfCompassionAnswers).map(
                                      ([prompt, answer], index) => (
                                        <p key={index}>
                                          <strong>{prompt}</strong> {answer}
                                        </p>
                                      )
                                    )}
                                  </div>
                                )}
                              </>
                            ) : (
                              <>
                                <p className="de-self-compassion-complete">
                                  You’ve completed the self-compassion exercise!
                                </p>
                                <p className="de-affirming-line">
                                  You’re embracing self-love—amazing work!
                                </p>
                                <div className="de-self-compassion-summary">
                                  {Object.entries(selfCompassionAnswers).map(
                                    ([prompt, answer], index) => (
                                      <p key={index}>
                                        <strong>{prompt}</strong> {answer}
                                      </p>
                                    )
                                  )}
                                </div>
                              </>
                            )}
                          </div>
                          <div className="de-controls">
                            <button className="de-done-button" onClick={goBack}>
                              Done
                            </button>
                          </div>
                        </>
                      )}

                      {/* Trigger Identification: Let the user select triggers and see coping strategies */}
                      {exercise.type === 'trigger' && (
                        <>
                          <div className="de-trigger-exercise">
                            <p>Select scenarios that trigger you:</p>
                            <div className="de-trigger-list">
                              {triggersList.map((trigger) => (
                                <button
                                  key={trigger.id}
                                  className={`de-trigger-item ${
                                    triggers.includes(trigger.id) ? 'selected' : ''
                                  }`}
                                  onClick={() => handleTriggerSelect(trigger.id)}
                                >
                                  {trigger.label}
                                </button>
                              ))}
                            </div>
                            {triggers.length > 0 && (
                              <div className="de-trigger-coping">
                                <h4>Coping Strategies</h4>
                                {triggers.map((triggerId) => {
                                  const trigger = triggersList.find(
                                    (t) => t.id === triggerId
                                  );
                                  return <p key={trigger.id}>{trigger.coping}</p>;
                                })}
                              </div>
                            )}
                          </div>
                          <div className="de-controls">
                            <button className="de-done-button" onClick={goBack}>
                              Done
                            </button>
                          </div>
                        </>
                      )}

                      {/* Mindfulness Timer: A simple timer with background music option */}
                      {exercise.type === 'mindfulness' && (
                        <>
                          <div className="de-mindfulness-timer-container">
                            <p className="de-mindfulness-instruction">
                              Think about positive things, sit in your comfortable place, and
                              let your mind relax.
                            </p>
                            <div className="de-circular-timer" role="timer" aria-label={`Mindfulness timer with ${timeLeft} seconds remaining`}>
                              <svg className="de-circular-progress" viewBox="0 0 100 100">
                                <circle className="de-circular-bg" cx="50" cy="50" r="45" />
                                <circle
                                  className="de-circular-progress-bar"
                                  cx="50"
                                  cy="50"
                                  r="45"
                                  style={{
                                    strokeDashoffset: `${283 - (283 * timeLeft) / exercise.duration}`,
                                  }}
                                />
                              </svg>
                              <span className="de-timer-text">{timeLeft}s</span>
                            </div>
                            {mindfulnessStarted && paused && (
                              <p className="de-phase">Paused</p>
                            )}
                          </div>
                          <audio ref={audioRef} src={upliftingAudio} loop />
                          <div className="de-music-toggle">
                            <label>
                              <input
                                type="checkbox"
                                checked={playMusic}
                                onChange={(e) => setPlayMusic(e.target.checked)}
                                aria-label="Toggle background music"
                              />
                              Play Background Music
                            </label>
                          </div>
                          <div className="de-controls">
                            {!mindfulnessStarted ? (
                              <button
                                className="de-start-button"
                                onClick={startMindfulnessTimer}
                              >
                                Start
                              </button>
                            ) : (
                              <>
                                <button
                                  className="de-pause-button"
                                  onClick={pauseExercise}
                                >
                                  {paused ? 'Resume' : 'Pause'}
                                </button>
                                <button className="de-done-button" onClick={goBack}>
                                  Done
                                </button>
                              </>
                            )}
                          </div>
                        </>
                      )}
                    </div>
                  )
                ))}
              </div>
            ) : (
              // Show the grid of exercise cards when no exercise is selected
              <div className="de-cards">
                {exercises.map((exercise) => {
                  const IconComponent = exercise.icon; // Get the icon component
                  return (
                    <div key={exercise.id} className={`de-card ${exercise.theme}`}>
                      <img
                        src={exercise.image}
                        alt={exercise.title}
                        className="de-exercise-image"
                      />
                      <div className="de-card-header">
                        <IconComponent className={exercise.iconClass} /> {/* Render the icon */}
                        <h3 className="de-card-title">{exercise.title}</h3>
                      </div>
                      <p className="de-card-description">
                        {exercise.description.split('\n').map((line, i) => (
                          <span key={i}>
                            {line}
                            <br />
                          </span>
                        ))}
                      </p>
                      <button
                        className="de-button"
                        onClick={() => startExercise(exercise)}
                      >
                        Start
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
};

export default DailyExercises;