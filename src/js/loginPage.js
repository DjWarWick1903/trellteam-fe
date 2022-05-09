// Javascript script which will be bundled and used inside the Login.html page.
const loginModule = require('./modules/Login.js');

function alert(message, type) {
    const alertPlaceholder = document.getElementById('errorAlertPlaceholder');
    alertPlaceholder.innerHTML = '<div class="alert alert-' + type + ' alert-dismissible" role="alert">' + message + '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>';
}

async function executeLogin(username, password) {
    console.log('Logging in...');
    console.log(username);
    console.log(password);

    const response = await loginModule.requestLogin(username, password);
    console.log(response);

    if(response.status == 200) {
        global.window.sessionStorage.setItem('access_token', response.accessToken);
        global.window.sessionStorage.setItem('refresh_token', response.refreshToken);
    } else {
        alert("There was an error logging in. Please try again.", 'danger');
    }

    return response.status;
}

function verifyCredentials(username, password) {
    if(username == null || username == '') {
        alert("Please insert a valid username.", 'danger');
        return false;
    }

    if(password == null || password == '') {
        alert("Please insert a valid password.", 'danger');
        return false;
    }

    return true;
}

global.window.verifyCredentials = verifyCredentials;
global.window.executeLogin = executeLogin;
