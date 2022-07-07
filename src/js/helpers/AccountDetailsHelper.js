const helperModule = require("../modules/Helper.js");
const securityDB = require('../modules/SecurityDB.js');
const userDB = require('../modules/UserDB.js');

async function getAccountDetails(username, isSelf, tokens) {
    const response = await userDB.getAccountDetails(username, tokens);
    const alertPlaceholder = document.getElementById('errorAlertPlaceholder');

    if(response.status == 200) {
        const account = response;
        const employee = account.employee;

        const accountCreationDate = new Date(Date.parse(account.dateCreated));
        const accountCreationString = `${accountCreationDate.getDate()}-${accountCreationDate.getMonth()}-${accountCreationDate.getFullYear()}`;

        const empCreationDate = new Date(Date.parse(employee.bday));
        const empCreationString = `${empCreationDate.getDate()}-${empCreationDate.getMonth()}-${empCreationDate.getFullYear()}`;

        const roles = account.roles;

        let accDetails = `
            <p class="lead text-center" style="color: #0d6efd"><strong>Account</strong></p>
            
            <p class="lead">Username: ${account.username}</p>
            <p class="lead">Email: ${account.email}</p>
            <p class="lead">Creation date: ${accountCreationString}</p>
        `;

        // roles
        let rolesHTML = ``;
        var isAdmin = helperModule.checkIfAdmin(roles);
        if(!isAdmin) {
            document.getElementById('buttonAddRole').disabled = true;
            document.getElementById('buttonRemoveRole').disabled = true;
        }
        for(const role of roles) {
            const roleHTML = `
                <tr>
                    <th scope="row">${role.name}</th>
                </tr>
            `;
            rolesHTML = rolesHTML.concat(roleHTML);
        }
        let rolesTable = `
            <div class="card" style="width: 100%;">
                <div class="card-header">Roles</div>
                <div class="card-body">
                    <table class="table table-primary table-hover">
                        <thead>
                            <tr>
                                <th scope="col" style="width: 200px">Role</th>
                            </tr>
                        </thead>
                        <tbody id="rolesBody">
                            ${rolesHTML}
                        </tbody>
                    </table>
                </div>
            </div>
            <br>
        `;
        accDetails = accDetails.concat(`${rolesTable}`);
        //----------------------------------------------------------

        let employeeDetails = `
            <p class="lead text-center" style="color: #0d6efd"><strong>Employee</strong></p>
            
            <p class="lead">First name: ${employee.firstName}</p>
            <p class="lead">Last name: ${employee.lastName}</p>
            <p class="lead">Birthday: ${empCreationString}</p>
        `;

        if(isSelf == true) {
            const sensitiveData = `
                <p class="lead">Phone: ${employee.phone}</p>
            `;
            employeeDetails = employeeDetails.concat(sensitiveData)
        }

        accDetails = accDetails.concat(employeeDetails);

        const accCard = `
            <div class="card">
                <div class="card-header text-white"></div>
                <div class="card-body">
                    ${accDetails}
                </div>
            </div>
        `;

        const placeholder = document.getElementById('account');
        placeholder.innerHTML = accCard;
    } else {
        helperModule.showAlert('Account details could not be fetched because of a server problem.', 'danger', alertPlaceholder);
    }
}

function setNavBarAdmin(roles) {
    isAdmin = helperModule.checkIfAdmin(roles);

    if(isAdmin) {
        const adminNavbar = `
            <ul class="nav navbar-nav me-auto">
                <li><a class="nav-link" href="NewDepartment.html">Add Department</a></li>
                <li><a class="nav-link" href="NewEmployee.html">Add Employee</a></li>
            </ul>
        `;

        document.getElementById('adminNavBar').innerHTML = adminNavbar;
    }
}

async function addRole(username, roleID, tokens) {
    const response = await securityDB.addRole(username, roleID, tokens);
    const alertPlaceholder = document.getElementById('errorAlertPlaceholder');

    if(response.status == 200) {
        helperModule.showAlert('Role added successfully.', 'success', alertPlaceholder);
    } else {
        helperModule.showAlert('There was a problem adding the role.', 'danger', alertPlaceholder);
    }
}

async function removeRole(username, roleID, tokens) {
    const response = await securityDB.removeRole(username, roleID, tokens);
    const alertPlaceholder = document.getElementById('errorAlertPlaceholder');

    if(response.status == 200) {
        helperModule.showAlert('Role removed successfully.', 'success', alertPlaceholder);
    } else {
        helperModule.showAlert('There was a problem removing the role.', 'danger', alertPlaceholder);
    }
}

async function setCurrentRolesSelect(username, tokens) {
    const response = await securityDB.getAccountRoles(username, tokens);
    const alertPlaceholder = document.getElementById('errorAlertPlaceholder');

    if(response.status == 200) {
        const rolesSelect = document.getElementById('removeRoleSelect');
        const roles = response.roles;

        let rolesHTML = `<option value="Undefined" id="0" selected>Undefined</option>`;
        for(const role of roles) {
            const roleHTML = `<option value="${role.name}" id="${role.id}">${role.name}</option>`;
            rolesHTML = rolesHTML.concat(roleHTML);
        }

        rolesSelect.innerHTML = rolesHTML;
    } else {
        helperModule.showAlert('There was a problem fetching current account roles.', 'danger', alertPlaceholder);
    }
}

async function setRemainingRoles(username, tokens) {
    const response1 = await securityDB.getAccountRoles(username, tokens);
    const response2 = await securityDB.getRoles(tokens);
    const alertPlaceholder = document.getElementById('errorAlertPlaceholder');

    if(response1.status == 200 && response2.status == 200) {
        const rolesSelect = document.getElementById('addRoleSelect');
        const roles = helperModule.rolesDifference(response1.roles, response2.roles);

        let rolesHTML = `<option value="Undefined" id="0" selected>Undefined</option>`;
        for(const role of roles) {
            const roleHTML = `<option value="${role.name}" id="${role.id}">${role.name}</option>`;
            rolesHTML = rolesHTML.concat(roleHTML);
        }

        rolesSelect.innerHTML = rolesHTML;
    } else {
        helperModule.showAlert('There was a problem fetching current account roles.', 'danger', alertPlaceholder);
    }
}

global.window.getAccountDetails = getAccountDetails;
global.window.setNavBarAdmin = setNavBarAdmin;
global.window.addRole = addRole;
global.window.removeRole = removeRole;
global.window.setCurrentRolesSelect = setCurrentRolesSelect;
global.window.setRemainingRoles = setRemainingRoles;