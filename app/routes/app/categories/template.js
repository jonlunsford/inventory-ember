import Ember from 'ember';
import InputPersistableMixin from 'inventory/mixins/input-persistable';

const { inject } = Ember;

export default Ember.Route.extend(InputPersistableMixin, {
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
    categorylink: 'input-category-link-composer',
    scannable: 'input-scannable-composer',
    address: 'input-address-composer',
  },

  actions: {
    saveInputs() {
      let model = this.get('currentModel');
      model.save().then(this._saveInputs.bind(this)).catch(this._catch);
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
