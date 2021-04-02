import checkLogin from './tsFiles/functions/checkLogin';

const form: HTMLFormElement = document.querySelector('form');
const checkBox: HTMLInputElement = document.querySelector('.check');
const pwInput: HTMLInputElement = document.querySelector('form').elements[1] as HTMLInputElement;

window.onload = () => {
  form.addEventListener('submit', (event: Event) => {
    event.preventDefault();
    const inputs: HTMLInputElement[] = Array.from(form.querySelectorAll('input:not(.check)'));
    checkLogin(inputs);
  });

  window.addEventListener('keydown', (e: KeyboardEvent) => {
    if (e.code === 'Enter') form.submit();
  });

  checkBox.addEventListener('change', () => {
    if (pwInput.type === 'password') {
      pwInput.type = 'text';
    } else {
      pwInput.type = 'password';
    }
  });
};
