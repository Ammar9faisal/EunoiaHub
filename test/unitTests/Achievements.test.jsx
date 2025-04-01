import { describe, expect, test, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import Achievements from '../../src/pages/Achievements';
import { MemoryRouter } from 'react-router-dom';

// ✅ Mock Sidebar to isolate the test
vi.mock('../../src/components/Sidebar.jsx', () => ({
  default: () => <div>Sidebar</div>,
}));

describe('Achievements Page', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('renders sidebar component', () => {
    render(
      <MemoryRouter>
        <Achievements />
      </MemoryRouter>
    );
    expect(screen.getByText('Sidebar')).toBeInTheDocument();
  });

  test('displays the main achievements title', () => {
    render(<MemoryRouter>
      <Achievements />
    </MemoryRouter>);
    expect(screen.getByText("My Achievements")).toBeInTheDocument();
  });

  test('renders the review badge', () => {
    render(<MemoryRouter>
      <Achievements />
    </MemoryRouter>);
    expect(screen.getByText("Submit your first review")).toBeInTheDocument(); // Could be "Progress", "Your Progress", etc.
  });

  test('render visionboard badge', () => {
    render(<MemoryRouter>
      <Achievements />
    </MemoryRouter>);
    expect(screen.getByText("Add your first goal to the Vision Board")).toBeInTheDocument();
  });

  test('render daily exercises badge', () => {
    render(<MemoryRouter>
      <Achievements />
    </MemoryRouter>);
    // Assumes a badge container or a sample badge is always shown
    expect(screen.getByText("Explore the Daily Exercises")).toBeInTheDocument();
  });

  test('does not show error messages or crashes', () => {
    render(<MemoryRouter>
      <Achievements />
    </MemoryRouter>);
    expect(screen.queryByText(/error/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/failed/i)).not.toBeInTheDocument();
  });
});