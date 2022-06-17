const helperModule = require("../modules/Helper");
const organisationDB = require('../modules/OrganisationDB.js');

async function getMainPageDetails(username, tokens) {
    let response;

    if(username != null) {
        response = await organisationDB.getOrganisationByUsername(username, tokens);
    } else {
        global.window.location.replace("Login.html");
    }

    if(response != null && response.status == 200) {
        global.window.sessionStorage.setItem('orgId', response.organisation.id);
        let depsCard = '';
        const departments = response.departments;
        let number = 0;
        for(const department of departments) {
            const depCard = `
                <div class="col-6">
                    <div class="card">
                        <div class="card-header text-white">${department.name}</div>
                        <div class="card-body">
                            <form action="DepartmentEmployees.html" method="get" class="container-fluid justify-content-center">
                                <input type="hidden" name="department" value="${department.name}">
                                <div class="mx-auto col-4">
                                    <input class="btn btn-primary btn-lg" type="submit" value="Employees">
                                </div>
                            </form><br>
                            <form action="Board.html" method="get" class="container-fluid justify-content-center">
                                <input type="hidden" name="department" value="${department.name}">
                                <input type="hidden" name="id" value="${department.id}">
                                <div class="col-4 mx-auto">
                                    <input class="btn btn-primary btn-lg" type="submit" value="Boards">
                                </div>
                            </form><br>
                            <form action="EditDepartment.html" method="get" class="container-fluid justify-content-center">
                                <input type="hidden" name="department" value="${department.name}">
                                <input type="hidden" name="id" value="${department.id}">
                                <div class="col-4 mx-auto">
                                    <input class="btn btn-primary btn-lg" type="submit" value="Edit">
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            `;
            depsCard = depsCard.concat(depCard);
            number += 1;
            if(number == 2) {
                number = 0;
            }
        }

        const orgCard = `
        <div class="col-12">
            <div class="card">
                <div class="card-header text-white">${response.organisation.name}</div>
                <div class="card-body">
                    ${depsCard}
                </div>
            </div>
        </div>
        `;

        const replacement = document.getElementById('boards');
        replacement.innerHTML = orgCard;
    } else {
        helperModule.showAlert('Organisation data could not be fetched because of a server problem.', 'danger', alertPlaceholder);
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

global.window.getMainPageDetails = getMainPageDetails;
global.window.setNavBarAdmin = setNavBarAdmin;