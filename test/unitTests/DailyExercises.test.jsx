import { describe, expect, test, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import DailyExercises from '../../src/pages/DailyExercises';
import * as dailyExercisesService from '../../src/services/dailyExercisesService';

// Mock the Sidebar component 
vi.mock('../../src/components/Sidebar.jsx', () => ({
  default: () => <div>Sidebar</div>,
}));

// Mock hooks from dailyExercisesService 
vi.mock('../../src/services/dailyExercisesService', async () => {
  const actual = await vi.importActual('../../src/services/dailyExercisesService');
  return {
    ...actual,
    useDailyExercisesLogic: vi.fn(),
    useBreathingLogic: vi.fn(),
    useGratitudeLogic: vi.fn(),
    useGroundingLogic: vi.fn(),
    useSelfCompassionLogic: vi.fn(),
    useTriggerLogic: vi.fn(),
    useMindfulnessLogic: vi.fn(),
  };
});

describe('DailyExercises Component', () => {
  // Mock data for useDailyExercisesLogic 
  const mockUseDailyExercisesLogic = {
    selectedExercise: null,
    startExercise: vi.fn(),
    goBack: vi.fn(),
    audioRef: { current: null },
    upliftingAudio: 'mock-audio.mp3',
  };

  // Mock data for Box Breathing 
  const mockUseBreathingLogic = {
    timeLeft: 60,
    phase: 'inhale',
    paused: false,
    breathingStarted: false,
    startBreathingExercise: vi.fn(),
    pauseExercise: vi.fn(),
  };

  // Mock data for Gratitude Journal
  const mockUseGratitudeLogic = {
    gratitudeEntries: [],
    gratitudeInput: '',
    setGratitudeInput: vi.fn(),
    handleGratitudeSubmit: vi.fn(),
  };

  // Mock data for Grounding Exercise 
  const mockUseGroundingLogic = {
    groundingAnswers: { see: [], touch: [], hear: [], smell: [], taste: [] },
    groundingStep: 'see',
    currentGroundingInput: '',
    setCurrentGroundingInput: vi.fn(),
    handleGroundingSubmit: vi.fn(),
    handleGroundingDelete: vi.fn(),
  };

  // Mock data for Self-Compassion 
  const mockUseSelfCompassionLogic = {
    selfCompassionAnswers: {},
    selfCompassionStep: 0,
    currentSelfCompassionInput: '',
    setCurrentSelfCompassionInput: vi.fn(),
    handleSelfCompassionSubmit: vi.fn(),
  };

  // Mock data for Trigger Identification     
  const mockUseTriggerLogic = {
    triggers: [],
    handleTriggerSelect: vi.fn(),
  };

  // Mock data for Mindfulness Timer
  const mockUseMindfulnessLogic = {
    timeLeft: 300,
    paused: false,
    mindfulnessStarted: false,
    playMusic: true,
    setPlayMusic: vi.fn(),
    startMindfulnessTimer: vi.fn(),
    pauseExercise: vi.fn(),
  };

  beforeEach(() => {
    // Reset all mocks before each test 
    vi.clearAllMocks();
    dailyExercisesService.useDailyExercisesLogic.mockReturnValue(mockUseDailyExercisesLogic);
    dailyExercisesService.useBreathingLogic.mockReturnValue(mockUseBreathingLogic);
    dailyExercisesService.useGratitudeLogic.mockReturnValue(mockUseGratitudeLogic);
    dailyExercisesService.useGroundingLogic.mockReturnValue(mockUseGroundingLogic);
    dailyExercisesService.useSelfCompassionLogic.mockReturnValue(mockUseSelfCompassionLogic);
    dailyExercisesService.useTriggerLogic.mockReturnValue(mockUseTriggerLogic);
    dailyExercisesService.useMindfulnessLogic.mockReturnValue(mockUseMindfulnessLogic);
  });

  // Test: Verify that the initial exercise list renders correctly
  test('renders the initial exercise list', () => {
    render(<DailyExercises />);

    expect(screen.getByText('Sidebar')).toBeInTheDocument();
    expect(screen.getByText('Your Daily Wellness Boost')).toBeInTheDocument();
    expect(screen.getByText('Box Breathing')).toBeInTheDocument();
    expect(screen.getByText('Gratitude Journal')).toBeInTheDocument();
    expect(screen.getByText('5-4-3-2-1 Grounding')).toBeInTheDocument();
    expect(screen.getByText('Self-Compassion Exercise')).toBeInTheDocument();
  });

  // Test:Verify that the Box Breathing exercise renders when selected
  test('renders breathing exercise when selected', () => {
    dailyExercisesService.useDailyExercisesLogic.mockReturnValue({
      ...mockUseDailyExercisesLogic,
      selectedExercise: 'breathing',
    });

    render(<DailyExercises />);

    expect(screen.getByText('Box Breathing')).toBeInTheDocument();
    expect(screen.getByText('Start')).toBeInTheDocument();
    expect(screen.getByText('60s')).toBeInTheDocument();
  });

  // Test: Verify that clicking the Start button in Box Breathing triggers the exercise
  test('starts breathing exercise when Start button is clicked', () => {
    dailyExercisesService.useDailyExercisesLogic.mockReturnValue({
      ...mockUseDailyExercisesLogic,
      selectedExercise: 'breathing',
    });

    render(<DailyExercises />);

    const startButton = screen.getByText('Start');
    fireEvent.click(startButton);

    expect(mockUseBreathingLogic.startBreathingExercise).toHaveBeenCalled();
  });

  // Test : Verify that the Gratitude Journal renders when selected
  test('renders gratitude journal when selected', () => {
    dailyExercisesService.useDailyExercisesLogic.mockReturnValue({
      ...mockUseDailyExercisesLogic,
      selectedExercise: 'gratitude',
    });

    render(<DailyExercises />);

    expect(screen.getByText('Gratitude Journal')).toBeInTheDocument();
    expect(screen.getByText('Write 3 things you are grateful for:')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('What are you grateful for?')).toBeInTheDocument();
  });

  // Test:Verify that the Mindfulness Timer renders when selected
  test('renders mindfulness timer when selected', () => {
    dailyExercisesService.useDailyExercisesLogic.mockReturnValue({
      ...mockUseDailyExercisesLogic,
      selectedExercise: 'mindfulness',
    });

    render(<DailyExercises />);

    expect(screen.getByText('Mindfulness Timer')).toBeInTheDocument();
    expect(screen.getByText('300s')).toBeInTheDocument();
    expect(screen.getByLabelText('Toggle background music')).toBeInTheDocument();
  });

  // Test: Verify that the Back button navigates back to the exercise list
  test('goes back to exercise list', () => {
    dailyExercisesService.useDailyExercisesLogic.mockReturnValue({
      ...mockUseDailyExercisesLogic,
      selectedExercise: 'breathing',
    });

    render(<DailyExercises />);

    const backButton = screen.getByText('Back');
    fireEvent.click(backButton);

    expect(mockUseDailyExercisesLogic.goBack).toHaveBeenCalled();
  });
});