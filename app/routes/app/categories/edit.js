import Ember from 'ember';

export default Ember.Route.extend({
  actions: {
    updateCategory() {
      this.get('currentModel').save().then(() => {
        this.get('flashMessages').success(`Updated asset: ${this.get('currentModel.name')}`);
        this.transitionTo('app.companies.show', this.get('currentModel.company'));
      }).catch((err) => {
        console.log(err)
        this.get('flashMessages').danger(`Problem updating asset: ${(err.errors || []).mapBy('detail')}`);
      });
    },
  }
});
