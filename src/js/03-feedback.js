const throttle = require('lodash.throttle');

let formData = {
  email: '',
  message: '',
};

const STORAGE_KEY = 'feedback-form-state';
const refs = {
  form: document.querySelector('.feedback-form'),
  email: document.querySelector('.feedback-form input'),
  textarea: document.querySelector('.feedback-form textarea'),
};

const formEmail = refs.form.elements.email;

const formMessage = refs.form.elements.message;

refs.form.addEventListener('submit', onFormSubmit);
refs.form.addEventListener('input', throttle(saveToLocalStorage, 500));

let savedData = localStorage.getItem(STORAGE_KEY);
if (savedData) {
  fillForm(savedData);
}

function saveToLocalStorage({ target }) {
  const { value } = target;
  target.setAttribute('value', value);
  dataFill();
  updateLocalStorage();
}

function dataFill() {
  formData.email = formEmail.getAttribute('value');
  formData.message = formMessage.getAttribute('value');
}

function updateLocalStorage() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

function fillForm(savedData) {
  const extractedData = JSON.parse(savedData);
  formEmail.setAttribute('value', extractedData.email);
  formMessage.setAttribute('value', extractedData.message);
  formMessage.textContent = extractedData.message;
  dataFill();
}

function onFormSubmit(event) {
  console.log('feedback-form-state');
  event.preventDefault();
  event.currentTarget.reset();
  localStorage.removeItem(STORAGE_KEY);
  formReset();
}

function formReset() {
  formEmail.setAttribute('value', '');
  formMessage.setAttribute('value', '');
  formMessage.textContent = '';
}
