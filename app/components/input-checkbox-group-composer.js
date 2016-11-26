import Ember from 'ember';

const CheckboxInput = Ember.Object.extend({
  label: '',
  name: '',
  checked: false
});

export default Ember.Component.extend({
  init() {
    this._super(...arguments);

    if(Ember.isEmpty(this.get('input.meta.checkbox_inputs'))) {
      this._createEmptySet();
    } else {
      this._mapExisting();
    }
  },

  actions: {
    addCheckbox() {
      let checkbox = CheckboxInput.create({ groupName: this.get('groupName') });
      this.get('input.meta.checkbox_inputs').pushObject(checkbox);
    },

    removeCheckbox(checkbox) {
      this.get('input.meta.checkbox_inputs').removeObject(checkbox);
    },

    setLabelFor(checkbox, event) {
      checkbox.set('label', event.target.value);
      checkbox.set('name', event.target.value.underscore());
    },

    setInputValue(checkbox, event) {
      this.set('input.value', event.target.value);
      //this.get('input.meta.checkbox_inputs').forEach((input) => { input.set('checked', false); });
      checkbox.set('checked', true);
    }
  },

  _createEmptySet() {
    this.set('input.meta.checkbox_inputs', []);

    for(var i=0; i < 3; ++i) {
      let checked = i === 0 ? true : false;
      let label = `Choice ${i + 1}`;
      let name = label.underscore();
      let checkbox = CheckboxInput.create({ checked: checked, label: label, name: name });
      this.get('input.meta.checkbox_inputs').pushObject(checkbox);
    }
  },

  _mapExisting() {
    let mapped = this.get('input.meta.checkbox_inputs').map((input) => {
      return CheckboxInput.create(input);
    });

    this.set('input.meta.checkbox_inputs', mapped);
  },
});
