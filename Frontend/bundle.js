(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
exports.__esModule = true;
var postFunction_1 = require("./tsFiles/postFunction");
var intitialLoad_1 = require("./tsFiles/intitialLoad");
var authorPost = document.querySelector('.author-post');
var titlePost = document.querySelector('.title-post');
var contentPost = document.querySelector('.content-post');
var inputFields = [authorPost, titlePost, contentPost];
var subButton = document.querySelector('.button-submit');
window.addEventListener('load', function () {
    intitialLoad_1["default"]();
});
subButton.addEventListener('click', function () {
    postFunction_1["default"](inputFields);
});

},{"./tsFiles/intitialLoad":3,"./tsFiles/postFunction":4}],2:[function(require,module,exports){
"use strict";
exports.__esModule = true;
var Post = /** @class */ (function () {
    function Post(postObject) {
        this.postInput = postObject;
    }
    Post.prototype.createPostDivs = function () {
        this.postSlot = document.createElement('div');
        this.postAuthor = document.createElement('div');
        this.postDate = document.createElement('div');
        this.postMisc = document.createElement('div');
        this.postTitle = document.createElement('div');
        this.postContent = document.createElement('div');
    };
    Post.prototype.assignClasses = function () {
        this.postTitle.classList.add('posted-title');
        this.postAuthor.classList.add('posted-author');
        this.postDate.classList.add('posted-date');
        this.postMisc.classList.add('posted-misc');
        this.postContent.classList.add('posted-content');
        this.postSlot.classList.add('posted-slot');
    };
    Post.prototype.fillPost = function () {
        this.postAuthor.innerHTML = "Posted by: " + this.postInput.author;
        this.postDate.innerHTML = "On: " + this.postInput.date;
        this.postTitle.innerHTML = this.postInput.title;
        this.postContent.innerHTML = this.postInput.content;
    };
    Post.prototype.creatStructure = function () {
        this.postSlot.appendChild(this.postTitle);
        this.postSlot.appendChild(this.postContent);
        this.postMisc.appendChild(this.postAuthor);
        this.postMisc.appendChild(this.postDate);
        this.postSlot.appendChild(this.postMisc);
    };
    Post.prototype.makePost = function () {
        this.createPostDivs();
        this.assignClasses();
        this.fillPost();
        this.creatStructure();
        return this.postSlot;
    };
    return Post;
}());
exports["default"] = Post;

},{}],3:[function(require,module,exports){
"use strict";
exports.__esModule = true;
var PostClass_1 = require("./PostClass");
function initialPost(postObject) {
    var newPost = new PostClass_1["default"](postObject);
    var postedMain = document.querySelector('.posted-main');
    var mainChilds = document.querySelectorAll('.posted-slot');
    postedMain.insertBefore(newPost.makePost(), mainChilds[0]);
}
function initialLoad() {
    var newReq = new XMLHttpRequest();
    newReq.onreadystatechange = function () {
        if (newReq.readyState === 4 && newReq.status === 200) {
            var posts = newReq.response;
            var parsed = JSON.parse(posts);
            for (var _i = 0, parsed_1 = parsed; _i < parsed_1.length; _i++) {
                var p = parsed_1[_i];
                initialPost(p);
            }
        }
    };
    newReq.open('GET', '/api/posts');
    newReq.send();
}
exports["default"] = initialLoad;

},{"./PostClass":2}],4:[function(require,module,exports){
"use strict";
exports.__esModule = true;
var PostClass_1 = require("./PostClass");
var sendPost_1 = require("./sendPost");
var toggleErrorClass_1 = require("./toggleErrorClass");
var scrollToPost_1 = require("./scrollToPost");
function postBlog(inputs) {
    var emptyField = [];
    inputs.forEach(function (input) {
        if (input.parentElement.classList.contains('err')) {
            toggleErrorClass_1["default"](input);
        }
        if (input.value === '') {
            emptyField.push(input);
        }
    });
    if (emptyField.length !== 0) {
        emptyField.forEach(function (input) {
            if (!input.parentElement.classList.contains('err')) {
                toggleErrorClass_1["default"](input);
            }
        });
    }
    else {
        var newPostInput = {
            author: inputs[0].value,
            title: inputs[1].value,
            content: inputs[2].value,
            date: new Date().toLocaleString().split(',')[0]
        };
        sendPost_1["default"](newPostInput);
        var newPost = new PostClass_1["default"](newPostInput);
        var postedMain = document.querySelector('.posted-main');
        var mainChilds = document.querySelectorAll('.posted-slot');
        var newPostSlot = newPost.makePost();
        postedMain.insertBefore(newPostSlot, mainChilds[0]);
        scrollToPost_1["default"](newPostSlot);
        inputs.forEach(function (input) {
            input.value = '';
            if (input.parentElement.classList.contains('err')) {
                toggleErrorClass_1["default"](input);
            }
        });
    }
}
exports["default"] = postBlog;

},{"./PostClass":2,"./scrollToPost":5,"./sendPost":6,"./toggleErrorClass":7}],5:[function(require,module,exports){
"use strict";
exports.__esModule = true;
function scrollToPost(post) {
    var headerHeight = 50;
    var screenHalf = window.screen.height / 2;
    var y = post.getBoundingClientRect().top + window.scrollY - headerHeight - screenHalf;
    window.scroll({
        top: y,
        behavior: 'smooth'
    });
}
exports["default"] = scrollToPost;

},{}],6:[function(require,module,exports){
"use strict";
exports.__esModule = true;
function sendPostToServer(postObject) {
    var postReq = new XMLHttpRequest();
    postReq.open('POST', '/api/addpost', true);
    postReq.setRequestHeader('Content-Type', 'application/json');
    postReq.send(JSON.stringify(postObject));
    postReq.onload = function () {
        if (postReq.status !== 202) {
            alert('There was an problem, please try again.');
        }
    };
}
exports["default"] = sendPostToServer;

},{}],7:[function(require,module,exports){
"use strict";
exports.__esModule = true;
function toggleErr(input) {
    input.parentElement.classList.toggle('err');
    var labelEl = document.querySelector("label[for=" + input.name + "]");
    labelEl.parentElement.classList.toggle('err');
}
exports["default"] = toggleErr;

},{}]},{},[1]);
