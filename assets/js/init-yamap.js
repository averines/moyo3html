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
                    center: [55.778036, 37.736500],
                    zoom: 15
                },
                {
                    searchControlProvider: 'yandex#search'
                }
            );
            myMap.geoObjects.add(
                new ymaps.Placemark(
                    [55.778036, 37.736500],
                    {
                        balloonContent: 'ул. Вольная, д. 35, стр. 8',
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
