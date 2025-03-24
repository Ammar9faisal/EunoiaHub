import { describe, expect, test, vi, beforeEach } from 'vitest';
import { handleSearch, handleKeyPress } from '../../src/services/FindHelpServices';

// Mock fetch globally to simulate API calls
vi.stubGlobal('fetch', vi.fn());

describe('FindHelpServices', () => {
  const mockSetError = vi.fn();
  const mockSetResources = vi.fn();
  const mockSetLoading = vi.fn();
  const mockHandleSearch = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    mockSetError.mockClear();
    mockSetResources.mockClear();
    mockSetLoading.mockClear();
    fetch.mockClear();
    // Mock Google Maps Geocoder for geocoding postal codes
    vi.stubGlobal('google', {
      maps: {
        Geocoder: vi.fn(() => ({
          geocode: vi.fn((request, callback) => {
            callback(
              [{ geometry: { location: { lat: () => 43.6532, lng: () => -79.3832 } } }],
              'OK'
            );
          }),
        })),
      },
    });
  });

  describe('handleSearch', () => {
    test('sets error for invalid postal code format', async () => {
      const postalCode = '12345';
      await handleSearch(postalCode, mockSetError, mockSetResources, mockSetLoading, true, null);
      expect(mockSetError).toHaveBeenCalledWith('Please enter a valid Canadian postal code (e.g., M5V 2T6).');
      expect(mockSetLoading).toHaveBeenCalledWith(false);
      expect(mockSetResources).toHaveBeenCalledWith([]);
    });

    test('sets error when Google Maps API is not loaded', async () => {
      const postalCode = 'M5V2T6';
      await handleSearch(postalCode, mockSetError, mockSetResources, mockSetLoading, false, null);
      expect(mockSetError).toHaveBeenCalledWith('Google Maps API not loaded yet. Please try again.');
      expect(mockSetLoading).toHaveBeenCalledWith(false);
      expect(mockSetResources).toHaveBeenCalledWith([]);
    });

    test('sets error when geocoding fails', async () => {
      const postalCode = 'M5V2T6';
      // Override Geocoder to simulate failure
      vi.stubGlobal('google', {
        maps: {
          Geocoder: vi.fn(() => ({
            geocode: vi.fn((request, callback) => {
              callback([], 'ERROR');
            }),
          })),
        },
      });
      await handleSearch(postalCode, mockSetError, mockSetResources, mockSetLoading, true, null);
      expect(mockSetError).toHaveBeenCalledWith('Geocoding failed: ERROR');
      expect(mockSetLoading).toHaveBeenCalledWith(false);
      expect(mockSetResources).toHaveBeenCalledWith([]);
    });

    test('sets error when no places are found', async () => {
      const postalCode = 'M5V2T6';
      fetch.mockResolvedValueOnce({
        status: 200,
        json: vi.fn().mockResolvedValue({ places: [] }),
      });
      await handleSearch(postalCode, mockSetError, mockSetResources, mockSetLoading, true, null);
      expect(mockSetError).toHaveBeenCalledWith('No therapists or resources found near this postal code.');
      expect(mockSetLoading).toHaveBeenCalledWith(false);
    });

    test('fetches and formats resources successfully', async () => {
      const postalCode = 'M5V2T6';
      fetch
        .mockResolvedValueOnce({
          status: 200,
          json: vi.fn().mockResolvedValue({
            places: [
              {
                displayName: { text: 'Therapist A' },
                formattedAddress: '123 Wellness St',
                primaryType: 'Therapist',
                location: { latitude: 43.6532, longitude: -79.3832 },
              },
            ],
          }),
        })
        .mockResolvedValueOnce({
          status: 200,
          json: vi.fn().mockResolvedValue({
            routes: [{ distanceMeters: 2000 }],
          }),
        });

      await handleSearch(postalCode, mockSetError, mockSetResources, mockSetLoading, true, null);

      expect(mockSetResources).toHaveBeenCalledWith([
        {
          id: 0,
          name: 'Therapist A',
          type: 'Therapist',
          address: '123 Wellness St',
          distance: '2.0 km',
        },
      ]);
      expect(mockSetLoading).toHaveBeenCalledWith(false);
      expect(mockSetError).toHaveBeenCalledWith(''); // Initial error clear
    });

    test('handles Places API failure', async () => {
      const postalCode = 'M5V2T6';
      fetch.mockResolvedValueOnce({
        status: 400,
        json: vi.fn().mockResolvedValue({ error: { message: 'Bad request' } }),
      });
      await handleSearch(postalCode, mockSetError, mockSetResources, mockSetLoading, true, null);
      expect(mockSetError).toHaveBeenCalledWith('Places API (New) failed: Bad request');
      expect(mockSetLoading).toHaveBeenCalledWith(false);
    });

    test('handles Routes API failure and sets distance to N/A', async () => {
      const postalCode = 'M5V2T6';
      fetch
        .mockResolvedValueOnce({
          status: 200,
          json: vi.fn().mockResolvedValue({
            places: [
              {
                displayName: { text: 'Therapist A' },
                formattedAddress: '123 Wellness St',
                primaryType: 'Therapist',
                location: { latitude: 43.6532, longitude: -79.3832 },
              },
            ],
          }),
        })
        .mockResolvedValueOnce({
          status: 400,
          json: vi.fn().mockResolvedValue({ error: { message: 'Routes API failed' } }),
        });

      await handleSearch(postalCode, mockSetError, mockSetResources, mockSetLoading, true, null);

      expect(mockSetResources).toHaveBeenCalledWith([
        {
          id: 0,
          name: 'Therapist A',
          type: 'Therapist',
          address: '123 Wellness St',
          distance: 'N/A',
        },
      ]);
      expect(mockSetLoading).toHaveBeenCalledWith(false);
    });
  });

  describe('handleKeyPress', () => {
    test('calls handleSearch when Enter key is pressed', () => {
      const event = { key: 'Enter' };
      handleKeyPress(event, mockHandleSearch);
      expect(mockHandleSearch).toHaveBeenCalled();
    });

    test('does not call handleSearch for other keys', () => {
      const event = { key: 'Space' };
      handleKeyPress(event, mockHandleSearch);
      expect(mockHandleSearch).not.toHaveBeenCalled();
    });
  });
});