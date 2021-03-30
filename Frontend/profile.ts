const userName: string = window.localStorage.getItem('user');
const welcomeMessage: HTMLElement = document.querySelector('.welcome');
welcomeMessage.textContent = `Hello ${userName}`;
