"use strict";

// кнопка добавления в избранное
function productFavoritesHandler() {
    const favoritesBtns = document.querySelectorAll('.product-favorite');
    if (favoritesBtns) {
        favoritesBtns.forEach(favoritesBtn => {
            favoritesBtn.addEventListener('click', () => {
                if (!favoritesBtn.classList.contains('is-active')) {
                    favoritesBtn.insertAdjacentHTML('afterbegin', '<span></span>');
                    setTimeout(function () { favoritesBtn.innerHTML = ''; }, 1000);
                }
                favoritesBtn.classList.toggle('is-active');
            });
        });
    }
}

productFavoritesHandler();