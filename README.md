# fluxstore
Store class for facebook flux, generates event methods automatically, more simple dispatch listener

Generates for you these methods:

    addYourEventListener, removeYourEventListener, emitYourEvent

With this module you can write store this way::

```javascript
var AppDispatcher = require('../dispatcher/app_dispatcher');
var SampleConstants = require('../constants/sample_constants');
var assign = require('object-assign');
const FluxStore = require('fluxstore')

class SampleStore extends FluxStore {
  getEvents() {
    return ['create', 'createError', 'change', 'remove', 'archive', 'changePath', 'mobileUpdate',
            'mobileUpdateError', 'addTag'];
  }
  getAll() {
    // ...
  }

  setOrdering({ordering}) {
    // ...
  }
  updatePath({link, path}) {
    // ...
  }

  archive({link}) {
    // ...
  }
  tagFilter(tag) {
    // ...
  }
  destroy(link) {
    // ...
  }

  connections(connect) {
    connect(SampleConstants.SAMPLE_CREATE, (action) => {
      create(action.data);
      this.emitChange();
      this.emitCreate();
    });
    connect(SampleConstants.SAMPLE_CREATE_ERROR, this.emitCreateError);
    connect(SampleConstants.SAMPLE_DESTROY, this.destroy);
    connect(SampleConstants.SAMPLE_ARCHIVE, this.archive);
    connect(SampleConstants.SAMPLE_UPDATE_PATH, this.updatePath);
    connect(SampleConstants.SAMPLE_SET_ORDERING, this.setOrdering);
    connect(SampleConstants.SAMPLE_ADD_TAG, ({link, tag}) => {
      addTag(link.id, tag);
      this.emitChange();
      this.emitAddTag();
    });
    connect(SampleConstants.SAMPLE_TAG_FILTER, this.tagFilter);
    connect(SampleConstants.MOBILE_UPDATE_SUCCESS, (action) => {
      update(action.data, action.data);
      this.emitMobileUpdate();
    })
  }

};

let store = new SampleStore(AppDispatcher);

module.exports = store;
```
