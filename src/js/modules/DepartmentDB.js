const helperModule = require("./Helper");
const axios = require("axios");

async function createDepartment(idOrganisation, departmentName, idManager, tokens) {
    tokens = await helperModule.redirectToLogin(tokens);

    if(tokens != false) {
        const url = `http://localhost:8080/department/main`;
        const data = {
            depName: departmentName,
            idOrg: idOrganisation,
            idMan: idManager
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

async function getDepartmentById(idDep, tokens) {
    tokens = await helperModule.redirectToLogin(tokens);

    if(tokens != false) {
        const url = `http://localhost:8080/department/main/${idDep}`;
        const config = {
            headers: {
                'Authorization': `Token: ${tokens.accessToken}`
            }
        };
        let response;

        try {
            await axios
                .get(url, config)
                .then(function (resp) {
                    console.log(resp);
                    response = {
                        status: resp.status,
                        id: resp.data.id,
                        name: resp.data.name,
                        manager: resp.data.manager,
                        employees: resp.data.employees
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

async function editDepartment(department, tokens) {
    tokens = await helperModule.redirectToLogin(tokens);

    if(tokens != false) {
        const url = `http://localhost:8080/department/main`;
        const config = {
            headers: {
                'Authorization': `Token: ${tokens.accessToken}`
            }
        };
        const data = {
            idDep: department.id,
            depName: department.name,
            idMan: department.idMan == null ? null : department.idMan
        };
        let response;

        try {
            await axios
                .put(url, data, config)
                .then(function (resp) {
                    console.log(resp);
                    response = {
                        status: resp.status
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

async function getOrganisationDepartments(idOrg, tokens) {
    tokens = await helperModule.redirectToLogin(tokens);

    if(tokens != false) {
        const url = `http://localhost:8080/department/organisation/${idOrg}`;
        const config = {
            headers: {
                'Authorization': `Token: ${tokens.accessToken}`
            }
        };
        let response;

        try {
            await axios
                .get(url, config)
                .then(function (resp) {
                    console.log(resp);
                    response = {
                        status: resp.status,
                        departments: resp.data
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

module.exports.getDepartmentById = getDepartmentById;
module.exports.editDepartment = editDepartment;
module.exports.createDepartment = createDepartment;
module.exports.getOrganisationDepartments = getOrganisationDepartments;