const helperModule = require('../modules/Helper.js');
const employeeDB = require('../modules/EmployeeDB.js');
const departmentDB = require('../modules/DepartmentDB.js');

async function fillEmployeesSelect(idOrg, tokens) {
    const response = await employeeDB.getOrganisationEmployees(idOrg, tokens);
    const alertPlaceholder = document.getElementById('errorAlertPlaceholder');

    if(response.status == 200) {
        const employeesSelect = document.getElementById('floatingSelectGrid');
        const employees = response.employees;

        let employeesHTML = `<option value="undefined" id="0" selected>Undefined</option>`;
        for(const employee of employees) {
            const name = `${employee.firstName} ${employee.lastName}`;
            const employeeHTML = `<option value="${name}" id="${employee.id}">${name}</option>`;
            employeesHTML = employeesHTML.concat(employeeHTML);
        }

        employeesSelect.innerHTML = employeesHTML;
    } else {
        helperModule.showAlert('Employees could not be fetched because of a server problem.', 'danger', alertPlaceholder);
    }
}

async function createDepartment(idOrg, departmentName, idMan, tokens) {
    const alertPlaceholder = document.getElementById('errorAlertPlaceholder');
    if(helperModule.verifyInputIsEmpty(departmentName)) {
        helperModule.showAlert('Please specify the name of the new department.', 'info', alertPlaceholder);
    }

    const response = await departmentDB.createDepartment(idOrg, departmentName, idMan, tokens);

    if(response.status == 201) {
        helperModule.showAlert('Department has been created succesfully!', 'success', alertPlaceholder);
    } else {
        helperModule.showAlert('Department could not be created because of a server problem.', 'danger', alertPlaceholder);
    }
}

function setNavBarAdmin(roles) {
    var isAdmin = helperModule.checkIfAdmin(roles);

    if(isAdmin) {
        const adminNavbar = `
            <ul class="nav navbar-nav me-auto">
                <li><a class="nav-link active" href="NewDepartment.html">Add Department</a></li>
                <li><a class="nav-link" href="NewEmployee.html">Add Employee</a></li>
            </ul>
        `;

        document.getElementById('adminNavBar').innerHTML = adminNavbar;
    }
}

global.window.fillEmployeesSelect = fillEmployeesSelect;
global.window.createDepartment = createDepartment;
global.window.setNavBarAdmin = setNavBarAdmin;