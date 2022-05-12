// Javascript script which will be bundled and used inside the Register.html page.

const helperModule = require('./modules/Helper.js');
const securityModule = require('./modules/Security.js');

function verifyOrganisationDetails(name, sign, cui, domain, alertPlaceholder) {
    if (helperModule.verifyInputIsEmpty(name)) {
        helperModule.showAlert('Please specify the name of the organisation.', 'danger', alertPlaceholder);
        return false;
    }

    if (helperModule.verifyInputIsEmpty(sign)) {
        helperModule.showAlert('Please specify the sign of the organisation.', 'danger', alertPlaceholder);
        return false;
    }

    if (helperModule.verifyInputIsEmpty(cui)) {
        helperModule.showAlert('Please specify the CUI of the organisation.', 'danger', alertPlaceholder);
        return false;
    }

    if (helperModule.verifyInputIsEmpty(domain)) {
        helperModule.showAlert('Please specify the domain of the organisation.', 'danger', alertPlaceholder);
        return false;
    }

    return true;
}

function verifyEmployeeDetails(firstName, lastName, phone, cnp, bday, alertPlaceholder) {
    if (helperModule.verifyInputIsEmpty(firstName)) {
        helperModule.showAlert('Please specify the first name of the admin employee.', 'danger', alertPlaceholder);
        return false;
    }

    if (helperModule.verifyInputIsEmpty(lastName)) {
        helperModule.showAlert('Please specify the last name of the admin employee.', 'danger', alertPlaceholder);
        return false;
    }

    if (helperModule.verifyInputIsEmpty(phone)) {
        helperModule.showAlert('Please specify the phone of the admin employee.', 'danger', alertPlaceholder);
        return false;
    }

    if (helperModule.verifyInputIsEmpty(cnp)) {
        helperModule.showAlert('Please specify the cnp of the admin employee.', 'danger', alertPlaceholder);
        return false;
    }

    if (helperModule.verifyInputIsEmpty(bday)) {
        helperModule.showAlert('Please specify the birthday of the admin employee.', 'danger', alertPlaceholder);
        return false;
    }

    return true;
}

function verifyAccountDetails(email, username, password, confirm, alertPlaceholder) {
    if (helperModule.verifyInputIsEmpty(email)) {
        helperModule.showAlert('Please set an email for the admin account.', 'danger', alertPlaceholder);
        return false;
    }

    if (helperModule.verifyInputIsEmpty(username)) {
        helperModule.showAlert('Please set an username for the admin account.', 'danger', alertPlaceholder);
        return false;
    }

    if (helperModule.verifyInputIsEmpty(password)) {
        helperModule.showAlert('Please set a password for the admin account.', 'danger', alertPlaceholder);
        return false;
    }

    if (helperModule.verifyInputIsEmpty(confirm)) {
        helperModule.showAlert('Please confirm the password for the admin account.', 'danger', alertPlaceholder);
        return false;
    }

    if (password != confirm) {
        helperModule.showAlert('The password confirmation does not match with the chosen password!', 'danger', alertPlaceholder);
        return false;
    }

    return true;
}

function verifyData() {
    const alertPlaceholder = document.getElementById('errorAlertPlaceholder');

    // Organisation
    const name = document.getElementById('OrgName').value;
    const sign = document.getElementById('sign').value;
    const cui = document.getElementById('cui').value;
    const domain = document.getElementById('Domain').value;

    if(!verifyOrganisationDetails(name, sign, cui, domain, alertPlaceholder)) return false;

    // Department
    const depName = document.getElementById('DepName').value;
    if(helperModule.verifyInputIsEmpty(depName)) {
        helperModule.showAlert('Please specify the name of the department.', 'danger', alertPlaceholder);
        return false;
    }

    // Employee
    const firstName = document.getElementById('FirstName').value;
    const lastName = document.getElementById('LastName').value;
    const phone = document.getElementById('Phone').value;
    const cnp = document.getElementById('cnp').value
    const bday = document.getElementById('bday').value;

    if(!verifyEmployeeDetails(firstName, lastName, phone, cnp, bday, alertPlaceholder)) return false;

    // Account
    const email = document.getElementById('email').value;
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const confirm = document.getElementById('confirm').value;

    if(!verifyAccountDetails(email, username, password, confirm, alertPlaceholder)) return false;

    const employee = {
        firstName,
        lastName,
        phone,
        cnp,
        bday
    };

    const organisation = {
        name,
        sign,
        cui,
        domain
    };

    const account = {
        email,
        username,
        password
    };

    return {
        organisation,
        depName,
        employee,
        account
    }
}

async function executeRegister(registerData) {
    console.log('Registering data...');

    const response = await securityModule.requestRegister(registerData);

    if(response.status != 201) {
        const alertPlaceholder = document.getElementById('errorAlertPlaceholder');
        helperModule.showAlert("There was an error in the register process. Please try again.", 'danger', alertPlaceholder);
    }

    return response.status;
}

global.window.verifyData = verifyData;
global.window.executeRegister = executeRegister;