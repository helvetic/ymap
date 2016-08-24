export let Model = {
  ready: function(center){
    return new Promise(resolve => {
      ymaps.ready(function () {
        var myMap = new ymaps.Map("ya_map", {
            center: center,
            zoom: 10,
            controls: ["zoomControl", "fullscreenControl"]
        });
        resolve(myMap);
      });
    });
  },

  createPlacemark: function(coords,BalloonLayout,BalloonContent) {
    return new ymaps.Placemark(coords,{},
      {
        balloonLayout: BalloonLayout,
        balloonContentLayout: BalloonContent
      }
    );
  },

  getAddress(myPlacemark,coords) {
      myPlacemark.properties.set('iconCaption', 'поиск...');
      ymaps.geocode(coords).then(function (res) {
          var firstGeoObject = res.geoObjects.get(0);
          console.log('firstGeoObject',firstGeoObject.properties);
          myPlacemark.properties
              .set({
                  name: firstGeoObject.properties.get('name'),
                  description: firstGeoObject.properties.get('text')
              });
      });
  },

  addPlacemark: function(coords){
    return new Promise(resolve => {
      // let placemark = new ymaps.Placemark(coords,
      //   {
      //     balloonContentHeader: 'Однажды',
      //     balloonContentBody: 'В студёную зимнюю пору',
      //     balloonContentFooter: 'Мы пошли в гору',
      //     hintContent: 'Зимние происшествия'
      //   },
      //   {balloonContentLayout: MyBalloonContentLayoutClass}
      // });
      resolve(placemark);
    });
  }

}
