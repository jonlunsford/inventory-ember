import Ember from 'ember';

const { RSVP, inject } = Ember;

export default Ember.Route.extend({
  flashMessages: inject.service(),
  session: inject.service(),

  actions: {
    destroyCompany(company) {
      if(window.confirm('Are you sure?')) {
        company.destroyRecord().then(() => {
          this.get('flashMessages').success(`Deleted company: ${company.get('title')}`);
        }).catch(() => {
          this.get('flashMessages').danger(`Problem deleting company: ${company.get('title')}`);
        });
      }
    },

    showCompany(company) {
      let buttons = ['remove_circle'];
      let targetText = arguments[1].target.innerText;
      if(buttons.indexOf(targetText) < 0) {
        this.transitionTo('app.companies.show', company);
      }
    }
  },

  model() {
    return RSVP.hash({
      companies: this.get('session.currentUser').get('companies')
    });
  }
});
