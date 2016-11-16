import JSONAPIAdapter from 'ember-data/adapters/json-api';
import DataAdapterMixin from 'ember-simple-auth/mixins/data-adapter-mixin';
import ENV from 'inventory/config/environment';

export default JSONAPIAdapter.extend(DataAdapterMixin, {

  host: ENV.DS.host,
  namespace: ENV.DS.namespace,
  authorizer: 'authorizer:oauth2',

  urlForCreateRecord(modelName) {
    switch(modelName) {
      case 'user':
      case 'users':
        return this._super.apply(this, arguments).replace('users', 'register');
      default:
        return this._super.apply(this, arguments);
    }
  }
});
