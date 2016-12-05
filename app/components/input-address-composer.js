import Ember from 'ember';

const { inject } = Ember;

export default Ember.Component.extend({
  store: inject.service(),

  init() {
    this._super(...arguments);
    this._getAddress();
  },

  _getAddress() {
    return this.get('input.address').then((response) => {
      let address = response || this._unSaved() || this._blank();
      this.set('address', address);
    });
  },

  _blank() {
    let params = {
      city: "Required",
      state:"Required",
      zip: "000000"
    };

    let address = this.get('store').createRecord('address', params);
    address.set('input', this.get('input'));

    return address;
  },

  _unSaved() {
    return this.get('store').peekAll('address').findBy('isNew', true);
  }
});
