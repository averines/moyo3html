"use strict";

// кпопка показать/скрыть таблицу с размерами на странице продукта
const productBuy = document.querySelector('.product-buy');
let productBuyClose;

if (productBuy) {
    const productBuyCloseBtn = productBuy.querySelector('.product-buy__close');
    const productBuyShowSizes = productBuy.querySelector('.product-buy__btn--showsizes');
    const productBuyTable = productBuy.querySelector('.product-buy__table');
    const productBuyOverlay = productBuy.querySelector('.product-buy__overlay');

    productBuyShowSizes.addEventListener('click', () => {
        productBuyTable.classList.toggle('is-active');
        productBuyShowSizes.classList.toggle('is-active');
        productBuyOverlay.classList.toggle('is-active');
    });

    productBuyClose = function () {
        productBuyTable.classList.toggle('is-active');
        productBuyShowSizes.classList.toggle('is-active');
        productBuyOverlay.classList.toggle('is-active');
    };

    productBuyCloseBtn.addEventListener('click', () => {
        productBuyClose();
    });

    productBuyOverlay.addEventListener('click', () => {
        productBuyClose();
    });
}
