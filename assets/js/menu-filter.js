"use strict";

// меню фильтров на странице подкатегории (в каталоге)
const menuFilterBtn = document.getElementById('btn-filter');
const menuFilterBlock = document.querySelector('.menu-filters');
const menuFilterWrapper = document.querySelector('.menu-filters-wrapper');
const menuFilterCloseBtn = document.querySelector('.menu-filters__close');
const menuFilterCheckboxItems = document.querySelectorAll('.filter-checkbox__item input');
const selectedFiltersWrapper = document.querySelector('.filters-selected');
const menuFiltersApplyBtn = document.querySelector('.menu-filters__apply');
let menuFilterIsActive = false;

const menuFilterOpen = function () {
    menuFilterIsActive = true;
    menuFilterBtn.classList.add('is-active');
    menuFilterWrapper.classList.add('is-active');
    menuFilterBlock.classList.add('is-active');
};

const menuFilterClose = function () {
    menuFilterIsActive = false;
    menuFilterBtn.classList.remove('is-active');
    menuFilterWrapper.classList.remove('is-active');
    menuFilterBlock.classList.remove('is-active');
};

if (menuFilterBtn) {
    menuFilterBtn.addEventListener('click', () => {
        if (!menuFilterIsActive) { menuFilterOpen(); }
        else { menuFilterClose(); }
    });
}

if (menuFilterCloseBtn) {
    menuFilterCloseBtn.addEventListener('click', () => {
        menuFilterClose();
    });
}

if (menuFilterWrapper) {
    menuFilterWrapper.addEventListener('click', (e) => {
        let target = e.target.className;
        if (target.includes('menu-filters-wrapper')) {
            menuFilterClose();
        }
    });
}

if (menuFiltersApplyBtn) {
    menuFiltersApplyBtn.addEventListener('click', () => {
        menuFilterClose();
    });
}

// отображение выбранных фильтров на странице
if (menuFilterCheckboxItems) {
    menuFilterCheckboxItems.forEach(item => {
        let itemTitle;
        if (item.parentNode.querySelector('.filter-checkbox__title')) {
            itemTitle = item.parentNode.querySelector('.filter-checkbox__title').innerHTML;
        }
        item.addEventListener('change', () => {
            if (item.checked) {
                let selectedFilterItem = document.createElement('a');
                selectedFilterItem.classList.add('filters-selected__item');
                selectedFilterItem.dataset.id = item.id;
                selectedFilterItem.innerHTML = itemTitle;
                selectedFiltersWrapper.appendChild(selectedFilterItem);

                // удалить выбранный фильтр при клике по нему
                let selectedFiltersItems = selectedFiltersWrapper.querySelectorAll('.filters-selected__item');
                selectedFiltersItems.forEach(selectedFiltersItem => {
                    selectedFiltersItem.addEventListener('click', () => {
                        selectedFiltersItem.parentNode.removeChild(selectedFiltersItem);

                        //снимаем галочку в меню фильтров, если нажали на элемент в списке выбранных фильтров
                        Array.prototype.map.call(menuFilterCheckboxItems, menuFilterCheckboxItem => {
                            if (menuFilterCheckboxItem.id == selectedFiltersItem.dataset.id) {
                                menuFilterCheckboxItem.checked = false;
                            }
                        });
                    });
                });

            } else {
                let selectedFiltersItems = selectedFiltersWrapper.querySelectorAll('.filters-selected__item');
                //удаляем из списка выбранных фильтров тот фильтр, который стал не checked
                Array.prototype.map.call(selectedFiltersItems, selectedFiltersItem => {
                    if (selectedFiltersItem.dataset.id == item.id) {
                        selectedFiltersItem.parentNode.removeChild(selectedFiltersItem);
                    }
                });
            }
        });
    });
}

// сброс развернутых элементов при переходе в десктопный режим
// window.addEventListener('resize', () => {

//     // if (document.body.clientWidth> 1200) {
//     //     menuInfoBtn.classList.remove('is-active')
//     //     menuInfoWindow.classList.remove('is-active')
//     //     menuUserBtn.classList.remove('is-active')
//     //     menuUserWindow.classList.remove('is-active')
//     // }

//     if (document.body.clientWidth < 768) {
//         togglersItems.forEach(item => {
//             item.classList.remove('is-active');
//         });
//     }
// }, false);