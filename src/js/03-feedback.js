//відстежуєм input на формі і зберігайєм значення полів у локальне сховище

import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const emailInput = form.querySelector('input[name="email"]');
const messageInput = form.querySelector('textarea[name="message"]');

const saveFormState = throttle(() => {
  const formData = {
    email: emailInput.value,
    message: messageInput.value,
  };
  localStorage.setItem('feedback-form-state', JSON.stringify(formData));
}, 500);

form.addEventListener('input', saveFormState);

//Під час завантаження сторінки перевіряйє стан сховища і заповнюйє поля форми
document.addEventListener('DOMContentLoaded', () => {
    const savedState = localStorage.getItem('feedback-form-state');
    if (savedState !== null) {
      const formData = JSON.parse(savedState);
      emailInput.value = formData.email;
      messageInput.value = formData.message;
    }
  });


  //очищуйє сховище і поля форми і виводьить об'єкт з полями email і message та їхніми поточними значеннями у консоль
form.addEventListener('submit', event => {
  event.preventDefault();

  const formData = {
    email: emailInput.value,
    message: messageInput.value,
  };

  localStorage.removeItem('feedback-form-state');
  emailInput.value = '';
  messageInput.value = '';

  console.log('Form data submitted:', formData);
});

