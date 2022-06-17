// Session data
const idOrg = window.sessionStorage.getItem('orgId');
const roles = window.sessionStorage.getItem('roles');
if(idOrg == null || roles == null) window.location.replace("Login.html");
const tokens = {
    accessToken: window.sessionStorage.getItem('accessToken'),
    refreshToken: window.sessionStorage.getItem('refreshToken')
}

document.addEventListener("DOMContentLoaded", function(event) {
    // Page specific steps
    window.listTypes(idOrg, tokens);
    window.setNavBarAdmin(roles.split(','));

    document.getElementById('Clear').addEventListener('click', function(e) {
        e.preventDefault();

        const nameElement = document.getElementById('name');
        nameElement.value = '';
    });

    document.getElementById('Create').addEventListener('click', async function(e) {
        e.preventDefault();
        const nameElement = document.getElementById('name');

        const type = {
            id: null,
            name: nameElement.value,
            idOrganisation: idOrg
        };

        window.createType(type, tokens);
    });
});