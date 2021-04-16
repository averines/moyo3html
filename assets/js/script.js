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
window.addEventListener('resize', () => {
    if (document.body.clientWidth > 1200) {
        menuInfoBtn.classList.remove('is-active')
        menuInfoWindow.classList.remove('is-active')
        menuUserBtn.classList.remove('is-active')
        menuUserWindow.classList.remove('is-active')
    }
}, false);


// аккордионы (раскрывающиеся списки)
const accordions = document.getElementsByClassName('accordion')

for (let accordion of accordions) {
    let accordionItems = accordion.getElementsByClassName('accordion__item')

    for (let accordionItem of accordionItems) {
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
});


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