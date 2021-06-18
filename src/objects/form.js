const createForm = () => {
  const formContainer = document.createElement('form');
  formContainer.className = 'form-container';

  const nameLabel = document.createElement('label');
  nameLabel.textContent = 'Enter your name';

  const nameInput = document.createElement('input');
  nameInput.setAttribute('name', 'name');

  formContainer.appendChild(nameLabel);
  formContainer.appendChild(nameInput);
  return formContainer;
};

export { createForm as default };