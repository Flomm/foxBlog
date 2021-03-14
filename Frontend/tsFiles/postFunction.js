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
