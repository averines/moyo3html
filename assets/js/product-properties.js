"use strict";

// показать дополнительные характеристики на странице товара
function productPropertiesHandler() {
    const productProperties = document.querySelector('.product-info__properties');
    if (productProperties) {
        const productPropertiesBtn = productProperties.querySelector('.product-properties__btn');
        const productPropertiesItems = productProperties.querySelectorAll('.product-properties__item');

        productPropertiesBtn.addEventListener('click', () => {
            // productPropertiesBtn.classList.toggle('is-active');
            productPropertiesBtn.remove();

            productPropertiesItems.forEach(productPropertiesItem => {
                productPropertiesItem.classList.add('is-active')
            })

        });
    }
}

productPropertiesHandler();
