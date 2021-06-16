/**
 * @jest-environment jsdom
 */

import {createForm} from "../scenes/gameOver";

test('create a form', () => {
  const nameForm = createForm();
  document.body.appendChild(nameForm);
  expect(nameForm.tagName).toBe('FORM');
});

test('has a name inpunt', () => {
  const nameForm = createForm();
  document.body.appendChild(nameForm);
  const nameInput = document.querySelector('[name = "name"]')
  expect(nameInput.tagName).toBe('INPUT');
});