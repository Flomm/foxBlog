window.onload = () => {
  const form: HTMLFormElement = document.querySelector('form');
  form.addEventListener('submit', (event: Event) => {
    event.preventDefault();
    const inputs: HTMLInputElement[] = Array.from(form.querySelectorAll('input'));
    checkLogin(inputs);
  });
};

function toggleErr(input: HTMLInputElement): void {
  const labelEl: HTMLLabelElement = document.querySelector(`label[for=${input.name}]`);
  labelEl.classList.toggle('err');
}

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
    const loginInput: HTMLInputElement = document.querySelector('form').elements[0] as HTMLInputElement;
    const userName: string = loginInput.value;
    const xhr: XMLHttpRequest = new XMLHttpRequest();
    xhr.open('GET', '/api/login', true);
    xhr.setRequestHeader('user', userName);
    xhr.send();
    xhr.onload = () => {
      if (xhr.status === 404) {
        alert('Error');
        return;
      }
      if (xhr.status === 401) {
        alert('No such user');
        return;
      }
      if (xhr.status === 200) {
        window.localStorage.setItem('user', userName);
        window.location.replace('./profile');
      }
    };
  }
}