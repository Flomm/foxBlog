import AccInfoDiv from '../Classes/AccInfoDiv';
import AccData from '../Interfaces/IAccData';
const main: HTMLDivElement = document.querySelector('.main');

export default function showAccData(): void {
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
    if (xhr.status === 500) {
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
