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
      this.get('currentModel.product').save().then(() => {
        this.get('flashMessages').success('Changes Saved');
      }).catch(() => {
        this.get('flashMessages').danger('Problem Saving');
      });
    },

    saveInputs() {
      this.store.peekAll('input').save().then(() => {
        this.get('flashMessages').success('Changes Saved');
      }).catch(() => {
        this.get('flashMessages').danger('Problem Saving');
      });
    },

    deleteInput(input) {
      if(window.confirm('Are you sure?')) {
        if(input.get('isNew')) {
          this.store.unloadRecord(input);
        } else {
          input.destroyRecord().then(() => {
            this.get('flashMessages').success(`Deleted input: ${input.get('name')}`);
          }).catch(() => {
            this.get('flashMessages').danger(`Problem deleting input: ${input.get('name')}`);
          });
        }
      }
    },

    addInput(event) {
      let fieldType = event.target.value;
      let data = {
        inputType: fieldType,
        product: this.get('currentModel'),
        meta: {
          ember_component: this.get('componentMap')[fieldType]
        }
      };

      this.store.createRecord('input', data);
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
