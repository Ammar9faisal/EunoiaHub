import { describe, expect, test, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import Achievements from '../../src/pages/Achievements';

// ✅ Mock Sidebar to isolate the test
vi.mock('../../src/components/Sidebar.jsx', () => ({
  default: () => <div>Sidebar</div>,
}));

describe('Achievements Page', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('renders sidebar component', () => {
    render(<Achievements />);
    expect(screen.getByText('Sidebar')).toBeInTheDocument();
  });

  test('displays the main achievements title', () => {
    render(<Achievements />);
    expect(screen.getByRole('heading', { name: /achievements/i })).toBeInTheDocument();
  });

  test('renders static progress or badge section', () => {
    render(<Achievements />);
    expect(screen.getByText(/progress/i)).toBeInTheDocument(); // Could be "Progress", "Your Progress", etc.
  });

  test('includes a description or subtitle if present', () => {
    render(<Achievements />);
    // Assumes there is a line like: <p>Track your growth and unlock badges!</p>
    expect(screen.getByText(/track your growth/i)).toBeInTheDocument();
  });

  test('renders at least one badge or visual element', () => {
    render(<Achievements />);
    // Assumes a badge container or a sample badge is always shown
    expect(screen.getByText(/badge/i)).toBeInTheDocument();
  });

  test('does not show error messages or crashes', () => {
    render(<Achievements />);
    expect(screen.queryByText(/error/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/failed/i)).not.toBeInTheDocument();
  });
});