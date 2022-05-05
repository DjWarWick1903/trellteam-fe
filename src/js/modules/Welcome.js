function toLogin() {
    document.choice_form.action = "Login.html";
    return true;
}

function toRegister() {
    document.choice_form.action = "Login.html";
    return true;
}

module.exports.toLogin = toLogin;
module.exports.toRegister = toRegister;