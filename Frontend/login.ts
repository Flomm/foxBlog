const form: HTMLFormElement = document.querySelector('form');
const checkBox: HTMLInputElement = document.querySelector('.check');
const loginInput: HTMLInputElement = document.querySelector('form').elements[0] as HTMLInputElement;
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

function checkLogin(inputs: HTMLInputElement[]): void {
  let emptyField: HTMLInputElement[] = [];
  inputs.forEach((input) => {
    const labelEl: HTMLLabelElement = document.querySelector(`label[for=${input.name}]`);
    if (labelEl.classList.contains('err')) {
      labelEl.classList.toggle('err');
    }
    if (input.value === '') {
      emptyField.push(input);
    }
  });
  if (emptyField.length !== 0) {
    emptyField.forEach((input) => {
      const labelEl: HTMLLabelElement = document.querySelector(`label[for=${input.name}]`);
      labelEl.classList.toggle('err');
      if (!labelEl.classList.contains('err')) {
        labelEl.classList.toggle('err');
      }
    });
  } else {
    const userName: string = loginInput.value;
    const pw: string = pwInput.value;
    const xhr: XMLHttpRequest = new XMLHttpRequest();
    xhr.open('GET', '/api/login', true);
    xhr.setRequestHeader('user', userName);
    xhr.setRequestHeader('password', pw);
    xhr.send();
    xhr.onload = () => {
      if (xhr.status === 404) {
        alert('There is a problem with the server. Please try again later.');
        return;
      }
      if (xhr.status === 401) {
        alert('Invalid login or password.');
        loginInput.value = '';
        pwInput.value = '';
        return;
      }
      if (xhr.status === 200) {
        window.localStorage.setItem('user', userName);
        window.location.replace('./profile');
      }
    };
  }
}
