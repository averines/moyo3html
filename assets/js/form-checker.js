"use strict";


function checkForm(form) {
    let submitBtn = form.querySelector('[type="submit"]');
    let inputs = form.querySelectorAll('[data-check]');
    if (inputs.length > 0) {
        inputs.forEach(input => {
            let formGroup = input.closest('.form-group');
            formGroup.classList.add('form-group--need-check');
            input.dataset.error = "true";
            checkInput(formGroup, input, input.value);

            function checkSubmit() {
                if (countErrors(inputs) > 0) {
                    form.classList.add('is-invalid');
                    form.classList.remove('is-valid');
                    submitBtn.setAttribute('disabled', 'disabled');
                } else {
                    form.classList.add('is-valid');
                    form.classList.remove('is-invalid');
                    submitBtn.removeAttribute('disabled');
                }
            }

            checkSubmit();

            input.addEventListener('input', (e) => {
                checkInput(formGroup, input, e.target.value);
                checkSubmit();
            });

        });
    }
}

function countErrors(inputs) {
    let errors = 0;
    inputs.forEach(input => {
        if (input.dataset.error === "true") { errors += 1; }
    });
    if (errors) { return true; }
}

function checkInput(formGroup, input, value) {
    // проверка на наличие значения
    if (input.dataset.checkRequired == 'true' && value.replace(/\s/g, '').length > 0) {
        formGroup.classList.add('is-valid');
        input.dataset.error = false;
    } else {
        formGroup.classList.remove('is-valid');
        input.dataset.error = true;
    }
}

function modalFormHandler(id) {
    Fancybox.getInstance().focus();
    const modalFormNeedCheck = document.getElementById(id);
    const modalFormInputs = modalFormNeedCheck.querySelectorAll("input");
    checkForm(modalFormNeedCheck);
    checkEmpty(modalFormInputs);

    // показать/скрыть пароль
    const passwordItems = modalFormNeedCheck.querySelectorAll('input[type="password"]');
    if (passwordItems.length > 0) {
        passwordItems.forEach(item => {
            let passwordBtn = item.parentNode.querySelector('.icon-password');
            passwordBtn.addEventListener('click', (e) => {
                // e.preventDefault;
                passwordBtn.classList.toggle('is-active');
                if (item.getAttribute('type') == 'password') {
                    item.setAttribute('type', 'text');
                } else {
                    item.setAttribute('type', 'password');
                }
            });
        });
    }
}

const formsNeedCheck = document.querySelectorAll('form[data-check]');
formsNeedCheck.forEach(formNeedCheck => {
    checkForm(formNeedCheck);
});



// проверка на наличие любого значения в любом инпуте (для оформления/дизайна)
function checkEmpty(inputs) {
    inputs.forEach(input => {
        input.addEventListener('input', (e) => {
            if (e.target.value) {
                input.classList.add('not-empty');
            } else {
                input.classList.remove('not-empty');
            }
        });

        if (input.value) {
            input.classList.add('not-empty');
        } else {
            input.classList.remove('not-empty');
        }
    });
}

const allInputs = document.querySelectorAll('form input');
if (allInputs.length > 0) {
    checkEmpty(allInputs);
}