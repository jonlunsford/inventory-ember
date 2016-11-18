import Ember from 'ember';

const { RSVP, inject } = Ember;

export default Ember.Route.extend({
  flashMessages: inject.service(),

  actions: {
    createCompany() {
      let data = this.get('currentModel.newCompany');
      let company = this.store.createRecord('company', { title: data.title });

      this.set('currentModel.newCompany.errors', []);

      company.save().then(() => {
        this.get('flashMessages').success(`Created company: ${data.title}`);
        this.set('currentModel.newCompany.title', '');
      }).catch((err) => {
        this.store.unloadRecord(company);
        this.set('currentModel.newCompany.errors', (err.errors || []).mapBy('detail'));
        this.get('flashMessages').danger(`Problem creating company: ${data.title}`);
      });
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

    enterCompany(company) {
      let buttons = ['remove_circle'];
      let targetText = arguments[1].target.innerText;
      if(buttons.indexOf(targetText) < 0) {
        this.transitionTo('app.company.index', company);
      }
    }
  },

  model() {
    return RSVP.hash({
      companies: this.store.findAll('company'),
      newCompany: { title: '', errors: [] }
    });
  }
});
