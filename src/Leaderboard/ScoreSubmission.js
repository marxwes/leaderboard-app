import React, { useState } from 'react';

const ScoreSubmission = () => {
  const [name, setName] = useState('');
  const [score, setScore] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://localhost:3001/leaderboard', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, score: Number(score), email }),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
        // Clear form or show success message
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <div className="score-submission-container">
      <h2 className="submission-title">Submit New Score</h2>
      <form onSubmit={handleSubmit} className="score-submission-form">
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="score">Score:</label>
          <input
            type="number"
            id="score"
            value={score}
            onChange={(e) => setScore(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="submit-button">Submit Score</button>
      </form>
    </div>
  );
};

export default ScoreSubmission;
