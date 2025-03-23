import { describe, expect, test, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import DailyExercises from '../../src/pages/DailyExercises';
import * as dailyExercisesService from '../../src/services/dailyExercisesService';

// Mock the Sidebar component to simplify rendering
vi.mock('../../src/components/Sidebar.jsx', () => ({
  default: () => <div>Sidebar</div>,
}));

// Mock useDailyExercisesLogic while preserving other exports
vi.mock('../../src/services/dailyExercisesService', async () => {
  const actual = await vi.importActual('../../src/services/dailyExercisesService');
  return {
    ...actual,
    useDailyExercisesLogic: vi.fn(),
  };
});

describe('DailyExercises Component', () => {
  const mockUseDailyExercisesLogic = {
    selectedExercise: null,
    timeLeft: 0,
    phase: '',
    paused: false,
    breathingStarted: false,
    gratitudeEntries: [],
    gratitudeInput: '',
    setGratitudeInput: vi.fn(),
    groundingAnswers: { see: [], touch: [], hear: [], smell: [], taste: [] },
    groundingStep: 'see',
    currentGroundingInput: '',
    setCurrentGroundingInput: vi.fn(),
    selfCompassionAnswers: {},
    selfCompassionStep: 0,
    currentSelfCompassionInput: '',
    setCurrentSelfCompassionInput: vi.fn(),
    triggers: [],
    mindfulnessStarted: false,
    playMusic: true,
    setPlayMusic: vi.fn(),
    audioRef: { current: null },
    startExercise: vi.fn(),
    goBack: vi.fn(),
    pauseExercise: vi.fn(),
    startBreathingExercise: vi.fn(),
    startMindfulnessTimer: vi.fn(),
    handleGratitudeSubmit: vi.fn(),
    handleGroundingSubmit: vi.fn(),
    handleGroundingDelete: vi.fn(),
    handleSelfCompassionSubmit: vi.fn(),
    handleTriggerSelect: vi.fn(),
    upliftingAudio: 'mock-audio.mp3',
  };

  beforeEach(() => {
    vi.clearAllMocks();
    dailyExercisesService.useDailyExercisesLogic.mockReturnValue(mockUseDailyExercisesLogic);
  });

  test('renders the initial exercise list', () => {
    render(<DailyExercises />);

    expect(screen.getByText('Sidebar')).toBeInTheDocument();
    expect(screen.getByText('Your Daily Wellness Boost')).toBeInTheDocument();
    expect(screen.getByText('Box Breathing')).toBeInTheDocument();
    expect(screen.getByText('Gratitude Journal')).toBeInTheDocument();
    expect(screen.getByText('5-4-3-2-1 Grounding')).toBeInTheDocument();
    expect(screen.getByText('Self-Compassion Exercise')).toBeInTheDocument();
    expect(screen.getByText('Trigger Identification')).toBeInTheDocument();
    expect(screen.getByText('Mindfulness Timer')).toBeInTheDocument();
  });

  test('starts an exercise when Start button is clicked', () => {
    render(<DailyExercises />);

    // First Start button is for Box Breathing
    const startButton = screen.getAllByText('Start')[0];
    fireEvent.click(startButton);

    expect(mockUseDailyExercisesLogic.startExercise).toHaveBeenCalledWith(
      expect.objectContaining({ id: 'breathing' })
    );
  });

  test('renders breathing exercise when selected', () => {
    dailyExercisesService.useDailyExercisesLogic.mockReturnValue({
      ...mockUseDailyExercisesLogic,
      selectedExercise: 'breathing',
      timeLeft: 60,
    });

    render(<DailyExercises />);

    expect(screen.getByText('Box Breathing')).toBeInTheDocument();
    expect(screen.getByText('Start')).toBeInTheDocument();
    expect(screen.getByText('60s')).toBeInTheDocument();
  });

  test('starts breathing exercise when Start button is clicked', () => {
    dailyExercisesService.useDailyExercisesLogic.mockReturnValue({
      ...mockUseDailyExercisesLogic,
      selectedExercise: 'breathing',
      timeLeft: 60,
    });

    render(<DailyExercises />);

    const startButton = screen.getByText('Start');
    fireEvent.click(startButton);

    expect(mockUseDailyExercisesLogic.startBreathingExercise).toHaveBeenCalled();
  });

  test('pauses breathing exercise when Pause button is clicked', () => {
    dailyExercisesService.useDailyExercisesLogic.mockReturnValue({
      ...mockUseDailyExercisesLogic,
      selectedExercise: 'breathing',
      timeLeft: 60,
      breathingStarted: true,
      paused: false,
    });

    render(<DailyExercises />);

    const pauseButton = screen.getByText('Pause');
    fireEvent.click(pauseButton);

    expect(mockUseDailyExercisesLogic.pauseExercise).toHaveBeenCalled();
  });

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

  test('submits gratitude entry', () => {
    dailyExercisesService.useDailyExercisesLogic.mockReturnValue({
      ...mockUseDailyExercisesLogic,
      selectedExercise: 'gratitude',
    });

    render(<DailyExercises />);

    const input = screen.getByPlaceholderText('What are you grateful for?');
    fireEvent.change(input, { target: { value: 'My family' } });
    expect(mockUseDailyExercisesLogic.setGratitudeInput).toHaveBeenCalledWith('My family');

    const form = input.closest('form');
    fireEvent.submit(form);

    expect(mockUseDailyExercisesLogic.handleGratitudeSubmit).toHaveBeenCalled();
  });

  test('displays gratitude entries when completed', () => {
    dailyExercisesService.useDailyExercisesLogic.mockReturnValue({
      ...mockUseDailyExercisesLogic,
      selectedExercise: 'gratitude',
      gratitudeEntries: ['My family', 'My friends', 'Good health'],
    });

    render(<DailyExercises />);

    expect(screen.getByText('Great job! You’ve added 3 entries.')).toBeInTheDocument();
    expect(screen.getByText('My family')).toBeInTheDocument();
    expect(screen.getByText('My friends')).toBeInTheDocument();
    expect(screen.getByText('Good health')).toBeInTheDocument();
  });

  test('renders grounding exercise when selected', () => {
    dailyExercisesService.useDailyExercisesLogic.mockReturnValue({
      ...mockUseDailyExercisesLogic,
      selectedExercise: 'grounding',
      groundingStep: 'see',
    });

    render(<DailyExercises />);

    expect(screen.getByText('5-4-3-2-1 Grounding')).toBeInTheDocument();
    expect(screen.getByText('Name 5 more thing(s) you can see:')).toBeInTheDocument();
  });

  test('submits grounding answer', () => {
    dailyExercisesService.useDailyExercisesLogic.mockReturnValue({
      ...mockUseDailyExercisesLogic,
      selectedExercise: 'grounding',
      groundingStep: 'see',
    });

    render(<DailyExercises />);

    const input = screen.getByPlaceholderText('Enter a see item');
    fireEvent.change(input, { target: { value: 'A tree' } });
    expect(mockUseDailyExercisesLogic.setCurrentGroundingInput).toHaveBeenCalledWith('A tree');

    const form = input.closest('form');
    fireEvent.submit(form);

    expect(mockUseDailyExercisesLogic.handleGroundingSubmit).toHaveBeenCalled();
  });

  test('displays grounding answers and deletes an answer', () => {
    dailyExercisesService.useDailyExercisesLogic.mockReturnValue({
      ...mockUseDailyExercisesLogic,
      selectedExercise: 'grounding',
      groundingStep: 'see',
      groundingAnswers: { see: ['A tree'], touch: [], hear: [], smell: [], taste: [] },
    });

    render(<DailyExercises />);

    expect(screen.getByText('See:')).toBeInTheDocument();
    expect(screen.getByText('A tree')).toBeInTheDocument();

    const deleteButton = screen.getByText('Delete');
    fireEvent.click(deleteButton);

    expect(mockUseDailyExercisesLogic.handleGroundingDelete).toHaveBeenCalledWith('see', 0);
  });

  test('renders self-compassion exercise when selected', () => {
    dailyExercisesService.useDailyExercisesLogic.mockReturnValue({
      ...mockUseDailyExercisesLogic,
      selectedExercise: 'self-compassion',
      selfCompassionStep: 0,
    });

    render(<DailyExercises />);

    expect(screen.getByText('Self-Compassion Exercise')).toBeInTheDocument();
    expect(screen.getByText('I am proud of myself because...')).toBeInTheDocument();
  });

  test('submits self-compassion answer', () => {
    dailyExercisesService.useDailyExercisesLogic.mockReturnValue({
      ...mockUseDailyExercisesLogic,
      selectedExercise: 'self-compassion',
      selfCompassionStep: 0,
    });

    render(<DailyExercises />);

    const input = screen.getByPlaceholderText('Type your response');
    fireEvent.change(input, { target: { value: 'I worked hard today' } });
    expect(mockUseDailyExercisesLogic.setCurrentSelfCompassionInput).toHaveBeenCalledWith('I worked hard today');

    const form = input.closest('form');
    fireEvent.submit(form);

    expect(mockUseDailyExercisesLogic.handleSelfCompassionSubmit).toHaveBeenCalled();
  });

  test('renders trigger identification exercise when selected', () => {
    dailyExercisesService.useDailyExercisesLogic.mockReturnValue({
      ...mockUseDailyExercisesLogic,
      selectedExercise: 'trigger',
    });

    render(<DailyExercises />);

    expect(screen.getByText('Trigger Identification')).toBeInTheDocument();
    expect(screen.getByText('Select scenarios that trigger you:')).toBeInTheDocument();
    expect(screen.getByText('Feeling stressed at work')).toBeInTheDocument();
  });

  test('selects a trigger', () => {
    dailyExercisesService.useDailyExercisesLogic.mockReturnValue({
      ...mockUseDailyExercisesLogic,
      selectedExercise: 'trigger',
    });

    render(<DailyExercises />);

    const triggerButton = screen.getByText('Feeling stressed at work');
    fireEvent.click(triggerButton);

    expect(mockUseDailyExercisesLogic.handleTriggerSelect).toHaveBeenCalledWith('stress');
  });

  test('renders mindfulness timer when selected', () => {
    dailyExercisesService.useDailyExercisesLogic.mockReturnValue({
      ...mockUseDailyExercisesLogic,
      selectedExercise: 'mindfulness',
      timeLeft: 300,
    });

    render(<DailyExercises />);

    expect(screen.getByText('Mindfulness Timer')).toBeInTheDocument();
    expect(screen.getByText('300s')).toBeInTheDocument();
    expect(screen.getByLabelText('Toggle background music')).toBeInTheDocument();
  });

  test('starts mindfulness timer', () => {
    dailyExercisesService.useDailyExercisesLogic.mockReturnValue({
      ...mockUseDailyExercisesLogic,
      selectedExercise: 'mindfulness',
      timeLeft: 300,
    });

    render(<DailyExercises />);

    const startButton = screen.getByText('Start');
    fireEvent.click(startButton);

    expect(mockUseDailyExercisesLogic.startMindfulnessTimer).toHaveBeenCalled();
  });

  test('toggles background music', () => {
    dailyExercisesService.useDailyExercisesLogic.mockReturnValue({
      ...mockUseDailyExercisesLogic,
      selectedExercise: 'mindfulness',
      timeLeft: 300,
    });

    render(<DailyExercises />);

    const checkbox = screen.getByLabelText('Toggle background music');
    fireEvent.click(checkbox);

    expect(mockUseDailyExercisesLogic.setPlayMusic).toHaveBeenCalledWith(false);
  });

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