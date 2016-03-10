# fluxstore
Store class for facebook flux, generates event methods automatically, more simple dispatch listener

Generates for you these methods:

    addYourEventListener, removeYourEventListener, emitYourEvent

With this module you can write store this way::

```javascript
const AppDispatcher = require('../dispatcher/app_dispatcher');
const SampleConstants = require('../constants/sample_constants');
const FluxStore = require('fluxstore')

class SampleStore extends FluxStore {
  getEvents() {
    return ['create', 'createError', 'addTag'];
  }
  create(data) {
    // ...
  }

  addTag(linkId, tag) {
    // ...
  }



  getAll() {
    // ...
  }

  destroy(link) {
    // ...
  }

  connections(connect) {
    connect(SampleConstants.SAMPLE_CREATE, (action) => {
      this.create(action.data);
      this.emitChange();
      this.emitCreate();
    });
    connect(SampleConstants.SAMPLE_CREATE_ERROR, this.emitCreateError);
    connect(SampleConstants.SAMPLE_DESTROY, this.destroy);
    connect(SampleConstants.SAMPLE_ADD_TAG, ({link, tag}) => {
      this.addTag(link.id, tag);
      this.emitChange();
      this.emitAddTag();
    });
  }

};

let store = new SampleStore(AppDispatcher);

module.exports = store;
```

and in your component:

```javascript

var SampleComponent = React.createClass({
  /// ...
  componentDidMount: function() {
    SampleStore.addChangePathListener(this._onChangePath);
    SampleStore.addAddTagListener(this._onAddTag);
    SampleStore.addMobileUpdateListener(this._onMobileUpdate);
  },
  componentWillUnmount: function() {
    SampleStore.removeChangePathListener(this._onChangePath);
    SampleStore.removeAddTagListener(this._onAddTag);
    SampleStore.removeMobileUpdateListener(this._onMobileUpdate);
  },
  /// ...
})

```
