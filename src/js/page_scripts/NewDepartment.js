const orgId = window.sessionStorage.getItem('orgId');
if(orgId == null) window.location.replace("Login.html");
console.log(orgId);
const tokens = {
    accessToken: window.sessionStorage.getItem('accessToken'),
    refreshToken: window.sessionStorage.getItem('refreshToken')
}
window.fillEmployeesSelect(orgId, tokens);

document.getElementById('Clear').addEventListener('click', function(e) {
    e.preventDefault();
    const depField = document.getElementById('floatingInputGrid');
    const selectField = document.getElementById('floatingSelectGrid');

    depField.value = '';
    selectField.options[0].selected = 'selected';
});

document.getElementById('Create').addEventListener('click', async function (e) {
    e.preventDefault();

    console.log(orgId);
    const depField = document.getElementById('floatingInputGrid');
    const selectField = document.getElementById('floatingSelectGrid');

    const depName = depField.value;
    const empId = selectField[selectField.selectedIndex].id;

    window.createDepartment(orgId, depName, empId, tokens);
});