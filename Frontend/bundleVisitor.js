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
        this.titleText = document.createElement('span');
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
        this.titleText.textContent = this.postInput.title;
        this.postContent.textContent = this.postInput.content;
        this.likeBarP.textContent = "Score: " + this.postInput.score;
    };
    GeneralPost.prototype.createStructure = function () {
        this.postTitle.appendChild(this.titleText);
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
function visitorInitiatePost(postObject, postedMain) {
    var newPost = new GeneralPost_1["default"](postObject);
    var mainChilds = document.querySelectorAll('.posted-slot');
    postedMain.insertBefore(newPost.makePost(), mainChilds[0]);
}
exports["default"] = visitorInitiatePost;

},{"../Classes/GeneralPost":1}],3:[function(require,module,exports){
"use strict";
exports.__esModule = true;
var visitorInitiatePost_1 = require("./visitorInitiatePost");
var postedMain = document.querySelector('.posted-body');
function visitorPostLoad(orderBy) {
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
        if (xhr.status !== 200) {
            alert("" + JSON.parse(xhr.response).message);
        }
        else {
            var parsed = JSON.parse(xhr.response);
            postedMain.innerHTML = '';
            for (var _i = 0, parsed_1 = parsed; _i < parsed_1.length; _i++) {
                var p = parsed_1[_i];
                visitorInitiatePost_1["default"](p, postedMain);
            }
        }
    };
    xhr.open('GET', '/api/posts/visitor');
    xhr.setRequestHeader('sort', orderBy.split(' ')[0]);
    var order = orderBy.split(' ')[1] !== '0' ? true : false;
    xhr.setRequestHeader('order', JSON.stringify(order));
    xhr.send();
}
exports["default"] = visitorPostLoad;

},{"./visitorInitiatePost":2}],4:[function(require,module,exports){
"use strict";
exports.__esModule = true;
var visitorPostLoad_1 = require("./tsFiles/functions/visitorPostLoad");
var selector = document.querySelector('select');
var sortForm = document.querySelector('.sort-form');
window.addEventListener('load', function () {
    visitorPostLoad_1["default"]('timestamp ASC');
});
sortForm.addEventListener('submit', function (ev) {
    ev.preventDefault();
    visitorPostLoad_1["default"](selector.value);
});
selector.addEventListener('change', function () {
    selector.blur();
    sortForm.requestSubmit();
});

},{"./tsFiles/functions/visitorPostLoad":3}]},{},[4]);
