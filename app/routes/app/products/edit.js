import Ember from 'ember';

export default Ember.Route.extend({
  actions: {
    updateProduct() {
      let model = this.get('currentModel');

      model.save().then(() => {
        this.store.peekAll('input').save().then(() => {
          this.get('flashMessages').success('Changes Saved');
          this.transitionTo("app.categories.show", model.get('category'));
        }).catch(() => {
          this.get('flashMessages').danger('Problem Saving');
        });

      }).catch(() => {
        this.get('flashMessages').danger('Problem Saving');
      });
    },
  }
});
