import '@testing-library/jest-dom';
import { describe, test, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import Achievements from '../../src/pages/Achievements';
import { account } from '../../src/appwrite';
import { fetchSurveyResponse } from '../../src/services/surveyService';
import { MemoryRouter } from 'react-router-dom';

const mockNavigate = vi.fn();

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

vi.mock('../../src/components/Sidebar.jsx', () => ({
  default: () => <div>Sidebar</div>,
}));

vi.mock('../../src/appwrite', () => ({
  account: {
    get: vi.fn(),
  },
}));

vi.mock('../../src/services/surveyService', () => ({
  fetchSurveyResponse: vi.fn(),
}));

vi.mock('../../src/database', () => ({
  default: {
    visionboard: {
      list: vi.fn(),
    },
  },
}));

describe('Achievements Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('renders locked badges when user has no achievements', async () => {
    account.get.mockResolvedValue({ $id: 'user123' });
    fetchSurveyResponse.mockResolvedValue(null);
    const { default: db } = await import('../../src/database');
    db.visionboard.list.mockResolvedValue({ documents: [] });

    render(
      <MemoryRouter>
        <Achievements />
      </MemoryRouter>
    );

    expect(await screen.findByText('My Achievements')).toBeInTheDocument();
    expect(screen.getByText('Complete the daily check-in 1 time').closest('.badge')).toHaveClass('locked');
    expect(screen.getByText('Add your first goal to the Vision Board').closest('.badge')).toHaveClass('locked');
  });

  test('renders unlocked badges when achievements are present', async () => {
    account.get.mockResolvedValue({ $id: 'user123' });
    fetchSurveyResponse.mockResolvedValue({ userID: 'user123' });
    const { default: db } = await import('../../src/database');
    db.visionboard.list.mockResolvedValue({ documents: [{ id: 'goal1' }] });

    render(
      <MemoryRouter>
        <Achievements />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Complete the daily check-in 1 time').closest('.badge')).toHaveClass('unlocked');
      expect(screen.getByText('Add your first goal to the Vision Board').closest('.badge')).toHaveClass('unlocked');
    });
  });

  test('navigates to home on error', async () => {
    account.get.mockRejectedValue(new Error('User not logged in'));

    render(
      <MemoryRouter>
        <Achievements />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/');
    });
  });
});