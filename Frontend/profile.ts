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
  loadPosts('myPosts', true);
});

addBtn.addEventListener('click', () => {
  main.innerHTML = '';
  addPostForm();
  loadPosts('', false);
});

logoutBtn.addEventListener('click', () => {
  window.localStorage.setItem('user', '');
  window.location.replace('./');
});

//Account data
function showAccData(): void {
  const userName: string = window.localStorage.getItem('user');
  const dataDiv: HTMLDivElement = document.createElement('div');
  dataDiv.classList.add('data');
  const xhr: XMLHttpRequest = new XMLHttpRequest();
  xhr.open('GET', '/api/info');
  xhr.setRequestHeader('user', userName);
  xhr.send();
  xhr.onload = () => {
    let accData: AccData = {
      numOfPosts: '',
      sumScore: '',
    };
    if (xhr.status === 404) {
      accData = {
        numOfPosts: 'server not found',
        sumScore: 'server not found',
      };
    }
    if (xhr.status === 200) {
      accData = JSON.parse(xhr.response);
    }
    const accClass: AccInfoDiv = new AccInfoDiv(
      'Account information',
      ['Login: ', 'Account type: ', 'Rank: '],
      [userName, 'normal', 'Fox']
    );
    const postClass: AccInfoDiv = new AccInfoDiv(
      'Post information',
      ['Number of posts: ', 'Total score for posts: '],
      [accData.numOfPosts, accData.sumScore]
    );
    const accDiv: HTMLDivElement = accClass.createDiv();
    const postDiv: HTMLDivElement = postClass.createDiv();
    dataDiv.appendChild(accDiv);
    dataDiv.appendChild(postDiv);
    main.appendChild(dataDiv);
  };
}

class AccInfoDiv {
  infos: string[];
  name: string;
  data: string[];
  div: HTMLDivElement;

  constructor(name: string, infos: string[], data: string[]) {
    this.name = name;
    this.infos = infos;
    this.data = data;
  }

  createDiv(): HTMLDivElement {
    const newDiv: HTMLDivElement = document.createElement('div');
    const h2: HTMLHeadingElement = document.createElement('h2');
    h2.textContent = this.name;
    newDiv.appendChild(h2);
    for (let i = 0; i <= this.infos.length; i++) {
      const newP: HTMLParagraphElement = document.createElement('p');
      newP.textContent = this.infos[i];
      const newSpan: HTMLSpanElement = document.createElement('span');
      newSpan.textContent = this.data[i];
      newP.appendChild(newSpan);
      newDiv.appendChild(newP);
    }
    this.div = newDiv;
    return newDiv;
  }
}

function initiatePost(postObject: Postable, isMy: boolean): void {
  const postedMain = document.querySelector('.posted-main');
  const mainChilds: NodeList = document.querySelectorAll('.posted-slot');
  if (isMy) {
    const newPost: PersonalPost = new PersonalPost(postObject);
    postedMain.insertBefore(newPost.makePost(), mainChilds[0]);
  } else {
    const newPost: VotablePost = new VotablePost(postObject);
    postedMain.insertBefore(newPost.makePost(), mainChilds[0]);
  }
}

function loadPosts(endP: string, isMy: boolean): void {
  const newReq: XMLHttpRequest = new XMLHttpRequest();
  newReq.onload = () => {
    if (newReq.status === 204) {
      createSuccessDiv('Currently you have no posts.');
      return;
    }
    if (newReq.status === 200) {
      const postedMain: HTMLDivElement = document.createElement('div');
      postedMain.classList.add('posted-main');
      const h2: HTMLHeadingElement = document.createElement('h2');
      if (isMy) {
        h2.textContent = 'My posts';
      } else {
        h2.textContent = 'Posts';
      }
      postedMain.appendChild(h2);
      main.appendChild(postedMain);
      const posts = newReq.response;
      const parsed: Postable[] = JSON.parse(posts);
      for (let p of parsed) {
        initiatePost(p, isMy);
      }
      return;
    }
    createSuccessDiv('There was a problem with the server. Please try again later.');
  };
  newReq.open('GET', `/api/posts/${endP}`);
  newReq.setRequestHeader('user', window.localStorage.getItem('user'));
  newReq.send();
}

function createSuccessDiv(txt: string): void {
  const notSuccesDiv: HTMLDivElement = document.createElement('div');
  notSuccesDiv.textContent = txt;
  notSuccesDiv.classList.add('data');
  document.querySelector('.main').appendChild(notSuccesDiv);
}

interface AccData {
  numOfPosts: string;
  sumScore: string;
}

function addPostForm() {
  const main: HTMLDivElement = document.querySelector('.main');
  const submitMain: HTMLDivElement = document.createElement('div');
  submitMain.classList.add('submit-main');
  const titleSpan: HTMLSpanElement = document.createElement('span');
  titleSpan.textContent = 'Add new fox!';
  submitMain.appendChild(titleSpan);
  const addForm: HTMLFormElement = document.createElement('form');
  addForm.setAttribute('id', 'post-form');
  //Label 1
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
  // labelSlot1.appendChild(titleInpHolder);
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
  // labelSlot2.appendChild(contentInpHolder);
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
  //BTN
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

function toggleErr(input: HTMLInputElement): void {
  input.parentElement.classList.toggle('err');
  const labelEl: HTMLLabelElement = document.querySelector(`label[for=${input.name}]`);
  labelEl.parentElement.classList.toggle('err');
}

function scrollToPost(post: HTMLDivElement): void {
  const headerHeight: number = 50;
  const screenHalf: number = window.screen.height / 2;
  const y: number = post.getBoundingClientRect().top + window.scrollY - headerHeight - screenHalf;
  window.scroll({
    top: y,
    behavior: 'smooth',
  });
}

function frontEndInsert(newPostInput: Postable) {
  const newPost: VotablePost = new VotablePost(newPostInput);
  const postedMain = document.querySelector('.posted-main');
  const mainChilds: NodeList = document.querySelectorAll('.posted-slot');
  const newPostSlot: HTMLDivElement = newPost.makePost();
  postedMain.insertBefore(newPostSlot, mainChilds[0]);
  scrollToPost(newPostSlot);
}

function sendPostToServer(postObject: Sendable): void {
  const postReq: XMLHttpRequest = new XMLHttpRequest();
  postReq.open('POST', '/api/addpost', true);
  postReq.setRequestHeader('Content-Type', 'application/json');
  postReq.send(JSON.stringify(postObject));
  postReq.onload = () => {
    if (postReq.status !== 202) {
      alert('There was an problem, please try again.');
    }
    const newPost: Postable = JSON.parse(postReq.response);
    console.log(newPost);
    frontEndInsert(newPost);
  };
}

function postBlog(inputs: HTMLInputElement[]): void {
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
        toggleErr(input);
      }
    });
  }
}

class GeneralPost {
  //input
  protected postInput: Postable;
  //output
  protected postSlot: HTMLDivElement;
  protected postAuthor: HTMLDivElement;
  protected postDate: HTMLDivElement;
  protected postMisc: HTMLDivElement;
  protected postTitle: HTMLDivElement;
  protected postContent: HTMLDivElement;
  protected likeBar: HTMLDivElement;
  protected likeBarP: HTMLParagraphElement;

  constructor(postObject: Postable) {
    this.postInput = postObject;
  }

  createPostDivs(): void {
    this.postSlot = document.createElement('div');
    this.postAuthor = document.createElement('div');
    this.postDate = document.createElement('div');
    this.postMisc = document.createElement('div');
    this.postTitle = document.createElement('div');
    this.postContent = document.createElement('div');
    this.likeBar = document.createElement('div');
    this.likeBarP = document.createElement('p');
  }

  assignClasses(): void {
    this.postTitle.classList.add('posted-title');
    this.postAuthor.classList.add('posted-author');
    this.postDate.classList.add('posted-date');
    this.postMisc.classList.add('posted-misc');
    this.postContent.classList.add('posted-content');
    this.postSlot.classList.add('posted-slot');
    this.likeBar.classList.add('likebar');
  }

  fillPost(): void {
    this.postAuthor.textContent = `Posted by: ${this.postInput.author}`;
    this.postDate.textContent = `On: ${new Date(this.postInput.timestamp * 1000).toLocaleString().split(',')[0]}`;
    this.postTitle.textContent = this.postInput.title;
    this.postContent.textContent = this.postInput.content;
    this.likeBarP.textContent = `Score: ${this.postInput.score}`;
  }

  createStructure(): void {
    this.postSlot.appendChild(this.postTitle);
    this.postSlot.appendChild(this.postContent);
    this.postMisc.appendChild(this.postAuthor);
    this.postMisc.appendChild(this.postDate);
    this.postSlot.appendChild(this.postMisc);
    this.likeBar.appendChild(this.likeBarP);
    this.postSlot.appendChild(this.likeBar);
  }

  makePost(): HTMLDivElement {
    this.createPostDivs();
    this.assignClasses();
    this.fillPost();
    this.createStructure();
    return this.postSlot;
  }
}

class PersonalPost extends GeneralPost {
  constructor(postObject: Postable) {
    super(postObject);
  }
  boundShowBox = this.showConfirmBox.bind(this);

  showConfirmBox() {
    const wrapper: HTMLElement = document.querySelector('wrapper');
    const confirmBox: HTMLDivElement = document.createElement('div');
    confirmBox.classList.add('confirm-box');
    const newP1: HTMLParagraphElement = document.createElement('p');
    newP1.textContent = 'Are you sure you want to delete the post?';
    const newP2: HTMLParagraphElement = document.createElement('p');
    const yesBtn: HTMLButtonElement = document.createElement('button');
    yesBtn.classList.add('yes-btn');
    yesBtn.textContent = 'YES';
    const noBtn: HTMLButtonElement = document.createElement('button');
    yesBtn.classList.add('no-btn');
    noBtn.textContent = 'NO';
    newP2.appendChild(yesBtn);
    newP2.appendChild(noBtn);
    confirmBox.appendChild(newP1);
    confirmBox.appendChild(newP2);
    document.querySelector('body').insertBefore(confirmBox, wrapper);
    wrapper.classList.add('shady');
    yesBtn.addEventListener('click', () => {
      document.querySelector('body').removeChild(confirmBox);
      wrapper.classList.remove('shady');
      this.deletePost();
    });
    noBtn.addEventListener('click', () => {
      document.querySelector('body').removeChild(confirmBox);
      wrapper.classList.remove('shady');
    });
  }

  deletePost(): void {
    const xhr: XMLHttpRequest = new XMLHttpRequest();
    xhr.onload = () => {
      if (xhr.status !== 200) {
        alert('Something went wrong, please try again.');
      } else {
        document.querySelector('.main').innerHTML = '';
        loadPosts('myPosts', true);
      }
    };
    xhr.open('DELETE', `/api/posts/${this.postInput.id}`);
    xhr.setRequestHeader('user', window.localStorage.getItem('user'));
    xhr.send();
  }

  addDelBtn(): void {
    const delBtn: HTMLButtonElement = document.createElement('button');
    delBtn.classList.add('delete-btn');
    delBtn.addEventListener('click', this.boundShowBox);
    const icon: HTMLElement = document.createElement('i');
    icon.classList.add('fas');
    icon.classList.add('fa-trash-alt');
    delBtn.appendChild(icon);
    delBtn.setAttribute('data-action', 'delete');
    const newSpan: HTMLSpanElement = document.createElement('span');
    newSpan.appendChild(delBtn);
    this.postTitle.appendChild(newSpan);
  }

  makePost(): HTMLDivElement {
    this.createPostDivs();
    this.assignClasses();
    this.fillPost();
    this.createStructure();
    this.addDelBtn();
    return this.postSlot;
  }
}

class VotablePost extends GeneralPost {
  constructor(postObject: Postable) {
    super(postObject);
  }

  addVoteButtons() {
    const downVoteBtn: HTMLButtonElement = document.createElement('button');
    const upVoteBtn: HTMLButtonElement = document.createElement('button');
    const downIcon: HTMLElement = document.createElement('icon');
    downIcon.classList.add('fas');
    downIcon.classList.add('fa-arrow-down');
    const upIcon: HTMLElement = document.createElement('icon');
    upIcon.classList.add('fas');
    upIcon.classList.add('fa-arrow-up');
    downVoteBtn.appendChild(downIcon);
    upVoteBtn.appendChild(upIcon);
    downVoteBtn.addEventListener('click', () => {
      console.log('x');
    });
    upVoteBtn.addEventListener('click', () => {
      console.log('y');
    });
    this.likeBar.insertBefore(downVoteBtn, this.likeBar.firstElementChild);
    this.likeBar.appendChild(upVoteBtn);
  }

  makePost(): HTMLDivElement {
    this.createPostDivs();
    this.assignClasses();
    this.fillPost();
    this.createStructure();
    this.addVoteButtons();
    return this.postSlot;
  }
}

interface Postable {
  id: number;
  author: string;
  title: string;
  content: string;
  timestamp: number;
  score: number;
  user?: string;
  vote?: string;
}

interface Sendable {
  author: string;
  title: string;
  content: string;
  timestamp: number;
  user?: string;
  vote?: string;
}
