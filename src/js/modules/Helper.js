const securityModule = require("./SecurityDB");

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

function employeesUnion(orgEmployees, depEmployees) {
    let employees = orgEmployees.filter(employee => !depEmployees.includes(employee));

    return [...employees, ...depEmployees];
}

function employeeDifference(orgEmployees, depEmployees, assigned) {
    let employees = [];
    for(const orgEmp of orgEmployees) {
        let isAssigned = false;
        for(const depEmp of depEmployees) {
            if(depEmp.id == orgEmp.id) {
                isAssigned = true;
                break;
            }
        }

        if(assigned == true && isAssigned == true) {
            employees = employees.concat(orgEmp);
        }

        if(assigned == false && isAssigned == false) {
            employees = employees.concat(orgEmp);
        }
    }

    return employees;
}

function rolesDifference(accountRoles, allRoles) {
    let roles = [];
    for(const role of allRoles) {
        let isAssigned = false;
        for(const aRole of accountRoles) {
            if(aRole.id == role.id) {
                isAssigned = true;
                break;
            }
        }

        if(isAssigned == false) {
            roles = roles.concat(role);
        }
    }

    return roles;
}

function getElementsByIdStartsWith(container, selectorTag, prefix) {
    let items = [];
    let myPosts = document.getElementById('rolesBody')
    for(let i = 0; i < myPosts.length; i++) {
        if(myPosts[i].id.lastIndexOf(prefix, 0) === 0) {
            items.push(myPosts[i]);
        }
    }
    return items;
}

function checkIfAdmin(roles) {
    roles = roles.includes(',') ? roles.split(',') : roles;
    var isArray = Array.isArray(roles);
    let isAdmin = false;
    if(isArray) {
        for(const role of roles) {
            if(role == "ADMIN" || role == "MANAGER") {
                isAdmin = true;
                break;
            }
        }
    } else {
        if(roles == "ADMIN" || roles == "MANAGER") {
            isAdmin = true;
        }
    }

    return isAdmin;
}

function checkIfDevOps(roles) {
    roles = roles.includes(',') ? roles.split(',') : roles;
    var isArray = Array.isArray(roles);
    let isDevOps = false;
    if(isArray) {
        for(const role of roles) {
            if(role == "DEVOPS") {
                isDevOps = true;
                break;
            }
        }
    } else {
        if(roles == "DEVOPS") {
            isDevOps = true;
        }
    }

    return isDevOps;
}

module.exports.redirectToLogin = redirectToLogin;
module.exports.showAlert = showAlert;
module.exports.verifyInputIsEmpty = verifyInputIsEmpty;
module.exports.intersect = intersect;
module.exports.difference = difference;
module.exports.employeesUnion = employeesUnion;
module.exports.employeeDifference = employeeDifference;
module.exports.getElementsByIdStartsWith = getElementsByIdStartsWith;
module.exports.rolesDifference = rolesDifference;
module.exports.checkIfAdmin = checkIfAdmin;
module.exports.checkIfDevOps = checkIfDevOps;