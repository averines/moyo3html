// главное меню
const documentBody = document.querySelector('body')
const menuCatalogBtn = document.getElementById('btn-catalog')
const menuCatalogBlock = document.querySelector('.menu-catalog-categories')
const menuCatalogWrapper = document.querySelector('.menu-catalog-wrapper')
const categoryMenuAccordionItems = document.querySelectorAll('.category-menu__item.accordion')
const categoryMenuStandartItems = document.querySelectorAll('.category-menu__item:not(.accordion):not(.accordion__item)')
const parentLinks = document.querySelectorAll('.category-menu__link.accordion__title')
const menuCatalogSubcategoriesBlock = document.querySelector('.menu-catalog-subcategories')
const catalogContent = document.querySelector('.menu-catalog-content')
const categoriesItems = document.querySelectorAll('.category-menu__link')
let subCategoryItem
let categoryItem
let menuCatalogIsActive = false

const menuCatalogOpen = function () {
    menuCatalogIsActive = true
    menuCatalogBtn.classList.add('is-active')
    menuCatalogWrapper.classList.add('is-active')
    menuCatalogBlock.classList.add('is-active')
    documentBody.classList.add('body-overlay')
}

const menuCatalogClose = function () {
    menuCatalogIsActive = false
    menuCatalogBtn.classList.remove('is-active')
    menuCatalogWrapper.classList.remove('is-active')
    menuCatalogBlock.classList.remove('is-active')
    documentBody.classList.remove('body-overlay') // для того чтобы не прыгало из-за исчезания полосы прокрутки
    menuCatalogSubcategoriesBlock.classList.remove('is-active')
}

menuCatalogBtn.addEventListener('click', () => {
    if (!menuCatalogIsActive) menuCatalogOpen()
    else menuCatalogClose()
})

menuCatalogWrapper.addEventListener('click', (e) => {
    let target = e.target.className
    if (target.includes('menu-catalog-wrapper') || target.includes('modal__close')) {
        menuCatalogClose();
        // subCategoryItem.classList.remove('is-active') // прячем список субкатегорий 
        // categoryItem.classList.remove('is-active') // прячем список субкатегорий 
        if (catalogContent) {
            catalogContent.classList.remove('is-active') // прячем обертку 
        }
    }
})

// при наведение на пункты меню с аккордионом
categoryMenuAccordionItems.forEach(categoryMenuAccordionItem => {
    let parentLink = categoryMenuAccordionItem.querySelector('.category-menu__link.accordion__title')
    let childMenu = categoryMenuAccordionItem.querySelector('.subcategory-menu')

    if (parentLink) {
        // создание ссылки на все категории
        let childMenuLink = document.createElement('a')
        childMenuLink.classList.add('subcategory-menu__item')
        childMenuLink.classList.add('subcategory-menu__item--special')
        childMenuLink.setAttribute('href', parentLink.getAttribute('href'))
        childMenuLink.innerHTML = 'Все подкатегории'
        childMenu.insertBefore(childMenuLink, childMenu.querySelector('.subcategory-menu__item'))

        let dublicateMenu = childMenu.cloneNode(true)

        function parentLinkHandler() {
            parentLink.addEventListener('click', (e) => {
                e.preventDefault();
            })

            if (document.body.clientWidth >= 768) {
                parentLink.classList.add('is-disabled') // отключаем функционал аккордиона
                parentLink.addEventListener('mouseover', () => {
                    parentLinks.forEach(item => {
                        item.classList.remove('is-active')
                    })

                    parentLink.classList.add('is-active')
                    menuCatalogSubcategoriesBlock.classList.add('is-active')
                    menuCatalogSubcategoriesBlock.innerHTML = ''
                    menuCatalogSubcategoriesBlock.appendChild(dublicateMenu)
                })
            } else {
                parentLink.classList.remove('is-disabled') // включаем функционал аккордиона
            }
        }
        parentLinkHandler()

        window.addEventListener('resize', () => {
            parentLinkHandler()
            if (document.body.clientWidth > 768) {
                categoryMenuAccordionItem.querySelector('.accordion__item').classList.remove('is-active')
            }
        })
    }

})

// при наведение на пункты меню, которые не имеют дочерних элементов (не являются аккордионом)
categoryMenuStandartItems.forEach(categoryMenuStandartItem => {
    categoryMenuStandartItem.addEventListener('mouseover', () => {
        menuCatalogSubcategoriesBlock.classList.remove('is-active')
    })
})



// меню фильтров на странице подкатегории (в каталоге)
const menuFilterBtn = document.getElementById('btn-filter')
const menuFilterBlock = document.querySelector('.menu-filters')
const menuFilterWrapper = document.querySelector('.menu-filters-wrapper')
const menuFilterCloseBtn = document.querySelector('.menu-filters__close')
const menuFilterCheckboxItems = document.querySelectorAll('.filter-checkbox__item input')
const selectedFiltersWrapper = document.querySelector('.selected-filters')
const menuFiltersApplyBtn = document.querySelector('.menu-filters__apply')

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
            // subCategoryItem.classList.remove('is-active') // прячем список субкатегорий 
            // categoryItem.classList.remove('is-active') // прячем список субкатегорий 
            // catalogContent.classList.remove('is-active') //  прячем обертку
        }
    })
}

if (menuFiltersApplyBtn) {
    menuFiltersApplyBtn.addEventListener('click', () => {
        menuFilterClose()
    })
}


// отображение выбранных фильтров на странице
if (menuFilterCheckboxItems) {
    menuFilterCheckboxItems.forEach(item => {
        let itemTitle
        if (item.parentNode.querySelector('.filter-checkbox__title')) {
            itemTitle = item.parentNode.querySelector('.filter-checkbox__title').innerHTML
        }
        item.addEventListener('change', () => {
            if (item.checked) {
                let selectedFilterItem = document.createElement('a')
                selectedFilterItem.classList.add('selected-filters__item')
                selectedFilterItem.dataset.id = item.id
                selectedFilterItem.innerHTML = itemTitle
                selectedFiltersWrapper.appendChild(selectedFilterItem)

                // удалить выбранный фильтр при клике по нему
                let selectedFiltersItems = selectedFiltersWrapper.querySelectorAll('.selected-filters__item');
                selectedFiltersItems.forEach(selectedFiltersItem => {
                    selectedFiltersItem.addEventListener('click', () => {
                        selectedFiltersItem.parentNode.removeChild(selectedFiltersItem)

                        //снимаем галочку в меню фильтров, если нажали на элемент в списке выбранных фильтров
                        Array.prototype.map.call(menuFilterCheckboxItems, menuFilterCheckboxItem => {
                            if (menuFilterCheckboxItem.id == selectedFiltersItem.dataset.id) {
                                menuFilterCheckboxItem.checked = false
                            }
                        })
                    })
                })

            } else {
                let selectedFiltersItems = selectedFiltersWrapper.querySelectorAll('.selected-filters__item');
                //удаляем из списка выбранных фильтров тот фильтр, который стал не checked
                Array.prototype.map.call(selectedFiltersItems, selectedFiltersItem => {
                    if (selectedFiltersItem.dataset.id == item.id) {
                        selectedFiltersItem.parentNode.removeChild(selectedFiltersItem)
                    }
                })
            }
        })
    })
}


// кнопка Очистить для выбранных фильтров в выпадающем меню
const menuFilterClearBtn = document.getElementById('menu-filters-clear')
if (menuFilterClearBtn) {
    menuFilterClearBtn.addEventListener('click', () => {
        selectedFiltersWrapper.innerHTML = ''
        menuFilterCheckboxItems.forEach(item => {
            item.checked = false
        })
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


window.addEventListener('resize', () => {
    clientWidth = document.body.clientWidth;

    if (clientWidth > 1200) {
        menuInfoBtn.classList.remove('is-active')
        menuInfoWindow.classList.remove('is-active')
        menuUserBtn.classList.remove('is-active')
        menuUserWindow.classList.remove('is-active')
    }

    if (clientWidth < 768) {
        togglersItems.forEach(item => {
            item.classList.remove('is-active')
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
        let accordionActive = accordionItem.dataset.active

        // при загрузке страницы разворачивать элемент аккордиона если у него указан атрибут data-active="768".
        if (
            accordionActive > 0
            && document.body.clientWidth >= accordionActive
            && !accordionItem.classList.contains('is-active')
        ) {
            accordionItem.classList.add('is-active')
        }

        let accordionTitle = accordionItem.querySelector('.accordion__title')
        accordionTitle.addEventListener('click', (e) => {
            if (!e.target.classList.contains('is-disabled')) {
                accordionItem.classList.toggle('is-active')
            }
        })

        // при ресайзе развернуть элемент аккордиона и прекратить его функционал, если указан параметр data-disable="768"
        let accordionDisable = accordionItem.dataset.disable
        if (accordionDisable > 0
            && document.body.clientWidth >= accordionDisable) {
            accordionItem.classList.add('is-active')
            accordionItem.classList.add('is-disabled')
        }

        window.addEventListener('resize', () => {
            if (
                accordionDisable > 0
                && document.body.clientWidth >= accordionDisable
            ) {
                accordionItem.classList.add('is-active')
                accordionItem.classList.add('is-disabled')
            } else {
                accordionItem.classList.remove('is-disabled')
            }
        });

    }
}


// [...categoriesItems].forEach(item => {

//     // при наведении
//     item.addEventListener('mouseover', () => {
//         if (categoryItem) { categoryItem.classList.remove('is-active') } // делаем нективным пункты меню

//         if (item.dataset.subcategoryId) { // если указан data-subcategory-id (знаем какую категорию показывать)
//             if (subCategoryItem) {
//                 subCategoryItem.classList.remove('is-active') // прячем список субкатегорий 
//             }

//             catalogContent.classList.add('is-active')
//             subCategoryItem = document.querySelector(`.menu-catalog-content__item[data-subcategory-id="${item.dataset.subcategoryId}"]`)
//             subCategoryItem.classList.add('is-active') // отображаем список субкатегорий

//             categoryItem = item
//             categoryItem.classList.add('is-active') // делаем активным пункт меню
//         } else {
//             if (subCategoryItem) {
//                 subCategoryItem.classList.remove('is-active') // прячем список субкатегорий 
//                 catalogContent.classList.remove('is-active') //  прячем обертку
//             }
//         }
//     })

//     // при отведении
//     item.addEventListener('mouseout', (e) => {
//         if (item.dataset.subcategoryId && e.relatedTarget && e.relatedTarget.classList.value.includes('menu')) { // если переводим мышку на контент субкатегории
//             item.classList.add('is-active') // делаем активным пункт меню
//         } else {
//             item.classList.remove('is-active') // иначе делаем этот пункт не активным
//             subCategoryItem.classList.remove('is-active') // прячем список субкатегорий
//         }
//     })
// })


// кнопка добавления в избранное
// const favorites = document.getElementsByClassName('product__favorite');
// [...favorites].forEach(item => {
//     item.addEventListener('click', () => {
//         item.classList.toggle('is-active')
//         item.insertAdjacentHTML('afterbegin', '<span></span>')
//         setTimeout(function () { item.innerHTML = '' }, 1000)
//     })
// })

// // кнопка добавления в избранное на странице товара
// const favoritesBtns = document.getElementsByClassName('product-favorite-btn');
// [...favoritesBtns].forEach(item => {
//     item.addEventListener('click', () => {
//         item.classList.toggle('is-active')
//     })
// })

// // кнопка добавления размера в корзину
// const sizeVariantsItems = document.getElementsByClassName('size-variants__item');
// [...sizeVariantsItems].forEach(item => {
//     item.addEventListener('click', (e) => {
//         e.preventDefault()
//         item.classList.toggle('is-active')
//     })
// })


// кнопка добавления в избранное
const favoritesBtns = document.querySelectorAll('.product-favorite')
if (favoritesBtns) {
    favoritesBtns.forEach(favoritesBtn => {
        favoritesBtn.addEventListener('click', () => {
            if (!favoritesBtn.classList.contains('is-active')) {
                favoritesBtn.insertAdjacentHTML('afterbegin', '<span></span>')
                setTimeout(function () { favoritesBtn.innerHTML = '' }, 1000)
            }
            favoritesBtn.classList.toggle('is-active')
        })
    })
}

// переключение цвета в карточке товара
// var colorVariantStartId
// const colorVariantsItems = document.getElementsByClassName('color-variants__item');
// colorVariantsItems.forEach(item => {
//     item.addEventListener('mouseover', (e) => {
//         e.preventDefault()
//         let colorVariants = item.parentElement
//         let colorVariantId = item.dataset.colorVariant

//         let colorVariantsLocalItems = colorVariants.getElementsByClassName('color-variants__item');

//         if (!colorVariantStartId) {
//             colorVariantStartId = colorVariantsLocalItems[0].dataset.colorVariant;
//         }

//         [...colorVariantsLocalItems].forEach(item => { item.classList.remove('is-active') })
//         item.classList.add('is-active')

//         let product = item.closest('.product')
//         let productPictire = product.querySelector('.product__pic picture')
//         let productPictireSources = productPictire.querySelectorAll('source')

//         let productPictireImg = productPictire.querySelectorAll('img')[0]

//         let productPictireImgSrc = productPictireImg.getAttribute('src')
//         let replaceId = new RegExp(`${colorVariantStartId}`, 'gi')
//         let srcsetNew = productPictireImgSrc.replace(replaceId, colorVariantId)
//         productPictireImg.setAttribute('src', srcsetNew)

//         for (let source of productPictireSources) {
//             srcset = source.getAttribute('srcset')
//             srcsetNew = srcset.replace(replaceId, colorVariantId)
//             source.setAttribute('srcset', srcsetNew)

//         }

//         colorVariantStartId = colorVariantId
//     })
// })


// действия с продуктом===================================================
const products = document.querySelectorAll('.product-wrapper > .product')
if (products.length > 0) {
    products.forEach(product => {
        let productPic = product.querySelector('.product__pic')
        let productPicSource = product.querySelector('.product__pic source')
        let productPicImg = product.querySelector('.product__pic img')
        let productColors = product.querySelectorAll('.color-variants__item')
        let productSizes = product.querySelectorAll('.size-variants__item')
        let productColorPicIndex = 0
        let swapProductPicTimer
        let productActionTime = product.querySelector('.product__info .product__action-time')
        let nowDate = Date.now();
        let productColorActiveId
        let colorPics

        if (productColors.length > 0) {
            productColorActiveId = productColors[0].dataset.colorId
            colorPics = productColors[0].dataset.colorPics ? productColors[0].dataset.colorPics.replace(/\s/g, '').split(',') : ''
        }

        function swapProductPic(picsArray, productColorActiveId) {
            // console.log('меняю фотки');
            productColorPicIndex = productColorPicIndex == (picsArray.length - 1) ? 0 : productColorPicIndex + 1;
            swapProductPicTimer = setTimeout(function () {
                // console.log('сменил фотку');
                productPicPath = `./i/products/300/${product.dataset.productId}-${productColorActiveId}-${picsArray[productColorPicIndex]}-300`
                productPicSource.setAttribute('srcset', productPicPath + '.webp')
                productPicImg.setAttribute('src', productPicPath + '.jpg')
                swapProductPic(picsArray, productColorActiveId)
            }, 1000)
        }

        //смена доступных размеров при наведении на thumb
        if (productSizes.length > 0) {
            function swapProductSizes(productColorActiveId) {
                productSizes.forEach(productSize => {
                    if (productSize.dataset.colorId == productColorActiveId) {
                        productSize.classList.add('is-showed')
                    } else {
                        productSize.classList.remove('is-showed')
                    }
                })
            }
        }


        //листание фото товара в мини-карточке товара при наведении на фото

        if (colorPics) {

        }
        productPic.addEventListener('mouseover', () => {
            swapProductPic(colorPics, productColorActiveId)
        })

        //прекращение листания при отведении курсора с фото
        productPic.addEventListener('mouseout', () => {
            productColorActiveId = productColors[0].dataset.colorId
            productColorPicIndex = 0
            let productPicPath = `./i/products/300/${product.dataset.productId}-${productColorActiveId}-pic1-300`
            productPicSource.setAttribute('srcset', productPicPath + '.webp')
            productPicImg.setAttribute('src', productPicPath + '.jpg')
            clearTimeout(swapProductPicTimer);
            swapProductSizes(productColorActiveId)
        })

        productColors.forEach(productColor => {
            //листание фото товара в мини-карточке товара при наведении на thumb
            productColor.addEventListener('mouseover', () => {
                // console.log('ставлю первую фотку');
                productColorActiveId = productColor.dataset.colorId
                let productPicPath = `./i/products/300/${product.dataset.productId}-${productColorActiveId}-pic1-300`
                productPicSource.setAttribute('srcset', productPicPath + '.webp')
                productPicImg.setAttribute('src', productPicPath + '.jpg')
                swapProductPic(colorPics, productColorActiveId)
                swapProductSizes(productColorActiveId)
            })

            //прекращение листания при отведении курсора с thumb
            productColor.addEventListener('mouseout', () => {
                clearTimeout(swapProductPicTimer);
                swapProductSizes(productColorActiveId)
            })
        })

        // вывод дней до завершения акции со склонением
        if (productActionTime) {
            if (productActionTime.dataset.actionTime) {
                let productActionDate = new Date(productActionTime.dataset.actionTime)
                let productActionTimeframe = Math.floor((productActionDate - nowDate) / (1000 * 60 * 60 * 24) % 30)

                if (productActionTimeframe > 0) {
                    let dayword
                    let endword = 'Осталось'
                    switch (productActionTimeframe) {
                        case 1:
                        case 21:
                        case 31:
                            endword = 'Остался'
                            dayword = 'день'
                            break
                        case 2:
                        case 3:
                        case 4:
                        case 22:
                        case 23:
                        case 24:
                            dayword = 'дня'
                            break
                        default:
                            dayword = 'дней'
                    }
                    productActionTime.innerHTML = `${endword} ${productActionTimeframe}&nbsp;${dayword}`
                }

            }
        }

    })
}



// имитация переключения сортировки в каталоге
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
    togglersItems.forEach(item => {
        item.addEventListener('click', () => {
            item.classList.toggle('is-active')
        })
    })
}

// имитация переключение количества элементов на странице
const togglerCount = document.querySelector('.toggler-count')
if (togglerCount) {
    const togglerCountBtns = togglerCount.querySelectorAll('.toggler-count__item')
    for (let togglerCountBtn of togglerCountBtns) {
        togglerCountBtn.addEventListener('click', (e) => {
            if (!togglerCountBtn.classList.contains('is-active')) {
                [...togglerCountBtns].forEach(togglerCountBtn => {
                    togglerCountBtn.classList.remove('is-active')
                })
                togglerCountBtn.classList.add('is-active')
            }
        })
    }
}

// быстрый просмотр
// const quickViewBtns = document.querySelectorAll('.product__quick-view')
// if (quickViewBtns) {
//     [...quickViewBtns].forEach(item => {
//         item.addEventListener('click', (e) => {
//             let quickViewBlockWrapper = document.createElement('div')
//             quickViewBlockWrapper.classList.add('quick-view-wrapper')
//             let quickViewBlock = document.createElement('div')
//             quickViewBlock.classList.add('quick-view')
//             quickViewBlockWrapper.appendChild(quickViewBlock)

//             document.getElementsByTagName('main')[0].appendChild(quickViewBlockWrapper);

//             quickViewBlockWrapper.addEventListener('click', (e) => {
//                 let target = e.target.className
//                 if (target.includes('quick-view-wrapper') || target.includes('quick-view__close')) {
//                     quickViewBlockWrapper.remove()
//                 }
//             })
//         })
//     })

// }


// загрузка файлов в отзыв перетаскиванием
// const dropArea = document.getElementById('feedback-form__upload-wrapper');

// if (dropArea) {
//     ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
//         dropArea.addEventListener(eventName, preventDefaults, false)
//     })


//     dropArea.addEventListener('dragenter', dropAreaHighlight, false)
//     dropArea.addEventListener('dragover', dropAreaHighlight, false)

//     dropArea.addEventListener('dragleave', dropAreaUnhighlight, false)
//     dropArea.addEventListener('drop', dropAreaUnhighlight, false)
//     dropArea.addEventListener('drop', dropHandle, false)



//     function preventDefaults(e) {
//         e.preventDefault()
//         e.stopPropagation()
//     }

//     function dropAreaHighlight() {
//         dropArea.classList.add('highlight')
//     }

//     function dropAreaUnhighlight() {
//         dropArea.classList.remove('highlight')
//     }

//     function dropHandle(e) {
//         let dt = e.dataTransfer
//         let files = dt.files;
//         handleFiles(files)
//     }

//     function handleFiles(files) {
//         files = [...files]
//         // files.forEach(uploadFile)
//         files.forEach(previewFile)
//     }

//     function uploadFile(file) {
//         var url = 'ВАШ URL ДЛЯ ЗАГРУЗКИ ФАЙЛОВ'
//         var xhr = new XMLHttpRequest()
//         var formData = new FormData()
//         xhr.open('POST', url, true)
//         xhr.addEventListener('readystatechange', function (e) {
//             if (xhr.readyState == 4 && xhr.status == 200) {
//                 // Готово. Информируем пользователя
//             }
//             else if (xhr.readyState == 4 && xhr.status != 200) {
//                 // Ошибка. Информируем пользователя
//             }
//         })
//         formData.append('file', file)
//         xhr.send(formData)
//     }

//     function previewFile(file) {
//         let reader = new FileReader()
//         reader.readAsDataURL(file)
//         reader.onloadend = function () {
//             let img = document.createElement('img')
//             img.src = reader.result
//             document.getElementById('feedback-form__upload-preview').appendChild(img)
//         }
//     }
// }


// вывод значений диаграммой
// function progressDiagram() {
//     let diagramBox = document.querySelectorAll('.diagram');
//     diagramBox.forEach((box) => {
//         let circle = box.querySelector('.diagram-circle')
//         let deg = (360 * box.dataset.percent) / 100;

//         if (box.dataset.percent >= 50) {
//             circle.style.background = `linear-gradient(${deg}deg, transparent 50%, #ab064e 50%), linear-gradient(180deg, transparent 50%, #ab064e 50%)`
//         } else {
//             circle.style.background = `linear-gradient(180deg, #cdcdcd 50%, transparent 50%), linear-gradient(${deg}deg, transparent 50%, #ab064e 50%)`
//         }
//     });
// }
// progressDiagram()




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
const tabsContainers = document.querySelectorAll('[data-action="tabs"]')
if (tabsContainers.length > 0) {
    tabsContainers.forEach(tabsContainer => {
        let tabsContentItems = tabsContainer.querySelectorAll('.tabs-content__item')
        let tabsTitlesItems = tabsContainer.querySelectorAll('.tabs-titles__item')
        // if (window.location.hash) {
        //     let hash = window.location.hash

        //     tabsTitlesItems.forEach((tabsTitlesItem, index) => {
        //         if (tabsTitlesItem.hash == hash) {
        //             tabsTitlesItems[index].classList.add('is-active')
        //             tabsContentItems[index].classList.add('is-active')
        //             return
        //         }
        //     })
        // }
        // else {
        //     tabsTitlesItems[0].classList.add('is-active')
        //     tabsContentItems[0].classList.add('is-active')
        // }

        tabsTitlesItems[0].classList.add('is-active')
        tabsContentItems[0].classList.add('is-active')

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
                    // console.log('нет решетки, клик работает как ссылка');
                }
            })
        })
    })
}


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



// проверка форм перед отправкой
const formsCheck = document.querySelectorAll('[data-action="form-check"]')
if (formsCheck) {
    formsCheck.forEach(form => {
        let requiredInputs = form.querySelectorAll('[required]')
        let submitBtn = form.querySelector('button[type="submit"]')
        const checkArrTrue = el => el == true

        requiredInputs.forEach(input => {
            input.addEventListener('input', (e) => {
                let allInputsFilledArr = []

                requiredInputs.forEach(input => {
                    if (input.value) {
                        allInputsFilledArr.push(true)
                    } else {
                        allInputsFilledArr.push(false)
                    }
                })

                if (allInputsFilledArr.every(checkArrTrue)) {
                    submitBtn.removeAttribute('disabled')
                } else {
                    submitBtn.setAttribute('disabled', true)
                }
            })
        })
    })
}

function singleFormCheck(form) {
    let requiredInputs = form.querySelectorAll('input[required]')
    let submitBtn = form.querySelector('button[type="submit"]')

    requiredInputs.forEach(input => {

        input.addEventListener('input', (e) => {
            let allInputsFilled = false

            requiredInputs.forEach(input => {
                if (input.value) {
                    allInputsFilled = true
                } else {
                    allInputsFilled = false
                }
            })

            if (allInputsFilled) {
                submitBtn.removeAttribute('disabled')
            } else {
                submitBtn.setAttribute('disabled', true)
            }
        })
    })
}


// форма входа с кодом телефона
const formPhoneCode = document.querySelector('[data-action="form-phone-code"]')
if (formPhoneCode) {
    let btnCode = formPhoneCode.querySelector('[data-action="btn-code"]')
    let btnLogin = formPhoneCode.querySelector('[data-action="btn-login"]')
    let inputCode = formPhoneCode.querySelector('[data-action="input-code"]')

    inputCode.style.display = 'none'
    btnLogin.style.display = 'none'

    btnCode.addEventListener('click', (e) => {
        e.preventDefault()
        btnCode.style.display = 'none'
        inputCode.style.display = 'block'
        btnLogin.style.display = 'block'
    })

    inputCode.addEventListener('input', (e) => {
        if (e.target.value) {
            btnLogin.removeAttribute('disabled')
        } else {
            btnLogin.setAttribute('disabled', true)
        }
    })
}


// форма регистрации с кодом телефона
const formPhoneCodeRegistration = document.querySelectorAll('[data-action="form-phone-code-registration"]')
if (formPhoneCodeRegistration) {
    formPhoneCodeRegistration.forEach(form => {
        let btnCodeWrapper = form.querySelector('[data-action="btn-code-wrapper"]')
        let btnCode = form.querySelector('[data-action="btn-code"]')
        let btnRegistration = form.querySelector('[data-action="btn-registration"]')
        let inputCode = form.querySelector('[data-action="input-code"]')

        inputCode.style.display = 'none'

        btnCode.addEventListener('click', (e) => {
            e.preventDefault()
            btnCodeWrapper.style.display = 'none'
            inputCode.style.display = 'block'
        })

        inputCode.addEventListener('input', (e) => {
            if (e.target.value) {
                btnRegistration.removeAttribute('disabled')
            } else {
                btnRegistration.setAttribute('disabled', true)
            }
        })
    })
}


// форма адреса при регистрации
const formAddressRegistration = document.querySelector('[data-action="form-registration-address"]')
if (formAddressRegistration) {
    let addressDoubleCheckbox = document.getElementById('type2-addressdouble')
    let addressType2 = formAddressRegistration.querySelector('[data-action="form-registration-address-type2"]')
    let addresType2Inputs = addressType2.querySelectorAll('input')

    function hideaddressType2() {
        addressType2.style.display = 'none'
        addresType2Inputs.forEach(input => {
            input.removeAttribute('required')
        })
    }

    hideaddressType2()

    addressDoubleCheckbox.addEventListener('change', () => {
        if (addressDoubleCheckbox.checked) {
            hideaddressType2()
            singleFormCheck(formAddressRegistration)
        } else {
            addressType2.style.display = 'block'
            addresType2Inputs.forEach(input => {
                input.setAttribute('required', true)
            })
            singleFormCheck(formAddressRegistration)
        }
    })

}


// mixitup
const brandMixerEl = document.querySelector('.brand-filter-content')
if (brandMixerEl) {
    var brandMixer = mixitup(brandMixerEl, {
        animation: {
            duration: 0
        }
    })
}

// выбор блока при выборе доставки
const deliveryWrapper = document.querySelector('.order-progress-delivery-wrapper')
const deliveryAddressWrapper = document.querySelector('[data-action="delivery-type-warning"]')
const btnGotoOrderPayment = documentBody.querySelector('[data-action="goto-order-payment"]')
const orderPaymentAddressRadioItems = documentBody.querySelectorAll('.order-progress-address-wrapper .form-group__radio')
if (btnGotoOrderPayment) { btnGotoOrderPayment.classList.add('is-disabled') }

let deliveryAddressIsChoosen = false
let deliveryTypeIsChoosen = false

if (orderPaymentAddressRadioItems.length > 0) {
    orderPaymentAddressRadioItems.forEach(orderPaymentAddressRadioItem => {
        let orderPaymentAddressRadioItemDelete = orderPaymentAddressRadioItem.parentNode.querySelector('.btn-delete')
        orderPaymentAddressRadioItemDelete.addEventListener('click', () => {
            orderPaymentAddressRadioItemDelete.parentNode.remove()
            deliveryAddressIsChoosen = false
            btnGotoOrderPayment.classList.add('is-disabled')
        })


        orderPaymentAddressRadioItem.addEventListener('click', () => {
            deliveryAddressIsChoosen = true
            if (deliveryAddressIsChoosen & deliveryTypeIsChoosen) {
                btnGotoOrderPayment.classList.remove('is-disabled')
            }
        })
    })
}

if (deliveryWrapper) {
    let deliveryRadioItems = deliveryWrapper.querySelectorAll('.form-group__radio')
    let deliveryChooseItems = deliveryWrapper.querySelectorAll('.choose-item')
    let deliveryInsuranceItems = deliveryWrapper.querySelectorAll('.delivery-insurance')


    deliveryRadioItems.forEach(item => {
        // прячем адреса доставки, если выбран самовывоз
        if (!item.closest('.choose-item').classList.contains('delivery-type-warning')) {
            item.addEventListener('click', () => {
                deliveryAddressWrapper.style.display = 'none'
                deliveryChooseItems.forEach(item => {
                    item.classList.remove('is-choosen')
                })
                item.closest('.choose-item').classList.add('is-choosen')

                // снимаем блокировку с кнопки Далее
                btnGotoOrderPayment.classList.remove('is-disabled')
            })
        } else {
            item.addEventListener('click', () => {
                deliveryChooseItems.forEach(item => {
                    item.classList.remove('is-choosen')
                })

                deliveryInsuranceItems.forEach(item => {
                    item.classList.remove('is-active')
                })

                deliveryTypeIsChoosen = true

                item.closest('.choose-item').classList.add('is-choosen')
                deliveryAddressWrapper.style.display = 'block'
                deliveryAddressWrapper.classList.add('is-warning')
                item.closest('.choose-item').querySelector('.delivery-insurance').classList.add('is-active')

                // блокируем кнопку Далее
                btnGotoOrderPayment.classList.add('is-disabled')

                if (deliveryAddressIsChoosen & deliveryTypeIsChoosen) {
                    btnGotoOrderPayment.classList.remove('is-disabled')
                }
            })
        }
    })
}





// кнопка Бренды в Категории для десктопа и мобильной версии
const btnBrands = document.querySelector('[data-action="btn-brands"]')
if (btnBrands) {
    const menuItemBrands = document.querySelector('[data-action="menu-item-brands"]')
    btnBrands.addEventListener('click', (e) => { btnBrandsHandler(e) })
    function btnBrandsHandler(e) {
        if (document.body.clientWidth < 768) {
            e.preventDefault()
            menuCatalogOpen()
            if (menuItemBrands) {
                menuItemBrands.classList.add('is-active')
            }
        }
    }
}


//проверка инпутов в формах на пустоту
const formGroups = document.querySelectorAll('.form-group')
if (formGroups.length > 0) {
    formGroups.forEach(formGroup => {
        let formInputs = formGroup.querySelectorAll('input')
        if (formInputs.length > 0) {
            formInputs.forEach(formInput => {
                if (!formInput.val) {
                    formInput.classList.add('empty')
                }

                formInput.addEventListener('input', (e) => {
                    if (e.target.value) {
                        formInput.classList.remove('empty')
                        formInput.classList.add('not-empty')
                    } else {
                        formInput.classList.remove('not-empty')
                        formInput.classList.add('empty')
                    }
                })
            })
        }
    })
}


// эмуляция входа пользователя
const menuUserLogged = document.querySelector('[data-action="menu-user-is-logged"]')
const menuUserNotLogged = document.querySelector('[data-action="menu-user-is-not-logged"]')

const userButtonsLogin = document.querySelector('[data-action="user-buttons-login"]')
const userButtonsUser = document.querySelector('[data-action="user-buttons-user"]')

const setIsLoggedBtn = document.querySelector('[data-action="user-set-logged"]')
const setIsNotLoggedBtns = document.querySelectorAll('[data-action="user-set-not-logged"]')

const needloginBlocks = document.querySelectorAll('.needlogin')
const priceWrapperBlocks = document.querySelectorAll('[data-action="product-price-wrapper"]')
const productFavoriteBtns = document.querySelectorAll('.product-favorite-btn')

let userIsLogged = localStorage.getItem('userLogged')

if (menuUserLogged && menuUserNotLogged) {
    if (userIsLogged == 1) {
        menuUserNotLogged.style.display = 'none'
        menuUserLogged.style.display = 'block'
        userButtonsLogin.classList.add('is-hidden')
        userButtonsUser.classList.add('is-visible')

        if (needloginBlocks && priceWrapperBlocks) {
            needloginBlocks.forEach(needloginBlock => {
                needloginBlock.style.display = 'none'
            })

            // productFavoriteBtns.forEach(productFavoriteBtn => {
            //     productFavoriteBtn.style.display = 'flex'
            // })

            priceWrapperBlocks.forEach(priceWrapperBlock => {
                priceWrapperBlock.style.display = 'flex'
            })
        }

    } else {
        menuUserNotLogged.style.display = 'block'
        menuUserLogged.style.display = 'none'
        userButtonsLogin.classList.add('is-visible')
        userButtonsUser.classList.add('is-hidden')

        if (needloginBlocks && priceWrapperBlocks) {
            needloginBlocks.forEach(needloginBlock => {
                needloginBlock.style.display = 'block'
            })

            // productFavoriteBtns.forEach(productFavoriteBtn => {
            //     productFavoriteBtn.style.display = 'none'
            // })

            priceWrapperBlocks.forEach(priceWrapperBlock => {
                priceWrapperBlock.style.display = 'none'
            })
        }
        setIsLoggedBtn.addEventListener('click', (e) => {
            localStorage.setItem('userLogged', 1)
            menuUserNotLogged.style.display = 'none'
            menuUserLogged.style.display = 'block'
            userButtonsLogin.classList.add('is-hidden')
            userButtonsUser.classList.add('is-visible')
        })
    }

    if (setIsNotLoggedBtns && userIsLogged) {
        setIsNotLoggedBtns.forEach(setIsNotLoggedBtn => {
            setIsNotLoggedBtn.addEventListener('click', () => {
                localStorage.setItem('userLogged', 0)
                menuUserNotLogged.style.display = 'block'
                menuUserLogged.style.display = 'none'
                userButtonsLogin.classList.add('is-visible')
                userButtonsUser.classList.add('is-hidden')
            })
        })
    }
}


//выбор способа оплаты в корзине
const paymentListItems = document.querySelectorAll('.payment-choose-list__item')
const paymentListItemsInputs = document.querySelectorAll('.payment-choose-list__item input')

if (paymentListItems.length > 0) {
    paymentListItems.forEach(paymentListItem => {
        let paymentListItemInput = paymentListItem.querySelector('input')

        paymentListItem.addEventListener('click', () => {
            paymentListItemsInputs.forEach(item => {
                item.removeAttribute('checked')
            })

            paymentListItems.forEach(item => {
                item.classList.remove('is-active')
            })

            paymentListItem.classList.add('is-active')
            paymentListItemInput.setAttribute('checked', 'checked')
        })
    })
}


// новый слайдер
// if (document.querySelectorAll('.product-gallery').length > 0) {
//     const swiperProductThumbs = new Swiper('.product-thumbs', {
//         direction: 'vertical',
//         loop: true,
//         grabCursor: false,
//         slidesPerView: 4,
//         setWrapperSize: true,
//         spaceBetween: 4,
//         allowTouchMove: false,
//         navigation: {
//             nextEl: '.swiper-button-next',
//             prevEl: '.swiper-button-prev',
//         },
//     })

//     const swiperProductGallery = new Swiper('.product-gallery-slider', {
//         loop: true,
//         grabCursor: true,
//         slidesPerView: 2,
//         setWrapperSize: true,
//         spaceBetween: 10,
//         navigation: true,
//         pagination: {
//             el: '.swiper-pagination',
//             clickable: true,
//         },
//         navigation: {
//             nextEl: '.swiper-button-next',
//             prevEl: '.swiper-button-prev',
//         },
//         breakpoints: {
//             768: {
//                 // allowTouchMove: false,
//                 slidesPerView: 1,
//                 spaceBetween: 0,
//                 grabCursor: false,
//                 speed: 0,
//             }
//         }
//     })

//     const swiperProductThumbsItems = document.querySelectorAll('.product-thumbs__item')
//     swiperProductThumbsItems.forEach(item => {
//         item.addEventListener('mouseover', () => {
//             swiperProductGallery.slideTo(parseInt(item.dataset.swiperSlideIndex) + 1);
//         })
//     })
// }



// имитация выбора категории на странице бренда
const brandCateroryListItems = document.querySelectorAll('.category-list__item')
if (brandCateroryListItems.length > 0) {
    brandCateroryListItems.forEach(brandCateroryListItem => {
        brandCateroryListItem.addEventListener('click', () => {
            brandCateroryListItems.forEach(item => {
                item.classList.remove('is-active')
            })
            brandCateroryListItem.classList.add('is-active')
        })
    })
}


function checkOrdeiItemRowValue(ordeiItemRow) {
    let orderItemRowValues = []
    let quantityCounterValueElements = ordeiItemRow.querySelectorAll('.order-item__table .quantity-counter__value')
    quantityCounterValueElements.forEach(quantityCounterValueElement => {
        orderItemRowValues.push(quantityCounterValueElement.innerHTML)
    })

    let orderItemRowValueTotal = 0
    orderItemRowValues.forEach(item => {
        orderItemRowValueTotal = orderItemRowValueTotal + parseInt(item)
    })

    if (orderItemRowValueTotal > 0) {
        return true
    } else {
        return false
    }
}

// имитация изменения количества товара в корзине
// const quantityCounters = document.querySelectorAll('.order-item .order-item__table .quantity-counter')
const quantityCounters = document.querySelectorAll('.quantity-counter')
if (quantityCounters.length > 0) {

    quantityCounters.forEach(quantityCounter => {
        let quantityCounterDecrease = quantityCounter.querySelector('.quantity-counter__btn--decrease')
        let quantityCounterIncrease = quantityCounter.querySelector('.quantity-counter__btn--increase')
        let quantityCounterValueElement = quantityCounter.querySelector('.quantity-counter__value')

        let ordeiItemRow = quantityCounter.closest('.order-item')

        let quantityCounterValue = parseInt(quantityCounterValueElement.innerHTML)
        let orderProductRow = quantityCounter.closest('tr')

        quantityCounterDecrease.addEventListener('click', () => {
            quantityCounterValue--
            quantityCounterValueElement.innerHTML = quantityCounterValue
            if (quantityCounterValue < 2) {
                quantityCounterDecrease.classList.add('quantity-counter__btn--delete')
            }

            if (quantityCounterValue < 1) {
                orderProductRow.style.display = 'none';
                if (ordeiItemRow) {
                    if (checkOrdeiItemRowValue(ordeiItemRow)) {
                    } else {
                        ordeiItemRow.classList.add('is-empty')
                    }
                }
            }
        })

        quantityCounterIncrease.addEventListener('click', () => {
            quantityCounterValue++
            quantityCounterValueElement.innerHTML = quantityCounterValue
            if (quantityCounterValue > 1) {
                quantityCounterDecrease.classList.remove('quantity-counter__btn--delete')
            }
        })
    })

}

// удаление строки с целым товаром из корзины и перенаправление в пустую корзину
const orderItems = document.querySelectorAll('.order-item')
if (orderItems.length > 0) {
    let orderItemsQuantity = orderItems.length

    orderItems.forEach(orderItem => {
        let orderItemremoveBtn = orderItem.querySelector('.order-item__remove')

        if (orderItemremoveBtn) {
            orderItemremoveBtn.addEventListener('click', () => {
                orderItem.remove()
                orderItemsQuantity--
                if (orderItemsQuantity == 0) {
                    window.location.href = 'personal-cart-empty.html';
                }
            })
        }
    })
}

// имитация показа сообщения об отравленном возврате
const totalReturnWrappers = document.querySelectorAll('.total-return__wrapper')
if (totalReturnWrappers.length > 0) {

    totalReturnWrappers.forEach(totalReturnWrapper => {
        let totalReturnBtnDeposit = totalReturnWrapper.querySelector('[data-action="total-return-btn-deposit"]')
        let totalReturnBtnCards = totalReturnWrapper.querySelectorAll('[data-action="total-return-btn-card"]')
        let totalReturnBtnModalCard = totalReturnWrapper.querySelector('[data-action="total-return-btn-modal-card"]')

        totalReturnBtnDeposit.addEventListener('click', () => {
            totalReturnBtnDeposit.remove()
            totalReturnBtnModalCard.remove()

            let message = document.createElement('div')
            message.innerHTML = 'Возврат<br>зачислен <br>на депозит'
            message.classList.add('total-return__message')
            totalReturnWrapper.insertBefore(message, totalReturnWrapper.querySelector('.total-return__buttons'))
            totalReturnBtnCards.remove()

        })


        totalReturnBtnModalCard.addEventListener('click', () => {
            totalReturnBtnCards.innerHTML = 'Подробнее'
            totalReturnBtnModalCard.remove()
            totalReturnBtnDeposit.remove()

            let message = document.createElement('div')
            message.innerHTML = 'Возврат будет отправлен <br>на ваш счет/карту в течение 10 дней.'
            message.classList.add('total-return__message')
            totalReturnWrapper.insertBefore(message, totalReturnWrapper.querySelector('.total-return__buttons'))

            setTimeout(function () { message.innerHTML = '28.07.2021 ВОЗВРАЩЕНО 2650 ₽' }, 2000)
        })
    })

}

// имитация отказа от части товара в Истории заказа
const refuseBtns = document.querySelectorAll('[data-action="refuse-btn"]')
if (refuseBtns.length > 0) {
    refuseBtns.forEach(refuseBtn => {
        let parentRow = refuseBtn.closest('tr')
        refuseBtn.addEventListener('click', () => {
            parentRow.remove()
        })
    })
}


// открытие закрытие блока с формой для написания отзыва
// const feedbackStartBtn = document.querySelector('[data-action="feedback-start"]')
// const feedbackWrapper = document.querySelector('.feedback-wrapper')

// if (feedbackStartBtn) {
//     feedbackStartBtn.addEventListener('click', () => {
//         feedbackWrapper.classList.toggle('is-active')
//     })
// }


// линии рейтинга на странице продукта
// const starsLinesItems = documentBody.querySelectorAll('.stars-lines__item')

// if (starsLinesItems) {
//     starsLinesItems.forEach(starsLinesItem => {
//         let starsLine = starsLinesItem.querySelector('.stars-lines__line')
//         let starsLineMainValue = document.createElement('div')
//         starsLineMainValue.classList.add('stars-lines__value')
//         starsLineMainValue.style.width = starsLinesItem.dataset.feedbackPercent + '%'
//         starsLine.appendChild(starsLineMainValue)
//     })
// }

// предупреждение о необходимости проверить адрес доставки при оформлении заказа
// const deliveryTypeWarningItems = document.querySelectorAll('.js-delivery-type-warning .form-group')

// if (deliveryTypeWarningItems.length > 0) {
//     deliveryTypeWarningItems.forEach(deliveryTypeWarningItem => {
//         console.log(deliveryTypeWarningItem);
//         deliveryTypeWarningItem.addEventListener('click', () => {
//             console.log(deliveryTypeWarningItem)
//         })
//     })
// }


// const btnGotoOrderPayment = documentBody.querySelector('.js-goto-order-payment')
// if (btnGotoOrderPayment) {
//     btnGotoOrderPayment.classList.add('is-disabled')
// }

// const orderPaymentAddressRadioItems = documentBody.querySelectorAll('.order-progress-address-wrapper .form-group__radio')
// if (orderPaymentAddressRadioItems.length > 0) {
//     orderPaymentAddressRadioItems.forEach(orderPaymentAddressRadioItem => {
//         orderPaymentAddressRadioItem.addEventListener('click', () => {
//             btnGotoOrderPayment.classList.remove('is-disabled')
//         })
//     })
// }


// слайдер на главной
const mainSlider = document.querySelector('.m-slider__picture')
if (mainSlider) {
    const swiperMainSliderPicture = new Swiper('.m-slider__picture', {
        loop: true,
        grabCursor: true,
        slidesPerView: 1,
        setWrapperSize: true,
        spaceBetween: 0,
        navigation: false,
        pagination: true,
        speed: 200,
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
                speed: 300,
            }
        }
    });

    const swiperMainSliderContent = new Swiper('.m-slider__content', {
        loop: true,
        grabCursor: false,
        slidesPerView: 1,
        setWrapperSize: true,
        spaceBetween: 0,
        navigation: false,
        allowTouchMove: false,
        speed: 250,
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
                allowTouchMove: false,
                slidesPerView: 1,
                spaceBetween: 0,
                grabCursor: false,
                speed: 250,
            }
        }
    });

    let nextStepsCount = 0
    let prevStepsCount = 0
    let doNextStep = true
    let doPrevStep = true

    swiperMainSliderPicture.on('slideNextTransitionStart', function () {
        if (doNextStep) {
            swiperMainSliderContent.slideNext();
            doNextStep = false
        }
    });

    swiperMainSliderPicture.on('slidePrevTransitionStart', function () {
        if (doPrevStep) {
            swiperMainSliderContent.slidePrev();
            doPrevStep = false
        }
    });

    swiperMainSliderContent.on('slideNextTransitionEnd', function () {
        if (doNextStep) {
            swiperMainSliderPicture.slideNext();
        } else {
            doNextStep = true
        }
    });

    swiperMainSliderContent.on('slidePrevTransitionEnd', function () {
        if (doPrevStep) {
            swiperMainSliderPicture.slidePrev();
        } else {
            doPrevStep = true
        }
    });

}


// кнопка показать/скрыть отзывы на странице товара
// const feedbacksToggleBtn = documentBody.querySelector('[data-action="feedbacks-toggle"]')
// const feedbacksToggleBlock = documentBody.querySelector('.feedbacks')

// if (feedbacksToggleBtn) {
//     feedbacksToggleBtn.addEventListener('click', () => {
//         if (feedbacksToggleBtn.innerHTML == 'Показать отзывы') {
//             feedbacksToggleBtn.innerHTML = 'Скрыть отзывы'
//         } else {
//             feedbacksToggleBtn.innerHTML = 'Показать отзывы'
//         }
//         feedbacksToggleBlock.classList.toggle('is-active')
//     })

//     if (document.body.clientWidth >= 1200) {
//         feedbacksToggleBlock.classList.add('is-active')
//     }


//     window.addEventListener('resize', () => {
//         if (document.body.clientWidth >= 1200) {
//             feedbacksToggleBlock.classList.add('is-active')
//             feedbacksToggleBtn.innerHTML = 'Скрыть отзывы'
//         } else {
//             feedbacksToggleBlock.classList.remove('is-active')
//             feedbacksToggleBtn.innerHTML = 'Показать отзывы'
//         }
//     })


// }


// кпопка показать/скрыть таблицу с размерами на странице продукта
// const productBuy = documentBody.querySelector('.product-buy')
// if (productBuy) {
//     const productBuyClose = productBuy.querySelector('.product-buy__close')
//     const productBuyShowSizes = productBuy.querySelector('.product-buy__btn--showsizes')
//     const productBuyTable = productBuy.querySelector('.product-color-info')

//     productBuyShowSizes.addEventListener('click', () => {
//         productBuyTable.classList.toggle('is-active')
//         productBuyShowSizes.classList.toggle('is-active')
//     })

//     productBuyClose.addEventListener('click', () => {
//         productBuyTable.classList.toggle('is-active')
//         productBuyShowSizes.classList.toggle('is-active')
//     })
// }

// скрипты для страницы товара =============================================

// показать/скрыть дополнительные характеристики на странице товара
const productProperties = document.querySelector('.product-properties')
if (productProperties) {
    const productPropertiesBtn = productProperties.querySelector('.product-properties__btn')
    const productPropertiesMore = productProperties.querySelector('.product-properties__more')

    productPropertiesBtn.addEventListener('click', () => {
        productPropertiesBtn.classList.toggle('is-active')
        productPropertiesMore.classList.toggle('is-active')
    })
}

// рейтинг товара: графики распределение оценок в виде линий
const ratingLines = document.querySelectorAll('.rating-lines__item')
if (ratingLines) {
    ratingLines.forEach(ratingLine => {
        feedbackPercent = ratingLine.dataset.feedbackPercent
        ratingLine.querySelector('.rating-lines__percent').innerHTML = feedbackPercent
        ratingLine.querySelector('.rating-lines__value').style.width = feedbackPercent + '%'
    })
}

// рейтинг товара: графики соответствия размеру
const ratingSizesLines = document.querySelectorAll('.rating-sizes__item')
if (ratingSizesLines) {
    ratingSizesLines.forEach(ratingSizesLine => {
        feedbackSizePercent = ratingSizesLine.dataset.feedbackSizePercent
        ratingSizesLine.querySelector('.rating-sizes__percent').innerHTML = feedbackSizePercent
        ratingSizesLine.querySelector('.rating-sizes__value').style.width = feedbackSizePercent + '%'
    })
}

// рейтинг товара: графики соответствия размеру в виде звезд
const ratingNumberBtn = document.querySelector('.rating-number__btn')
const ratingStars = document.querySelector('.rating-stars')
if (ratingNumberBtn && ratingStars) {
    ratingNumberBtn.addEventListener('mouseover', () => {
        ratingStars.classList.add('is-active')
    })
    ratingNumberBtn.addEventListener('mouseout', () => {
        ratingStars.classList.remove('is-active')
    })
}

// показать/скрыть все размеры в таблице товара, если размеров больше 8
const productTableWrapper = document.querySelector('.product-table-wrapper')
const productTableBtn = document.querySelector('.product-table__btn')
const poductsTableRows = document.querySelectorAll('.product-table__row')
if (poductsTableRows.length > 8) {
    if (productTableWrapper && productTableBtn) {
        productTableBtn.addEventListener('click', () => {
            productTableBtn.classList.toggle('is-active')
            productTableWrapper.classList.toggle('is-active')
        })
    }
} else {
    if (productTableWrapper && productTableBtn) {
        productTableWrapper.classList.remove('product-table-wrapper')
        productTableBtn.style.display = 'none'
    }
}


// имитация добавления размера в корзину
const productTableQuantityItems = document.querySelectorAll('.product-table .quantity')
if (productTableQuantityItems) {
    productTableQuantityItems.forEach(productTableQuantityItem => {
        const plus = productTableQuantityItem.querySelector('.quantity__btn--plus')
        const minus = productTableQuantityItem.querySelector('.quantity__btn--minus')
        const input = productTableQuantityItem.querySelector('.quantity__input')
        const parentRow = input.closest('tr')
        let inputValue = 0

        input.addEventListener('change', () => {
            updateTotal()
        })

        plus.addEventListener('click', () => {
            inputValue = Number(input.value) + 1
            input.value = inputValue

            if (inputValue >= 1) {
                // minus.classList.remove('quantity__btn--delete')
                parentRow.classList.add('is-added')
                minus.disabled = false
            }

            // if (inputValue == 1) {
            //     minus.classList.add('quantity__btn--delete')
            // }

            updateTotal()
        })

        minus.addEventListener('click', () => {
            if (inputValue > 0) {
                inputValue = Number(input.value) - 1
                input.value = inputValue
                minus.disabled = false
            }

            // if (inputValue == 1) {
            //     minus.classList.add('quantity__btn--delete')
            // }

            if (inputValue == 0) {
                parentRow.classList.remove('is-added')
                // minus.classList.remove('quantity__btn--delete')
                minus.disabled = true
            }

            updateTotal()
        })
    })
}

// обновление подитога на странице товара
const productTotalCostEl = document.querySelector('.product-table__total .after-currency')
const productTotalQuantityEl = document.querySelector('.product-table__total .after-pz')
const productTotalEl = document.querySelector('[data-action="product-table-total"]')

function updateTotal() {
    let productTotalCost = 0
    let productTotalQuantity = 0

    poductsTableRows.forEach(poductsTableRow => {
        const inputVal = poductsTableRow.querySelector('.quantity__input').value
        const price = poductsTableRow.querySelector('.product-price__base').innerHTML.replace(/\s/g, '');

        productTotalCost = productTotalCost + (Number(inputVal) * price)
        productTotalQuantity = productTotalQuantity + Number(inputVal)
    })
    productTotalEl.classList.add('is-animated')
    productTotalCostEl.innerHTML = productTotalCost.toLocaleString('ru')
    productTotalQuantityEl.innerHTML = productTotalQuantity

    setTimeout(() => { productTotalEl.classList.remove('is-animated') }, 100);
}


// показ отзывов
const productFeedbackItems = document.querySelectorAll('.feedback-messages__item')
const productFeedbackAllBtn = document.querySelector('.product-feedback__all')


// показываем кнопку разворачивания отзывов, если их больше одного
if (productFeedbackItems) {
    if (productFeedbackItems.length > 2) {
        productFeedbackAllBtn.classList.add('is-showed')
        productFeedbackAllBtn.addEventListener('click', () => {
            productFeedbackAllBtn.classList.toggle('is-active')
            productFeedbackItems.forEach(productFeedbackItem => {
                productFeedbackItem.classList.toggle('is-showed')
            })
        })
    }
}

// форма добавления отзыва
const productFeedbackForm = document.querySelector('.feedback-form')
const productFeedbackAddBtn = document.querySelector('.product-feedback__add')
if (productFeedbackForm && productFeedbackAddBtn) {
    productFeedbackAddBtn.addEventListener('click', () => {
        productFeedbackForm.classList.toggle('is-active')
        productFeedbackAddBtn.classList.toggle('is-active')

    })
}

// загрузка файлов в отзыв перетаскиванием
const dropArea = document.querySelector('.form-file');
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
        dropArea.classList.add('is-highlight')
    }

    function dropAreaUnhighlight() {
        dropArea.classList.remove('is-highlight')
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
            document.querySelector('.form-file-prewiew').appendChild(img)
        }
    }
}


// кпопка показать/скрыть таблицу с размерами на странице продукта
const productBuy = document.querySelector('.product-buy')
if (productBuy) {
    const productBuyCloseBtn = productBuy.querySelector('.product-buy__close')
    const productBuyShowSizes = productBuy.querySelector('.product-buy__btn--showsizes')
    const productBuyTable = productBuy.querySelector('.product-buy__table')
    const productBuyOverlay = productBuy.querySelector('.product-buy__overlay')

    productBuyShowSizes.addEventListener('click', () => {
        productBuyTable.classList.toggle('is-active')
        productBuyShowSizes.classList.toggle('is-active')
        productBuyOverlay.classList.toggle('is-active')
    })

    function productBuyClose() {
        productBuyTable.classList.toggle('is-active')
        productBuyShowSizes.classList.toggle('is-active')
        productBuyOverlay.classList.toggle('is-active')
    }

    productBuyCloseBtn.addEventListener('click', () => {
        productBuyClose()
    })

    productBuyOverlay.addEventListener('click', () => {
        productBuyClose()
    })
}