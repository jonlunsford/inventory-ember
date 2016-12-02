import Ember from 'ember';
import ENV from 'inventory/config/environment';
import fetch from 'ember-network/fetch';

const { RSVP, inject } = Ember;

export default Ember.Route.extend({
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
      let category = this.get('currentModel.category');

      model.save().then(() => {
        this.store.peekAll('input').save().then(() => {
          this.get('flashMessages').success('Changes Saved');
          this.transitionTo("app.categories.show", category);
        }).catch(() => {
          this.get('flashMessages').danger('Problem Saving');
        });

      }).catch(() => {
        this.get('flashMessages').danger('Problem Saving');
      });
    },
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
