import { describe, test, expect, vi, beforeEach } from 'vitest';
import { handleTicketSubmit, handleReviewSubmit } from '../../src/services/userTicketsService';

describe('userTicketsService', () => {
  let mockSetTickets, mockSetTicket, mockSetSubmissionMessage, mockSetReviews, mockSetReview;

  beforeEach(() => {
    // Reset mocks before each test
    mockSetTickets = vi.fn();
    mockSetTicket = vi.fn();
    mockSetSubmissionMessage = vi.fn();
    mockSetReviews = vi.fn();
    mockSetReview = vi.fn();

    // Mock the fetch API
    global.fetch = vi.fn();
  });

  afterEach(() => {
    vi.clearAllMocks();   //clears all mocks after each test xomplete
  });

  describe('handleTicketSubmit', () => {
    test('submits a ticket successfully', async () => {
      const mockEvent = { preventDefault: vi.fn() };
      const ticket = 'This is a test ticket';

      // Mock fetch response
      fetch.mockResolvedValueOnce({ ok: true });

      await handleTicketSubmit(mockEvent, ticket, mockSetTickets, mockSetTicket, mockSetSubmissionMessage);

      expect(mockEvent.preventDefault).toHaveBeenCalled();
      expect(mockSetTickets).toHaveBeenCalledWith(expect.any(Function));
      expect(mockSetTicket).toHaveBeenCalledWith('');
      expect(mockSetSubmissionMessage).toHaveBeenCalledWith('Ticket has been submitted!');
      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining('https://discord.com/api/webhooks/'),
        expect.objectContaining({
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: expect.any(String),
        })
      );
    });

    test('handles a failed ticket submission', async () => {
      const mockEvent = { preventDefault: vi.fn() };
      const ticket = 'This is a test ticket';

      // Mock fetch response
      fetch.mockResolvedValueOnce({ ok: false, statusText: 'Bad Request' });

      await handleTicketSubmit(mockEvent, ticket, mockSetTickets, mockSetTicket, mockSetSubmissionMessage);

      expect(mockSetSubmissionMessage).toHaveBeenCalledWith('Failed to submit ticket. Please try again.');
    });

    test('handles an error during ticket submission', async () => {
      const mockEvent = { preventDefault: vi.fn() };
      const ticket = 'This is a test ticket';

      // Mock fetch to throw an error
      fetch.mockRejectedValueOnce(new Error('Network Error'));

      await handleTicketSubmit(mockEvent, ticket, mockSetTickets, mockSetTicket, mockSetSubmissionMessage);

      expect(mockSetSubmissionMessage).toHaveBeenCalledWith('An error occurred. Please try again.');
    });
  });

  describe('handleReviewSubmit', () => {
    test('submits a review successfully', async () => {
      const mockEvent = { preventDefault: vi.fn() };
      const review = 'This is a test review';

      // Mock fetch response
      fetch.mockResolvedValueOnce({ ok: true });

      await handleReviewSubmit(mockEvent, review, mockSetReviews, mockSetReview, mockSetSubmissionMessage);

      expect(mockEvent.preventDefault).toHaveBeenCalled();
      expect(mockSetReviews).toHaveBeenCalledWith(expect.any(Function));
      expect(mockSetReview).toHaveBeenCalledWith('');
      expect(mockSetSubmissionMessage).toHaveBeenCalledWith('Review has been submitted!');
      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining('https://discord.com/api/webhooks/'),
        expect.objectContaining({
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: expect.any(String),
        })
      );
    });


    test('handles a failed review submission', async () => {  
      const mockEvent = { preventDefault: vi.fn() };
      const review = 'This is a test review';

      // Mock fetch response
      fetch.mockResolvedValueOnce({ ok: false, statusText: 'Bad Request' });

      await handleReviewSubmit(mockEvent, review, mockSetReviews, mockSetReview, mockSetSubmissionMessage);

      expect(mockSetSubmissionMessage).toHaveBeenCalledWith('Failed to submit review. Please try again.');
    });

    test('handles an error during review submission', async () => {
      const mockEvent = { preventDefault: vi.fn() };
      const review = 'This is a test review';

      // Mock fetch to throw an error
      fetch.mockRejectedValueOnce(new Error('Network Error'));

      await handleReviewSubmit(mockEvent, review, mockSetReviews, mockSetReview, mockSetSubmissionMessage);

      expect(mockSetSubmissionMessage).toHaveBeenCalledWith('An error occurred. Please try again.');
    });
  });
});