"use strict";

// калькулятор размеров для бюстгальтеров бренда Conto

let drags = document.querySelectorAll('.drags input');
let resultBra = document.querySelector('.bust-result__bra span');
let resultSlip = document.querySelector('.bust-result__slip span');

let bustSize = 90;
let underBustSize = 70;
let hipsSize = 90;
let checkSizes;

if (drags.length > 0) {
    drags.forEach(drag => {
        let dragValue = drag.closest('.drag-range').querySelector('.drag-range__value');
        drag.addEventListener('input', () => {
            dragValue.innerText = drag.value;
            checkSizes({ title: drag.name, value: drag.value });
        });
    });

    checkSizes = function (size) {
        let resultBustSizes = [];
        let resultSlipSizes = [];

        switch (size.title) {
            case 'bust':
                bustSize = size.value;
                break;
            case 'underbust':
                underBustSize = size.value;
                break;
            case 'hips':
                hipsSize = size.value;
        }

        if (size.title == 'bust' || size.title == 'underbust') {
            underBustSizes.forEach(row => {
                if (underBustSize >= row.min && underBustSize <= row.max) {
                    row.bustSizes.forEach(col => {
                        if (bustSize >= col.min && bustSize <= col.max) {
                            resultBustSizes.push(row.title + col.title);
                        }
                    });
                }
            });

            if (resultBustSizes.length > 0) {
                resultBra.classList.add('is-animated');
                resultBra.innerHTML = resultBustSizes.join(' или ');
                setTimeout(() => { resultBra.classList.remove('is-animated'); }, 200);
            } else {
                resultBra.innerHTML = "Нет соответствий";
            }
        }

        if (size.title == 'hips') {
            hipsSizes.forEach(row => {
                if (hipsSize >= row.min && hipsSize <= row.max) {
                    resultSlipSizes.push(row.title);
                }
            })

            if (resultSlipSizes.length > 0) {
                resultSlip.innerHTML = resultSlipSizes.join(' или ');
            } else {
                resultSlip.innerHTML = "Нет соответствий";
            }
        }

    };

    let underBustSizes = [
        {
            min: 63, max: 67, title: 65, bustSizes: [
                { min: 75, max: 77, title: "AA" },
                { min: 77, max: 79, title: "A" },
                { min: 79, max: 81, title: "B" },
                { min: 81, max: 83, title: "C" },
                { min: 83, max: 85, title: "D" },
                { min: 85, max: 87, title: "E" },
                { min: 87, max: 89, title: "F" },
                { min: 89, max: 91, title: "G" },
                { min: 91, max: 93, title: "H" },
                { min: 93, max: 95, title: "I" },
                { min: 95, max: 97, title: "J" }
            ]
        },
        {
            min: 68, max: 72, title: 70, bustSizes: [
                { min: 80, max: 82, title: "AA" },
                { min: 82, max: 84, title: "A" },
                { min: 84, max: 86, title: "B" },
                { min: 86, max: 88, title: "C" },
                { min: 88, max: 90, title: "D" },
                { min: 90, max: 92, title: "E" },
                { min: 92, max: 94, title: "F" },
                { min: 94, max: 96, title: "G" },
                { min: 96, max: 98, title: "H" },
                { min: 98, max: 100, title: "I" },
                { min: 100, max: 102, title: "J" }
            ]
        },
        {
            min: 73, max: 77, title: 75, bustSizes: [
                { min: 85, max: 87, title: "AA" },
                { min: 87, max: 89, title: "A" },
                { min: 89, max: 91, title: "B" },
                { min: 91, max: 93, title: "C" },
                { min: 93, max: 95, title: "D" },
                { min: 95, max: 97, title: "E" },
                { min: 97, max: 99, title: "F" },
                { min: 99, max: 101, title: "G" },
                { min: 101, max: 103, title: "H" },
                { min: 103, max: 105, title: "I" },
                { min: 105, max: 107, title: "J" }
            ]
        },
        {
            min: 78, max: 82, title: 80, bustSizes: [
                { min: 90, max: 92, title: "AA" },
                { min: 92, max: 94, title: "A" },
                { min: 94, max: 96, title: "B" },
                { min: 96, max: 98, title: "C" },
                { min: 98, max: 100, title: "D" },
                { min: 100, max: 102, title: "E" },
                { min: 102, max: 104, title: "F" },
                { min: 104, max: 106, title: "G" },
                { min: 106, max: 108, title: "H" },
                { min: 108, max: 110, title: "I" },
                { min: 110, max: 112, title: "J" }
            ]
        },
        {
            min: 83, max: 87, title: 85, bustSizes: [
                { min: 95, max: 97, title: "AA" },
                { min: 97, max: 99, title: "A" },
                { min: 99, max: 101, title: "B" },
                { min: 101, max: 103, title: "C" },
                { min: 103, max: 105, title: "D" },
                { min: 105, max: 107, title: "E" },
                { min: 107, max: 109, title: "F" },
                { min: 109, max: 111, title: "G" },
                { min: 111, max: 113, title: "H" },
                { min: 113, max: 115, title: "I" },
                { min: 115, max: 117, title: "J" }
            ]
        },
        {
            min: 88, max: 92, title: 90, bustSizes: [
                { min: 100, max: 102, title: "AA" },
                { min: 102, max: 104, title: "A" },
                { min: 104, max: 106, title: "B" },
                { min: 106, max: 108, title: "C" },
                { min: 108, max: 110, title: "D" },
                { min: 110, max: 112, title: "E" },
                { min: 112, max: 114, title: "F" },
                { min: 114, max: 116, title: "G" },
                { min: 116, max: 118, title: "H" },
                { min: 118, max: 120, title: "I" },
                { min: 120, max: 122, title: "J" }
            ]
        },
        {
            min: 93, max: 97, title: 95, bustSizes: [
                { min: 107, max: 109, title: "A" },
                { min: 109, max: 111, title: "B" },
                { min: 111, max: 113, title: "C" },
                { min: 113, max: 115, title: "D" },
                { min: 115, max: 117, title: "E" },
                { min: 117, max: 119, title: "F" },
                { min: 119, max: 121, title: "G" },
                { min: 121, max: 123, title: "H" },
                { min: 123, max: 125, title: "I" },
                { min: 125, max: 127, title: "J" }
            ]
        },
        {
            min: 98, max: 102, title: 100, bustSizes: [
                { min: 112, max: 114, title: "A" },
                { min: 114, max: 116, title: "B" },
                { min: 116, max: 118, title: "C" },
                { min: 118, max: 120, title: "D" },
                { min: 120, max: 122, title: "E" },
                { min: 122, max: 124, title: "F" },
                { min: 124, max: 126, title: "G" },
                { min: 126, max: 128, title: "H" },
                { min: 128, max: 130, title: "I" },
                { min: 130, max: 132, title: "J" }
            ]
        },
        {
            min: 103, max: 107, title: 105, bustSizes: [
                { min: 117, max: 119, title: "A" },
                { min: 119, max: 121, title: "B" },
                { min: 121, max: 123, title: "C" },
                { min: 123, max: 125, title: "D" },
                { min: 125, max: 127, title: "E" },
                { min: 127, max: 129, title: "F" },
                { min: 129, max: 131, title: "G" },
                { min: 131, max: 133, title: "H" },
                { min: 133, max: 135, title: "I" },
                { min: 135, max: 137, title: "J" }
            ]
        },
        {
            min: 108, max: 112, title: 110, bustSizes: [
                { min: 122, max: 124, title: "A" },
                { min: 124, max: 126, title: "B" },
                { min: 126, max: 128, title: "C" },
                { min: 128, max: 130, title: "D" },
                { min: 130, max: 132, title: "E" },
                { min: 132, max: 134, title: "F" },
                { min: 134, max: 136, title: "G" },
                { min: 136, max: 138, title: "H" },
                { min: 138, max: 140, title: "I" },
                { min: 140, max: 142, title: "J" }
            ]
        },
        {
            min: 113, max: 117, title: 115, bustSizes: [
                { min: 129, max: 131, title: "B" },
                { min: 131, max: 133, title: "C" },
                { min: 133, max: 135, title: "D" },
                { min: 135, max: 137, title: "E" },
                { min: 137, max: 139, title: "F" },
                { min: 139, max: 141, title: "G" },
                { min: 141, max: 143, title: "H" },
                { min: 143, max: 145, title: "I" },
                { min: 145, max: 147, title: "J" }
            ]
        },
        {
            min: 118, max: 122, title: 120, bustSizes: [
                { min: 134, max: 136, title: "B" },
                { min: 136, max: 138, title: "C" },
                { min: 138, max: 140, title: "D" },
                { min: 140, max: 142, title: "E" },
                { min: 142, max: 144, title: "F" },
                { min: 144, max: 146, title: "G" },
                { min: 146, max: 148, title: "H" },
                { min: 148, max: 150, title: "I" },
                { min: 150, max: 152, title: "J" }
            ]
        },

    ];

    let hipsSizes = [
        { min: 85, max: 87, title: '86/XS' },
        { min: 88, max: 88, title: '86/XS или 94/M' },
        { min: 89, max: 91, title: '90/S' },
        { min: 92, max: 92, title: '90/S или 94/M' },
        { min: 93, max: 95, title: '94/M' },
        { min: 96, max: 96, title: '94/M или 98/L' },
        { min: 97, max: 99, title: '98/L' },
        { min: 100, max: 100, title: '98/L или 102/XL' },
        { min: 101, max: 103, title: '102/XL' },
        { min: 104, max: 104, title: '102/XL или 106/XXL' },
        { min: 105, max: 107, title: '106/XXL' },
        { min: 108, max: 108, title: '106/XXL или 110/3XL' },
        { min: 109, max: 111, title: '110/3XL' },
        { min: 112, max: 112, title: '110/3XL или 114/4XL' },
        { min: 113, max: 115, title: '114/4XL' },
        { min: 116, max: 116, title: '114/4XL или 118/5XL' },
        { min: 117, max: 119, title: '118/5XL' },
    ];

    checkSizes({ title: "bust", value: bustSize });
    checkSizes({ title: "underbust", value: underBustSize });
    checkSizes({ title: "hips", value: hipsSize });
}

