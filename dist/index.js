'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var EventEmitter = require('events').EventEmitter;

var capitalize = function capitalize(str) {
  return str.slice(0, 1).toUpperCase() + str.slice(1);
};

var Store = function (_EventEmitter) {
  _inherits(Store, _EventEmitter);

  function Store(dispatcher) {
    _classCallCheck(this, Store);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Store).call(this));

    var events = _this.getEvents();
    events.forEach(function (ev) {
      _this['add' + capitalize(ev) + 'Listener'] = function (cb) {
        this.on(ev, cb);
      };
      _this['remove' + capitalize(ev) + 'Listener'] = function (cb) {
        this.removeListener(ev, cb);
      };
      _this['emit' + capitalize(ev)] = function (arg) {
        this.emit(ev, arg);
      };
    });

    _this._connections = new Map();

    _this.connections(function (event, cb) {
      _this._connections.set(event, cb);
    });

    dispatcher.register(function (action) {
      var connection = _this._connections.get(action.actionType);
      if (connection) {
        if (Array.isArray(connection)) {
          connection.forEach(function (conn) {
            conn.bind(_this)(action);
          });
        } else {
          connection.bind(_this)(action);
        }
      }
    });
    return _this;
  }

  _createClass(Store, [{
    key: 'connectComponent',
    value: function connectComponent() {}
  }]);

  return Store;
}(EventEmitter);

;

module.exports = Store;