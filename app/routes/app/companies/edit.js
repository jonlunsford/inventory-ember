import Ember from 'ember';

const { inject } = Ember;

export default Ember.Route.extend({
  flashMessages: inject.service(),

  actions: {
    updateCompany() {
      this.get('currentModel').save().then(() => {
        this._address().save().then(() => {
          this.get('flashMessages').success('Updated location');
          this.transitionTo('app.index');
        }).catch((err) => {
          this.set('errors', (err.errors || []).mapBy('detail'));
        });
      }).catch((err) => {
        this.set('errors', (err.errors || []).mapBy('detail'));
        this.get('flashMessages').danger("Please fix all errors before continuing");
      });
    }
  },

  _address() {
    return this.store.peekRecord('address', this.get('currentModel.address.id')) ||
           this.get('currentModel.address') ||
           this.store.peekAll('address').findBy('isNew', true);
  },

  afterModel(model) {
    if(!this._address()) {
      this.store.createRecord('address', { company: model });
      model.reload();
    }
  },

});
