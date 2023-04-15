import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const email = document.querySelector('input');
const textarea = document.querySelector('textarea');

form.addEventListener('submit', onFormSubmit);
textarea.addEventListener('input', throttle(onMessageFilled, 500));
email.addEventListener('input', throttle(onEmailFilled, 500));

textareaReset();

function onFormSubmit(event) {
  event.preventDefault();
  if (email.value === '') {
    alert('Email field to be filled!');
    return;
  }
  if (textarea.value === '') {
    alert('Message field to be filled!');
    return;
  }
  console.log({
    Email: email.value,
    Message: textarea.value,
  });
  event.currentTarget.reset();
  localStorage.removeItem('email');
  localStorage.removeItem('message');
}

function onEmailFilled(event) {
  const email = event.target.value;
  localStorage.setItem('email', email);
}

function onMessageFilled(event) {
  const message = event.target.value;
  localStorage.setItem('message', message);
}

function textareaReset() {
  const savedEmail = localStorage.getItem('email');
  const savedMessage = localStorage.getItem('message');
  if (savedMessage) {
    textarea.value = savedMessage;
  }
  if (savedEmail) {
    email.value = savedEmail;
  }
}
