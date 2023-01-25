"use strict";

// действия с мини-карточкой продукта===================================================


function getProductsCards() {
    const productsCards = document.querySelectorAll('.product-card');

    function checkIsMobile() {
        let isMobile = window.matchMedia || window.msMatchMedia;
        if (isMobile) {
            let match_mobile = isMobile("(pointer:coarse)");
            return match_mobile.matches;
        }
        return false;
    }

    if (productsCards.length > 0) {
        productsCards.forEach(pCard => {
            let pColors = pCard.querySelectorAll('.color-variants__item');
            let pSizes = pCard.querySelectorAll('.size-variants__item');
            let pPicSources = pCard.querySelectorAll('.product-card__pic source');
            let pPicImg = pCard.querySelector('.product-card__pic img');
            let pLinkPic = pCard.querySelector('.product-card__link');
            // let pLinkHeader = pCard.querySelector('.product-card__header');
            let swapImagesTimer;

            pCard.addEventListener('mouseover', (e) => {
                // console.log(e.target.classList);
                if (e.target.classList.contains('size-variants__item')
                    || e.target.classList.contains('product-price__base')
                    || e.target.classList.contains('product-price__discount')
                    || e.target.classList.contains('product-price__date')
                    || e.target.classList.contains('product-price__profit')
                    || e.target.classList.contains('product-price__old')
                    || e.target.classList.contains('product-price__opt')
                    || e.target.classList.contains('product-price__row')
                    || e.target.classList.contains('product-card__price')
                    || e.target.classList.contains('product-card__title')
                    || e.target.classList.contains('product-card__subtitle')
                    || e.target.classList.contains('product-card__favorite')
                    || e.target.classList.contains('product-card-slider__item')
                    || e.target.classList.contains('product-card__info')
                    || e.target.classList.contains('product-card__extra')
                    || e.target.classList.contains('product-card__extra-wrapper')
                    || e.target.classList.contains('product-card__colors')
                    || e.target.classList.contains('product-card__sizes')
                    || e.target.classList.value == ""
                ) {
                    updateColors(pCard.dataset.productId);
                    updateSizes(pCard.dataset.productId);
                    updateImage(pCard.dataset.productId);
                    updateLink(pCard.dataset.productId);
                    clearTimeout(swapImagesTimer);
                }


                if (e.target.classList.contains('product-card__link') && !checkIsMobile()) {
                    slideImages(e.target, pColors[0].dataset.images.replace(/\s/g, '').split(','));
                }

                if ((e.target.classList.contains('product-card__header')
                    || e.target.classList.contains('product-card__title')
                    || e.target.classList.contains('product-card__subtitle'))
                    && checkIsMobile()) {
                    e.target.addEventListener('click', (event) => { event.preventDefault(); })
                }

                if (e.target.classList.contains('color-variants__item')) {
                    updateColors(e.target.dataset.colorId);
                    updateSizes(e.target.dataset.colorId);
                    updateImage(e.target.dataset.colorId);
                    swapImages(e.target.dataset.images.replace(/\s/g, '').split(','), 1);

                    if (checkIsMobile()) {
                        e.target.addEventListener('click', (event) => {
                            event.preventDefault();
                            updateLink(e.target.dataset.colorId)
                        })
                    }

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

                if (checkIsMobile()) {
                    updateLink();
                }
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

            // в мобильной версии обновляем ссылку на товар при клике на цвет
            function updateLink(colorId) {
                if (colorId) {
                    pLinkPic.href = 'product/' + colorId;
                    // pLinkHeader.href = 'product/' + colorId;
                } else {
                    pLinkPic.href = 'product/' + pCard.dataset.productId;
                    // pLinkHeader.href = 'product/' + pCard.dataset.productId;
                }
            }

        });
    }
}

//получаем карточки продуктов при загрузке страницы и привязываем события
getProductsCards();