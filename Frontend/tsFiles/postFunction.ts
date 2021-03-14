import Postable from './Postable';
import Post from './PostClass';
import sendPostToServer from './sendPost';
import toggleErr from './toggleErrorClass';
import scrollToPost from './scrollToPost';

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
    const newPost: Post = new Post(newPostInput);
    const postedMain = document.querySelector('.posted-main');
    const mainChilds: NodeList = document.querySelectorAll('.posted-slot');
    const newPostSlot: HTMLDivElement = newPost.makePost();
    postedMain.insertBefore(newPostSlot, mainChilds[0]);
    scrollToPost(newPostSlot);
    inputs.forEach((input) => {
      input.value = '';
      if (input.parentElement.classList.contains('err')) {
        toggleErr(input);
      }
    });
  }
}
