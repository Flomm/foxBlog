const userName: string = window.localStorage.getItem('user');
const welcomeMessage: HTMLElement = document.querySelector('.welcome');
const accBtn: HTMLButtonElement = document.querySelector('.account-btn');
const myPostsBtn: HTMLButtonElement = document.querySelector('.my-posts-btn');
const logoutBtn: HTMLButtonElement = document.querySelector('.logout-btn');
const main: HTMLDivElement = document.querySelector('.main');

welcomeMessage.textContent = `Hello ${userName}`;

accBtn.addEventListener('click', () => {
  showAccData();
});

myPostsBtn.addEventListener('click', () => {
  main.innerHTML = '';
  loadPosts();
});

logoutBtn.addEventListener('click', () => {
  window.localStorage.setItem('user', '');
  window.location.replace('./');
});

//Account data
function showAccData(): void {
  const userName: string = window.localStorage.getItem('user');
  main.innerHTML = '';
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

function initiatePost(postObject: Postable): void {
  const newPost: PersonalPost = new PersonalPost(postObject);
  const postedMain = document.querySelector('.posted-main');
  const mainChilds: NodeList = document.querySelectorAll('.posted-slot');
  postedMain.insertBefore(newPost.makePost(), mainChilds[0]);
}

function loadPosts(): void {
  const newReq: XMLHttpRequest = new XMLHttpRequest();
  newReq.onload = () => {
    if (newReq.status === 204) {
      createSuccessDiv('Currently you have no posts.');
    }
    if (newReq.status === 200) {
      const postedMain: HTMLDivElement = document.createElement('div');
      postedMain.classList.add('posted-main');
      const h2: HTMLHeadingElement = document.createElement('h2');
      h2.textContent = 'Posts';
      postedMain.appendChild(h2);
      main.appendChild(postedMain);
      const posts = newReq.response;
      const parsed: Postable[] = JSON.parse(posts);
      for (let p of parsed) {
        initiatePost(p);
      }
    } else {
      createSuccessDiv('There was a problem with the server. Please try again later.');
    }
  };
  newReq.open('GET', '/api/posts/myPosts');
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
  boundDelete = this.deletePost.bind(this);

  deletePost(): void {
    console.log(this.postInput);
    const xhr: XMLHttpRequest = new XMLHttpRequest();
    xhr.onload = () => {
      if (xhr.status !== 200) {
        alert('Something went wrong, please try again.');
      } else {
        document.querySelector('.main').innerHTML = '';
        loadPosts();
      }
    };
    xhr.open('DELETE', `/api/posts/${this.postInput.id}`);
    xhr.setRequestHeader('user', window.localStorage.getItem('user'));
    xhr.send();
  }

  addDelBtn(): void {
    const delBtn: HTMLButtonElement = document.createElement('button');
    delBtn.classList.add('delete-btn');
    delBtn.addEventListener('click', this.boundDelete);
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
