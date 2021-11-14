/**
 * @jest-environment jsdom
 */

import createForm from '../objects/form';
import displayError from '../objects/errorMsg';
import { removeElements } from '../objects/button';
import { createTable } from '../scenes/scores';

afterEach(() => {
  document.body.innerHTML = '';
});

test('creates a form', () => {
  const nameForm = createForm();
  expect(nameForm.tagName).toBe('FORM');
});

test('does not create a div', () => {
  const nameForm = createForm();
  expect(nameForm.tagName).not.toBe('DIV');
});

test('has a name input', () => {
  const nameForm = createForm();
  document.body.appendChild(nameForm);
  const nameInput = document.querySelector('[name = "name"]');
  expect(nameInput.tagName).toBe('INPUT');
});

test('does not have a title input', () => {
  const nameForm = createForm();
  document.body.appendChild(nameForm);
  const nameInput = document.querySelector('[name = "title"]');
  expect(nameInput).toBe(null);
});

test('creates a table with top 5 scores of an array', () => {
  const scoreArray = [
    { user: 'foo', score: 0 },
    { user: 'bar', score: 1 },
    { user: 'goe', score: 2 },
    { user: 'lim', score: 3 },
    { user: 'hul', score: 4 },
    { user: 'nev', score: 5 },
  ];
  const table = createTable(scoreArray);
  expect(table.firstChild.tagName).toBe('TR');
  expect(table.childElementCount).toBe(6); // the table has 5 score rows + 1 head row
  expect(table.childNodes[1].firstChild.innerHTML).toEqual('nev');
});

test('removes elements from html', () => {
  const form = document.createElement('TABLE');
  form.className = 'scores-table';
  document.body.appendChild(form);
  removeElements();
  expect(document.querySelector('.scores-table')).toBe(null);
});

test('displays an error message', () => {
  // Set up our document body
  document.body.innerHTML = '<div id="error-container"></div>';
  const errorMsg = 'wrong!';
  displayError(errorMsg);
  const errorContainer = document.getElementById('error-container');
  expect(errorContainer.style.display).toEqual('block');
  expect(errorContainer.innerHTML).toEqual('wrong!');
});

test('hides the error message after 3 seconds', () => {
  // Set up our document body
  document.body.innerHTML = '<div id="error-container"></div>';
  const errorMsg = 'wrong!';
  displayError(errorMsg);
  const errorContainer = document.getElementById('error-container');
  setTimeout(() => { expect(errorContainer.style.display).toEqual('none'); }, 3500);
});