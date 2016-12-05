import Ember from 'ember';
import ENV from 'inventory/config/environment';
import fetch from 'ember-network/fetch';
import InputPersistableMixin from 'inventory/mixins/input-persistable';

const { RSVP, inject } = Ember;

export default Ember.Route.extend(InputPersistableMixin, {
  flashMessages: inject.service(),
  session: inject.service(),

  beforeModel(transition) {
    this.set('categoryId', transition.queryParams.category_id);
  },

  model() {
    return RSVP.hash({
      category: this.store.peekRecord('category', this.get('categoryId')),
      product: this._getNewProduct()
    });
  },

  actions: {
    saveProduct() {
      let model =  this.get('currentModel.product');
      model.save().then(this._saveInputs.bind(this)).catch(this._catch);
    }
  },

  _getNewProduct() {
    return fetch(`${ENV.DS.host}/${ENV.DS.namespace}/products/new?category_id=${this.get('categoryId')}`, {
      type: 'GET',
    }).then((raw) => {
      return raw.json().then((response) => {
        return this.store.push(response);
      });
    }).catch(() => {
      return this.get('flashMessages').danger('An unexpected error occurred, please try again later');
    });
  }

});
