import {Model} from './modules/Model';
import {View} from './modules/View';
// import {MyBalloonLayout} from './modules/Balloon';
import Controller from './modules/Controller'
// import Behavior from './modules/Behavior';


new Promise(resolve => {
  resolve(Model.ready([55.76, 37.64]));

}).then((myMap) => {
  myMap.events.add('click', function (e) {
    var coords = e.get('coords');
    let newPlacemark = Model.createPlacemark(coords, View.BalloonLayout(),View.BalloonContent());
    Model.getAddress(newPlacemark,coords);
    myMap.geoObjects.add(newPlacemark);
    newPlacemark.balloon.open().then(() => {
      newPlacemark.balloon.events.add('click', e => {
        e.preventDefault();
        newPlacemark.properties.set({});
        let target = document.getElementById('add_review');
        if(target.dataset.role == 'add'){
          newPlacemark.properties.set({exists:true});
        }
      });
      newPlacemark.events.add('balloonclose', e => {
        if(!newPlacemark.properties.get('exists')){
          myMap.geoObjects.remove(newPlacemark);
        }
      });
    });


  });
  return myMap;
}).then((myMap) => {
  myMap.events.add('click', function (e) {
    // console.log('then',myMap);
  });
  // console.log(myMap);


}).catch(function(e) {
    console.error(e);
    alert('Ошибка: ' + e.message);
});

//
// var myMap;
// ymaps.ready(function () {
//     myMap = new ymaps.Map("ya_map", {
//         center: [55.76, 37.64],
//         zoom: 10,
//         controls: ["zoomControl", "fullscreenControl"]
//     });
//
//     myMap.events.add('click', function (e) {
//         // Получение координат щелчка
//         var coords = e.get('coords');
//         console.log(coords.join(', '));
//
//         var plc = new Promise(resolve => {
//           var myPlacemark = new ymaps.Placemark(coords,
//             {
//               balloonContentHeader: 'Однажды',
//               balloonContentBody: 'В студёную зимнюю пору',
//               balloonContentFooter: 'Мы пошли в гору',
//               hintContent: 'Зимние происшествия'
//             },
//             {balloonContentLayout: MyBalloonContentLayoutClass}
//           );
//           if(myPlacemark){
//             resolve(myPlacemark);
//           }
//         });
//
//         plc.then((myPlacemark) => {
//           console.log('promise');
//           getAddress(myPlacemark,myPlacemark.geometry.getCoordinates())
//           console.log(myPlacemark.properties);
//           myMap.geoObjects.add(myPlacemark);
//           myPlacemark.balloon.open();
//           let geo = ymaps.geocode(coords).then(res => {
//             console.log('geo', res.geoObjects.get(0));
//           });
//
//         })
//
//         // Балун откроется в точке «привязки» балуна — т. е. над меткой.
//     });
//
//     var MyBalloonContentLayoutClass = ymaps.templateLayoutFactory.createClass(
//         '<h3>{{ properties.name }}</h3>' +
//         '<p>Описание: {{ properties.description }}</p>' +
//         '<p>Население: {{ properties.population|default:"неизвестно" }}</p>' +
//         '<p>Метрополитен: {% if properties.metro %}да{% else %}нет{% endif %}</p>'
//
//     );
//
//     function getAddress(myPlacemark,coords) {
//         myPlacemark.properties.set('iconCaption', 'поиск...');
//         ymaps.geocode(coords).then(function (res) {
//             var firstGeoObject = res.geoObjects.get(0);
//             console.log('firstGeoObject',firstGeoObject.properties);
//             myPlacemark.properties
//                 .set({
//                     name: firstGeoObject.properties.get('name'),
//                     description: firstGeoObject.properties.get('text')
//                 });
//         });
//     }
//
// });
