"use strict";
let slider = document.querySelector(".slider-products");

const checkVisible = function (target) {

    var tPos = {
        top: window.pageYOffset + target.getBoundingClientRect().top,
        left: window.pageXOffset + target.getBoundingClientRect().left,
        right: window.pageXOffset + target.getBoundingClientRect().right,
        bottom: window.pageYOffset + target.getBoundingClientRect().bottom
    },
        // Получаем позиции окна
        wPos = {
            top: window.pageYOffset,
            left: window.pageXOffset,
            right: window.pageXOffset + document.documentElement.clientWidth,
            bottom: window.pageYOffset + document.documentElement.clientHeight
        };

    if (tPos.bottom > wPos.top && tPos.top < wPos.bottom && tPos.right > wPos.left && tPos.left < wPos.right) {
        // элемент виден в области окна
        target.classList.add("shake");
    } else {
        target.classList.remove("shake");
    }
};

if (slider) {
    window.addEventListener('scroll', function () { checkVisible(slider); });
    checkVisible(slider);
}