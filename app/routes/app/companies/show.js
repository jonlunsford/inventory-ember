import Ember from 'ember';

const { inject } = Ember;

export default Ember.Route.extend({
  flashMessages: inject.service(),

  actions: {
    sendToNewCategory() {
      let companyId = this.get('currentModel.id');
      this.transitionTo("app.categories.new", { queryParams: { company_id: companyId }});
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
