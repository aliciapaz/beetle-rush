const displayError = (error) => {
  const errors = document.getElementById('error-container');
  errors.innerHTML = error;
  errors.style.display = 'block';
  setTimeout(() => { errors.style.display = 'none'; }, 3000);
};

export { displayError as default };