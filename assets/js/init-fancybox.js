"use strict";


Fancybox.bind("[data-fancybox]", {
    infinite: false,
    dragToClose: false,
    groupAll: false,
    autoFocus: false,
    trapFocus: false,
    placeFocusBack: false,
    l10n: {
        CLOSE: "Закрыть",
        NEXT: "Вперед",
        PREV: "Назад",
        MODAL: "Можно закрыть, нажав ESC",
        ERROR: "Ошибка",
        IMAGE_ERROR: "Изображение не найдено",
        ELEMENT_NOT_FOUND: "HTML не найден",
        AJAX_NOT_FOUND: "Ошибка при загрузке AJAX: Not Found",
        AJAX_FORBIDDEN: "Ошибка при загрузке AJAX: Forbidden",
        IFRAME_ERROR: "Ошибка при загрузке",
    },
    // on: {
    //     "*": (event, fancybox, slide) => {
    //         console.log(`event: ${event}`);
    //     }
    // }
});


Fancybox.bind("[data-fancybox='product']", {
    dragToClose: false,
    groupAll: false,
    groupAttr: false,
    l10n: {
        CLOSE: "Закрыть",
        NEXT: "Вперед",
        PREV: "Назад",
        MODAL: "Можно закрыть, нажав ESC",
        ERROR: "Ошибка",
        IMAGE_ERROR: "Изображение не найдено",
        ELEMENT_NOT_FOUND: "HTML не найден",
        AJAX_NOT_FOUND: "Ошибка при загрузке AJAX: Not Found",
        AJAX_FORBIDDEN: "Ошибка при загрузке AJAX: Forbidden",
        IFRAME_ERROR: "Ошибка при загрузке",
    }
    // on: {
    //     load: (fancybox, slide) => {
    //         console.log(`#${slide.index} slide is loaded!`);
    //     },
    // },
});


