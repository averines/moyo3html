"use strict";

// галереия на странице Продукта
const productGallery = document.querySelector('.product-gallery');
if (productGallery) {
    Fancybox.bind("[data-fancybox='product-gallery']", {
        Thumbs: false,
        placeFocusBack: false,
        Carousel: {
            Dots: true,
            // friction: 0,
        },
        Toolbar: {
            display: [
                // { id: "prev", position: "center" },
                // { id: "counter", position: "center" },
                // { id: "next", position: "center" },
                "download",
                "close",
                // "zoom",
                // "slideshow",
                // "fullscreen",
                // "thumbs",
            ],
        },
        l10n: {
            CLOSE: "Закрыть",
            NEXT: "Вперед",
            PREV: "Назад",
            DOWNLOAD: "Скачать",
            ERROR: "Ошибка загрузки контента",
            IMAGE_ERROR: "Изображение не найдено",
            ELEMENT_NOT_FOUND: "HTML разметка не найдена",
        }
    });
}