"use strict";


// действия с мини-карточкой продукта===================================================
const productsCards = document.querySelectorAll('.product-card');
if (productsCards.length > 0) {
    productsCards.forEach(productsCard => {
        let productPic = productsCard.querySelector('.product-card__pic');
        let productPicSources = productsCard.querySelectorAll('.product-card__pic source');
        let productPicImg = productsCard.querySelector('.product-card__pic img');
        let productColors = productsCard.querySelectorAll('.color-variants__item');
        let productSizes = productsCard.querySelectorAll('.size-variants__item');
        let productColorPicIndex = 0;
        let swapProductPicTimer;
        let productColorActiveId;
        let colorPics;

        if (productColors.length > 0) {
            productColorActiveId = productColors[0].dataset.colorId;
            colorPics = productColors[0].dataset.colorPics ? productColors[0].dataset.colorPics.replace(/\s/g, '').split(',') : '';
        }

        function swapProductPic(picsArray, productColorActiveId) {
            productColorPicIndex = productColorPicIndex == (picsArray.length - 1) ? 0 : productColorPicIndex + 1;
            swapProductPicTimer = setTimeout(function () {
                let productPicPath0 = `./i/products/470/${productsCard.dataset.productId}-${productColorActiveId}-${picsArray[productColorPicIndex]}-470`;
                let productPicPath1 = `./i/products/300/${productsCard.dataset.productId}-${productColorActiveId}-${picsArray[productColorPicIndex]}-300`;
                productPicSources[0].setAttribute('srcset', productPicPath0 + '.webp');
                productPicSources[1].setAttribute('srcset', productPicPath1 + '.webp');
                productPicImg.setAttribute('src', productPicPath0 + '.jpg');
                swapProductPic(picsArray, productColorActiveId);
            }, 1000);
        }

        //смена доступных размеров при наведении на thumb
        let swapProductSizes;
        if (productSizes.length > 0) {
            swapProductSizes = function (productColorActiveId) {
                productSizes.forEach(productSize => {
                    if (productSize.dataset.colorId == productColorActiveId) {
                        productSize.classList.add('is-showed');
                    } else {
                        productSize.classList.remove('is-showed');
                    }
                });
            };
        }

        //листание фото товара в мини-карточке товара при наведении на фото
        productPic.addEventListener('mouseover', () => {
            swapProductPic(colorPics, productColorActiveId);
        });

        //прекращение листания при отведении курсора с фото
        productPic.addEventListener('mouseout', () => {
            // productColorActiveId = productColors[0].dataset.colorId
            productColorPicIndex = 0;
            let productPicPath0 = `./i/products/470/${productsCard.dataset.productId}-${productColorActiveId}-pic1-470`;
            let productPicPath1 = `./i/products/300/${productsCard.dataset.productId}-${productColorActiveId}-pic1-300`;
            productPicSources[0].setAttribute('srcset', productPicPath0 + '.webp');
            productPicSources[1].setAttribute('srcset', productPicPath1 + '.webp');
            productPicImg.setAttribute('src', productPicPath0 + '.jpg');

            clearTimeout(swapProductPicTimer);
            swapProductSizes(productColorActiveId);
        });

        productColors.forEach(productColor => {
            //листание фото товара в мини-карточке товара при наведении на thumb
            productColor.addEventListener('mouseover', () => {
                productColorActiveId = productColor.dataset.colorId;
                let productPicPath0 = `./i/products/470/${productsCard.dataset.productId}-${productColorActiveId}-pic1-470`;
                let productPicPath1 = `./i/products/300/${productsCard.dataset.productId}-${productColorActiveId}-pic1-300`;
                productPicSources[0].setAttribute('srcset', productPicPath0 + '.webp');
                productPicSources[1].setAttribute('srcset', productPicPath1 + '.webp');
                productPicImg.setAttribute('src', productPicPath0 + '.jpg');
                swapProductPic(colorPics, productColorActiveId);
                swapProductSizes(productColorActiveId);

                //подстветка активного пункта
                productColors.forEach(item => {
                    item.classList.remove('is-active');
                });
                productColor.classList.add('is-active');
            });

            //прекращение листания при отведении курсора с thumb
            productColor.addEventListener('mouseout', () => {
                clearTimeout(swapProductPicTimer);
                swapProductSizes(productColorActiveId);
            });
        });
    });
}
