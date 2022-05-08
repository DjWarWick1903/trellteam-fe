const loginModule = require('./modules/Login.js');

async function executeLogin(username, password) {
    console.log('Logging in...');
    console.log(username);
    console.log(password);

    const response = await loginModule.requestLogin(username, password);
    console.log(response);

    if(response.status == 200) {
        global.window.sessionStorage.setItem('access_token', response.accessToken);
        global.window.sessionStorage.setItem('refresh_token', response.refreshToken);
    }

    return response.status;
}

function verifyCredentials(username, password, errorInput) {
    if(username == null || username == '') {
        errorInput.innerText = "Please insert a valid username.";
        return false;
    }

    if(password == null || password == '') {
        errorInput.innerText = "Please insert a valid password.";
        return false;
    }

    return true;
}

global.window.verifyCredentials = verifyCredentials;
global.window.executeLogin = executeLogin;
