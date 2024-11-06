const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');

const app = express();
const port = 3001; // Use a different port from your React app

app.use(cors());
app.use(bodyParser.json());

// Load existing data or initialize an empty array
let leaderboardData = [];
const dataFile = 'leaderboard.json';

if (fs.existsSync(dataFile)) {
  const data = fs.readFileSync(dataFile, 'utf8');
  leaderboardData = JSON.parse(data);
}

app.delete('/leaderboard/:rank', (req, res) => {
    const rankToRemove = parseInt(req.params.rank);
    
    const indexToRemove = leaderboardData.findIndex(entry => entry.rank === rankToRemove);
    
    if (indexToRemove === -1) {
      return res.status(404).json({ error: 'Entry not found' });
    }
  
    leaderboardData.splice(indexToRemove, 1);
  
    // Update ranks
    leaderboardData.forEach((entry, index) => {
      entry.rank = index + 1;
    });
  
    // Save to file
    fs.writeFileSync(dataFile, JSON.stringify(leaderboardData, null, 2));
  
    res.status(200).json({ message: 'Entry removed successfully' });
  });

  app.put('/leaderboard', (req, res) => {
    const { name, score, email } = req.body;
    
    // Simple validation
    if (!name || !score || !email) {
      return res.status(400).json({ error: 'Name, score, and email are required' });
    }
  
    // Check if an entry with this email already exists
    const existingEntryIndex = leaderboardData.findIndex(entry => entry.email === email);
  
    if (existingEntryIndex !== -1) {
      // Update existing entry
      leaderboardData[existingEntryIndex].score = score;
      leaderboardData[existingEntryIndex].name = name;
    } else {
      // Add new entry
      const newEntry = {
        rank: leaderboardData.length + 1,
        name,
        score,
        email
      };
      leaderboardData.push(newEntry);
    }
  
    // Sort the leaderboard by score
    leaderboardData.sort((a, b) => b.score - a.score);
  
    // Update ranks
    leaderboardData.forEach((entry, index) => {
      entry.rank = index + 1;
    });
  
    // Save to file
    fs.writeFileSync(dataFile, JSON.stringify(leaderboardData, null, 2));
  
    res.status(200).json({ message: 'Leaderboard updated successfully' });
  });
  

// GET endpoint to retrieve leaderboard data
app.get('/leaderboard', (req, res) => {
  res.json(leaderboardData);
});

// POST endpoint to add new entry to leaderboard
app.post('/leaderboard', (req, res) => {
  const { name, score, email } = req.body;
  
  // Simple validation
  if (!name || !score || !email) {
    return res.status(400).json({ error: 'Name, score, and email are required' });
  }

  // Add new entry
  const newEntry = {
    rank: leaderboardData.length + 1,
    name,
    score,
    email
  };

  leaderboardData.push(newEntry);

  // Sort the leaderboard by score
  leaderboardData.sort((a, b) => b.score - a.score);

  // Update ranks
  leaderboardData.forEach((entry, index) => {
    entry.rank = index + 1;
  });

  // Save to file
  fs.writeFileSync(dataFile, JSON.stringify(leaderboardData, null, 2));

  res.status(201).json(newEntry);
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
