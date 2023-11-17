"use strict";

// показать/скрыть все размеры в таблице товара, если размеров больше 8
const productTableWrapper = document.querySelector('.product-table-wrapper');
const productTableBtn = document.querySelector('.product-table__btn');
// const productsTableRows = document.querySelectorAll('.product-table__row');
// if (productsTableRows.length > 8) {
    if (productTableWrapper && productTableBtn) {
        productTableBtn.addEventListener('click', () => {
            productTableBtn.classList.toggle('is-active');
            productTableWrapper.classList.toggle('is-active');
        });
    }
// } else {
//     if (productTableWrapper && productTableBtn) {
//         productTableWrapper.classList.remove('product-table-wrapper');
//         productTableBtn.style.display = 'none';
//     }
// }
