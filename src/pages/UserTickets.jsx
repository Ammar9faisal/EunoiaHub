import React, { useState } from 'react';
import '../../styles/UserTickets.css';
import Sidebar from '../components/Sidebar';
import { handleTicketSubmit, handleReviewSubmit } from '../services/userTicketsService';

const UserTickets = () => {
  const [review, setReview] = useState('');
  const [ticket, setTicket] = useState('');
  const [reviews, setReviews] = useState([]);
  const [tickets, setTickets] = useState([]);
  const [submissionMessage, setSubmissionMessage] = useState(''); // State for submission message


  return (
    <div className="usertickets-page">
      <Sidebar />
      <div className="usertickets-container">
        <h1 className="usertickets-title">User Reviews and Feedback</h1>
        <div className="usertickets-form-section">
          <form className="usertickets-form" onSubmit={(e) => handleReviewSubmit(e, review, setReviews, setReview, setSubmissionMessage)}>
            <h2>Leave a Review</h2>
            <textarea
              className="usertickets-textarea"
              value={review}
              onChange={(e) => setReview(e.target.value)}
              placeholder="Share your experience..."
            />
            <button className="usertickets-button" type="submit">Submit Review</button>
          </form>

          <form
            className="usertickets-form"
            onSubmit={(e) => handleTicketSubmit(e, ticket, setTickets, setTicket, setSubmissionMessage)}
          >
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
    </div>
  );
};

export default UserTickets;
