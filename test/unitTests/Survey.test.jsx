import { describe, expect, test, vi } from 'vitest';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import Survey from '../../src/pages/Survey'; // Adjust the import path as needed
import { account } from '../../src/appwrite';
import * as surveyService from '../../src/services/surveyService';

// Mock the surveyService module
vi.mock('../../src/services/surveyService', () => ({
  questions: [
    { id: 1, text: 'How happy do you feel today? (1 = Not happy at all, 10 = Extremely happy)' },
    { id: 2, text: 'How overwhelmed do you feel today? (1 = Extremely overwhelmed, 10 = Not at all)' },
    { id: 3, text: 'How motivated do you feel to complete your daily tasks? (1 = No motivation, 10 = Highly motivated)' },
    { id: 4, text: 'How supported do you feel emotionally? (1 = Not at all, 10 = Very supported)' },
    { id: 5, text: 'How much time have you spent on activities that bring you joy today? (1 = None, 10 = A Lot)' },
    { id: 6, text: 'How well do you feel you are managing stress today? (1 = Not well at all, 10 = Very well)' },
    { id: 7, text: 'How hopeful do you feel about tomorrow? (1 = Not hopeful, 10 = Very hopeful)' },
  ],
  fetchSurveyResponse: vi.fn(),
  fetchMostRecentWellnessIndex: vi.fn(),
  handleNext: vi.fn(),
  handleBack: vi.fn(),
  handleNumberClick: vi.fn(),
}));

// Mock the appwrite account module
vi.mock('../../src/appwrite', () => ({
  account: {
    get: vi.fn(),
  },
}));

// Mock the useNavigate hook
const mockNavigate = vi.fn();
vi.mock('react-router-dom', () => ({
  useNavigate: () => mockNavigate,
}));

// Mock the Sidebar component
vi.mock('../../src/components/Sidebar.jsx', () => ({
  default: () => <div>Sidebar</div>,
}));

describe('Survey Component', () => {
  beforeEach(async () => {
    // Reset mocks before each test
    vi.clearAllMocks();
    account.get.mockResolvedValue({ $id: 'testUserId' });
    surveyService.fetchSurveyResponse.mockResolvedValue(null); // No prior survey response
    surveyService.fetchMostRecentWellnessIndex.mockResolvedValue(null);
  });

  test('renders the intro page initially', async () => {
    await act(async () => {
      render(<Survey />);
    });

    await waitFor(() => {
      expect(screen.getByText('Check in with yourself!')).toBeInTheDocument();
      expect(screen.getByText(/Rate how you’re feeling on a scale of 1 to 10/)).toBeInTheDocument();
      expect(screen.getByText('Next')).toBeInTheDocument();
      expect(screen.getByText('😄')).toBeInTheDocument();
      expect(screen.getByText('😭')).toBeInTheDocument();
    });
  });

  test('navigates to login if user is not logged in', async () => {
    // Suppress console.error for this test
    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    account.get.mockRejectedValue(new Error('Not logged in'));

    await act(async () => {
      render(<Survey />);
    });

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/login');
    });

    // Restore console.error after the test
    consoleErrorSpy.mockRestore();
  });

  test('renders the completion page with wellness index (low score)', async () => {
    surveyService.fetchSurveyResponse.mockResolvedValue({ userID: 'testUserId' });
    surveyService.fetchMostRecentWellnessIndex.mockResolvedValue(4.5);

    await act(async () => {
      render(<Survey />);
    });

    await waitFor(() => {
      expect(screen.getByText('Daily Check-In Completed!')).toBeInTheDocument();
      expect(screen.getByText(/Your average score is 4.50 today 😔/)).toBeInTheDocument();
      expect(screen.getByText('Go to Dashboard')).toBeInTheDocument();
    });
  });

  test('renders the completion page with wellness index (medium score)', async () => {
    surveyService.fetchSurveyResponse.mockResolvedValue({ userID: 'testUserId' });
    surveyService.fetchMostRecentWellnessIndex.mockResolvedValue(6.5);

    await act(async () => {
      render(<Survey />);
    });

    await waitFor(() => {
      expect(screen.getByText('Daily Check-In Completed!')).toBeInTheDocument();
      expect(screen.getByText(/Your average score is 6.50 today 🙂/)).toBeInTheDocument();
      expect(screen.getByText('Go to Dashboard')).toBeInTheDocument();
    });
  });

  test('renders the completion page with wellness index (high score)', async () => {
    surveyService.fetchSurveyResponse.mockResolvedValue({ userID: 'testUserId' });
    surveyService.fetchMostRecentWellnessIndex.mockResolvedValue(8.5);

    await act(async () => {
      render(<Survey />);
    });

    await waitFor(() => {
      expect(screen.getByText('Daily Check-In Completed!')).toBeInTheDocument();
      expect(screen.getByText(/Your average score is 8.50 today 😊/)).toBeInTheDocument();
      expect(screen.getByText('Go to Dashboard')).toBeInTheDocument();
    });
  });

  test('navigates to dashboard when Go to Dashboard is clicked', async () => {
    surveyService.fetchSurveyResponse.mockResolvedValue({ userID: 'testUserId' });
    surveyService.fetchMostRecentWellnessIndex.mockResolvedValue(4.5);

    await act(async () => {
      render(<Survey />);
    });

    await waitFor(() => {
      fireEvent.click(screen.getByText('Go to Dashboard'));
      expect(mockNavigate).toHaveBeenCalledWith('/dashboard');
    });
  });
});