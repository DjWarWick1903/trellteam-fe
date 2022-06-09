window.sessionStorage.clear();

window.isRegistered();
document.getElementById("Login").addEventListener('click', async function (e) {
    const login = window.executeLogin;
    const verifyCredentials = window.verifyCredentials;

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const form = document.getElementById("LoginForm");

    const isLoggedIn = verifyCredentials(username, password) ? await login(username, password) : 1;

    if(isLoggedIn != 200) {
        e.preventDefault();
    } else {
        e.preventDefault();
        form.action = 'MainPage.html';
        form.method = 'post';
        form.submit();
    }
});
document.getElementById("Return").addEventListener('click', function (e) {
    const form = document.getElementById("LoginForm");
    e.preventDefault();
    form.action = 'Welcome.html';
    form.method = 'post';
    form.submit();
});