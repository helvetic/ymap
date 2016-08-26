export let Model = {
  ready(center){
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


  getAddress(coords) {
    return ymaps.geocode(coords).then(function (res) {
      let firstGeoObject = res.geoObjects.get(0);
      return firstGeoObject.properties.get('name');
    });
  },

}
