"use strict";

// меню каталога боковое
const documentBody = document.querySelector('body');
const menuСatalogWrapper = document.querySelector('.menu-catalog');
const menuСatalogBtnOpen = document.querySelector('.menu-catalog__btn-open');
// const subcategoriesLinks = document.querySelectorAll('.subcategories__link');
// const subcategoryMenuCloned = document.querySelector('.subcategory-menu-cloned');

let subcategoriesLinks;
let subcategoryMenuCloned;
let menuCatalogClose;
let menuCatalogIsLoaded = false;

const getMenuCatalog = () => {
    let req = new XMLHttpRequest();
    req.onreadystatechange = function () {
        if (req.readyState === 4 && req.status === 200) {
            menuСatalogWrapper.innerHTML = req.responseText;

            let menuCatalogAccordions = document.querySelectorAll('.menu-catalog .accordion');
            if (menuCatalogAccordions) {
                menuCatalogAccordions.forEach(accordion => {
                    let accInstance = new Accordion(accordion);
                    accInstance.start();
                });
            }

            subcategoriesLinks = document.querySelectorAll('.subcategories__link');
            subcategoryMenuCloned = document.querySelector('.subcategory-menu-cloned');


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
                        if (parentAccordion) {
                            parentAccordion.classList.remove('accordion--content-no-show');
                        }
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
    };
    req.open("GET", "ajax-menu-catalog.html");
    req.send();
    menuCatalogIsLoaded = true;
};

if (menuСatalogWrapper) {
    menuСatalogBtnOpen.addEventListener('click', () => {
        if (!menuCatalogIsLoaded) {
            getMenuCatalog();
        }
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
}
