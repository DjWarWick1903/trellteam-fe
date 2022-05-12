// Javascript script which will be bundled and used inside the Login.html page.
const securityModule = require('./modules/Security');
const helperModule = require('./modules/Helper.js');

async function executeLogin(username, password) {
    console.log('Logging in...');
    console.log(username);
    console.log(password);

    const response = await securityModule.requestLogin(username, password);
    console.log(response);

    if(response.status == 200) {
        global.window.sessionStorage.setItem('access_token', response.accessToken);
        global.window.sessionStorage.setItem('refresh_token', response.refreshToken);
    } else {
        const alertPlaceholder = document.getElementById('errorAlertPlaceholder');
        helperModule.showAlert("There was an error logging in. Please try again.", 'danger', alertPlaceholder);
    }

    return response.status;
}

function verifyCredentials(username, password) {
    const alertPlaceholder = document.getElementById('errorAlertPlaceholder');

    if(helperModule.verifyInputIsEmpty(username)) {
        helperModule.showAlert("Please insert a valid username.", 'danger', alertPlaceholder);
        return false;
    }

    if(helperModule.verifyInputIsEmpty(password)) {
        helperModule.showAlert("Please insert a valid password.", 'danger', alertPlaceholder);
        return false;
    }

    return true;
}

function isRegistered() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    if(urlParams.has('registered')) {
        const alertPlaceholder = document.getElementById('errorAlertPlaceholder');
        helperModule.showAlert("Your organisation has been registered. Please log in.", 'success', alertPlaceholder);
    }
}

global.window.verifyCredentials = verifyCredentials;
global.window.executeLogin = executeLogin;
global.window.isRegistered = isRegistered;