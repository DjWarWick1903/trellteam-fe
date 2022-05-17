const userModule = require('./modules/User.js');
const helperModule = require('./modules/Helper.js');

async function fillEmployeesSelect(idOrg, tokens) {
    const response = await userModule.getOrganisationEmployees(idOrg, tokens);
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

    const response = await userModule.createDepartment(idOrg, departmentName, idMan, tokens);

    if(response.status == 201) {
        helperModule.showAlert('Department has been created succesfully!', 'success', alertPlaceholder);
    } else {
        helperModule.showAlert('Department could not be created because of a server problem.', 'danger', alertPlaceholder);
    }
}

global.window.fillEmployeesSelect = fillEmployeesSelect;
global.window.createDepartment = createDepartment;