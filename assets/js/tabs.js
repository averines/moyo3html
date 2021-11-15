"use strict";

//табы
const tabsContainers = document.querySelectorAll('[data-action="tabs"]');
if (tabsContainers.length > 0) {
    tabsContainers.forEach(tabsContainer => {
        let tabsContentItems = tabsContainer.querySelectorAll('.tabs-content__item');
        let tabsTitlesItems = tabsContainer.querySelectorAll('.tabs-titles__item');

        tabsTitlesItems[0].classList.add('is-active');
        tabsContentItems[0].classList.add('is-active');

        tabsTitlesItems.forEach(tabsTitlesItem => {
            tabsTitlesItem.addEventListener('click', (e) => {
                let activeContentTabId = tabsTitlesItem.dataset.tabTarget;

                //убираем активный класс со всех заголовков
                tabsTitlesItems.forEach(item => { item.classList.remove('is-active'); });

                // делаем активным кликнутый заголовок
                tabsTitlesItem.classList.add('is-active');

                // let activeContentTab = tabsContainer.querySelector(`[data-tabid="${activeContentTabId}"]`)
                let activeContentTab = tabsContainer.querySelector(`[data-tab-id="${activeContentTabId}"]`);

                //убираем активный класс со всех элементов с контентом
                tabsContentItems.forEach(item => { item.classList.remove('is-active'); });

                // делаем активным нужный контейнер с контентом
                activeContentTab.classList.add('is-active');
            });
        });
    });
}

