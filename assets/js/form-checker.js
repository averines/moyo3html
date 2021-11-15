"use strict";

// формы 
function formsHandler() {
    const formsNeedCheck = document.querySelectorAll('form[data-check]');
    if (formsNeedCheck.length > 0) {
        formsNeedCheck.forEach(form => {
            let inputs = form.querySelectorAll('[data-check]');
            if (inputs.length > 0) {
                inputs.forEach(input => {
                    let formGroup = input.closest('.form-group');
                    formGroup.classList.add('form-group--need-check');

                    input.addEventListener('input', (e) => {
                        inputs = form.querySelectorAll('[data-check]');
                        checkInput(formGroup, input, e.target.value);
                        checkForm(form, inputs.length);
                    });

                });

                form.addEventListener('submit', (e) => {
                    checkForm(form, inputs.length);
                });
            }
        });
    }

    function checkInput(par, el, val) {
        //пока что тут проверка только на наличие значения
        if (el.dataset.checkRequired == 'true' && val.replace(/\s/g, '').length > 0) {
            par.classList.add('is-valid');
        } else { par.classList.remove('is-valid'); }
    }

    function checkForm(form) {
        let allInputsCount = form.querySelectorAll('[data-check]');
        let validInputsCount = form.querySelectorAll('[data-check] .is-valid');
        let submitBtn = form.querySelector('[type="submit"]');

        if (allInputsCount.length === validInputsCount.length) {
            form.classList.add('is-valid');
            form.classList.remove('is-invalid');
            submitBtn.removeAttribute('disabled');
        } else {
            form.classList.add('is-invalid');
            form.classList.remove('is-valid');
            submitBtn.setAttribute('disabled', 'disabled');
        }
    }

    // на странице Регистрации
    const registrationForm = document.querySelector('.form--registration');
    let innCheck;
    if (registrationForm) {
        let typeInput = registrationForm.querySelector('input[type="hidden"]');
        let typeVariants = document.querySelectorAll('.tabs-variants .tabs-titles__item');

        let innInput = document.getElementById('registration-inn');
        let innFormRow = innInput.closest('.form-row');

        // прячем поле для инн
        innCheck = function (typeValue) {
            if (typeValue == 'type3') {
                innInput.setAttribute('data-check', 'true');
                innFormRow.style.display = 'flex';
            } else {
                innInput.removeAttribute('data-check');
                innFormRow.style.display = 'none';
            }
        };

        innCheck('type1');

        // передаем в форму значение выбранного типа регистрации
        typeVariants.forEach(typeVariant => {
            typeVariant.addEventListener('click', () => {
                let typeValue = typeVariant.dataset.tabTarget;
                typeInput.value = typeValue;
                innCheck(typeValue);
                checkForm(registrationForm);
            });
        });
    }

    // проверка инпутов в формах на пустоту
    const formGroups = document.querySelectorAll('.form-group');
    if (formGroups.length > 0) {
        formGroups.forEach(formGroup => {
            let formInputs = formGroup.querySelectorAll('input');
            if (formInputs.length > 0) {
                formInputs.forEach(formInput => {
                    if (!formInput.val) {
                        formInput.classList.add('empty');
                    }

                    formInput.addEventListener('input', (e) => {
                        if (e.target.value) {
                            formInput.classList.remove('empty');
                            formInput.classList.add('not-empty');
                        } else {
                            formInput.classList.remove('not-empty');
                            formInput.classList.add('empty');
                        }
                    });
                });
            }
        });
    }


    // показать/скрыть пароль
    const passwordItems = document.querySelectorAll('input[type="password"]');
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

formsHandler();