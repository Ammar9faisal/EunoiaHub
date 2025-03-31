
//TO RUN THIS TEST CLASS, YOU NEED TO HAVE VALID API KEY FOR FindHelp CLASSES(.jsx. .js). IN PLACE OF KEY IN FindHelp CLASS PUT THE API AND THEN RUN THE TEST CLASS

import { describe, expect, test, vi, beforeEach } from 'vitest';
import { handleSearch, handleKeyPress } from '../../src/services/FindHelpServices';

vi.stubGlobal('fetch', vi.fn());

describe('FindHelpServices', () => {
  // Define mock functions 
  const mockSetError = vi.fn();
  const mockSetResources = vi.fn();
  const mockSetLoading = vi.fn();
  const mockHandleSearch = vi.fn();

  beforeEach(() => {
    // Reset all mocks before each test 
    vi.clearAllMocks();
    mockSetError.mockClear();
    mockSetResources.mockClear();
    mockSetLoading.mockClear();
    fetch.mockClear();
    // Mock Google Maps Geocoder 
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
    // Test: Verify that an error is set for an invalid postal code format
    test('sets error for invalid postal code format', async () => {
      const postalCode = '12345';
      await handleSearch(postalCode, mockSetError, mockSetResources, mockSetLoading, true, null);
      expect(mockSetError).toHaveBeenCalledWith('Please enter a valid Canadian postal code (e.g., M5V 2T6).');
      expect(mockSetLoading).toHaveBeenCalledWith(false);
      expect(mockSetResources).toHaveBeenCalledWith([]);
    });

    // Test: Ensure an error is set when the Google Maps API is not loaded 
    test('sets error when Google Maps API is not loaded', async () => {
      const postalCode = 'M5V2T6';
      await handleSearch(postalCode, mockSetError, mockSetResources, mockSetLoading, false, null);
      expect(mockSetError).toHaveBeenCalledWith('Google Maps API not loaded yet. Please try again.');
      expect(mockSetLoading).toHaveBeenCalledWith(false);
      expect(mockSetResources).toHaveBeenCalledWith([]);
    });

    // Test: Verify that an error is set when no places are found 
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

    // Test: Verify that resources are fetched and formatted successfully 
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
  });
});