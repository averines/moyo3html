"use strict";

// показать/скрыть дополнительные характеристики на странице товара
function productPropertiesHandler() {
    const productProperties = document.querySelector('.product-properties');
    if (productProperties) {
        const productPropertiesBtn = productProperties.querySelector('.product-properties__btn');
        const productPropertiesMore = productProperties.querySelector('.product-properties__more');

        productPropertiesBtn.addEventListener('click', () => {
            productPropertiesBtn.classList.toggle('is-active');
            productPropertiesMore.classList.toggle('is-active');
        });
    }
}

productPropertiesHandler();
