import Ember from 'ember';

const { inject } = Ember;

export default Ember.Route.extend({
  flashMessages: inject.service(),

  actions: {
    createCategory() {
      let data =  {
        name: this.get('currentModel.newCategoryName'),
        company: this.get('currentModel')
      };

      let category = this.store.createRecord('category', data);

      category.save().then(() => {
        this.get('flashMessages').success(`Created category: ${data.name}`);
        this.set('currentModel.newCategoryName', '');
      }).catch((err) => {
        this.store.unloadRecord(category);
        this.set('currentModel.newCategoryErrors', (err.errors || []).mapBy('detail'));
        this.get('flashMessages').danger(`Problem creating category: ${data.name}`);
      });
    },

    destroyCategory(category) {
      if(window.confirm('Are you sure?')) {
        category.destroyRecord().then(() => {
          this.get('flashMessages').success(`Deleted category: ${category.get('name')}`);
        }).catch(() => {
          this.get('flashMessages').danger(`Problem deleting category: ${category.get('name')}`);
        });
      }
    },

    showCategory(category) {
      let buttons = ['remove_circle'];
      let targetText = arguments[1].target.innerText;
      if(buttons.indexOf(targetText) < 0) {
        this.transitionTo('app.categories.show', category);
      }
    }
  }
});
