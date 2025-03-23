import { describe, expect, test, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useNavigate } from 'react-router-dom';
import { useLoadScript } from '@react-google-maps/api';
import FindHelp from '../../src/pages/FindHelp.jsx';
import * as FindHelpServices from '../../src/services/FindHelpServices';
import Sidebar from '../../src/components/Sidebar.jsx';

// Mock dependencies to isolate component behavior
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
  const mockNavigate = vi.fn();
  const mockHandleSearch = vi.fn();
  const mockHandleKeyPress = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    useNavigate.mockReturnValue(mockNavigate);
    FindHelpServices.handleSearch.mockImplementation(mockHandleSearch);
    FindHelpServices.handleKeyPress.mockImplementation(mockHandleKeyPress);
    useLoadScript.mockReturnValue({ isLoaded: true, loadError: null });
  });

  test('renders FindHelp component with sidebar and initial UI elements', () => {
    render(<FindHelp />);

    expect(screen.getByText('Sidebar')).toBeInTheDocument();
    expect(screen.getByText('Find Help Near You')).toBeInTheDocument();
    expect(screen.getByText('Enter your Canadian postal code to find nearby therapists and support resources.')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter postal code (e.g., M5V 2T6)')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Search' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Back to Dashboard' })).toBeInTheDocument();
  });

  test('disables input and search button when Google Maps API is not loaded', () => {
    useLoadScript.mockReturnValue({ isLoaded: false, loadError: null });

    render(<FindHelp />);

    const input = screen.getByPlaceholderText('Enter postal code (e.g., M5V 2T6)');
    const searchButton = screen.getByRole('button', { name: 'Search' });

    expect(input).toBeDisabled();
    expect(searchButton).toBeDisabled();
  });

  test('disables input and search button when loading', () => {
    render(<FindHelp />);

    const searchButton = screen.getByRole('button', { name: 'Search' });

    // Simulate loading state during search
    mockHandleSearch.mockImplementation((_, __, ___, setLoading) => {
      setLoading(true);
    });

    fireEvent.click(searchButton);

    const input = screen.getByPlaceholderText('Enter postal code (e.g., M5V 2T6)');
    expect(input).toBeDisabled();
    expect(screen.getByRole('button', { name: 'Searching...' })).toBeDisabled();
  });

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

  test('calls handleKeyPress when Enter key is pressed in the input', () => {
    render(<FindHelp />);

    const input = screen.getByPlaceholderText('Enter postal code (e.g., M5V 2T6)');
    fireEvent.keyPress(input, { key: 'Enter', code: 'Enter', charCode: 13 });

    expect(mockHandleKeyPress).toHaveBeenCalledWith(expect.anything(), expect.any(Function));
  });

  test('converts postal code input to uppercase', async () => {
    render(<FindHelp />);

    const input = screen.getByPlaceholderText('Enter postal code (e.g., M5V 2T6)');
    await userEvent.type(input, 'm5v 2t6');

    expect(input).toHaveValue('M5V 2T6');
  });

  test('displays error message when loadError is present', () => {
    useLoadScript.mockReturnValue({ isLoaded: true, loadError: { message: 'API load failed' } });

    render(<FindHelp />);

    expect(screen.getByText('API load failed')).toBeInTheDocument();
  });

  test('displays error message from handleSearch', () => {
    render(<FindHelp />);

    const searchButton = screen.getByRole('button', { name: 'Search' });

    mockHandleSearch.mockImplementation((_, setError) => {
      setError('Invalid postal code');
    });

    fireEvent.click(searchButton);

    expect(screen.getByText('Invalid postal code')).toBeInTheDocument();
  });

  test('displays resources when search returns results', () => {
    render(<FindHelp />);

    const searchButton = screen.getByRole('button', { name: 'Search' });
    const mockResources = [
      { id: 1, name: 'Therapist A', type: 'Therapist', address: '123 Wellness St', distance: '2 km' },
    ];

    // Simulate search returning resources
    mockHandleSearch.mockImplementation((_, __, setResources, setLoading) => {
      setResources(mockResources);
      setLoading(false);
    });

    fireEvent.click(searchButton);

    expect(screen.getByText('Resources Near')).toBeInTheDocument();
    expect(screen.getByText('Therapist A')).toBeInTheDocument();
    expect(screen.getByText('Type: Therapist')).toBeInTheDocument();
    expect(screen.getByText('Address: 123 Wellness St')).toBeInTheDocument();
    expect(screen.getByText('Distance: 2 km')).toBeInTheDocument();
  });

  test('navigates to dashboard when back button is clicked', () => {
    render(<FindHelp />);

    const backButton = screen.getByRole('button', { name: 'Back to Dashboard' });
    fireEvent.click(backButton);

    expect(mockNavigate).toHaveBeenCalledWith('/dashboard');
  });
});