import React, { useState } from 'react';
import './UserTickets.css';

const UserReviewsTickets = () => {
  const [review, setReview] = useState('');
  const [ticket, setTicket] = useState('');
  const [reviews, setReviews] = useState([]);
  const [tickets, setTickets] = useState([]);

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (review.trim()) {
      setReviews([...reviews, review]);
      setReview('');
    }
  };

  const handleTicketSubmit = (e) => {
    e.preventDefault();
    if (ticket.trim()) {
      setTickets([...tickets, ticket]);
      setTicket('');
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

      <div className="feedback-display">
        <div>
          <h2>Reviews</h2>
          <ul>
            {reviews.map((r, index) => (
              <li key={index}>{r}</li>
            ))}
          </ul>
        </div>

        <div>
          <h2>Tickets</h2>
          <ul>
            {tickets.map((t, index) => (
              <li key={index}>{t}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default UserReviewsTickets;
