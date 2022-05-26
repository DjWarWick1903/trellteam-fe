const userModule = require('./modules/User.js');
const helperModule = require("./modules/Helper");

async function fillDepartmentEmployees(username, depName, tokens) {
    const response = await userModule.getOrganisation(username, tokens);
    const alertPlaceholder = document.getElementById('errorAlertPlaceholder');

    if(response.status == 200) {
        const idOrg = response.organisation.id;
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

function employeeDifference(orgEmployees, depEmployees) {
    let employees = [];
    for(const orgEmp of orgEmployees) {
        let isAssigned = false;
        for(const depEmp of depEmployees) {
            if(depEmp.id == orgEmp.id) {
                isAssigned = true;
                break;
            }
        }

        if(isAssigned == false) {
            employees = employees.concat(orgEmp);
        }
    }

    return employees;
}

function employeesUnion(orgEmployees, depEmployees) {
    let employees = orgEmployees.filter(employee => !depEmployees.includes(employee));

    return [...employees, ...depEmployees];
}

async function fillOrganisationEmployees(idOrg, username, depName, tokens) {
    const responseOrg = await userModule.getOrganisationEmployees(idOrg, tokens);
    const responseDep = await userModule.getOrganisation(username, tokens);
    const alertPlaceholder = document.getElementById('errorAlertPlaceholder');

    if(responseOrg.status == 200 && responseDep.status == 200) {
        const orgEmployees = responseOrg.employees;
        const departments = responseDep.departments;

        let depEmployees = new Array();
        for(const department of departments) {
            if(department.name == depName) {
                depEmployees = department.employees;
                console.log(depEmployees);
                break;
            }
        }

        const employees = employeeDifference(orgEmployees, depEmployees);
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
        for (const employee of orgEmployees) {
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

    const response = await userModule.assignEmployeeToDepartment(idOrg, idEmp, depName, tokens);

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

    const response = await userModule.unassignEmployeeFromDepartment(idOrg, idEmp, depName, tokens);

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

global.window.fillDepartmentEmployees = fillDepartmentEmployees;
global.window.fillOrganisationEmployees = fillOrganisationEmployees;
global.window.assignEmployee = assignEmployee;
global.window.unassignEmployee = unassignEmployee;
global.window.showAlert = showAlert;