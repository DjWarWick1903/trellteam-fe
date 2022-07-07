const orgId = window.sessionStorage.getItem('orgId');
const roles = window.sessionStorage.getItem('roles');
if(orgId == null || roles == null) window.location.replace("Login.html");
const tokens = {
    accessToken: window.sessionStorage.getItem('accessToken'),
    refreshToken: window.sessionStorage.getItem('refreshToken')
}

document.addEventListener("DOMContentLoaded", function(event) {
    const alertPlaceholder = document.getElementById('errorAlertPlaceholder');
    let departmentName = null;
    let idDep = null;

    window.setNavBarAdmin(roles);
    const urlParams = new URLSearchParams(window.location.search);
    if(urlParams.has('id')) {
        idDep = urlParams.get('id');
        departmentName = window.fillDepartmentData(idDep, orgId, tokens);
    } else {
        window.showAlert('There was an error fetching the department data.', 'danger', alertPlaceholder);
    }

    document.getElementById('Reset').addEventListener('click', function(e) {
        e.preventDefault();
        const depField = document.getElementById('floatingInputGrid');
        const selectField = document.getElementById('floatingSelectGrid');

        depField.value = departmentName != null ? departmentName : '';
        selectField.options[0].selected = 'selected';
    });

    document.getElementById('Edit').addEventListener('click', async function (e) {
        e.preventDefault();

        console.log(orgId);
        const depField = document.getElementById('floatingInputGrid');
        const selectField = document.getElementById('floatingSelectGrid');

        const depName = depField.value;
        const empId = selectField[selectField.selectedIndex].id;

        if(depName == null || depName == '') {
            window.showAlert('Department name field cannot be empty.', 'info', alertPlaceholder);
        }

        const department = {
            id: idDep,
            name: depName,
            idMan: empId
        };

        window.editDepartment(department, tokens);
    });
});