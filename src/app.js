import {Model} from './modules/Model';
import {View} from './modules/View';


new Promise(resolve => {
  resolve(Model.ready([55.76, 37.64]));

}).then((myMap) => {

  let clusterer = new ymaps.Clusterer({
    clusterDisableClickZoom: true,
    clusterOpenBalloonOnClick: true,
    clusterBalloonPanelMaxMapArea: 0,
    clusterBalloonContentLayoutWidth: 250,
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
      let coords = object.geometry.getCoordinates();
      e.preventDefault();
      openBaloon(coords)
    }
  });

  function openBaloon(coords){
    Model.getAddress(coords).then(addr => {
      let reviews = getClosestReviews(coords);
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
      );
    });
  }

  function getClosestReviews(coords){
    let zoom = Math.pow(myMap.getZoom(),3);
    return clusterer.getGeoObjects()
      .filter(el => {
        return el.geometry.getCoordinates() == coords;
      })
      .map(el => {
        return el.properties.get('reviews');
      });
  }

  document.addEventListener('click', e => {
    if(e.target.id == "add_review"){
      e.preventDefault();
      let coords = myMap.balloon.getPosition();
      let reviews = getClosestReviews(coords);
      let form = document.forms.review;
      let review = {
          date: new Date().toLocaleString(),
          name: form.elements.name.value,
          place: form.elements.place.value,
          comment: form.elements.comment.value
        };
      Model.getAddress(coords).then(addr => {
        myMap.balloon.setData({
          properties: {
            name: addr,
            reviews: reviews.concat(review)
          }
        });
        let newPlacemark = new ymaps.Placemark(coords,
          {
            placemark: true,
            index: clusterer.getGeoObjects().length,
            name: addr,
            reviews: review
          },
          {
            balloonLayout: View.BalloonLayout(),
            balloonContentLayout: View.BalloonContent()
          }
        );
        console.log(clusterer.getGeoObjects());
        console.log('newPlacemark',newPlacemark.properties.get('reviews'));
        clusterer.add(newPlacemark);
      });
    }else if(e.target.dataset.role == "show-object"){
      e.preventDefault();
      let index = e.target.dataset.index;
      openBaloon(clusterer.getGeoObjects()[index].geometry.getCoordinates());
    }
  });

  document.getElementById('set-balloon-header').addEventListener('click', function () {
    clusterer.balloon.open();
  });

}).catch(function(e) {
    console.error(e);
});
