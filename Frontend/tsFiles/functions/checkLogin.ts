export default function checkLogin(inputs: HTMLInputElement[]): void {
  const loginInput: HTMLInputElement = document.querySelector('form').elements[0] as HTMLInputElement;
  const pwInput: HTMLInputElement = document.querySelector('form').elements[1] as HTMLInputElement;
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
      if (xhr.status !== 200) {
        alert(`${JSON.parse(xhr.response).message}`);
        loginInput.value = '';
        pwInput.value = '';
      } else {
        window.localStorage.setItem('user', userName);
        window.location.replace('./profile');
      }
    };
  }
}
