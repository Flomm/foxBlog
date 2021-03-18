import Postable from './Postable';
import sendPostToServer from './sendPost';
import toggleErr from './toggleErrorClass';

export default function postBlog(inputs: HTMLInputElement[]): void {
  let emptyField: HTMLInputElement[] = [];
  inputs.forEach((input) => {
    if (input.parentElement.classList.contains('err')) {
      toggleErr(input);
    }
    if (input.value === '') {
      emptyField.push(input);
    }
  });
  if (emptyField.length !== 0) {
    emptyField.forEach((input) => {
      if (!input.parentElement.classList.contains('err')) {
        toggleErr(input);
      }
    });
  } else {
    const newPostInput: Postable = {
      author: inputs[0].value,
      title: inputs[1].value,
      content: inputs[2].value,
      date: new Date().toLocaleString().split(',')[0],
    };
    sendPostToServer(newPostInput);
    inputs.forEach((input) => {
      input.value = '';
      if (input.parentElement.classList.contains('err')) {
        toggleErr(input);
      }
    });
  }
}
