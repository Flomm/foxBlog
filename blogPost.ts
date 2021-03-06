function postBlog() {
  const authorPost: HTMLInputElement = document.querySelector('.author_post') as HTMLInputElement;
  const titlePost: HTMLInputElement = document.querySelector('.title_post') as HTMLInputElement;
  const contentPost: HTMLInputElement = document.querySelector('.content_post') as HTMLInputElement;
  if (titlePost.value === '' || contentPost.value === '' || authorPost.value === '') {
    alert('Please add a title and a text as well! You cannot add an empty post!');
  } else {
    const xPost: HTMLDivElement = document.createElement('div');
    const xAuthor: HTMLDivElement = document.createElement('div');
    const xDate: HTMLDivElement = document.createElement('div');
    const xMisc: HTMLDivElement = document.createElement('div');
    const xTitle: HTMLDivElement = document.createElement('div');
    const xContent: HTMLDivElement = document.createElement('div');

    xTitle.classList.add('posted_title');
    xAuthor.classList.add('posted_author');
    xDate.classList.add('posted_date');
    xMisc.classList.add('posted_misc');
    xContent.classList.add('posted_content');
    xPost.classList.add('posted_slot');

    xAuthor.innerHTML = `Posted by: ${authorPost.value}`;
    xDate.innerHTML = `On: ${new Date().toLocaleString().split(',')[0]}`;
    xTitle.innerHTML = titlePost.value;
    xContent.innerHTML = contentPost.value;

    const postedMain = document.querySelector('.posted_main');

    xPost.appendChild(xTitle);
    xPost.appendChild(xContent);
    xMisc.appendChild(xAuthor);
    xMisc.appendChild(xDate);
    xPost.appendChild(xMisc);
    postedMain.appendChild(xPost);

    authorPost.value = '';
    titlePost.value = '';
    contentPost.value = '';
  }
}

const subButton = document.querySelector('.button_submit');
subButton.addEventListener('click', postBlog);
