(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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
exports["default"] = GeneralPost;

},{}],2:[function(require,module,exports){
"use strict";
exports.__esModule = true;
var GeneralPost_1 = require("../Classes/GeneralPost");
function initialPost(postObject) {
    var newPost = new GeneralPost_1["default"](postObject);
    var postedMain = document.querySelector('.posted-main');
    var mainChilds = document.querySelectorAll('.posted-slot');
    postedMain.insertBefore(newPost.makePost(), mainChilds[0]);
}
function visitorPostLoad() {
    var newReq = new XMLHttpRequest();
    newReq.onload = function () {
        if (newReq.status === 200) {
            var posts = newReq.response;
            var parsed = JSON.parse(posts);
            for (var _i = 0, parsed_1 = parsed; _i < parsed_1.length; _i++) {
                var p = parsed_1[_i];
                initialPost(p);
            }
        }
        else {
            alert('There was a problem with the server. Please try again later.');
        }
    };
    newReq.open('GET', '/api/posts/visitor');
    newReq.send();
}
exports["default"] = visitorPostLoad;

},{"../Classes/GeneralPost":1}],3:[function(require,module,exports){
"use strict";
exports.__esModule = true;
var visitorPostLoad_1 = require("./tsFiles/functions/visitorPostLoad");
window.addEventListener('load', function () {
    visitorPostLoad_1["default"]();
});

},{"./tsFiles/functions/visitorPostLoad":2}]},{},[3]);
