export default function sendLogin(inputs: HTMLInputElement[]): void {
  const userName: string = inputs[0].value;
  const pw: string = inputs[1].value;
  const xhr: XMLHttpRequest = new XMLHttpRequest();
  xhr.open('GET', '/api/login', true);
  xhr.setRequestHeader('user', userName);
  xhr.setRequestHeader('password', pw);
  xhr.send();
  xhr.onload = () => {
    if (xhr.status !== 200) {
      alert(`${JSON.parse(xhr.response).message}`);
      inputs[0].value = '';
      inputs[1].value = '';
    } else {
      window.localStorage.setItem('user', userName);
      window.location.replace('./profile');
    }
  };
}
