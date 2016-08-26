import {Model} from './modules/Model';
import {View} from './modules/View';
// import {MyBalloonLayout} from './modules/Balloon';
import Controller from './modules/Controller'
// import Behavior from './modules/Behavior';


new Promise(resolve => {
  resolve(Model.ready([55.76, 37.64]));


}).then((myMap) => {


  let clusterer = new ymaps.Clusterer({
    clusterDisableClickZoom: true,
    clusterOpenBalloonOnClick: true,
    // Устанавливаем режим открытия балуна.
    // В данном примере балун никогда не будет открываться в режиме панели.
    clusterBalloonPanelMaxMapArea: 0,
    // Устанавливаем размер макета контента балуна (в пикселях).
    clusterBalloonContentLayoutWidth: 350,
    // Устанавливаем собственный макет.
    clusterBalloonContentLayout: 'cluster#balloonCarousel',
    clusterBalloonItemContentLayout: View.itemContentLayout(),
    // Устанавливаем ширину левой колонки, в которой располагается список всех геообъектов кластера.
    clusterBalloonLeftColumnWidth: 120
  });
  let placemarks = [];
  myMap.geoObjects.add(clusterer);


  myMap.events.add('click', function (e) {
    // myMap.balloon.close();
    let coords = e.get('coords');
    Model.getAddress(coords).then(addr => {
      myMap.balloon.open(coords,
        {
            properties: {
              name: addr
            },
            myFooterContent: 'footer content'
        },
        {
            layout: View.BalloonLayout(),
            contentLayout: View.BalloonContent()
        }
      ).then(() => {
        let form = document.forms.review;
        form.addEventListener('submit', e => {
          e.preventDefault();
          let review = {
              date: new Date().toLocaleString(),
              name: form.elements.name.value,
              place: form.elements.place.value,
              comment: form.elements.comment.value
            };
          let newPlacemark = window.myPlacemark = new ymaps.Placemark(coords,
            {
              name: addr,
              reviews: [review]
            },
            {
              balloonLayout: View.BalloonLayout(),
              balloonContentLayout: View.BalloonContent()
            }
          );
          console.log('add');
          placemarks.push(newPlacemark);
          clusterer.add(placemarks);
          newPlacemark.balloon.open().then(() => {
            console.log('newPlacemark.balloon.open');
          });
        });
      });
    });
  });



  myMap.geoObjects.events
    .add('balloonopen', function (e) {
      let object = e.get('target');

      document.querySelector('.popup').addEventListener('click', e => {
        if(e.target.id == 'add_review'){
          e.preventDefault();
          let form = document.forms.review;
          let reviews = object.properties.get('reviews').concat({
              date: new Date().toLocaleString(),
              name: form.elements.name.value,
              place: form.elements.place.value,
              comment: form.elements.comment.value
            });
          let exist = object.properties.get('reviews').some(el => {
            return el.place == form.elements.place.value;
          });
          if(exist){
            object.properties.set({reviews: reviews});
          }else{
            let newPlacemark = new ymaps.Placemark(object.geometry.getCoordinates(),
              {
                name: object.properties.get('name'),
                reviews: [review]
              },
              {
                balloonLayout: View.BalloonLayout(),
                balloonContentLayout: View.BalloonContent()
              }
            );
            placemarks.push(newPlacemark);
            clusterer.add(placemarks);
          }
        }
      });
    });


}).catch(function(e) {
    console.error(e);
});



document.getElementById('set-balloon-header').addEventListener('click', function () {
    window.myPlacemark.properties.set(
        'reviews',
        [{
          name: 'mame',
          place: 'place',
          comment: 'comment'
        }]
    );
});
