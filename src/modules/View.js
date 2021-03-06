import {Model} from './Model';

export let View = {
  BalloonContent (data){
    return ymaps.templateLayoutFactory.createClass(
      `<h3 class="review-title">{{ properties.name }}</h3>
      <div class="reviews">
        {% if properties.reviews %}
          {% for review in properties.reviews %}
          <div class="reviews-item">
            <div class="reviews-item-top">
              <span class="reviews-item-date">{{review.date}}</span>
              <span class="reviews-item-name">{{review.name}}</span>
              <span class="reviews-item-place">{{review.place}}</span>
            </div>
            <div class="reviews-item-comment">{{review.comment}}</div>
          </div>
          {% endfor %}
        {% else %}
          <div class="reviews-empty">Отзывов пока нет..</div>
        {% endif %}
      </div>
      <form class="review-form" name="review">
        <div class="review-form-title">Ваш отзыв</div>
        <input type="text" placeholder="Ваше имя" class="review-form-name" name="name">
        <input type="text" placeholder="Укажите место" class="review-form-place" name="place">
        <textarea placeholder="Поделитесь впечатлениями" class="review-form-comment" name="comment"></textarea>
        <button data-role="add" id="add_review" class="review-form-add-btn">Добавить</button>
      </form>
      `
    );
  },
  BalloonLayout (){
    return ymaps.templateLayoutFactory.createClass(
      `
      <div class="popup">
        <button class="popup-close close">&times;</button>
        <div class="popup-content">
          $[[options.contentLayout observeSize minWidth=300 maxWidth=300 maxHeight=450]]
        </div>
      </div>
      `,
      {
        build() {
          this.constructor.superclass.build.call(this);
          this._$element= document.querySelector('.popup').parentElement;
          this._$element.querySelector('.close')
              .addEventListener('click', e => this.onCloseClick(e));
        },
        onCloseClick(e) {
          e.preventDefault();
          this.events.fire('userclose');
        }
      }

    );

  },
  itemContentLayout : function(){
    return ymaps.templateLayoutFactory.createClass(
      `<div class="carousel-item">
        <h3 class="carousel-header">{{properties.reviews.place}}</h3>
        <div class="reviews">
          <div class="reviews-item">
            <div class="reviews-item-top">
              <a href="#" class="show-placemark" data-index="{{ properties.index }}" data-role="show-object">{{ properties.name }}</a>
            </div>
            <div class="reviews-item-comment">{{properties.reviews.comment}}</div>
            <div class="reviews-item-date carousel-date">{{properties.reviews.date}}</div>
          </div>
        </div>
      </div>`
    );
  }

};
