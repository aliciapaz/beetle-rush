/**
 * @jest-environment jsdom
 */

import { setScore, getScores } from '../api';
import { sortScores } from '../scenes/scores';

global.fetch = jest.fn(() => Promise.resolve({
  json: () => Promise.resolve('Resolve'),
}));

beforeEach(() => {
  fetch.mockClear();
});

describe('set score async function', () => {
  test('saves a score in the server', async () => {
    fetch.mockImplementationOnce(() => Promise.resolve({ json: () => Promise.resolve('Leaderboard score created correctly.') }));
    await expect(setScore('foo', 10)).resolves.toEqual({ result: 'Leaderboard score created correctly.' });
  });

  test('fails when saving empty score to the leaderboard', async () => {
    fetch.mockImplementationOnce(() => Promise.reject(new Error('API is Down')));
    // Set up our document body
    document.body.innerHTML = '<div id="error-container"></div>';
    await expect(setScore('', '')).resolves.toThrow('You need to provide a valid score for the leaderboard');
  });
});

test('gets an array of score objects from the server', async () => getScores().then((response) => {
  expect(typeof response[0].score).toEqual('number');
  expect(typeof response[0].user).toEqual('string');
}));

test('gets an array of score objects from the server', async () => getScores().then((response) => {
  expect(typeof response[0].score).not.toEqual('array');
  expect(typeof response[0].user).not.toEqual('array');
}));

test('sorts an array of objects by score in descending order', () => {
  const scores = [
    {
      user: 'Foo',
      score: 5,
    },
    { user: 'Bar', score: 15 },
    { user: 'Boo', score: 0 },
  ];
  const sorted = sortScores(scores);
  expect(
    sorted[0].score > sorted[1].score && sorted[1].score > sorted[2].score,
  ).toBe(true);
});

test('sorts an array of objects by score in descending order', () => {
  const scores = [
    {
      user: 'Foo',
      score: 5,
    },
    { user: 'Bar', score: 15 },
    { user: 'Boo', score: 0 },
  ];
  const sorted = sortScores(scores);
  expect(
    sorted[0].score < sorted[1].score && sorted[1].score < sorted[2].score,
  ).toBe(false);
});
