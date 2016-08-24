// Создадим и добавим на карту поведение, при котором
// при щелчке на карте происходит ее центрирование по месту клика.
// Для этого создадим класс Behavior и определим его свойства и методы
export default class Behavior {
  constructor(ymaps){
    // Определим свойства класса
    console.log(this);
    this.options = new ymaps.option.Manager(); // Менеджер опций
    this.events = new ymaps.event.Manager(); // Менеджер событий
  }

  // Когда поведение будет включено, добавится событие щелчка на карту
  enable() {
      /* this._parent - родителем для поведения является менеджер поведений;
         this._parent.getMap() - получаем ссылку на карту;
         this._parent.getMap().events.add - добавляем слушатель события на карту. */
      this._parent.getMap().events.add('click', this._onClick, this);
  }

  disable() {
      this._parent.getMap().events.remove('click', this._onClick, this);
  }

  // Устанавливает родителя для исходного поведения
  setParent(parent){
    this._parent = parent;
  }

  // Получает родителя
  getParent(){
    return this._parent;
  }

  // При щелчке на карте происходит ее центрирование по месту клика
  _onClick(e){
      var coords = e.get('coords');
      //this._parent.getMap().setCenter(coords);
      console.log('click',coords);
      // myMap.balloon.open(coords,
      //     {
      //         contentHeader: 'Однажды',
      //         contentBody: 'В студёную зимнюю пору' +
      //         ' <span style="color:red; font-weight:bold">Я</span>' +
      //         ' из лесу <b>вышел</b>',
      //     }
      // );
      var myPlacemark = new ymaps.Placemark(
          coords,
          {},
          {balloonContentLayout: layout}
      );
      //myMap.geoObjects.add(myPlacemark);
  }
};
