"use strict";

// рейтинг товара: графики распределение оценок в виде линий
const ratingLines = document.querySelectorAll('.rating-lines__item');
if (ratingLines) {
    ratingLines.forEach(ratingLine => {
        let feedbackPercent = ratingLine.dataset.feedbackPercent;
        ratingLine.querySelector('.rating-lines__percent').innerHTML = feedbackPercent;
        ratingLine.querySelector('.rating-lines__value').style.width = feedbackPercent + '%';
    });
}

// рейтинг товара: графики соответствия размеру
const ratingSizesLines = document.querySelectorAll('.rating-sizes__item');
if (ratingSizesLines) {
    ratingSizesLines.forEach(ratingSizesLine => {
        let feedbackSizePercent = ratingSizesLine.dataset.feedbackSizePercent;
        ratingSizesLine.querySelector('.rating-sizes__percent').innerHTML = feedbackSizePercent;
        ratingSizesLine.querySelector('.rating-sizes__value').style.width = feedbackSizePercent + '%';
    });
}

// рейтинг товара: графики соответствия размеру в виде звезд
const ratingNumberBtn = document.querySelector('.rating-number__btn');
const ratingStars = document.querySelector('.rating-stars');
if (ratingNumberBtn && ratingStars) {
    ratingNumberBtn.addEventListener('mouseover', () => {
        ratingStars.classList.add('is-active');
    });
    ratingNumberBtn.addEventListener('mouseout', () => {
        ratingStars.classList.remove('is-active');
    });
}