import showAccData from './tsFiles/functions/showAccData';
import addPostedContainer from './tsFiles/functions/addPostedContainer';
import loadPosts from './tsFiles/functions/loadPosts';
import addPostForm from './tsFiles/functions/addPostForm';

const userName: string = window.localStorage.getItem('user');
const welcomeMessage: HTMLElement = document.querySelector('.welcome');
const accBtn: HTMLButtonElement = document.querySelector('.account-btn');
const myPostsBtn: HTMLButtonElement = document.querySelector('.my-posts-btn');
const addBtn: HTMLButtonElement = document.querySelector('.add-btn');
const logoutBtn: HTMLButtonElement = document.querySelector('.logout-btn');
const main: HTMLDivElement = document.querySelector('.main');

welcomeMessage.textContent = `Hello ${userName}`;

accBtn.addEventListener('click', () => {
  main.innerHTML = '';
  showAccData();
});

myPostsBtn.addEventListener('click', () => {
  main.innerHTML = '';
  addPostedContainer('myPosts', main);
  loadPosts('myPosts', 'timestamp ASC');
});

addBtn.addEventListener('click', () => {
  main.innerHTML = '';
  addPostForm(main);
  addPostedContainer('', main);
  loadPosts('', 'timestamp ASC');
});

logoutBtn.addEventListener('click', () => {
  window.localStorage.setItem('user', '');
  window.location.replace('./');
});
