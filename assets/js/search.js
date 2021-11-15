"use strict";


// поиск
const searchWrapper = document.querySelector('.search');
let activeSuggestionsClear;
let suggestionsMarkerdClear;

if (searchWrapper) {
    const searchForm = searchWrapper.querySelector('.search-form');
    const searchClear = searchForm.querySelector('.search-form__clear');
    const searchInput = searchForm.querySelector('.search-form__input');
    const searchBtn = document.querySelector('.search__btn');
    let searchSuggestionsItems = searchWrapper.querySelectorAll('.search-suggestions__item');
    let activeSuggestionsItemIndex = -1;
    let activeSuggestionsItemText = '';

    activeSuggestionsClear = function () {
        searchSuggestionsItems.forEach(searchSuggestionsItem => {
            searchSuggestionsItem.classList.remove('is-active');
        });
    };

    suggestionsMarkerdClear = function () {
        searchSuggestionsItems.forEach(searchSuggestionsItem => {
            let str = searchSuggestionsItem.textContent.toLowerCase();
            str = str.replaceAll('<b>', '');
            str = str.replaceAll('</b>', '');
            searchSuggestionsItem.innerHTML = str;
        });
    };

    searchBtn.addEventListener('click', (e) => {
        e.preventDefault();
        searchWrapper.classList.toggle('is-active');
        searchWrapper.classList.toggle('is-focused');
        searchBtn.classList.toggle('is-active');
        searchInput.focus();

        // прячем другие меню при активации меню поиска
        menuUser.classList.remove('is-active');
        menuTop.classList.remove('is-active');
        menuTopBtn.classList.remove('is-active');
    });

    window.addEventListener('resize', () => {
        if (document.body.clientWidth >= 1200) {
            searchWrapper.classList.remove('is-active');
            searchBtn.classList.remove('is-active');
        }
    });

    searchInput.addEventListener('click', () => {
        searchWrapper.classList.add('is-focused');
    });

    // перелистывание подсказок
    searchInput.addEventListener('keydown', (e) => {
        searchSuggestionsItems = searchWrapper.querySelectorAll('.search-suggestions__item');

        if (e.code == 'ArrowDown' || e.code == 'ArrowUp') {
            e.preventDefault();

            //делаем все пункты неактивными
            activeSuggestionsClear();

            if (e.code == 'ArrowDown') {
                if (activeSuggestionsItemIndex < searchSuggestionsItems.length - 1) {
                    activeSuggestionsItemIndex++;
                } else {
                    activeSuggestionsItemIndex = 0;
                }
            }

            if (e.code == 'ArrowUp') {
                if (activeSuggestionsItemIndex > 0) {
                    activeSuggestionsItemIndex--;
                } else {
                    activeSuggestionsItemIndex = searchSuggestionsItems.length - 1;
                }
            }

            // делаем этот пункт активным
            searchSuggestionsItems[activeSuggestionsItemIndex].classList.add('is-active');

            // получаем текст запроса
            activeSuggestionsItemText = searchSuggestionsItems[activeSuggestionsItemIndex].textContent;
            searchInput.value = activeSuggestionsItemText.toLowerCase();
        }
    });

    searchSuggestionsItems.forEach((searchSuggestionsItem, index) => {
        searchSuggestionsItem.addEventListener('click', () => {
            searchInput.value = searchSuggestionsItem.textContent;
            activeSuggestionsItemIndex = index;
            searchInput.focus();
            activeSuggestionsClear();
            searchSuggestionsItem.classList.add('is-active');
        });

        searchSuggestionsItem.addEventListener('mouseover', () => {
            activeSuggestionsItemIndex = index;
            activeSuggestionsClear();
            searchSuggestionsItem.classList.add('is-active');
        });
    });

    // появление кнопки Очистить поиск
    searchInput.addEventListener('keyup', () => {
        if (searchInput.value) {
            searchClear.classList.add('is-active');
        } else {
            searchClear.classList.remove('is-active');
        }
    });

    // выделение вхождений в подсказки
    searchInput.addEventListener('keyup', () => {
        if (searchInput.value && searchInput.value.length > 1) {
            let val = searchInput.value.toLowerCase();
            searchSuggestionsItems = searchWrapper.querySelectorAll('.search-suggestions__item');
            searchSuggestionsItems.forEach(searchSuggestionsItem => {
                let str = searchSuggestionsItem.textContent.toLowerCase();
                str = str.replaceAll(val, `<b>${val}</b>`);
                searchSuggestionsItem.innerHTML = str;
            });
        } else {
            suggestionsMarkerdClear();
        }
    });

    // кнопка Очистить поиск
    searchClear.addEventListener('click', (e) => {
        e.preventDefault();
        searchInput.value = '';
        searchClear.classList.remove('is-active');
        searchInput.focus();
        suggestionsMarkerdClear();
    });

    // закрываем подсказки, если совершен клика за пределами поиска
    const body = document.querySelector('body');
    body.addEventListener('click', (e) => {
        if (!e.target.closest('.search') && !e.target.classList.contains('search__btn')) {
            searchWrapper.classList.remove('is-focused');
        }

        if (!e.target.closest('.search') && !e.target.classList.contains('search__btn')) {
            searchWrapper.classList.remove('is-active');
            searchBtn.classList.remove('is-active');
        }
    });
}
