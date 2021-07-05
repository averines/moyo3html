// главное меню
const menuCatalogBtn = document.getElementById('btn-catalog')
const menuCatalogBlock = document.querySelector('.menu-catalog-categories')
const menuCatalogWrapper = document.querySelector('.menu-catalog-wrapper')
let menuCatalogIsActive = false

const menuCatalogOpen = function () {
    menuCatalogIsActive = true
    menuCatalogBtn.classList.add('is-active')
    menuCatalogWrapper.classList.add('is-active')
    menuCatalogBlock.classList.add('is-active')
}

const menuCatalogClose = function () {
    menuCatalogIsActive = false
    menuCatalogBtn.classList.remove('is-active')
    menuCatalogWrapper.classList.remove('is-active')
    menuCatalogBlock.classList.remove('is-active')
}

menuCatalogBtn.addEventListener('click', () => {
    if (!menuCatalogIsActive) menuCatalogOpen()
    else menuCatalogClose()
})

menuCatalogWrapper.addEventListener('click', (e) => {
    let target = e.target.className
    if (target.includes('menu-catalog-wrapper') || target.includes('modal__close')) {
        menuCatalogClose();
        subCategoryItem.classList.remove('is-active') // прячем список субкатегорий 
        categoryItem.classList.remove('is-active') // прячем список субкатегорий 
        catalogContent.classList.remove('is-active') //  прячем обертку
    }
})

// фильтры на странице подкатегории
const menuFilterBtn = document.getElementById('btn-filter')
const menuFilterBlock = document.querySelector('.menu-filters')
const menuFilterWrapper = document.querySelector('.menu-filters-wrapper')
const menuFilterCloseBtn = document.querySelector('.menu-filters__close')
let menuFilterIsActive = false

const menuFilterOpen = function () {
    menuFilterIsActive = true
    menuFilterBtn.classList.add('is-active')
    menuFilterWrapper.classList.add('is-active')
    menuFilterBlock.classList.add('is-active')
}

const menuFilterClose = function () {
    menuFilterIsActive = false
    menuFilterBtn.classList.remove('is-active')
    menuFilterWrapper.classList.remove('is-active')
    menuFilterBlock.classList.remove('is-active')
}

if (menuFilterBtn) {
    menuFilterBtn.addEventListener('click', () => {
        if (!menuFilterIsActive) menuFilterOpen()
        else menuFilterClose()
    })
}

if (menuFilterCloseBtn) {
    menuFilterCloseBtn.addEventListener('click', () => {
        menuFilterClose()
    })
}

if (menuFilterWrapper) {
    menuFilterWrapper.addEventListener('click', (e) => {
        let target = e.target.className
        if (target.includes('menu-filters-wrapper')) {
            menuFilterClose();
            subCategoryItem.classList.remove('is-active') // прячем список субкатегорий 
            categoryItem.classList.remove('is-active') // прячем список субкатегорий 
            catalogContent.classList.remove('is-active') //  прячем обертку
        }
    })
}



// плавный переход к блоку
const scrollLinks = document.querySelectorAll('.scroll-link')
{
    for (let i = 0; i < scrollLinks.length; i++) {
        scrollLinks[i].addEventListener('click', function (e) {
            e.preventDefault()
            let id = scrollLinks[i].getAttribute('href')
            document.querySelector(id).scrollIntoView({ behavior: 'smooth', block: 'start' })
        })
    }
}


// открытие закрытие строки поиска
const searchBtnOpen = document.querySelector('.btn-search')
const searchBtnClose = document.querySelector('.search__close')
const searchWindow = document.querySelector('.search')

searchBtnOpen.addEventListener('click', (e) => {
    e.preventDefault()
    searchWindow.classList.add('is-active')
})

searchBtnClose.addEventListener('click', (e) => {
    e.preventDefault()
    searchWindow.classList.remove('is-active')
})


// информационное меню
const menuInfoBtn = document.querySelector('.btn-info')
const menuInfoWindow = document.querySelector('.menu-info')

menuInfoBtn.addEventListener('click', (e) => {
    e.preventDefault()
    //отключаем другое меню
    menuUserBtn.classList.remove('is-active')
    menuUserWindow.classList.remove('is-active')

    // включаем это меню
    menuInfoBtn.classList.toggle('is-active')
    menuInfoWindow.classList.toggle('is-active')
})


// меню авторизованного пользователя
const menuUserBtn = document.querySelector('.btn-user')
const menuUserWindow = document.querySelector('.menu-user')

menuUserBtn.addEventListener('click', (e) => {
    e.preventDefault()
    //отключаем другое меню
    menuInfoBtn.classList.remove('is-active')
    menuInfoWindow.classList.remove('is-active')
    // включаем это меню
    menuUserBtn.classList.toggle('is-active')
    menuUserWindow.classList.toggle('is-active')
})


// сброс развернутых элементов при переходе в десктопный режим
let clientWidth = document.body.clientWidth

// слайдер на странице продукта
var productGallerySliderContainer = document.querySelectorAll('.product-gallery-slider')
if (productGallerySliderContainer.length > 0) {
    var productGallerySlider = tns({
        container: productGallerySliderContainer[0],
        items: 2,
        slideBy: 'page',
        autoplay: false,
        controls: false,
        nav: false,
        loop: false,
        mouseDrag: true,
        swipeAngle: 60,
        autoWidth: true,
        gutter: 10,
    })
}

if (document.body.clientWidth > 768 && productGallerySlider) {
    productGallerySlider.destroy()
} 

// var productGallerySlider = productGallerySliderContainer.length > 0 ?
//     tns({
//         container: productGallerySliderContainer[0],
//         items: 2,
//         slideBy: 'page',
//         autoplay: false,
//         controls: false,
//         nav: false,
//         loop: false,
//         mouseDrag: true,
//         swipeAngle: 60,
//         autoWidth: true,
//         gutter: 10,
//     })
//     : "";


window.addEventListener('resize', () => {
    clientWidth = document.body.clientWidth;
    // console.log(clientWidth);

    if (clientWidth > 1200) {
        menuInfoBtn.classList.remove('is-active')
        menuInfoWindow.classList.remove('is-active')
        menuUserBtn.classList.remove('is-active')
        menuUserWindow.classList.remove('is-active')
    }

    // слайдер на странице продукта
    if (clientWidth > 768 && productGallerySlider) {
        productGallerySlider.destroy()
    } else {
        // productGallerySlider.rebuild()
    }
    if (clientWidth < 768) {
        togglersItems.forEach(item => {
            item.classList.remove('is-active')
            console.log("123");
        })
    }
}, false);


// аккордионы (раскрывающиеся списки)
const accordions = document.getElementsByClassName('accordion')

for (let accordion of accordions) {
    let accordionItems = accordion.querySelectorAll('.accordion__item')
    let accordionItemsClass = accordionItems[0].classList
    let accordionItemsArr = Array.prototype.slice.call(accordionItems);
    let filteredAccordionItems = accordionItemsArr.filter(item => item.classList.contains(accordionItemsClass[0]));

    for (let accordionItem of filteredAccordionItems) {
        let accordionActive = accordionItem.dataset.active;

        // при загрузке страницы разворачивать элемент аккрдиона если у него указан атрибут data-active="768". 
        if (
            accordionActive > 0
            && document.body.clientWidth >= accordionActive
            && !accordionItem.classList.contains('is-active')
        ){
            accordionItem.classList.add('is-active')
        }

        let accordionTitle = accordionItem.querySelector('.accordion__title')
        accordionTitle.addEventListener('click', (e) => {
            accordionItem.classList.toggle('is-active')
        })
    }
}


// меню каталога
const catalogContent = document.querySelector('.menu-catalog-content')
const categoriesItems = document.querySelectorAll('.category-menu__link')
let subCategoryItem
let categoryItem

[...categoriesItems].forEach(item => {

    // при наведении
    item.addEventListener('mouseover', () => {
        if (categoryItem) { categoryItem.classList.remove('is-active') } // делаем нективным пункты меню

        if (item.dataset.subcategoryId) { // если указан data-subcategory-id (знаем какую категорию показывать)
            if (subCategoryItem) {
                subCategoryItem.classList.remove('is-active') // прячем список субкатегорий 
            }

            catalogContent.classList.add('is-active')
            subCategoryItem = document.querySelector(`.menu-catalog-content__item[data-subcategory-id="${item.dataset.subcategoryId}"]`)
            subCategoryItem.classList.add('is-active') // отображаем список субкатегорий

            categoryItem = item
            categoryItem.classList.add('is-active') // делаем активным пункт меню
        } else {
            if (subCategoryItem) {
                subCategoryItem.classList.remove('is-active') // прячем список субкатегорий 
                catalogContent.classList.remove('is-active') //  прячем обертку
            }
        }
    })

    // при отведении
    item.addEventListener('mouseout', (e) => {
        if (item.dataset.subcategoryId && e.relatedTarget && e.relatedTarget.classList.value.includes('menu')) { // если переводим мышку на контент субкатегории
            item.classList.add('is-active') // делаем активным пункт меню
        } else {
            item.classList.remove('is-active') // иначе делаем этот пункт не активным
            subCategoryItem.classList.remove('is-active') // прячем список субкатегорий
        }
    })
})


// кнопка добавления в избранное
const favorites = document.getElementsByClassName('product__favorite');
[...favorites].forEach(item => {
    item.addEventListener('click', () => {
        item.classList.toggle('is-active')
        item.insertAdjacentHTML('afterbegin', '<span></span>')
        setTimeout(function () { item.innerHTML = '' }, 1000)

    })
})

// кнопка добавления в избранное на странице товара
const favoritesBtns = document.getElementsByClassName('product-favorite-btn');
[...favoritesBtns].forEach(item => {
    item.addEventListener('click', () => {
        item.classList.toggle('is-active')
    })
})

// кнопка добавления размера в корзину
const sizeVariantsItems = document.getElementsByClassName('size-variants__item');
[...sizeVariantsItems].forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault()
        item.classList.toggle('is-active')
    })
})


// переключение цвета в карточке товара
var colorVariantStartId

const colorVariantsItems = document.getElementsByClassName('color-variants__item');
[...colorVariantsItems].forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault()

        let colorVariants = item.parentElement
        let colorVariantId = item.dataset.colorVariant

        let colorVariantsLocalItems = colorVariants.getElementsByClassName('color-variants__item');

        if (!colorVariantStartId) {
            colorVariantStartId = colorVariantsLocalItems[0].dataset.colorVariant;
        }

        [...colorVariantsLocalItems].forEach(item => { item.classList.remove('is-active') })
        item.classList.add('is-active')

        let product = item.closest('.product')
        let productPictire = product.querySelector('.product__pic picture')
        let productPictireSources = productPictire.querySelectorAll('source')

        let productPictireImg = productPictire.querySelectorAll('img')[0]

        let productPictireImgSrc = productPictireImg.getAttribute('src')
        let replaceId = new RegExp(`${colorVariantStartId}`, 'gi')
        let srcsetNew = productPictireImgSrc.replace(replaceId, colorVariantId)
        productPictireImg.setAttribute('src', srcsetNew)

        for (let source of productPictireSources) {
            srcset = source.getAttribute('srcset')
            srcsetNew = srcset.replace(replaceId, colorVariantId)
            source.setAttribute('srcset', srcsetNew)

        }

        colorVariantStartId = colorVariantId
    })
})


// переключение сортировки в каталоге
const togglerSort = document.querySelector('.toggler-sort')
if (togglerSort) {
    const togglerSortBtns = togglerSort.querySelectorAll('.toggler-sort__item')
    for (let togglerSortBtn of togglerSortBtns) {
        togglerSortBtn.addEventListener('click', (e) => {
            if (!togglerSortBtn.classList.contains('is-active')) {
                [...togglerSortBtns].forEach(togglerSortBtn => {
                    togglerSortBtn.classList.remove('is-active')
                })
                togglerSortBtn.classList.add('is-active')
            }
        })
    }
}


const togglersItems = document.querySelectorAll('.togglers__item')
if (togglersItems.length > 0) {
    togglersItems.forEach( item => {
        item.addEventListener('click', () => {
            item.classList.toggle('is-active')
        })
    })
}


// быстрый просмотр
const quickViewBtns = document.querySelectorAll('.product__quick-view')


if (quickViewBtns) {
    [...quickViewBtns].forEach(item => {
        item.addEventListener('click', (e) => {
            let quickViewBlockWrapper = document.createElement('div')
            quickViewBlockWrapper.classList.add('quick-view-wrapper')
            let quickViewBlock = document.createElement('div')
            quickViewBlock.classList.add('quick-view')
            quickViewBlockWrapper.appendChild(quickViewBlock)

            document.getElementsByTagName('main')[0].appendChild(quickViewBlockWrapper);

            quickViewBlockWrapper.addEventListener('click', (e) => {
                let target = e.target.className
                if (target.includes('quick-view-wrapper') || target.includes('quick-view__close')) {
                    quickViewBlockWrapper.remove()
                }
            })
        })
    })

}


// загрузка файлов в отзыв перетаскиванием
const dropArea = document.getElementById('feedback-form__upload-wrapper');

if (dropArea) {
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        dropArea.addEventListener(eventName, preventDefaults, false)
    })


    dropArea.addEventListener('dragenter', dropAreaHighlight, false)
    dropArea.addEventListener('dragover', dropAreaHighlight, false)

    dropArea.addEventListener('dragleave', dropAreaUnhighlight, false)
    dropArea.addEventListener('drop', dropAreaUnhighlight, false)
    dropArea.addEventListener('drop', dropHandle, false)



    function preventDefaults(e) {
        e.preventDefault()
        e.stopPropagation()
    }

    function dropAreaHighlight() {
        dropArea.classList.add('highlight')
    }

    function dropAreaUnhighlight() {
        dropArea.classList.remove('highlight')
    }

    function dropHandle(e) {
        let dt = e.dataTransfer
        let files = dt.files;
        handleFiles(files)
    }

    function handleFiles(files) {
        files = [...files]
        // files.forEach(uploadFile)
        files.forEach(previewFile)
    }

    function uploadFile(file) {
        var url = 'ВАШ URL ДЛЯ ЗАГРУЗКИ ФАЙЛОВ'
        var xhr = new XMLHttpRequest()
        var formData = new FormData()
        xhr.open('POST', url, true)
        xhr.addEventListener('readystatechange', function (e) {
            if (xhr.readyState == 4 && xhr.status == 200) {
                // Готово. Информируем пользователя
            }
            else if (xhr.readyState == 4 && xhr.status != 200) {
                // Ошибка. Информируем пользователя
            }
        })
        formData.append('file', file)
        xhr.send(formData)
    }

    function previewFile(file) {
        let reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onloadend = function () {
            let img = document.createElement('img')
            img.src = reader.result
            document.getElementById('feedback-form__upload-preview').appendChild(img)
        }
    }
}



// вывод значений диаграммой
// function progressView() {
//     let diagramBox = document.querySelectorAll('.diagram');
//     diagramBox.forEach((box) => {
//         let deg = (360 * box.dataset.percent / 100) + 180;
//         if (box.dataset.percent >= 50) {
//             box.classList.add('over-50');
//         } else {
//             box.classList.remove('over-50');
//         }
//         box.querySelector('.diagram-right').style.transform = 'rotate(' + deg + 'deg)';
//     });
// }
// progressView()


function progressDiagram() {
    let diagramBox = document.querySelectorAll('.diagram');
    diagramBox.forEach((box) => {
        let circle = box.querySelector('.diagram-circle')
        let deg = (360 * box.dataset.percent) / 100;
        
        if (box.dataset.percent >= 50) {
            circle.style.background = `linear-gradient(${deg}deg, transparent 50%, #ab064e 50%), linear-gradient(180deg, transparent 50%, #ab064e 50%)`
        } else {
            circle.style.background = `linear-gradient(180deg, #cdcdcd 50%, transparent 50%), linear-gradient(${deg}deg, transparent 50%, #ab064e 50%)`
        }
    });
}
progressDiagram()


// вывод значении линией



// tiny slider
const mainSliderContainer = document.querySelectorAll('.main-slider')
let mainSlider = mainSliderContainer.length > 0 ?
    tns({
        container: mainSliderContainer[0],
        items: 1,
        slideBy: 'page',
        autoplay: false,
        controls: false,
        mouseDrag: true,
        swipeAngle: 60
    })
    : "";

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
                items: 6,
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


//галерея на странице продукта
const productPreviewItems = document.querySelectorAll('.product-preview-slider__item')
const productGalleryItems = document.querySelectorAll('.product-gallery-slider__item')

productPreviewItems.forEach((item, index) => {
    item.addEventListener('mouseover', () => {
        removeIsActive(productPreviewItems)
        item.classList.add('is-active');

        productGalleryItems.forEach(productGalleryItem => {
            productGalleryItem.style.zIndex = 0
        })

        productGalleryItems[index].style.zIndex = 1

    })
})

// функция для удаления активного класса у всех потомков
const removeIsActive = (items) => {
    [...items].forEach(item => {
        item.classList.remove('is-active')
    })
}

//табы
const tabsContainers = document.querySelectorAll('.tabs')

if (tabsContainers.length > 0) {
    tabsContainers.forEach(tabsContainer => {

        let tabsContentItems = tabsContainer.querySelectorAll('.tabs-content__item')
        let tabsTitlesItems = tabsContainer.querySelectorAll('.tabs-titles__item')

        if (window.location.hash) {
            let hash = window.location.hash

            tabsTitlesItems.forEach((tabsTitlesItem, index) => {
                if (tabsTitlesItem.hash == hash) {
                    tabsTitlesItems[index].classList.add('is-active')
                    tabsContentItems[index].classList.add('is-active')
                    return
                }
            })
        }
        else {
            tabsTitlesItems[0].classList.add('is-active')
            tabsContentItems[0].classList.add('is-active')
        }

        tabsTitlesItems.forEach(tabsTitlesItem => {
            tabsTitlesItem.addEventListener('click', (e) => {

                if (tabsTitlesItem.getAttribute('href')[0] == '#') {

                    e.preventDefault()

                    let activeContentTabId = tabsTitlesItem.getAttribute('href').split('#')[1]

                    //убираем активный класс со всех заголовков
                    tabsTitlesItems.forEach(item => { item.classList.remove('is-active') })

                    // делаем активным кликнутый заголовок
                    tabsTitlesItem.classList.add('is-active')

                    let activeContentTab = tabsContainer.querySelector(`[data-tabid="${activeContentTabId}"]`)

                    //убираем активный класс со всех элементов с контентом
                    tabsContentItems.forEach(item => { item.classList.remove('is-active') })

                    // делаем активным нужный контейнер с контентом
                    activeContentTab.classList.add('is-active')

                } else {
                    console.log('нет решетки, клик работает как ссылка');
                }
            })
        })
    })
}

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


const orderStatusBtns = document.querySelectorAll('.order-status__btn')
if (orderStatusBtns.length > 0) {
    orderStatusBtns.forEach(item => {
        item.addEventListener('click', () => {
            item.classList.add('is-active')
            item.innerHTML = item.dataset.successText
        })
    })
}

// показать/скрыть блок Подробнее на вкладке История заказов и История заказа
const moreItems = document.querySelectorAll('.more-wrapper')
if (moreItems.length > 0) {
    moreItems.forEach(item => {
        let moreBtn = item.querySelector('.more-link')
        let moreBlock = item.querySelector('.more-block')
        moreBtn.addEventListener('click', (e) => {
            e.preventDefault()
            moreBtn.classList.toggle('is-active')
            moreBlock.classList.toggle('is-active')
        })
    })
}


// показать/скрыть пароль
const passwordItems = document.querySelectorAll('input[type="password"]')
if (passwordItems.length > 0) {
    passwordItems.forEach(item => {
        let passwordBtn = item.parentNode.querySelector('.password-icon')
        passwordBtn.addEventListener('click', (e) => {
            e.preventDefault;
            passwordBtn.classList.toggle('is-active')
            if (item.getAttribute('type') == 'password') {
                item.setAttribute('type', 'text');
            } else {
                item.setAttribute('type', 'password');
            }

        })
    })
}

const customSelectItems = document.querySelectorAll('.custom-select')
if (customSelectItems.length > 0) {
    customSelectItems.forEach(item => {
        let customSelectSelected = item.querySelector('.custom-select__selected')
        let customSelectOptions = item.querySelector('.custom-select__options')
        let customSelectInput = document.getElementById(item.dataset.inputId)
        let customSelectOptionsItems = item.querySelectorAll('.custom-select__option')

        customSelectSelected.addEventListener('click', () => {
            customSelectOptions.classList.toggle('is-active')
        })

        customSelectOptionsItems.forEach(option => {
            option.addEventListener('click', () => {
                customSelectOptions.classList.remove('is-active')
                customSelectInput.setAttribute('value', option.dataset.value)
                customSelectSelected.querySelector('img').setAttribute('src', option.dataset.icon)
            })
        })
    })
}

//мультибегунок
const multirangeItems = document.querySelectorAll('.filter-range')

if (multirangeItems.length > 0) {
    multirangeItems.forEach(item => {
        let inputs = item.querySelectorAll('.range-inputs input')

        let rangeSlider = item.querySelector('.range-inputs__slider')


        let inputStart = item.querySelector('.range-inputs__start')
        let inputStartValue = inputStart.value;
        let inputStartMax = inputStart.max;
        let inputStartMin = inputStart.min;

        let slideLeft = 0
        let totalWidth = inputStartMax - inputStartMin

        let inputEnd = item.querySelector('.range-inputs__end')
        let inputEndValue = inputEnd.value;

        inputs.forEach(input => {
            input.addEventListener('mouseover', (e) => {
                input.classList.add('is-active')
            })
            input.addEventListener('mouseout', (e) => {
                input.classList.remove('is-active')
            })
        })

        inputStart.addEventListener('input', (e) => {
            inputEnd.setAttribute('min', e.target.value)
            slideLeft = ((e.target.value - inputStartValue) * 100) / totalWidth
            rangeSlider.style.left = slideLeft + '%'

            // slideWidth = ((inputStartMax - e.target.value) * 100) / totalWidth
            // rangeSlider.style.width = slideWidth + '%'
        })

        inputEnd.addEventListener('input', (e) => {
            inputStart.setAttribute('max', e.target.value)

            // slideRight = ((inputEndValue - e.target.value) * 100) / totalWidth
            // rangeSlider.style.right = slideRight + '%'

            slideWidth = 100 - ((inputEndValue - e.target.value) * 100) / totalWidth
            rangeSlider.style.width = slideWidth + '%'
        })
    })
}

