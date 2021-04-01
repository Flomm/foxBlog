var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var userName = window.localStorage.getItem('user');
var welcomeMessage = document.querySelector('.welcome');
var accBtn = document.querySelector('.account-btn');
var myPostsBtn = document.querySelector('.my-posts-btn');
var logoutBtn = document.querySelector('.logout-btn');
var main = document.querySelector('.main');
welcomeMessage.textContent = "Hello " + userName;
accBtn.addEventListener('click', function () {
    showAccData();
});
myPostsBtn.addEventListener('click', function () {
    main.innerHTML = '';
    loadPosts();
});
logoutBtn.addEventListener('click', function () {
    window.localStorage.setItem('user', '');
    window.location.replace('./');
});
//Account data
function showAccData() {
    var userName = window.localStorage.getItem('user');
    main.innerHTML = '';
    var dataDiv = document.createElement('div');
    dataDiv.classList.add('data');
    var xhr = new XMLHttpRequest();
    xhr.open('GET', '/api/info');
    xhr.setRequestHeader('user', userName);
    xhr.send();
    xhr.onload = function () {
        var accData = {
            numOfPosts: '',
            sumScore: ''
        };
        if (xhr.status === 404) {
            accData = {
                numOfPosts: 'server not found',
                sumScore: 'server not found'
            };
        }
        if (xhr.status === 200) {
            accData = JSON.parse(xhr.response);
        }
        var accClass = new AccInfoDiv('Account information', ['Login: ', 'Account type: ', 'Rank: '], [userName, 'normal', 'Fox']);
        var postClass = new AccInfoDiv('Post information', ['Number of posts: ', 'Total score for posts: '], [accData.numOfPosts, accData.sumScore]);
        var accDiv = accClass.createDiv();
        var postDiv = postClass.createDiv();
        dataDiv.appendChild(accDiv);
        dataDiv.appendChild(postDiv);
        main.appendChild(dataDiv);
    };
}
var AccInfoDiv = /** @class */ (function () {
    function AccInfoDiv(name, infos, data) {
        this.name = name;
        this.infos = infos;
        this.data = data;
    }
    AccInfoDiv.prototype.createDiv = function () {
        var newDiv = document.createElement('div');
        var h2 = document.createElement('h2');
        h2.textContent = this.name;
        newDiv.appendChild(h2);
        for (var i = 0; i <= this.infos.length; i++) {
            var newP = document.createElement('p');
            newP.textContent = this.infos[i];
            var newSpan = document.createElement('span');
            newSpan.textContent = this.data[i];
            newP.appendChild(newSpan);
            newDiv.appendChild(newP);
        }
        this.div = newDiv;
        return newDiv;
    };
    return AccInfoDiv;
}());
function initiatePost(postObject) {
    var newPost = new PersonalPost(postObject);
    var postedMain = document.querySelector('.posted-main');
    var mainChilds = document.querySelectorAll('.posted-slot');
    postedMain.insertBefore(newPost.makePost(), mainChilds[0]);
}
function loadPosts() {
    var newReq = new XMLHttpRequest();
    newReq.onload = function () {
        if (newReq.status === 204) {
            createSuccessDiv('Currently you have no posts.');
        }
        if (newReq.status === 200) {
            var postedMain = document.createElement('div');
            postedMain.classList.add('posted-main');
            var h2 = document.createElement('h2');
            h2.textContent = 'Posts';
            postedMain.appendChild(h2);
            main.appendChild(postedMain);
            var posts = newReq.response;
            var parsed = JSON.parse(posts);
            for (var _i = 0, parsed_1 = parsed; _i < parsed_1.length; _i++) {
                var p = parsed_1[_i];
                initiatePost(p);
            }
        }
        else {
            createSuccessDiv('There was a problem with the server. Please try again later.');
        }
    };
    newReq.open('GET', '/api/posts/myPosts');
    newReq.setRequestHeader('user', window.localStorage.getItem('user'));
    newReq.send();
}
function createSuccessDiv(txt) {
    var notSuccesDiv = document.createElement('div');
    notSuccesDiv.textContent = txt;
    notSuccesDiv.classList.add('data');
    document.querySelector('.main').appendChild(notSuccesDiv);
}
var GeneralPost = /** @class */ (function () {
    function GeneralPost(postObject) {
        this.postInput = postObject;
    }
    GeneralPost.prototype.createPostDivs = function () {
        this.postSlot = document.createElement('div');
        this.postAuthor = document.createElement('div');
        this.postDate = document.createElement('div');
        this.postMisc = document.createElement('div');
        this.postTitle = document.createElement('div');
        this.postContent = document.createElement('div');
        this.likeBar = document.createElement('div');
        this.likeBarP = document.createElement('p');
    };
    GeneralPost.prototype.assignClasses = function () {
        this.postTitle.classList.add('posted-title');
        this.postAuthor.classList.add('posted-author');
        this.postDate.classList.add('posted-date');
        this.postMisc.classList.add('posted-misc');
        this.postContent.classList.add('posted-content');
        this.postSlot.classList.add('posted-slot');
        this.likeBar.classList.add('likebar');
    };
    GeneralPost.prototype.fillPost = function () {
        this.postAuthor.textContent = "Posted by: " + this.postInput.author;
        this.postDate.textContent = "On: " + new Date(this.postInput.timestamp * 1000).toLocaleString().split(',')[0];
        this.postTitle.textContent = this.postInput.title;
        this.postContent.textContent = this.postInput.content;
        this.likeBarP.textContent = "Score: " + this.postInput.score;
    };
    GeneralPost.prototype.createStructure = function () {
        this.postSlot.appendChild(this.postTitle);
        this.postSlot.appendChild(this.postContent);
        this.postMisc.appendChild(this.postAuthor);
        this.postMisc.appendChild(this.postDate);
        this.postSlot.appendChild(this.postMisc);
        this.likeBar.appendChild(this.likeBarP);
        this.postSlot.appendChild(this.likeBar);
    };
    GeneralPost.prototype.makePost = function () {
        this.createPostDivs();
        this.assignClasses();
        this.fillPost();
        this.createStructure();
        return this.postSlot;
    };
    return GeneralPost;
}());
var PersonalPost = /** @class */ (function (_super) {
    __extends(PersonalPost, _super);
    function PersonalPost(postObject) {
        var _this = _super.call(this, postObject) || this;
        _this.boundDelete = _this.deletePost.bind(_this);
        return _this;
    }
    PersonalPost.prototype.deletePost = function () {
        console.log(this.postInput);
        var xhr = new XMLHttpRequest();
        xhr.onload = function () {
            if (xhr.status !== 200) {
                alert('Something went wrong, please try again.');
            }
            else {
                document.querySelector('.main').innerHTML = '';
                loadPosts();
            }
        };
        xhr.open('DELETE', "/api/posts/" + this.postInput.id);
        xhr.setRequestHeader('user', window.localStorage.getItem('user'));
        xhr.send();
    };
    PersonalPost.prototype.addDelBtn = function () {
        var delBtn = document.createElement('button');
        delBtn.classList.add('delete-btn');
        delBtn.addEventListener('click', this.boundDelete);
        var icon = document.createElement('i');
        icon.classList.add('fas');
        icon.classList.add('fa-trash-alt');
        delBtn.appendChild(icon);
        delBtn.setAttribute('data-action', 'delete');
        var newSpan = document.createElement('span');
        newSpan.appendChild(delBtn);
        this.postTitle.appendChild(newSpan);
    };
    PersonalPost.prototype.makePost = function () {
        this.createPostDivs();
        this.assignClasses();
        this.fillPost();
        this.createStructure();
        this.addDelBtn();
        return this.postSlot;
    };
    return PersonalPost;
}(GeneralPost));
