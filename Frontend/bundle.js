(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
exports.__esModule = true;
var postFunction_1 = require("./tsFiles/postFunction");
var intitialLoad_1 = require("./tsFiles/intitialLoad");
var inputForm = document.querySelector('#post-form');
var inputFields = Array.from(inputForm.querySelectorAll('input, textarea'));
window.addEventListener('load', function () {
    intitialLoad_1["default"]();
});
inputForm.addEventListener('submit', function (event) {
    event.preventDefault();
    postFunction_1["default"](inputFields);
});

},{"./tsFiles/intitialLoad":4,"./tsFiles/postFunction":5}],2:[function(require,module,exports){
"use strict";
exports.__esModule = true;
var scrollToPost_1 = require("./scrollToPost");
var GeneralPostClass_1 = require("./GeneralPostClass");
function frontEndInsert(newPostInput) {
    var newPost = new GeneralPostClass_1["default"](newPostInput);
    var postedMain = document.querySelector('.posted-main');
    var mainChilds = document.querySelectorAll('.posted-slot');
    var newPostSlot = newPost.makePost();
    postedMain.insertBefore(newPostSlot, mainChilds[0]);
    scrollToPost_1["default"](newPostSlot);
}
exports["default"] = frontEndInsert;

},{"./GeneralPostClass":3,"./scrollToPost":6}],3:[function(require,module,exports){
"use strict";
exports.__esModule = true;
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
        this.postDate.textContent = "On: " + this.postInput.date;
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
exports["default"] = GeneralPost;

},{}],4:[function(require,module,exports){
"use strict";
exports.__esModule = true;
var GeneralPostClass_1 = require("./GeneralPostClass");
function initialPost(postObject) {
    var newPost = new GeneralPostClass_1["default"](postObject);
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

},{"./GeneralPostClass":3}],5:[function(require,module,exports){
"use strict";
exports.__esModule = true;
var sendPost_1 = require("./sendPost");
var toggleErrorClass_1 = require("./toggleErrorClass");
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
        inputs.forEach(function (input) {
            input.value = '';
            if (input.parentElement.classList.contains('err')) {
                toggleErrorClass_1["default"](input);
            }
        });
    }
}
exports["default"] = postBlog;

},{"./sendPost":7,"./toggleErrorClass":8}],6:[function(require,module,exports){
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

},{}],7:[function(require,module,exports){
"use strict";
exports.__esModule = true;
var FrontEndInsert_1 = require("./FrontEndInsert");
function sendPostToServer(postObject) {
    var postReq = new XMLHttpRequest();
    postReq.open('POST', '/api/addpost', true);
    postReq.setRequestHeader('Content-Type', 'application/json');
    postReq.send(JSON.stringify(postObject));
    postReq.onload = function () {
        if (postReq.status !== 202) {
            alert('There was an problem, please try again.');
        }
        var newPost = postReq.response.body;
        FrontEndInsert_1["default"](newPost);
    };
}
exports["default"] = sendPostToServer;

},{"./FrontEndInsert":2}],8:[function(require,module,exports){
"use strict";
exports.__esModule = true;
function toggleErr(input) {
    input.parentElement.classList.toggle('err');
    var labelEl = document.querySelector("label[for=" + input.name + "]");
    labelEl.parentElement.classList.toggle('err');
}
exports["default"] = toggleErr;

},{}]},{},[1]);
