let username = window.sessionStorage.getItem('username');
const roles = window.sessionStorage.getItem('roles');
if(username == null || roles == null) window.location.replace("Login.html");
const tokens = {
    accessToken: window.sessionStorage.getItem('accessToken'),
    refreshToken: window.sessionStorage.getItem('refreshToken')
}

let isSelf = true;
const urlParams = new URLSearchParams(window.location.search);
if(urlParams.has('username')) {
    if(username != urlParams.get('username')) {
        isSelf = false;
    }
    username = urlParams.get('username');
}

document.addEventListener("DOMContentLoaded", function(event) {
    window.getAccountDetails(username, isSelf, tokens);
    window.setNavBarAdmin(roles.split(','));
    window.setCurrentRolesSelect(username, tokens);
    window.setRemainingRoles(username, tokens);

    document.getElementById('assignRole').addEventListener('click', async function() {
        const roleSelect = document.getElementById('addRoleSelect');
        const roleID = roleSelect[roleSelect.selectedIndex].id;
        if(roleID != 0) {
            window.addRole(username, roleID, tokens);
            setTimeout(() => {
                window.getAccountDetails(username, isSelf, tokens);
                window.setCurrentRolesSelect(username, tokens);
                window.setRemainingRoles(username, tokens);
            }, 2000);
        }
    });

    document.getElementById('removeRole').addEventListener('click', async function() {
        const roleSelect = document.getElementById('removeRoleSelect');
        const roleID = roleSelect[roleSelect.selectedIndex].id;
        if(roleID != 0) {
            window.removeRole(username, roleID, tokens);
            setTimeout(() => {
                window.getAccountDetails(username, isSelf, tokens);
                window.setCurrentRolesSelect(username, tokens);
                window.setRemainingRoles(username, tokens);
            }, 2000);
        }
    });
});
