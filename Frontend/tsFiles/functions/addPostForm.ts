import postBlog from './postBlog';

export default function addPostForm() {
  const main: HTMLDivElement = document.querySelector('.main');
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
  titleInput.setAttribute('type', 'text');
  titleInput.setAttribute('name', 'title-post');
  titleInput.setAttribute('maxlength', '25');
  titleInput.setAttribute('size', '25');
  titleInput.setAttribute('placeholder', 'The name of your favourite fox');
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
  contentInput.setAttribute('type', 'text');
  contentInput.setAttribute('name', 'content-post');
  contentInput.setAttribute('maxlength', '1500');
  contentInput.setAttribute('rows', '10');
  contentInput.setAttribute('cols', '30');
  contentInput.setAttribute('placeholder', 'Write something about your favourite fox');
  contentInpHolder.appendChild(contentInput);
  addForm.appendChild(labelSlot1);
  addForm.appendChild(titleInpHolder);
  addForm.appendChild(labelSlot2);
  addForm.appendChild(contentInpHolder);
  addForm.addEventListener('submit', (ev) => {
    ev.preventDefault();
    const inputFields: HTMLInputElement[] = Array.from(
      addForm.querySelectorAll('input, textarea')
    ) as HTMLInputElement[];
    postBlog(inputFields);
  });
  submitMain.appendChild(addForm);
  //Button
  const btnHolder: HTMLDivElement = document.createElement('div');
  btnHolder.classList.add('button-holder');
  const submitBtn: HTMLButtonElement = document.createElement('button');
  submitBtn.classList.add('button-submit');
  submitBtn.setAttribute('type', 'submit');
  submitBtn.setAttribute('form', 'post-form');
  submitBtn.textContent = 'Submit fox';
  btnHolder.appendChild(submitBtn);
  submitMain.appendChild(btnHolder);
  main.appendChild(submitMain);
}
