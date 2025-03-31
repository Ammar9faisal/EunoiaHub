import { describe, expect, test, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import {
  useDailyExercisesLogic,
  useBreathingLogic,
  exercises,
  exerciseConfig,
} from '../../src/services/dailyExercisesService';

// Mock useRef to simulate audio element behavior for Mindfulness Timer tests
vi.mock('react', async () => {
  const actual = await vi.importActual('react');
  return {
    ...actual,
    useRef: () => ({
      current: {
        play: vi.fn(),
        pause: vi.fn(),
        currentTime: 0,
      },
    }),
  };
});

describe('dailyExercisesService', () => {
  // Test: Verify that the exercises array contains the correct data
  describe('Exported Data', () => {
    test('exercises array contains correct data', () => {
      expect(exercises).toHaveLength(6);
      expect(exercises[0]).toEqual({
        id: 'breathing',
        title: 'Box Breathing',
        description: expect.stringContaining('Follow the circle to inhale'),
        duration: 60,
        cycle: 12,
        icon: expect.any(Object),
        iconClass: 'de-exercise-icon',
        theme: 'calm',
        type: 'breathing',
        image: expect.anything(),
      });
    });

    // Test: Verify that the exerciseConfig contains the correct initial state data
    test('exerciseConfig contains correct data', () => {
      expect(exerciseConfig.breathing.initialState.timeLeft(exercises[0])).toBe(60);
      expect(exerciseConfig.gratitude.initialState.entries).toEqual([]);
      expect(exerciseConfig.mindfulness.initialState.playMusic).toBe(true);
    });
  });

  // Test: Verify the initial state and exercise selection in useDailyExercisesLogic hook
  describe('useDailyExercisesLogic', () => {
    test('initial state is correct and startExercise works', () => {
      const { result } = renderHook(() => useDailyExercisesLogic());

      // Check initial state
      expect(result.current.selectedExercise).toBeNull();
      expect(result.current.audioRef.current).toBeDefined();
      expect(result.current.upliftingAudio).toBeDefined();

      // Test starting an exercise
      act(() => {
        result.current.startExercise(exercises[0]);
      });

      expect(result.current.selectedExercise).toBe('breathing');
    });
  });

  // Test: Verify the initial state and timer functionality in useBreathingLogic hook
  describe('useBreathingLogic', () => {
    test('initial state is correct and timer decreases timeLeft', () => {
      vi.useFakeTimers();
      const { result } = renderHook(() => useBreathingLogic(exercises[0]));

      // Check initial state
      expect(result.current.timeLeft).toBe(60);
      expect(result.current.phase).toBe('inhale');
      expect(result.current.paused).toBe(false);
      expect(result.current.breathingStarted).toBe(false);

      // Start the breathing exercise
      act(() => {
        result.current.startBreathingExercise();
      });

      expect(result.current.breathingStarted).toBe(true);
      expect(result.current.timeLeft).toBe(60);

      // Simulate timer running for 1 second
      act(() => {
        vi.advanceTimersByTime(1000);
      });

      expect(result.current.timeLeft).toBe(59);

      vi.useRealTimers();
    });
  });
});