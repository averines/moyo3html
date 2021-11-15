"use strict";


// имитация переключения сортировки в каталоге
const togglerSort = document.querySelector('.toggler-sort');
if (togglerSort) {
    const togglerSortBtns = togglerSort.querySelectorAll('.toggler-sort__item');
    togglerSortBtns.forEach(togglerSortBtn => {
        togglerSortBtn.addEventListener('click', () => {
            if (!togglerSortBtn.classList.contains('is-active')) {
                [...togglerSortBtns].forEach(togglerSortBtn => {
                    togglerSortBtn.classList.remove('is-active');
                });
                togglerSortBtn.classList.add('is-active');
            }
        });
    });
}

const togglersItems = document.querySelectorAll('.togglers__item');
if (togglersItems.length > 0) {
    togglersItems.forEach(item => {
        item.addEventListener('click', () => {
            item.classList.toggle('is-active');
        });
    });
}

// имитация переключение количества элементов на странице
const togglerCount = document.querySelector('.toggler-count');
if (togglerCount) {
    const togglerCountBtns = togglerCount.querySelectorAll('.toggler-count__item');
    togglerCountBtns.forEach(togglerCountBtn => {
        togglerCountBtn.addEventListener('click', (e) => {
            if (!togglerCountBtn.classList.contains('is-active')) {
                [...togglerCountBtns].forEach(togglerCountBtn => {
                    togglerCountBtn.classList.remove('is-active');
                });
                togglerCountBtn.classList.add('is-active');
            }
        });
    });

    // for (let togglerCountBtn of togglerCountBtns) {
    //     togglerCountBtn.addEventListener('click', (e) => {
    //         if (!togglerCountBtn.classList.contains('is-active')) {
    //             [...togglerCountBtns].forEach(togglerCountBtn => {
    //                 togglerCountBtn.classList.remove('is-active');
    //             });
    //             togglerCountBtn.classList.add('is-active');
    //         }
    //     });
    // }
}
