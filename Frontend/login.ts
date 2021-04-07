import checkLogin from './tsFiles/functions/checkLogin';
const loginForm: HTMLFormElement = document.querySelector('form');
const checkBox: HTMLInputElement = document.querySelector('.check');
const pwInput: HTMLInputElement = document.querySelector('form').elements[1] as HTMLInputElement;

window.onload = () => {
  loginForm.addEventListener('submit', (event: Event) => {
    event.preventDefault();
    const inputs: HTMLInputElement[] = Array.from(loginForm.querySelectorAll('input[size="10"]'));
    checkLogin(inputs);
  });

  checkBox.addEventListener('change', () => {
    if (pwInput.type === 'password') {
      pwInput.type = 'text';
    } else {
      pwInput.type = 'password';
    }
  });
};
