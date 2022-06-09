const helperModule = require("../modules/Helper.js");
const userDB = require('../modules/UserDB.js');

async function getAccountDetails(username, tokens) {
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

        const accDetails = `
            <p class="lead text-center" style="color: #0d6efd"><strong>Account</strong></p>
            
            <p class="lead">Username: ${account.username}</p>
            <p class="lead">email: ${account.email}</p>
            <p class="lead">Creation date: ${accountCreationString}</p>
            <p class="lead">Role: ${roles[0].name}</p><br>
            
            <p class="lead text-center" style="color: #0d6efd"><strong>Employee</strong></p>
            
            <p class="lead">First name: ${employee.firstName}</p>
            <p class="lead">Last name: ${employee.lastName}</p>
            <p class="lead">Phone: ${employee.phone}</p>
            <p class="lead">CNP: ${employee.cnp}</p>
            <p class="lead">Birthday: ${empCreationString}</p>
        `;

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

global.window.getAccountDetails = getAccountDetails;