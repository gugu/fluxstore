var EventEmitter = require('events').EventEmitter;

var capitalize = function(str) {
  return str.slice(0, 1).toUpperCase() + str.slice(1);
}
class Store extends EventEmitter {
  constructor(dispatcher) {
    super();
    var events = this.getEvents();
    events.forEach((ev) => {
      this['add' + capitalize(ev) + 'Listener'] = function(cb) {
        this.on(ev, cb);
      }
      this['remove' + capitalize(ev) + 'Listener'] = function(cb) {
        this.on(ev, cb);
      }
      this['emit' + capitalize(ev)] = function (arg) {
        this.emit(ev, arg);
      }
    })

    this._connections = new Map();

    this.connections( (event, cb) => {
      this._connections.set(event, cb);
    })

    dispatcher.register((action) => {
      let connection = this._connections.get(action.actionType);
      if (connection) {
        if (Array.isArray(connection)) {
          connection.forEach((conn) => {
            conn.bind(this)(action);
          })
        } else {
          connection.bind(this)(action);
        }
      }
    })
  }
};

module.exports = Store;
