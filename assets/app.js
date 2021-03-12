"use strict";
exports.__esModule = true;
var postFunction_1 = require("./tsFiles/postFunction");
var PostClass_1 = require("./tsFiles/PostClass");
var authorPost = document.querySelector('.author-post');
var titlePost = document.querySelector('.title-post');
var contentPost = document.querySelector('.content-post');
var inputArr = [authorPost, titlePost, contentPost];
function initialPost(obj) {
    var valueList = Object.values(obj);
    var newPost = new PostClass_1.Post(valueList[0], valueList[1], valueList[2], valueList[3]);
    var postedMain = document.querySelector('.posted-main');
    var mainChilds = document.querySelectorAll('.posted-slot');
    postedMain.insertBefore(newPost.makePost(), mainChilds[0]);
}
window.onload = function () {
    var newReq = new XMLHttpRequest();
    newReq.onreadystatechange = function () {
        if (newReq.readyState === 4 && newReq.status === 200) {
            var posts = newReq.response;
            var parsed = JSON.parse(posts);
            console.log(parsed);
            for (var _i = 0, parsed_1 = parsed; _i < parsed_1.length; _i++) {
                var p = parsed_1[_i];
                initialPost(p);
            }
        }
    };
    newReq.open('GET', '/posts', true);
    newReq.send();
};
var subButton = document.querySelector('.button-submit');
subButton.addEventListener('click', function () {
    postFunction_1.postBlog(inputArr);
});
