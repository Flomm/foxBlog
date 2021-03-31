var form = document.querySelector('form');
var checkBox = document.querySelector('.check');
var loginInput = document.querySelector('form').elements[0];
var pwInput = document.querySelector('form').elements[1];
window.onload = function () {
    form.addEventListener('submit', function (event) {
        event.preventDefault();
        var inputs = Array.from(form.querySelectorAll('input:not(.check)'));
        checkLogin(inputs);
    });
    window.addEventListener('keydown', function (e) {
        if (e.code === 'Enter')
            form.submit();
    });
    checkBox.addEventListener('change', function () {
        if (pwInput.type === 'password') {
            pwInput.type = 'text';
        }
        else {
            pwInput.type = 'password';
        }
    });
};
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
        var userName_1 = loginInput.value;
        var pw = pwInput.value;
        var xhr_1 = new XMLHttpRequest();
        xhr_1.open('GET', '/api/login', true);
        xhr_1.setRequestHeader('user', userName_1);
        xhr_1.setRequestHeader('password', pw);
        xhr_1.send();
        xhr_1.onload = function () {
            if (xhr_1.status === 404) {
                alert('There is a problem with the server. Please try again later.');
                return;
            }
            if (xhr_1.status === 401) {
                alert('Invalid login or password.');
                loginInput.value = '';
                pwInput.value = '';
                return;
            }
            if (xhr_1.status === 200) {
                window.localStorage.setItem('user', userName_1);
                window.location.replace('./profile');
            }
        };
    }
}
