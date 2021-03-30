window.onload = function () {
    var form = document.querySelector('form');
    form.addEventListener('submit', function (event) {
        event.preventDefault();
        var inputs = Array.from(form.querySelectorAll('input'));
        checkLogin(inputs);
    });
};
function toggleErr(input) {
    var labelEl = document.querySelector("label[for=" + input.name + "]");
    labelEl.classList.toggle('err');
}
function checkLogin(inputs) {
    var emptyField = [];
    inputs.forEach(function (input) {
        var labelEl = document.querySelector("label[for=" + input.name + "]");
        if (labelEl.classList.contains('err')) {
            labelEl.classList.toggle('err');
        }
        if (input.value === '') {
            emptyField.push(input);
        }
    });
    if (emptyField.length !== 0) {
        emptyField.forEach(function (input) {
            var labelEl = document.querySelector("label[for=" + input.name + "]");
            labelEl.classList.toggle('err');
            if (!labelEl.classList.contains('err')) {
                labelEl.classList.toggle('err');
            }
        });
    }
    else {
        var loginInput = document.querySelector('form').elements[0];
        var userName_1 = loginInput.value;
        var xhr_1 = new XMLHttpRequest();
        xhr_1.open('GET', '/api/login', true);
        xhr_1.setRequestHeader('user', userName_1);
        xhr_1.send();
        xhr_1.onload = function () {
            if (xhr_1.status === 404) {
                alert('Error');
                return;
            }
            if (xhr_1.status === 401) {
                alert('No such user');
                return;
            }
            if (xhr_1.status === 200) {
                window.localStorage.setItem('user', userName_1);
                window.location.replace('./profile');
            }
        };
    }
}
