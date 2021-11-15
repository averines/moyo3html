"use strict";

// имитация добавления размера в корзину
const productTableQuantityItems = document.querySelectorAll('.product-table .quantity');
if (productTableQuantityItems) {
    productTableQuantityItems.forEach(productTableQuantityItem => {
        const plus = productTableQuantityItem.querySelector('.quantity__btn--plus');
        const minus = productTableQuantityItem.querySelector('.quantity__btn--minus');
        const input = productTableQuantityItem.querySelector('.quantity__input');
        const parentRow = input.closest('tr');
        let inputValue = 0;

        input.addEventListener('change', () => {
            updateTotal();
        });

        plus.addEventListener('click', () => {
            inputValue = Number(input.value) + 1;
            input.value = inputValue;

            if (inputValue >= 1) {
                parentRow.classList.add('is-added');
                minus.disabled = false;
            }

            updateTotal();
        });

        minus.addEventListener('click', () => {
            if (inputValue > 0) {
                inputValue = Number(input.value) - 1;
                input.value = inputValue;
                minus.disabled = false;
            }

            // if (inputValue == 1) {
            //     minus.classList.add('quantity__btn--delete');
            // }

            if (inputValue == 0) {
                parentRow.classList.remove('is-added');
                // minus.classList.remove('quantity__btn--delete');
                minus.disabled = true;
            }

            updateTotal();
        });
    });
}


// обновление подитога на странице товара
const productTotalCostEl = document.querySelector('.product-table__total .after-currency');
const productTotalQuantityEl = document.querySelector('.product-table__total .after-pz');
const productTotalEl = document.querySelector('[data-action="product-table-total"]');

function updateTotal() {
    let productTotalCost = 0;
    let productTotalQuantity = 0;

    poductsTableRows.forEach(poductsTableRow => {
        const inputVal = poductsTableRow.querySelector('.quantity__input').value;
        const price = poductsTableRow.querySelector('.product-price__base').innerHTML.replace(/\s/g, '');

        productTotalCost = productTotalCost + (Number(inputVal) * price);
        productTotalQuantity = productTotalQuantity + Number(inputVal);
    });
    productTotalEl.classList.add('is-animated');
    productTotalCostEl.innerHTML = productTotalCost.toLocaleString('ru');
    productTotalQuantityEl.innerHTML = productTotalQuantity;

    setTimeout(() => { productTotalEl.classList.remove('is-animated'); }, 100);
}
