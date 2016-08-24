var friends =
webpackJsonp_name_([9],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _friendsFilter = __webpack_require__(130);

	var _friendsFilter2 = _interopRequireDefault(_friendsFilter);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var friends = new _friendsFilter2.default();
	console.log(friends);

/***/ },

/***/ 130:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _stringify = __webpack_require__(104);

	var _stringify2 = _interopRequireDefault(_stringify);

	var _promise = __webpack_require__(86);

	var _promise2 = _interopRequireDefault(_promise);

	var _classCallCheck2 = __webpack_require__(6);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(7);

	var _createClass3 = _interopRequireDefault(_createClass2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var VKFriends = function () {
	  function VKFriends() {
	    var _this = this;

	    (0, _classCallCheck3.default)(this, VKFriends);

	    new _promise2.default(function (resolve, reject) {
	      VK.init({ apiId: 5575450 });
	      VK.Auth.login(function (response) {
	        if (response.session) {
	          resolve(response);
	        } else {
	          reject('Не удалось авторизоваться');
	        }
	      }, 2);
	    }).then(function (responseObj) {
	      console.log('Статус', responseObj);
	      return new _promise2.default(function (resolve) {
	        VK.api('friends.get', {
	          fields: 'bdate, city, country, photo_100'
	        }, function (response) {
	          resolve(response);
	        });
	      });
	    }).then(function (friendsList) {
	      _this.response = friendsList.response;
	      _this.inList = JSON.parse(localStorage.getItem('inList')) || [];
	      _this.outList = JSON.parse(localStorage.getItem('outList')) || _this.response;

	      _this.displayList(vk_friends, friends_template, _this.outList);
	      _this.displayList(vk_friends_list, friends_template, _this.inList);

	      _this.drag = null;

	      filter_lists.addEventListener('dragstart', function (e) {
	        return _this.handleDragStart(e);
	      });
	      filter_lists.addEventListener('dragover', function (e) {
	        return _this.handleDragOver(e);
	      });
	      filter_lists.addEventListener('drop', function (e) {
	        return _this.handleDrop(e);
	      });

	      filter_lists.addEventListener('click', function (e) {
	        return _this.moveFromList(e);
	      });

	      document.querySelectorAll('.filter-input').forEach(function (el) {
	        el.addEventListener('keyup', function (e) {
	          return _this.filterList(e);
	        });
	      });

	      save_list.addEventListener('click', function (e) {
	        return _this.saveList(e);
	      });
	    });
	  }

	  (0, _createClass3.default)(VKFriends, [{
	    key: 'displayList',
	    value: function displayList(container, template) {
	      var list = arguments.length <= 2 || arguments[2] === undefined ? this : arguments[2];

	      var source = template.innerHTML;
	      var compileTemplate = Handlebars.compile(source);
	      container.innerHTML = compileTemplate(list);
	    }

	    // events

	  }, {
	    key: 'filterList',
	    value: function filterList(e) {
	      var list = e.target.parentNode.parentNode.querySelector('.col-main');
	      var value = e.target.value;
	      list.querySelectorAll('.friend').forEach(function (item) {
	        var fullname = item.querySelector('.fullname').textContent;
	        if (!fullname.toLowerCase().includes(value.toLowerCase())) {
	          item.classList.add('hidden');
	        } else if (item.classList.contains('hidden')) {
	          item.classList.remove('hidden');
	        }
	      });
	    }
	  }, {
	    key: 'handleDragStart',
	    value: function handleDragStart(e) {
	      this.drag = e.target.closest('.friend');
	      this.drag.classList.add('moving');
	      e.dataTransfer.effectAllowed = 'move';
	      e.dataTransfer.setData('text/html', this.drag);
	      return true;
	    }
	  }, {
	    key: 'handleDragOver',
	    value: function handleDragOver(e) {
	      e.preventDefault();
	      if (!e.target.classList.contains('neighbor')) {
	        if (e.target.parentNode.querySelector('.neighbor')) {
	          e.currentTarget.querySelectorAll('.neighbor').forEach(function (el) {
	            el.classList.remove('neighbor');
	          });
	        }
	        e.target.classList.add('neighbor');
	      }
	    }
	  }, {
	    key: 'handleDrop',
	    value: function handleDrop(e) {
	      var neighbor = e.target.closest('.friend');
	      var container = e.target.closest('.col-main');

	      this.updateLists(this.drag.parentNode.dataset.role, this.drag.dataset.uid);
	      if (neighbor) {
	        container.insertBefore(this.drag, neighbor);
	        neighbor.classList.remove('neighbor');
	      } else {
	        container.appendChild(this.drag);
	      }
	      this.drag.classList.remove('moving');
	    }
	  }, {
	    key: 'moveFromList',
	    value: function moveFromList(e, target) {
	      if (e.target.dataset.action == 'move') {
	        var container = e.target.closest('.col-main');
	        var neighbor = container.parentNode.nextElementSibling || container.parentNode.previousElementSibling;
	        var neighborContainer = neighbor.querySelector('.col-main');
	        var item = e.target.parentNode;
	        var uid = item.dataset.uid;
	        var role = container.dataset.role;

	        if (this.updateLists(role, uid)) neighborContainer.appendChild(item);
	      }
	    }
	  }, {
	    key: 'updateLists',
	    value: function updateLists(role, uid) {
	      console.log(role, uid);
	      if (role == 'add') {
	        var friendIn = this.response.find(function (el) {
	          return el.uid == uid;
	        });
	        var friendOut = this.outList.findIndex(function (el) {
	          return el.uid == uid;
	        });
	        this.inList.push(friendIn);
	        this.outList.splice(friendOut, 1);
	        return true;
	      }

	      if (role == 'remove') {
	        var _friendIn = this.inList.findIndex(function (el) {
	          return el.uid == uid;
	        });
	        var _friendOut = this.response.find(function (el) {
	          return el.uid == uid;
	        });
	        this.outList.push(_friendOut);
	        this.inList.splice(_friendIn, 1);
	        return true;
	      }
	    }
	  }, {
	    key: 'saveList',
	    value: function saveList(e) {
	      localStorage.setItem('inList', (0, _stringify2.default)(this.inList));
	      localStorage.setItem('outList', (0, _stringify2.default)(this.outList));
	    }
	  }]);
	  return VKFriends;
	}();

		exports.default = VKFriends;

/***/ }

});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJpZW5kcy5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy9zcmMvZnJpZW5kcy5qcyIsIndlYnBhY2s6Ly8vc3JjL21vZHVsZXMvZnJpZW5kc0ZpbHRlci5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgVktGcmllbmRzIGZyb20gJy4vbW9kdWxlcy9mcmllbmRzRmlsdGVyJztcclxuXHJcbmxldCBmcmllbmRzID0gbmV3IFZLRnJpZW5kcygpO1xyXG5jb25zb2xlLmxvZyhmcmllbmRzKTtcclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogc3JjL2ZyaWVuZHMuanNcbiAqKi8iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBWS0ZyaWVuZHN7XHJcbiAgY29uc3RydWN0b3IoKXtcclxuICAgIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgVksuaW5pdCh7YXBpSWQ6IDU1NzU0NTB9KTtcclxuICAgICAgVksuQXV0aC5sb2dpbihmdW5jdGlvbihyZXNwb25zZSkge1xyXG4gICAgICAgICBpZiAocmVzcG9uc2Uuc2Vzc2lvbikge1xyXG4gICAgICAgICAgIHJlc29sdmUocmVzcG9uc2UpO1xyXG4gICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgIHJlamVjdCgn0J3QtSDRg9C00LDQu9C+0YHRjCDQsNCy0YLQvtGA0LjQt9C+0LLQsNGC0YzRgdGPJyk7XHJcbiAgICAgICAgIH1cclxuICAgICAgIH0sIDIpO1xyXG5cclxuXHJcbiAgICB9KS50aGVuKHJlc3BvbnNlT2JqID0+IHtcclxuICAgICAgY29uc29sZS5sb2coJ9Ch0YLQsNGC0YPRgScscmVzcG9uc2VPYmopO1xyXG4gICAgICByZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XHJcbiAgICAgICAgVksuYXBpKCdmcmllbmRzLmdldCcsXHJcbiAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgZmllbGRzOiAnYmRhdGUsIGNpdHksIGNvdW50cnksIHBob3RvXzEwMCdcclxuICAgICAgICAgICB9LFxyXG4gICAgICAgICAgIHJlc3BvbnNlID0+IHtcclxuICAgICAgICAgICAgIHJlc29sdmUocmVzcG9uc2UpO1xyXG4gICAgICAgICAgIH1cclxuICAgICAgICApO1xyXG4gICAgICB9KVxyXG5cclxuXHJcbiAgICB9KS50aGVuKGZyaWVuZHNMaXN0ID0+IHtcclxuICAgICAgdGhpcy5yZXNwb25zZSA9IGZyaWVuZHNMaXN0LnJlc3BvbnNlO1xyXG4gICAgICB0aGlzLmluTGlzdCA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2luTGlzdCcpKSB8fCBbXTtcclxuICAgICAgdGhpcy5vdXRMaXN0ID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnb3V0TGlzdCcpKSB8fCB0aGlzLnJlc3BvbnNlO1xyXG5cclxuICAgICAgdGhpcy5kaXNwbGF5TGlzdCh2a19mcmllbmRzLCBmcmllbmRzX3RlbXBsYXRlLCB0aGlzLm91dExpc3QpO1xyXG4gICAgICB0aGlzLmRpc3BsYXlMaXN0KHZrX2ZyaWVuZHNfbGlzdCwgZnJpZW5kc190ZW1wbGF0ZSwgdGhpcy5pbkxpc3QpO1xyXG5cclxuICAgICAgdGhpcy5kcmFnID0gbnVsbDtcclxuXHJcbiAgICAgIGZpbHRlcl9saXN0cy5hZGRFdmVudExpc3RlbmVyKCdkcmFnc3RhcnQnLCBlID0+IHRoaXMuaGFuZGxlRHJhZ1N0YXJ0KGUpKTtcclxuICAgICAgZmlsdGVyX2xpc3RzLmFkZEV2ZW50TGlzdGVuZXIoJ2RyYWdvdmVyJywgZSA9PiB0aGlzLmhhbmRsZURyYWdPdmVyKGUpKTtcclxuICAgICAgZmlsdGVyX2xpc3RzLmFkZEV2ZW50TGlzdGVuZXIoJ2Ryb3AnLCBlID0+IHRoaXMuaGFuZGxlRHJvcChlKSk7XHJcblxyXG4gICAgICBmaWx0ZXJfbGlzdHMuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBlID0+IHRoaXMubW92ZUZyb21MaXN0KGUpKTtcclxuXHJcbiAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5maWx0ZXItaW5wdXQnKS5mb3JFYWNoKGVsID0+IHtcclxuICAgICAgICBlbC5hZGRFdmVudExpc3RlbmVyKCdrZXl1cCcsIGUgPT4gdGhpcy5maWx0ZXJMaXN0KGUpKTtcclxuICAgICAgfSk7XHJcblxyXG4gICAgICBzYXZlX2xpc3QuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAgZSA9PiB0aGlzLnNhdmVMaXN0KGUpKTtcclxuICAgIH0pO1xyXG5cclxuICB9XHJcblxyXG5cclxuXHJcbiAgZGlzcGxheUxpc3QoY29udGFpbmVyLHRlbXBsYXRlLGxpc3QgPSB0aGlzKXtcclxuICAgIGxldCBzb3VyY2UgPSB0ZW1wbGF0ZS5pbm5lckhUTUw7XHJcbiAgICBsZXQgY29tcGlsZVRlbXBsYXRlID0gSGFuZGxlYmFycy5jb21waWxlKHNvdXJjZSk7XHJcbiAgICBjb250YWluZXIuaW5uZXJIVE1MID0gY29tcGlsZVRlbXBsYXRlKGxpc3QpO1xyXG4gIH1cclxuXHJcbiAgLy8gZXZlbnRzXHJcbiAgZmlsdGVyTGlzdChlKXtcclxuICAgIGxldCBsaXN0ID0gZS50YXJnZXQucGFyZW50Tm9kZS5wYXJlbnROb2RlLnF1ZXJ5U2VsZWN0b3IoJy5jb2wtbWFpbicpO1xyXG4gICAgbGV0IHZhbHVlID0gZS50YXJnZXQudmFsdWU7XHJcbiAgICBsaXN0LnF1ZXJ5U2VsZWN0b3JBbGwoJy5mcmllbmQnKS5mb3JFYWNoKGl0ZW0gPT4ge1xyXG4gICAgICBsZXQgZnVsbG5hbWUgPSBpdGVtLnF1ZXJ5U2VsZWN0b3IoJy5mdWxsbmFtZScpLnRleHRDb250ZW50O1xyXG4gICAgICBpZighZnVsbG5hbWUudG9Mb3dlckNhc2UoKS5pbmNsdWRlcyh2YWx1ZS50b0xvd2VyQ2FzZSgpKSl7XHJcbiAgICAgICAgaXRlbS5jbGFzc0xpc3QuYWRkKCdoaWRkZW4nKTtcclxuICAgICAgfWVsc2UgaWYoaXRlbS5jbGFzc0xpc3QuY29udGFpbnMoJ2hpZGRlbicpKXtcclxuICAgICAgICBpdGVtLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGRlbicpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcbiAgaGFuZGxlRHJhZ1N0YXJ0KGUpe1xyXG4gICAgdGhpcy5kcmFnID0gZS50YXJnZXQuY2xvc2VzdCgnLmZyaWVuZCcpO1xyXG4gICAgdGhpcy5kcmFnLmNsYXNzTGlzdC5hZGQoJ21vdmluZycpO1xyXG4gICAgZS5kYXRhVHJhbnNmZXIuZWZmZWN0QWxsb3dlZCA9ICdtb3ZlJztcclxuICAgIGUuZGF0YVRyYW5zZmVyLnNldERhdGEoJ3RleHQvaHRtbCcsIHRoaXMuZHJhZyk7XHJcbiAgICByZXR1cm4gdHJ1ZTtcclxuICB9XHJcbiAgaGFuZGxlRHJhZ092ZXIoZSkge1xyXG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgaWYoIWUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnbmVpZ2hib3InKSl7XHJcbiAgICAgIGlmKGUudGFyZ2V0LnBhcmVudE5vZGUucXVlcnlTZWxlY3RvcignLm5laWdoYm9yJykpe1xyXG4gICAgICAgIGUuY3VycmVudFRhcmdldC5xdWVyeVNlbGVjdG9yQWxsKCcubmVpZ2hib3InKS5mb3JFYWNoKGVsID0+IHtcclxuICAgICAgICAgIGVsLmNsYXNzTGlzdC5yZW1vdmUoJ25laWdoYm9yJyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgICAgZS50YXJnZXQuY2xhc3NMaXN0LmFkZCgnbmVpZ2hib3InKTtcclxuICAgIH1cclxuICB9XHJcbiAgaGFuZGxlRHJvcChlKXtcclxuICAgIGxldCBuZWlnaGJvciA9IGUudGFyZ2V0LmNsb3Nlc3QoJy5mcmllbmQnKTtcclxuICAgIGxldCBjb250YWluZXIgPSBlLnRhcmdldC5jbG9zZXN0KCcuY29sLW1haW4nKTtcclxuXHJcbiAgICB0aGlzLnVwZGF0ZUxpc3RzKHRoaXMuZHJhZy5wYXJlbnROb2RlLmRhdGFzZXQucm9sZSwgdGhpcy5kcmFnLmRhdGFzZXQudWlkKTtcclxuICAgIGlmKG5laWdoYm9yKXtcclxuICAgICAgY29udGFpbmVyLmluc2VydEJlZm9yZSh0aGlzLmRyYWcsIG5laWdoYm9yKTtcclxuICAgICAgbmVpZ2hib3IuY2xhc3NMaXN0LnJlbW92ZSgnbmVpZ2hib3InKTtcclxuICAgIH1lbHNle1xyXG4gICAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQodGhpcy5kcmFnKTtcclxuICAgIH1cclxuICAgIHRoaXMuZHJhZy5jbGFzc0xpc3QucmVtb3ZlKCdtb3ZpbmcnKTtcclxuICB9XHJcblxyXG4gIG1vdmVGcm9tTGlzdChlLCB0YXJnZXQpe1xyXG4gICAgaWYoIGUudGFyZ2V0LmRhdGFzZXQuYWN0aW9uID09ICdtb3ZlJyApe1xyXG4gICAgICBsZXQgY29udGFpbmVyID0gZS50YXJnZXQuY2xvc2VzdCgnLmNvbC1tYWluJyk7XHJcbiAgICAgIGxldCBuZWlnaGJvciA9IGNvbnRhaW5lci5wYXJlbnROb2RlLm5leHRFbGVtZW50U2libGluZyB8fFxyXG4gICAgICAgICAgICAgICAgICAgICBjb250YWluZXIucGFyZW50Tm9kZS5wcmV2aW91c0VsZW1lbnRTaWJsaW5nO1xyXG4gICAgICBsZXQgbmVpZ2hib3JDb250YWluZXIgPSBuZWlnaGJvci5xdWVyeVNlbGVjdG9yKCcuY29sLW1haW4nKTtcclxuICAgICAgbGV0IGl0ZW0gPSBlLnRhcmdldC5wYXJlbnROb2RlO1xyXG4gICAgICBsZXQgdWlkID0gaXRlbS5kYXRhc2V0LnVpZDtcclxuICAgICAgbGV0IHJvbGUgPSBjb250YWluZXIuZGF0YXNldC5yb2xlO1xyXG5cclxuICAgICAgaWYgKHRoaXMudXBkYXRlTGlzdHMocm9sZSwgdWlkKSkgbmVpZ2hib3JDb250YWluZXIuYXBwZW5kQ2hpbGQoaXRlbSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICB1cGRhdGVMaXN0cyhyb2xlLCB1aWQpe1xyXG4gICAgY29uc29sZS5sb2cocm9sZSwgdWlkKTtcclxuICAgIGlmKCByb2xlID09ICdhZGQnKXtcclxuICAgICAgbGV0IGZyaWVuZEluID0gdGhpcy5yZXNwb25zZS5maW5kKGVsID0+IGVsLnVpZCA9PSB1aWQpO1xyXG4gICAgICBsZXQgZnJpZW5kT3V0ID0gdGhpcy5vdXRMaXN0LmZpbmRJbmRleChlbCA9PiBlbC51aWQgPT0gdWlkKTtcclxuICAgICAgdGhpcy5pbkxpc3QucHVzaChmcmllbmRJbik7XHJcbiAgICAgIHRoaXMub3V0TGlzdC5zcGxpY2UoZnJpZW5kT3V0LCAxKTtcclxuICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgaWYoIHJvbGUgPT0gJ3JlbW92ZScgKXtcclxuICAgICAgbGV0IGZyaWVuZEluID0gdGhpcy5pbkxpc3QuZmluZEluZGV4KGVsID0+IGVsLnVpZCA9PSB1aWQpO1xyXG4gICAgICBsZXQgZnJpZW5kT3V0ID0gdGhpcy5yZXNwb25zZS5maW5kKGVsID0+IGVsLnVpZCA9PSB1aWQpO1xyXG4gICAgICB0aGlzLm91dExpc3QucHVzaChmcmllbmRPdXQpO1xyXG4gICAgICB0aGlzLmluTGlzdC5zcGxpY2UoZnJpZW5kSW4sIDEpO1xyXG4gICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHNhdmVMaXN0KGUpe1xyXG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2luTGlzdCcsIEpTT04uc3RyaW5naWZ5KHRoaXMuaW5MaXN0KSk7XHJcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnb3V0TGlzdCcsIEpTT04uc3RyaW5naWZ5KHRoaXMub3V0TGlzdCkpO1xyXG4gIH1cclxufVxyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBzcmMvbW9kdWxlcy9mcmllbmRzRmlsdGVyLmpzXG4gKiovIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBO0FBQ0E7Ozs7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDRkE7QUFDQTtBQUFBO0FBQ0E7QUFEQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQURBO0FBSUE7QUFDQTtBQUVBO0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFFQTtBQUNBOzs7QUFHQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7Ozs7O0FBN0lBOzs7OyIsInNvdXJjZVJvb3QiOiIifQ==