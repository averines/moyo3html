"use strict";

// фильтр брендов
const brandFilter = document.querySelector('.brand-filter');
if (brandFilter) {
    const brandFilterTitles = brandFilter.querySelectorAll('.titles__item');
    const brandFilterItems = brandFilter.querySelectorAll('.brand-filter-list__item');

    if (brandFilterTitles && brandFilterItems) {
        brandFilterTitles.forEach(brandFilterTitle => {
            brandFilterTitle.addEventListener('click', () => {

                // добавляем активный класс кнопке
                brandFilterTitles.forEach(item => {
                    item.classList.remove('is-active');
                });
                brandFilterTitle.classList.add('is-active');

                // добавляем активный класс к элементу списка
                brandFilterItems.forEach(brandFilterItem => {
                    if (brandFilterItem.dataset.filterId == brandFilterTitle.dataset.filterTarget) {
                        brandFilterItem.classList.remove('is-hidden');
                        brandFilterItem.classList.add('is-active');
                    } else if (brandFilterTitle.dataset.filterTarget == 'all') {
                        brandFilterItem.classList.remove('is-hidden');
                    } else {
                        brandFilterItem.classList.remove('is-active');
                        brandFilterItem.classList.add('is-hidden');
                    }
                });
            });
        }
        );
    }
}