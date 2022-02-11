"use strict";


// действия с мини-карточкой продукта===================================================
const productsCards = document.querySelectorAll('.product-card');
if (productsCards.length > 0) {
    productsCards.forEach(productsCard => {
        let productWrapper = productsCard.querySelector('.product-card__wrapper');
        let productLinkPic = productsCard.querySelector('.product-card__link');
        let productLinkHeader = productsCard.querySelector('.product-card__header');
        let productLinkPreview = productsCard.querySelector('.product-card__quickview');
        let productPicSources = productsCard.querySelectorAll('.product-card__pic source');
        let productPicImg = productsCard.querySelector('.product-card__pic img');
        let productColors = productsCard.querySelectorAll('.color-variants__item');
        let productSizes = productsCard.querySelectorAll('.size-variants__item');
        let productColorPicIndex = 0;
        let productColorActiveId;
        let swapProductPicTimer;
        let colorPics;
        let productPicPath0;
        let productPicPath1;

        if (productColors.length > 0) {
            productColorActiveId = productColors[0].dataset.colorId;
            colorPics = productColors[0].dataset.colorPics ? productColors[0].dataset.colorPics.replace(/\s/g, '').split(',') : '';
        }

        function swapProductPic(picsArray, productColorActiveId) {
            productColorPicIndex = productColorPicIndex == (picsArray.length - 1) ? 0 : productColorPicIndex + 1;

            swapProductPicTimer = setTimeout(function () {
                if (picsArray[productColorPicIndex] == productColorActiveId) {
                    productPicPath0 = `https://cdn1.moyo.moda/ws/main/470x705/${picsArray[productColorPicIndex]}`;
                    productPicPath1 = `https://cdn1.moyo.moda/ws/main/300x450/${picsArray[productColorPicIndex]}`;
                } else {
                    productPicPath0 = `https://cdn1.moyo.moda/ws/extra/470x705/${picsArray[productColorPicIndex]}`;
                    productPicPath1 = `https://cdn1.moyo.moda/ws/extra/300x450/${picsArray[productColorPicIndex]}`;
                }

                productPicSources[0].setAttribute('srcset', productPicPath0 + '.webp');
                productPicSources[1].setAttribute('srcset', productPicPath1 + '.webp');
                productPicImg.setAttribute('src', productPicPath0 + '.jpg');
                swapProductPic(picsArray, productColorActiveId);
            }, 1000);
        }


        //листание фото товара в мини-карточке товара при наведении на фото
        productWrapper.addEventListener('mouseover', () => {
            swapProductPic(colorPics, productColorActiveId);
        });


        //прекращение листания при отведении курсора с фото
        productWrapper.addEventListener('mouseout', () => {
            // productColorActiveId = productColors[0].dataset.colorId
            productColorPicIndex = 0;

            let productPicPath0 = `https://cdn1.moyo.moda/ws/main/470x705/${productsCard.dataset.productId}`;
            let productPicPath1 = `https://cdn1.moyo.moda/ws/main/300x450/${productsCard.dataset.productId}`;

            productPicSources[0].setAttribute('srcset', productPicPath0 + '.webp');
            productPicSources[1].setAttribute('srcset', productPicPath1 + '.webp');
            productPicImg.setAttribute('src', productPicPath0 + '.jpg');

            clearTimeout(swapProductPicTimer);
            if (productSizes.length > 0) {
                swapProductSizes(productColorActiveId);
            }
        });

        //листание фото товара и изменение ссылки в мини-карточке товара при наведении на thumb
        productColors.forEach(productColor => {
            productColor.addEventListener('mouseover', () => {
                productColorActiveId = productColor.dataset.colorId;
                colorPics = productColor.dataset.colorPics.replace(/\s/g, '').split(',');

                productPicPath0 = `https://cdn1.moyo.moda/ws/main/470x705/${productColorActiveId}`;
                productPicPath1 = `https://cdn1.moyo.moda/ws/main/300x450/${productColorActiveId}`;

                productPicSources[0].setAttribute('srcset', productPicPath0 + '.webp');
                productPicSources[1].setAttribute('srcset', productPicPath1 + '.webp');
                productPicImg.setAttribute('src', productPicPath0 + '.jpg');

                swapProductPic(colorPics, productColorActiveId);
                if (productSizes.length > 0) {
                    swapProductSizes(productColorActiveId);
                }

                //подстветка активного пункта
                productColors.forEach(item => {
                    item.classList.remove('is-active');
                });
                productColor.classList.add('is-active');

                //смена ссылки 
                productLinkPic.href =`product/${productColorActiveId}`;
                productLinkHeader.href =`product/${productColorActiveId}`;
                productLinkPreview.dataset.src = `product/${productColorActiveId}`;
            });

            //прекращение листания при отведении курсора с thumb
            productColor.addEventListener('mouseout', () => {
                clearTimeout(swapProductPicTimer);
                if (productSizes.length > 0) {
                    swapProductSizes(productColorActiveId);
                }
            });
        });


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
    });
}
