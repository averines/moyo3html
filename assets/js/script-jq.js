// tiny slider
const postSliderPopularContainer = document.querySelectorAll('.post-slider-popular')
let postSliderPopular = postSliderPopularContainer.length > 0 ?
    tns({
        container: postSliderPopularContainer[0],
        items: 1,
        slideBy: 'page',
        autoplay: false,
        controls: false,
        mouseDrag: true,
        swipeAngle: 60,
        gutter: 15,
        responsive: {
            420: {
                items: 2
            },
            768: {
                items: 4
            },
            1900: {
                gutter: 20
            }
        }
    })
    : "";

const postSliderActionsContainer = document.querySelectorAll('.post-slider-actions')
let postSliderActions = postSliderActionsContainer.length > 0 ?
    tns({
        container: postSliderActionsContainer[0],
        items: 1,
        slideBy: 'page',
        autoplay: false,
        controls: false,
        mouseDrag: true,
        swipeAngle: 60,
        gutter: 15,
        responsive: {
            768: {
                items: 3
            },
            1900: {
                gutter: 20
            }
        }
    })
    : "";

const categoriesMainSliderContainer = document.querySelectorAll('.categories-slider')
let categoriesMainSlider = categoriesMainSliderContainer.length > 0 ?
    tns({
        container: categoriesMainSliderContainer[0],
        items: 3,
        slideBy: 'page',
        autoplay: false,
        controls: false,
        nav: false,
        loop: false,
        mouseDrag: true,
        swipeAngle: 60,
        autoWidth: true,
        gutter: 10,
        responsive: {
            768: {
                items: 6,
            },

            1024: {
                gutter: 20,
            },
        }
    })
    : "";

const categoriesPartnerSliderContainer = document.querySelectorAll('.bigcategories-slider')
var categoriesPartnerSlider = categoriesPartnerSliderContainer.length > 0 ?
    tns({
        container: categoriesPartnerSliderContainer[0],
        items: 3,
        slideBy: 'page',
        autoplay: false,
        controls: false,
        nav: false,
        loop: false,
        mouseDrag: true,
        swipeAngle: 60,
        autoWidth: true,
        gutter: 0,
        responsive: {
            768: {
                items: 6,
            }
        }
    })
    : "";


const productSliders = document.querySelectorAll('.product-mini-slider');
productSliders.forEach(element => {
    const slider = tns({
        container: element,
        items: 3,
        slideBy: 'page',
        autoplay: false,
        controls: false,
        nav: true,
        loop: false,
        mouseDrag: true,
        swipeAngle: 60,
        autoWidth: true,
        gutter: 10,
        responsive: {
            1024: {
                items: 5,
                gutter: 15,
            },
        }
    });
});

const productSliders4 = document.querySelectorAll('.product-mini-slider-4');
productSliders4.forEach(element => {
    const slider = tns({
        container: element,
        items: 3,
        slideBy: 'page',
        autoplay: false,
        controls: false,
        nav: true,
        loop: false,
        mouseDrag: true,
        swipeAngle: 60,
        autoWidth: true,
        gutter: 10,
        responsive: {
            1024: {
                items: 4,
                gutter: 15,
            },
        }
    });
});



const productColorsSliderContainer = document.querySelectorAll('.product-colors-slider')
var productColorsSlider = productColorsSliderContainer.length > 0 ?
    tns({
        container: productColorsSliderContainer[0],
        items: 4,
        slideBy: 'page',
        autoplay: false,
        controls: false,
        nav: false,
        loop: false,
        mouseDrag: true,
        swipeAngle: 60,
        autoWidth: true,
        gutter: 5,
        responsive: {
            768: {
                items: 6,
            }
        }
    })
    : "";


//слайдер для букв в фильтре брендов
const brandFilterTitles = document.querySelectorAll('.brand-filter-slider')
if (brandFilterTitles.length > 0) {
    let brandFilterTitlesSlider = tns({
        container: brandFilterTitles[0],
        items: 5,
        slideBy: 'page',
        autoplay: false,
        controls: false,
        nav: false,
        loop: false,
        mouseDrag: true,
        swipeAngle: 60,
        autoWidth: true,
        gutter: 0,
        responsive: {
            768: {
                items: 6,
                autoWidth: false,
            }
        }
    })
}



// плавная прокрутка к якорю на этой странице 
// $("body").on('click', '[href*="#"]', function (e) {
//     var fixed_offset = 100;
//     $('html,body').stop().animate({ scrollTop: $(this.hash).offset().top - fixed_offset }, 1000);
//     e.preventDefault();
// });

// плавная прокрутка к якорю на другой странице
// let myHash = location.hash;
// location.hash = '';
// if (myHash[1] != undefined) { 
//     $('html, body').animate({ scrollTop: $(myHash).offset().top - 70 }, 500); //скроллим за полсекунды
// };

//fancybox
$('[data-fancybox="gallery-feedback"]').fancybox({
    backFocus: false,
    hash: false,
    loop: false,
    protect: false,
    buttons: ["close"],
    image: {
        preload: false
    },
    animationDuration: 400,
    animationEffect: "fade",
    transitionDuration: 1400,
    transitionEffect: "fade",
    lang: "ru",
    i18n: {
        ru: {
            CLOSE: "Закрыть",
            NEXT: "Вперед",
            PREV: "Назад",
            ERROR: "К сожалению, запрошенный контент невозможно загрузить.<br/> Пожалуйста, попробуйте позже.",
            THUMBS: "Превью"
        }
    }
});

//fancybox
$('[data-fancybox="gallery-feedback"]').fancybox({
    backFocus: false,
    hash: false,
    loop: false,
    protect: false,
    buttons: ["close"],
    image: {
        preload: false
    },
    animationDuration: 400,
    animationEffect: "fade",
    transitionDuration: 1400,
    transitionEffect: "fade",
    lang: "ru",
    i18n: {
        ru: {
            CLOSE: "Закрыть",
            NEXT: "Вперед",
            PREV: "Назад",
            ERROR: "К сожалению, запрошенный контент невозможно загрузить.<br/> Пожалуйста, попробуйте позже.",
            THUMBS: "Превью"
        }
    }
});


// Инициализация карты
$(document).ready(function () {
    if (document.getElementById('js-map1')) {
        "use strict";
        ymaps.ready(init);
        function init() {
            let myMap;
            if (!myMap) {
                myMap = new ymaps.Map(
                    'js-map1',
                    {
                        center: [55.77446156893533, 37.741998],
                        zoom: 15
                    },
                    {
                        searchControlProvider: 'yandex#search'
                    }
                );
                myMap.geoObjects.add(
                    new ymaps.Placemark(
                        [55.77446156893533, 37.741998],
                        {
                            balloonContent: 'Окружной проезд, 30А',
                            iconCaption: 'OptMoyo.ru'
                        },
                        {
                            preset: 'islands#redDotIconWithCaption'
                        }
                    )
                );
                myMap.behaviors.disable('scrollZoom')
            }
        }
    }
});


const mapModalBtns = document.querySelectorAll('[data-action="mapmodal"]')
let myMapModal;
mapModalBtns.forEach(mapModalBtn => {
    mapModalBtn.addEventListener('click', () => {
        if (document.getElementById('js-map2')) {
            "use strict";
            ymaps.ready(init);
            function init() {
                if (!myMapModal) {
                    myMapModal = new ymaps.Map(
                        'js-map2',
                        {
                            center: [55.77446156893533, 37.741998],
                            zoom: 15
                        },
                        {
                            searchControlProvider: 'yandex#search'
                        }
                    );
                    myMapModal.geoObjects.add(
                        new ymaps.Placemark(
                            [55.77446156893533, 37.741998],
                            {
                                balloonContent: 'Окружной проезд, 30А',
                                iconCaption: 'OptMoyo.ru'
                            },
                            {
                                preset: 'islands#redDotIconWithCaption'
                            }
                        )
                    );
                    myMapModal.behaviors.disable('scrollZoom')
                }
            }
        }
    })
})


//мультибегунок
var $rangeSlider = $('[data-action="range-slider"]'),
    $inputFrom = $('[data-action="range-from"]'),
    $inputTo = $('[data-action="range-to"]'),
    rangeInstance,
    rangeMin = 100,
    rangeMax = 1000,
    rangeFrom = 100,
    rangeTo = 1000;
if ($rangeSlider.length > 0) {
    $rangeSlider.ionRangeSlider({
        skin: "round",
        type: "double",
        min: rangeMin,
        max: rangeMax,
        from: 100,
        to: 1000,
        onStart: updateInputs,
        onChange: updateInputs
    })

    rangeInstance = $rangeSlider.data("ionRangeSlider");

    function updateInputs(data) {
        from = data.from;
        to = data.to;

        $inputFrom.prop("value", from);
        $inputTo.prop("value", to);
    }

    $inputFrom.on("input", function () {
        var val = $(this).prop("value");

        // validate
        if (val < rangeMin) {
            val = rangeMin;
        } else if (val > rangeTo) {
            val = rangeTo;
        }

        rangeInstance.update({
            from: val
        });
    })

    $inputTo.on("input", function () {
        var val = $(this).prop("value");

        // validate
        if (val < rangeFrom) {
            val = rangeFrom;
        } else if (val > rangeMax) {
            val = rangeMax;
        }

        rangeInstance.update({
            to: val
        });
    })
}

$('[data-fancybox="product-gallery"]').fancybox({
    protect: true,
    backFocus: false,
    loop: true,
    buttons: [
        "zoom",
        //"share",
        // "slideShow",
        //"fullScreen",
        //"download",
        "thumbs",
        "close"
    ],
});


// новый слайдер в модальном окне фансибокс
$(".product__quick-view").fancybox({
    afterShow: function (instance, slide) {
        if (document.querySelectorAll('.product-gallery').length > 0) {
            const swiperProductThumbs = new Swiper('.product-thumbs', {
                direction: 'vertical',
                loop: true,
                grabCursor: false,
                slidesPerView: 4,
                setWrapperSize: true,
                spaceBetween: 4,
                allowTouchMove: false,
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },
            })

            const swiperProductGallery = new Swiper('.product-gallery-slider', {
                loop: true,
                grabCursor: true,
                slidesPerView: 2,
                setWrapperSize: true,
                spaceBetween: 10,
                navigation: true,
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true,
                },
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },
                breakpoints: {
                    768: {
                        // allowTouchMove: false,
                        slidesPerView: 1,
                        spaceBetween: 0,
                        grabCursor: false,
                        speed: 0,
                    }
                }
            })

            const swiperProductThumbsItems = document.querySelectorAll('.product-thumbs__item')

            swiperProductThumbsItems.forEach(item => {
                item.addEventListener('mouseover', () => {
                    swiperProductGallery.slideTo(parseInt(item.dataset.swiperSlideIndex) + 1);
                })
            })
        }
    }
});


window.addEventListener('resize', () => {
    clientWidth = document.body.clientWidth;
    if (clientWidth < 1024) {
        $.fancybox.close();
    }
}, false);



// скрипты для страницы товара =============================================

// слайдер на странице товара
if (document.querySelectorAll('.container--page-product .product-gallery').length > 0) {

    // слайдер фоток на странице товара
    const swiperProductPics = new Swiper('.product-pics', {
        loop: false,
        grabCursor: true,
        slidesPerView: 1.3,
        setWrapperSize: true,
        spaceBetween: 5,
        allowTouchMove: true,
        wrapperClass: 'product-pics__wrapper',
        slideClass: 'product-pics__item',
        watchOverflow: true,
        observer: true,
        observeParents: true,
        pagination: {
            el: '.product-pics__pagination',
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        breakpoints: {
            550: {
                slidesPerView: 1.5,
                spaceBetween: 10,
            },
            650: {
                slidesPerView: 1.75,
                spaceBetween: 10,
            },
            768: {
                slidesPerView: 2.2,
                spaceBetween: 10,
            },
            960: {
                slidesPerView: 2.5,
                spaceBetween: 10,
            },
            1024: {
                loop: true,
                slidesPerView: 1,
                spaceBetween: 0,
            }
        }
    })

    // слайдер превью на странице товара
    const swiperProductThumbs = new Swiper('.product-thumbs', {
        loop: true,
        // autoHeight: true,
        direction: 'vertical',
        grabCursor: true,
        slidesPerView: 5,
        setWrapperSize: true,
        spaceBetween: 5,
        allowTouchMove: true,
        wrapperClass: 'product-thumbs__wrapper',
        slideClass: 'product-thumbs__item',
        watchOverflow: true,
        observer: true,
        observeParents: true,

        breakpoints: {
            768: {
                slidesPerView: 'auto',
                watchOverflow: true,
            },
        }
    })

    const productThumbsItems = document.querySelectorAll('.product-thumbs__item')
    productThumbsItems.forEach(item => {
        item.addEventListener('mouseover', () => {
            // console.log(swiperProductPics);
            swiperProductPics.slideTo(parseInt(item.dataset.swiperSlideIndex) + 1, 0, false);
        })
    })
}


// слайдер цветов на странице товара
if (document.querySelectorAll('.container--page-product .product-colors').length > 0) {
    const swiperProductСolors = new Swiper('.container--page-product .product-colors', {
        loop: false,
        grabCursor: true,
        slidesPerView: 4.5,
        setWrapperSize: true,
        spaceBetween: 0,
        allowTouchMove: true,
        wrapperClass: 'product-colors__wrapper',
        slideClass: 'product-colors__item',
        watchOverflow: true,
        observer: true,
        observeParents: true,
        breakpoints: {
            500: {
                slidesPerView: 'auto',
                watchOverflow: true,
            },
            600: {
                slidesPerView: 6,
                watchOverflow: true,
            },

        }
    })
}


// слайдер цветов в Быстром просмотре
if (document.querySelectorAll('.product-quickview .product-colors').length > 0) {
    const swiperQuickviewProductСolors = new Swiper('.product-quickview .product-colors', {
        loop: false,
        grabCursor: true,
        slidesPerView: 6,
        setWrapperSize: true,
        spaceBetween: 0,
        allowTouchMove: true,
        wrapperClass: 'product-colors__wrapper',
        slideClass: 'product-colors__item',
        watchOverflow: true,
        observer: true,
        observeParents: true,
    })
}