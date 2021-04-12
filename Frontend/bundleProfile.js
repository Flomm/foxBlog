(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
exports.__esModule = true;
var showAccData_1 = require("./tsFiles/functions/showAccData");
var loadPosts_1 = require("./tsFiles/functions/loadPosts");
var addPostForm_1 = require("./tsFiles/functions/addPostForm");
var userName = window.localStorage.getItem('user');
var welcomeMessage = document.querySelector('.welcome');
var accBtn = document.querySelector('.account-btn');
var myPostsBtn = document.querySelector('.my-posts-btn');
var addBtn = document.querySelector('.add-btn');
var logoutBtn = document.querySelector('.logout-btn');
var main = document.querySelector('.main');
welcomeMessage.textContent = "Hello " + userName;
accBtn.addEventListener('click', function () {
    main.innerHTML = '';
    showAccData_1["default"]();
});
myPostsBtn.addEventListener('click', function () {
    main.innerHTML = '';
    loadPosts_1["default"]('myPosts');
});
addBtn.addEventListener('click', function () {
    main.innerHTML = '';
    addPostForm_1["default"]();
    loadPosts_1["default"]('');
});
logoutBtn.addEventListener('click', function () {
    window.localStorage.setItem('user', '');
    window.location.replace('./');
});

},{"./tsFiles/functions/addPostForm":6,"./tsFiles/functions/loadPosts":11,"./tsFiles/functions/showAccData":16}],2:[function(require,module,exports){
"use strict";
exports.__esModule = true;
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
exports["default"] = AccInfoDiv;

},{}],3:[function(require,module,exports){
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

},{}],4:[function(require,module,exports){
"use strict";
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
exports.__esModule = true;
var GeneralPost_1 = require("./GeneralPost");
var formIsValid_1 = require("../functions/formIsValid");
var setAttributes_1 = require("../functions/setAttributes");
var attributeObjects_1 = require("../other/attributeObjects");
var PersonalPost = /** @class */ (function (_super) {
    __extends(PersonalPost, _super);
    function PersonalPost(postObject) {
        var _this = _super.call(this, postObject) || this;
        _this.showConfirmBox = _this.showConfirmBox.bind(_this);
        _this.showEditBox = _this.showEditBox.bind(_this);
        _this.xhrCall = _this.xhrCall.bind(_this);
        return _this;
    }
    PersonalPost.prototype.showConfirmBox = function () {
        var _this = this;
        var wrapper = document.querySelector('.main');
        var confirmBox = document.createElement('div');
        confirmBox.classList.add('confirm-box');
        var newP1 = document.createElement('p');
        newP1.textContent = 'Are you sure you want to delete the post?';
        var newP2 = document.createElement('p');
        var yesBtn = document.createElement('button');
        yesBtn.classList.add('yes-btn');
        yesBtn.textContent = 'YES';
        var noBtn = document.createElement('button');
        yesBtn.classList.add('no-btn');
        noBtn.textContent = 'NO';
        newP2.appendChild(yesBtn);
        newP2.appendChild(noBtn);
        confirmBox.appendChild(newP1);
        confirmBox.appendChild(newP2);
        yesBtn.addEventListener('click', function () {
            document.querySelector('body').removeChild(confirmBox);
            wrapper.classList.remove('shady');
            _this.xhrCall('DELETE', "/api/posts/" + _this.postInput.id);
        });
        noBtn.addEventListener('click', function () {
            document.querySelector('body').removeChild(confirmBox);
            wrapper.classList.remove('shady');
        });
        document.querySelector('body').insertBefore(confirmBox, wrapper);
        wrapper.classList.add('shady');
    };
    PersonalPost.prototype.showEditBox = function () {
        var _this = this;
        var wrapper = document.querySelector('.main');
        var editBox = document.createElement('div');
        editBox.classList.add('edit-box');
        var submitMain = document.createElement('div');
        submitMain.classList.add('submit-main');
        var titleSpan = document.createElement('span');
        titleSpan.textContent = 'Edit post!';
        submitMain.appendChild(titleSpan);
        var editForm = document.createElement('form');
        editForm.setAttribute('id', 'post-form');
        //Input 1
        var labelSlot1 = document.createElement('div');
        labelSlot1.classList.add('label-slot');
        labelSlot1.setAttribute('err-text', ' Please add a title');
        var titleLabel = document.createElement('label');
        titleLabel.setAttribute('for', 'title-post');
        titleLabel.textContent = 'New title';
        labelSlot1.appendChild(titleLabel);
        var titleInpHolder = document.createElement('div');
        titleInpHolder.classList.add('text-area');
        var titleInput = document.createElement('input');
        setAttributes_1["default"](titleInput, attributeObjects_1.titleAttr);
        titleInput.value = this.postInput.title;
        titleInpHolder.appendChild(titleInput);
        //Input2
        var labelSlot2 = document.createElement('div');
        labelSlot2.classList.add('label-slot');
        labelSlot2.setAttribute('err-text', ' Please add content');
        var contentLabel = document.createElement('label');
        contentLabel.setAttribute('for', 'content-post');
        contentLabel.textContent = 'New content';
        labelSlot2.appendChild(contentLabel);
        var contentInpHolder = document.createElement('div');
        contentInpHolder.classList.add('text-area');
        var contentInput = document.createElement('textarea');
        setAttributes_1["default"](contentInput, attributeObjects_1.contentAttr);
        contentInput.value = this.postInput.content;
        contentInpHolder.appendChild(contentInput);
        editForm.appendChild(labelSlot1);
        editForm.appendChild(titleInpHolder);
        editForm.appendChild(labelSlot2);
        editForm.appendChild(contentInpHolder);
        var submitBtn = document.createElement('input');
        submitBtn.classList.add('button-submit');
        submitBtn.setAttribute('type', 'submit');
        submitBtn.value = 'Submit fox';
        editForm.appendChild(submitBtn);
        editForm.addEventListener('submit', function (ev) {
            var inputFields = Array.from(editForm.querySelectorAll('input[type="text"], textarea'));
            ev.preventDefault();
            if (formIsValid_1["default"](inputFields)) {
                _this.xhrCall('PUT', "/api/posts/" + _this.postInput.id);
                document.querySelector('body').removeChild(editBox);
                wrapper.classList.remove('shady');
            }
        });
        var cancelBtn = document.createElement('button');
        cancelBtn.classList.add('cancel-btn');
        cancelBtn.innerText = 'Cancel';
        cancelBtn.addEventListener('click', function () {
            document.querySelector('body').removeChild(editBox);
            wrapper.classList.remove('shady');
        });
        editForm.appendChild(cancelBtn);
        editBox.appendChild(editForm);
        document.querySelector('body').insertBefore(editBox, wrapper);
        wrapper.classList.add('shady');
    };
    PersonalPost.prototype.xhrCall = function (method, endpoint) {
        var _this = this;
        var xhr = new XMLHttpRequest();
        xhr.onload = function () {
            if (xhr.status !== 200) {
                alert("" + JSON.parse(xhr.response).message);
            }
            else {
                if (method === 'DELETE') {
                    var postedMain = document.querySelector('.posted-main');
                    postedMain.removeChild(_this.postSlot);
                }
                else {
                    var response = JSON.parse(xhr.response);
                    _this.postInput.title = response.title;
                    _this.titleText.textContent = _this.postInput.title;
                    _this.postInput.content = response.content;
                    _this.postContent.textContent = _this.postInput.content;
                }
            }
        };
        xhr.open(method, endpoint);
        xhr.setRequestHeader('user', window.localStorage.getItem('user'));
        if (method === 'PUT') {
            var editForm = document.querySelector('form');
            var inputFields = Array.from(editForm.querySelectorAll('input[type="text"], textarea'));
            var editedData = {
                title: inputFields[0].value,
                content: inputFields[1].value
            };
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.send(JSON.stringify(editedData));
        }
        else {
            xhr.send();
        }
    };
    PersonalPost.prototype.addBtn = function (type, callback, span) {
        var newBtn = document.createElement('button');
        newBtn.classList.add(type + "-btn");
        newBtn.addEventListener('click', callback);
        var icon = document.createElement('i');
        icon.classList.add('fas');
        if (type === 'delete') {
            icon.classList.add('fa-trash-alt');
        }
        else {
            icon.classList.add('fa-edit');
        }
        newBtn.appendChild(icon);
        newBtn.setAttribute('data-action', type);
        span.appendChild(newBtn);
    };
    PersonalPost.prototype.makePost = function () {
        this.createPostDivs();
        this.assignClasses();
        this.fillPost();
        this.createStructure();
        var newSpan = document.createElement('span');
        this.addBtn('edit', this.showEditBox, newSpan);
        this.addBtn('delete', this.showConfirmBox, newSpan);
        this.postTitle.appendChild(newSpan);
        return this.postSlot;
    };
    return PersonalPost;
}(GeneralPost_1["default"]));
exports["default"] = PersonalPost;

},{"../functions/formIsValid":8,"../functions/setAttributes":15,"../other/attributeObjects":18,"./GeneralPost":3}],5:[function(require,module,exports){
"use strict";
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
exports.__esModule = true;
var GeneralPost_1 = require("./GeneralPost");
var VotablePost = /** @class */ (function (_super) {
    __extends(VotablePost, _super);
    function VotablePost(postObject) {
        var _this = _super.call(this, postObject) || this;
        _this.boundVote = _this.makeVote.bind(_this);
        return _this;
    }
    VotablePost.prototype.makeVote = function (voteType) {
        var _this = this;
        var xhr = new XMLHttpRequest();
        xhr.onload = function () {
            if (xhr.status !== 200) {
                alert("" + JSON.parse(xhr.response).message);
            }
            else {
                var newPost = JSON.parse(xhr.response);
                _this.postInput.score = newPost.score;
                _this.postInput.vote = newPost.vote;
                _this.likeBarP.textContent = "Score: " + _this.postInput.score;
                _this.toggleLikeStyles();
            }
        };
        xhr.open('PUT', "/api/posts/" + this.postInput.id + "/" + voteType);
        xhr.setRequestHeader('user', window.localStorage.getItem('user'));
        xhr.send();
    };
    VotablePost.prototype.toggleLikeStyles = function () {
        var likeBtns = Array.from(this.likeBar.querySelectorAll('button'));
        var downIcon = likeBtns[0].querySelector('icon');
        var upIcon = likeBtns[1].querySelector('icon');
        if (this.postInput.vote === 0) {
            downIcon.classList.remove('down-vote');
            upIcon.classList.remove('up-vote');
        }
        else if (this.postInput.vote === 1) {
            downIcon.classList.remove('down-vote');
            upIcon.classList.add('up-vote');
        }
        else if (this.postInput.vote === -1) {
            downIcon.classList.add('down-vote');
            upIcon.classList.remove('up-vote');
        }
    };
    VotablePost.prototype.addVoteButtons = function () {
        var _this = this;
        var downVoteBtn = document.createElement('button');
        var upVoteBtn = document.createElement('button');
        var downIcon = document.createElement('icon');
        downIcon.classList.add('fas');
        downIcon.classList.add('fa-thumbs-down');
        var upIcon = document.createElement('icon');
        upIcon.classList.add('fas');
        upIcon.classList.add('fa-thumbs-up');
        downVoteBtn.appendChild(downIcon);
        upVoteBtn.appendChild(upIcon);
        downVoteBtn.addEventListener('click', function () {
            _this.makeVote('downvote');
        });
        if (this.postInput.vote === -1) {
            downIcon.classList.add('down-vote');
        }
        upVoteBtn.addEventListener('click', function () {
            _this.makeVote('upvote');
        });
        if (this.postInput.vote === 1) {
            upIcon.classList.add('up-vote');
        }
        this.likeBar.insertBefore(downVoteBtn, this.likeBar.firstElementChild);
        this.likeBar.appendChild(upVoteBtn);
    };
    VotablePost.prototype.makePost = function () {
        this.createPostDivs();
        this.assignClasses();
        this.fillPost();
        this.createStructure();
        this.addVoteButtons();
        return this.postSlot;
    };
    return VotablePost;
}(GeneralPost_1["default"]));
exports["default"] = VotablePost;

},{"./GeneralPost":3}],6:[function(require,module,exports){
"use strict";
exports.__esModule = true;
var postBlog_1 = require("./postBlog");
var setAttributes_1 = require("./setAttributes");
var attributeObjects_1 = require("../other/attributeObjects");
function addPostForm() {
    var main = document.querySelector('.main');
    var submitMain = document.createElement('div');
    submitMain.classList.add('submit-main');
    var titleSpan = document.createElement('span');
    titleSpan.textContent = 'Add new fox!';
    submitMain.appendChild(titleSpan);
    var addForm = document.createElement('form');
    addForm.setAttribute('id', 'post-form');
    //Input 1
    var labelSlot1 = document.createElement('div');
    labelSlot1.classList.add('label-slot');
    labelSlot1.setAttribute('err-text', ' Please add a title');
    var titleLabel = document.createElement('label');
    titleLabel.setAttribute('for', 'title-post');
    titleLabel.textContent = 'Title';
    labelSlot1.appendChild(titleLabel);
    var titleInpHolder = document.createElement('div');
    titleInpHolder.classList.add('text-area');
    var titleInput = document.createElement('input');
    setAttributes_1["default"](titleInput, attributeObjects_1.titleAttr);
    titleInpHolder.appendChild(titleInput);
    //Input2
    var labelSlot2 = document.createElement('div');
    labelSlot2.classList.add('label-slot');
    labelSlot2.setAttribute('err-text', ' Please add content');
    var contentLabel = document.createElement('label');
    contentLabel.setAttribute('for', 'content-post');
    contentLabel.textContent = 'Content';
    labelSlot2.appendChild(contentLabel);
    var contentInpHolder = document.createElement('div');
    contentInpHolder.classList.add('text-area');
    var contentInput = document.createElement('textarea');
    setAttributes_1["default"](contentInput, attributeObjects_1.contentAttr);
    contentInpHolder.appendChild(contentInput);
    addForm.appendChild(labelSlot1);
    addForm.appendChild(titleInpHolder);
    addForm.appendChild(labelSlot2);
    addForm.appendChild(contentInpHolder);
    addForm.addEventListener('submit', function (ev) {
        ev.preventDefault();
        var inputFields = Array.from(addForm.querySelectorAll('input[type="text"], textarea'));
        postBlog_1["default"](inputFields);
    });
    //Button
    var submitBtn = document.createElement('input');
    submitBtn.classList.add('button-submit');
    submitBtn.setAttribute('type', 'submit');
    submitBtn.value = 'Submit fox';
    addForm.appendChild(submitBtn);
    submitMain.appendChild(addForm);
    main.appendChild(submitMain);
}
exports["default"] = addPostForm;

},{"../other/attributeObjects":18,"./postBlog":12,"./setAttributes":15}],7:[function(require,module,exports){
"use strict";
exports.__esModule = true;
function createSuccessDiv(txt) {
    var notSuccesDiv = document.createElement('div');
    notSuccesDiv.textContent = txt;
    notSuccesDiv.classList.add('data');
    document.querySelector('.main').appendChild(notSuccesDiv);
}
exports["default"] = createSuccessDiv;

},{}],8:[function(require,module,exports){
"use strict";
exports.__esModule = true;
var togglePostError_1 = require("./togglePostError");
function formIsValid(inputs) {
    var invalidFields = [];
    inputs.forEach(function (input) {
        if (input.parentElement.classList.contains('err')) {
            togglePostError_1["default"](input);
        }
        if (input.value.length < 5) {
            invalidFields.push(input);
        }
    });
    if (invalidFields.length !== 0) {
        invalidFields.forEach(function (input) {
            if (!input.parentElement.classList.contains('err')) {
                togglePostError_1["default"](input);
            }
        });
        return false;
    }
    return true;
}
exports["default"] = formIsValid;

},{"./togglePostError":17}],9:[function(require,module,exports){
"use strict";
exports.__esModule = true;
var VotablePost_1 = require("../Classes/VotablePost");
var scrollToPost_1 = require("./scrollToPost");
function frontEndInsert(newPostInput) {
    var newPost = new VotablePost_1["default"](newPostInput);
    var postedMain = document.querySelector('.posted-main');
    var mainChilds = document.querySelectorAll('.posted-slot');
    var newPostSlot = newPost.makePost();
    postedMain.insertBefore(newPostSlot, mainChilds[0]);
    scrollToPost_1["default"](newPostSlot);
}
exports["default"] = frontEndInsert;

},{"../Classes/VotablePost":5,"./scrollToPost":13}],10:[function(require,module,exports){
"use strict";
exports.__esModule = true;
var PersonalPost_1 = require("../Classes/PersonalPost");
var VotablePost_1 = require("../Classes/VotablePost");
function initiatePost(postObject, endP) {
    var postedMain = document.querySelector('.posted-main');
    var mainChilds = document.querySelectorAll('.posted-slot');
    if (endP === 'myPosts') {
        var newPost = new PersonalPost_1["default"](postObject);
        postedMain.insertBefore(newPost.makePost(), mainChilds[0]);
    }
    else {
        var newPost = new VotablePost_1["default"](postObject);
        postedMain.insertBefore(newPost.makePost(), mainChilds[0]);
    }
}
exports["default"] = initiatePost;

},{"../Classes/PersonalPost":4,"../Classes/VotablePost":5}],11:[function(require,module,exports){
"use strict";
exports.__esModule = true;
var initiatePost_1 = require("./initiatePost");
var createSuccessDiv_1 = require("./createSuccessDiv");
var main = document.querySelector('.main');
function loadPosts(endP) {
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
        if (xhr.status !== 200) {
            createSuccessDiv_1["default"]("" + JSON.parse(xhr.response).message);
        }
        else {
            var postedMain = document.createElement('div');
            postedMain.classList.add('posted-main');
            var h2 = document.createElement('h2');
            if (endP === 'myPosts') {
                h2.textContent = 'My posts';
            }
            else {
                h2.textContent = 'Posts';
            }
            postedMain.appendChild(h2);
            main.appendChild(postedMain);
            var parsedPost = JSON.parse(xhr.response);
            for (var _i = 0, parsedPost_1 = parsedPost; _i < parsedPost_1.length; _i++) {
                var p = parsedPost_1[_i];
                initiatePost_1["default"](p, endP);
            }
        }
    };
    xhr.open('GET', "/api/posts/" + endP);
    xhr.setRequestHeader('user', window.localStorage.getItem('user'));
    xhr.send();
}
exports["default"] = loadPosts;

},{"./createSuccessDiv":7,"./initiatePost":10}],12:[function(require,module,exports){
"use strict";
exports.__esModule = true;
var togglePostError_1 = require("./togglePostError");
var formIsValid_1 = require("./formIsValid");
var sendPostToServer_1 = require("./sendPostToServer");
function postBlog(inputs) {
    if (formIsValid_1["default"](inputs)) {
        var newPostInput = {
            author: window.localStorage.getItem('user'),
            title: inputs[0].value,
            content: inputs[1].value,
            timestamp: Math.floor(new Date().getTime() / 1000)
        };
        sendPostToServer_1["default"](newPostInput);
        inputs.forEach(function (input) {
            input.value = '';
            if (input.parentElement.classList.contains('err')) {
                togglePostError_1["default"](input);
            }
        });
    }
}
exports["default"] = postBlog;

},{"./formIsValid":8,"./sendPostToServer":14,"./togglePostError":17}],13:[function(require,module,exports){
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

},{}],14:[function(require,module,exports){
"use strict";
exports.__esModule = true;
var frontendInsert_1 = require("./frontendInsert");
function sendPostToServer(postObject) {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/api/addpost', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(postObject));
    xhr.onload = function () {
        if (xhr.status !== 200) {
            alert("" + JSON.parse(xhr.response).message);
        }
        else {
            var newPost = JSON.parse(xhr.response);
            newPost.author = window.localStorage.getItem('user');
            frontendInsert_1["default"](newPost);
        }
    };
}
exports["default"] = sendPostToServer;

},{"./frontendInsert":9}],15:[function(require,module,exports){
"use strict";
exports.__esModule = true;
function setAttributes(elem, attr) {
    for (var key in attr) {
        elem.setAttribute(key, attr[key]);
    }
}
exports["default"] = setAttributes;

},{}],16:[function(require,module,exports){
"use strict";
exports.__esModule = true;
var AccInfoDiv_1 = require("../Classes/AccInfoDiv");
var main = document.querySelector('.main');
function showAccData() {
    var userName = window.localStorage.getItem('user');
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
        if (xhr.status !== 200) {
            accData = {
                numOfPosts: 'server not found',
                sumScore: 'server not found'
            };
        }
        else {
            accData = JSON.parse(xhr.response);
        }
        var accClass = new AccInfoDiv_1["default"]('Account information', ['Login: ', 'Account type: ', 'Rank: '], [userName, 'normal', 'Fox']);
        var postClass = new AccInfoDiv_1["default"]('Post information', ['Number of posts: ', 'Total score for posts: '], [accData.numOfPosts, accData.sumScore]);
        var accDiv = accClass.createDiv();
        var postDiv = postClass.createDiv();
        dataDiv.appendChild(accDiv);
        dataDiv.appendChild(postDiv);
        main.appendChild(dataDiv);
    };
}
exports["default"] = showAccData;

},{"../Classes/AccInfoDiv":2}],17:[function(require,module,exports){
"use strict";
exports.__esModule = true;
function togglePostError(input) {
    input.parentElement.classList.toggle('err');
    var labelEl = document.querySelector("label[for=" + input.name + "]");
    labelEl.parentElement.classList.toggle('err');
}
exports["default"] = togglePostError;

},{}],18:[function(require,module,exports){
"use strict";
exports.__esModule = true;
exports.contentAttr = exports.titleAttr = void 0;
exports.titleAttr = {
    type: 'text',
    name: 'title-post',
    maxlength: '25',
    size: '25',
    placeholder: 'The name of your favourite fox'
};
exports.contentAttr = {
    type: 'text',
    name: 'content-post',
    maxlength: '1500',
    rows: '10',
    cols: '30',
    placeholder: 'Write something about your favourite fox'
};

},{}]},{},[1]);
