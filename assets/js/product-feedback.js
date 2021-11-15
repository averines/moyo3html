"use strict";

// отзывы===================================================
// показ отзывов
const productFeedbackItems = document.querySelectorAll('.feedback-messages__item');
const productFeedbackAllBtn = document.querySelector('.product-feedback__all');

// показываем кнопку разворачивания отзывов, если их больше одного
if (productFeedbackItems) {
    if (productFeedbackItems.length > 2) {
        productFeedbackAllBtn.classList.add('is-showed');
        productFeedbackAllBtn.addEventListener('click', () => {
            productFeedbackAllBtn.classList.toggle('is-active');
            productFeedbackItems.forEach(productFeedbackItem => {
                productFeedbackItem.classList.toggle('is-showed');
            });
        });
    }
}

// форма добавления отзыва
const productFeedbackForm = document.querySelector('.feedback-form');
const productFeedbackAddBtn = document.querySelector('.product-feedback__add');
if (productFeedbackForm && productFeedbackAddBtn) {
    productFeedbackAddBtn.addEventListener('click', () => {
        productFeedbackForm.classList.toggle('is-active');
        productFeedbackAddBtn.classList.toggle('is-active');
    });
}

// загрузка файлов в отзыв перетаскиванием
const dropArea = document.querySelector('.form-file');
let preventDefaults;
let dropAreaHighlight;
let dropAreaUnhighlight;
let dropHandle;
let handleFiles;
let uploadFile;
let previewFile;

if (dropArea) {
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        dropArea.addEventListener(eventName, preventDefaults, false);
    });

    dropArea.addEventListener('dragenter', dropAreaHighlight, false);
    dropArea.addEventListener('dragover', dropAreaHighlight, false);
    dropArea.addEventListener('dragleave', dropAreaUnhighlight, false);
    dropArea.addEventListener('drop', dropAreaUnhighlight, false);
    dropArea.addEventListener('drop', dropHandle, false);


    preventDefaults = function (e) {
        e.preventDefault();
        e.stopPropagation();
    };

    dropAreaHighlight = function () {
        dropArea.classList.add('is-highlight');
    };

    dropAreaUnhighlight = function () {
        dropArea.classList.remove('is-highlight');
    };

    dropHandle = function (e) {
        let dt = e.dataTransfer;
        let files = dt.files;
        handleFiles(files);
    };

    handleFiles = function (files) {
        files = [...files];
        // files.forEach(uploadFile)
        files.forEach(previewFile);
    };

    uploadFile = function (file) {
        let url = 'ВАШ URL ДЛЯ ЗАГРУЗКИ ФАЙЛОВ';
        let xhr = new XMLHttpRequest();
        let formData = new FormData();
        xhr.open('POST', url, true);
        xhr.addEventListener('readystatechange', function (e) {
            if (xhr.readyState == 4 && xhr.status == 200) {
                // Готово. Информируем пользователя
            }
            else if (xhr.readyState == 4 && xhr.status != 200) {
                // Ошибка. Информируем пользователя
            }
        });
        formData.append('file', file);
        xhr.send(formData);
    };

    previewFile = function (file) {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = function () {
            let img = document.createElement('img');
            img.src = reader.result;
            document.querySelector('.form-file-prewiew').appendChild(img);
        };
    };
}