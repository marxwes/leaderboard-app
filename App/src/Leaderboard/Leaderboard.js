import React, { useState, useEffect, useCallback } from 'react';
import '../assets/leaderboard.css';
import logo from '../assets/LOGO.png';

const Leaderboard = ({ onRemove }) => {
  const [leaderboardData, setLeaderboardData] = useState([]);
  const HOST = "https://aiopoker.com:3001/"

  const fetchLeaderboardData = useCallback(() => {
    fetch(`${HOST}/leaderboard`)
      .then(response => response.json())
      .then(data => setLeaderboardData(data))
      .catch(error => console.error('Error fetching leaderboard data:', error));
  }, []);

  useEffect(() => {
    fetchLeaderboardData();
    const intervalId = setInterval(fetchLeaderboardData, 5000); // Fetch every minute
    return () => clearInterval(intervalId); // Cleanup on unmount
  }, [fetchLeaderboardData]);

  const handleRemove = (rank) => {
    fetch(`${HOST}leaderboard/${rank}`, { method: 'DELETE' })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(() => {
        if (onRemove) {
          onRemove(rank);
        }
        fetchLeaderboardData();
      })
      .catch(error => console.error('Error removing entry:', error));
  };

  return (
    <div className="leaderboard-container">
      <div className="logo-container">
        <img src={logo} alt="Leaderboard Logo" className="logo" />
      </div>
      <h1 className="leaderboard-title">Leaderboard</h1>
      <table className="leaderboard-table">
        <thead>
          <tr>
            <th>Rank</th>
            <th>Name</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {leaderboardData.map((entry) => (
            <tr key={entry.rank}>
              <td>{entry.rank}</td>
              <td>{entry.name}</td>
              <td className="score-cell">
                {entry.score}
                <span 
                  className="remove-button" 
                  onClick={() => handleRemove(entry.rank)}
                  title="Remove entry"
                >
                  ×
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Leaderboard;
