import {Model} from './modules/Model';
import {View} from './modules/View';


new Promise(resolve => {
  resolve(Model.ready([55.76, 37.64]));


}).then((myMap) => {


  let clusterer = new ymaps.Clusterer({
    clusterDisableClickZoom: true,
    clusterOpenBalloonOnClick: true,
    clusterBalloonPanelMaxMapArea: 0,
    clusterBalloonContentLayoutWidth: 350,
    clusterBalloonContentLayout: 'cluster#balloonCarousel',
    clusterBalloonItemContentLayout: View.itemContentLayout(),
    clusterBalloonLeftColumnWidth: 120
  });
  myMap.geoObjects.add(clusterer);


  myMap.events.add('click', function (e) {
    let coords = e.get('coords');
    openBaloon(coords);
  });

  myMap.geoObjects.events.add('click', e => {
    let object = e.get('target');
    if(object.properties.get('placemark')){
      let coords = e.get('coords');
      e.preventDefault();
      openBaloon(coords)
    }
  });


  function openBaloon(coords){
    Model.getAddress(coords).then(addr => {
      let reviews = clusterer.getGeoObjects()
        .map(el => {
          return el.properties.get('reviews');
        });
      // let rewiewsFiltered = clusterer.getGeoObjects()
      //   .filter(el => {
      //     if(el.geometry.getCoordinates() == coords){
      //       return true;
      //     }
      //   })
      //   .map(el => {
      //     return el.geometry.getCoordinates();
      //   });
      // console.log('reviews',coords,rewiewsFiltered, clusterer.getGeoObjects().map(el => {
      //     return el.geometry.getCoordinates();
      //   }));
      myMap.balloon.open(coords,
        {
          properties: {
            name: addr,
            reviews: reviews
          }
        },
        {
            layout: View.BalloonLayout(),
            contentLayout: View.BalloonContent()
        }
      ).then(() => {
        document.querySelector('.popup').addEventListener('click', e => {
          console.log('popup');
          if(e.target.id == "add_review"){
            console.log('add_review');
            e.preventDefault();
            let form = document.forms.review;
            let review = {
                date: new Date().toLocaleString(),
                name: form.elements.name.value,
                place: form.elements.place.value,
                comment: form.elements.comment.value
              };
            console.log(myMap.balloon._balloon._data.properties);
            console.log(myMap.balloon);
            myMap.balloon.setData({
              properties: {
                name: addr,
                reviews: reviews.concat(review)
              }
            });
            let newPlacemark = new ymaps.Placemark(coords,
              {
                placemark: true,
                name: addr,
                reviews: review
              },
              {
                balloonLayout: View.BalloonLayout(),
                balloonContentLayout: View.BalloonContent()
              }
            );
            clusterer.add(newPlacemark);
          }
        });
      });

    });
  }


  document.getElementById('set-balloon-header').addEventListener('click', function () {
    clusterer.balloon.open();
  });

}).catch(function(e) {
    console.error(e);
});
