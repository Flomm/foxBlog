import { Post } from './PostClass';

function toggleErr(input: HTMLInputElement) {
  input.parentElement.classList.toggle('err');
  const labelEl: HTMLLabelElement = document.querySelector(`label[for=${input.name}]`);
  labelEl.parentElement.classList.toggle('err');
}

export function postBlog(inputs: HTMLInputElement[]): void {
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
    const datePost: string = new Date().toLocaleString().split(',')[0];
    const newPost: Post = new Post(inputs[0].value, inputs[1].value, inputs[2].value, datePost);
    const postedMain = document.querySelector('.posted-main');

    const mainChilds: NodeList = document.querySelectorAll('.posted-slot');
    postedMain.insertBefore(newPost.makePost(), mainChilds[0]);

    inputs.forEach((input) => {
      input.value = '';
      if (input.parentElement.classList.contains('err')) {
        toggleErr(input);
      }
    });
  }
}
