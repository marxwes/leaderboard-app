import React, { useState, useCallback } from 'react';
import Leaderboard from './Leaderboard/Leaderboard';
import ScoreSubmission from './Leaderboard/ScoreSubmission';

const LeaderboardApp = () => {
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleScoreSubmitted = useCallback(() => {
    setRefreshTrigger(prev => prev + 1);
  }, []);

  const handleRemove = useCallback((rank) => {
    console.log(`Entry with rank ${rank} removed`);
    setRefreshTrigger(prev => prev + 1);
  }, []);

  return (
    <div>
      <Leaderboard onRemove={handleRemove} />

      {/* if manual entry is needed */}
      {/* <ScoreSubmission onScoreSubmitted={handleScoreSubmitted} /> */}
    </div>
  );
};

export default LeaderboardApp;
