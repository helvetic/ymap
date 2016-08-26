webpackHotUpdate_name_(0,[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _promise = __webpack_require__(1);

	var _promise2 = _interopRequireDefault(_promise);

	var _Model = __webpack_require__(66);

	var _View = __webpack_require__(67);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	new _promise2.default(function (resolve) {
	  resolve(_Model.Model.ready([55.76, 37.64]));
	}).then(function (myMap) {

	  var clusterer = new ymaps.Clusterer({
	    clusterDisableClickZoom: true,
	    clusterOpenBalloonOnClick: true,
	    clusterBalloonPanelMaxMapArea: 0,
	    clusterBalloonContentLayoutWidth: 250,
	    clusterBalloonContentLayout: 'cluster#balloonCarousel',
	    clusterBalloonItemContentLayout: _View.View.itemContentLayout(),
	    clusterBalloonLeftColumnWidth: 120
	  });
	  myMap.geoObjects.add(clusterer);

	  myMap.events.add('click', function (e) {
	    var coords = e.get('coords');
	    openBaloon(coords);
	  });

	  myMap.geoObjects.events.add('click', function (e) {
	    var object = e.get('target');
	    if (object.properties.get('placemark')) {
	      var coords = object.geometry.getCoordinates();
	      e.preventDefault();
	      openBaloon(coords);
	    }
	  });

	  function openBaloon(coords) {
	    _Model.Model.getAddress(coords).then(function (addr) {
	      var reviews = getClosestReviews(coords);
	      myMap.balloon.open(coords, {
	        properties: {
	          name: addr,
	          reviews: reviews
	        }
	      }, {
	        layout: _View.View.BalloonLayout(),
	        contentLayout: _View.View.BalloonContent()
	      });
	    });
	  }

	  function getClosestReviews(coords) {
	    var zoom = Math.pow(myMap.getZoom(), 3);
	    return clusterer.getGeoObjects().filter(function (el) {
	      return el.geometry.getCoordinates() == coords;
	    }).map(function (el) {
	      return el.properties.get('reviews');
	    });
	  }

	  document.addEventListener('click', function (e) {
	    if (e.target.id == "add_review") {
	      (function () {
	        e.preventDefault();
	        var coords = myMap.balloon.getPosition();
	        var reviews = getClosestReviews(coords);
	        var form = document.forms.review;
	        var review = {
	          date: new Date().toLocaleString(),
	          name: form.elements.name.value,
	          place: form.elements.place.value,
	          comment: form.elements.comment.value
	        };
	        _Model.Model.getAddress(coords).then(function (addr) {
	          myMap.balloon.setData({
	            properties: {
	              name: addr,
	              reviews: reviews.concat(review)
	            }
	          });
	          var newPlacemark = new ymaps.Placemark(coords, {
	            placemark: true,
	            index: clusterer.getGeoObjects().length,
	            name: addr,
	            reviews: review
	          }, {
	            balloonLayout: _View.View.BalloonLayout(),
	            balloonContentLayout: _View.View.BalloonContent()
	          });
	          clusterer.add(newPlacemark);
	        });
	      })();
	    } else if (e.target.dataset.role == "show-object") {
	      e.preventDefault();
	      var index = e.target.dataset.index;
	      openBaloon(clusterer.getGeoObjects()[index].geometry.getCoordinates());
	    }
	  });

	  document.getElementById('set-balloon-header').addEventListener('click', function () {
	    clusterer.balloon.open();
	  });
	}).catch(function (e) {
	  console.error(e);
	});

/***/ }
])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMC44NDhhYmJlNmNlODQwNDljOTk0Ni5ob3QtdXBkYXRlLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vL3NyYy9hcHAuanM/YmQ5YyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge01vZGVsfSBmcm9tICcuL21vZHVsZXMvTW9kZWwnO1xyXG5pbXBvcnQge1ZpZXd9IGZyb20gJy4vbW9kdWxlcy9WaWV3JztcclxuXHJcblxyXG5uZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcclxuICByZXNvbHZlKE1vZGVsLnJlYWR5KFs1NS43NiwgMzcuNjRdKSk7XHJcblxyXG59KS50aGVuKChteU1hcCkgPT4ge1xyXG5cclxuICBsZXQgY2x1c3RlcmVyID0gbmV3IHltYXBzLkNsdXN0ZXJlcih7XHJcbiAgICBjbHVzdGVyRGlzYWJsZUNsaWNrWm9vbTogdHJ1ZSxcclxuICAgIGNsdXN0ZXJPcGVuQmFsbG9vbk9uQ2xpY2s6IHRydWUsXHJcbiAgICBjbHVzdGVyQmFsbG9vblBhbmVsTWF4TWFwQXJlYTogMCxcclxuICAgIGNsdXN0ZXJCYWxsb29uQ29udGVudExheW91dFdpZHRoOiAyNTAsXHJcbiAgICBjbHVzdGVyQmFsbG9vbkNvbnRlbnRMYXlvdXQ6ICdjbHVzdGVyI2JhbGxvb25DYXJvdXNlbCcsXHJcbiAgICBjbHVzdGVyQmFsbG9vbkl0ZW1Db250ZW50TGF5b3V0OiBWaWV3Lml0ZW1Db250ZW50TGF5b3V0KCksXHJcbiAgICBjbHVzdGVyQmFsbG9vbkxlZnRDb2x1bW5XaWR0aDogMTIwXHJcbiAgfSk7XHJcbiAgbXlNYXAuZ2VvT2JqZWN0cy5hZGQoY2x1c3RlcmVyKTtcclxuXHJcbiAgbXlNYXAuZXZlbnRzLmFkZCgnY2xpY2snLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgbGV0IGNvb3JkcyA9IGUuZ2V0KCdjb29yZHMnKTtcclxuICAgIG9wZW5CYWxvb24oY29vcmRzKTtcclxuICB9KTtcclxuXHJcbiAgbXlNYXAuZ2VvT2JqZWN0cy5ldmVudHMuYWRkKCdjbGljaycsIGUgPT4ge1xyXG4gICAgbGV0IG9iamVjdCA9IGUuZ2V0KCd0YXJnZXQnKTtcclxuICAgIGlmKG9iamVjdC5wcm9wZXJ0aWVzLmdldCgncGxhY2VtYXJrJykpe1xyXG4gICAgICBsZXQgY29vcmRzID0gb2JqZWN0Lmdlb21ldHJ5LmdldENvb3JkaW5hdGVzKCk7XHJcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgb3BlbkJhbG9vbihjb29yZHMpXHJcbiAgICB9XHJcbiAgfSk7XHJcblxyXG4gIGZ1bmN0aW9uIG9wZW5CYWxvb24oY29vcmRzKXtcclxuICAgIE1vZGVsLmdldEFkZHJlc3MoY29vcmRzKS50aGVuKGFkZHIgPT4ge1xyXG4gICAgICBsZXQgcmV2aWV3cyA9IGdldENsb3Nlc3RSZXZpZXdzKGNvb3Jkcyk7XHJcbiAgICAgIG15TWFwLmJhbGxvb24ub3Blbihjb29yZHMsXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgcHJvcGVydGllczoge1xyXG4gICAgICAgICAgICBuYW1lOiBhZGRyLFxyXG4gICAgICAgICAgICByZXZpZXdzOiByZXZpZXdzXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGxheW91dDogVmlldy5CYWxsb29uTGF5b3V0KCksXHJcbiAgICAgICAgICAgIGNvbnRlbnRMYXlvdXQ6IFZpZXcuQmFsbG9vbkNvbnRlbnQoKVxyXG4gICAgICAgIH1cclxuICAgICAgKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gZ2V0Q2xvc2VzdFJldmlld3MoY29vcmRzKXtcclxuICAgIGxldCB6b29tID0gTWF0aC5wb3cobXlNYXAuZ2V0Wm9vbSgpLDMpO1xyXG4gICAgcmV0dXJuIGNsdXN0ZXJlci5nZXRHZW9PYmplY3RzKClcclxuICAgICAgLmZpbHRlcihlbCA9PiB7XHJcbiAgICAgICAgcmV0dXJuIGVsLmdlb21ldHJ5LmdldENvb3JkaW5hdGVzKCkgPT0gY29vcmRzO1xyXG4gICAgICB9KVxyXG4gICAgICAubWFwKGVsID0+IHtcclxuICAgICAgICByZXR1cm4gZWwucHJvcGVydGllcy5nZXQoJ3Jldmlld3MnKTtcclxuICAgICAgfSk7XHJcbiAgfVxyXG5cclxuICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGUgPT4ge1xyXG4gICAgaWYoZS50YXJnZXQuaWQgPT0gXCJhZGRfcmV2aWV3XCIpe1xyXG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgIGxldCBjb29yZHMgPSBteU1hcC5iYWxsb29uLmdldFBvc2l0aW9uKCk7XHJcbiAgICAgIGxldCByZXZpZXdzID0gZ2V0Q2xvc2VzdFJldmlld3MoY29vcmRzKTtcclxuICAgICAgbGV0IGZvcm0gPSBkb2N1bWVudC5mb3Jtcy5yZXZpZXc7XHJcbiAgICAgIGxldCByZXZpZXcgPSB7XHJcbiAgICAgICAgICBkYXRlOiBuZXcgRGF0ZSgpLnRvTG9jYWxlU3RyaW5nKCksXHJcbiAgICAgICAgICBuYW1lOiBmb3JtLmVsZW1lbnRzLm5hbWUudmFsdWUsXHJcbiAgICAgICAgICBwbGFjZTogZm9ybS5lbGVtZW50cy5wbGFjZS52YWx1ZSxcclxuICAgICAgICAgIGNvbW1lbnQ6IGZvcm0uZWxlbWVudHMuY29tbWVudC52YWx1ZVxyXG4gICAgICAgIH07XHJcbiAgICAgIE1vZGVsLmdldEFkZHJlc3MoY29vcmRzKS50aGVuKGFkZHIgPT4ge1xyXG4gICAgICAgIG15TWFwLmJhbGxvb24uc2V0RGF0YSh7XHJcbiAgICAgICAgICBwcm9wZXJ0aWVzOiB7XHJcbiAgICAgICAgICAgIG5hbWU6IGFkZHIsXHJcbiAgICAgICAgICAgIHJldmlld3M6IHJldmlld3MuY29uY2F0KHJldmlldylcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICBsZXQgbmV3UGxhY2VtYXJrID0gbmV3IHltYXBzLlBsYWNlbWFyayhjb29yZHMsXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIHBsYWNlbWFyazogdHJ1ZSxcclxuICAgICAgICAgICAgaW5kZXg6IGNsdXN0ZXJlci5nZXRHZW9PYmplY3RzKCkubGVuZ3RoLFxyXG4gICAgICAgICAgICBuYW1lOiBhZGRyLFxyXG4gICAgICAgICAgICByZXZpZXdzOiByZXZpZXdcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIGJhbGxvb25MYXlvdXQ6IFZpZXcuQmFsbG9vbkxheW91dCgpLFxyXG4gICAgICAgICAgICBiYWxsb29uQ29udGVudExheW91dDogVmlldy5CYWxsb29uQ29udGVudCgpXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgKTtcclxuICAgICAgICBjbHVzdGVyZXIuYWRkKG5ld1BsYWNlbWFyayk7XG4gICAgICB9KTtcclxuICAgIH1lbHNlIGlmKGUudGFyZ2V0LmRhdGFzZXQucm9sZSA9PSBcInNob3ctb2JqZWN0XCIpe1xyXG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgIGxldCBpbmRleCA9IGUudGFyZ2V0LmRhdGFzZXQuaW5kZXg7XHJcbiAgICAgIG9wZW5CYWxvb24oY2x1c3RlcmVyLmdldEdlb09iamVjdHMoKVtpbmRleF0uZ2VvbWV0cnkuZ2V0Q29vcmRpbmF0ZXMoKSk7XHJcbiAgICB9XHJcbiAgfSk7XHJcblxyXG4gIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzZXQtYmFsbG9vbi1oZWFkZXInKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgIGNsdXN0ZXJlci5iYWxsb29uLm9wZW4oKTtcclxuICB9KTtcclxuXHJcbn0pLmNhdGNoKGZ1bmN0aW9uKGUpIHtcclxuICAgIGNvbnNvbGUuZXJyb3IoZSk7XHJcbn0pO1xyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBzcmMvYXBwLmpzXG4gKiovIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUFBO0FBQ0E7OztBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQVBBO0FBU0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUZBO0FBREE7QUFPQTtBQUNBO0FBRkE7QUFLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFKQTtBQU1BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQURBO0FBTUE7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUpBO0FBT0E7QUFDQTtBQUZBO0FBS0E7QUFDQTtBQS9CQTtBQWdDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7Ozs7Iiwic291cmNlUm9vdCI6IiJ9