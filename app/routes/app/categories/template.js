import Ember from 'ember';

const { inject } = Ember;

export default Ember.Route.extend({
  flashMessages: inject.service(),
  componentMap: {
    text: 'input-text-composer',
    textarea: 'input-textarea-composer',
    number: 'input-number-composer',
    radiogroup: 'input-radio-group-composer',
    checkboxgroup: 'input-checkbox-group-composer',
    dropdown: 'input-dropdown-composer',
    switch: 'input-switch-composer',
    date: 'input-date-composer',
    range: 'input-range-composer',
    categorylink: 'input-category-link-composer'
  },

  actions: {
    saveInputs() {
      this.store.peekAll('input').save().then(() => {
        this.get('flashMessages').success('Changes Saved');
      }).catch(() => {
        this.get('flashMessages').danger('Problem Saving');
      });
    },

    deleteInput(input) {
      if(window.confirm('Are you sure?')) {
        if(input.get('isNew')) {
          this.store.unloadRecord(input);
        } else {
          input.destroyRecord().then(() => {
            this.get('flashMessages').success(`Deleted input: ${input.get('name')}`);
          }).catch(() => {
            this.get('flashMessages').danger(`Problem deleting input: ${input.get('name')}`);
          });
        }
      }
    },

    addInput(event) {
      let fieldType = event.target.value;
      let data = {
        inputType: fieldType,
        category: this.get('currentModel'),
        meta: {
          ember_component: this.get('componentMap')[fieldType]
        }
      };

      this.store.createRecord('input', data);
    }
  }
});
