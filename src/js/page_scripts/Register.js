window.sessionStorage.clear();

document.getElementById('Domain').addEventListener('change', function (e) {
    const domain = document.getElementById('Domain').value;
    document.getElementById('EmailDomain').value = domain;
});

document.getElementById('Register').addEventListener('click', async function (e) {
    e.preventDefault();
    const form = document.getElementById('registerForm');

    const verification = window.verifyData();
    if(verification != false) {
        const resp = await window.executeRegister(verification);

        if(resp.status == 201) {
            form.action = 'Login.html?registered=1';
            form.method = 'post';
            form.submit();
        }
    }
});

document.getElementById('Return').addEventListener('click', function (e) {
    e.preventDefault();
    const form = document.getElementById("registerForm");

    form.action = 'Welcome.html';
    form.method = 'post';
    form.submit();
});