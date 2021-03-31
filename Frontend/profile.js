var userName = window.localStorage.getItem('user');
var welcomeMessage = document.querySelector('.welcome');
var logoutBtn = document.querySelector('.logout-btn');
welcomeMessage.textContent = "Hello " + userName;
logoutBtn.addEventListener('click', function () {
    window.localStorage.setItem('user', '');
    window.location.replace('./');
});
