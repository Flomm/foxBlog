const userName: string = window.localStorage.getItem('user');
const welcomeMessage: HTMLElement = document.querySelector('.welcome');
const logoutBtn: HTMLButtonElement = document.querySelector('.logout-btn');

welcomeMessage.textContent = `Hello ${userName}`;
logoutBtn.addEventListener('click', () => {
  window.localStorage.setItem('user', '');
  window.location.replace('./');
});
