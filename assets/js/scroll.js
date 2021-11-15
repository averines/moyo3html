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