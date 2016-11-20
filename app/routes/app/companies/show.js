import Ember from 'ember';

const { RSVP, inject } = Ember;

export default Ember.Route.extend({
  flashMessages: inject.service(),
  session: inject.service(),

  actions: {
    createCategory() {
      let data =  {
        name: this.get('currentModel.newCategory.name'),
        company: this.get('currentModel.company')
      };

      let category = this.store.createRecord('category', data);

      this.set('currentModel.newCategory.errors', []);

      category.save().then(() => {
        this.get('flashMessages').success(`Created category: ${data.name}`);
        this.set('currentModel.newCategory.name', '');
      }).catch((err) => {
        this.store.unloadRecord(category);
        this.set('currentModel.newCategory.errors', (err.errors || []).mapBy('detail'));
        this.get('flashMessages').danger(`Problem creating category: ${data.name}`);
      });
    },

    removeCategory(category) {
      if(window.confirm('Are you sure?')) {
        category.destroyRecord().then(() => {
          this.get('flashMessages').success(`Deleted category: ${category.get('name')}`);
        }).catch(() => {
          this.get('flashMessages').danger(`Problem deleting category: ${category.get('name')}`);
        });
      }
    },

    enterCategory(category) {
      let buttons = ['remove_circle'];
      let targetText = arguments[1].target.innerText;
      if(buttons.indexOf(targetText) < 0) {
        this.transitionTo('app.category.index', category);
      }
    }
  },

  beforeModel(transition) {
    console.log(transition)
    this.set('companyId', transition.params['app.companies.show'].company_id);
  },

  model() {
    let companyId = this.get('companyId');
    let company = this.store.peekRecord('company', companyId);

    return RSVP.hash({
      company: company,
      categories: company.get('categories'),
      newCategory: { name: '', errors: [] }
    });
  }
});
