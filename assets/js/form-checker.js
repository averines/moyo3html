"use strict";


function checkForm(form) {
    let submitBtn = form.querySelector('[type="submit"]');
    let inputs = form.querySelectorAll('[data-check]');
    if (inputs.length > 0) {
        inputs.forEach(input => {
            let formGroup = input.closest('.form-group');
            if (formGroup) {
                formGroup.classList.add('form-group--need-check');
            } else {
                formGroup = input.closest('.form-checkbox');
            }

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
    // проверка на наличие значения или флага checked
    if (input.dataset.checkRequired == 'true' && ((input.type == "text" && value.replace(/\s/g, '').length > 0) || (input.type == "checkbox" && input.checked))) {
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


// в модальном окне оформления заявки на возврат товара - показывать поле "опишите дефект" только при выбранной причине возврата "брак"
function returnReasonHandler() {
    const returnReason = document.getElementById('return-reason');
    const returnDescription = document.querySelector('[data-action="return-description"]');
    if (returnReason && returnDescription) {
        returnReason.addEventListener('change', () => {
            if (["return-reason-1", "return-reason-2", "return-reason-3", "return-reason-5"].some(v => v == returnReason.value)) {
                returnDescription.classList.remove('is-hidden');
            } else {
                returnDescription.classList.add('is-hidden');
            }
        })
    }
}