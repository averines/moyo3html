"use strict";

// действия с товаром в корзине ================
const cartProductItems = document.querySelectorAll('.list-product');
if (cartProductItems.length > 0) {
    cartProductItems.forEach(cartProductItem => {
        let allSizesItems = cartProductItem.querySelectorAll('.list-table tbody tr');
        let allSizesBtn = cartProductItem.querySelector('[data-action="show-not-added"]');
        if (allSizesItems.length > 0) {
            allSizesItems.forEach(sizeRow => {
                let sizeRowTotal = sizeRow.querySelector('.list-table__total');
                let sizeRowPrice = sizeRow.querySelector('.list-table__price');
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


window.addEventListener('click', (e) => {
    if (e.target.dataset.hasOwnProperty('action')) {
        if (e.target.dataset.action === 'toggle-products-in-cart') {
            let productsCheckboxes = document.querySelectorAll('[data-action="toggle-product-in-cart"]');
            if (productsCheckboxes.length > 0) {
                let allChecked = true;
                productsCheckboxes.forEach(productCheckbox => {  // проверяем, что все чекбоксы активны
                    if (!productCheckbox.checked) { allChecked = false; }
                });

                if (allChecked) {
                    productsCheckboxes.forEach(productCheckbox => { // если все чекбоксы активны, то отключаем
                        productCheckbox.checked = false;
                        e.target.classList.remove('is-active');
                    });
                } else {
                    productsCheckboxes.forEach(productCheckbox => { // если хотя бы один чекбокс не активен, то включаем все
                        productCheckbox.checked = true;
                        e.target.classList.add('is-active');
                    });
                }

                setCheckedProductsinCartCount(document.querySelectorAll('[data-action="toggle-product-in-cart"]:checked').length);
            }
        }

        if (e.target.dataset.action === 'toggle-product-in-cart') {
            let controlBtn = document.querySelector('[data-action="toggle-products-in-cart"]');
            if (e.target.checked == false) {
                controlBtn.classList.remove('is-active');
            } else {
                let productsCheckboxes = document.querySelectorAll('[data-action="toggle-product-in-cart"]');
                let allChecked = true;
                productsCheckboxes.forEach(productCheckbox => { if (!productCheckbox.checked) { allChecked = false; } });
                if (allChecked) { controlBtn.classList.add('is-active'); }
            }
            setCheckedProductsinCartCount(document.querySelectorAll('[data-action="toggle-product-in-cart"]:checked').length);
        }

    }
});

function setCheckedProductsinCartCount(count) {
    let el = document.querySelector('.cart-control__content>span');
    if (el) { el.innerText = count }
}