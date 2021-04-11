import togglePostError from './togglePostError';
import formIsValid from './formIsValid';
import Sendable from '../Interfaces/ISendable';
import sendPostToServer from './sendPostToServer';

export default function postBlog(inputs: HTMLInputElement[]): void {
  if (formIsValid(inputs)) {
    const newPostInput: Sendable = {
      author: window.localStorage.getItem('user'),
      title: inputs[0].value,
      content: inputs[1].value,
      timestamp: Math.floor(new Date().getTime() / 1000),
    };
    sendPostToServer(newPostInput);
    inputs.forEach((input) => {
      input.value = '';
      if (input.parentElement.classList.contains('err')) {
        togglePostError(input);
      }
    });
  }
}
