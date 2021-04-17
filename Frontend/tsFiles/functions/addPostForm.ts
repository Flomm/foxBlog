import postBlog from './postBlog';
import setAttributes from './setAttributes';
import { titleAttr, contentAttr } from '../other/attributeObjects';

export default function addPostForm(main: HTMLDivElement) {
  const submitMain: HTMLDivElement = document.createElement('div');
  submitMain.classList.add('submit-main');
  const titleSpan: HTMLSpanElement = document.createElement('span');
  titleSpan.textContent = 'Add new fox!';
  submitMain.appendChild(titleSpan);
  const addForm: HTMLFormElement = document.createElement('form');
  addForm.setAttribute('id', 'post-form');
  //Input 1
  const labelSlot1: HTMLDivElement = document.createElement('div');
  labelSlot1.classList.add('label-slot');
  labelSlot1.setAttribute('err-text', ' Please add a title');
  const titleLabel: HTMLLabelElement = document.createElement('label');
  titleLabel.setAttribute('for', 'title-post');
  titleLabel.textContent = 'Title';
  labelSlot1.appendChild(titleLabel);
  const titleInpHolder: HTMLDivElement = document.createElement('div');
  titleInpHolder.classList.add('text-area');
  const titleInput: HTMLInputElement = document.createElement('input');
  setAttributes(titleInput, titleAttr);
  titleInpHolder.appendChild(titleInput);
  //Input2
  const labelSlot2: HTMLDivElement = document.createElement('div');
  labelSlot2.classList.add('label-slot');
  labelSlot2.setAttribute('err-text', ' Please add content');
  const contentLabel: HTMLLabelElement = document.createElement('label');
  contentLabel.setAttribute('for', 'content-post');
  contentLabel.textContent = 'Content';
  labelSlot2.appendChild(contentLabel);
  const contentInpHolder: HTMLDivElement = document.createElement('div');
  contentInpHolder.classList.add('text-area');
  const contentInput: HTMLTextAreaElement = document.createElement('textarea');
  setAttributes(contentInput, contentAttr);
  contentInpHolder.appendChild(contentInput);
  addForm.appendChild(labelSlot1);
  addForm.appendChild(titleInpHolder);
  addForm.appendChild(labelSlot2);
  addForm.appendChild(contentInpHolder);
  addForm.addEventListener('submit', (ev) => {
    ev.preventDefault();
    const inputFields: HTMLInputElement[] = Array.from(
      addForm.querySelectorAll('input[type="text"], textarea')
    ) as HTMLInputElement[];
    postBlog(inputFields);
  });
  //Button
  const submitBtn: HTMLInputElement = document.createElement('input');
  submitBtn.classList.add('button-submit');
  submitBtn.setAttribute('type', 'submit');
  submitBtn.value = 'Submit fox';
  addForm.appendChild(submitBtn);
  submitMain.appendChild(addForm);
  main.appendChild(submitMain);
}
