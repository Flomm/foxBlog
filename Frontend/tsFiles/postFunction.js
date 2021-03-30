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
            timestamp: Math.floor(new Date().getTime() / 1000)
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
