const securityModule = require("./Security");

function showAlert(message, type, alertPlaceholder) {
    const alertHTML = `
        <div class="alert alert-${type} alert-dismissible" role="alert">
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
    `;
    alertPlaceholder.innerHTML = alertHTML;
}

function verifyInputIsEmpty(input) {
    if(input == null || input == '') {
        return true;
    }

    return false;
}

async function redirectToLogin(tokens) {
    //console.log(tokens);
    if(tokens == null || tokens.accessToken == null || tokens.refreshToken == null) {
        global.window.location.replace("Login.html");
        return false;
    }

    const pingResult = await securityModule.ping(tokens);
    if(pingResult == null) {
        global.window.location.replace("Login.html");
        return false;
    } else {
        global.window.sessionStorage.setItem('accessToken', pingResult.accessToken);
        global.window.sessionStorage.setItem('refreshToken', pingResult.refreshToken);
        return pingResult;
    }
}

function intersect(a, b) {
    const setA = new Set(a);
    const setB = new Set(b);
    const intersection = new Set([...setA]).filter(x => setB.has(x));
    return Array.from(intersection);
}

function difference(a, b) {
    const setA = new Set(a);
    const setB = new Set(b);
    const difference = new Set([...setA]).filter(x => !setB.has(x));
}

module.exports.redirectToLogin = redirectToLogin;
module.exports.showAlert = showAlert;
module.exports.verifyInputIsEmpty = verifyInputIsEmpty;
module.exports.intersect = intersect;
module.exports.difference = difference;