"use strict";

// действия с товаром в корзине ================
const cartProductItems = document.querySelectorAll('.cart-product');
if (cartProductItems.length > 0) {
    cartProductItems.forEach(cartProductItem => {
        let allSizesItems = cartProductItem.querySelectorAll('.cart-table tbody tr');
        let allSizesBtn = cartProductItem.querySelector('[data-action="show-not-added"]');
        if (allSizesItems.length > 0) {
            allSizesItems.forEach(sizeRow => {
                let sizeRowTotal = sizeRow.querySelector('.cart-table__total');
                let sizeRowPrice = sizeRow.querySelector('.cart-table__price');
            });
        }

        if (allSizesBtn) {
            if (allSizesItems.length > 0) {

                allSizesBtn.addEventListener('click', () => {
                    allSizesBtn.classList.toggle('is-active');
                    allSizesItems.forEach(allSizesItem => {
                        allSizesItem.classList.toggle('is-showed');
                    });
                });
            } else {
                allSizesBtn.style.display = "none";
            }
        }

    });
}

// имитация применения промокода и бонуса в корзине
const cartPromocodeBtn = document.querySelector('[data-action="promocode-btn"]');
if (cartPromocodeBtn) {
    cartPromocodeBtn.addEventListener('click', () => {
        cartPromocodeBtn.classList.add('is-active');
    });
}

const cartBonusBtn = document.querySelector('[data-action="bonus-btn"]');
if (cartBonusBtn) {
    cartBonusBtn.addEventListener('click', () => {
        cartBonusBtn.classList.add('is-active');
    });
}
