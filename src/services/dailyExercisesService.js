import { useState, useEffect, useRef } from 'react';
import { Wind, Heart, Eye, Smile, AlertTriangle, Clock } from 'lucide-react';

// Import images
import boxBreathingImage from '../assets/Box-B.png';
import gratitudeJournalImage from '../assets/Gratitude.png';
import groundingImage from '../assets/54321-image.png';
import selfCompassionImage from '../assets/Self-Com.png';
import triggerIdentificationImage from '../assets/Triggers.png';
import mindfulnessTimerImage from '../assets/meditate.png';

// Import audio
import upliftingAudio from '../assets/uplifting.mp3';

// Define the exercises array without JSX
export const exercises = [
  {
    id: 'breathing',
    title: 'Box Breathing',
    description: 'Follow the circle to inhale, hold, and exhale in a calming 4-second rhythm.\nHelps reduce stress and improve focus.',
    duration: 60,
    type: 'breathing',
    cycle: 12,
    theme: 'calm',
    icon: Wind, // Store the icon component reference
    iconClass: 'de-exercise-icon', // Store the class name separately
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

export const useDailyExercisesLogic = () => {
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [timeLeft, setTimeLeft] = useState(0);
  const [phase, setPhase] = useState('');
  const [paused, setPaused] = useState(false);
  const [breathingStarted, setBreathingStarted] = useState(false);
  const [gratitudeEntries, setGratitudeEntries] = useState([]);
  const [gratitudeInput, setGratitudeInput] = useState('');
  const [groundingAnswers, setGroundingAnswers] = useState({
    see: [], touch: [], hear: [], smell: [], taste: [],
  });
  const [groundingStep, setGroundingStep] = useState('see');
  const [furthestGroundingStep, setFurthestGroundingStep] = useState('see');
  const [currentGroundingInput, setCurrentGroundingInput] = useState('');
  const [selfCompassionAnswers, setSelfCompassionAnswers] = useState({});
  const [selfCompassionStep, setSelfCompassionStep] = useState(0);
  const [currentSelfCompassionInput, setCurrentSelfCompassionInput] = useState('');
  const [triggers, setTriggers] = useState([]);
  const [mindfulnessStarted, setMindfulnessStarted] = useState(false);
  const [playMusic, setPlayMusic] = useState(true);

  const audioRef = useRef(null);

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

  const startBreathingExercise = () => {
    setBreathingStarted(true);
  };

  const startMindfulnessTimer = () => {
    setMindfulnessStarted(true);
    if (audioRef.current && playMusic) {
      audioRef.current.play();
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
  }, [playMusic, mindfulnessStarted, paused]);

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

      const exercise = exercises.find((ex) => ex.id === selectedExercise);
      if (exercise.type === 'breathing') {
        const cycleTime = exercise.cycle;
        const secondsInCycle = Math.floor((exercise.duration - timeLeft) % cycleTime);
        if (secondsInCycle < 4) setPhase('inhale');
        else if (secondsInCycle < 8) setPhase('hold');
        else setPhase('exhale');
      }
    }, 1000);

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

  const handleGratitudeSubmit = (e) => {
    e.preventDefault();
    if (gratitudeInput.trim() && gratitudeEntries.length < 3) {
      setGratitudeEntries([...gratitudeEntries, gratitudeInput]);
      setGratitudeInput('');
    }
  };

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

  const handleTriggerSelect = (triggerId) => {
    if (triggers.includes(triggerId)) {
      setTriggers(triggers.filter((id) => id !== triggerId));
    } else {
      setTriggers([...triggers, triggerId]);
    }
  };

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