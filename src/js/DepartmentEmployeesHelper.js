const userModule = require('./modules/User.js');
const helperModule = require("./modules/Helper");

async function fillDepartmentEmployees(username, depName, tokens) {
    const response = await userModule.getOrganisation(username, tokens);
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
        helperModule.showAlert('Employees could not be fetched because of a server problem.', 'danger', alertPlaceholder);
    }
}

global.window.fillDepartmentEmployees = fillDepartmentEmployees;