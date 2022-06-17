const helperModule = require("../modules/Helper.js");
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
        for(const role of roles) {
            rolesHTML = rolesHTML.concat(role.name);
        }
        accDetails = accDetails.concat(`<p class="lead">Role: ${rolesHTML}</p><br>`);
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
                <p class="lead">CNP: ${employee.cnp}</p>
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
    isAdmin = false;
    for(const role of roles) {
        if(role == "ADMIN" || role == "MANAGER") {
            isAdmin = true;
            break;
        }
    }

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

global.window.getAccountDetails = getAccountDetails;
global.window.setNavBarAdmin = setNavBarAdmin;