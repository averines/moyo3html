"use strict";

// инициализация карты
let modalMapStatus; // для проверки существования карты в модальном окне
let initmap;
if (document.getElementById('js-map1')) {
    initmap = function () {
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
            myMap.behaviors.disable('scrollZoom');
        }
    };
    ymaps.ready(initmap);
}
