export let View = {
  BalloonContent : function(data){
    return ymaps.templateLayoutFactory.createClass(
      `<h3 class="review-title">{{ properties.name }}</h3>
      <div class="reviews">{{ properties.reviews | default: 'Отзывов пока нет..' }}</div>

      <form class="review-form">
        <div class="review-form-title">Ваш отзыв</div>
        <input type="text" placeholder="Ваше имя" class="review-form-name">
        <input type="text" placeholder="Укажите место" class="review-form-place">
        <textarea placeholder="Поделитесь впечатлениями" class="review-form-comment"></textarea>
        <button data-role="add" id="add_review" class="review-form-add-btn">Добавить</button>
      </form>
      `
    );
  },
  BalloonLayout : function(data){
    return ymaps.templateLayoutFactory.createClass(
      `
      <div class="popup">
        <button class="popup-close close">&times;</button>
        <div class="popup-content">
          $[[options.contentLayout observeSize minWidth=235 maxWidth=235 maxHeight=350]]
        </div>
      </div>
      `,
      {
        build: function () {
          this.constructor.superclass.build.call(this);
          this._$element= document.querySelector('.popup').parentElement;
          this._$element.querySelector('.close')
              .addEventListener('click', e => this.onCloseClick(e));
        },
        onCloseClick: function (e) {
          e.preventDefault();
          this.events.fire('userclose');
        }
      }

    );

  }
};
