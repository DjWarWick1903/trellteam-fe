const helperModule = require("../modules/Helper.js");
const organisationDB = require('../modules/OrganisationDB.js');
const employeeDB = require('../modules/EmployeeDB.js');

async function fillDepartmentEmployees(username, depName, tokens) {
    const response = await organisationDB.getOrganisationByUsername(username, tokens);
    const alertPlaceholder = document.getElementById('errorAlertPlaceholder');

    if(response.status == 200) {
        const departments = response.departments;
        let employees = null;
        for(const department of departments) {
            if(department.name == depName) {
                employees = department.employees;
                break;
            }
        }

        if(employees == null) {
            helperModule.showAlert('There was a problem fetching the employees.', 'danger', alertPlaceholder);
            return;
        }

        const cardHeader = document.getElementById('header');
        cardHeader.innerText = depName;

        const tableBody = document.getElementById('body');
        let bodyHTML = ``;
        for(const employee of employees) {
            const bday = new Date(Date.parse(employee.bday));
            const bdayString = `${bday.getDate()}-${bday.getMonth()}-${bday.getFullYear()}`;
            const body = `
                <tr>
                    <th scope="row">${employee.id}</th>
                    <td>${employee.firstName}</td>
                    <td>${employee.lastName}</td>
                    <td>${employee.phone}</td>
                    <td>${bdayString}</td>
                    <td>${employee.cnp}</td>
                </tr>
            `;
            bodyHTML = bodyHTML.concat(body);
        }

        tableBody.innerHTML = bodyHTML;
    } else {
        helperModule.showAlert('Department employees could not be fetched because of a server problem.', 'danger', alertPlaceholder);
    }
}

async function fillOrganisationEmployees(idOrg, username, depName, tokens) {
    const responseOrg = await employeeDB.getOrganisationEmployees(idOrg, tokens);
    const responseDep = await organisationDB.getOrganisationByUsername(username, tokens);
    const alertPlaceholder = document.getElementById('errorAlertPlaceholder');

    if(responseOrg.status == 200 && responseDep.status == 200) {
        const orgEmployees = responseOrg.employees;
        const departments = responseDep.departments;

        let depEmployees = new Array();
        for(const department of departments) {
            if(department.name == depName) {
                depEmployees = department.employees;
                break;
            }
        }

        let employees = helperModule.employeeDifference(orgEmployees, depEmployees, false);
        let employeesHTML = `<option value="undefined" id="0" selected>Undefined</option>`;
        if(Array.isArray(employees)) {
            for (const employee of employees) {
                const empHTML = `<option value="${employee.firstName} ${employee.lastName}" id="${employee.id}">${employee.firstName} ${employee.lastName}</option>`;
                employeesHTML = employeesHTML.concat(empHTML);
            }
        } else {
            const empHTML = `<option value="${employees.firstName} ${employees.lastName}" id="${employees.id}">${employees.firstName} ${employees.lastName}</option>`;
            employeesHTML = employeesHTML.concat(empHTML);
        }

        const employeesSelect = document.getElementById('employeeList');
        employeesSelect.innerHTML = employeesHTML;

        employeesHTML = `<option value="undefined" id="0" selected>Undefined</option>`;
        employees = helperModule.employeeDifference(orgEmployees, depEmployees, true);
        for (const employee of employees) {
            const empHTML = `<option value="${employee.firstName} ${employee.lastName}" id="${employee.id}">${employee.firstName} ${employee.lastName}</option>`;
            employeesHTML = employeesHTML.concat(empHTML);
        }
        const employeesSelectDel = document.getElementById('employeeListDel');
        employeesSelectDel.innerHTML = employeesHTML;
    } else {
        helperModule.showAlert('Organisation employees could not be fetched because of a server problem.', 'danger', alertPlaceholder);
    }
}

async function assignEmployee(idOrg, idEmp, depName, tokens) {
    const alertPlaceholder = document.getElementById('errorAlertPlaceholder');
    if(idEmp == null || idEmp == 0) {
        helperModule.showAlert('Please choose an employee to assign from the select element.', 'info', alertPlaceholder);
        return false;
    }

    const response = await employeeDB.assignEmployeeToDepartment(idOrg, idEmp, depName, tokens);

    if(response.status == 200) {
        return true;
    } else {
        helperModule.showAlert('Employee could not be assigned to the department because of a server problem.', 'danger', alertPlaceholder);
        return false;
    }
}

async function unassignEmployee(idOrg, idEmp, depName, tokens) {
    const alertPlaceholder = document.getElementById('errorAlertPlaceholder');
    if(idEmp == null || idEmp == 0) {
        helperModule.showAlert('Please select an employee to unassign from the department.', 'info', alertPlaceholder);
        return false;
    }

    const response = await employeeDB.unassignEmployeeFromDepartment(idOrg, idEmp, depName, tokens);

    if(response.status == 200) {
        return true;
    } else {
        helperModule.showAlert('Employee could not be unassigned from the department because of a server problem.', 'danger', alertPlaceholder);
        return false;
    }
}

function showAlert(text, type, placeholder) {
    helperModule.showAlert(text, type, alertPlaceholder);
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

global.window.fillDepartmentEmployees = fillDepartmentEmployees;
global.window.fillOrganisationEmployees = fillOrganisationEmployees;
global.window.assignEmployee = assignEmployee;
global.window.unassignEmployee = unassignEmployee;
global.window.showAlert = showAlert;
global.window.setNavBarAdmin = setNavBarAdmin;