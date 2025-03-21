import { useState, useEffect, useRef } from 'react';
import { Wind, Heart, Eye, Smile, AlertTriangle, Clock } from 'lucide-react';

// Import images 
import boxBreathingImage from '../assets/Box-B.png';
import gratitudeJournalImage from '../assets/Gratitude.png';
import groundingImage from '../assets/54321-image.png';
import selfCompassionImage from '../assets/Self-Com.png';
import triggerIdentificationImage from '../assets/Triggers.png';
import mindfulnessTimerImage from '../assets/meditate.png';

// Import the audio file 
import upliftingAudio from '../assets/uplifting.mp3';

// Define the exercises array 
export const exercises = [
  {
    id: 'breathing',
    title: 'Box Breathing',
    description: 'Follow the circle to inhale, hold, and exhale in a calming 4-second rhythm.\nHelps reduce stress and improve focus.',
    duration: 60, // Total duration in seconds
    type: 'breathing',
    cycle: 12, // Each cycle (inhale, hold, exhale) takes 12 seconds
    theme: 'calm',
    icon: Wind, 
    iconClass: 'de-exercise-icon',
    image: boxBreathingImage,
  },
  {
    id: 'gratitude',
    title: 'Gratitude Journal',
    description: 'Write three things you’re grateful for today.\nBoosts positivity and emotional well-being.',
    type: 'gratitude',
    theme: 'gratitude',
    icon: Heart,
    iconClass: 'de-exercise-icon',
    image: gratitudeJournalImage,
  },
  {
    id: 'grounding',
    title: '5-4-3-2-1 Grounding',
    description: 'Identify 5 things you see, 4 you touch, 3 you hear, 2 you smell, 1 you taste.\nGrounds you in the present moment.',
    type: 'grounding',
    theme: 'focus',
    icon: Eye,
    iconClass: 'de-exercise-icon',
    image: groundingImage,
  },
  {
    id: 'self-compassion',
    title: 'Self-Compassion Exercise',
    description: 'Reflect on positive affirmations about yourself.\nBuilds self-love and emotional resilience.',
    type: 'self-compassion',
    theme: 'strength',
    icon: Smile,
    iconClass: 'de-exercise-icon',
    image: selfCompassionImage,
  },
  {
    id: 'trigger',
    title: 'Trigger Identification',
    description: 'Select scenarios that trigger you and get coping strategies.\nHelps manage anxiety and addictive behaviors.',
    type: 'trigger',
    theme: 'uplift',
    icon: AlertTriangle,
    iconClass: 'de-exercise-icon',
    image: triggerIdentificationImage,
  },
  {
    id: 'mindfulness',
    title: 'Mindfulness Timer',
    description: 'A 5-minute timer for a mindful meditation session.\nPromotes relaxation and mental clarity.',
    duration: 300, // 5 minutes in seconds
    type: 'mindfulness',
    theme: 'peace',
    icon: Clock,
    iconClass: 'de-exercise-icon',
    image: mindfulnessTimerImage,
  },
];

// Triggers for the Trigger Identification exercise
export const triggersList = [
  { id: 'stress', label: 'Feeling stressed at work', coping: 'Try deep breathing or a short walk.' },
  { id: 'social', label: 'Social gatherings', coping: 'Set boundaries and take breaks as needed.' },
  { id: 'boredom', label: 'Feeling bored or restless', coping: 'Engage in a hobby or mindfulness activity.' },
  { id: 'alcohol', label: 'Seeing alcohol', coping: 'Distract yourself with a healthy activity.' },
  { id: 'overwhelmed', label: 'Feeling overwhelmed', coping: 'Break tasks into smaller steps.' },
  { id: 'sleep', label: 'Lack of sleep', coping: 'Prioritize rest and a consistent sleep schedule.' },
];

// Prompts for the Self-Compassion exercise
export const selfCompassionPrompts = [
  'I am proud of myself because...',
  'I am strong because...',
  'I deserve love because...',
];

// Steps in Grounding exercise
export const requiredGroundingCounts = {
  see: 5,
  touch: 4,
  hear: 3,
  smell: 2,
  taste: 1,
};

export const stepOrder = ['see', 'touch', 'hear', 'smell', 'taste'];

// Custom hook to manage all the logic for the Daily Exercises page
export const useDailyExercisesLogic = () => {

  // State for managing the selected exercise and its timer
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [timeLeft, setTimeLeft] = useState(0);
  const [phase, setPhase] = useState(''); // For breathing: inhale, hold, exhale
  const [paused, setPaused] = useState(false);
  const [breathingStarted, setBreathingStarted] = useState(false);

  // State for the Gratitude Journal exercise
  const [gratitudeEntries, setGratitudeEntries] = useState([]);
  const [gratitudeInput, setGratitudeInput] = useState('');

  // State for Grounding exercise
  const [groundingAnswers, setGroundingAnswers] = useState({
    see: [], touch: [], hear: [], smell: [], taste: [],
  });
  const [groundingStep, setGroundingStep] = useState('see');
  const [furthestGroundingStep, setFurthestGroundingStep] = useState('see');
  const [currentGroundingInput, setCurrentGroundingInput] = useState('');

  // State for the Self-Compassion exercise
  const [selfCompassionAnswers, setSelfCompassionAnswers] = useState({});
  const [selfCompassionStep, setSelfCompassionStep] = useState(0);
  const [currentSelfCompassionInput, setCurrentSelfCompassionInput] = useState('');

  // State for the Trigger Identification exercise
  const [triggers, setTriggers] = useState([]);

  // State for the Mindfulness Timer exercise
  const [mindfulnessStarted, setMindfulnessStarted] = useState(false);
  const [playMusic, setPlayMusic] = useState(true);

  const audioRef = useRef(null);

  // Start a new exercise and reset all relevant state
  const startExercise = (exercise) => {
    setSelectedExercise(exercise.id);
    setTimeLeft(exercise.duration || 0);
    setPaused(false);
    setPhase(exercise.type === 'breathing' ? 'inhale' : '');
    setGratitudeInput('');
    setGratitudeEntries([]);
    setGroundingAnswers({ see: [], touch: [], hear: [], smell: [], taste: [] });
    setGroundingStep('see');
    setFurthestGroundingStep('see');
    setCurrentGroundingInput('');
    setSelfCompassionAnswers({});
    setSelfCompassionStep(0);
    setCurrentSelfCompassionInput('');
    setTriggers([]);
    setMindfulnessStarted(false);
    setBreathingStarted(false);
    setPlayMusic(true);
  };

  // Go back to the exercise list and reset everything
  const goBack = () => {
    setSelectedExercise(null);
    setTimeLeft(0);
    setPhase('');
    setPaused(false);
    setMindfulnessStarted(false);
    setBreathingStarted(false);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  // Pause or resume the current exercise (affects timers and audio)
  const pauseExercise = () => {
    setPaused(!paused);
    if (audioRef.current && playMusic) {
      if (!paused) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
    }
  };

  // Start the Box Breathing exercise
  const startBreathingExercise = () => {
    setBreathingStarted(true);
  };

  // Start the Mindfulness Timer and play background music if enabled
  const startMindfulnessTimer = () => {
    setMindfulnessStarted(true);
    if (audioRef.current && playMusic) {
      audioRef.current.play();
    }
  };

  // Handle the audio playback for the Mindfulness Timer based on playMusic and paused state
  useEffect(() => {
    if (audioRef.current && mindfulnessStarted) {
      if (playMusic && !paused) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  }, [playMusic, mindfulnessStarted, paused]);

  // Timer logic for exercises with a duration (Box Breathing and Mindfulness Timer)
  useEffect(() => {
    if (
      !selectedExercise ||
      timeLeft <= 0 ||
      paused ||
      (selectedExercise === 'mindfulness' && !mindfulnessStarted) ||
      (selectedExercise === 'breathing' && !breathingStarted)
    ) {
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);

      // Update the breathing phase (inhale, hold, exhale) for Box Breathing
      const exercise = exercises.find((ex) => ex.id === selectedExercise);
      if (exercise.type === 'breathing') {
        const cycleTime = exercise.cycle;
        const secondsInCycle = Math.floor((exercise.duration - timeLeft) % cycleTime);
        if (secondsInCycle < 4) setPhase('inhale');
        else if (secondsInCycle < 8) setPhase('hold');
        else setPhase('exhale');
      }
    }, 1000);

    // When the timer reaches 0, reset the exercise
    if (timeLeft === 0) {
      setSelectedExercise(null);
      setPhase('');
      setPaused(false);
      setMindfulnessStarted(false);
      setBreathingStarted(false);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    }

    return () => clearInterval(timer);
  }, [selectedExercise, timeLeft, paused, mindfulnessStarted, breathingStarted]);

  // Handle form submission for the Gratitude Journal
  const handleGratitudeSubmit = (e) => {
    e.preventDefault();
    if (gratitudeInput.trim() && gratitudeEntries.length < 3) {
      setGratitudeEntries([...gratitudeEntries, gratitudeInput]);
      setGratitudeInput('');
    }
  };

  // Handle form submission for the 5-4-3-2-1 Grounding exercise
  const handleGroundingSubmit = (e) => {
    e.preventDefault();
    if (!currentGroundingInput.trim()) return;

    const currentAnswers = groundingAnswers[groundingStep];
    if (currentAnswers.length < requiredGroundingCounts[groundingStep]) {
      setGroundingAnswers({
        ...groundingAnswers,
        [groundingStep]: [...currentAnswers, currentGroundingInput],
      });
      setCurrentGroundingInput('');
    }

    const updatedAnswers = {
      ...groundingAnswers,
      [groundingStep]: [...currentAnswers, currentGroundingInput],
    };

    // Move to the next step if the current step is complete
    if (updatedAnswers[groundingStep].length === requiredGroundingCounts[groundingStep]) {
      const nextStep = {
        see: 'touch',
        touch: 'hear',
        hear: 'smell',
        smell: 'taste',
        taste: null,
      }[groundingStep];
      setGroundingStep(nextStep);
      if (nextStep) {
        const currentFurthestIndex = stepOrder.indexOf(furthestGroundingStep);
        const nextStepIndex = stepOrder.indexOf(nextStep);
        if (nextStepIndex > currentFurthestIndex) {
          setFurthestGroundingStep(nextStep);
        }
      }
    } else {
      setGroundingStep(furthestGroundingStep);
    }
  };

  // Delete an item from the Grounding exercise answers and adjust the step if needed
  const handleGroundingDelete = (category, index) => {
    setGroundingAnswers({
      ...groundingAnswers,
      [category]: groundingAnswers[category].filter((_, i) => i !== index),
    });

    const currentFurthestIndex = stepOrder.indexOf(furthestGroundingStep);
    const deletedCategoryIndex = stepOrder.indexOf(category);
    if (deletedCategoryIndex <= currentFurthestIndex) {
      setGroundingStep(category);
    }
  };

  // Handle form submission for the Self-Compassion exercise
  const handleSelfCompassionSubmit = (e) => {
    e.preventDefault();
    if (!currentSelfCompassionInput.trim()) return;

    const prompt = selfCompassionPrompts[selfCompassionStep];
    setSelfCompassionAnswers({
      ...selfCompassionAnswers,
      [prompt]: currentSelfCompassionInput,
    });

    if (selfCompassionStep < selfCompassionPrompts.length - 1) {
      setSelfCompassionStep(selfCompassionStep + 1);
      setCurrentSelfCompassionInput('');
    } else {
      setSelfCompassionStep(selfCompassionPrompts.length);
      setCurrentSelfCompassionInput('');
    }
  };

  // Toggle a trigger in the Trigger Identification exercise
  const handleTriggerSelect = (triggerId) => {
    if (triggers.includes(triggerId)) {
      setTriggers(triggers.filter((id) => id !== triggerId));
    } else {
      setTriggers([...triggers, triggerId]);
    }
  };

  // Return all the state and functions to be used in the DailyExercises component
  return {
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
    furthestGroundingStep,
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
  };
};