"use strict";

// кастомные элементы на странице Личные данные
const settingSelects = document.querySelectorAll('.setting-select');
if (settingSelects.length > 0) {
    settingSelects.forEach(settingSelect => {
        settingSelect.addEventListener('click', () => {
            settingSelect.classList.toggle('is-active');
        });

        let settingSelectOptions = settingSelect.querySelectorAll('.setting-select__item');
        settingSelectOptions.forEach(settingSelectOption => {
            settingSelectOption.addEventListener('click', () => {
                if (!settingSelectOption.classList.contains('is-active')) {
                    settingSelectOptions.forEach(item => {
                        item.classList.remove('is-active');
                    });
                    settingSelectOption.classList.add('is-active');
                }
            });
        });
    });
}


// показать форму с фактическим адресом, если он не совпадает с юридческим
const addressEqualEl = document.querySelector('[data-action="address-equal"]');
if (addressEqualEl) {
    const addressEqualForm = addressEqualEl.closest('.setting__content').querySelector('.form-minimal');
    addressEqualForm.classList.add('is-hidden');
    addressEqualEl.addEventListener('click', () => {
        addressEqualForm.classList.toggle('is-hidden');
    });
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

// на странице выбора Доставки
const orderDeliveryInfo = document.querySelector('[data-delivery-content]');
let deliveryCheck;

if (orderDeliveryInfo) {
    let typeVariants = document.querySelectorAll('[data-delivery-select] .tabs-titles__item');
    let goToPaymentBtn = document.querySelector('[data-check-delivery-type]');
    
    // прячем дополнительные поля в доставке
    deliveryCheck = function (typeValue) {
        if (typeValue == 'type2' || typeValue == 'type3') {
            orderDeliveryInfo.style.display = 'block';
        } else {
            orderDeliveryInfo.style.display = 'none';
        }

        // снимаем блокировку кнопки "выбор оплаты"
        goToPaymentBtn.classList.remove('is-disabled');
    };

    // передаем в форму значение выбранного типа регистрации
    typeVariants.forEach(typeVariant => {
        typeVariant.addEventListener('click', () => {
            let typeValue = typeVariant.dataset.tabTarget;
            typeVariants.forEach(tv => tv.classList.remove('is-active'))
            typeVariant.classList.add('is-active')
            deliveryCheck(typeValue);
        });
    });
}
