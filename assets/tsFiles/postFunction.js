"use strict";
exports.__esModule = true;
exports.postBlog = void 0;
var PostClass_1 = require("./PostClass");
function toggleErr(input) {
    input.parentElement.classList.toggle('err');
    var labelEl = document.querySelector("label[for=" + input.name + "]");
    labelEl.parentElement.classList.toggle('err');
}
function postBlog(inputs) {
    var emptyField = [];
    inputs.forEach(function (input) {
        if (input.parentElement.classList.contains('err')) {
            toggleErr(input);
        }
        if (input.value === '') {
            emptyField.push(input);
        }
    });
    if (emptyField.length !== 0) {
        emptyField.forEach(function (input) {
            if (!input.parentElement.classList.contains('err')) {
                toggleErr(input);
            }
        });
    }
    else {
        var datePost = new Date().toLocaleString().split(',')[0];
        var newPost = new PostClass_1.Post(inputs[0].value, inputs[1].value, inputs[2].value, datePost);
        var postedMain = document.querySelector('.posted-main');
        var mainChilds = document.querySelectorAll('.posted-slot');
        postedMain.insertBefore(newPost.makePost(), mainChilds[0]);
        inputs.forEach(function (input) {
            input.value = '';
            if (input.parentElement.classList.contains('err')) {
                toggleErr(input);
            }
        });
    }
}
exports.postBlog = postBlog;
