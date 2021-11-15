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