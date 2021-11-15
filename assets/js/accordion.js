"use strict";

// аккордион
class Accordion {
    // el
    // title
    // disabledOnValue
    // pointerOffOnValue
    // closeAnother

    constructor(el) {
        this.el = el;
        this.items = this.el.querySelectorAll('.accordion__item');
        this.disabledOnValue = this.el.dataset.accordionDisabled;
        this.pointerOffOnValue = this.el.dataset.accordionPointerOff;
        this.contentNoShow = this.el.classList.contains('accordion--content-no-show');

        // если data-close-another не указано, то другие не закрываются
        // если есть пустой атрибут data-close-another, то другие всегда закрываются
        // если есть data-close-another со значение, то другие всегда закрываются,
        // когда ширина окна больше этого значения

        if (this.el.dataset.closeAnother < 10) {
            this.closeAnotherValue = 0;
        } else {
            this.closeAnotherValue = this.el.dataset.closeAnother;
        }
    }

    start() {
        const checkAccordionDisabled = () => {
            if (this.disabledOnValue && window.innerWidth >= this.disabledOnValue) {
                this.el.classList.remove('accordion--enabled');
                this.el.classList.add('accordion--disabled');
            } else {
                this.el.classList.add('accordion--enabled');
                this.el.classList.remove('accordion--disabled');
            }
        };

        checkAccordionDisabled();

        const checkAccordionPointerOff = () => {
            if (this.pointerOffOnValue && window.innerWidth >= this.pointerOffOnValue) {
                this.el.classList.add('accordion--pointeroff');
            } else {
                this.el.classList.remove('accordion--pointeroff');
            }
        };

        checkAccordionPointerOff();

        const chekAccordionContentNoShow = () => {
            this.items.forEach(item => {
                let title = item.querySelector('.accordion__title');
                title.addEventListener('click', (e) => {
                    // останавливаем всплытие события
                    e.stopImmediatePropagation();

                    if (!this.contentNoShow && window.innerWidth < 768) {
                        // отменяем переход по ссылке
                        e.preventDefault();
                    }

                    // закрываем другие пункты аккордиона
                    if (window.innerWidth >= this.closeAnotherValue) {
                        this.items.forEach(itemAnother => {
                            if (itemAnother !== item) {
                                itemAnother.classList.remove('is-opened');
                            }
                        });
                    }

                    // открываем этот пункт аккордиона
                    item.classList.toggle('is-opened');
                });
            });
        };

        chekAccordionContentNoShow();

        window.addEventListener('resize', function () {
            checkAccordionDisabled();
            checkAccordionPointerOff();
            chekAccordionContentNoShow();
        });
    }
}
const accordions = document.querySelectorAll('.accordion');
if (accordions) {
    accordions.forEach(accordion => {
        let accInstance = new Accordion(accordion);
        accInstance.start();
    });
}
