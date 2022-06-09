const helperModule = require("./Helper");
const axios = require("axios");

async function getOrganisationEmployees(idOrg, tokens) {
    tokens = await helperModule.redirectToLogin(tokens);

    if(tokens != false) {
        const url = `http://localhost:8080/employee/organisation/${idOrg}`;
        const config = {
            headers: {
                'Authorization': `Token: ${tokens.accessToken}`
            }
        }
        let response;

        try {
            await axios
                .get(url, config)
                .then(function (resp) {
                    console.log(resp);
                    const employees = resp.data;

                    response = {
                        status: resp.status,
                        employees: resp.data
                    }
                })
                .catch(function (err) {
                    console.log(err);
                    response = {
                        status: err.response.status,
                        message: err.message,
                        serverMessage: err.response.data.error_message
                    }
                });
        } catch (err) {
            response = {
                status: 900,
                message: err.message,
                serverMessage: 'Internal error.'
            }
        }

        return response;
    }
}

async function createEmployee(account, employee, tokens) {
    tokens = await helperModule.redirectToLogin(tokens);

    if(tokens != false) {
        const url = `http://localhost:8080/employee/main`;
        const data = {
            account,
            employee
        };
        const config = {
            headers: {
                'Authorization': `Token: ${tokens.accessToken}`
            }
        };
        let response;

        try {
            await axios
                .post(url, data, config)
                .then(function (resp) {
                    console.log(resp);
                    response = {
                        status: resp.status,
                        department: resp.data.response
                    }
                })
                .catch(function (err) {
                    console.log(err);
                    response = {
                        status: err.response.status,
                        message: err.message,
                        serverMessage: err.response.data.error_message
                    }
                });
        } catch (err) {
            response = {
                status: 900,
                message: err.message,
                serverMessage: 'Internal error.'
            }
        }

        return response;
    }
}

async function assignEmployeeToDepartment(idOrg, idEmp, depName, tokens) {
    tokens = await helperModule.redirectToLogin(tokens);

    if(tokens != false) {
        const url = `http://localhost:8080/employee/department/assign`;
        const config = {
            headers: {
                'Authorization': `Token: ${tokens.accessToken}`
            }
        };
        const data = {
            idOrg,
            idEmp,
            depName
        }
        let response;

        try {
            await axios
                .post(url, data, config)
                .then(function (resp) {
                    console.log(resp);
                    response = {
                        status: resp.status,
                        department: resp.data.department
                    }
                })
                .catch(function (err) {
                    console.log(err);
                    response = {
                        status: err.response.status,
                        message: err.message,
                        serverMessage: err.response.data.error_message
                    }
                });
        } catch (err) {
            response = {
                status: 900,
                message: err.message,
                serverMessage: 'Internal error.'
            }
        }

        return response;
    }
}

async function unassignEmployeeFromDepartment(idOrg, idEmp, depName, tokens) {
    tokens = await helperModule.redirectToLogin(tokens);

    if(tokens != false) {
        const url = `http://localhost:8080/employee/department/unassign`;
        const config = {
            headers: {
                'Authorization': `Token: ${tokens.accessToken}`
            }
        };
        const data = {
            idOrg,
            idEmp,
            depName
        }
        let response;

        try {
            await axios
                .post(url, data, config)
                .then(function (resp) {
                    console.log(resp);
                    response = {
                        status: resp.status,
                        department: resp.data.department
                    }
                })
                .catch(function (err) {
                    console.log(err);
                    response = {
                        status: err.response.status,
                        message: err.message,
                        serverMessage: err.response.data.error_message
                    }
                });
        } catch (err) {
            response = {
                status: 900,
                message: err.message,
                serverMessage: 'Internal error.'
            }
        }

        return response;
    }
}

module.exports.getOrganisationEmployees = getOrganisationEmployees;
module.exports.createEmployee = createEmployee;
module.exports.assignEmployeeToDepartment = assignEmployeeToDepartment;
module.exports.unassignEmployeeFromDepartment = unassignEmployeeFromDepartment;