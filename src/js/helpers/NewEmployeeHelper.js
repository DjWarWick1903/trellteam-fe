const helperModule = require('../modules/Helper.js');
const securityDB = require('../modules/SecurityDB.js');
const organisationDB = require('../modules/OrganisationDB.js');
const employeeDB = require('../modules/EmployeeDB.js');

async function fillRoles(tokens) {
    const response = await securityDB.getRoles(tokens);
    const alertPlaceholder = document.getElementById('errorAlertPlaceholder');

    if(response.status == 200) {
        const rolesSelect = document.getElementById('floatingSelectGrid');
        const roles = response.roles;

        let rolesHTML = `<option value="undefined" id="0" selected>Undefined</option>`;
        for(const role of roles) {
            const roleHTML = `<option value="${role.name}" id="${role.id}">${role.name}</option>`;
            rolesHTML = rolesHTML.concat(roleHTML);
        }

        rolesSelect.innerHTML = rolesHTML;
    } else {
        helperModule.showAlert('Roles could not be fetched because of a server problem.', 'danger', alertPlaceholder);
    }
}

async function fillOrganisationDetails(username, tokens) {
    const response = await organisationDB.getOrganisationByUsername(username, tokens);
    const alertPlaceholder = document.getElementById('errorAlertPlaceholder');

    if(response.status == 200) {
        const domainField = document.getElementById('EmailDomain');
        const domain = response.organisation.domain;
        domainField.value = domain;

        const departmentsField = document.getElementById('depSelect');
        const departments = response.departments;
        let depsHTML = `<option value="undefined" id="0" selected>Undefined</option>`;
        for(const department of departments) {
            const depHTML = `<option value="${department.name}" id="${department.id}">${department.name}</option>`;
            depsHTML = depsHTML.concat(depHTML);
        }

        departmentsField.innerHTML = depsHTML;
    } else {
        helperModule.showAlert('Organisation details could not be fetched because of a server problem.', 'danger', alertPlaceholder);
    }
}

async function createEmployee(account, employee, tokens) {
    if(!verifyEmployeeDetails(account, employee)) {
        return false;
    }

    const response = await employeeDB.createEmployee(account, employee, tokens);
    const alertPlaceholder = document.getElementById('errorAlertPlaceholder');

    if(response.status == 201) {
        helperModule.showAlert('Employee has been created succesfully!', 'success', alertPlaceholder);
        return true;
    } else {
        helperModule.showAlert('Organisation details could not be fetched because of a server problem.', 'danger', alertPlaceholder);
        return false;
    }
}

function verifyEmployeeDetails(account, employee) {
    const alertPlaceholder = document.getElementById('errorAlertPlaceholder');

    if (helperModule.verifyInputIsEmpty(account.username)) {
        helperModule.showAlert('Please specify the username of the account.', 'info', alertPlaceholder);
        return false;
    }

    if (helperModule.verifyInputIsEmpty(account.email)) {
        helperModule.showAlert('Please specify the email of the account.', 'info', alertPlaceholder);
        return false;
    }

    if (helperModule.verifyInputIsEmpty(account.password)) {
        helperModule.showAlert('Please specify the password of the account.', 'info', alertPlaceholder);
        return false;
    }

    if (helperModule.verifyInputIsEmpty(account.confirm)) {
        helperModule.showAlert('Please confirm the password of the account.', 'info', alertPlaceholder);
        return false;
    }

    if(account.confirm != account.password) {
        helperModule.showAlert('The confirmation of the password does not match the password.', 'info', alertPlaceholder);
        return false;
    }

    if (account.roleId == 0) {
        helperModule.showAlert('Please specify the role of the account.', 'info', alertPlaceholder);
        return false;
    }

    if (helperModule.verifyInputIsEmpty(employee.firstName)) {
        helperModule.showAlert('Please specify the first name of the employee.', 'info', alertPlaceholder);
        return false;
    }

    if (helperModule.verifyInputIsEmpty(employee.lastName)) {
        helperModule.showAlert('Please specify the last name of the employee.', 'info', alertPlaceholder);
        return false;
    }

    if (helperModule.verifyInputIsEmpty(employee.phone)) {
        helperModule.showAlert('Please specify the phone number of the employee.', 'info', alertPlaceholder);
        return false;
    }

    if (helperModule.verifyInputIsEmpty(employee.lastName)) {
        helperModule.showAlert('Please specify the birthday of the employee.', 'info', alertPlaceholder);
        return false;
    }

    if (helperModule.verifyInputIsEmpty(employee.lastName)) {
        helperModule.showAlert('Please specify the cnp of the employee.', 'info', alertPlaceholder);
        return false;
    }

    if (employee.depId == 0) {
        helperModule.showAlert('Please specify the department of the employee.', 'info', alertPlaceholder);
        return false;
    }

    return true;
}

function setNavBarAdmin(roles) {
    var isAdmin = helperModule.checkIfAdmin(roles);

    if(isAdmin) {
        const adminNavbar = `
            <ul class="nav navbar-nav me-auto">
                <li><a class="nav-link" href="NewDepartment.html">Add Department</a></li>
                <li><a class="nav-link active" href="NewEmployee.html">Add Employee</a></li>
            </ul>
        `;

        document.getElementById('adminNavBar').innerHTML = adminNavbar;
    }
}

global.window.fillRoles = fillRoles;
global.window.fillOrganisationDetails = fillOrganisationDetails;
global.window.createEmployee = createEmployee;
global.window.setNavBarAdmin = setNavBarAdmin;