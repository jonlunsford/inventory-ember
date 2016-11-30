import Ember from 'ember';

const { RSVP, inject } = Ember;

export default Ember.Route.extend({
  flashMessages: inject.service(),

  actions: {
    sendToNew() {
      this.transitionTo('app.companies.new');
    },

    removeCompany(company) {
      if(window.confirm('Are you sure?')) {
        company.destroyRecord().then(() => {
          this.get('flashMessages').success(`Deleted company: ${company.get('title')}`);
        }).catch(() => {
          this.get('flashMessages').danger(`Problem deleting company: ${company.get('title')}`);
        });
      }
    },
  },

  model() {
    return RSVP.hash({
      companies: this.store.findAll('company'),
      newCompany: { title: '', errors: [] }
    });
  }
});
