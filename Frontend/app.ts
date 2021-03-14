import postBlog from './tsFiles/postFunction';
import initialLoad from './tsFiles/intitialLoad';

const authorPost: HTMLInputElement = document.querySelector('.author-post') as HTMLInputElement;
const titlePost: HTMLInputElement = document.querySelector('.title-post') as HTMLInputElement;
const contentPost: HTMLInputElement = document.querySelector('.content-post') as HTMLInputElement;

const inputFields: HTMLInputElement[] = [authorPost, titlePost, contentPost];

const subButton: HTMLButtonElement = document.querySelector('.button-submit') as HTMLButtonElement;

window.addEventListener('load', () => {
  initialLoad();
});

subButton.addEventListener('click', () => {
  postBlog(inputFields);
});
