"use strict";

// действия с мини-карточкой продукта===================================================

let productsCards;

function getProductsCards() {
    productsCards = document.querySelectorAll('.product-card');
}

//получаем карточки продуктов при загрузке страницы
getProductsCards();

if (productsCards.length > 0) {
    productsCards.forEach(pCard => {
        let pColors = pCard.querySelectorAll('.color-variants__item');
        let pSizes = pCard.querySelectorAll('.size-variants__item');
        let pPicSources = pCard.querySelectorAll('.product-card__pic source');
        let pPicImg = pCard.querySelector('.product-card__pic img');
        let swapImagesTimer;

        pCard.addEventListener('mouseover', (e) => {
            if (e.target.classList.contains('color-variants__item')) {
                updateColors(e.target.dataset.colorId);
                updateSizes(e.target.dataset.colorId);
                updateImage(e.target.dataset.colorId);
                swapImages(e.target.dataset.images.replace(/\s/g, '').split(','), 1);
            } else if (e.target.classList.contains('product-card__link')) {
                slideImages(e.target, pColors[0].dataset.images.replace(/\s/g, '').split(','));
            } else {
                updateColors(pCard.dataset.productId);
                updateSizes(pCard.dataset.productId);
                updateImage(pCard.dataset.productId);
                clearTimeout(swapImagesTimer);
            }
        }, true);

        pCard.addEventListener('mouseout', () => {
            updateColors();
            updateSizes();
            clearTimeout(swapImagesTimer);
        });

        pCard.addEventListener('mouseleave', (e) => {
            updateColors();
            updateSizes();
            updateImage(e.target.dataset.productId);
            clearTimeout(swapImagesTimer);
        });

        // обновление иконок цветов
        function updateColors(colorId) {
            pColors.forEach(pColor => {
                if (pColor.dataset.colorId == colorId) {
                    pColor.classList.add('is-active');
                } else { pColor.classList.remove('is-active'); }
            });
        }

        // обновление показываемых размеров
        function updateSizes(colorId) {
            pSizes.forEach(pSize => {
                if (pSize.dataset.colorId == colorId) {
                    pSize.classList.add('is-showed');
                } else { pSize.classList.remove('is-showed'); }
            });
        }

        // обновление фотки
        function updateImage(imageId) {
            let cdnFolder = imageId.includes('-') ? "extra" : "main";
            let path0 = `https://cdn1.moyo.moda/ws/${cdnFolder}/470x705/${imageId}`;
            let path1 = `https://cdn1.moyo.moda/ws/${cdnFolder}/300x450/${imageId}`;
            pPicSources[0].setAttribute('srcset', path0 + '.webp');
            pPicSources[1].setAttribute('srcset', path1 + '.webp');
            pPicImg.setAttribute('src', path0 + '.jpg');
        }

        // авто-листание фоток
        function swapImages(images, index) {
            swapImagesTimer = setTimeout(function () {
                updateImage(images[index]);
                index = index == images.length - 1 ? 0 : index + 1;
                swapImages(images, index);
            }, 1000);
        }

        // ручное листание фоток при шуршании по фотке
        function slideImages(el, images) {
            let slider = document.createElement('div');
            slider.classList.add('product-card-slider');
            
            images.forEach(image => {
                const sliderItem = document.createElement('div');
                sliderItem.classList.add('product-card-slider__item');
                sliderItem.dataset.imageId = image;
                sliderItem.addEventListener('mouseover', () => {
                    updateImage(image);
                });
                slider.appendChild(sliderItem);
            });

            el.appendChild(slider);
        }

    });
}