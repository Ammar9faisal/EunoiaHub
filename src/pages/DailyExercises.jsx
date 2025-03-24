import React from 'react';
import Sidebar from '../components/Sidebar.jsx';
import '../../styles/DailyExercises.css';
import {
  exercises,
  triggersList,
  selfCompassionPrompts,
  requiredGroundingCounts,
  useDailyExercisesLogic,
  useBreathingLogic,
  useGratitudeLogic,
  useGroundingLogic,
  useSelfCompassionLogic,
  useTriggerLogic,
  useMindfulnessLogic,
} from '../services/dailyExercisesService';

// box breathing exercise
const BoxBreathing = ({ exercise, goBack }) => {
  const { timeLeft, phase, paused, breathingStarted, startBreathingExercise, pauseExercise } = useBreathingLogic(exercise);

  //Circular clock for breathing
  return (
    <div className="de-exercise-content">
      <h3 className="de-exercise-title">{exercise.title}</h3>
      <div className="de-breathing-circle-container">
        <div className={`de-breathing-circle ${phase}`}>
          <span>{timeLeft}s</span>
        </div>
        {breathingStarted && paused && <p className="de-phase">Paused</p>}
        {breathingStarted && !paused && <p className="de-phase">{phase}</p>}
      </div>
      <div className="de-controls">
        {!breathingStarted ? (
          <button className="de-start-button" onClick={startBreathingExercise}>
            Start
          </button>
        ) : (
          <>
            <button className="de-pause-button" onClick={pauseExercise}>
              {paused ? 'Resume' : 'Pause'}
            </button>
            <button className="de-done-button" onClick={goBack}>
              Done
            </button>
          </>
        )}
      </div>
    </div>
  );
};

// gratitude Journal exercise
const GratitudeJournal = ({ exercise, goBack }) => {
  const { gratitudeEntries, gratitudeInput, setGratitudeInput, handleGratitudeSubmit } = useGratitudeLogic();

  // Gratitude entries input form
  return (
    <div className="de-exercise-content">
      <h3 className="de-exercise-title">{exercise.title}</h3>
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
    </div>
  );
};

// 5-4-3-2-1 rounding exercise
const GroundingExercise = ({ exercise, goBack }) => {
  const {
    groundingAnswers,
    groundingStep,
    currentGroundingInput,
    setCurrentGroundingInput,
    handleGroundingSubmit,
    handleGroundingDelete,
  } = useGroundingLogic();

  // current step of the grounding exercise
  return (
    <div className="de-exercise-content">
      <h3 className="de-exercise-title">{exercise.title}</h3>
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
                onChange={(e) => setCurrentGroundingInput(e.target.value)}
                placeholder={`Enter a ${groundingStep} item`}
                className="de-grounding-input"
              />
              <button type="submit" className="de-grounding-submit">
                Add
              </button>
            </form>
            <div className="de-grounding-summary">
              {Object.entries(groundingAnswers).map(([category, items]) =>
                items.length > 0 && (
                  <div key={category}>
                    <h4>{category.charAt(0).toUpperCase() + category.slice(1)}:</h4>
                    <ul className="de-grounding-list">
                      {items.map((item, index) => (
                        <li key={index}>
                          {item}
                          <button
                            className="de-grounding-delete-button"
                            onClick={() => handleGroundingDelete(category, index)}
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
          // summary of all grounding answers once the exercise is complete
          <>
            <p className="de-grounding-complete">
              Well done! You’ve completed the grounding exercise.
            </p>
            <div className="de-grounding-summary">
              {Object.entries(groundingAnswers).map(([category, items]) => (
                <div key={category}>
                  <h4>{category.charAt(0).toUpperCase() + category.slice(1)}:</h4>
                  <ul className="de-grounding-list">
                    {items.map((item, index) => (
                      <li key={index}>
                        {item}
                        <button
                          className="de-grounding-delete-button"
                          onClick={() => handleGroundingDelete(category, index)}
                        >
                          Delete
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
      <div className="de-controls">
        <button className="de-done-button" onClick={goBack}>
          Done
        </button>
      </div>
    </div>
  );
};

//Self-Compassion exercise
const SelfCompassionExercise = ({ exercise, goBack }) => {
  const {
    selfCompassionAnswers,
    selfCompassionStep,
    currentSelfCompassionInput,
    setCurrentSelfCompassionInput,
    handleSelfCompassionSubmit,
  } = useSelfCompassionLogic();

  // prompts for the self-compassion exercise
  return (
    <div className="de-exercise-content">
      <h3 className="de-exercise-title">{exercise.title}</h3>
      <div className="de-self-compassion-exercise">
        {selfCompassionStep < selfCompassionPrompts.length ? (
          <>
            <p>{selfCompassionPrompts[selfCompassionStep]}</p>
            <form onSubmit={handleSelfCompassionSubmit}>
              <input
                type="text"
                value={currentSelfCompassionInput}
                onChange={(e) => setCurrentSelfCompassionInput(e.target.value)}
                placeholder="Type your response"
                className="de-self-compassion-input"
              />
              {selfCompassionStep < selfCompassionPrompts.length - 1 ? (
                <button type="submit" className="de-self-compassion-submit">
                  Next
                </button>
              ) : (
                <button type="submit" className="de-self-compassion-submit">
                  Complete
                </button>
              )}
            </form>
            {Object.keys(selfCompassionAnswers).length > 0 && (
              // Dsummary of user affirmation
              <div className="de-self-compassion-summary">
                {Object.entries(selfCompassionAnswers).map(([prompt, answer], index) => (
                  <p key={index}>
                    <strong>{prompt}</strong> {answer}
                  </p>
                ))}
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
              {Object.entries(selfCompassionAnswers).map(([prompt, answer], index) => (
                <p key={index}>
                  <strong>{prompt}</strong> {answer}
                </p>
              ))}
            </div>
          </>
        )}
      </div>
      <div className="de-controls">
        <button className="de-done-button" onClick={goBack}>
          Done
        </button>
      </div>
    </div>
  );
};

// Trigger Identification exercise
const TriggerIdentification = ({ exercise, goBack }) => {
  const { triggers, handleTriggerSelect } = useTriggerLogic();

  // list of triggers for the user to select 
  return (
    <div className="de-exercise-content">
      <h3 className="de-exercise-title">{exercise.title}</h3>
      <div className="de-trigger-exercise">
        <p>Select scenarios that trigger you:</p>
        <div className="de-trigger-list">
          {triggersList.map((trigger) => (
            <button
              key={trigger.id}
              className={`de-trigger-item ${triggers.includes(trigger.id) ? 'selected' : ''}`}
              onClick={() => handleTriggerSelect(trigger.id)}
            >
              {trigger.label}
            </button>
          ))}
        </div>
        {triggers.length > 0 && (
          // coping strategie sbased on selected triggers
          <div className="de-trigger-coping">
            <h4>Coping Strategies</h4>
            {triggers.map((triggerId) => {
              const trigger = triggersList.find((t) => t.id === triggerId);
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
    </div>
  );
};

//  Mindfulness Timer exercise
const MindfulnessTimer = ({ exercise, goBack, audioRef, upliftingAudio }) => {
  const { timeLeft, paused, mindfulnessStarted, playMusic, setPlayMusic, startMindfulnessTimer, pauseExercise } = useMindfulnessLogic(exercise, audioRef);

  // circular clock for mindfulness
  return (
    <div className="de-exercise-content">
      <h3 className="de-exercise-title">{exercise.title}</h3>
      <div className="de-mindfulness-timer-container">
        <p className="de-mindfulness-instruction">
          Think about positive things, sit in your comfortable place, and let your mind relax.
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
        {mindfulnessStarted && paused && <p className="de-phase">Paused</p>}
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
          <button className="de-start-button" onClick={startMindfulnessTimer}>
            Start
          </button>
        ) : (
          <>
            <button className="de-pause-button" onClick={pauseExercise}>
              {paused ? 'Resume' : 'Pause'}
            </button>
            <button className="de-done-button" onClick={goBack}>
              Done
            </button>
          </>
        )}
      </div>
    </div>
  );
};

// mapping exercies to their respective components
const ExerciseComponents = {
  breathing: BoxBreathing,
  gratitude: GratitudeJournal,
  grounding: GroundingExercise,
  'self-compassion': SelfCompassionExercise,
  trigger: TriggerIdentification,
  mindfulness: MindfulnessTimer,
};

// Main component for Daily Exercises
const DailyExercises = () => {
  const {
    selectedExercise,
    startExercise,
    goBack,
    audioRef,
    upliftingAudio,
  } = useDailyExercisesLogic();


  const selectedExerciseData = exercises.find((ex) => ex.id === selectedExercise);
  const ExerciseComponent = selectedExerciseData
    ? ExerciseComponents[selectedExerciseData.type]
    : null;

  // Renders either the exercise list or the selected exercise’s focused view
  return (
    <div className="de-container">
      <Sidebar />
      <div className="de-main">
        <div className="de-content">
          <section className="de-section">
            <h2 className="de-section-title">Your Daily Wellness Boost</h2>
            {selectedExercise ? (
              // Focused view for the selected exercise
              <div className="de-focused-view">
                <button className="de-back-button" onClick={goBack}>
                  Back
                </button>
                {ExerciseComponent && (
                  <ExerciseComponent
                    exercise={selectedExerciseData}
                    goBack={goBack}
                    audioRef={audioRef}
                    upliftingAudio={upliftingAudio}
                  />
                )}
              </div>
            ) : (
              // Displays a card for each exercise,
              <div className="de-cards">
                {exercises.map((exercise) => {
                  const IconComponent = exercise.icon;
                  return (
                    // Each card showcases an exercise with its image, title, description, and start button
                    <div key={exercise.id} className={`de-card ${exercise.theme}`}>
                      <img
                        src={exercise.image}
                        alt={exercise.title}
                        className="de-exercise-image"
                      />
                      <div className="de-card-header">
                        <IconComponent className={exercise.iconClass} />
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