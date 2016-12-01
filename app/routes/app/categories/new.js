import Ember from 'ember';

export default Ember.Route.extend({
  beforeModel(transition) {
    this.set('companyId', transition.queryParams.company_id);
  },

  model() {
    return this.store.findRecord('company', this.get('companyId')).then((company) => {
      return this.store.createRecord('category', { name: "", company: company })
    });
  },

  actions: {
    createCategory() {
      this.get('currentModel').save().then(() => {
        this.get('flashMessages').success(`Created asset: ${this.get('currentModel.name')}`);
        this.transitionTo('app.companies.show', this.get('companyId'));
      }).catch((err) => {
        console.log(err)
        this.get('flashMessages').danger(`Problem creating asset: ${(err.errors || []).mapBy('detail')}`);
      });
    },
  }
});
