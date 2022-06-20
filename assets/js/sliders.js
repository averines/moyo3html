"use strict";

// слайдеры фансибокс =================================

// слайдер главный на главной странице
if (document.querySelector('.slider-main')) {
    let sliderMain = new Carousel(document.querySelector(".slider-main"), {
        infinite: true,
        Navigation: false,
        Dots: true,
        friction: 0.8,
        slidesPerPage: 1,
        slidesToSlide: 1,
        fill: true,
        center: false
    });
}


// слайдер мини-категорий на главной странице
if (document.querySelector('.slider-category-mini')) {
    let sliderCategoryMini = new Carousel(document.querySelector(".slider-category-mini.carousel"), {
        infinite: false,
        Navigation: false,
        Dots: false,
        friction: 0.89,
        slidesPerPage: 'auto',
        slidesToSlide: 2,
        fill: true,
        center: false
    });
}


// слайдер брендов на главной странице
if (document.querySelector('.section--posts-brands')) {
    let sliderBrands = new Carousel(document.querySelector(".section--posts-brands .carousel"), {
        infinite: false,
        Navigation: false,
        Dots: true,
        friction: 0.89,
        slidesPerPage: 1,
        slidesToSlide: 1,
        fill: true,
        center: false
    });
}

// слайдер акций на главной странице
if (document.querySelector('.section--posts-actions')) {
    let sliderActions = new Carousel(document.querySelector(".section--posts-actions .carousel"), {
        infinite: false,
        Navigation: false,
        Dots: true,
        friction: 0.89,
        slidesPerPage: 1,
        slidesToSlide: 1,
        fill: true,
        center: false
    });
}

// слайдер категорий партнера на главной странице
if (document.querySelector('.section-slider-category')) {
    let sliderCategory = new Carousel(document.querySelector(".section-slider-category .carousel"), {
        infinite: false,
        Navigation: false,
        Dots: false,
        friction: 0.89,
        slidesPerPage: 'auto',
        slidesToSlide: 1,
        fill: true,
        center: false
    });
}

// слайдер продуктов
const slidersProducts = document.querySelectorAll('.slider-products');
if (slidersProducts.length > 0) {
    slidersProducts.forEach(sliderProductsEl => {
        let sliderProducts = new Carousel(sliderProductsEl.querySelector(".products"), {
            infinite: false,
            Navigation: false,
            Dots: true,
            friction: 0.89,
            slidesPerPage: 'auto',
            slidesToSlide: 1,
            fill: true,
            center: false,
            classNames: {
                slide: 'product-card'
            }
        });
    });
}

// слайдер кнопок брендов на Бренды
if (document.querySelector('.brand-filter')) {
    let sliderBrandsTitles = new Carousel(document.querySelector(".brand-filter .titles"), {
        infinite: false,
        Navigation: false,
        Dots: false,
        friction: 0.89,
        slidesPerPage: 'auto',
        slidesToSlide: 5,
        fill: true,
        center: false,
        dragFree: true
    });
}

// слайдер цветов на странице товара
if (document.querySelector('.container--page-product .product-colors')) {
    let sliderColorsProduct = new Carousel(document.querySelector(".container--page-product .product-colors.carousel"), {
        infinite: false,
        Navigation: false,
        Dots: false,
        friction: 0.89,
        slidesPerPage: "auto",
        slidesToSlide: 1,
        fill: true,
        center: false,
    });
}


let sliderGalleryProduct;
let sliderThumbsProduct;

if (document.querySelector('.container--page-product')) {
    // слайдер фото на странице товара
    sliderGalleryProduct = new Carousel(document.querySelector(".container--page-product .product-pics.carousel"), {
        infinite: true,
        Navigation: true,
        Dots: false,
        friction: 0.89,
        slidesPerPage: 1,
        slidesToSlide: 1,
        fill: true,
        center: false,
        placeFocusBack: false,
    });

    // слайдер превью на странице товара
    sliderThumbsProduct = new Carousel(document.querySelector(".container--page-product .product-thumbs.carousel"), {
        infinite: true,
        Navigation: true,
        Dots: false,
        friction: 0.89,
        slidesPerPage: "auto",
        slidesToSlide: 1,
        fill: true,
        center: true,
        Sync: {
            target: sliderGalleryProduct,
            friction: 0
        },
    });

    Fancybox.bind('[data-fancybox="product-pics"]', {
        infinite: false,
        dragToClose: true,
        placeFocusBack: false,
        Toolbar: {
            display: [
                // { id: "prev", position: "center" },
                { id: "counter", position: "right" },
                // { id: "next", position: "center" },
                // {zoom: false},
                // "slideshow",
                // "fullscreen",
                "download",
                // "thumbs",
                "close",
            ],
            autoEnable: false
        },
        Thumbs: false,
        Carousel: {
            friction: 0.75,
            on: {
                change: (that) => {
                    sliderGalleryProduct.slideTo(sliderGalleryProduct.findPageForSlide(that.page), {
                        friction: 0,
                    });
                },
            },
        },
    });
}



let sliderColorsProductQuickview;
let sliderGalleryProductQuickview;
let sliderThumbsProductQuickview;
let sliderSimilarProductsQuickview;

function productQuickViewHandler() {
    // слайдер цветов в быстром просмотре
    sliderColorsProductQuickview = new Carousel(document.querySelector(".product-quickview .product-colors.carousel"), {
        infinite: false,
        Navigation: false,
        Dots: false,
        friction: 0.89,
        slidesPerPage: "auto",
        slidesToSlide: 1,
        fill: true,
        center: false,
    });

    // слайдер фото в быстром просмотре
    sliderGalleryProductQuickview = new Carousel(document.querySelector(".product-quickview .product-pics.carousel"), {
        infinite: false,
        Navigation: true,
        Dots: false,
        friction: 0.89,
        slidesPerPage: 1,
        slidesToSlide: 1,
        fill: true,
        center: false,
    });

    // слайдер превью в быстром просмотре
    sliderThumbsProductQuickview = new Carousel(document.querySelector(".product-quickview .product-thumbs.carousel"), {
        infinite: false,
        Navigation: false,
        Dots: false,
        friction: 0.89,
        slidesPerPage: "auto",
        slidesToSlide: 1,
        fill: true,
        center: true,
        Sync: {
            target: sliderGalleryProductQuickview,
            friction: 0
        },
    });

    // слайдер похожих товаров в быстром просмотре
    sliderSimilarProductsQuickview = new Carousel(document.querySelector(".product-quickview .products-similar.carousel"), {
        infinite: false,
        Navigation: true,
        Dots: false,
        friction: 0.89,
        slidesPerPage: 2,
        slidesToSlide: 1,
        fill: true,
        center: false,
    });

    Fancybox.bind('[data-fancybox="product-pics-quickview"]', {
        infinite: false,
        dragToClose: true,
        Toolbar: {
            display: [
                // { id: "prev", position: "center" },
                { id: "counter", position: "right" },
                // { id: "next", position: "center" },
                // {zoom: false},
                // "slideshow",
                // "fullscreen",
                "download",
                // "thumbs",
                "close",
            ],
            autoEnable: false
        },
        Thumbs: false,
        Carousel: {
            friction: 0.75,
            on: {
                change: (that) => {
                    sliderGalleryProductQuickview.slideTo(sliderGalleryProductQuickview.findPageForSlide(that.page), {
                        friction: 0,
                    });
                },
            },
        },
    });
}


