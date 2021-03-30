var userName = window.localStorage.getItem('user');
var welcomeMessage = document.querySelector('.welcome');
welcomeMessage.textContent = "Hello " + userName;
