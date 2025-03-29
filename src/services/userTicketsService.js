export const handleTicketSubmit = async (e, ticket, setTickets, setTicket, setSubmissionMessage) => {
  e.preventDefault();

  if (ticket.trim()) {  // Check if the ticket is not empty
    // Add the ticket to the local state
    setTickets((prevTickets) => [...prevTickets, ticket]);
    setTicket('');
    setSubmissionMessage('Ticket has been submitted!'); // Set the success message

    // Discord Webhook URL (store this in an environment variable for security)
    const ticketWebhookUrl = 'https://discord.com/api/webhooks/1355637554921209906/-lEsXoCt8s-yFjG2mVqm1PvyclRcSUfEqQ3VEJPah0BHVH05K88N-_fMD11n6o_SrI_k';

    // Payload for the Discord webhook
  const payload = {
    embeds: [
      {
      title: '📩 New User Ticket Submitted',
      fields: [
        { name: 'Ticket', value: ticket },
        { name: 'Submitted At', value: new Date().toLocaleString() },
      ],
      color: 16711680, // Hex color code for red
      },
    ],
  };

    try {
      // Send the webhook to Discord
      const response = await fetch(ticketWebhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        console.log('Webhook sent successfully to Discord!');
      } else {
        console.error('Failed to send webhook to Discord:', response.statusText);
        setSubmissionMessage('Failed to submit ticket. Please try again.');
      }
    } catch (error) {
      console.error('Error sending webhook to Discord:', error);
      setSubmissionMessage('An error occurred. Please try again.');
    }

    // Clear the message after 3 seconds
    setTimeout(() => setSubmissionMessage(''), 3000);
  }
};

export const handleReviewSubmit = async (e, review, setReviews, setReview, setSubmissionMessage) => {
  e.preventDefault();

  if (review.trim()) {
    setReviews((prevReviews) => [...prevReviews, review]);
    setReview('');
    setSubmissionMessage('Review has been submitted!'); // Set the message
    setTimeout(() => setSubmissionMessage(''), 3000); // Clear the message after 3 seconds

    const payload = {
      embeds: [
        {
          title: '✅ New User Review Submitted',
          fields: [
            { name: 'Review', value: review },
            { name: 'Submitted At', value: new Date().toLocaleString() },
          ],
          color: 65280, // Hex color code for bright green
        },
      ],
    };
  const reviewWebhookUrl = 'https://discord.com/api/webhooks/1355637652916797503/dfi8FP8Mu2QMHijtP_le8SpLWTX8wvfBEbGck8V1qRk0bZvcU1N2XXTGOU-jf7jVMQqG';

  try {
      // Send the webhook to Discord
      const response = await fetch(reviewWebhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        console.log('Webhook sent successfully to Discord!');
      } else {
        console.error('Failed to send webhook to Discord:', response.statusText);
        setSubmissionMessage('Failed to submit review. Please try again.');
      }
    } catch (error) {
      console.error('Error sending webhook to Discord:', error);
      setSubmissionMessage('An error occurred. Please try again.');
    }

    // Clear the message after 3 seconds
    setTimeout(() => setSubmissionMessage(''), 3000);
  }
}