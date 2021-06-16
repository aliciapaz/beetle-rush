import 'regenerator-runtime/runtime';
import fetch from 'node-fetch';

const gameID = '0dKDZBvYDCcOFsNLJkfD';
const url = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api';

const  setScore = async (name, score) => {
  const params = {};
  params.user = name || 'Beetle';
  params.score = score;
  const response = await fetch(`${url}/games/${gameID}/scores/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(params),
  });
  return response.json();
}

const getScores = async () => {
  const response = await fetch(`${url}/games/${gameID}/scores/`);
  const savedScores = await response.json();
  return savedScores.result;
}


export { setScore, getScores };