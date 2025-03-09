import React, { useState } from 'react';
import './UserTickets.css';

const UserTickets = () => {
  const [review, setReview] = useState('');
  const [ticket, setTicket] = useState('');
  const [reviews, setReviews] = useState([]);
  const [tickets, setTickets] = useState([]);
  const [submissionMessage, setSubmissionMessage] = useState(''); // State for submission message

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (review.trim()) {
      setReviews([...reviews, review]);
      setReview('');
      setSubmissionMessage('Review has been submitted!'); // Set the message
      setTimeout(() => setSubmissionMessage(''), 3000); // Clear the message after 3 seconds
    }
  };

  const handleTicketSubmit = (e) => {
    e.preventDefault();
    if (ticket.trim()) {
      setTickets([...tickets, ticket]);
      setTicket('');
      setSubmissionMessage('Ticket has been submitted!'); // Set the message
      setTimeout(() => setSubmissionMessage(''), 3000); // Clear the message after 3 seconds
    }
  };

  return (
    <div className="usertickets-container">
      <h1 className="usertickets-title">User Reviews and Feedback</h1>

      <div className="usertickets-form-section">
        <form className="usertickets-form" onSubmit={handleReviewSubmit}>
          <h2>Leave a Review</h2>
          <textarea
            className="usertickets-textarea"
            value={review}
            onChange={(e) => setReview(e.target.value)}
            placeholder="Share your experience..."
          />
          <button className="usertickets-button" type="submit">Submit Review</button>
        </form>

        <form className="usertickets-form" onSubmit={handleTicketSubmit}>
          <h2>Submit a Ticket</h2>
          <textarea
            className="usertickets-textarea"
            value={ticket}
            onChange={(e) => setTicket(e.target.value)}
            placeholder="What’s not working or what features would you like?"
          />
          <button className="usertickets-button" type="submit">Submit Ticket</button>
        </form>
      </div>

      {submissionMessage && <div className="usertickets-submission-message">{submissionMessage}</div>}

    </div>
  );
};

export default UserTickets;
