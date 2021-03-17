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
