// Javascript script which will be bundled and used inside the Welcome.html page.

const helperModule = require("./modules/Helper");

function toLogin() {
    document.choice_form.action = "Login.html";
    document.choice_form.method = "post";
    document.choice_form.submit();
}

function toRegister() {
    document.choice_form.action = "Register.html";
    document.choice_form.method = "post";
    document.choice_form.submit();
}

global.window.toLogin = toLogin;
global.window.toRegister = toRegister;