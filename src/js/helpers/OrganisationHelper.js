const organisationDB = require('../modules/OrganisationDB.js');

async function getOrganisationDetails(username, tokens) {
    const response = await organisationDB.getOrganisationByUsername(username, tokens);

    if(response.status == 200) {
        const organisation = response.organisation;
        const departments = response.departments;

        const foundationDateSystem = new Date(Date.parse(organisation.dateCreated));
        const foundationDateString = `${foundationDateSystem.getDate()}-${foundationDateSystem.getMonth()}-${foundationDateSystem.getFullYear()}`;

        const orgDetails = `
            <p class="lead">Name: ${organisation.name}</p>
            <p class="lead">Sign: ${organisation.sign}</p>
            <p class="lead">Foundation date: ${foundationDateString}</p>
            <p class="lead">Domain: xxxx@${organisation.domain}</p>
            <p class="lead">CUI: ${organisation.cui}</p>
            <p class="lead">Departments: </p>
        `;

        let depDetails = '';
        for(const department of departments) {
            const employees = department.employees.length;
            const name = department.name;
            depDetails = depDetails.concat(`<p class="lead">${name} - ${employees} employees`);
        }

        const orgCard = `
            <div class="card">
                <div class="card-header text-white">${organisation.name}</div>
                <div class="card-body">
                    ${orgDetails}
                    ${depDetails}
                </div>
            </div>
        `;

        const placeholder = document.getElementById('organisation');
        placeholder.innerHTML = orgCard;
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

global.window.getOrganisationDetails = getOrganisationDetails;
global.window.setNavBarAdmin = setNavBarAdmin;