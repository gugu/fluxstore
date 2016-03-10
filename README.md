# fluxstore
Store class for facebook flux, generates event methods automatically, more simple dispatch listener

Generates for you these methods:

addYourEventListener, removeYourEventListener, emitYourEvent

With this module you can write store this way::

    var AppDispatcher = require('../dispatcher/app_dispatcher');
    var SampleConstants = require('../constants/link_constants');
    var assign = require('object-assign');
    const FluxStore = require('../lib/fluxstore/store')

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
        connect(SampleConstants.LINK_CREATE, (action) => {
          create(action.data);
          this.emitChange();
          this.emitCreate();
        });
        connect(SampleConstants.LINK_CREATE_ERROR, this.emitCreateError);
        connect(SampleConstants.LINK_DESTROY, this.destroy);
        connect(SampleConstants.LINK_ARCHIVE, this.archive);
        connect(SampleConstants.LINK_UPDATE_PATH, this.updatePath);
        connect(SampleConstants.LINK_SET_ORDERING, this.setOrdering);
        connect(SampleConstants.LINK_ADD_TAG, ({link, tag}) => {
          addTag(link.id, tag);
          this.emitChange();
          this.emitAddTag();
        });
        connect(SampleConstants.LINK_TAG_FILTER, this.tagFilter);
        connect(SampleConstants.MOBILE_UPDATE_SUCCESS, (action) => {
          update(action.data, action.data);
          this.emitMobileUpdate();
        })
      }

    };

    let store = new SampleStore(AppDispatcher);

    module.exports = store;
