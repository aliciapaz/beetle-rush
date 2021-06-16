/**
 * @jest-environment jsdom
 */
import { setScore, getScores } from "../api";
import { sortScores } from "../scenes/leaderboard";

test("saves a score in the server", async () => {
  return setScore("Foo", 15).then(response => {
    expect(response.result).toEqual('Leaderboard score created correctly.');
  });
});

test("gets an array of score objects from the server", async() => {
  return getScores().then(response=> {
    expect(typeof response[0].score).toEqual('number');
    expect(typeof response[0].user).toEqual('string')
  })
})

test("sorts an array of objects by score in descending order", () => {
  const scores = [
    {
      user: "Foo",
      score: 5,
    },
    { user: "Bar", score: 15 },
    { user: "Boo", score: 0 },
  ];
  const sorted = sortScores(scores);
  expect(
    sorted[0].score > sorted[1].score && sorted[1].score > sorted[2].score
  ).toBe(true);
});
