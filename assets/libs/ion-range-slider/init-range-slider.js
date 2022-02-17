"use strict";

//мультибегунок
let rangeSlider = document.querySelector('[data-action="range-slider"]'),
    inputFrom = document.querySelector('[data-action="range-from"]'),
    inputTo = document.querySelector('[data-action="range-to"]'),
    rangeInstance,
    rangeMin = 100,
    rangeMax = 1000,
    rangeFrom = 100,
    rangeTo = 1000;

function updateInputs(data) {
    let from = data.from;
    let to = data.to;

    inputFrom.prop("value", from);
    inputTo.prop("value", to);
}

// if (rangeSlider.length > 0) {
//     rangeSlider.ionRangeSlider({
//         skin: "round",
//         type: "double",
//         min: rangeMin,
//         max: rangeMax,
//         from: 100,
//         to: 1000,
//         onStart: updateInputs,
//         onChange: updateInputs
//     });

//     rangeInstance = rangeSlider.data("ionRangeSlider");



//     inputFrom.on("input", function () {
//         var val = $(this).prop("value");

//         // validate
//         if (val < rangeMin) {
//             val = rangeMin;
//         } else if (val > rangeTo) {
//             val = rangeTo;
//         }

//         rangeInstance.update({
//             from: val
//         });
//     });

//     inputTo.on("input", function () {
//         var val = $(this).prop("value");

//         // validate
//         if (val < rangeFrom) {
//             val = rangeFrom;
//         } else if (val > rangeMax) {
//             val = rangeMax;
//         }

//         rangeInstance.update({
//             to: val
//         });
//     });
// }