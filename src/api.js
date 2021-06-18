import 'regenerator-runtime/runtime';
import fetch from 'node-fetch';
import displayError from './objects/errorMsg';

const gameID = '0dKDZBvYDCcOFsNLJkfD';
const url = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api';

const setScore = async (name, score) => {
  try {
    const params = {};
    params.user = name || 'Beetle';
    params.score = score;
    const response = await fetch(`${url}/games/${gameID}/scores/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params),
    });
    const message = await response.json();
    if (message.message === 'You need to provide a valid score for the leaderboard') {
      throw new Error(message.message);
    }
    return message;
  } catch (error) {
    displayError(error);
    return error;
  }
};

const getScores = async () => {
  const response = await fetch(`${url}/games/${gameID}/scores/`);
  const savedScores = await response.json();
  return savedScores.result;
};

export { setScore, getScores, displayError };
