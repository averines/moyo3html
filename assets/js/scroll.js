"use strict";

// плавный переход к якорю
const scrollToLinks = document.querySelectorAll('[data-action="scroll"]');
if (scrollToLinks) {
    scrollToLinks.forEach(scrollToLink => {
        scrollToLink.addEventListener('click', (e) => {
            e.preventDefault();
            const scrollToBlock = scrollToLink.getAttribute('href');
            document.querySelector(scrollToBlock).scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    });
}

// плавно перемещаем к элементу с атрибутом data-scroll-onload
const scrollHereElements = document.querySelectorAll('[data-scroll-onload]');
if (scrollHereElements) {
    scrollHereElements.forEach(scrollHereElement => {
        scrollHereElement.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
    })
}

// в личном кабинете перемещаем на высоту меню при загрузке страницы
const menuTabs = document.querySelector('.menu-tabs');
if (menuTabs && window.innerWidth < 768 ) {
    let menuTabsCoord = menuTabs.getBoundingClientRect()
    window.scrollTo({
        top: menuTabsCoord.bottom - 60,
        left: 0,
        behavior: 'smooth'
    })
}

// показываем кнопку прокрутки, если промотали достаточно
const scrollToTopBtn = document.querySelector('.btn-goto');
if (scrollToTopBtn) {
    let wScrollRatio;
    window.addEventListener('scroll', function () {
        wScrollRatio = window.scrollY / window.innerHeight;

        if (wScrollRatio > 1) {
            if (!scrollToTopBtn.classList.contains('is-active')) {
                scrollToTopBtn.classList.add('is-active');
            }
        } else {
            scrollToTopBtn.classList.remove('is-active');
        }
    });
}
