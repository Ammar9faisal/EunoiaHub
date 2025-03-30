import { useState, useEffect, useRef } from 'react';
import { Wind, Heart, Eye, Smile, AlertTriangle, Clock } from 'lucide-react';
import boxBreathingImage from '../assets/Box-B.png';
import gratitudeJournalImage from '../assets/Gratitude.png';
import groundingImage from '../assets/54321-image.png';
import selfCompassionImage from '../assets/Self-Com.png';
import triggerIdentificationImage from '../assets/Triggers.png';
import mindfulnessTimerImage from '../assets/meditate.png';
import upliftingAudio from '../assets/uplifting.mp3';

export const exercises = [ // List of exercises
  {
    id: 'breathing',
    title: 'Box Breathing',
    description: 'Follow the circle to inhale, hold, and exhale in a calming 4-second rhythm.\nHelps reduce stress and improve focus.',
    duration: 60,
    type: 'breathing',
    cycle: 12,
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
    duration: 300,
    type: 'mindfulness',
    theme: 'peace',
    icon: Clock,
    iconClass: 'de-exercise-icon',
    image: mindfulnessTimerImage,
  },
];
// List of exercises with their properties
export const triggersList = [
  { id: 'stress', label: 'Feeling stressed at work', coping: 'Try deep breathing or a short walk.' },
  { id: 'social', label: 'Social gatherings', coping: 'Set boundaries and take breaks as needed.' },
  { id: 'boredom', label: 'Feeling bored or restless', coping: 'Engage in a hobby or mindfulness activity.' },
  { id: 'alcohol', label: 'Seeing alcohol', coping: 'Distract yourself with a healthy activity.' },
  { id: 'overwhelmed', label: 'Feeling overwhelmed', coping: 'Break tasks into smaller steps.' },
  { id: 'sleep', label: 'Lack of sleep', coping: 'Prioritize rest and a consistent sleep schedule.' },
];

export const selfCompassionPrompts = [
  'I am proud of myself because...',
  'I am strong because...',
  'I deserve love because...',
];

export const requiredGroundingCounts = {
  see: 5,
  touch: 4,
  hear: 3,
  smell: 2,
  taste: 1,
};

export const stepOrder = ['see', 'touch', 'hear', 'smell', 'taste'];

// Configuration object for exercise types
export const exerciseConfig = {
  breathing: {
    initialState: {
      timeLeft: (exercise) => exercise.duration || 0,
      phase: 'inhale',
      paused: false,
      started: false,
    },
    resetState: {
      timeLeft: (exercise) => exercise.duration || 0,
      phase: 'inhale',
      paused: false,
      started: false,
    },
  },
  gratitude: {
    initialState: {
      entries: [],
      input: '',
    },
    resetState: {
      entries: [],
      input: '',
    },
  },
  grounding: {
    initialState: {
      answers: { see: [], touch: [], hear: [], smell: [], taste: [] },
      step: 'see',
      furthestStep: 'see',
      input: '',
    },
    resetState: {
      answers: { see: [], touch: [], hear: [], smell: [], taste: [] },
      step: 'see',
      furthestStep: 'see',
      input: '',
    },
  },
  'self-compassion': {
    initialState: {
      answers: {},
      step: 0,
      input: '',
    },
    resetState: {
      answers: {},
      step: 0,
      input: '',
    },
  },
  trigger: {
    initialState: {
      triggers: [],
    },
    resetState: {
      triggers: [],
    },
  },
  mindfulness: {
    initialState: {
      timeLeft: (exercise) => exercise.duration || 0,
      paused: false,
      started: false,
      playMusic: true,
    },
    resetState: {
      timeLeft: (exercise) => exercise.duration || 0,
      paused: false,
      started: false,
      playMusic: true,
    },
  },
};

// Hook for Box Breathing logic
export const useBreathingLogic = (exercise) => {
  const [timeLeft, setTimeLeft] = useState(exerciseConfig.breathing.initialState.timeLeft(exercise));
  const [phase, setPhase] = useState(exerciseConfig.breathing.initialState.phase);
  const [paused, setPaused] = useState(exerciseConfig.breathing.initialState.paused);
  const [breathingStarted, setBreathingStarted] = useState(exerciseConfig.breathing.initialState.started);

  const startBreathingExercise = () => {
    setBreathingStarted(true);
  };

  const pauseExercise = () => {
    setPaused(!paused);
  };

  useEffect(() => {
    if (!breathingStarted || timeLeft <= 0 || paused) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
      const cycleTime = exercise.cycle;
      const secondsInCycle = Math.floor((exercise.duration - timeLeft) % cycleTime);
      if (secondsInCycle < 4) setPhase('inhale');
      else if (secondsInCycle < 8) setPhase('hold');
      else setPhase('exhale');
    }, 1000);

    if (timeLeft === 0) {
      setPhase('');
      setPaused(false);
      setBreathingStarted(false);
    }

    return () => clearInterval(timer);
  }, [breathingStarted, timeLeft, paused, exercise]);

  return { timeLeft, phase, paused, breathingStarted, startBreathingExercise, pauseExercise };
};

// Hook for Gratitude Journal logic
export const useGratitudeLogic = () => {
  const [gratitudeEntries, setGratitudeEntries] = useState(exerciseConfig.gratitude.initialState.entries);
  const [gratitudeInput, setGratitudeInput] = useState(exerciseConfig.gratitude.initialState.input);

  const handleGratitudeSubmit = (e) => {
    e.preventDefault();
    if (gratitudeInput.trim() && gratitudeEntries.length < 3) {
      setGratitudeEntries([...gratitudeEntries, gratitudeInput]);
      setGratitudeInput('');
    }
  };

  return { gratitudeEntries, gratitudeInput, setGratitudeInput, handleGratitudeSubmit };
};

// Hook for Grounding exercise logic
export const useGroundingLogic = () => {
  const [groundingAnswers, setGroundingAnswers] = useState(exerciseConfig.grounding.initialState.answers);
  const [groundingStep, setGroundingStep] = useState(exerciseConfig.grounding.initialState.step);
  const [furthestGroundingStep, setFurthestGroundingStep] = useState(exerciseConfig.grounding.initialState.furthestStep);
  const [currentGroundingInput, setCurrentGroundingInput] = useState(exerciseConfig.grounding.initialState.input);

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

  return {
    groundingAnswers,
    groundingStep,
    currentGroundingInput,
    setCurrentGroundingInput,
    handleGroundingSubmit,
    handleGroundingDelete,
  };
};

// Hook for Self-Compassion exercise logic
export const useSelfCompassionLogic = () => {
  const [selfCompassionAnswers, setSelfCompassionAnswers] = useState(exerciseConfig['self-compassion'].initialState.answers);
  const [selfCompassionStep, setSelfCompassionStep] = useState(exerciseConfig['self-compassion'].initialState.step);
  const [currentSelfCompassionInput, setCurrentSelfCompassionInput] = useState(exerciseConfig['self-compassion'].initialState.input);

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

  return {
    selfCompassionAnswers,
    selfCompassionStep,
    currentSelfCompassionInput,
    setCurrentSelfCompassionInput,
    handleSelfCompassionSubmit,
  };
};

// Hook for Trigger Identification logic
export const useTriggerLogic = () => {
  const [triggers, setTriggers] = useState(exerciseConfig.trigger.initialState.triggers);

  const handleTriggerSelect = (triggerId) => {
    if (triggers.includes(triggerId)) {
      setTriggers(triggers.filter((id) => id !== triggerId));
    } else {
      setTriggers([...triggers, triggerId]);
    }
  };

  return { triggers, handleTriggerSelect };
};

// Hook for Mindfulness Timer logic
export const useMindfulnessLogic = (exercise, audioRef) => {
  const [timeLeft, setTimeLeft] = useState(exerciseConfig.mindfulness.initialState.timeLeft(exercise));
  const [paused, setPaused] = useState(exerciseConfig.mindfulness.initialState.paused);
  const [mindfulnessStarted, setMindfulnessStarted] = useState(exerciseConfig.mindfulness.initialState.started);
  const [playMusic, setPlayMusic] = useState(exerciseConfig.mindfulness.initialState.playMusic);

  const startMindfulnessTimer = () => {
    setMindfulnessStarted(true);
    if (audioRef.current && playMusic) {
      audioRef.current.play();
    }
  };

  const pauseExercise = () => {
    setPaused(!paused);
    if (audioRef.current && playMusic) {
      if (paused) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  };

  useEffect(() => {
    if (audioRef.current && mindfulnessStarted) {
      if (playMusic && !paused) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  }, [playMusic, mindfulnessStarted, paused, audioRef]);

  useEffect(() => {
    if (!mindfulnessStarted || timeLeft <= 0 || paused) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    if (timeLeft === 0) {
      setPaused(false);
      setMindfulnessStarted(false);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    }

    return () => clearInterval(timer);
  }, [mindfulnessStarted, timeLeft, paused, audioRef]);

  return { timeLeft, paused, mindfulnessStarted, playMusic, setPlayMusic, startMindfulnessTimer, pauseExercise };
};

// Hook to manage exercise selection
export const useDailyExercisesLogic = () => {
  const [selectedExercise, setSelectedExercise] = useState(null);
  const audioRef = useRef(null);

  const startExercise = (exercise) => {
    setSelectedExercise(exercise.id);
  };

  const goBack = () => {
    setSelectedExercise(null);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  return { selectedExercise, startExercise, goBack, audioRef, upliftingAudio };
};