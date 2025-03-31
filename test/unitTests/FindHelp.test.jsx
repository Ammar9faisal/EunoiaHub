////TO RUN THIS TEST CLASS, YOU NEED TO HAVE VALID API KEY FOR FindHelp CLASSES(.jsx. .js). IN PLACE OF KEY IN FindHelp CLASS PUT THE API AND THEN RUN THE TEST CLASS


import { describe, expect, test, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useNavigate } from 'react-router-dom';
import { useLoadScript } from '@react-google-maps/api';
import FindHelp from '../../src/pages/FindHelp.jsx';
import * as FindHelpServices from '../../src/services/FindHelpServices';
import Sidebar from '../../src/components/Sidebar.jsx';

// Mock dependencies 
vi.mock('react-router-dom', () => ({
  useNavigate: vi.fn(),
}));
vi.mock('@react-google-maps/api', () => ({
  useLoadScript: vi.fn(),
}));
vi.mock('../../src/components/Sidebar.jsx', () => ({
  default: () => <div>Sidebar</div>,
}));
vi.mock('../../src/services/FindHelpServices', () => ({
  handleSearch: vi.fn(),
  handleKeyPress: vi.fn(),
}));

describe('FindHelp Component', () => {
  // Mock functions for navigation and service interactions
  const mockNavigate = vi.fn();
  const mockHandleSearch = vi.fn();
  const mockHandleKeyPress = vi.fn();

  beforeEach(() => {
    // Reset all mocks before each test 
    vi.clearAllMocks();
    useNavigate.mockReturnValue(mockNavigate);
    FindHelpServices.handleSearch.mockImplementation(mockHandleSearch);
    FindHelpServices.handleKeyPress.mockImplementation(mockHandleKeyPress);
    // Default to API loaded state
    useLoadScript.mockReturnValue({ isLoaded: true, loadError: null });
  });

  // Test: Verify that the component renders correctly with initial UI elements
  test('renders FindHelp component with sidebar and initial UI elements', () => {
    render(<FindHelp />);

    expect(screen.getByText('Sidebar')).toBeInTheDocument();
    expect(screen.getByText('Find Help Near You')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter postal code (e.g., M5V 2T6)')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Search' })).toBeInTheDocument();
  });

  // Test Ensure the input and search button are disabled when the API is not loaded (e.g., missing API key)
  test('disables input and search button when Google Maps API is not loaded', () => {
    // Simulate API not loaded due to missing API key
    useLoadScript.mockReturnValue({ isLoaded: false, loadError: null });

    render(<FindHelp />);

    const input = screen.getByPlaceholderText('Enter postal code (e.g., M5V 2T6)');
    const searchButton = screen.getByRole('button', { name: 'Search' });

    expect(input).toBeDisabled();
    expect(searchButton).toBeDisabled();
  });

  // Test: Verify that clicking the search button calls handleSearch with the correct postal code
  test('calls handleSearch with correct postal code when search button is clicked', async () => {
    render(<FindHelp />);

    const input = screen.getByPlaceholderText('Enter postal code (e.g., M5V 2T6)');
    const searchButton = screen.getByRole('button', { name: 'Search' });

    await userEvent.type(input, 'M5V 2T6');
    fireEvent.click(searchButton);

    expect(mockHandleSearch).toHaveBeenCalledWith(
      'M5V 2T6',
      expect.any(Function),
      expect.any(Function),
      expect.any(Function),
      true,
      null
    );
  });

  // Test: Verify that clicking the Back button navigates to the dashboard
  test('navigates to dashboard when back button is clicked', () => {
    render(<FindHelp />);

    const backButton = screen.getByRole('button', { name: 'Back to Dashboard' });
    fireEvent.click(backButton);

    expect(mockNavigate).toHaveBeenCalledWith('/dashboard');
  });
});