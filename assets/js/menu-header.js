"use strict";

// показать/скрыть меню пользователя в шапке
const menuUser = document.querySelector('.menu-user');
if (menuUser) {
    const menuUserBtn = menuUser.querySelector('.menu-user__icon');
    if (menuUserBtn) {
        menuUserBtn.addEventListener('click', (e) => {
            if (document.body.clientWidth <= 1200) {
                e.preventDefault();
            }

            menuUser.classList.toggle('is-active');

            // прячем другие меню при активации меню пользователя
            menuTop.classList.remove('is-active');
            menuTopBtn.classList.remove('is-active');
        });

        window.addEventListener('resize', () => {
            if (document.body.clientWidth > 1200) {
                menuUser.classList.remove('is-active');
            }
        });
    }
}

// показать/скрыть меню информации в шапке
const menuTop = document.querySelector('.menu-top');
const menuTopBtn = document.querySelector('.menu-top__btn');
if (menuTop) {
    menuTopBtn.addEventListener('click', (e) => {
        e.preventDefault();
        menuTop.classList.toggle('is-active');
        menuTopBtn.classList.toggle('is-active');

        // прячем другие меню при активации меню пользователя
        menuUser.classList.remove('is-active');
        // menuUserBtn.classList.remove('is-active');
    });

    window.addEventListener('resize', () => {
        if (document.body.clientWidth >= 1200) {
            menuTop.classList.remove('is-active');
            menuTopBtn.classList.remove('is-active');
        }
    });
}
