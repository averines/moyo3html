"use strict";

// меню каталога боковое
const documentBody = document.querySelector('body');
const menuСatalogWrapper = document.querySelector('.menu-catalog');
const menuСatalogBtnOpen = document.querySelector('.menu-catalog__btn-open');
const subcategoriesLinks = document.querySelectorAll('.subcategories__link');
const subcategoryMenuCloned = document.querySelector('.subcategory-menu-cloned');
let menuCatalogClose;

if (menuСatalogWrapper) {

    menuСatalogBtnOpen.addEventListener('click', () => {
        menuСatalogWrapper.classList.add('is-showed');
        documentBody.classList.add('body-overlay');
    });

    menuCatalogClose = function () {
        menuСatalogWrapper.classList.remove('is-showed');
        subcategoryMenuCloned.classList.remove('is-active');
        documentBody.classList.remove('body-overlay');
    };

    menuСatalogWrapper.addEventListener('click', (e) => {
        if (e.target.className.includes('menu-catalog')) {
            menuCatalogClose();
        }
    });

    subcategoriesLinks.forEach(subcategoriesLink => {
        let parentAccordion = subcategoriesLink.closest('.subcategories.accordion');
        let subcategoryMenu = subcategoriesLink.closest('.subcategories__item').querySelector('.subcategory-menu');
        let dublicateMenu;

        function subcategoriesLinkHandler() {
            if (document.body.clientWidth >= 768) {

                if (parentAccordion) {
                    // отключаем функционал аккордиона
                    parentAccordion.classList.add('accordion--content-no-show');
                }


                subcategoriesLink.addEventListener('mouseover', () => {
                    if (subcategoryMenu) {
                        // делаем этот пункт активным
                        subcategoriesLinks.forEach(item => {
                            item.classList.remove('is-active');
                        });
                        subcategoriesLink.classList.add('is-active');

                        subcategoryMenuCloned.classList.add('is-active');
                        subcategoryMenuCloned.innerHTML = '';
                        subcategoryMenuCloned.appendChild(dublicateMenu);
                    } else {
                        subcategoriesLinks.forEach(item => {
                            item.classList.remove('is-active');
                        });
                        subcategoryMenuCloned.classList.remove('is-active');
                    }
                });
            } else {
                // включаем функционал аккордиона
                parentAccordion.classList.remove('accordion--content-no-show');
            }
        }

        subcategoriesLinkHandler();

        window.addEventListener('resize', () => {
            subcategoriesLinkHandler();
        });

        if (subcategoryMenu) {
            dublicateMenu = subcategoryMenu.cloneNode(true);

            // вставляем ссылку "Все подкатегории", потому что в данные момент этот пункт открывает аккордион, и не переходит по ссылке
            let childMenu = subcategoriesLink.closest('.subcategories__item').querySelector('.subcategory-menu');
            let childMenuLink = document.createElement('a');
            childMenuLink.classList.add('subcategory-menu__item');
            childMenuLink.classList.add('subcategory-menu__item--special');
            childMenuLink.setAttribute('href', subcategoriesLink.getAttribute('href'));
            childMenuLink.innerHTML = 'Все подкатегории';
            childMenu.insertBefore(childMenuLink, childMenu.querySelector('.subcategory-menu__item'));
        }
    });

}
