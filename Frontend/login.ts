import checkLogin from './tsFiles/functions/checkLogin';
import sendLogin from './tsFiles/functions/sendLogin';
import togglePassword from './tsFiles/functions/togglePassword';
const loginForm: HTMLFormElement = document.querySelector('form');
const checkBox: HTMLInputElement = document.querySelector('.check');
const pwLabel: HTMLLabelElement = document.querySelector('label[for="check"]');

window.onload = () => {
  loginForm.addEventListener('submit', (event: Event) => {
    event.preventDefault();
    const inputs: HTMLInputElement[] = Array.from(loginForm.querySelectorAll('input[size="10"]'));
    if (checkLogin(inputs)) {
      sendLogin(inputs);
    }
  });
};

checkBox.addEventListener('click', () => {
  togglePassword(pwLabel);
});
