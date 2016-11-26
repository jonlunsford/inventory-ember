import Ember from 'ember';

const RadioInput = Ember.Object.extend({
  label: '',
  groupName: '',
  checked: false
});

export default Ember.Component.extend({
  init() {
    this._super(...arguments);

    if(Ember.isEmpty(this.get('input.meta.radio_inputs'))) {
      this._createEmptySet();
    } else {
      this._mapExisting();
    }
  },

  groupName: Ember.computed(function() {
    return Ember.guidFor(this) + "-input-radio-group";
  }),

  actions: {
    addRadio() {
      let radio = RadioInput.create({ groupName: this.get('groupName') });
      this.get('input.meta.radio_inputs').pushObject(radio);
    },

    removeRadio(radio) {
      this.get('input.meta.radio_inputs').removeObject(radio);
    },

    setLabelFor(radio, event) {
      radio.set('label', event.target.value);
    },

    setInputValue(radio, event) {
      this.set('input.value', event.target.value);
      this.get('input.meta.radio_inputs').forEach((input) => { input.set('checked', false); });
      radio.set('checked', true);
    }
  },

  _createEmptySet() {
    this.set('input.meta.radio_inputs', []);

    for(var i=0; i < 3; ++i) {
      let checked = i === 0 ? true : false;
      let radio = RadioInput.create({ checked: checked, label: `Choice ${i + 1}`, groupName: this.get('groupName') });
      this.get('input.meta.radio_inputs').pushObject(radio);
    }
  },

  _mapExisting() {
    let mapped = this.get('input.meta.radio_inputs').map((input) => {
      return RadioInput.create(input);
    });

    this.set('input.meta.radio_inputs', mapped);
  },
});
