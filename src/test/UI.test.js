/**
 * @jest-environment jsdom
 */

import { createForm } from "../scenes/gameOver";
import { createTable } from "../scenes/leaderboard";

test("creates a form", () => {
  const nameForm = createForm();
  document.body.appendChild(nameForm);
  expect(nameForm.tagName).toBe("FORM");
});

test("has a name input", () => {
  const nameForm = createForm();
  document.body.appendChild(nameForm);
  const nameInput = document.querySelector('[name = "name"]');
  expect(nameInput.tagName).toBe("INPUT");
});

test("creates a table with top 5 scores of an array", () => {
  const scoreArray = [
    { user: "foo", score: 0 },
    { user: "bar", score: 1 },
    { user: "goe", score: 2 },
    { user: "lim", score: 3 },
    { user: "hul", score: 4 },
    { user: "nev", score: 5 },
  ];
  const table = createTable(scoreArray);
  expect(table.firstChild.tagName).toBe('TR')
  expect(table.childElementCount).toBe(6); // the table has 5 score rows + 1 head row
  expect(table.childNodes[1].firstChild.innerHTML).toEqual('nev') 
});