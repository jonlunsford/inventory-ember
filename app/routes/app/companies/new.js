import Ember from 'ember';

const { inject, RSVP } = Ember;

export default Ember.Route.extend({
  flashMessages: inject.service(),
  session: inject.service(),

  actions: {
    createCompany() {
      this.set('currentModel.errors', []);

      this.get('currentModel.company').save().then(() => {
        let address = this.get('currentModel.address');
        address.set('company', this.get('currentModel.company'));

        address.save().then(() => {
          this.get('flashMessages').success('Created company');
          this.transitionTo('app.index');
        }).catch((err) => {
          let errors = (err.errors || []).mapBy('detail');
          this.set('currentModel.errors', errors);
          this.get('flashMessages').danger('Problem creating address');
        });

      }).catch((err) => {
        let errors = (err.errors || []).mapBy('detail');
        this.set('currentModel.errors', errors);
        this.get('flashMessages').danger("Please fix all errors before continuing");
      });
    }

  },

  deactivate() {
    this.store.unloadRecord(this.get('currentModel.company'));
    this.store.unloadRecord(this.get('currentModel.address'));
  },

  model() {
    return this._tryUnsaved() || this._createNew();
  },

  _createNew() {
    let user = this.get('session.currentUser');

    return RSVP.hash({
      address: this.store.createRecord('address'),
      company: this.store.createRecord('company', { owner: user }),
      errors: []
    });
  },

  _tryUnsaved() {
    return this.store.peekAll('company').findBy('isNew', true);
  },

});
