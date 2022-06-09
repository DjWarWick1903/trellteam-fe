const username = window.sessionStorage.getItem('username');
if(username == null) window.location.replace("Login.html");
const idOrg = window.sessionStorage.getItem('orgId');
const tokens = {
    accessToken: window.sessionStorage.getItem('accessToken'),
    refreshToken: window.sessionStorage.getItem('refreshToken')
}
const alertPlaceholder = document.getElementById('errorAlertPlaceholder');

const urlParams = new URLSearchParams(window.location.search);
let departmentName = null;
if(urlParams.has('department')) {
    departmentName = urlParams.get('department');
    window.fillDepartmentEmployees(username, departmentName, tokens);
    window.fillOrganisationEmployees(idOrg, username, departmentName, tokens);
} else {
    window.showAlert("Department name not found.", 'danger', alertPlaceholder);
}

if(urlParams.has('assigned')) {
    const idEmp = urlParams.get('assigned');
    window.showAlert(`Employee ${idEmp} has been assigned to the department.`, 'success', alertPlaceholder);
}

if(urlParams.has('unassigned')) {
    const idEmp = urlParams.get('unassigned');
    window.showAlert(`Employee ${idEmp} has been unassigned from the department.`, 'success', alertPlaceholder);
}

document.getElementById('Clear').addEventListener('click', function() {
    const empSelect = document.getElementById('employeeList');
    empSelect.options[0].selected = 'selected';
});

document.getElementById('Clear2').addEventListener('click', function() {
    const empSelect = document.getElementById('employeeListDel');
    empSelect.options[0].selected = 'selected';
});

document.getElementById('Unassign').addEventListener('click', async function() {
    const empSelect = document.getElementById('employeeListDel');
    const idEmp = empSelect[empSelect.selectedIndex].id;

    console.log(idEmp);
    if(departmentName != null) {
        const response = window.unassignEmployee(idOrg, idEmp, departmentName, tokens);
        if(response) {
            window.location.replace(`DepartmentEmployees.html?department=${departmentName}&unassigned=${idEmp}`);
        }
    }
});

document.getElementById('Assign').addEventListener('click', async function() {
    const empSelect = document.getElementById('employeeList');
    const idEmp = empSelect[empSelect.selectedIndex].id;

    if(departmentName != null) {
        const response = window.assignEmployee(idOrg, idEmp, departmentName, tokens);
        if(response) {
            window.location.replace(`DepartmentEmployees.html?department=${departmentName}&assigned=${idEmp}`);
        }
    }
});