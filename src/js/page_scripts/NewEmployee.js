const orgId = window.sessionStorage.getItem('orgId');
const username = window.sessionStorage.getItem('username');
const roles = window.sessionStorage.getItem('roles');
if(orgId == null || username == null || roles == null) window.location.replace("Login.html");

const tokens = {
    accessToken: window.sessionStorage.getItem('accessToken'),
    refreshToken: window.sessionStorage.getItem('refreshToken')
}

document.addEventListener("DOMContentLoaded", function(event) {
    window.fillRoles(tokens);
    window.fillOrganisationDetails(username, tokens);
    window.setNavBarAdmin(roles);

    document.getElementById('Clear').addEventListener('click', function(e) {
        e.preventDefault();
        const emailField = document.getElementById('floatingInputEmail');
        const usernameField = document.getElementById('floatingInputUser');
        const roleField = document.getElementById('floatingSelectGrid');
        const passField = document.getElementById('floatingInputPass');
        const confirmField = document.getElementById('floatingInputConf');
        const fNameField = document.getElementById('FNAddon');
        const lNameField = document.getElementById('LNAddon');
        const phoneField = document.getElementById('PhoneAddon');
        const bdayField = document.getElementById('BDayAddon');
        const cnpField = document.getElementById('CNPAddon');

        emailField.value = '';
        usernameField.value = '';
        passField.value = '';
        roleField.options[0].selected = 'selected';
        confirmField.value = '';
        fNameField.value = '';
        lNameField.value = '';
        phoneField.value = '';
        bdayField.value = '';
        cnpField.value = '';
    });

    document.getElementById('Create').addEventListener('click', async function (e) {
        e.preventDefault();

        const emailField = document.getElementById('floatingInputEmail');
        const usernameField = document.getElementById('floatingInputUser');
        const roleField = document.getElementById('floatingSelectGrid');
        const depField = document.getElementById('depSelect');
        const passField = document.getElementById('floatingInputPass');
        const confirmField = document.getElementById('floatingInputConf');
        const fNameField = document.getElementById('FNAddon');
        const lNameField = document.getElementById('LNAddon');
        const phoneField = document.getElementById('PhoneAddon');
        const bdayField = document.getElementById('BDayAddon');
        const cnpField = document.getElementById('CNPAddon');
        const domainField = document.getElementById('EmailDomain');

        const email = emailField.value;
        const username = usernameField.value;
        const password = passField.value;
        const confirm = confirmField.value;
        const firstName = fNameField.value;
        const lastName = lNameField.value;
        const phone = phoneField.value;
        const bday = bdayField.value;
        const cnp = cnpField.value;
        const domain = domainField.value;
        const roleId = roleField[roleField.selectedIndex].id;
        const depId = depField[depField.selectedIndex].id;

        const account = {
            email: `${email}@${domain}`,
            username,
            password,
            confirm,
            roleId
        };

        const employee = {
            firstName,
            lastName,
            phone,
            bday,
            cnp,
            depId
        };

        window.createEmployee(account, employee, tokens);
    });
});
