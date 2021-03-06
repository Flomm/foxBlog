function postBlog() {
    var authorPost = document.querySelector('.author_post');
    var titlePost = document.querySelector('.title_post');
    var contentPost = document.querySelector('.content_post');
    if (titlePost.value === '' || contentPost.value === '') {
        alert('Please add a title and a text as well! You cannot add an empty post!');
    }
    else {
        var xPost = document.createElement('div');
        var xAuthor = document.createElement('div');
        var xDate = document.createElement('div');
        var xMisc = document.createElement('div');
        var xTitle = document.createElement('div');
        var xContent = document.createElement('div');
        xTitle.classList.add('posted_title');
        xAuthor.classList.add('posted_author');
        xDate.classList.add('posted_date');
        xMisc.classList.add('posted_misc');
        xContent.classList.add('posted_content');
        xPost.classList.add('posted_slot');
        // const authorNew: string = `Posted by: ${authorPost.value}`;
        // const titleNew: string = titlePost.value;
        // const textNew: string = contentPost.value;
        xAuthor.innerHTML = "Posted by: " + authorPost.value;
        xDate.innerHTML = "On: " + new Date().toLocaleString().split(',')[0];
        xTitle.innerHTML = titlePost.value;
        xContent.innerHTML = contentPost.value;
        var postedMain = document.querySelector('.posted_main');
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
var subButton = document.querySelector('.button_submit');
subButton.addEventListener('click', postBlog);
