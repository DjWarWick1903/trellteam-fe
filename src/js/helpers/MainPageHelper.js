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
        var roles = global.window.sessionStorage.getItem('roles');
        let isAdmin = helperModule.checkIfAdmin(roles);

        let depsCard = '';
        let depRow = '';
        const departments = response.departments;
        let depColumn = 0;
        let totalColumns = 0;
        console.log('lenght: ' + departments.length);
        for(const department of departments) {
            console.log(department.name);
            const depCard = `
                <div class="col">
                    <div class="card">
                        <div class="card-header text-white">${department.name}</div>
                        <div class="card-body">
                            <form action="DepartmentEmployees.html" method="get" class="container-fluid justify-content-center">
                                <input type="hidden" name="department" value="${department.name}">
                                <div class="mx-auto col-4 justify-content-center d-flex">
                                    <input class="btn btn-primary btn-lg" type="submit" value="Employees" ${isAdmin == false ? 'disabled' : ''}>
                                </div>
                            </form><br>
                            <form action="Board.html" method="get" class="container-fluid justify-content-center">
                                <input type="hidden" name="department" value="${department.name}">
                                <input type="hidden" name="id" value="${department.id}">
                                <div class="col-4 mx-auto justify-content-center d-flex">
                                    <input class="btn btn-primary btn-lg" type="submit" value="Boards">
                                </div>
                            </form><br>
                            <form action="EditDepartment.html" method="get" class="container-fluid justify-content-center">
                                <input type="hidden" name="department" value="${department.name}">
                                <input type="hidden" name="id" value="${department.id}">
                                <div class="col-4 mx-auto justify-content-center d-flex">
                                    <input class="btn btn-primary btn-lg" type="submit" value="Edit" ${isAdmin == false ? 'disabled' : ''}>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            `;
            depsCard = depsCard.concat(depCard);
            depColumn += 1;
            totalColumns += 1;
            console.log("depColumn: " + depColumn);
            console.log("totalCol: " + totalColumns)
            if(depColumn == 4 || totalColumns == departments.length) {
                let depRowHTML = `
                    <div class="row">
                        ${depsCard}
                    </div>
                `;
                depRow = depRow.concat(depRowHTML);
                depsCard = '';
                depColumn = 0;
            }
        }

        const orgCard = `
            <div class="justify-content-center d-flex">
                <div class="card col-12 mx-auto">
                    <div class="card-header text-white">${response.organisation.name}</div>
                    <div class="card-body col-12 mx-auto">
                        <div class="container">
                            ${depRow}
                        </div>
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
    var isAdmin = helperModule.checkIfAdmin(roles);

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