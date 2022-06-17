const helperModule = require('../modules/Helper.js');
const departmentDB = require('../modules/DepartmentDB.js');
const employeeDB = require('../modules/EmployeeDB.js');

function showAlert(text, type, placeholder) {
    helperModule.showAlert(text, type, placeholder);
}

async function fillDepartmentData(idDep, idOrg, tokens) {
    const responseDep = await departmentDB.getDepartmentById(idDep, tokens);
    const alertPlaceholder = document.getElementById('errorAlertPlaceholder');

    if(responseDep.status == 200) {
        const responseEmp = await employeeDB.getOrganisationEmployees(idOrg, tokens);
        if(responseEmp.status == 200) {
            const departmentNameField = document.getElementById('floatingInputGrid');
            departmentNameField.value = responseDep.name;

            const employeesSelect = document.getElementById('floatingSelectGrid');
            const employees = responseEmp.employees;

            let employeesHTML = `<option value="undefined" id="0" ${responseDep.manager == null ? 'selected' : ''}>Undefined</option>`;
            const managerName = responseDep.manager != null ? `${responseDep.manager.firstName} ${responseDep.manager.lastName}` : null;
            for(const employee of employees) {
                const name = `${employee.firstName} ${employee.lastName}`;
                const employeeHTML = `<option value="${name}" id="${employee.id}" ${responseDep.manager != null && managerName == name ? 'selected' : ''}>${name}</option>`;
                employeesHTML = employeesHTML.concat(employeeHTML);
            }

            employeesSelect.innerHTML = employeesHTML;
            return responseDep.name;
        } else {
            helperModule.showAlert('Employees could not be fetched because of a server problem.', 'danger', alertPlaceholder);
        }
    } else {
        helperModule.showAlert('Department could not be fetched because of a server problem.', 'danger', alertPlaceholder);
    }
}

async function editDepartment(department, tokens) {
    const response = await departmentDB.editDepartment(department, tokens);
    const alertPlaceholder = document.getElementById('errorAlertPlaceholder');

    if(response.status == 200) {
        helperModule.showAlert('Department has been updated successfully.', 'success', alertPlaceholder);
    } else {
        helperModule.showAlert('Department could not be updated because of a server problem.', 'danger', alertPlaceholder);
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

global.window.fillDepartmentData = fillDepartmentData;
global.window.showAlert = showAlert;
global.window.editDepartment = editDepartment;
global.window.setNavBarAdmin = setNavBarAdmin;