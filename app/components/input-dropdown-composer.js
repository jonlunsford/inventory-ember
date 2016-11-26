import Ember from 'ember';

const { $ } = Ember;

const OptionInput = Ember.Object.extend({
  label: '',
  value: '',
  selected: false
});

export default Ember.Component.extend({
  init() {
    this._super(...arguments);

    if(Ember.isEmpty(this.get('input.meta.option_inputs'))) {
      this._createEmptySet();
    } else {
      this._mapExisting();
    }
  },

  actions: {
    addOption() {
      let option = OptionInput.create({ groupName: this.get('groupName') });
      this.get('input.meta.option_inputs').pushObject(option);
      this._refreshSelectPreview();
    },

    removeOption(option) {
      this.get('input.meta.option_inputs').removeObject(option);
      this._refreshSelectPreview();
    },

    setLabelFor(option, event) {
      option.set('label', event.target.value);
      option.set('value', event.target.value.underscore());
      this._refreshSelectPreview();
    },

    setInputValue(event) {
      this.set('input.value', event.target.value);
      this.get('input.meta.option_inputs').forEach((input) => {
        input.set('selected', false);

        if(input.value === event.target.value) {
          input.set('selected', true);
        }
      });

      this._refreshSelectPreview();
    }
  },

  _refreshSelectPreview() {
    $(this.element).find('select').material_select();
  },

  _createEmptySet() {
    this.set('input.meta.option_inputs', []);

    for(var i=0; i < 3; ++i) {
      let selected = i === 0 ? true : false;
      let label = `Choice ${i + 1}`;
      let value = label.underscore();
      let option = OptionInput.create({ selected: selected, label: label, value: value });
      this.get('input.meta.option_inputs').pushObject(option);
    }
  },

  _mapExisting() {
    let mapped = this.get('input.meta.option_inputs').map((input) => {
      return OptionInput.create(input);
    });

    this.set('input.meta.option_inputs', mapped);
    this._refreshSelectPreview();
  },
});
