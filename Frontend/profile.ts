const userName: string = window.localStorage.getItem('user');
const welcomeMessage: HTMLElement = document.querySelector('.welcome');
const accBtn: HTMLButtonElement = document.querySelector('.account-btn');
const logoutBtn: HTMLButtonElement = document.querySelector('.logout-btn');
const main: HTMLDivElement = document.querySelector('.main');

welcomeMessage.textContent = `Hello ${userName}`;

accBtn.addEventListener('click', () => {
  showAccData();
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

interface AccData {
  numOfPosts: string;
  sumScore: string;
}
